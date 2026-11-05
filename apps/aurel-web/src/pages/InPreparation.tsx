import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDraft } from "../booking/DraftContext";
import { serviceQuestions } from "../booking/model";
import type { PlannedPage } from "../config/sitemap";
import { indexGroups } from "../config/sitemap";
import { market } from "../config/market";
import { ButtonLink } from "../components/Button";
import "./pages.css";

/**
 * One page for every route in the sitemap that isn't built yet. It says what
 * the page will hold (from its page plan) and offers the two things a visitor
 * can always do: book, or reach a person.
 */
export function InPreparation({ page }: { page: PlannedPage }) {
  const { setService } = useDraft();
  useEffect(() => {
    document.title = `${page.title}. AUREL`;
  }, [page.title]);

  return (
    <article className="prep" data-ground="light">
      <div className="wrap grid prep__grid">
        <header className="prep__head">
          <p className="t-label prep__status">
            <span className="prep__mark" aria-hidden="true" /> In preparation
          </p>
          <h1 className="t-title">{page.title}</h1>
          <p className="prep__purpose">{page.purpose}</p>
        </header>
        <section className="prep__plan" aria-labelledby="plan-title">
          <h2 id="plan-title" className="t-label muted">
            This page will hold
          </h2>
          <ol className="prep__list">
            {page.sections.map((s, i) => (
              <li key={s}>
                <span className="tnum t-label">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <aside className="prep__aside">
          {page.service ? (
            <ButtonLink to="/book/journey" variant="secondary" arrow onClick={() => setService(page.service!)}>
              {serviceQuestions[page.service]}
            </ButtonLink>
          ) : (
            <ButtonLink to="/book/journey" variant="secondary" arrow>
              Book a journey
            </ButtonLink>
          )}
          <p className="t-small muted">
            Need something now? Call <a href={market.phoneHref} className="tnum">{market.phone}</a>.
          </p>
        </aside>
      </div>
    </article>
  );
}

export function NotFound() {
  useEffect(() => {
    document.title = "Page not found. AUREL";
  }, []);
  return (
    <article className="prep" data-ground="light">
      <div className="wrap grid prep__grid">
        <header className="prep__head">
          <p className="t-label prep__status">Not found</p>
          <h1 className="t-title">There's no page at this address.</h1>
          <p className="prep__purpose">It may have moved. Everything AUREL has is listed here.</p>
        </header>
        <nav className="prep__plan" aria-label="All pages">
          <ul className="prep__list">
            {indexGroups.flatMap((g) => g.links).map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
