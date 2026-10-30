# Iteration 1 — Repository and agent setup

This iteration establishes project-specific documentation and agent guardrails
on the initial setup branch. It does not implement product features or change
the existing client-side prototype.

## In scope

- Replace generic agentic placeholders with Strokio guidance.
- Describe the current prototype separately from the planned v1 experiment and
  long-term product vision.
- Refresh the README and replace the obsolete lean plan with the focused v1 plan.
- Establish the accepted-spec workflow for subsequent product feature branches.

## Out of scope

- Implementing v1 persistence, upload services, AI reviews, authentication, or
  any other product feature.
- Selecting details still open in `docs/LEAN_PLAN.md` (model, ORM, limits,
  deployment, and review trigger).

## Exit criteria

- [x] No project-specific agent/configuration/documentation placeholders remain.
- [x] README, current system specification, v1 plan, and long-term vision agree
      on what is implemented versus planned.
- [x] OpenCode configuration is valid JSON and uses project-specific paths.
- [x] Repository instructions match the package scripts and current stack;
      the existing lint prompt is documented.
- [x] Documentation links and spec lifecycle references are consistent.
