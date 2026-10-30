# Changelog

## [Unreleased]

### Added
- Accepted spec 0001 for the initial project documentation and agent setup.
- ADR 0001 recording the single-user, no-auth v1 product scope.
- ADR 0002 recording the Node.js LTS and pnpm toolchain.

### Changed
- Replaced generic agent-template instructions and README with project-specific
  guidance and commands.
- Clarified the Strokio v1 stack in `docs/STACK.md` while preserving its
  shared decisions for the other projects.
- Rewrote the lean plan around the focused v1 experiment and distinguished it
  from the current prototype and long-term vision.
- Updated the current system specification, iteration/bootstrap notes, and
  OpenCode permissions to match the repository.
- Migrated the toolchain to Node.js 26 LTS, pnpm 12, Next.js 16, React 19.3,
  Tailwind CSS 4.3, and the latest stable compatible TypeScript and lint tools.
- Replaced `next lint` with ESLint CLI and recorded the remaining prototype
  warnings.
- Full and production dependency audits report no known vulnerabilities.
- Rebranded the project as Strokio across the package, app metadata, landing
  page, and documentation; renamed the full-vision document.
- Migrated browser-local progress to Strokio key names while preserving and
  copying forward values stored under the former keys.

### Removed
- Retired the unused example feature spec; the generic feature template remains
  in `docs/specs/0000-template.md`.
- Removed `package-lock.json` and the redundant Tailwind 4 `autoprefixer` plugin.

Product behavior and external contracts are unchanged.
