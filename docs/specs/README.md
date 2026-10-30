# Feature specs

One file per accepted unit of work: `NNNN-short-name.md`. Copy
[`0000-template.md`](0000-template.md). The initial documentation/agent setup
is tracked in [`0001-project-setup.md`](0001-project-setup.md).
The accepted toolchain migration is tracked in
[`0002-stable-toolchain-pnpm.md`](0002-stable-toolchain-pnpm.md).
The Strokio rebrand is tracked in [`0003-rebrand-strokio.md`](0003-rebrand-strokio.md).

Lifecycle: `draft` → `accepted` (human sign-off; implementation starts only on
`accepted`) → `in-progress` → `shipped`. On `shipped`, fold the result into
`docs/SPEC.md`, update its status table, and add a `CHANGELOG.md` entry. Keep
shipped specs; do not delete them.

Reference `docs/SPEC.md` for current behavior and `docs/LEAN_PLAN.md` for v1
product direction rather than duplicating those documents. A spec describes
one task/feature and includes testable acceptance criteria.
