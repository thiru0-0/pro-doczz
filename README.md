# Docuflow UI (frontend) + resume-backend

This repository contains a Vite + React frontend (TypeScript) and a small Node backend used for resume generation.

This README describes the project structure, how to run it locally, and a prioritized list of suggested corrections and improvements.

## Quick summary

- Frontend: Vite + React (TypeScript), Tailwind CSS, shadcn / Radix UI components.
- Backend: simple Express service at `./resume-backend` (uses dotenv, CORS, and OpenAI / Google generative AI libs).
- Package manager: repository contains a `bun.lockb` which suggests Bun may have been used; `package.json` is standard npm/yarn format.

## Requirements checklist (from your request)

1. Analyze project files and scripts — Done
2. Create/update `README.md` with setup and usage — Done (this file)
3. Produce a concise project brief and recommended corrections — Done (see "Recommendations")
4. Discuss corrections and next steps with you — Ready (see "Next steps")

## Prerequisites

- Node.js (recommended via nvm). If you prefer Bun or pnpm, keep that consistent across contributors.
- npm, yarn or pnpm (pick one and update repo docs accordingly).
- For backend AI features: API keys will be required and must be provided via environment variables (see Backend section).

## Quick start — frontend

Open a terminal in the project root and choose one package manager. Examples below use npm, but replace with `yarn` or `pnpm` if you prefer.

```bash
cd /path/to/docuflow-ui-main
npm ci
npm run dev
```

If you want to preview a production build:

```bash
npm run build
npm run preview
```

Available frontend scripts (from `package.json`):

- `dev` — start Vite dev server
- `build` — build for production
- `build:dev` — build in development mode
- `lint` — run ESLint
- `preview` — preview built assets with Vite

## Backend (resume-backend)

The backend is a minimal Node service in `resume-backend`.

Start it with:

```bash
cd resume-backend
npm install
node index.js
```

Recommended: use `nodemon` or add a `dev` script that runs `nodemon index.js` for local development.

Environment variables

- The backend uses `dotenv`. Create a `.env` or `.env.local` in `resume-backend` with keys required by the AI providers (OpenAI / Google generative AI). Example variables to add to `.env.example`:

```text
OPENAI_API_KEY=
GOOGLE_API_KEY=
GOOGLE_PROJECT_ID=
```

Ensure these keys are never committed to git. Add `resume-backend/.env` to `.gitignore`.

## Project structure (top-level)

- `src/` – frontend source (React + TypeScript)
  - `components/`, `pages/`, `ui/`, `hooks/`, `utils/` etc.
- `resume-backend/` – small Node/Express backend
- `public/` – static assets
- `vite.config.ts`, `tsconfig.json`, etc.

Key frontend entry points:

- `src/main.tsx` — React entry
- `src/App.tsx` — routing and layout

## Notable dependencies

- React 18, Vite 5, Tailwind CSS
- @tanstack/react-query for data fetching
- Radix UI + shadcn-style components
- Express + dotenv + cors in backend

## Supported document types

The app currently includes the following document templates (visible in the Create and Home pages):

- Resume (Resume Builder) — AI-powered resume generation with LaTeX export
- Business Proposal
- Contract
- NDA (Non-disclosure agreement)
- Legal Document (generic)
- Report (business/technical)
- Invoice
- Job Description
- Cover Letter
- Analysis / Research Document


## Diagnostics / quick notes from inspection

- `vite.config.ts` sets dev server to host `::` and port `8080` (exposes server to network; intentional?)
- `bun.lockb` present — indicates Bun used at some point; package.json scripts assume standard node tooling.
- `resume-backend/package.json` uses `openai` and `@google/generative-ai` packages; ensure correct env keys are provided and usage matches the SDK versions.

## Recommendations & corrections (prioritized)

1. Consolidate package manager
	- Remove ambiguity: pick npm, yarn, pnpm, or bun. If you prefer Bun, commit a `bun.lockb` and update README with Bun instructions. Otherwise remove `bun.lockb` and commit a lockfile for the chosen manager.

2. Add missing scripts and developer DX
	- Frontend: add `start` (alias to `preview`) and `test` (set up vitest or react-scripts tests).
	- Backend: add `dev` (e.g., `nodemon index.js`) and a `start` script if not present.

3. Add `.env.example` and Git ignore entries
	- Add `resume-backend/.env.example` listing required env vars and add `resume-backend/.env` to `.gitignore`.

4. Improve TypeScript strictness incrementally
	- Current `tsconfig.json` has `noImplicitAny:false`, `strictNullChecks:false`. Consider enabling `strict` or at least `noImplicitAny` and `strictNullChecks` gradually to catch bugs.

5. Linting & formatting
	- Ensure ESLint config exists and is run in CI. Add Prettier or EditorConfig for consistent code style.

6. Tests & CI
	- Add unit tests (Vitest + React Testing Library) for core components and a GitHub Actions workflow that runs `ci` steps: install, lint, build, tests.

7. Secure credentials and secrets
	- Use environment variables and add a README describing which keys are needed and where to get them.

8. Dependency hygiene
	- Remove unused deps (scan compile warnings). Consider pinning critical packages or using Renovate/Dependabot for updates.

9. Docker / Deployment
	- Add optional Dockerfiles for frontend and backend and a simple docker-compose for local dev.

10. Accessibility & performance
	- Add Lighthouse checks, ensure images have alt text, test keyboard navigation for interactive components.

## Suggested small, safe follow-ups I can implement now

- Add `resume-backend/.env.example` and update `.gitignore`.
- Add `start` and `test` scripts to the frontend `package.json` (non-breaking).
- Add a basic GitHub Actions CI that runs install → lint → build.

If you want, I can implement one or more of these changes now — tell me which and I'll apply them.

## Next steps / discussion items

- Which package manager do you want the project to use long-term (npm / yarn / pnpm / bun)?
- Do you want me to add CI (GitHub Actions) and a basic test harness (Vitest)?
- Should I add Docker files for local dev and deployment?

---

If you'd like, I can also run the project locally here (install and run the dev server) and surface any runtime errors — tell me which package manager to use and whether you want me to run the frontend, backend, or both.

---
Updated on: 2025-11-15
