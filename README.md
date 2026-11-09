# Fridgeful

**Less waste. More dinner.** BUS 659 group project.

Website target: **https://bus-659.github.io/**. Check the repository's Actions / Pages deployment before sharing as live.

## Run and build

Use Node.js 24.

```sh
npm ci
npm run dev:pages
```

Open the printed local URL.

```sh
npm test
npx tsc --noEmit
npm run build:pages
```

The static build is in `out/`. GitHub Pages → Build and deployment → Source must be **GitHub Actions**. `.github/workflows/pages.yml` tests and builds pull requests; approved changes pushed to `main` publish automatically.

## Work together

Use **BUS-659/bus-659.github.io** as the shared source repository going forward. Invite members through the organization and grant write access to this repository. Work on a separate branch per improvement, open a pull request, and have a teammate review it before merging. Public read/fork access does not grant direct editing rights.

The earlier `kaylac18/Fridgeful` repository is preserved as a prior snapshot; it does not automatically sync with this repository. The existing chatgpt.site copy is likewise a separate deployment.

## Features

Fridge image preview and editable inventory; household settings; rule-based dinner plans; recipes and swaps; package-based grocery estimates; shopping exports; external Instacart handoff; team tasks/notes; validated JSON handoffs; downloadable spec; timed demo guide; incremental build prompts.

Business Lab includes all five suggestions: business idea evaluator, pitch analyzer, financial dashboard, job-impact exercise and product persona generator. Each accepts input and returns a structured demo, with an AI-ready prompt users can copy to an approved model.

## Honest limits

No connected LLM, vision recognition, live financial/retailer feed, direct order placement, or live household synchronization is implemented. Financial numbers are fictional examples, never current quotes; pasted news gets an extractive first-three-sentence digest, not a GPT summary. Business outputs are template hypotheses and keyword heuristics. Each visitor's inventory/tasks/notes persist only in that browser. Photo previews are temporary and never uploaded.

If the assignment requires genuine in-app AI, add a secure backend and model connection. Do not put an API key in public code, a browser bundle, or GitHub Pages configuration visible to visitors.

## Documentation

- [Product specification and requirement coverage](docs/SPEC.md)
- [Contributor workflow](CONTRIBUTING.md)
- [Build prompts](docs/BUILD_PROMPTS.md)
- [Decision log](docs/DECISIONS.md)
- [Testing checklist](docs/TESTING.md)
- [Presentation guide](docs/DEMO.md)

## Source map

- `app/page.tsx`: food-planning application and Project Studio.
- `app/business-lab.tsx`: five assignment tools.
- `lib/planner.ts`: recipe library and grocery math.
- `static/main.tsx`, `index.html`, `vite.pages.config.ts`: GitHub Pages entry/build.
- `tests/planner.test.ts`: calculation and constraint tests.

The original Sites/Vinext build remains available with `npm run dev` / `npm run build`; the portable `.openai/hosting.json` deliberately contains no owner's project identity. Use the Pages commands above for this repository.

Illustrative food images load from Unsplash and fonts from Google Fonts. Core planning remains functional if those external assets fail.
