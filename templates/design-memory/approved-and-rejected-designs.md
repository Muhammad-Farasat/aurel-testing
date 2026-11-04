# Approved and rejected designs

Concrete design decisions the owner reacted to. Never delete an entry. When a
later decision reverses one, add the new entry and mark the old one
superseded.

Before finalizing any design direction, the design director checks every
active rejection with scope `general` and lists the ones it avoided.

## Rejected

```
### RJ-000 <short name>

- Date: <YYYY-MM-DD>
- Project: <project, or "general">
- Scope: general | project | page or component
- What was rejected: <the pattern, concretely>
- Owner's words: "<quote>"
- Why: <the design reason, as the owner gave it or as confirmed with them>
- Instead: <what the owner wants instead, if said>
- Evidence: <screenshot path in the project, reference ID>
- Status: active | superseded by <AP-000>
```

## Approved

```
### AP-000 <short name>

- Date: <YYYY-MM-DD>
- Project: <project>
- Scope: general | project | page or component
- What was approved: <the decision, concretely>
- Owner's words: "<quote>"
- Why it worked: <design reason>
- Evidence: <screenshot path, reference ID>
- Status: active | superseded by <RJ-000>
```
