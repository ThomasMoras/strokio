# Strokio — Full Vision Plan

> Long-term vision document. The focused first experiment is single-user with no
> authentication; its current scope and acceptance criteria are in
> [`LEAN_PLAN.md`](LEAN_PLAN.md). This document describes capabilities beyond
> that first experiment and is not a claim about the current implementation.

## 1. Product scope

**Problem:** Drawing progress is invisible and practice is irregular.

**Core loop:** set goal → daily practice prompt → upload drawing → AI feedback → streak and skill progress.

**Long-term product capabilities:**
- Goal (e.g. "first manga page") decomposed into skills
- Daily practice + check-in with streak
- Upload drawings, tagged by skill/category
- AI review per drawing
- Progress dashboard

**Not planned for the first experiment:** social features, mobile app, payments,
drawing canvas, model fine-tuning, authentication, and multi-user support.

## 2. Skill model

Fixed taxonomy for the PoC, tied to the manga goal:

- **Fundamentals:** line control, shapes/construction, perspective, anatomy/figure, hands, faces/expressions
- **Manga-specific:** panel layout, inking, screentones, backgrounds, composition/storytelling

Each skill has levels (e.g. 1–5), unlocked by practice count and AI scores. Daily prompts are generated from the weakest skills.

## 3. Long-term stack options

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

## 4. Long-term data model (sketch)

This multi-user-oriented sketch is not the v1 schema; the first experiment has
no accounts or authentication. Narrow it in future feature specs.

- `User`, `Goal(userId, title, targetDate)`
- `Skill(slug, name, category)`, `UserSkill(userId, skillId, level, xp)`
- `Drawing(userId, imageKey, skillIds[], category, notes, createdAt)`
- `Review(drawingId, model, promptVersion, scores JSON, feedback, nextExercise, status)`
- `CheckIn(userId, date, drawingId?)` — drives streaks
- `Exercise(skillId, prompt, difficulty)`

## 5. AI review

- **Input:** image + declared skill/category + user's level + last 2–3 reviews of that skill.
- **Output (strict JSON):** per-skill scores (1–5), 2–3 strengths, 2–3 specific fixes, one next exercise, comparison to the previous drawing.
- Use rubrics per skill in the prompt so scores stay consistent over time.
- Version prompts (`promptVersion`) to compare changes.
- **Later:** weekly summary, adaptive curriculum, manga page/panel critique.

**Limit:** vision models are decent at composition and obvious anatomy/perspective errors, weaker at fine line quality. Frame scores as coaching, not ground truth, and let the user disagree with a review.

## 6. Habit mechanics

- Daily check-in = one upload or a "practiced offline" mark (low friction is key)
- Streak counter, weekly calendar with checkmarks, streak freeze (1/week)
- Daily 10-minute prompt, small XP, level-up animation
- Timezone-correct "day" boundary (store user timezone)
- Optional email reminder (post-PoC)

## 7. Screens

1. **Onboarding:** pick goal, self-rate skills
2. **Today:** prompt, upload, streak
3. **Dashboard:** skill radar/levels, streak calendar, XP trend
4. **Gallery:** filter by skill/category, before/after
5. **Drawing detail:** image, review, notes

## 8. Edge cases to settle before coding

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

## 9. Build phases

1. **Foundation:** schema, local upload pipeline, gallery (without auth in v1)
2. **Habit loop:** check-ins, streaks, daily prompt
3. **AI review:** async job, rubric prompts, structured output, review UI
4. **Dashboard:** skill levels, charts, progress timeline
5. **Polish + test:** animations, empty states, a few real users

## 10. PoC success criteria

- ≥ 60% of testers return on 3+ days in week 1
- Users rate reviews "useful" ≥ 70% of the time (thumbs up/down on each review)
- Review cost per drawing under a set budget (to be decided)

## 11. Open decisions

- Skill taxonomy beyond the first manga-focused experiment: manga-only, or
  general drawing with a manga track?
- Review trigger: automatic on upload, or on demand (cheaper)?
- Multi-user/auth: intentionally deferred beyond the first single-user, no-auth
  experiment; revisit only after the first experiment is evaluated.
