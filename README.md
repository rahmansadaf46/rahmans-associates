# Rahman's Associate

Production-ready legal-tech MVP built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth credentials auth, Zod, and the OpenAI API.

## What This App Does

- Generates structured AI prompts for Bangladesh legal drafting and research workflows.
- Accepts Bangla or English input and preserves legal intent.
- Supports saved prompt history, favorites, and a searchable prompt library.
- Seeds 21 Bangladesh-focused prompt templates.
- Uses OpenAI server-side only through `OPENAI_API_KEY`.
- Includes a clear drafting-only disclaimer and prompt-injection resistance.

## Core Features

- Home page with hero, feature highlights, six sample categories, and three demo prompt examples.
- Prompt generator with legal category, prompt type, optional facts, language, tone, copy, regenerate, and download actions.
- Prompt templates library with search, category filter, detail pages, and copy support.
- Secure sign up and login with hashed passwords.
- Protected dashboard with searchable history, favorites, and delete actions.
- Admin-ready prompt template foundation with `isPublished` and `isFeatured` flags.

## Folder Structure

```text
.
├── prisma
│   ├── migrations
│   │   └── 20260309233000_init
│   ├── schema.prisma
│   └── seed.ts
├── public
├── src
│   ├── app
│   │   ├── api
│   │   ├── dashboard
│   │   ├── generator
│   │   ├── login
│   │   ├── signup
│   │   ├── templates
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── generator
│   │   ├── home
│   │   ├── templates
│   │   └── ui
│   ├── lib
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── default-templates.ts
│   │   ├── demo-content.ts
│   │   ├── openai.ts
│   │   ├── prisma.ts
│   │   ├── safety.ts
│   │   ├── utils.ts
│   │   └── validations
│   ├── server
│   │   └── services
│   └── types
├── .env.example
├── package.json
└── README.md
```

## Prisma Schema Overview

The PostgreSQL schema includes:

- `User`
- `PromptHistory`
- `FavoritePrompt`
- `PromptTemplate`

Enums included:

- `UserRole`
- `LegalCategory`
- `PromptType`
- `PromptTone`
- `PromptLanguage`

The source schema lives in `prisma/schema.prisma`, and the initial SQL migration is included in `prisma/migrations/20260309233000_init/migration.sql`.

## Environment Variables

Copy `.env.example` to `.env` and set:

```bash
DATABASE_URL=
OPENAI_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL URL, OpenAI API key, and NextAuth values.

4. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

5. Seed the prompt templates:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open `http://localhost:3000`.

## Step-by-Step Run Flow

1. Create a PostgreSQL database.
2. Add environment variables in `.env`.
3. Run `npx prisma migrate dev`.
4. Run `npm run db:seed`.
5. Run `npm run dev`.
6. Create an account from `/signup`.
7. Generate prompts from `/generator`.
8. Review saved history in `/dashboard`.

## Useful Scripts

```bash
npm run dev
npm run lint
npm run build
npm run check
npm run db:push
npm run db:migrate
npm run db:seed
```

## OpenAI Integration Notes

- API key is read only from `process.env.OPENAI_API_KEY`.
- OpenAI calls happen only in `src/app/api/prompts/route.ts`.
- Prompt generation logic is centralized in `src/server/services/prompt-generation.ts`.
- The OpenAI system instruction is Bangladesh-specific and explicitly warns against fabricating laws, sections, courts, dates, or citations.

## Security and Safety

- Passwords are hashed with `bcryptjs`.
- Auth uses NextAuth with JWT sessions.
- Prompt generation is server-side only.
- Inputs are validated with Zod and sanitized before AI submission.
- User fields are treated as untrusted case data, not instructions.
- The UI displays the disclaimer:
  `This tool is for drafting and research assistance only and does not replace professional legal advice.`

## Seeded Content

- 21 default Bangladesh legal prompt templates.
- 6 homepage category highlights.
- 3 homepage demo prompt examples.

## Deployment Notes

For Vercel:

1. Set the same environment variables in the Vercel project.
2. Use a managed PostgreSQL database.
3. Run `npx prisma migrate deploy` in your production release workflow.
4. Seed only if you want the default template library in production.

## Future Improvements

- Add role-based admin template management.
- Add OAuth providers alongside credentials auth.
- Add team workspaces and matter-level organization.
- Add export to DOCX or PDF.
- Add audit logging and per-user rate limiting.
- Add RAG-backed legal research references with citation verification.
# rahmans-associates
