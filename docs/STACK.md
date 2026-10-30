# STACK : socle technique commun

Projets couverts : investment dashboard, Strokio, job tracker.

## Principe

- **TypeScript** pour le produit : UI, API, logique métier.
- **Python** uniquement pour l'agentique et l'analytique (agents multi-étapes, évals, modèles locaux, pandas).
- Les deux côtés communiquent par un **contrat OpenAPI** et une **table `jobs` en Postgres**, jamais par du code partagé.
- Un projet démarre en TS seul ; le Python s'ajoute quand un besoin réel apparaît.

## Stack

| Couche | Choix | Remarque |
|---|---|---|
| Front | Next.js (App Router), TypeScript, Tailwind, shadcn/ui, TanStack Query, Recharts | Un seul socle pour les trois projets |
| API TS | Route handlers Next au départ ; **Hono** si une API séparée devient nécessaire | Alternative : Fastify (voir « Décisions ») |
| Validation | Zod (TS), Pydantic (Python) | Contrats aux frontières, types TS générés depuis OpenAPI |
| DB | PostgreSQL, Drizzle (Prisma acceptable) | Un seul propriétaire du schéma par projet |
| Jobs | Table `jobs` Postgres, `FOR UPDATE SKIP LOCKED` | Consommable par TS et Python, sans broker |
| IA, appels simples | Anthropic SDK en TS, sortie JSON validée par Zod | Ex. revue de dessin avec vision |
| IA, agents | Python : LiteLLM, LangGraph, Ollama | Évals, multi-étapes, modèles locaux |
| Tests | Vitest + Playwright (TS), pytest (Python) | |
| Infra | docker-compose en local ; puis Vercel + Neon/Supabase, workers sur la Pi ou un petit conteneur | Hébergement non tranché |
| Auth | Aucune au v1 ; Auth.js ou Supabase Auth ensuite | |

## Règle de décision TS vs Python

- Appel LLM unique avec sortie structurée : **TS**.
- Agent multi-étapes, évals, modèle local, calcul pandas : **Python**.
- CRUD, vues, auth : **TS**.

## Par projet

| Projet | TS | Python |
|---|---|---|
| Investment dashboard | Front + API de vues | FastAPI : ingestion, indicateurs, module bubble-risk |
| Strokio (drawing tracker) | Tout le v1 : Next, Postgres, Anthropic SDK en direct | Rien au v1 |
| Job tracker | UI + API CRUD | Worker : collecte, enrichissement, matching (LangGraph) ; CV parsé en JSON Pydantic comme profil de référence |

### Strokio : périmètre MVP

- **Utilisateur :** une personne, sans authentification en v1. Auth et multi-user
  sont différés.
- **Application :** tout le v1 est en TypeScript/Next.js ; pas de service Python.
- **Données :** PostgreSQL dès le départ. ORM à choisir entre Drizzle et Prisma.
- **Images :** stockage local en v1 ; stockage distant seulement si un besoin
  apparaît ensuite.
- **Revue IA :** vraie revue de dessin par vision, via le SDK Anthropic en TS ;
  les retours simulés du prototype actuel ne constituent pas la v1.
- **Jobs :** table `jobs` Postgres et `FOR UPDATE SKIP LOCKED` pour les revues
  asynchrones.
- **Contrat :** aucun contrat API externe formalisé pour le moment. Le v1
  n'introduit pas de service Python.
- **GraphQL et MongoDB sont retirés du MVP** et de la trajectoire à court terme.

## Organisation du code

- Un **template Copier** unique génère le squelette (TS + Python + Postgres + CI) ; un dépôt par projet.
- Pas de packages partagés avant un vrai besoin : deux projets qui dupliquent le même code suffisent à le justifier.
- Python géré avec uv ou Pixi, TS avec pnpm.

## Contrat TS / Python

1. Le service Python (FastAPI) expose un schéma OpenAPI.
2. Les types et le client TS sont générés depuis ce schéma (ex. `openapi-typescript`).
3. Pour les traitements asynchrones, un job est inséré dans `jobs` ; le worker le consomme :

```sql
SELECT id, payload FROM jobs
WHERE status = 'queued'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
```

## Décisions

- **Framework API TS : Hono.** Raisons : Zod + OpenAPI natifs (`@hono/zod-openapi`), basé sur les standards Web (Request/Response), montable dans un route handler Next, client typé. Limites : écosystème plus jeune qu'Express ou Fastify.
- **Alternative : Fastify** si un signal plus classique pour le marché de l'emploi compte davantage ; **NestJS** si l'objectif est des environnements d'entreprise à structure imposée.
- **Investment dashboard :** les deux API (FastAPI et TS) servent à comparer, à condition d'exposer le **même contrat OpenAPI**.

## Points ouverts

- Hébergement : non tranché (Vercel, Neon/Supabase, Pi).
- Drizzle vs Prisma.
- Stockage d'images au-delà du local pour Strokio.
