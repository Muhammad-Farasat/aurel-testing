# AUREL web (frontend only)

The AUREL website built from `docs/project/DESIGN_DIRECTION.md` ("Standing By"; the first concept, "Kept Time", lives on branch agent/aurel-frontend-design-1104a).
There is no backend: search, flight lookup, quotes and bookings are mocks in
`src/services/` with simulated latency. Bookings and the draft live in
`localStorage`.

## Run

```bash
cd apps/aurel-web
npm install
npm run dev        # http://localhost:5191
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ on http://localhost:5192
npm run typecheck
```

## Placeholder data

Each open question from the owner is isolated in one file and marked as
example data:

| What | File |
|---|---|
| Market (London, GBP, phone, VAT) | `src/config/market.ts` |
| Tier names, capacities, models, rates | `src/config/tiers.ts` |
| Service rules, add-ons, pricing formula inputs | `src/config/serviceRules.ts` |
| Standards and story copy (draft) | `src/config/copy.ts` |
| Places for autocomplete | `src/data/places.ts` |
| Flights (BA117 lands early; unknown numbers are "not found") | `src/data/flights.ts` |
| Pages not built yet, with what each will hold | `src/config/sitemap.ts` |
| Vehicle pictures: AI-generated placeholders, not AUREL's cars | `public/vehicles/`, `src/components/Vehicle.tsx` |

## Useful test inputs

- Flight `BA117` lands 12 minutes early. `VS4` is late. Anything else is not found.
- Manchester Airport is outside the service area.
- A card number ending `0002` is declined.
- `/booking/AUR-7KQ4M` is an example booking. Add `?state=assigned`,
  `onway`, `arrived`, `inprogress` or `completed` (or use the preview control
  on the page) to see later states.
