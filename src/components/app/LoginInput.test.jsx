/**
 * Scenario Testing
 * - LoginInput Component
 *  - should render without crashing
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should handle form submission correctly
 *  - should toggle password visibility when show/hide password button is clicked
 *  - should disable submit button and show loading text when form is being submitted
 *  - should disable inputs and show loading state when isLoading is true
 *  - should navigate to register page when signup link is clicked
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './LoginInput';

// Mock the LoadingSpinner component
vi.mock('./LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

const mockNavigate = vi.fn();

// Mock react-router useNavigate
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LoginInput Component', () => {
  const mockOnSubmit = vi.fn();

  const renderLoginInput = (props = {}) => {
    return render(
      <BrowserRouter>
        <LoginInput onSubmit={mockOnSubmit} {...props} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    //arrange
    renderLoginInput();
    //assert
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should handle email typing correctly', async () => {
    //arrange
    renderLoginInput();
    const emailInput =screen.getByPlaceholderText('Enter your email');
    //act
    await userEvent.type(emailInput, 'test@example.com');
    //assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    //arrange
    renderLoginInput();
    const passwordInput =screen.getByPlaceholderText('Enter your password');
    //act
    await userEvent.type(passwordInput, 'testpassword');
    //assert
    expect(passwordInput).toHaveValue('testpassword');
  });

  it('should handle form submission correctly', async () => {
    //arrange
    renderLoginInput();
    const emailInput =screen.getByPlaceholderText('Enter your email');
    const passwordInput =screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');
    //act
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(submitButton);
    //assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'testpassword',
      });
    });
  });

  it('should toggle password visibility when show/hide password button is clicked', async () => {
    //arrange
    renderLoginInput();
    const passwordInput =screen.getByPlaceholderText('Enter your password');
    const toggleButton = screen.getByRole('button', { name: '' }); // The eye icon button

    expect(passwordInput).toHaveAttribute('type', 'password');

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should disable inputs and show loading state when isLoading is true', () => {
    //arrange
    renderLoginInput({ isLoading: true });

    const emailInput =screen.getByPlaceholderText('Enter your email');
    const passwordInput =screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByTestId('submit-login-button');
    //assert
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });

  it('should navigate to register page when signup link is clicked', async () => {
    //arrange
    renderLoginInput();
    const signupLink = screen.getByText(/sign up/i);
    //act
    await userEvent.click(signupLink);
    //assert
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});