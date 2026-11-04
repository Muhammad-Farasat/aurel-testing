# Architecture

Owner: solution-architect.

## Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| <frontend, backend, database, ORM, auth, hosting> | <choice> | <exact version> | <requirement IDs and reason> |

## Layout and boundaries

```
<directory tree of the main folders>
```

- UI: <where it lives, what it may import>
- Services: <where business logic lives>
- Data access: <where queries live>
- Integrations: <adapters and mock implementations>

## Data model

| Entity | Key fields | Relations | Constraints and indexes |
|---|---|---|---|
| <entity> | <fields> | <foreign keys> | <unique, check, index> |

Operations that need transactions:

- <operation>: <why>

## Auth and authorization

- Roles: <list>
- Session model: <how sessions work>
- Where checks run: <middleware, service layer, both>
- First admin account: <how it is created safely>

## Integrations

### <Service>

- Live mode: <how it works>
- Mock or dev mode: <what replaces it and how the UI shows it>
- Switch: <env var or config that picks the mode>
- Environment variables: <names>

## Errors, validation, logging

- <approach>

## Checks

Replace the "Checks in this repo" section of AGENTS.md with these once Phase 1
makes them runnable.

| Check | Command | When |
|---|---|---|
| Install | `<command>` | fresh checkout |
| Lint | `<command>` | every task |
| Typecheck | `<command>` | every task |
| Unit tests | `<command>` | every task |
| End-to-end tests | `<command>` | every phase |
| Build | `<command>` | every phase |

## Requirement map

| Requirement | Module or file |
|---|---|
| R-001 | <path> |
