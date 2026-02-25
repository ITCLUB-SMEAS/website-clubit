# ClubIT Project - IT Club Website

## Overview

ClubIT is a modern, full-stack website for an IT Club extracurricular organization. It features a responsive design with smooth animations, internationalization support, and a comprehensive REST API backend.

**Project Type**: Full-stack web application  
**Primary Language**: TypeScript  
**License**: MIT

## Project Structure

```
clubit/
├── frontend/              # Next.js 16 Application
│   ├── app/
│   │   ├── [locale]/      # Internationalized routes (en, id)
│   │   │   ├── components/# Shared components (Navbar, Footer, etc.)
│   │   │   ├── sections/  # Page sections (15 total)
│   │   │   ├── legal/     # Legal pages (privacy, terms, cookies)
│   │   │   ├── layout.tsx # Locale-specific layout
│   │   │   └── page.tsx   # Home page
│   │   ├── globals.css    # Global styles & Tailwind
│   │   ├── layout.tsx     # Root layout
│   │   └── not-found.tsx  # 404 page
│   ├── i18n/              # Internationalization config
│   ├── messages/          # Translation files (en.json, id.json)
│   ├── public/            # Static assets
│   ├── next.config.ts     # Next.js configuration
│   ├── middleware.ts      # Next.js middleware (i18n routing)
│   └── package.json
├── backend/               # NestJS API
│   ├── src/
│   │   ├── auth/          # Authentication (JWT)
│   │   ├── users/         # User management
│   │   ├── blogs/         # Blog posts
│   │   ├── projects/      # Project showcase
│   │   ├── events/        # Events management
│   │   ├── registrations/ # Member registration
│   │   ├── testimonials/  # Member testimonials
│   │   ├── alumni/        # Alumni network
│   │   ├── faq/           # FAQ section
│   │   ├── achievements/  # Club achievements
│   │   ├── newsletter/    # Newsletter subscriptions
│   │   ├── contacts/      # Contact form submissions
│   │   ├── common/        # Shared utilities (BaseService)
│   │   ├── app.module.ts  # Root module
│   │   └── main.ts        # Application entry point
│   ├── Dockerfile         # Docker configuration
│   └── package.json
├── docker-compose.yml     # Docker Compose services
├── start-dev.sh           # Development startup script
└── README.md
```

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.2.0 | Utility-first CSS |
| GSAP | 3.14.2 | Animations with ScrollTrigger |
| Framer Motion | 12.34.3 | Component animations |
| Lenis | 1.3.17 | Smooth scrolling |
| next-intl | 4.8.3 | Internationalization (i18n) |
| Lucide React | 0.575.0 | Icons |
| Sonner | 2.0.7 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10.x | Node.js framework |
| TypeScript | 5.1.3 | Type safety |
| TypeORM | 0.3.17 | ORM for PostgreSQL |
| PostgreSQL | 15 | Database |
| Passport JWT | 11.x | Authentication |
| class-validator | 0.14.x | DTO validation |
| @nestjs/throttler | 6.5.0 | Rate limiting |
| @nestjs/swagger | 11.2.6 | API documentation |

## Development Environment Setup

### Prerequisites
- Node.js 18+ (backend)
- Bun or Node.js 18+ (frontend)
- PostgreSQL 14+ (or Docker)
- Git

### Quick Start (All Services)

```bash
# Make script executable
chmod +x start-dev.sh

# Start everything (PostgreSQL, Backend, Frontend)
./start-dev.sh
```

This script will:
1. Start PostgreSQL via Docker
2. Copy environment files (.env, .env.local)
3. Start backend dev server on port 3001
4. Start frontend dev server on port 3000

### Manual Setup

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
bun install
bun run dev
```

**Database (Docker only):**
```bash
docker-compose up -d postgres
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
```

### Backend (.env)
```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=itclub

# Application
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS) - comma-separated for multiple origins
FRONTEND_URL=http://localhost:3000

# JWT - MUST be changed in production!
JWT_SECRET=ganti-dengan-secret-yang-kuat-minimal-32-karakter
JWT_EXPIRES_IN=7d

# Rate Limiting (TTL in milliseconds, LIMIT = max requests per TTL)
THROTTLE_TTL=60000
THROTTLE_LIMIT=30
```

## Build Commands

### Frontend
```bash
cd frontend
bun run dev         # Development server (port 3000)
bun run build       # Production build
bun run start       # Start production server
bun run lint        # Run ESLint
```

### Backend
```bash
cd backend
npm run start:dev   # Development with watch mode
npm run build       # Build for production
npm run start:prod  # Start production server
npm run lint        # Run ESLint with auto-fix
npm run format      # Format with Prettier
```

### Testing (Backend)
```bash
cd backend
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run test:cov    # Run tests with coverage
npm run test:e2e    # Run end-to-end tests
```

### Database Migrations (Backend)
```bash
cd backend
npm run typeorm migration:generate -- -d ./src/data-source.ts src/migrations/MigrationName
npm run migration:run
npm run migration:revert
```

### Docker Commands
```bash
# Start all services
docker-compose up -d

# Start only database
docker-compose up -d postgres

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

## API Endpoints

All API endpoints are prefixed with `/api`:

