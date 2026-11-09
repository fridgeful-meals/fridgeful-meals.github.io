# Build Fridgeful together

## One shared repository

1. The team repository is https://github.com/BUS-659/bus-659.github.io (public). Anyone can read or fork it; direct edits require collaborator access.
2. The complete source is at the repository root. Clone it rather than uploading a ZIP as the only file.
3. Invite teammates through repository Settings → Collaborators with write access. Each teammate uses their own account.
4. Clone the repository, install dependencies, and use npm run dev:pages as described in README.md.
5. Use one issue per bounded improvement. Include the problem, owner, acceptance criteria, and test steps.
6. Make a separate branch for each issue. Open a pull request, ask a teammate to review it, and merge after checks pass.
7. The Pages workflow tests and publishes approved changes merged into main. Check Actions for deployment success before presenting.

No teammate names, GitHub handles or email addresses were supplied during the initial build. No invitations have been sent.

## Suggested roles

Product/spec owner; interface owner; planning/calculation owner; testing/business/demo owner. Combine roles for smaller groups.

## Prompt for any contribution

> Read README.md, docs/SPEC.md, docs/DECISIONS.md and the current code. Take issue [number] only. State the expected behavior, preserve other features, implement the smallest complete change, and test the affected journey. Label simulations honestly. Update relevant documentation and prepare a pull request explaining what changed and how it was verified. Stop for teammate review.

## Workspace handoff

Project Studio stores tasks, notes, preferences and inventory in the current browser only. Export JSON and send it to a teammate using your chosen group channel. They can inspect the import summary, back up their state, merge tasks and notes, or explicitly replace the entire local project. This is asynchronous file-based collaboration, not conflict-free synchronization. Do not include personal information in exports intended for class sharing.

## Repository hygiene

Do not commit secrets, API tokens, private photos, local browser exports, node_modules, build output or runtime state. If you add real AI, call it from a server endpoint and keep keys in runtime secrets. Use .env.example with placeholder names only. Document schema or storage changes before enabling shared writes.
