-- Create achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  category text check (category in ('workouts', 'consistency', 'strength', 'endurance', 'milestone')),
  requirement_type text not null,
  requirement_value integer not null,
  points integer default 0,
  created_at timestamp with time zone default now()
);

-- Create user achievements table
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  achievement_id uuid not null references public.achievements(id),
  unlocked_at timestamp with time zone default now(),
  unique(user_id, achievement_id)
);

-- Create messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.users(id),
  recipient_id uuid not null references public.users(id),
  content text not null,
  attachment_url text,
  attachment_type text,
  read_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.messages enable row level security;

-- RLS Policies for achievements (public read)
create policy "Anyone can view achievements"
  on public.achievements for select
  using (true);

-- RLS Policies for user_achievements
create policy "Users can view their own achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "Users can unlock their own achievements"
  on public.user_achievements for insert
  with check (auth.uid() = user_id);

-- RLS Policies for messages
create policy "Users can view messages they sent"
  on public.messages for select
  using (auth.uid() = sender_id);

create policy "Users can view messages sent to them"
  on public.messages for select
  using (auth.uid() = recipient_id);

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Recipients can mark messages as read"
  on public.messages for update
  using (auth.uid() = recipient_id);

-- Insert default achievements
insert into public.achievements (name, description, icon, category, requirement_type, requirement_value, points) values
  ('First Workout', 'Complete your first workout', '🏋️', 'workouts', 'workout_count', 1, 10),
  ('Week Warrior', 'Complete 7 workouts', '💪', 'workouts', 'workout_count', 7, 50),
  ('Month Master', 'Complete 30 workouts', '🔥', 'workouts', 'workout_count', 30, 200),
  ('Consistent Champion', 'Train 5 days in a row', '⭐', 'consistency', 'streak_days', 5, 100),
  ('Iron Will', 'Train 30 days in a row', '🏆', 'consistency', 'streak_days', 30, 500),
  ('Strength Starter', 'Lift 1000kg total', '💪', 'strength', 'total_weight_kg', 1000, 150),
  ('Power Lifter', 'Lift 10000kg total', '🦾', 'strength', 'total_weight_kg', 10000, 750);
