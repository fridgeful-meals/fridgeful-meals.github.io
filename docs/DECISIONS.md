# Decision log

- Built one coherent demo before adding live integrations, to fit a 2–3 minute presentation.
- Used the Sites Vinext starter and preserved its publishing integration.
- Chose a rule-based, six-recipe planner so behavior is repeatable and inspectable.
- Rounded countable ingredients per recipe before consolidation to avoid underbuying across meals.
- Kept store selection as a list label rather than fabricating live catalogs or retailer-specific prices.
- Used browser-local data and explicit JSON handoffs. No fake shared presence or claimed live sync.
- Prepared GitHub-friendly source, issue template, pull-request template, and contributor instructions. The public repository is kaylac18/Fridgeful. Teammate handles are still needed to grant direct editing access.
- Kept photo previews local and temporary. No API keys or personal uploads are shipped.
- Business examples support the food concept. Unrelated stock/job features remain out of scope pending the actual rubric.

- User approved the easier organization option: use the existing BUS-659 organization and its root Pages address rather than creating fridgeful-team.
- Added an independent Vite static entry for GitHub Pages while retaining the original Sites build configuration.
- Expanded Business Lab to all five suggestions, preserving clear boundaries between templates, extractive summaries, fictional samples, manual model prompts and live AI.

- Scope correction: user asked to return to the original food-scanner concept. Removed Business Lab navigation and the five generic business-analysis exercises; retained the food journey and team/spec workspace.

- Renamed the organization and Pages repository to fridgeful-meals/fridgeful-meals.github.io at the user’s request for a food-focused free address.

- Added built-in ingredient search alongside photo upload. Search aliases map to canonical ingredients; same-unit/same-location additions merge quantities. Custom ingredients remain inventory-only when outside the recipe library.

- Expanded inventory search to a curated 460-name library with categories, aliases and ranked matching. Kept specific cuts/products distinct from generic ingredients. No broader recipe coverage or live catalog access is implied.


## 2026-11-10 — Free-only photo detection

The owner requested no paid service. Use a lazy-loaded browser COCO-SSD detector, not a paid vision API or public-key workaround. Clearly disclose its ten food labels, require result/quantity review, preserve manual search, and never interpret bottles as milk. Confirmed scan quantities update matching inventory rather than accumulating on repeat scans. Broad fridge understanding remains outside this free basic implementation.
