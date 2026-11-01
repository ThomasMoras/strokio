# Agent instructions

Project and product context: `docs/SPEC.md`. The long-term product direction is
`docs/strokio-full-vision.md`; the focused first experiment is
`docs/LEAN_PLAN.md`.

## Project

**Strokio** helps one person build a regular drawing practice,
get useful critique, and see progress toward a drawing goal. The current app is
a client-side prototype; it is not the planned v1 product.

The current system description in `docs/SPEC.md` is authoritative for what is
implemented. The approved v1 direction is in `docs/LEAN_PLAN.md`, with shared
technical conventions in `docs/STACK.md`.

## Repository map

| Path | Agent access |
|---|---|
| `src/**` | Read/write for accepted feature work |
| `docs/specs/**`, `docs/adr/**` | Read/write for drafting and recording decisions |
| `docs/**` | Read/write for documentation work in the accepted scope |
| `opencode.json`, `.github/**`, `AGENTS.md` | Read/write when agent setup or guardrails are in scope |
| `docs/SPEC.md`, `CHANGELOG.md` | Update last, when the accepted spec calls for it |
| `package.json`, lockfiles | Change only when the accepted spec requires it |
| `tests/**`, `**/fixtures/**` | Add tests freely; never alter existing tests/fixtures just to make a task pass |

There is currently no protected source tree, formal API contract, or database
migrations directory. Do not create a contract or migration policy by
assumption; propose it in the relevant feature spec first.

## Stack and conventions

- TypeScript, Next.js App Router, React, and Tailwind CSS 4.
- Node.js 26.13.0 LTS and pnpm 12.16.1 are pinned in `.nvmrc` and
  `package.json`.
- Follow `docs/STACK.md` for the planned v1 technical direction: PostgreSQL,
  Drizzle (or Prisma after a decision), local image storage, and real AI review.
- Python is not part of the Strokio v1.
- Keep the current prototype accurately labelled; do not describe mock feedback
  as AI review or browser-local state as database persistence.
- Prefer focused modules and adapters over branching logic at call sites.

## Commands

```sh
pnpm dev          # start the local app
pnpm build        # production build
pnpm lint         # ESLint CLI
pnpm typecheck    # TypeScript check
```

There is no test suite configured yet. Add the relevant test tooling as part of
an accepted feature spec that needs it. Keep these commands synchronized with
`package.json` and report any command that fails; do not silently rewrite the
tooling to hide a failure.

Use `pnpm audit` to review dependency advisories after dependency changes.
The current ESLint warnings from the prototype are listed in `README.md`; keep
them visible until an accepted app-change spec addresses them.

## Workflow

1. Start feature work from `docs/specs/NNNN-name.md`. It must have status
   `accepted`; otherwise stop and ask for acceptance or scope clarification.
2. Before nontrivial changes, present the files, tests, contract impact, and
   open questions in a plan, then wait for approval.
3. Keep the current branch for the initial repository/agentic setup. Once that
   setup is complete, use a separate branch for each accepted product feature.
4. Add or update tests first where practical. Do not change existing tests or
   fixtures merely to make them pass.
5. Update `docs/SPEC.md` and `CHANGELOG.md` at the end when the accepted spec
   requires it. Keep the long-term vision, v1 plan, and current implementation
   clearly distinguished.
6. Finish with a report of changes, checks, deviations, and unresolved items.

## Guardrails

- Do not add authentication, social features, payments, mobile clients, a
  drawing canvas, or model fine-tuning to v1 unless a new accepted spec changes
  scope.
- Never add a paid/keyed dependency without flagging it in the plan.
- Do not make destructive database changes without explicit human instruction.
- No formal external API contract exists today. If a feature needs one, propose
  it in the feature spec before implementation.
- Record durable technical choices in `docs/adr/`.
- `opencode.json` contains the agent permission rules. `CODEOWNERS` currently
  has no owners configured; do not claim it enforces review until handles and
  branch protection are configured.
