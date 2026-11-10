# Free browser photo scanning

Fridgeful uses TensorFlow.js COCO-SSD (MobileNet v2) to run real object detection on the visitor's device. No API key, inference account, backend or per-scan service payment is required. Model files download from TensorFlow's public hosting when the first scan starts. The photo is never uploaded, persisted or sent to an inference service. Normal internet/data charges can still apply.

## Scope

Supported food labels: apple, banana, orange, broccoli, carrot, sandwich, hot dog, pizza, donut, cake. All other detections are ignored, including bottles, bowls and refrigerators. The scanner does not infer contents from containers or identify milk, eggs, ground beef, labels, food safety or freshness. It may miss supported foods on crowded shelves. A full-fridge image is not guaranteed to return matches. Ingredient search remains the broad-coverage entry route.

## User journey

1. My fridge → Choose a photo. JPG, PNG or WebP under 8 MB and at most 40 megapixels.
2. Scan this photo. First use downloads the model; subsequent scans reuse it during the session. The model is lazy loaded, so opening the site does not download it.
3. Review selected matches, model scores, quantities, units and storage location. Multiple detected objects of one food are grouped. Scores are model outputs, not calibrated accuracy guarantees. Counts can be wrong; weights start at an explicitly disclosed 200 g placeholder because a photo cannot weigh food.
4. Save confirmed ingredients. Matching name/unit/location rows receive the reviewed quantity; other rows remain. Repeat scans do not accumulate quantities. Search/manual editing supports missed ingredients.

Zero supported matches produces an explicit empty result, never fixed or invented ingredients. Errors offer retry and manual entry. Removing the photo or leaving the page discards pending results. Fixed demo kitchen is a separate, labeled replacement action and never claims to analyze the photo.

## Maintenance

- `app/photo-scanner.tsx`: upload/review interface and stale-result protection.
- `lib/browser-scanner.ts`: lazy model loading, WebGL with CPU fallback, image resizing to max 1280 pixels, inference threshold 0.5.
- `lib/photo-detections.ts`: supported label mapping, result grouping and inventory merge validation.
- `tests/photo-detections.test.ts`: non-food exclusion, low/invalid-score rejection, grouping, quantity defaults, repeat-scan behavior and invalid quantities.

Run `npm test`, `npx tsc --noEmit`, and `npm run build:pages`. In a browser, scan a real supported food image and confirm the actual result, check manual save and repeat-save behavior, then try a photo without supported foods. Device speed, browser model support and access to the model host affect availability; failed model downloads must not be presented as a completed scan.

## Sources

- [Official TensorFlow.js model documentation](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- [Official supported class list](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts)

This feature deliberately follows the project's free-only constraint. Broad fridge understanding would require a different model and separate accuracy/device testing, or an external inference service.
