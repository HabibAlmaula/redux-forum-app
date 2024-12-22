/**
 * Test Scenarios
 * 
 * - Sidebar Component
 *   - should render all navigation buttons correctly
 *   - should render logo and title correctly
 *   - should navigate to home when logo is clicked
 *   - should highlight Trending button when on home page
 *   - should highlight Leaderboard button when on leaderboard page
 *   - should navigate to correct routes when buttons are clicked
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './SideBar';
import { home, leaderboard } from '@/routes/routeName';

// Create a mock variable to control the pathname
let mockPathname = '/';

// Mock navigation function
const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: mockPathname
    }),
    useNavigate: () => mockNavigate
  };
});

describe('Sidebar Component', () => {
  const renderSidebar = (pathname = '/') => {
    // Update the mock pathname
    mockPathname = pathname;
    
    return render(
      <MemoryRouter initialEntries={[pathname]}>
        <Sidebar />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/';
  });

  it('should render all navigation buttons correctly', () => {
    // Arrange
    renderSidebar();

    // Assert
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('should render logo and title correctly', () => {
    // Arrange
    renderSidebar();

    // Assert
    expect(screen.getByText('Dicoding Forum')).toBeInTheDocument();
    // Check if logo div exists
    const logo = document.querySelector('.bg-gradient-to-r.from-purple-500.to-blue-500.rounded-lg');
    expect(logo).toBeInTheDocument();
  });

  it('should navigate to home when logo is clicked', async () => {
    // Arrange
    renderSidebar();
    const logoContainer = screen.getByText('Dicoding Forum').parentElement;

    // Act
    await userEvent.click(logoContainer);

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith(home);
  });

  it('should highlight Trending button when on home page', () => {
    // Arrange
    renderSidebar(home);

    // Assert
    const trendingButton = screen.getByText('Trending').closest('button');
    expect(trendingButton).toHaveClass('bg-slate-200');
  });

  it('should highlight Leaderboard button when on leaderboard page', () => {
    // Arrange
    renderSidebar(leaderboard);

    // Assert
    const leaderboardButton = screen.getByText('Leaderboard').closest('button');
    expect(leaderboardButton).toHaveClass('bg-slate-200');
  });

  it('should navigate to correct routes when buttons are clicked', async () => {
    // Arrange
    renderSidebar();

    // Act & Assert - Trending button
    await userEvent.click(screen.getByText('Trending'));
    expect(mockNavigate).toHaveBeenCalledWith(home);

    // Act & Assert - Leaderboard button
    await userEvent.click(screen.getByText('Leaderboard'));
    expect(mockNavigate).toHaveBeenCalledWith(leaderboard);

    // Act & Assert - Notifications button
    await userEvent.click(screen.getByText('Notifications'));
    expect(mockNavigate).toHaveBeenCalledWith('/notifications');
  });
});