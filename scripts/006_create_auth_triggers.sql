--
-- This script sets up triggers to keep the `public.users` table in sync with the
-- `auth.users` table from Supabase. It handles both new user creation and updates
-- to existing users.
--

-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into users table
  INSERT INTO public.users (id, email, full_name, user_type, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'student'),
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Create profile based on user type
  IF COALESCE(NEW.raw_user_meta_data->>'user_type', 'student') = 'personal' THEN
    -- Create personal trainer profile
    INSERT INTO public.personal_profiles (id)
    VALUES (NEW.id);
  ELSE
    -- Create student profile
    INSERT INTO public.student_profiles (id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to handle user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Update users table when auth.users is updated
  UPDATE public.users
  SET
    email = NEW.email,
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', full_name),
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', avatar_url),
    updated_at = NOW()
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user is updated
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();
