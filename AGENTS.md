# Clubit Project - IT Club Website

## Overview

This is a full-stack website for IT Club extracurricular with:
- **Frontend**: Next.js 16 with GSAP animations
- **Backend**: NestJS with PostgreSQL
- **Design**: Modern sky blue & white theme with floating elements

## Project Structure

```
clubit/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── users/        # User management
│   │   ├── blogs/        # Blog posts
│   │   ├── projects/     # Project showcase
│   │   ├── events/       # Events management
│   │   ├── registrations/# Member registration
│   │   ├── testimonials/ # Member testimonials
│   │   ├── alumni/       # Alumni network
│   │   ├── faq/          # FAQ section
│   │   ├── achievements/ # Club achievements
│   │   ├── newsletter/   # Newsletter subscriptions
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── Dockerfile
├── frontend/             # Next.js application
│   ├── app/
│   │   ├── sections/     # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Alumni.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Registration.tsx
│   │   │   └── Newsletter.tsx
│   │   ├── components/   # Shared components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── package.json
├── docker-compose.yml
├── start-dev.sh
└── README.md
```

## Technology Stack

### Frontend
- Next.js 16.1.6 (App Router)
- React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS 4.2.0
- GSAP 3.14.2 + ScrollTrigger
- Framer Motion
- Lucide React Icons

### Backend
- NestJS 10
- TypeORM
- PostgreSQL
- Class Validator/Transformer

### Design System
- **Primary Color**: Sky 500 (#0ea5e9)
- **Background**: White with sky-50 gradients
- **Typography**: Geist Sans/Mono
- **Animations**: GSAP ScrollTrigger, floating elements

## Development Commands

### Frontend
```bash
cd frontend
bun run dev        # Development server
bun run build      # Production build
bun run start      # Start production server
```

### Backend
```bash
cd backend
npm run start:dev  # Development with watch
npm run build      # Build for production
npm run start:prod # Start production server
```

### Quick Start (Both)
```bash
# Make script executable
chmod +x start-dev.sh

# Start everything
./start-dev.sh
```

### Docker Setup
```bash
# Start all services
docker-compose up -d

# Start only database
docker-compose up -d postgres
```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=itclub
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/health` - Health check
- `/api/users` - User management
- `/api/blogs` - Blog posts
- `/api/projects` - Projects
- `/api/events` - Events
- `/api/registrations` - Registrations
- `/api/testimonials` - Testimonials
- `/api/alumni` - Alumni
- `/api/faq` - FAQ
- `/api/achievements` - Achievements
- `/api/newsletter` - Newsletter

## GSAP Animation Guidelines

1. **Register Plugin**: Always register ScrollTrigger
2. **Use Context**: Wrap animations in gsap.context()
3. **Cleanup**: Kill ScrollTrigger instances in useEffect cleanup
4. **Trigger Points**: Use "top 80%" or "top 85%" for reveal animations
5. **Stagger**: Use stagger delay (0.1s - 0.15s) for lists

Example:
```typescript
const ctx = gsap.context(() => {
  const trigger = ScrollTrigger.create({
    trigger: elementRef.current,
    start: "top 80%",
    onEnter: () => {
      gsap.fromTo(elementRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    },
    once: true,
  });
}, containerRef);

return () => {
  trigger.kill();
  ctx.revert();
};
```

## Section Guidelines

Each section should:
1. Have a unique id for navigation
2. Use section-padding class for consistent spacing
3. Include ScrollTrigger animations
4. Be responsive (mobile-first)
5. Follow the sky blue color scheme

## Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend/`
3. Add environment variables

### Backend (Railway/Render)
1. Deploy with Dockerfile
2. Add PostgreSQL database
3. Set environment variables

## License

MIT License
