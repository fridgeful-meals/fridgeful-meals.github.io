# Verification checklist

## Automated

- TypeScript check: `npx tsc --noEmit`.
- Calculation/constraint tests: `node --experimental-strip-types --test tests/planner.test.ts`.
- Production build: `npm run build` (Sites build helper used for final packaging).

## Manual acceptance checks

- Dashboard navigation and all six sections work.
- Photo chooser previews accepted file; invalid type/oversized file shows a message. Removing preview works.
- Sample scan is clearly labeled; inventory add/edit/delete and use-soon toggle work.
- Preferences alter a newly generated plan. Changing settings clears the old plan.
- Vegetarian and time filters constrain eligible meals. Infeasible budgets show overage.
- Recipe dialogs close with Escape, retain focus, and show scaled quantities and steps.
- Swap updates shopping demand and clears checked items.
- Shopping quantities aggregate across dinners and use compatible inventory exactly once.
- Copy/export outputs the displayed list; Instacart opens externally with clear limitations.
- Business persona selection changes content; pitch checklist responds to input.
- Tasks/owners/statuses and notes persist after refresh.
- JSON import rejects malformed/oversized data; summary precedes merge/replacement; backup can be downloaded.
- Source ZIP downloads and contains source/docs, not secrets, runtime state or dependencies.
- Phone layout has no unintended horizontal overflow; keyboard focus is visible.

See the final verification report for checks actually performed. This checklist is not itself a claim that every manual check passed.
