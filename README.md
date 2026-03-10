# AinBondhu AI by Rahman's Associates

AinBondhu AI is a bilingual legal work assistant for advocates in Bangladesh. It is designed for real chamber work: notices, petitions, bail drafts, agreements, summaries, client-intake guidance, and other daily drafting tasks in Bangla, English, or bilingual output.

The project is built on the existing Next.js, TypeScript, Tailwind, NextAuth, and Prisma stack, with Gemini powering the AI-assisted drafting flow on the server.

## Core features

- Gemini-powered legal drafting assistance with server-side streaming
- Bangla, English, and bilingual output support
- Saved work, favorites, deletion, and dashboard search for signed-in users
- Reusable Bangladesh-focused template library with graceful fallbacks
- Auth flows with protected dashboard access
- Public Rahman's Associates profile page at `/rahmans-associates`
- Clear drafting/research disclaimer throughout the product

## Tech stack

- Next.js 16
- TypeScript
- Tailwind CSS
- NextAuth
- Prisma
- Gemini via `@google/genai`

## Environment setup

Create a `.env` file from `.env.example` and set the following values:

```env
GEMINI_API_KEY=
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

Notes:

- `GEMINI_API_KEY` must be a valid Gemini API key.
- `DATABASE_URL` should point to the database used by Prisma.
- `NEXTAUTH_SECRET` should be a strong random string.
- `NEXTAUTH_URL` should match the local or deployed app URL.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Push the schema to your database:

```bash
npm run db:push
```

5. Optionally seed template data:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Gemini integration

Gemini is used only on the server.

- Shared AI service layer: `src/lib/ai.ts`
- Streaming + prompt orchestration: `src/server/services/prompt-generation.ts`
- API entry point: `src/app/api/prompts/route.ts`

The app streams generated drafting output to the UI, then optionally adds structured summary metadata such as:

- suggested title
- quick summary
- next steps
- useful tags

These structured extras are validated with Zod for predictable UI rendering.

## Useful scripts

```bash
npm run dev
npm run lint
npm run build
npm run prisma:generate
npm run db:push
npm run db:migrate
npm run db:seed
```

## Main routes

- `/` home page
- `/generator` drafting assistant
- `/templates` template library
- `/dashboard` saved work for authenticated users
- `/rahmans-associates` chamber profile page
- `/login` login
- `/signup` account creation

## Product notes

- This tool is for drafting and research assistance only.
- It does not replace professional legal advice or advocate judgment.
- Static content is not sent to Gemini unnecessarily; AI calls are used for meaningful drafting workflows.

## Deployment

Set the same environment variables in your deployment platform, run the Prisma setup for the target database, and build with:

```bash
npm run build
```
