# Technology Stack

## Core Technologies

### Frontend Framework
- **Next.js 15.2.4** - React framework with App Router
- **React 18.3.1** - UI library with latest features
- **TypeScript 5** - Static type checking

### Styling & UI
- **Tailwind CSS v4.1.9** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Theme management (dark/light mode)

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - Authentication system
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
- **@supabase/ssr** - Server-side rendering support

### Data Visualization
- **Recharts 2.15.4** - Chart library for progress tracking
- **date-fns 4.1.0** - Date manipulation utilities

### Form Management
- **React Hook Form 7.60.0** - Form state management
- **@hookform/resolvers 3.10.0** - Form validation
- **Zod 3.25.76** - Schema validation

### State Management
- **Zustand 5.0.8** - Lightweight state management
- **React Context** - Built-in state sharing

### Testing
- **Jest 30.2.0** - Testing framework
- **@testing-library/react 16.3.0** - React testing utilities
- **@testing-library/jest-dom 6.9.1** - DOM testing matchers
- **ts-jest 29.4.5** - TypeScript support for Jest

### Development Tools
- **pnpm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Development Commands

### Package Management
```bash
pnpm install          # Install dependencies
pnpm add <package>     # Add new dependency
pnpm remove <package>  # Remove dependency
```

### Development
```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm test             # Run Jest tests
```

### Environment Setup
```bash
# Required environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build Configuration

### TypeScript Configuration
- Target: ES6
- Strict mode enabled
- Path mapping: `@/*` → `./*`
- JSX: preserve (handled by Next.js)

### Next.js Configuration
- App Router enabled
- TypeScript support
- Tailwind CSS integration
- PWA manifest support

### PWA Features
- Service worker for offline support
- Installable on mobile and desktop
- Push notifications
- Optimized caching strategies

## Database Schema
- PostgreSQL with Supabase
- Row Level Security (RLS) policies
- Real-time subscriptions
- Automated triggers for user management
- Comprehensive exercise library with media assets