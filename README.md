# IT Club Website 🚀

A modern, full-stack website for IT Club extracurricular featuring smooth GSAP animations, responsive design, dark mode support, and a comprehensive admin dashboard.

![IT Club Website](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80)

## ✨ Features

### Frontend (Next.js)
- **Modern Design**: Clean, professional UI with sky blue and white color scheme
- **GSAP Animations**: Smooth scroll-triggered animations and micro-interactions
- **Lenis Smooth Scroll**: Buttery smooth scrolling experience
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Layout**: Fully responsive design for all devices
- **Scroll Progress**: Visual progress bar and back-to-top button
- **Contact Modal**: Quick contact form popup

### Sections (15 Total)
1. **Hero** - Bold typography with floating elements and animations
2. **About** - Feature cards with hover effects
3. **Team** - Pengurus inti showcase with social links
4. **Achievements** - Awards and competition wins
5. **Projects** - Project gallery with filtering
6. **Events** - Upcoming and past events
7. **Gallery** - Photo gallery with lightbox
8. **Blog** - Articles and tutorials
9. **Testimonials** - Member testimonials slider
10. **Alumni** - Success stories
11. **Partners** - Industry partners showcase
12. **FAQ** - Accordion with categories
13. **Registration** - Member registration form
14. **Newsletter** - Email subscription
15. **Footer** - Complete footer with contact

### Backend (NestJS)
- **RESTful API**: Complete CRUD operations
- **PostgreSQL Database**: TypeORM integration
- **10 Modules**: Users, Blogs, Projects, Events, Registrations, Testimonials, Alumni, FAQ, Achievements, Newsletter

## 🚀 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Framer Motion
- Lenis (Smooth Scroll)
- Lucide Icons

### Backend
- NestJS 10
- TypeScript
- TypeORM
- PostgreSQL
- Class Validator/Transformer

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Bun or npm

### Quick Start

```bash
# Clone repository
git clone <repository-url>
cd clubit

# Setup environment
chmod +x start-dev.sh

# Start all services
./start-dev.sh
```

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

**Database (Docker):**
```bash
docker-compose up -d postgres
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 🎨 Design System

### Colors
- **Primary**: Sky 500 (#0ea5e9)
- **Background**: White (Light) / Slate 900 (Dark)
- **Text**: Slate 900 (Light) / Slate 100 (Dark)

### Typography
- **Font**: Geist Sans/Mono

### Animations
- **Smooth Scroll**: Lenis with 1.2s duration
- **GSAP**: ScrollTrigger for reveal animations
- **Framer Motion**: Component animations

## 📁 Project Structure

```
clubit/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── users/
│   │   ├── blogs/
│   │   ├── projects/
│   │   ├── events/
│   │   ├── registrations/
│   │   ├── testimonials/
│   │   ├── alumni/
│   │   ├── faq/
│   │   ├── achievements/
│   │   ├── newsletter/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── frontend/             # Next.js App
│   ├── app/
│   │   ├── sections/     # 15 page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Alumni.tsx
│   │   │   ├── Partners.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Registration.tsx
│   │   │   └── Newsletter.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SmoothScroll.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── DarkModeToggle.tsx
│   │   │   └── ContactModal.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── package.json
├── docker-compose.yml
├── start-dev.sh
└── README.md
```

## 🔥 New Features Added

### 1. Team Section
- Showcase pengurus inti IT Club
- Social media links per member
- Badge indicators (Leader, Core)
- Beautiful hover animations

### 2. Gallery Section
- Filterable photo gallery
- Lightbox modal for viewing
- Category-based filtering
- Masonry-style layout

### 3. Smooth Scroll (Lenis)
- Buttery smooth scrolling
- Connected to GSAP ScrollTrigger
- Optimized for performance

### 4. Dark Mode
- Toggle button (bottom-left)
- Persistent preference (localStorage)
- System preference detection
- Smooth transition between themes

### 5. Scroll Progress
- Progress bar at top
- Back-to-top button (bottom-right)
- Appears after scrolling 100px

### 6. Contact Modal
- Quick contact form popup
- Multiple subject options
- Success animation
- Accessible from footer

### 7. Partners Section
- Industry partner logos
- Hover effects
- Grayscale to color transition

## 📱 Sections Detail

| Section | Features | Animation |
|---------|----------|-----------|
| Hero | Floating elements, stats | GSAP + Framer Motion |
| About | 4 feature cards | ScrollTrigger |
| Team | 8 members, social links | Stagger reveal |
| Achievements | Awards, competition | Slide in |
| Projects | 6 projects, tech tags | Grid reveal |
| Events | 3 upcoming, 3 past | Card animation |
| Gallery | 8 photos, lightbox | Filter animation |
| Blog | 3 articles | Featured layout |
| Testimonials | Slider, 4 reviews | Carousel |
| Alumni | 4 success stories | Card hover |
| Partners | 8 logos | Fade in |
| FAQ | 6 questions, accordion | Expand/collapse |
| Registration | Multi-step form | Input focus |
| Newsletter | Email subscription | Success state |

## 🔧 Development Commands

```bash
# Development (all services)
./start-dev.sh

# Frontend only
cd frontend && bun run dev

# Backend only
cd backend && npm run start:dev

# Database only
docker-compose up -d postgres

# Build for production
cd frontend && bun run build
cd backend && npm run build
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend/`
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Deploy with Dockerfile
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Backend (.env):**
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

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👥 Team

Made with ❤️ by IT Club Team

---

**Live Demo**: [Coming Soon]

**Documentation**: [API Docs](http://localhost:3001/api)
