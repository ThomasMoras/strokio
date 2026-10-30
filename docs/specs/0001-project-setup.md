# 0001 — Project documentation and agent setup

- Status: shipped
- Contract impact: none
- Touches: `AGENTS.md`, `README.md`, `docs/STACK.md`, `opencode.json`, `.github/CODEOWNERS`, `docs/**`, `CHANGELOG.md`

## Goal

Make the initial repository setup accurately describe Strokio,
its current prototype, its focused v1 experiment, and its long-term vision.
Establish project-specific agent instructions and configuration for subsequent
accepted product work.

## Scope

- In: replace generic setup placeholders; refresh the README, current-system
  specification, v1 plan, iteration/setup notes, and documentation references;
  describe agent permissions and the accepted-spec workflow.
- Out: application behavior, database/API setup, AI integration, dependency
  changes, test tooling, CI, deployment, and owner/branch-protection setup.

## Contract changes

None. The current app has no formal external API contract. Do not create one as
part of repository setup.

## Behaviour

- Treat `docs/strokio-full-vision.md` as long-term product direction.
- Treat `docs/LEAN_PLAN.md` and `docs/STACK.md` as v1 product/technical direction.
- Describe the currently implemented client-side prototype separately from
  planned v1 capabilities.
- Keep the initial setup on its current branch; later product features use
  their own accepted specs and branches.
- Keep OpenCode permissions free of template paths and preserve environment
  file restrictions.

## Acceptance criteria

1. Project documentation clearly separates current prototype, focused v1, and
   long-term vision.
2. `AGENTS.md`, README, project spec, and v1 plan contain no generic project
   placeholders and agree on current implementation and tooling.
3. OpenCode configuration contains project paths and valid JSON, with no
   template protected-path or contract rules.
4. The feature-spec workflow and initial-setup/subsequent-feature branch policy
   are documented consistently.
5. No application behavior, package dependencies, or lockfiles are changed.
6. The Strokio section of `docs/STACK.md` agrees with the focused v1 plan
   without changing other projects' stack decisions.

## Tests

- Validate `opencode.json` as JSON.
- Check the diff for whitespace errors and unresolved project placeholders.
- No application tests are required for documentation-only changes.

## Open questions

- Repository ownership handles and branch-protection settings remain unset.
- Product and infrastructure decisions listed in `docs/LEAN_PLAN.md` remain
  open until the relevant feature specs.

## Task breakdown (for agents)

1. Refresh project agent instructions, README, OpenCode permissions, and shared
   stack documentation.
2. Reconcile current system, long-term vision, v1 plan, and setup documentation.
3. Check internal consistency and validation output; update the changelog last.
