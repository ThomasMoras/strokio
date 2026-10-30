# Strokio — Current System Specification

This document describes what is implemented today. Product direction is in
[`strokio-full-vision.md`](strokio-full-vision.md); the focused
single-user v1 plan is in [`LEAN_PLAN.md`](LEAN_PLAN.md). Agent workflow is in
[`../AGENTS.md`](../AGENTS.md).

Current work: initial repository and agentic setup on this branch. Product
features will be scoped in `docs/specs/` and implemented on separate branches.

## 1. Product goal

Help a person make drawing practice regular and see progress toward a concrete
drawing goal. The intended long-term loop is goal setting, daily practice,
drawing submission, critique, and skill progress.

## 2. Current implementation

The checked-in application is a frontend prototype, not the planned v1 product.

**Implemented**
- Next.js App Router home page, `/roadmap`, and `/exercise/[id]` routes.
- A static catalog of 12 general drawing exercises.
- PNG/JPEG image selection and in-browser preview on the exercise page.
- Deterministic exercise completion and basic streak state in browser
  `localStorage`.
- Template-based mock feedback; no AI provider is called.

**Not implemented**
- User accounts, server APIs, PostgreSQL, migrations, or durable server storage.
- Persisted drawing files, submission gallery, goal onboarding, or skill levels.
- Real AI review, review jobs, or review feedback controls.
- Adaptive prompts, timezone-aware check-ins, or a progress dashboard.

## 3. Product scope boundaries

The first planned product experiment is single-user and has no authentication.
Its intended capabilities and acceptance criteria are in `LEAN_PLAN.md`. The
long-term vision extends beyond that experiment to broader goals, adaptive
curricula, and potentially multi-user operation.

Social features, payments, a mobile app, an in-app drawing canvas, and model
fine-tuning are outside the planned v1 scope.

## 4. Repository layout

```text
app/                         Next.js routes and global styles
components/                  Prototype UI components
data/exercises.ts            Static 12-exercise catalog
lib/                         Browser persistence and mock feedback
docs/SPEC.md                 Current implementation (this document)
docs/LEAN_PLAN.md            Focused v1 experiment
docs/strokio-full-vision.md    Long-term product vision
docs/STACK.md                Shared technical conventions and v1 direction
docs/iterations/             Setup and feature iteration scope
docs/specs/                  Proposed and accepted work specs
docs/adr/                    Durable technical decisions
AGENTS.md                    Agent workflow and conventions
opencode.json                OpenCode project permissions
```

## 5. Data and interfaces

The prototype has no server data model. Browser state is held under the
`strokio-progress` and `strokio-streak` localStorage keys. On first read, prior
values under the `drawing-platform-progress` and `drawing-platform-streak` keys
are copied forward and retained.
Exercise definitions are static TypeScript data in `data/exercises.ts`.

There is no formal, versioned external API or shared contract in the current
application. A future feature spec must define any API boundary it introduces
before implementation. The planned v1 data model and infrastructure are
summarized in `LEAN_PLAN.md` and `STACK.md`.

## 6. Runtime dependencies and deployment

The current application uses Next.js, React, TypeScript, and Tailwind CSS. It
does not call external services. The runtime is Node.js 26.13.0 LTS, with pnpm
12.16.1 as the package manager. Local development uses `pnpm dev`; no
deployment target is selected or documented as implemented.

The planned v1 uses PostgreSQL, local image storage, and Anthropic vision review
as the technical direction. The concrete model, review trigger, cost limits,
and deployment choices remain feature-spec decisions until accepted.

## 7. Work status

| Spec | Scope | Status |
|---|---|---|
| [0001](specs/0001-project-setup.md) | Project documentation and agent setup | shipped |
| [0002](specs/0002-stable-toolchain-pnpm.md) | Stable toolchain and pnpm migration | shipped |
| [0003](specs/0003-rebrand-strokio.md) | Strokio rebrand | shipped |
| Product v1 | Defined by `LEAN_PLAN.md`; implementation not started | planned |

Spec lifecycle: `draft` → `accepted` → `in-progress` → `shipped`.

## 8. Open items

- Select the concrete database library (Drizzle or Prisma) for v1.
- Decide review trigger, concrete model, and review-cost budget.
- Specify v1 upload format/size limits and local storage lifecycle.
- Decide the exact single-user goal and skill taxonomy for the first experiment.
- Select a deployment target when deployment work is in scope.
