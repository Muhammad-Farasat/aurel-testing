# Verification

Owners: qa-verifier writes results. The Orchestrator writes the summary.

Statuses are `verified`, `partially verified`, `mocked`, `failed` and
`not verified`. Only `verified` means it worked against the real system.

## Summary

- Requirements: <n> total. <n> verified, <n> partially verified, <n> mocked,
  <n> failed, <n> not verified.
- Mocked integrations: <list, or "none">
- Last full run: <YYYY-MM-DD>, commit <sha>

## Checks

| Date | Commit | Check | Command | Result |
|---|---|---|---|---|
| <date> | <sha> | <lint, tests, build> | `<command>` | <pass, fail, with counts> |

## Requirements

| Requirement | Phase | Status | Evidence | Notes |
|---|---|---|---|---|
| R-001 | 1 | <status> | `.artifacts/<phase>/<file>` | <what was run> |

## Failures

### <R-0xx>: <short title>

- Steps to reproduce: <steps>
- Expected: <result>
- Actual: <result>
- Assigned to: <task ID>

## Not covered

- <what these checks do not prove, such as real devices, live providers, load>
