import { createStudent } from '@/lib/actions/create-student';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Mock Supabase server client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

// Mock Next.js revalidatePath
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('createStudent Server Action', () => {
  const mockGetUser = jest.fn();
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockSingle = jest.fn();
  const mockUpdate = jest.fn();
  const mockInviteUserByEmail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockSingle.mockResolvedValue({ data: null, error: null });
    mockEq.mockReturnValue({ single: mockSingle });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockFrom.mockReturnValue({ 
      select: mockSelect,
      update: mockUpdate,
    });

    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        getUser: mockGetUser,
        admin: {
          inviteUserByEmail: mockInviteUserByEmail,
        },
      },
      from: mockFrom,
    });
  });

  it('should return error if user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const result = await createStudent({
      email: 'student@test.com',
      full_name: 'Test Student',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('autenticado');
  });

  it('should return error if user is not a personal trainer', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'user-123' } },
      error: null,
    });

    mockSingle.mockResolvedValueOnce({
      data: { user_type: 'student' },
      error: null,
    });

    const result = await createStudent({
      email: 'student@test.com',
      full_name: 'Test Student',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Personal Trainers');
  });

  it('should return error if email already exists', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'personal-123' } },
      error: null,
    });

    mockSingle
      .mockResolvedValueOnce({ data: { user_type: 'personal' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'existing-user' }, error: null });

    const result = await createStudent({
      email: 'existing@test.com',
      full_name: 'Test Student',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('já está cadastrado');
  });

  it('should successfully create student and send invitation email', async () => {
    const mockPersonalId = 'personal-123';
    const mockStudentId = 'student-456';

    mockGetUser.mockResolvedValue({
      data: { user: { id: mockPersonalId } },
      error: null,
    });

    mockSingle
      .mockResolvedValueOnce({ data: { user_type: 'personal' }, error: null })
      .mockResolvedValueOnce({ data: null, error: null });

    mockInviteUserByEmail.mockResolvedValue({
      data: { user: { id: mockStudentId, email: 'student@test.com' } },
      error: null,
    });

    mockEq.mockReturnValue({ single: mockSingle });

    const studentData = {
      email: 'student@test.com',
      full_name: 'Test Student',
      date_of_birth: '2000-01-01',
      gender: 'male',
      height_cm: 180,
      current_weight_kg: 80,
      goal_weight_kg: 75,
      fitness_goal: 'Lose weight',
      medical_notes: 'No issues',
    };

    const result = await createStudent(studentData);

    expect(result.data).toBeDefined();
    expect(result.data?.message).toContain('sucesso');
    expect(result.data?.userId).toBe(mockStudentId);

    expect(mockInviteUserByEmail).toHaveBeenCalledWith(
      studentData.email,
      expect.objectContaining({
        data: {
          full_name: studentData.full_name,
          user_type: 'student',
        },
      })
    );

    expect(revalidatePath).toHaveBeenCalledWith('/dashboard/trainer/students');
  });

  it('should handle auth error when creating user', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'personal-123' } },
      error: null,
    });

    mockSingle
      .mockResolvedValueOnce({ data: { user_type: 'personal' }, error: null })
      .mockResolvedValueOnce({ data: null, error: null });

    mockInviteUserByEmail.mockResolvedValue({
      data: { user: null },
      error: { message: 'Email service unavailable' },
    });

    const result = await createStudent({
      email: 'student@test.com',
      full_name: 'Test Student',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Email service unavailable');
  });

  it('should update student profile with additional data', async () => {
    const mockPersonalId = 'personal-123';
    const mockStudentId = 'student-456';

    mockGetUser.mockResolvedValue({
      data: { user: { id: mockPersonalId } },
      error: null,
    });

    mockSingle
      .mockResolvedValueOnce({ data: { user_type: 'personal' }, error: null })
      .mockResolvedValueOnce({ data: null, error: null });

    mockInviteUserByEmail.mockResolvedValue({
      data: { user: { id: mockStudentId, email: 'student@test.com' } },
      error: null,
    });

    const studentData = {
      email: 'student@test.com',
      full_name: 'Test Student',
      height_cm: 175,
      current_weight_kg: 70,
      fitness_goal: 'Build muscle',
    };

    await createStudent(studentData);

    expect(mockUpdate).toHaveBeenCalledWith({
      personal_trainer_id: mockPersonalId,
      date_of_birth: null,
      gender: null,
      height_cm: 175,
      current_weight_kg: 70,
      goal_weight_kg: null,
      fitness_goal: 'Build muscle',
      medical_notes: null,
    });
  });

  it('should handle profile update errors gracefully', async () => {
    const mockPersonalId = 'personal-123';
    const mockStudentId = 'student-456';

    mockGetUser.mockResolvedValue({
      data: { user: { id: mockPersonalId } },
      error: null,
    });

    mockSingle
      .mockResolvedValueOnce({ data: { user_type: 'personal' }, error: null })
      .mockResolvedValueOnce({ data: null, error: null });

    mockInviteUserByEmail.mockResolvedValue({
      data: { user: { id: mockStudentId, email: 'student@test.com' } },
      error: null,
    });

    mockEq.mockReturnValue({
      single: mockSingle,
    });

    mockUpdate.mockReturnValue({
      eq: jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Profile update failed' },
      }),
    });

    // Deve retornar sucesso mesmo com erro no update do perfil
    const result = await createStudent({
      email: 'student@test.com',
      full_name: 'Test Student',
    });

    expect(result.data).toBeDefined();
    expect(result.data?.message).toContain('sucesso');
  });

  it('should handle general errors', async () => {
    mockGetUser.mockRejectedValue(new Error('Database connection failed'));

    const result = await createStudent({
      email: 'student@test.com',
      full_name: 'Test Student',
    });

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Database connection failed');
  });
});

