# Strokio

Strokio is an experiment in making drawing practice consistent
and progress visible. Its long-term loop is: set a goal, practice from a
focused prompt, submit a drawing, receive critique, and track skill progress.

The repository currently contains a **client-side prototype** for the learning
flow. The first product experiment is planned as a **single-user, no-auth v1**;
see [`docs/LEAN_PLAN.md`](docs/LEAN_PLAN.md). The broader product direction is
in [`docs/strokio-full-vision.md`](docs/strokio-full-vision.md).

## Current prototype

- Landing page and a roadmap of 12 fixed drawing exercises.
- Exercise detail pages with PNG/JPEG file preview and mock feedback.
- Exercise completion and a basic daily streak stored in browser `localStorage`,
  with legacy progress copied forward to Strokio's storage keys.
- No account, server-side persistence, image storage service, or real AI review
  is implemented yet.

## Planned v1 experiment

The v1 plan focuses on one person pursuing a manga-related drawing goal, with a
fixed skill taxonomy, daily practice/check-in, drawing submissions, real AI
review, and a progress view. Its technical direction is PostgreSQL, local image
storage, and a TypeScript/Next.js application, following
[`docs/STACK.md`](docs/STACK.md).
The product and technical scope is defined in `docs/LEAN_PLAN.md`; it is not a
claim about the current implementation.

## Run locally

Requirements: Node.js 26.13.0 LTS and pnpm 12.16.1. `.nvmrc` records the Node.js
version; `package.json` pins the package manager.

With nvm, activate the pinned Node.js version:

```sh
nvm install
nvm use
```

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000). Available scripts:

```sh
pnpm build
pnpm lint
pnpm typecheck
pnpm audit
```

There is no automated test suite configured yet. ESLint runs through the CLI;
Next.js 16 no longer provides `next lint`. See `package.json` for script
definitions. Lint currently reports three existing synchronous state-in-effect
warnings and one image-element warning; these remain visible for follow-up work.

## Repository guide

| Path | Purpose |
|---|---|
| `app/` | Next.js routes and app-wide styles |
| `components/` | Prototype screens and UI components |
| `data/` | Static exercise catalog |
| `lib/` | Browser storage and mock feedback helpers |
| `docs/SPEC.md` | Current system and implementation status |
| `docs/LEAN_PLAN.md` | Focused v1 experiment plan |
| `docs/strokio-full-vision.md` | Long-term product vision |
| `docs/specs/` | Accepted and proposed work specs |
| `docs/adr/` | Durable technical decisions |
| `docs/STACK.md` | Shared technical conventions, including Strokio v1 direction |
| `AGENTS.md`, `opencode.json` | Agent workflow and permissions |

## Working on the project

Read [`AGENTS.md`](AGENTS.md) and [`docs/specs/README.md`](docs/specs/README.md)
before starting work. The initial repository and agent setup stays on its
current branch; subsequent product features use their own accepted spec and
feature branch.
# strokio
