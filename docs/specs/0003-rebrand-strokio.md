# 0003 — Rebrand the project as Strokio

- Status: shipped
- Contract impact: none
- Touches: `package.json`, `pnpm-lock.yaml`, `app/layout.tsx`, `components/LandingPage.tsx`, `lib/storage.ts`, `README.md`, `AGENTS.md`, `docs/**`, `CHANGELOG.md`

## Goal

Rename the product and repository package identity to **Strokio** across user-
visible metadata and project documentation, while keeping existing browser-local
progress available after the storage-key rename.

## Scope

- In: product name references, package name, app metadata, documentation titles
  and descriptions, browser-storage key migration, pnpm lockfile importer, and
  changelog.
- Out: product feature changes, route changes, directory/repository URL rename,
  database or API changes, authentication, and visual redesign.

## Contract changes

None. The app has no formal external API contract.

## Behaviour

- Use **Strokio** as the product name; retain “drawing practice” as its
  descriptive category.
- Rename the package identity from `drawing-platform` to `strokio`.
- Show Strokio branding in the landing page and label its current feedback as
  mock/example feedback rather than AI review.
- Rename the current localStorage keys to `strokio-progress` and `strokio-streak`.
- On first read, copy the prior `drawing-platform-progress` and
  `drawing-platform-streak` values to the new keys when the new key is absent.
  Keep the old keys after copying so the rename does not discard existing user
  progress.
- Keep the current prototype accurately described; branding must not imply that
  mock feedback is real AI review.

## Acceptance criteria

1. Product-facing names, package identity, metadata, and project documentation
   use Strokio.
2. The landing page displays Strokio branding and describes prototype feedback
   accurately.
3. Existing browser-local progress under the two legacy keys remains readable
   after the rename and is copied forward to the new keys when needed.
4. Fresh browser storage uses only the Strokio key names.
5. `pnpm-lock.yaml` matches the new package identity and frozen installation
   succeeds.
6. Typecheck and production build pass; route and workflow behavior remain
   unchanged apart from the localStorage key migration.

## Tests

- No test suite is configured. Validate the storage migration through the
  application build and typecheck; do not introduce a test framework in this
  rebrand task.

## Open questions

None.

## Task breakdown (for agents)

1. Update package/app identity and migrate the browser-local storage keys
   without deleting legacy values.
2. Update all current project name references in README, agent guidance, and
   product/setup docs.
3. Regenerate the lockfile, run checks, update `docs/SPEC.md`, and update the
   changelog last.
