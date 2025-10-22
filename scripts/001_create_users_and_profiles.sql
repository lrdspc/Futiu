-- Create users table extension for app-specific data
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  user_type text not null check (user_type in ('personal', 'student')),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create profiles table for personal trainers
create table if not exists public.personal_profiles (
  id uuid primary key references public.users(id) on delete cascade,
  specialization text,
  bio text,
  certifications text[],
  years_experience integer,
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create profiles table for students
create table if not exists public.student_profiles (
  id uuid primary key references public.users(id) on delete cascade,
  personal_trainer_id uuid references public.users(id),
  date_of_birth date,
  gender text,
  height_cm numeric(5,2),
  current_weight_kg numeric(5,2),
  goal_weight_kg numeric(5,2),
  fitness_goal text,
  medical_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.personal_profiles enable row level security;
alter table public.student_profiles enable row level security;

-- RLS Policies for users table
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own data"
  on public.users for insert
  with check (auth.uid() = id);

-- RLS Policies for personal_profiles
create policy "Personal trainers can view their own profile"
  on public.personal_profiles for select
  using (auth.uid() = id);

create policy "Personal trainers can update their own profile"
  on public.personal_profiles for update
  using (auth.uid() = id);

create policy "Personal trainers can insert their own profile"
  on public.personal_profiles for insert
  with check (auth.uid() = id);

-- RLS Policies for student_profiles
create policy "Students can view their own profile"
  on public.student_profiles for select
  using (auth.uid() = id);

create policy "Students can update their own profile"
  on public.student_profiles for update
  using (auth.uid() = id);

create policy "Students can insert their own profile"
  on public.student_profiles for insert
  with check (auth.uid() = id);

create policy "Personal trainers can view their students profiles"
  on public.student_profiles for select
  using (
    exists (
      select 1 from public.student_profiles sp
      where sp.personal_trainer_id = auth.uid()
      and sp.id = student_profiles.id
    )
  );

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, user_type, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'user_type', 'student'),
    coalesce(new.raw_user_meta_data->>'full_name', null)
  );
  return new;
end;
$$;

-- Trigger to auto-create user profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
