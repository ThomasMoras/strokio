# 0004 — Establish a maintainable application architecture

- Status: shipped
- Contract impact: none
- Touches: `app/**`, `components/**`, `data/**`, `lib/**`, `src/**`, `tsconfig.json`, `AGENTS.md`, `opencode.json`, `README.md`, `docs/SPEC.md`, `CHANGELOG.md`

## Goal

Organize the current prototype around clear delivery, business-domain, and
shared-UI boundaries so the planned single-user v1 can grow without coupling
unrelated business responsibilities. Keep the current user-visible behavior
intact and make future integration points explicit without implementing
unapproved product capabilities.

## Business goal

Strokio's business purpose is to help a person assess their drawing skills,
track meaningful progression, and enjoy a sustainable drawing practice.
Personalization/customization for the user is a v2 direction; it is not added to
the current v1 experiment scope by this architecture refactor.

## Scope

**In scope**

- Move application source into a conventional `src/` tree, retaining Next.js App
  Router conventions.
- Organize implemented product code by business domain and keep route files
  focused on routing, metadata, and delivery-level composition.
- Establish dependency rules between routes, business domains, application
  workflows, and shared code.
- Define when a component belongs in shared UI versus a business domain.
- Remove files only when repository references and runtime/build use confirm that
  they are obsolete. Do not classify generated/ignored build artifacts as source.
- Update the repository guide and current-system layout documentation after the
  refactor ships.

**Out of scope**

- Changing prototype behavior, route URLs, browser-storage behavior, or the
  prototype's mock-feedback status.
- Adding PostgreSQL, an ORM, migrations, API endpoints, image-storage services,
  an AI provider, background jobs, or authentication.
- Adding a component library or test framework.
- Creating empty modules for business capabilities that have not started.

## Proposed structure

```text
src/
  app/                         Next.js routes, layouts, metadata, route handlers,
                               and route-private delivery composition
  domains/
    practice/                  components/, model/, data/
    assessment/                components/, model/
    progress/                  components/, model/, infrastructure/
  application/                 Use cases coordinating business domains
  shared/
    ui/                        Domain-neutral, reusable presentation components
    lib/                       Small, framework-neutral utilities
```

Current ownership is expected to map to the business domains as follows:

| Existing code | Destination / owner |
|---|---|
| Exercise catalog and `ExerciseCard` | `domains/practice` |
| `ProgressTracker` and browser storage | `domains/progress` |
| `ImageUploader` | `domains/assessment` as the drawing-submission input to evaluation |
| Mock feedback display and generator | `domains/assessment`, retaining explicit mock/example naming; pass only the exercise identifier/data the generator needs |
| Landing, roadmap, and exercise-detail screen composition | Relevant `app` route segment; compose domain UI without owning business rules |

Routes deliver the user experience but do not own business rules. Cross-domain
business workflows belong in `application/`; route-level composition should
remain presentation and delivery glue. Domain components receive data and
callbacks through props rather than importing another domain's implementation
details. For example, an exercise card can receive its completion state from
composition instead of reading progress storage itself.

Only directories needed by code being moved are created. Additional business
capabilities such as goals and user customization get domain modules when their
accepted specs begin implementation, rather than as empty placeholders.
Domain-owned I/O adapters are added with the capability that needs them; shared
server/database infrastructure is introduced by the accepted persistence spec.

## Architecture rules

1. **Dependency direction:** `app` handles web delivery and composes UI/use
   cases; `application` coordinates domain APIs; domains may use `shared`; and
   shared code must not depend on domains. Domain internals are not imported
   directly by other domains. Cross-domain business coordination belongs in an
   application workflow rather than in a route or another domain's UI.
2. **Business ownership:** product-specific UI, types, rules, and data belong
   to the domain that owns the business concept. Names such as `ExerciseCard`
   remain practice-specific even if their styling resembles a generic card.
3. **Shared UI reuse:** move or add a component under `shared/ui` only when it is
   presentation-focused, has no product-domain assumptions, and is used (or is
   concretely required) by at least two domain contexts. Avoid speculative
   universal components and broad prop APIs. Keep domain-specific composition
   in its domain.
4. **Boundary adapters:** browser storage and mock feedback remain explicitly
   named as prototype implementations. When persistence, image storage, or AI is
   implemented, keep provider/file/database details behind focused
   domain-owned adapters; choose their concrete contracts in the relevant
   accepted implementation spec.
5. **Next.js boundaries:** route modules and components are Server Components by
   default. Add client boundaries only where browser APIs or interactive React
   state are needed.
6. **No speculative infrastructure:** do not add empty repositories, generic
   service layers, dependency-injection frameworks, or abstractions without a
   current caller and a requirement in an accepted spec. Keep `application/`
   limited to real cross-domain use cases.

## Contract changes

None. Public URLs and behavior remain unchanged; no external or internal API
contract is introduced by this structural refactor.

## Acceptance criteria

1. The source tree follows the proposed delivery/domain/shared boundaries, and the
   current pages and behaviors remain available at the same URLs.
2. Each moved module has one clear business-domain owner; shared UI contains no
   product-specific components or imports from domains.
3. Routes and domains do not reach into another domain's private files;
   cross-domain business workflows are kept out of route components.
4. Browser persistence and example feedback remain clearly identified as
   prototype behavior; no planned v1 capability is described as implemented.
5. The project goal is stated in terms of skill assessment, progression, and
   enjoyable practice; user customization remains identified as v2 direction,
   outside the current v1 scope.
6. No unreferenced project source/configuration file is removed without
   confirming it is not used by the app, tooling, or documentation workflow.
7. `README.md` and `docs/SPEC.md` describe the resulting repository layout.
8. `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass; existing documented lint
   warnings remain visible unless the refactor naturally removes one.

## Tests

No test framework is configured, and this refactor changes organization rather
than behavior. Do not add test tooling solely for the move. Run typecheck, lint,
and production build, and verify the existing routes remain included in the
build.

## Open questions

None. The proposed `src/app`, `src/domains`, `src/application`, and `src/shared`
structure and business-domain boundaries are accepted.

## Task breakdown (for agents)

1. Confirm the source/import graph and move route, domain, and shared code into
   the agreed structure without changing behavior.
2. Update TypeScript path aliases and imports; keep client/server boundaries
   valid under Next.js.
3. Remove only confirmed obsolete source files, if any; do not remove ignored
   generated artifacts as project cleanup.
4. Update README and current-system layout documentation, then run the required
   checks and record the shipped spec/changelog status.
