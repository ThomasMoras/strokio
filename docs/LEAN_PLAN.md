# Strokio — Focused v1 Plan

This plan translates the long-term product vision into the first product
experiment. `strokio-full-vision.md` remains the long-term vision;
`STACK.md` provides shared technical direction. This plan describes intended
work, not current implementation. The current app is a localStorage/mock-feedback
prototype; see [`SPEC.md`](SPEC.md). The single-user scope is recorded in
[`adr/0001-v1-product-scope.md`](adr/0001-v1-product-scope.md).

## 1. Experiment goal

Test whether one person can build a regular drawing habit and find structured
AI critique useful while progressing toward a concrete manga-related goal.

**User:** one person, on one installation, with no authentication or
multi-user support.

**Core loop:** choose a goal → practice a daily prompt → submit a drawing → get
AI critique → review streak and skill progress.

## 2. In scope

- A single manga-related goal represented by a fixed skill taxonomy.
- Daily practice prompt and a low-friction practice check-in.
- Drawing upload associated with one or more skills/category and optional
  notes.
- Real AI review of the submitted drawing, with feedback presented as coaching
  rather than ground truth.
- Progress view for skills and practice streak/history.
- Local single-user persistence, without accounts or remote sharing.

Initial skill groups follow the full vision:

- **Fundamentals:** line control, shapes/construction, perspective,
  anatomy/figure, hands, faces/expressions.
- **Manga-specific:** panel layout, inking, screentones, backgrounds,
  composition/storytelling.

The v1 experience can use a curated practice path. Adaptive prompt generation,
weekly summaries, manga page critique, and a broad general-drawing curriculum
remain future work.

## 3. Out of scope

- Authentication, multiple users, account recovery, or account deletion flows.
- Social/sharing features, payments, subscriptions, or email reminders.
- Native mobile applications or an in-app drawing canvas.
- Model fine-tuning, multi-step Python agents, and real-time critique while
  drawing.
- Admin tooling for authoring exercises.

## 4. Intended architecture

- **Application:** Next.js App Router, TypeScript, Tailwind; route handlers for
  application APIs.
- **Database:** PostgreSQL with one ORM selected in an accepted implementation
  spec (shared stack currently recommends Drizzle; Prisma remains an option).
- **Image storage:** local storage for the single-user experiment. Keep the
  storage interface replaceable for later S3-compatible storage.
- **AI:** direct TypeScript Anthropic SDK call for the single vision review,
  returning schema-validated structured output. No Python service in v1.
- **Background work:** use a PostgreSQL-backed `jobs` table for asynchronous
  reviews, following the shared stack's `FOR UPDATE SKIP LOCKED` worker
  convention. Keep the queue implementation in TypeScript for v1.
- **Tests:** Vitest for unit/integration tests and Playwright for essential
  user flows, introduced when the corresponding feature is implemented.

No API contract, database schema, migration, provider integration, model choice,
image size limit, or deployment target has been established in code. Each is to
be specified before implementation of the feature that needs it.

## 5. Data model sketch

The long-term model can be narrowed during v1 feature specs:

- `Goal(title, targetDate?)`
- `Skill(slug, name, category)` and `UserSkill(skillId, level, xp)`; the user
  dimension is optional in a no-auth single-user v1.
- `Drawing(imageKey, skillIds, category, notes, createdAt)`
- `Review(drawingId, model, promptVersion, scores, feedback, nextExercise,
  status)`
- `CheckIn(date, drawingId?)`
- `Exercise(skillId, prompt, difficulty)`

Use additive migrations only. The concrete schema and ownership rules belong
in the database feature spec.

## 6. Review behaviour

**Input:** submitted image, declared skill/category, current skill level, and
the last two or three reviews for the relevant skill when available.

**Structured output:** per-skill scores (1–5), two or three strengths, two or
three specific improvements, one next exercise, and comparison with a previous
drawing when available. Validate output before storing or displaying it.

Use skill rubrics and versioned prompts to make changes reviewable. A failed or
invalid review must not discard the drawing; represent review state and allow a
retry. Treat image content as untrusted input and never execute instructions
found in it. Return “can't assess” for non-drawings or mismatched skill tags
rather than forcing a score.

Scores are coaching signals, not objective truth. Show trends rather than
over-weighting one score, and allow the user to disagree with feedback.

## 7. Habit and progress behaviour

- A daily check-in can be a drawing upload or a “practiced offline” action.
- Track a streak and a weekly calendar without shaming copy.
- Use the user's local timezone for day boundaries; settle travel, DST, and
  timezone-change behavior before streak implementation.
- The initial prompt should be small enough to encourage a short practice
  session. XP and level-up animation are optional polish, not prerequisites.
- Weak-skill targeting can begin as a visible recommendation before becoming
  adaptive automation.

## 8. Acceptance criteria for the v1 experiment

1. A single user can set or choose the experiment's manga-related goal and see
   its skills/practice path.
2. The user can see and complete a daily practice prompt, including recording
   offline practice.
3. The user can upload a drawing, associate it with a skill/category, and add
   optional notes.
4. A real AI review returns validated structured feedback or a visible,
   retryable failure state without losing the drawing.
5. A progress view shows practice history/streak and skill-level trends.
6. Core data persists across application restarts on the single-user install.
7. Upload validation and AI review edge cases are covered by tests for the
   implemented features.
8. The interface clearly presents model critique as coaching and discloses
   that an image is sent to an AI provider.

The product experiment's success signals are the long-term vision's initial
targets: at least 60% of testers return on three or more days during week one,
and at least 70% of reviews are rated useful. Set a review-cost budget before
enabling real reviews for testers.

## 9. Suggested implementation sequence

Each stage gets its own accepted feature spec and feature branch after the
initial setup branch is complete:

1. **Foundation and persistence:** selected schema/ORM, local image storage,
   upload metadata, and local development workflow.
2. **Goal and practice loop:** goal/skill setup, curated prompts, check-ins,
   timezone-aware streaks.
3. **AI review:** provider integration, rubric and prompt versioning, output
   validation, retryable review status, and review UI.
4. **Progress and gallery:** skill trends, practice calendar, drawing history,
   and review details.
5. **Test and evaluate:** edge-case coverage, cost instrumentation, feedback
   usefulness signal, and a small user experiment.

The stages are dependencies, not calendar estimates. Revisit sequencing after
the first user test.

## 10. Edge cases to resolve in feature specs

**Uploads:** accepted MIME types and size limits; image resizing, EXIF rotation
and stripping; duplicate submissions; low-light/glare/cropping; rejecting
non-drawings; unsafe content handling.

**AI:** timeout and retry policy; malformed JSON and repair behavior; daily
review caps, downscaling, cache strategy, and budget; rubric consistency;
prompt injection via image text; unsupported or mismatched drawing subjects.

**Habit:** timezone changes, DST, travel, backfilled practice, streak freeze
policy, duplicate check-ins, and missed-day behavior.

**Privacy:** local image protection, retention/deletion behavior, AI-provider
disclosure, and what must be removed if the single-user data is reset.

## 11. Decisions still required

- Confirm the manga-specific skill taxonomy versus adding a general-drawing
  track later.
- Select the database ORM and concrete schema for the first persistence spec.
- Choose automatic versus user-triggered AI review, the concrete vision model,
  and a per-day cost cap.
- Set accepted upload formats, file size, and review image resizing policy.
- Specify timezone/backfill rules for streaks.
- Choose deployment and local backup/reset behavior.
