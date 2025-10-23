import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import PersonalLoginPage from '@/app/auth/personal-login/page';
import { createClient } from '@/lib/supabase/client';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('PersonalLoginPage', () => {
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

    mockSingle.mockResolvedValue({ data: { user_type: 'personal' }, error: null });
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
    render(<PersonalLoginPage />);
    
    expect(screen.getByText('Personal & Aluno')).toBeInTheDocument();
    expect(screen.getByText('Área do Personal Trainer')).toBeInTheDocument();
    expect(screen.getByText('Login Personal')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should render "Voltar" button', () => {
    render(<PersonalLoginPage />);
    
    const backButton = screen.getByText('Voltar');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/auth/student-login');
  });

  it('should handle successful personal trainer login', async () => {
    const mockUser = { id: 'personal-123', email: 'personal@test.com' };
    mockSignInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    render(<PersonalLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'personal@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'personal@test.com',
        password: 'password123',
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/trainer');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('should reject login if user is not a personal trainer', async () => {
    const mockUser = { id: 'student-123', email: 'student@test.com' };
    mockSignInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
    
    mockSingle.mockResolvedValue({ data: { user_type: 'student' }, error: null });

    render(<PersonalLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'student@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/esta área é exclusiva para personal trainers/i)).toBeInTheDocument();
    });
  });

  it('should display error message on failed login', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: 'Email not confirmed' },
    });

    render(<PersonalLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'unconfirmed@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
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

    render(<PersonalLoginPage />);
    
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
    render(<PersonalLoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    expect(emailInput.required).toBe(true);
    expect(passwordInput.required).toBe(true);
  });

  it('should have correct color scheme for personal trainer', () => {
    const { container } = render(<PersonalLoginPage />);
    
    // Verificar que usa cores purple/pink em vez de cyan/blue
    const heading = screen.getByText('Personal & Aluno');
    expect(heading).toHaveClass('bg-gradient-to-r', 'from-purple-400', 'to-pink-400');
  });
});

