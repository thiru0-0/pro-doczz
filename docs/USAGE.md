# Pro DocZz — How to use (Quick Start & Samples)

This guide explains how to run the app locally, use the wizard flows, and provides sample credentials and sample inputs for testing.

## Quick start (development)
1. Install dependencies
```bash
npm install
```

2. Start frontend dev server
```bash
npm run dev
```

3. Start backend (in separate terminal)
```bash
cd resume-backend
npm install
npm run dev
```

4. Open the app in a browser
- http://localhost:8080

## Basic app flow (user-facing)
1. Home / Create page
  - Click `Create` → choose a template (Resume, Proposal, Contract, etc.).
2. Template page
  - Click `Create Document` to open the wizard for that template.
3. Wizard steps
  - Fill out each step's fields (inputs, lists). Use `Add` to add list items.
  - AI Helper blocks: enter short notes and click `Generate` to produce a suggested summary (may be stubbed if backend AI is not wired).
4. Final step
  - Choose a style in the Style Selector and click `Generate` (Generate will either call frontend `generateLatexCode` or show server output depending on wiring).
  - Copy the generated LaTeX and compile/export as required.

## Sample credentials & environment variables (for backend)
- Create `resume-backend/.env` (do not commit this file). Example values for local testing (replace with your real keys):
```
# resume-backend/.env
PORT=3001
NODE_ENV=development
# If using OpenAI
OPENAI_API_KEY=sk_test_your_openai_key_here
# If using Google generative AI
GOOGLE_API_KEY=your_google_api_key
GOOGLE_PROJECT_ID=your_project_id
```

## Sample wizard data (example for Proposal)
- Proposal payload example (JSON) — useful for testing the GenerateBlock or POSTing to /api/generate
```json
{
  "proposalType": "Project",
  "coreDetails": {
    "yourCompany": "Acme Solutions",
    "yourContact": "alice@acme.com",
    "clientName": "Big Corp",
    "clientContact": "bob@bigcorp.com",
    "proposalTitle": "Cloud Migration Project",
    "date": "2025-11-16"
  },
  "executiveSummary": "",
  "problemStatement": "",
  "scopeItems": [
    {"phase": "Discovery", "description": "Assess current infra"},
    {"phase": "Migration", "description": "Migrate services to cloud"}
  ],
  "timelineAndInvestment": {"estimatedTimeline": "3 months", "pricingModel": "Fixed", "costDetails": "$45,000", "paymentTerms": "30 days"},
  "aboutUsSection": "Acme Solutions is a systems integrator...",
  "style": {"id": "style-corporate"}
}
```

## Sample resume data (for Resume wizard)
- Minimal sample you can paste into the forms:
```json
{
  "personal": {"name":"John Doe","email":"john@example.com","linkedin":"https://linkedin.com/in/johndoe","github":"https://github.com/johndoe","summary":"Full-stack developer with 5 years experience..."},
  "education": [{"id":"ed1","school":"State University","degree":"BSc Computer Science","years":"2015-2019"}],
  "experience": [{"id":"ex1","company":"Acme","role":"Software Engineer","years":"2019-2024","notes":"Worked on full-stack apps","summary":"Built X, Y, Z"}],
  "projects": [{"id":"p1","title":"Project X","description":"An open-source tool"}],
  "skills":"React, TypeScript, Node.js",
  "style": {"id":"style-modern-sidebar"}
}
```

## Save & persistence (notes)
- By default drafts are not persisted. To save drafts:
  - Implement backend endpoints (`POST /api/documents`) as described in `docs/FEATURES.md`.
  - Frontend can call those endpoints to create/read/update drafts.

## Troubleshooting
- Inputs invisible / unreadable: ensure Tailwind is compiling. If the UI looks broken, stop the dev server and re-run `npm install` then `npm run dev`.
- AI generation returns empty: ensure backend API keys are set in `resume-backend/.env` and backend is running.

---

If you want, I can:
- Add a `Save Draft` button to each wizard and wire it to a file-based persistence endpoint in `resume-backend` (I can implement this next).
- Add a pre-filled demo user and a small UI to load sample drafts.

Which of those would you like me to add next?
