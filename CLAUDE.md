# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClubIT is a full-stack IT Club website for SMEAS with a Next.js frontend and NestJS backend. The frontend is a single-page app with 16 animated sections; the backend provides a RESTful API with JWT auth and PostgreSQL.

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Swagger Docs**: http://localhost:3001/api/docs

## Development Commands

### Start Everything
```bash
./start-dev.sh          # Start DB + backend + frontend
docker-compose up -d postgres  # DB only
```

### Frontend (`cd frontend`, uses Bun)
```bash
bun run dev             # Dev server (port 3000)
bun run build           # Production build
bun run lint            # ESLint
```

### Backend (`cd backend`, uses npm)
```bash
npm run start:dev       # Dev with watch mode (port 3001)
npm run build           # Compile TypeScript
npm run test            # Run Jest tests
npm run test:watch      # Watch mode
npm run test:cov        # Coverage report
npm run test:e2e        # End-to-end tests
npm run lint            # ESLint --fix
npm run format          # Prettier format
npm run migration:generate  # Generate TypeORM migration
npm run migration:run       # Run migrations
npm run migration:revert    # Revert last migration
```

## Architecture

### Frontend (`frontend/`)
- **Next.js App Router** with `[locale]` dynamic segments for i18n (English `en`, Indonesian `id`)
- Pages live under `app/[locale]/`; locale config in `i18n/config.ts`, translations in `messages/`
- **Sections** (`app/[locale]/sections/`): 16 client components composing the homepage — Hero, About, Team, Achievements, Projects, Events, Gallery, Blog, Testimonials, Alumni, Partners, FAQ, Registration, Contact, Newsletter, Merchandise
- **Components** (`app/[locale]/components/`): Shared UI — Navbar, Footer, SmoothScroll (Lenis), ContactModal, Lightbox, PageTransition, MagneticButton, etc.
- **API client**: `app/[locale]/lib/api.ts` — fetches from `NEXT_PUBLIC_API_URL`
- **Styling**: Tailwind CSS 4 + `globals.css` (GSAP animation keyframes and `section-padding` utility class)
- **Animation stack**: GSAP 3 + ScrollTrigger for scroll-triggered reveals; Framer Motion for component-level animations; Lenis for smooth scroll (integrated with GSAP ticker)

### Backend (`backend/src/`)
- **NestJS monolith** with 12 feature modules: `users`, `blogs`, `projects`, `events`, `registrations`, `testimonials`, `alumni`, `faq`, `achievements`, `newsletter`, `contacts`, plus `auth`
- Each module follows the pattern: `entity` → `dto/` → `service` → `controller`
- **Auth**: JWT + Passport (`strategies/jwt.strategy.ts`), guards in `auth/guards/`, decorators `@CurrentUser` and `@Roles`
- **Database**: PostgreSQL 15 via TypeORM; entities use UUID PKs with `createdAt`/`updatedAt`; `synchronize: true` in dev
- **Bootstrap** (`main.ts`): Global validation pipe, CORS (from `FRONTEND_URL` env), Swagger at `/api/docs`, throttler guard

### Data Flow
```
Frontend (Next.js) → NEXT_PUBLIC_API_URL → Backend (NestJS) → PostgreSQL
```

## Environment Variables

**`backend/.env`** (copy from `.env.example`):
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=itclub
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<min 32 chars>
JWT_EXPIRES_IN=7d
THROTTLE_TTL=60000
THROTTLE_LIMIT=30
```

**`frontend/.env.local`** (copy from `.env.example`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Design System

- **Primary color**: Sky 500 (`#0ea5e9`) — use Tailwind `sky-*` classes
- **Background**: White / `sky-50` gradients (light); `slate-900` (dark)
- **Font**: Geist Sans / Geist Mono
- **Dark mode**: toggled via class on `<html>`, persisted in `localStorage`

## GSAP Animation Conventions

Always register `ScrollTrigger` at the top of the file. Wrap animations in `gsap.context()` and clean up on unmount:

```typescript
const ctx = gsap.context(() => {
  const trigger = ScrollTrigger.create({
    trigger: elementRef.current,
    start: "top 80%",   // or "top 85%"
    onEnter: () => {
      gsap.fromTo(elementRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    },
    once: true,
  });
  return () => trigger.kill();
}, containerRef);

return () => ctx.revert();
```

- Use stagger `0.1s–0.15s` for list/card reveals
- Use `once: true` for one-shot reveal animations

## Section Conventions

Each section component must:
1. Have a unique `id` attribute for anchor navigation
2. Use `className="section-padding"` for consistent vertical spacing
3. Be marked `"use client"` (all sections use GSAP/Framer Motion)
4. Follow mobile-first responsive design with Tailwind breakpoints

## Adding a New Backend Module

Use the NestJS CLI pattern:
1. Create module, service, controller, entity, and DTOs
2. Register the module in `app.module.ts` imports and `TypeOrmModule.forFeature([Entity])` inside the feature module
3. Add the entity to the `entities` array in the TypeORM config in `app.module.ts`
