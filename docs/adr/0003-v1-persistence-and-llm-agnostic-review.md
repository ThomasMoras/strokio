# 0003 — Drizzle ORM and LLM-agnostic free-first vision review for v1

- Status: accepted
- Date: 2026-11-01

## Context

`docs/LEAN_PLAN.md` and `docs/STACK.md` left the concrete ORM choice open
between Drizzle and Prisma, and originally suggested calling the Anthropic SDK
directly for v1 drawing reviews. For the initial single-user PoC experiment, we
want zero mandatory API cost at the start and no vendor lock-in to a single
LLM provider.

## Decision

1. **Database ORM:** Standardize on **Drizzle ORM** (`drizzle-orm` +
   `drizzle-kit`) over PostgreSQL for v1 persistence and the `jobs` queue table.
2. **Review trigger:** Auto-queue a review job in PostgreSQL upon drawing upload
   (`FOR UPDATE SKIP LOCKED`), while keeping upload persistence independent of
   review execution and supporting manual retry on failure.
3. **LLM-agnostic, free-first vision review:** Define a provider-neutral
   `VisionReviewProvider` port in `src/domains/assessment/` with Zod-validated
   structured output. Support zero-cost adapters first:
   - **Local Ollama** vision models (e.g., `qwen2.5-vl`, `gemma3`,
     `llama3.2-vision`) for 100% free, offline, private execution.
   - **Free-tier cloud APIs** via standard HTTP/OpenAI-compatible or native JSON
     endpoints (Google Gemini Free Tier, OpenRouter `:free` vision models).
   - **Deterministic mock adapter** for automated tests and offline UI work.
   - Paid providers (such as Anthropic or OpenAI) remain optional adapters
     disabled by default behind an explicit opt-in configuration flag and daily
     review cap.

## Consequences

- No paid/keyed SDK is required to run or evaluate the PoC.
- Switching between local and cloud vision models requires only environment
  configuration (`AI_PROVIDER`, `AI_MODEL`), and every stored review records both
  `provider` and `model` alongside `promptVersion`.
- All provider responses pass through the same Zod schema validation and
  single-retry JSON repair boundary before storage.
