-- Seed default exercises
insert into public.exercises (name, description, muscle_group, equipment, difficulty, instructions, is_public) values
  ('Bench Press', 'Classic chest exercise for building upper body strength', 'Chest', 'Barbell', 'intermediate', 
   array['Lie flat on bench', 'Grip bar slightly wider than shoulders', 'Lower bar to chest', 'Press up explosively'], true),
  
  ('Incline Dumbbell Press', 'Upper chest focused pressing movement', 'Chest', 'Dumbbells', 'intermediate',
   array['Set bench to 30-45 degrees', 'Press dumbbells up and together', 'Lower with control'], true),
  
  ('Dumbbell Flyes', 'Isolation exercise for chest development', 'Chest', 'Dumbbells', 'beginner',
   array['Lie on flat bench', 'Arc dumbbells out to sides', 'Squeeze chest at top'], true),
  
  ('Squats', 'King of leg exercises', 'Legs', 'Barbell', 'intermediate',
   array['Bar on upper back', 'Feet shoulder width', 'Descend until thighs parallel', 'Drive through heels'], true),
  
  ('Leg Press', 'Machine-based leg builder', 'Legs', 'Machine', 'beginner',
   array['Feet shoulder width on platform', 'Lower with control', 'Press through full range'], true),
  
  ('Romanian Deadlift', 'Hamstring and glute developer', 'Legs', 'Barbell', 'intermediate',
   array['Slight knee bend', 'Hinge at hips', 'Lower bar along shins', 'Feel hamstring stretch'], true),
  
  ('Pull-ups', 'Classic back width builder', 'Back', 'Pull-up Bar', 'intermediate',
   array['Hang from bar', 'Pull chin over bar', 'Lower with control'], true),
  
  ('Barbell Rows', 'Thick back developer', 'Back', 'Barbell', 'intermediate',
   array['Hinge at hips', 'Pull bar to lower chest', 'Squeeze shoulder blades'], true),
  
  ('Lat Pulldown', 'Machine-based back exercise', 'Back', 'Machine', 'beginner',
   array['Grip bar wide', 'Pull to upper chest', 'Control the negative'], true),
  
  ('Overhead Press', 'Shoulder mass builder', 'Shoulders', 'Barbell', 'intermediate',
   array['Bar at shoulder height', 'Press overhead', 'Lock out at top'], true),
  
  ('Lateral Raises', 'Side delt isolation', 'Shoulders', 'Dumbbells', 'beginner',
   array['Slight forward lean', 'Raise arms to sides', 'Lead with elbows'], true),
  
  ('Barbell Curls', 'Classic bicep builder', 'Arms', 'Barbell', 'beginner',
   array['Grip bar shoulder width', 'Curl to shoulders', 'Control the descent'], true),
  
  ('Tricep Dips', 'Compound tricep exercise', 'Arms', 'Parallel Bars', 'intermediate',
   array['Lean slightly forward', 'Lower until 90 degrees', 'Press back up'], true),
  
  ('Plank', 'Core stability exercise', 'Core', 'Bodyweight', 'beginner',
   array['Forearms on ground', 'Body in straight line', 'Hold position'], true),
  
  ('Russian Twists', 'Oblique developer', 'Core', 'Bodyweight', 'beginner',
   array['Sit with knees bent', 'Lean back slightly', 'Rotate torso side to side'], true);
