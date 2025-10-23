import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import StudentLoginPage from '@/app/auth/student-login/page';
import { createClient } from '@/lib/supabase/client';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('StudentLoginPage', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockSignInWithPassword = jest.fn();
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockSingle = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });

    mockSingle.mockResolvedValue({ data: { user_type: 'student' }, error: null });
    mockEq.mockReturnValue({ single: mockSingle });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockFrom.mockReturnValue({ select: mockSelect });

    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signOut: mockSignOut,
      },
      from: mockFrom,
    });
  });

  it('should render login form correctly', () => {
    render(<StudentLoginPage />);
    
    expect(screen.getByText('Personal & Aluno')).toBeInTheDocument();
    expect(screen.getByText('Área do Aluno')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should render "Login Personal" button', () => {
    render(<StudentLoginPage />);
    
    const loginPersonalButton = screen.getByText('Login Personal');
    expect(loginPersonalButton).toBeInTheDocument();
    expect(loginPersonalButton.closest('a')).toHaveAttribute('href', '/auth/personal-login');
  });

  it('should display message about not having an account', () => {
    render(<StudentLoginPage />);
    
    expect(screen.getByText(/não tem uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/solicite ao seu personal trainer/i)).toBeInTheDocument();
  });

  it('should handle successful student login', async () => {
    const mockUser = { id: 'student-123', email: 'student@test.com' };
    mockSignInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    render(<StudentLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'student@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'student@test.com',
        password: 'password123',
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/student');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('should reject login if user is not a student', async () => {
    const mockUser = { id: 'personal-123', email: 'personal@test.com' };
    mockSignInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
    
    mockSingle.mockResolvedValue({ data: { user_type: 'personal' }, error: null });

    render(<StudentLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'personal@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/esta área é exclusiva para alunos/i)).toBeInTheDocument();
    });
  });

  it('should display error message on failed login', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: 'Invalid credentials' },
    });

    render(<StudentLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao fazer login/i)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should disable button and show loading state during login', async () => {
    mockSignInWithPassword.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ data: { user: null }, error: null }), 100))
    );

    render(<StudentLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/entrando/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  it('should require email and password fields', () => {
    render(<StudentLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    expect(emailInput.required).toBe(true);
    expect(passwordInput.required).toBe(true);
  });
});

