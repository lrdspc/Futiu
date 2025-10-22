-- Create workout sessions table (completed workouts)
create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  workout_id uuid references public.workouts(id),
  started_at timestamp with time zone not null,
  completed_at timestamp with time zone,
  duration_minutes integer,
  notes text,
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default now()
);

-- Create exercise logs table (individual exercise performance)
create table if not exists public.exercise_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  set_number integer not null,
  reps integer,
  weight_kg numeric(6,2),
  duration_seconds integer,
  notes text,
  created_at timestamp with time zone default now()
);

-- Create body measurements table
create table if not exists public.body_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  measured_at timestamp with time zone not null default now(),
  weight_kg numeric(5,2),
  body_fat_percentage numeric(4,2),
  chest_cm numeric(5,2),
  waist_cm numeric(5,2),
  hips_cm numeric(5,2),
  bicep_left_cm numeric(5,2),
  bicep_right_cm numeric(5,2),
  thigh_left_cm numeric(5,2),
  thigh_right_cm numeric(5,2),
  notes text,
  created_at timestamp with time zone default now()
);

-- Create progress photos table
create table if not exists public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  photo_url text not null,
  taken_at timestamp with time zone not null default now(),
  view_type text check (view_type in ('front', 'side', 'back')),
  notes text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.workout_sessions enable row level security;
alter table public.exercise_logs enable row level security;
alter table public.body_measurements enable row level security;
alter table public.progress_photos enable row level security;

-- RLS Policies for workout_sessions
create policy "Users can view their own workout sessions"
  on public.workout_sessions for select
  using (auth.uid() = user_id);

create policy "Personal trainers can view their students sessions"
  on public.workout_sessions for select
  using (
    exists (
      select 1 from public.student_profiles sp
      where sp.id = workout_sessions.user_id
      and sp.personal_trainer_id = auth.uid()
    )
  );

create policy "Users can create their own workout sessions"
  on public.workout_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own workout sessions"
  on public.workout_sessions for update
  using (auth.uid() = user_id);

-- RLS Policies for exercise_logs
create policy "Users can view their own exercise logs"
  on public.exercise_logs for select
  using (
    exists (
      select 1 from public.workout_sessions ws
      where ws.id = exercise_logs.session_id
      and ws.user_id = auth.uid()
    )
  );

create policy "Personal trainers can view their students exercise logs"
  on public.exercise_logs for select
  using (
    exists (
      select 1 from public.workout_sessions ws
      join public.student_profiles sp on sp.id = ws.user_id
      where ws.id = exercise_logs.session_id
      and sp.personal_trainer_id = auth.uid()
    )
  );

create policy "Users can create exercise logs for their sessions"
  on public.exercise_logs for insert
  with check (
    exists (
      select 1 from public.workout_sessions ws
      where ws.id = exercise_logs.session_id
      and ws.user_id = auth.uid()
    )
  );

-- RLS Policies for body_measurements
create policy "Users can view their own measurements"
  on public.body_measurements for select
  using (auth.uid() = user_id);

create policy "Personal trainers can view their students measurements"
  on public.body_measurements for select
  using (
    exists (
      select 1 from public.student_profiles sp
      where sp.id = body_measurements.user_id
      and sp.personal_trainer_id = auth.uid()
    )
  );

create policy "Users can create their own measurements"
  on public.body_measurements for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own measurements"
  on public.body_measurements for update
  using (auth.uid() = user_id);

-- RLS Policies for progress_photos
create policy "Users can view their own progress photos"
  on public.progress_photos for select
  using (auth.uid() = user_id);

create policy "Personal trainers can view their students progress photos"
  on public.progress_photos for select
  using (
    exists (
      select 1 from public.student_profiles sp
      where sp.id = progress_photos.user_id
      and sp.personal_trainer_id = auth.uid()
    )
  );

create policy "Users can create their own progress photos"
  on public.progress_photos for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own progress photos"
  on public.progress_photos for delete
  using (auth.uid() = user_id);
