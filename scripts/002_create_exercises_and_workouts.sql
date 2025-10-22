--
-- This script creates the tables for exercises and workouts, which are central
-- to the application's functionality. It also sets up the necessary RLS policies
-- to ensure that users can only access and manage their own data.
--

-- Create exercises table
create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  muscle_group text not null,
  equipment text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  video_url text,
  image_url text,
  instructions text[],
  created_by uuid references public.users(id),
  is_public boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create workouts table
create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by uuid not null references public.users(id),
  assigned_to uuid references public.users(id),
  workout_type text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  estimated_duration_minutes integer,
  is_template boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create workout_exercises junction table
create table if not exists public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  order_index integer not null,
  sets integer,
  reps text,
  rest_seconds integer,
  notes text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;

-- RLS Policies for exercises
create policy "Public exercises are viewable by everyone"
  on public.exercises for select
  using (is_public = true or created_by = auth.uid());

create policy "Users can create their own exercises"
  on public.exercises for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own exercises"
  on public.exercises for update
  using (auth.uid() = created_by);

create policy "Users can delete their own exercises"
  on public.exercises for delete
  using (auth.uid() = created_by);

-- RLS Policies for workouts
create policy "Users can view workouts they created"
  on public.workouts for select
  using (auth.uid() = created_by);

create policy "Students can view workouts assigned to them"
  on public.workouts for select
  using (auth.uid() = assigned_to);

create policy "Users can create workouts"
  on public.workouts for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own workouts"
  on public.workouts for update
  using (auth.uid() = created_by);

create policy "Users can delete their own workouts"
  on public.workouts for delete
  using (auth.uid() = created_by);

-- RLS Policies for workout_exercises
create policy "Users can view workout exercises for their workouts"
  on public.workout_exercises for select
  using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_exercises.workout_id
      and (w.created_by = auth.uid() or w.assigned_to = auth.uid())
    )
  );

create policy "Users can manage workout exercises for their workouts"
  on public.workout_exercises for all
  using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_exercises.workout_id
      and w.created_by = auth.uid()
    )
  );
