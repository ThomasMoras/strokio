# 0001 — Single-user v1 product scope

- Status: accepted
- Date: 2026-10-28

## Context

The long-term vision includes broader capabilities, but the first experiment
needs a focused scope that can test whether regular practice and useful critique
help one person make progress toward a drawing goal. The shared project stack
specifies PostgreSQL, local image storage, and real AI review for the drawing
tracker v1.

## Decision

The first product experiment is single-user and has no authentication. Its
product loop is goal/skill setup, daily practice and check-in, drawing upload,
real AI review, and a progress view. Use the shared TypeScript/Next.js stack,
PostgreSQL, and local image storage. Keep social features, payments, mobile,
canvas drawing, and model fine-tuning out of v1.

## Consequences

- The client-side localStorage and mock-feedback app remains a prototype until
  accepted feature specs replace those behaviors.
- Database library, schema, review provider/trigger, cost budget, upload limits,
  and deployment require decisions in their respective feature specs.
- Authentication and multi-user support require a new scope decision.
