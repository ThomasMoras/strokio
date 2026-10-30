# Repository bootstrap status

This note records the initial repository/agent setup. Product feature work is
deferred to accepted feature specs and separate branches after this setup is
complete.

## Current baseline

- Next.js App Router, TypeScript, React, and Tailwind CSS 4 are configured.
- The current application is a client-side learning prototype with a 12-item
  static exercise catalog, image preview, mock feedback, and localStorage-based
  completion/streak state.
- Node.js 26.13.0 LTS and pnpm 12.16.1 are pinned in `.nvmrc` and
  `package.json`; dependencies are locked in `pnpm-lock.yaml`.
- The planned v1 direction is PostgreSQL, local image storage, and real AI
  review, with no authentication or Python service. See `LEAN_PLAN.md` and
  `STACK.md`.
- No database, API, migration, test suite, CI workflow, deployment target, or
  real AI integration is currently configured.

## Initial setup scope

The setup branch is for project documentation, agent instructions, and
permission configuration. It does not replace or extend the product prototype.
The initial setup spec is [`specs/0001-project-setup.md`](specs/0001-project-setup.md).

## Follow-up work

Create a separate accepted spec and branch for each product capability. Resolve
the database library, concrete schema, upload limits, review trigger/provider,
cost budget, streak edge cases, and deployment in the feature specs that need
those decisions. Keep any database migrations additive.

No changes should be staged from parent directories or other projects when
working in this repository; the current Git worktree includes unrelated paths
outside this project.
