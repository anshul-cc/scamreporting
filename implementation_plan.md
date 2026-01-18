# Implementation Plan - Scam Reporting Portal

## Goal Description
Build a "vibe coded", premium Scam Reporting Portal using Next.js, PostgreSQL, and Supabase. The goal is to aggregate data on malicious crypto addresses and allow user reporting, with a focus on trust and user confidence.

## User Review Required
> [!IMPORTANT]
> **Authentication Provider**: I am planning to use **Supabase Auth** for simplicity and robustness.
> **Database**: I will assume a local Postgres instance for development or use Supabase's hosted Postgres if credentials are provided. For now, I will write the code to be compatible with standard Postgres (via Prisma ORM).

## Proposed Changes

### Project Initialization & Config
#### [NEW] [package.json](file:///project/package.json)
- Initialize Next.js 14+ (App Router), TypeScript, ESLint.
- Dependencies: `prisma`, `@prisma/client`, `lucide-react` (icons), `framer-motion` (animations), `clsx`, `tailwind-merge` (if using Tailwind, but PRD says Vanilla CSS - verifying).
- *Correction*: PRD specifies Vanilla CSS. I will stick to standard CSS Modules but may use utility libraries like `clsx` for class switching.

#### [NEW] [global.css](file:///project/src/app/globals.css)
- Define CSS Variables for the "Soothing/Confidence" palette.
- Reset styles.

### Database Layer
#### [NEW] [schema.prisma](file:///project/prisma/schema.prisma)
- Define `User`, `Address`, `Report`, `BlocklistSource` models matching the PRD.
- Command to run: `npx prisma init`, `npx prisma migrate dev`.

### Core Components (Frontend)
#### [NEW] [Navbar.tsx](file:///project/src/components/Navbar/Navbar.tsx)
- Responsive navigation with "Report Scam", "Search", "Login".

#### [NEW] [Button.tsx](file:///project/src/components/UI/Button.tsx)
- Reusable button component consuming the primary/danger colors.

### Feature: Address Management
#### [NEW] [route.ts](file:///project/src/app/api/addresses/route.ts)
- GET: Fetch top risk addresses.
- POST: (Internal/Admin) Create new address entry.

### Feature: Reporting
#### [NEW] [page.tsx](file:///project/src/app/report/page.tsx)
- Form for authenticated users to submit scam reports.

#### [NEW] [action.ts](file:///project/src/app/report/action.ts)
- Server Action to handle form submission and validation.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify type safety and build process.
- Use `jest` or `vitest` for unit testing utility functions (if complex data normalization is needed).

### Manual Verification
- **Theme Check**: Verify the "slate/royal blue" palette looks soothing and professional.
- **Database Connection**: Verify Prisma can connect and push the schema.
- **User Flow**:
    1. Open Home Page.
    2. Click "Report Scam".
    3. (Mock Auth) -> Submit Form.
    4. Verify data appears in the Database.
