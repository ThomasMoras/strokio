# 0002 — Stable LTS toolchain, dependency audit, and pnpm migration

- Status: shipped
- Contract impact: none
- Touches: `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.nvmrc`, `.gitignore`, `postcss.config.mjs`, `eslint.config.mjs`, `components/RoadmapPage.tsx`, `tsconfig.json`, `AGENTS.md`, `README.md`, `docs/SPEC.md`, `docs/bootstrap-plan.md`, `docs/adr/`, `CHANGELOG.md`

## Goal

Use the current Node.js Active LTS line and stable, compatible dependency
releases; migrate installation and scripts from npm to pnpm; and resolve the
known dependency audit findings.

## Scope

- In: pin the Node.js LTS line, set the pnpm package manager/version, update
  declared dependencies to current stable compatible releases, migrate the
  lockfile and documentation, and configure linting for Next.js 16's ESLint
  CLI. Remove dependencies that Tailwind CSS 4 no longer needs.
- Out: product features, database/API setup, test framework adoption, CI,
  deployment changes, and changes to drawing behavior beyond compatibility
  fixes required by the framework upgrade.

## Proposed toolchain baseline (2026-10-28)

- Node.js **26.13.0**, Node.js 26 Active LTS.
- pnpm **12.16.1**, pinned in `packageManager`.
- Next.js **16.4.3**, Active LTS; React and React DOM **19.3.1**.
- Tailwind CSS and `@tailwindcss/postcss` **4.3.3**; PostCSS **8.5.32**.
- TypeScript **6.0.3**, the latest stable version allowed by the current
  `typescript-eslint` peer range; React types **19.3.0** and Node types
  **26.6.5**. Node types **26.6.6** was newly published within pnpm's release
  age window, so the previous stable patch avoids a release-age exception.
- ESLint **10.13.0** with `eslint-config-next` **16.4.3** and flat config;
  Next.js 16 no longer provides `next lint`.
- Remove `autoprefixer` because the current Tailwind 4 PostCSS setup does not
  require it.

Use stable releases only, not `canary`, preview, or release-candidate versions.
If a proposed release is incompatible with the app, retain the latest stable
version supported by the selected framework and document the reason.

## Contract changes

None. This is a tooling and dependency update; there is no external API
contract.

## Behaviour

- Use pnpm for install, scripts, audit, and lockfile maintenance; remove the npm
  lockfile and do not keep dual package-manager lockfiles.
- Record the Node.js and pnpm requirements in the manifest and developer docs.
- Keep the existing `dev`, `build`, `start`, and `lint` workflows; migrate lint
  to ESLint CLI because Next.js 16 removes `next lint`.
- Keep React's effect-state synchronization rule visible as warnings for the
  current prototype; avoid unrelated state-management changes in this tooling
  update.
- Explicitly allow only the required `unrs-resolver` postinstall script in pnpm;
  keep other dependency build scripts subject to pnpm's approval policy.
- Audit production and development dependencies, fix reported vulnerabilities
  through stable updates, and report any remaining advisories without hiding
  them through overrides or audit suppression.
- Do not add paid or keyed dependencies.

## Acceptance criteria

1. The repository specifies Node.js 26 LTS and a pinned pnpm 12 release.
2. Only `pnpm-lock.yaml` is committed as the package-manager lockfile; installs
   work with the frozen lockfile.
3. Direct dependencies and toolchain packages use stable, mutually compatible
   releases; removed packages are no longer referenced by config or manifest.
4. `pnpm run lint`, `pnpm exec tsc --noEmit`, and `pnpm run build` complete.
5. `pnpm audit` is run for the full dependency tree and production dependencies;
   no critical/high vulnerabilities remain, and any other findings are
   documented.
6. README, AGENTS, system/bootstrap docs, and package scripts consistently use
   pnpm and state the Node LTS requirement.
7. Product behavior is unchanged apart from required Next.js compatibility
   updates.

## Tests

- `pnpm install --frozen-lockfile`
- `pnpm audit` and `pnpm audit --prod`
- `pnpm run lint`
- `pnpm exec tsc --noEmit`
- `pnpm run build`
- No test suite is configured; no framework is added in this scope.

## Compatibility notes

- TypeScript 7 is not selected because `typescript-eslint` currently declares
  a peer range below 6.1. Next.js 16.4 officially supports ESLint 10; some
  included lint plugins have not yet updated their peer declarations, which
  may result in upstream peer warnings.

## Task breakdown (for agents)

1. Pin Node/pnpm and update the manifest to compatible stable dependency
   versions; remove `package-lock.json` and generate `pnpm-lock.yaml`.
2. Configure ESLint CLI and remove the obsolete Tailwind 4 Autoprefixer plugin.
3. Update repository instructions, README, current/bootstrap docs, and record
   the toolchain decision in an ADR.
4. Run installation, audit, lint, typecheck, and build checks; update the
   changelog last.
