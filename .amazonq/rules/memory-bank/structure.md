# Project Structure

## Directory Organization

### Core Application Structure
```
app/                    # Next.js App Router pages and layouts
├── auth/              # Authentication pages (login, signup, callback)
├── dashboard/         # Main application dashboards
│   ├── student/       # Student-specific dashboard pages
│   ├── trainer/       # Trainer-specific dashboard pages
│   └── page.tsx       # Dashboard routing logic
├── globals.css        # Global styles
├── layout.tsx         # Root layout component
└── page.tsx           # Landing page
```

### Component Architecture
```
components/            # Reusable React components
├── ui/               # shadcn/ui component library
│   ├── sidebar.tsx   # Navigation sidebar
│   ├── button.tsx    # Button variants
│   ├── card.tsx      # Card layouts
│   └── [others]      # Form inputs, dialogs, charts, etc.
├── charts/           # Data visualization components
├── aluno-dashboard.tsx    # Student dashboard component
├── personal-dashboard.tsx # Trainer dashboard component
├── chat-interface.tsx     # Messaging system
├── login-form.tsx         # Authentication form
└── theme-provider.tsx     # Dark/light theme management
```

### Business Logic Layer
```
lib/                  # Core application logic
├── actions/          # Server actions for data operations
│   ├── auth.ts       # Authentication operations
│   ├── exercises.ts  # Exercise management
│   ├── workouts.ts   # Workout operations
│   ├── students.ts   # Student management
│   ├── progress.ts   # Progress tracking
│   └── messages.ts   # Chat functionality
├── supabase/         # Database client configuration
│   ├── client.ts     # Client-side Supabase client
│   ├── server.ts     # Server-side Supabase client
│   └── middleware.ts # Authentication middleware
├── auth.ts           # Authentication utilities
├── exercises.ts      # Exercise data models
└── utils.ts          # Shared utility functions
```

### Data Layer
```
scripts/              # Database schema and seeding
├── 001_create_users_and_profiles.sql    # User management tables
├── 002_create_exercises_and_workouts.sql # Exercise and workout tables
├── 003_create_progress_tracking.sql     # Progress monitoring tables
├── 004_create_achievements_and_messages.sql # Gamification and chat
├── 005_seed_exercises.sql               # Initial exercise data
└── 006_create_auth_triggers.sql         # Authentication triggers
```

### Testing Infrastructure
```
__tests__/            # Test files
└── app/              # Application test structure
    └── dashboard/    # Dashboard component tests
```

### Static Assets
```
public/               # Static files and images
├── manifest.json     # PWA manifest
├── icon-*.jpg        # PWA icons
└── [exercise-images] # Exercise demonstration images
```

## Architectural Patterns

### Authentication Flow
- Supabase Auth with email/password
- Row Level Security (RLS) for data protection
- Middleware-based route protection
- Separate user profiles for trainers and students

### Data Management
- Server Actions for database operations
- Type-safe database queries with TypeScript
- Real-time subscriptions for chat and progress updates
- Optimistic UI updates for better user experience

### Component Patterns
- shadcn/ui for consistent design system
- Compound components for complex UI elements
- Custom hooks for shared logic
- Context providers for global state management

### PWA Architecture
- Service worker for offline functionality
- Manifest configuration for installability
- Optimized caching strategies
- Push notification support