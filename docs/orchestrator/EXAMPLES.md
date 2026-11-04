# Starting a client project

## 1. Make a copy of the factory for the client

This repo is the template. Each client project gets its own copy so its
history, PRs and `docs/project/` stay separate.

```bash
git clone https://github.com/Muhammad-Farasat/aurel-testing.git acme-portal
cd acme-portal
gh repo create <owner>/acme-portal --private
git remote set-url origin https://github.com/<owner>/acme-portal.git
git push -u origin main
```

Put the brief and references anywhere in the repo, for example:

```
acme-portal/
  briefs/acme-brief.pdf
  briefs/refs/moodboard.png
  briefs/refs/current-site-notes.md
```

Then start Claude Code in that folder. Start a new session after copying so
Claude Code loads the agents in `.claude/agents/`.

## 2. Start the project

Brief and references as files:

```
/start-client-project
Brief: briefs/acme-brief.pdf
References: briefs/refs/, https://acme.example.com, https://www.figma.com/design/<key>/<name>
Project name: acme-portal
```

Brief pasted into the message:

```
/start-client-project
Project name: harbor-bakery
Brief:
Harbor Bakery wants an online ordering site for pickup orders. Customers
browse today's menu, order for a time slot, and pay online. Staff see orders
by slot and mark them ready. ...
References: https://example-bakery-a.com (layout they like), photos in refs/
```

With approval gates instead of the default autonomous mode:

```
/start-client-project
Brief: briefs/acme-brief.pdf
Approval mode: per-phase
```

## 3. During the project

Change how often it stops:

```
Switch to plan-only mode from here.
```

Answer a hard stop:

```
Use Stripe, not PayPal. Test keys are in .env.local.
```

Add or change requirements:

```
The client added a requirement: staff must be able to pause online ordering
for a day. Update REQUIREMENTS.md and the phase plan, then continue.
```

See where things stand without changing anything:

```
Summarize docs/project/STATUS.md and list anything blocked.
```

## 4. Resume in a new session

```
/start-client-project
Resume.
```

It reads `docs/project/STATUS.md` and continues from the recorded stage and
task.

## 5. Adopt a project that started before this system

If a project already has open phase PRs but no `docs/project/`:

```
/start-client-project
Brief: briefs/acme-brief.md
Project name: acme-portal
Adopt open PRs #4 and #5 as phases 1 and 2. Verify them before marking them
done, then continue with Phase 3 on top of the Phase 2 branch.
```

## 6. Control the product research

The Orchestrator picks a research depth itself. Override it if you know
better:

```
/start-client-project
Brief: briefs/acme-brief.md
Research depth: deep. The client is entering a market they don't know.
```

```
/start-client-project
Brief: briefs/internal-tool.md
Research depth: none. This is a fixed spec.
```

When an idea would change the business direction, budget or scope, it
lists the decision with options and a recommendation, and keeps working on
everything else. Answer in one line:

```
IDEA-3 yes as MVP. IDEA-5 move to future. Reject IDEA-7.
```

See what it considered:

```
Summarize docs/project/product-decisions.md, including the rejected ideas.
```

## 7. Teach it your design taste

The design memory lives in `~/Documents/design-memory`, outside every
project. Use `/design-memory` at any time, inside a project or not.

Share references, with a note on what you like:

```
/design-memory
1. https://www.behance.net/gallery/<id>/<name> - love the editorial grid
2. https://www.instagram.com/p/<id>/ - the way the nav collapses
3. refs/checkout-recording.mp4 - this checkout transition feels premium
4. refs/screens/ - screenshots from an app I like
```

If a post sits behind a login, it will say so and ask you for screenshots.
It won't guess from the URL.

Give feedback, general or specific:

```
I don't like excessive cards. Never use stacked grids of identical cards.
```

```
For this client, the serif headlines feel too formal. Keep them for other
projects.
```

```
The hero on the services page feels too empty at mobile width.
```

It replies with one line saying what it recorded and at which scope:
general, this project, or one page. Correct it if it got the scope wrong.
If your feedback could mean two things, it asks which one you meant.

Ask what it knows:

```
/design-memory
What do you know about my taste so far?
```

## What you get back

At the end, the Orchestrator replies with:

- The phase PR URLs in stack order
- The requirement verification summary from `docs/project/VERIFICATION.md`
- Integrations that are only mocked
- Open risks from `docs/project/RISKS.md`

It does not merge PRs unless you tell it to.
