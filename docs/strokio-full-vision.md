# Strokio — Full Vision Plan

> Long-term vision document. The focused first experiment is single-user with no
> authentication; its current scope and acceptance criteria are in
> [`LEAN_PLAN.md`](LEAN_PLAN.md). This document describes capabilities beyond
> that first experiment and is not a claim about the current implementation.

## 1. Product scope

**Problem:** Drawing progress is invisible and practice is irregular.

**Core loop:** set goal → daily practice prompt → upload drawing → AI feedback → streak and skill progress.

**Core features (long-term):**

1. **Dashboard analytics** — measure and visualize the user's improvement over
   time.
2. **Interactive dashboard UI** — a rich interactive web dashboard, with a
   future mobile version of the same experience.
3. **Personalized drawing suggestions** — a module recommending what to
   practice next, based on user preferences, level, and history.
4. **AI features** — drawing analysis (per-drawing critique) and user
   evaluation (skill assessment over time).

**Supporting capabilities:**

- Goal (e.g. "first manga page") decomposed into skills
- Daily practice + check-in with streak
- Upload drawings, tagged by skill/category

**Not planned for the first experiment:** social features, the mobile version,
payments, drawing canvas, model fine-tuning, authentication, and multi-user
support. The mobile version is a long-term core-feature target, not v1.

## 2. Core feature — Dashboard analytics

Answer "am I improving?" with data instead of impressions.

- **Skill progression:** per-skill levels/XP over time, AI review-score trends
  per skill, radar view of current levels.
- **Practice consistency:** streak calendar, weekly practice volume, habit
  trend.
- **Improvement evidence:** before/after comparison for the same skill or
  exercise, and progress toward the declared goal (vs target date).
- **Review synthesis:** aggregate strengths and recurring fixes across
  reviews; show trends rather than single scores.

Analytics are read-only views over practice data; no scoring behavior lives in
the dashboard itself.

## 3. Core feature — Interactive dashboard UI

- **Web-first:** the dashboard is a rich interactive web UI — filters by
  skill, category, and date; drill-down from any chart to the underlying
  drawings and reviews.
- **Interactivity:** chart tooltips and range selection, before/after
  sliders, streak-calendar navigation, and inline review details without full
  page reloads.
- **Future mobile version:** the same dashboard experience adapted to mobile
  (PWA or React Native — open decision) once the web dashboard is validated.
  Mobile is explicitly long-term; the first experiment is web-only.

## 4. Core feature — Personalized drawing suggestions

A suggestion module that answers "what should I practice next?".

- **Inputs:** user preferences (subjects, style, media, session length),
  current skill levels, recent practice history, and AI review outcomes.
- **Outputs:** the daily practice prompt, weak-skill recommendations, and
  on-demand "suggest something to draw" results.
- **Evolution:** starts rule-based (weakest-skill rotation blended with
  preferences); becomes adaptive once evaluation data accumulates.
- **User control:** suggestions can be dismissed or regenerated, and the user
  can lock a focus skill; feedback on suggestions tunes future ones.

## 5. Core feature — AI features

Two complementary capabilities:

### Drawing analysis (per drawing)

- **Input:** image + declared skill/category + user's level + last 2–3 reviews of that skill.
- **Output (strict JSON):** per-skill scores (1–5), 2–3 strengths, 2–3 specific fixes, one next exercise, comparison to the previous drawing.
- Use rubrics per skill in the prompt so scores stay consistent over time.
- Version prompts (`promptVersion`) to compare changes.

### User evaluation (over time)

- **Skill assessment:** aggregate review scores into skill-level progression
  and level-up decisions.
- **Periodic evaluations:** weekly/monthly summaries of what improved, what
  stalled, and the recommended focus.
- **Adaptive curriculum:** the suggestion module consumes evaluation results
  to adjust the practice path.
- **Coaching, not judgment:** the user can disagree with any review or
  evaluation; scores are signals, not verdicts.

**Limit:** vision models are decent at composition and obvious anatomy/perspective errors, weaker at fine line quality. Frame scores as coaching, not ground truth.

## 6. Skill model

Fixed taxonomy for the PoC, tied to the manga goal:

- **Fundamentals:** line control, shapes/construction, perspective, anatomy/figure, hands, faces/expressions
- **Manga-specific:** panel layout, inking, screentones, backgrounds, composition/storytelling

Each skill has levels (e.g. 1–5), unlocked by practice count and AI scores. Daily prompts are generated from the weakest skills.

## 7. Long-term stack options

These options describe a more mature product and are not all v1 selections.
The first experiment uses PostgreSQL, local image storage, no authentication,
and a TypeScript application; see `LEAN_PLAN.md` and the shared `STACK.md` in
this folder.