| Endpoint | Methods | Auth Required | Description |
|----------|---------|---------------|-------------|
| `/api/health` | GET | No | Health check |
| `/api/auth/login` | POST | No | User login |
| `/api/auth/register` | POST | No | User registration |
| `/api/users` | CRUD | Yes (Admin) | User management |
| `/api/blogs` | GET | No | List blogs (paginated) |
| `/api/blogs` | POST | Yes (Admin) | Create blog |
| `/api/blogs/:id` | GET | No | Get single blog |
| `/api/blogs/:id` | PATCH | Yes (Admin) | Update blog |
| `/api/blogs/:id` | DELETE | Yes (Admin) | Delete blog |
| `/api/projects` | CRUD | Mixed | Projects management |
| `/api/events` | CRUD | Mixed | Events management |
| `/api/registrations` | POST | No | Submit registration |
| `/api/testimonials` | GET | No | List testimonials |
| `/api/alumni` | GET | No | List alumni |
| `/api/faq` | GET | No | List FAQs |
| `/api/achievements` | GET | No | List achievements |
| `/api/newsletter` | POST | No | Subscribe to newsletter |
| `/api/contacts` | POST | No | Submit contact form |

**API Documentation**: Available at `/api/docs` (Swagger UI) when not in production.

## Code Conventions

### Frontend

#### File Naming
- Components: PascalCase (e.g., `Navbar.tsx`, `Hero.tsx`)
- Utilities/Hooks: camelCase (e.g., `useScroll.ts`)
- Sections: PascalCase in `sections/` folder

#### Component Structure
```typescript
"use client";  // For client components only

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ComponentName() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP animations here
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref}>
      {/* JSX */}
    </section>
  );
}
```

#### GSAP Animation Guidelines
1. Always register ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)`
2. Use `gsap.context()` for proper cleanup
3. Use trigger points: `"top 80%"` or `"top 85%"` for reveals
4. Stagger lists with 0.1s - 0.15s delay
5. Clean up ScrollTrigger instances in useEffect cleanup

#### Styling Conventions
- Use Tailwind CSS utility classes
- Custom CSS variables defined in `globals.css`
- Primary color: Sky 500 (`#0ea5e9`)
- Section padding: `section-padding` class
- Animations: Use `gsap-reveal`, `gsap-reveal-left`, etc.

#### Internationalization (i18n)
- Translations stored in `messages/en.json` and `messages/id.json`
- Use `useTranslations()` hook in client components
- Use `getTranslations()` in server components
- Supported locales: `en` (default), `id`

### Backend

#### Module Structure
Each module follows this structure:
```
module-name/
├── dto/
│   ├── create-entity.dto.ts
│   └── update-entity.dto.ts
├── entities/
│   └── entity.entity.ts
├── module-name.controller.ts
├── module-name.module.ts
├── module-name.service.ts
└── index.ts
```

#### Naming Conventions
- Controllers: `*.controller.ts` (PascalCase)
- Services: `*.service.ts` (PascalCase)
- DTOs: `*.dto.ts` (PascalCase, suffix with Dto)
- Entities: `*.entity.ts` (PascalCase)
- Modules: `*.module.ts` (PascalCase)

#### BaseService Pattern
All services extend `BaseService` for common CRUD operations:
```typescript
export class EntityService extends BaseService<Entity> {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {
    super(entityRepository, 'Entity');
  }
}
```

#### Authentication & Authorization
- JWT-based authentication via `@UseGuards(JwtAuthGuard)`
- Role-based authorization via `@Roles(UserRole.ADMIN)`
- Available roles: `ADMIN`, `MEMBER`, `ALUMNI`

#### DTO Validation
Use class-validator decorators in DTOs:
```typescript
export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

## Testing Strategy

### Backend Testing
- **Unit Tests**: Jest with TypeScript support
- **Test Files**: `*.spec.ts` alongside source files
- **E2E Tests**: Separate `test/` folder with `jest-e2e.json` config
- **Coverage**: Configured to collect from all `(t|j)s` files

### Running Tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend Testing
No test framework is currently configured for the frontend.

## Security Considerations

### Backend
1. **CORS**: Configured to allow only specified origins via `FRONTEND_URL`
2. **Rate Limiting**: Global throttling via `@nestjs/throttler` (default: 30 requests/minute)
3. **JWT**: Tokens expire in 7 days (configurable via `JWT_EXPIRES_IN`)
4. **Password Hashing**: bcrypt for password storage
5. **Validation**: Global ValidationPipe with `forbidNonWhitelisted: true`
6. **Helmet**: Recommended to add for production

### Frontend
1. **Environment Variables**: Only `NEXT_PUBLIC_*` variables are exposed to client
2. **Image Domains**: Configured in `next.config.ts` for allowed remote images
3. **React Compiler**: Enabled for optimized rendering

### Production Checklist
- [ ] Change `JWT_SECRET` to a strong random string (min 32 chars)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper `FRONTEND_URL` for CORS
- [ ] Disable Swagger in production (automatic)
- [ ] Enable database logging only in development
- [ ] Set up proper database credentials
- [ ] Configure rate limiting appropriately
- [ ] Set up HTTPS
- [ ] Add Helmet.js for security headers

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend/`
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend (Docker)
1. Build Docker image: `docker build -t clubit-backend ./backend`
2. Push to container registry
3. Deploy with environment variables
4. Connect to PostgreSQL database

### Environment-Specific Notes
- **Development**: `synchronize: true` in TypeORM (auto-migrations)
- **Production**: Use proper migrations, `synchronize: false`

## Common Issues

### Port Conflicts
- Frontend: Port 3000
- Backend: Port 3001
- PostgreSQL: Port 5432

### Database Connection
Ensure PostgreSQL is running before starting the backend:
```bash
docker-compose up -d postgres
```

### i18n Routing
The app uses `[locale]` dynamic segments. Default locale is `en`.
Middleware handles automatic locale detection and redirection.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
