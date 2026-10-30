# 0002 — Node.js LTS and pnpm toolchain

- Status: accepted
- Date: 2026-10-28

## Context

The repository used Node.js 20, which has reached end of life, npm, and a
Next.js 15 release approaching the end of its maintenance window. The initial
dependency audit found seven vulnerabilities, including critical and high
severity advisories. The project needs a supported runtime and reproducible
package manager while upgrading to current stable framework packages.

## Decision

- Use Node.js 26.13.0, the current Node 26 LTS release, pinned in `.nvmrc` and
  constrained in `package.json`.
- Use pnpm 12.16.1, pinned through `packageManager` in `package.json` and a
  single `pnpm-lock.yaml` lockfile.
- Use Next.js 16.4.3 Active LTS and stable, compatible versions of its runtime
  and build dependencies.
- Use ESLint's flat-config CLI instead of the removed `next lint` command.
- Remove `autoprefixer`; Tailwind CSS 4's PostCSS plugin handles the required
  vendor prefixing.
- Explicitly allow `unrs-resolver`'s postinstall script to select its native
  binding for ESLint's TypeScript resolver; other dependency build scripts
  remain blocked unless separately reviewed.

## Consequences

- Contributors need the Node.js 26 LTS line and pnpm 12.
- npm lockfile installation is no longer supported for this repository.
- Dependency updates and security review use `pnpm audit`.
- Reassess the pinned Node/pnpm versions and dependencies during regular
  maintenance, updating this decision when the supported LTS line changes.
