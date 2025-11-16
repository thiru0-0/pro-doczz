# Pro DocZz — Features & Architecture

This document summarizes the product features, high-level architecture, data flow, and tech stack for the Pro DocZz project.

## 1) Product overview
- Pro DocZz is a browser-based document generation platform focused on templates (resumes, proposals, contracts, invoices, reports, cover letters, and more).
- Users complete guided wizard steps and generate LaTeX (or other) output which can be exported as .tex/.pdf.

## 2) Key features
- Template-driven wizards for multiple document types (resume, proposal, contract, NDA, invoice, report, sales pitch, job-description, cover letter, analysis, etc.).
- Step-based guided UI (Wizard) with editable list controls and AI-assisted generation blocks.
- Client-side LaTeX generation for the resume template; generic fallback for other templates.
- Lightweight backend (in `resume-backend/`) acting as an AI proxy and API surface for future persistence and generation.
- Responsive UI with sidebar and top nav for mobile friendliness.
- Pluggable style selector for document themes.

## 3) Tech stack
- Frontend
  - Vite (React + TypeScript)
  - React 18, React Router v6
  - Tailwind CSS (utility-first styling)
  - Radix/shadcn UI primitives
  - @tanstack/react-query
- Backend
  - Node.js + Express (in `resume-backend/index.js`)
  - dotenv, cors
  - Optional: OpenAI SDK / Google generative ai (used as AI proxy)
- Dev tools
  - npm (package manager), Vite dev server

## 4) High-level architecture & data flow
1. User opens a template (e.g., `/template/proposal`) or selects it from the Create page.
2. UI renders a step-by-step wizard. The wizard stores progress in component state.
3. AI-assisted blocks (`AIHelperBlock`) can call the backend AI endpoints (not fully wired by default). The front-end never contains API keys.
4. The user finishes the steps and clicks Generate:
   - Client calls `generateLatexCode(payload)` (frontend util) for immediate LaTeX generation (resume template has full LaTeX code generation).
   - For server-side generation (optional), the frontend can POST wizard payload to backend endpoint `/api/generate` to get AI-produced content or PDF (not fully implemented by default).
5. The generated content is shown in a textarea and can be copied or downloaded.

## 5) Persistence & storage
- Current repo: ephemeral client state. No user document persistence by default.
- Recommended options:
  - File-based persistence at backend (quick prototype) — files saved under `resume-backend/data/`.
  - SQLite (single-file DB) for low ops overhead.
  - PostgreSQL for production (recommended): use JSONB for wizard payload and store generated files in object storage (S3).

## 6) API contract (recommended)
- POST `/api/documents` — save document draft (body: { title, templateType, payload }) → returns { id }
- GET `/api/documents` — list documents for user
- GET `/api/documents/:id` — fetch draft
- PUT `/api/documents/:id` — update draft
- DELETE `/api/documents/:id` — delete draft
- POST `/api/generate` — optional server-side generate (body: payload) → returns generated_tex / urls

## 7) Security notes
- Keep AI/API keys only on the backend (do not embed them in the frontend). Use `resume-backend/.env` for keys and add `.env` to `.gitignore`.
- Validate user input and enforce ownership checks on all document endpoints.
- When storing generated PDFs, use signed URLs or protected storage to prevent unauthorized access.

## 8) Next improvements (short list)
- Wire `AIHelperBlock` to backend `POST /api/generate` and show streaming responses.
- Implement persistence (file-store/SQLite/Postgres) and authentication.
- Implement per-template full LaTeX templates and PDF rendering (LaTeX engine or a cloud-renderer).
- Add tests for wizard flows and the `generateLatexCode` output.

---

File locations referenced in this doc:
- Frontend root: `src/`
- Backend: `resume-backend/` (server entry: `index.js`)
- LaTeX generator util: `src/utils/latexGenerator.ts`
- Wizard components: `src/components/wizard/`

