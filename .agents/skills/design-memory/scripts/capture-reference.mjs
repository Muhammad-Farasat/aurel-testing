// Capture a public web page as design evidence: full-page screenshots at exact
// CSS widths plus measured styles. Run through the evidence-driven-testing
// helper so Playwright installs outside the project:
//
//   bash .claude/skills/evidence-driven-testing/scripts/run-playwright.sh \
//     .claude/skills/design-memory/scripts/capture-reference.mjs \
//     <url> <out-dir> [settle-ms]
//
// Writes <out-dir>/<width>.png for 1440, 834 and 390, and <out-dir>/styles.json.
// Never pass cookies or a logged-in storage state: this is for public pages.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [url, outDir, settleArg] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("Usage: capture-reference.mjs <url> <out-dir> [settle-ms]");
  process.exit(2);
}
const settleMs = Number(settleArg ?? 3000);
const widths = [1440, 834, 390];
mkdirSync(outDir, { recursive: true });

const measure = () => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      selector: sel,
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform,
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      transition: s.transition,
    };
  };
  const main = document.querySelector("main") || document.body;
  const ms = getComputedStyle(main);
  return {
    innerWidth,
    devicePixelRatio,
    pageHeight: document.documentElement.scrollHeight,
    bodyBackground: getComputedStyle(document.body).backgroundColor,
    main: { maxWidth: ms.maxWidth, paddingLeft: ms.paddingLeft, paddingRight: ms.paddingRight },
    h1: pick("h1"),
    h2: pick("h2"),
    h3: pick("h3"),
    body: pick("main p") || pick("p"),
    navLink: pick("nav a") || pick("header a"),
    button: pick("button") || pick("a[class*=button i]"),
    sectionCount: document.querySelectorAll("main section, body > section").length,
  };
};

const browser = await chromium.launch();
const results = { url, capturedAt: new Date().toISOString(), settleMs, widths: {} };
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    // Scroll through once so lazy images and scroll-triggered sections render.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(settleMs);
    const file = join(outDir, `${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    results.widths[width] = { status: response?.status() ?? null, file, ...(await page.evaluate(measure)) };
    await page.close();
  }
} finally {
  await browser.close();
}
writeFileSync(join(outDir, "styles.json"), JSON.stringify(results, null, 2));
for (const [w, r] of Object.entries(results.widths)) {
  console.log(`${w}: status ${r.status}, innerWidth ${r.innerWidth}, h1 ${r.h1?.fontSize ?? "none"}, page ${r.pageHeight}px`);
}