| Layer | Choice |
|---|---|
| Frontend | Next.js + TypeScript, Tailwind, shadcn/ui, Recharts |
| Backend | Next.js route handlers (single repo for PoC) |
| DB | Postgres (Supabase or Neon) + Prisma/Drizzle |
| Storage | Local in v1; S3-compatible (Supabase Storage / R2) later |
| Auth | None in v1; Auth.js or Supabase Auth only if multi-user support is added |
| AI | Anthropic SDK, vision model, structured JSON output (zod-validated) |
| Jobs | Async review via queue or simple DB-backed job table |
| Mobile | None in v1; future mobile dashboard reuses the web API (PWA or React Native — open) |

## 8. Long-term data model (sketch)

This multi-user-oriented sketch is not the v1 schema; the first experiment has
no accounts or authentication. Narrow it in future feature specs.

- `User`, `Goal(userId, title, targetDate)`
- `Skill(slug, name, category)`, `UserSkill(userId, skillId, level, xp)`
- `Drawing(userId, imageKey, skillIds[], category, notes, createdAt)`
- `Review(drawingId, model, promptVersion, scores JSON, feedback, nextExercise, status)`
- `CheckIn(userId, date, drawingId?)` — drives streaks
- `Exercise(skillId, prompt, difficulty)`
- `Preference(userId, key, value)` — suggestion-module inputs
- `Suggestion(userId, skillId, prompt, source, status)` — generated practice suggestions

## 9. Habit mechanics

- Daily check-in = one upload or a "practiced offline" mark (low friction is key)
- Streak counter, weekly calendar with checkmarks, streak freeze (1/week)
- Daily 10-minute prompt, small XP, level-up animation
- Timezone-correct "day" boundary (store user timezone)
- Optional email reminder (post-PoC)

## 10. Screens

1. **Onboarding:** pick goal, self-rate skills, set practice preferences
2. **Today:** daily prompt/suggestion, upload, streak
3. **Dashboard:** skill radar/levels, streak calendar, XP and improvement trends (analytics core)
4. **Gallery:** filter by skill/category, before/after
5. **Drawing detail:** image, review, notes
6. **Evaluation summary:** periodic improvement report (long-term)

## 11. Edge cases to settle before coding

### Uploads
- File type/size limits (JPEG/PNG/WebP/HEIC), client-side resize, EXIF stripping/rotation
- Duplicate uploads, same drawing re-uploaded for streak gaming
- Photos of paper: glare, crop, low contrast; non-drawing images
- Content moderation for inappropriate images

### AI
- Model timeouts/failures → retry, `status` field, review never blocks upload
- Invalid JSON → zod validation + one repair retry
- Cost control: per-user daily review cap, image downscaling, cache by image hash
- Inconsistent scoring → rubrics, show trend over single scores
- Prompt injection via text in the image → treat output as untrusted, never execute it
- Non-drawing or wrong-skill tagging → return "can't assess" instead of forcing a score

### Suggestions
- Cold start with no history → fall back to onboarding self-ratings and taxonomy order
- Preference vs weakness conflict → honor preference while surfacing the weak-skill recommendation
- Repetition fatigue → avoid repeating recent suggestions; cap regenerations

### Habit / streaks
- Timezone changes and travel, DST
- Backfilled uploads (use drawing date vs upload date; cap backfill)
- Missed days: freeze vs reset, no shaming copy

### Data / privacy
- Private-by-default images, signed URLs with expiry
- Account deletion deletes images and reviews
- Disclose that images are sent to an AI provider

### Product
- Goal too ambitious → show a realistic skill path, not a deadline promise
- Digital vs. traditional drawers
- Empty states (no drawings yet), first-week experience

## 12. Build phases

1. **Foundation:** schema, local upload pipeline, gallery (without auth in v1)
2. **Habit loop:** check-ins, streaks, daily prompt
3. **AI review:** async job, rubric prompts, structured output, review UI
4. **Dashboard and analytics:** skill levels, charts, progress timeline, interactive filters
5. **Personalized suggestions:** preference capture, rule-based recommendations, later adaptive
6. **Polish + test:** animations, empty states, a few real users
7. **Long-term extensions:** mobile version, adaptive curriculum, evaluation summaries

## 13. PoC success criteria

- ≥ 60% of testers return on 3+ days in week 1
- Users rate reviews "useful" ≥ 70% of the time (thumbs up/down on each review)
- Review cost per drawing under a set budget (to be decided)

## 14. Open decisions

- Skill taxonomy beyond the first manga-focused experiment: manga-only, or
  general drawing with a manga track?
- Review trigger: automatic on upload, or on demand (cheaper)?
- Multi-user/auth: intentionally deferred beyond the first single-user, no-auth
  experiment; revisit only after the first experiment is evaluated.
- Mobile approach for the future mobile dashboard: PWA or React Native.
- Suggestion generation: rule-based heuristics vs model-assisted
  recommendations, and when adaptation begins.
