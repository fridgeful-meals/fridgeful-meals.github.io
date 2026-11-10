# Fridgeful · Product specification

Status: working class prototype. Course: BUS 659. Audience: a 2–3 minute class presentation.

## Problem and value

Busy households struggle to know what they own, plan meals, and avoid duplicate purchases. Fridgeful starts with existing fridge/pantry ingredients, then connects household preferences to dinners and a focused shopping list. Primary segments: busy families; secondary hypotheses: students/roommates and budget-conscious couples.

## Main journey

1. Upload a local image, run free browser detection, and confirm results; alternatively load the explicitly labeled fixed demo kitchen.
2. Confirm ingredients, quantities, units, location, and a user-set use-soon flag.
3. Choose 1–12 people, a $1–$1,000 dinner budget, 1–7 dinners, store label, Any/Vegetarian diet, cooking-time limit, meal cravings, and priority.
4. Create a plan from six curated recipes. Inspect scaled ingredients/steps and swap meals.
5. Review combined ingredient demand, inventory deductions, full packages and estimated costs. Copy/download the list; optionally open Instacart externally.
6. Review the product spec and collaborate through documented code review or file handoffs.

## Acceptance criteria

| Requirement | Observable acceptance criterion | Boundary |
| --- | --- | --- |
| Photo | Accepted JPG/PNG/WebP under 8 MB previews; invalid files show an error | Free COCO-SSD recognition for ten food classes; confirmation required. Fixed demo kitchen is separate. |
| Inventory | Add/delete/edit quantities and toggle user-specified use soon | Custom names persist but only catalog recipes use known ingredients |
| Household | Validated household, budget, dinners, store, diet, time and priority | Vegetarian only; no clinical/allergen guarantees |
| Plan | Requested dinner count, eligible recipes, consistent serving scaling, swaps update list | Curated rule-based heuristic, no claim of global optimality |
| Budget | Prefer affordable additions; show overage when constraints do not fit | Full packages, illustrative prices, dinner-only budget |
| Shopping | Aggregate demand; subtract compatible units once; round up packages; no negative purchases | Different units are not converted automatically |
| Order | Copy list and open external Instacart website | No cart creation, transfer, availability promise or order placement |
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

Working: free on-device basic photo recognition with review, forms, calculations, recipe selection, persistence, exports. Simulated: fixed demo kitchen and illustrative grocery prices. Planned: broader ingredient recognition, live store catalogs, validated allergy/nutrition handling, authenticated synchronization and permitted grocery ordering. A financial ticker dashboard and job impact estimator were examples from the assignment prompt, not confirmed requirements; omit unless the rubric requires them.

Users confirm ingredients and freshness; the app cannot detect spoilage. Recipe images are illustrative. Basic seasonings, breakfast/lunch, taxes and delivery fees are excluded. Review labels for allergies. External assets and Instacart require internet access; core local planning does not.


## Scope clarification

The five business-tool examples are alternative assignment suggestions, not Fridgeful features. At the user's request, the website focuses on the original food-scanner concept: photo review, editable fridge/pantry inventory, household preferences, weekly meals, budget-aware shopping and quick recipes. Project Studio retains the spec, team tasks, build prompts and presentation guide.

Broad ingredient recognition and model-generated recommendations remain future integrations; free basic detection and rule-based recipe selection are labeled with their limits.

## GitHub Pages delivery

The organization website repository is fridgeful-meals/fridgeful-meals.github.io. The intended Pages address is https://fridgeful-meals.github.io/. A separate Vite static entry reuses the same React app; `npm run build:pages` emits `out/`. The Pages workflow tests and builds changes before publishing main, while pull requests run checks without publishing. Website visitor data remains browser-local. Organization/repository members need write permission to contribute directly. The original personal repository is retained as an earlier snapshot; use the organization repository going forward.

## Ingredient search

My fridge includes a searchable built-in list of 460 ingredients across 15 food categories alongside photo upload. Search matches common names and aliases (for example, tomato → tomatoes). Selecting a result opens the quantity/unit/location confirmation form. Existing items with matching name, unit and location receive the added quantity instead of a duplicate row; other locations or units remain separate. Unknown names can be added as custom inventory. Only ingredients in the existing recipe library affect meal recommendations and grocery deductions; no live store search is implied. Photo detection is separately limited to the ten classes documented in PHOTO_SCANNING.md.

### Extended ingredient coverage

Includes meat/poultry (ground beef and minced-beef aliases), seafood, vegetables, fruit, dairy, dairy alternatives, plant proteins, grains/pasta, bread, beans/canned foods, herbs/spices, sauces, baking, nuts/seeds/dried fruit, and frozen foods. Categories are computed from the curated dataset. Exact ingredient matches rank first, aliases next, then broader matches; token order and accents are normalized. Category filtering, batches of 12, and a scrollable result area keep the page manageable. This expands inventory search only, not the six-recipe planner or retailer price catalog.


## Free photo recognition

Real browser-based COCO-SSD inference recognizes apples, bananas, oranges, broccoli, carrots, sandwiches, hot dogs, pizza, donuts and cake. It cannot recognize all fridge ingredients, read labels, infer container contents, measure weight or assess freshness. Uploaded photos stay on device; model files download from TensorFlow hosting. Results require user selection and quantity/location confirmation before inventory updates. Matching rows are updated, other inventory is retained, and rescanning does not keep adding quantities. First model download needs internet. No API account or paid inference service is used. See PHOTO_SCANNING.md for technical scope and testing.
