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

## What you get back

At the end, the Orchestrator replies with:

- The phase PR URLs in stack order
- The requirement verification summary from `docs/project/VERIFICATION.md`
- Integrations that are only mocked
- Open risks from `docs/project/RISKS.md`

It does not merge PRs unless you tell it to.
