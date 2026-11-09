# Fridgeful · Product specification

Status: working class prototype. Course: BUS 659. Audience: a 2–3 minute class presentation.

## Problem and value

Busy households struggle to know what they own, plan meals, and avoid duplicate purchases. Fridgeful starts with existing fridge/pantry ingredients, then connects household preferences to dinners and a focused shopping list. Primary segments: busy families; secondary hypotheses: students/roommates and budget-conscious couples.

## Main journey

1. Upload a local image for review or load the explicitly labeled sample scan.
2. Confirm ingredients, quantities, units, location, and a user-set use-soon flag.
3. Choose 1–12 people, a $1–$1,000 dinner budget, 1–7 dinners, store label, Any/Vegetarian diet, cooking-time limit, meal cravings, and priority.
4. Create a plan from six curated recipes. Inspect scaled ingredients/steps and swap meals.
5. Review combined ingredient demand, inventory deductions, full packages and estimated costs. Copy/download the list; optionally open Instacart externally.
6. Review business hypotheses and collaborate through documented code review or file handoffs.

## Acceptance criteria

| Requirement | Observable acceptance criterion | Boundary |
| --- | --- | --- |
| Photo | Accepted JPG/PNG/WebP under 8 MB previews; invalid files show an error | No vision inference; sample scan is explicitly fixed data |
| Inventory | Add/delete/edit quantities and toggle user-specified use soon | Custom names persist but only catalog recipes use known ingredients |
| Household | Validated household, budget, dinners, store, diet, time and priority | Vegetarian only; no clinical/allergen guarantees |
| Plan | Requested dinner count, eligible recipes, consistent serving scaling, swaps update list | Curated rule-based heuristic, no claim of global optimality |
| Budget | Prefer affordable additions; show overage when constraints do not fit | Full packages, illustrative prices, dinner-only budget |
| Shopping | Aggregate demand; subtract compatible units once; round up packages; no negative purchases | Different units are not converted automatically |
| Order | Copy list and open external Instacart website | No cart creation, transfer, availability promise or order placement |
| Business | SWOT, pricing hypotheses, segment persona, keyword pitch checklist | No researched traction or AI/investor validation |
| Team | Editable tasks, owners/statuses, notes, source download and validated JSON handoff | Local persistence; no live shared database |
| Presentation | Dashboard plus one complete fridge→plan→shop flow and a timed demo guide | Rubric not provided; exact grading coverage unverified |

## Data and calculations

Inventory: name, quantity, unit (g/each), location, use-soon boolean. Household: people, budget, dinners, store, diet, time, priority. Meal plan: recipe IDs. Workspace: task ID/title/owner/status and notes.

Recipe base serves four. Scale gram quantities proportionally; round countable ingredients up per recipe. Sum all planned demand. Subtract inventory only if normalized name and unit match the catalog. Missing quantity is max(0,demand-owned). Packages = ceil(missing/package size). Cost = packages × illustrative package price. Inventory is reserved for the plan mathematically, not physically consumed or decremented after cooking. “Less to buy” compares package totals for this plan against an empty inventory and is not a measured savings claim.

Planner filters by diet and time. It ranks inventory overlap/use-soon items, title matches for meal cravings, marginal grocery cost and repeat penalties. Cravings are soft preferences within the six-recipe library, not arbitrary recipe generation. It prefers budget-fitting next meals. If no such meal exists, it picks the lowest incremental cost option and displays the resulting overage. Repetition is allowed, especially under tight time limits. Store choice does not change mock prices.

## Storage and collaboration

LocalStorage key: fridgeful-v1. Photo preview is memory-only. Export version 1 includes household, inventory, plan IDs, tasks, notes and checked items. Imports are size/shape validated, summarized before action, and support merging tasks/notes by title or explicit whole-project replacement. No authentication or shared writes. Repository collaboration requires a team GitHub repository and invited accounts; website access does not grant code access.

## Business assumptions

Free basic plan; test a $4.99/month premium hypothesis for shared households and assisted photo recognition. Grocery referrals are a future possibility, contingent on partner access and trust. Interview five households; observe planning; measure task completion, duplicate-purchase recognition, return intent, and willingness to pay. No validation results are asserted.

## Scope and limits

Working: forms, calculations, recipe selection, persistence, exports and business exercises. Simulated: scan recognition, prices, personas and pitch keyword feedback. Planned: real vision, live store catalogs, validated allergy/nutrition handling, authenticated synchronization and permitted grocery ordering. A financial ticker dashboard and job impact estimator were examples from the assignment prompt, not confirmed requirements; omit unless the rubric requires them.

Users confirm ingredients and freshness; the app cannot detect spoilage. Recipe images are illustrative. Basic seasonings, breakfast/lunch, taxes and delivery fees are excluded. Review labels for allergies. External assets and Instacart require internet access; core local planning does not.


## Updated assignment suggestions: five-tool coverage

All five suggested tools are now accessible in Business Lab, with custom inputs. These are transparent interactive demo exercises and copyable prompts for a real AI tool. The site does not claim a model is connected.

| Suggestion | Input | Working output | Live-AI/data boundary |
| --- | --- | --- | --- |
| AI business idea evaluator | Business idea and customer | SWOT hypotheses, pricing models, segments and a validation experiment | Template logic; copy prompt for actual LLM analysis |
| Investor pitch analyzer | Pasted pitch | Clarity/problem, model, investor appeal/evidence checklist, stage framing and rewrite structure | Keyword checks; cannot establish funding readiness |
| Smart financial dashboard | Ticker and optional pasted news | Fictional sample price, P/E, P/S, market cap; extractive news digest; external research link | No live quote/key-ratio feed, GPT call or current-news retrieval |
| GenAI job impact estimator | Job title and actual tasks | Qualitative task-assistance exposure, LLM use cases, human judgment boundaries and reskilling plan | Heuristic; no measured job-loss probability |
| Marketing persona generator | Product and segment | Hypothetical persona, pain points, channels and message to test | Templates; not researched customer evidence |

### AI acceptance boundary

If the rubric requires genuine in-app generative AI or current financial data, those criteria remain unmet until a secured server-side model/data service is added. Never put a provider API key in the static GitHub Pages bundle. Copyable AI prompts support an explicitly manual AI-assisted classroom workflow; they are not equivalent to a live integration.

## GitHub Pages delivery

The organization website repository is BUS-659/bus-659.github.io. The intended Pages address is https://bus-659.github.io/. A separate Vite static entry reuses the same React app; `npm run build:pages` emits `out/`. The Pages workflow tests and builds changes before publishing main, while pull requests run checks without publishing. Website visitor data remains browser-local. Organization/repository members need write permission to contribute directly. The original personal repository is retained as an earlier snapshot; use the organization repository going forward.
