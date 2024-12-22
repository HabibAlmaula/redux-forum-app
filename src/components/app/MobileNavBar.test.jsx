/**
 * Test Scenarios
 * 
 * - MobileNavBar Component
 *   - should render all navigation items correctly
 *   - should highlight home link when on home page
 *   - should highlight leaderboard link when on leaderboard page
 *   - should highlight alerts link when on alerts page
 *   - should highlight profile link when on profile page
 *   - should highlight leaderboard for nested leaderboard routes
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MobileNavBar from './MobileNavBar';

// Create a mock variable to control the pathname
let mockPathname = '/';

// Mock the entire react-router-dom module
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: mockPathname
    })
  };
});

describe('MobileNavBar Component', () => {
  const renderMobileNavBar = (pathname = '/') => {
    // Update the mock pathname
    mockPathname = pathname;
    
    return render(
      <MemoryRouter initialEntries={[pathname]}>
        <MobileNavBar />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/';  // Reset pathname before each test
  });

  it('should render all navigation items correctly', () => {
    // Arrange
    renderMobileNavBar();

    // Assert
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('LeaderBoard')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('should highlight home link when on home page', () => {
    // Arrange
    renderMobileNavBar('/');

    // Assert
    const homeText = screen.getByText('Home');
    expect(homeText).toHaveClass('text-blue-500');
  });

  it('should highlight leaderboard link when on leaderboard page', () => {
    // Arrange
    renderMobileNavBar('/leaderBoard');

    // Assert
    const leaderboardText = screen.getByText('LeaderBoard');
    expect(leaderboardText).toHaveClass('text-blue-500');
  });

  it('should highlight alerts link when on alerts page', () => {
    // Arrange
    renderMobileNavBar('/alerts');

    // Assert
    const alertsText = screen.getByText('Alerts');
    expect(alertsText).toHaveClass('text-blue-500');
  });

  it('should highlight profile link when on profile page', () => {
    // Arrange
    renderMobileNavBar('/profile');

    // Assert
    const profileText = screen.getByText('Profile');
    expect(profileText).toHaveClass('text-blue-500');
  });

  it('should highlight leaderboard for nested leaderboard routes', () => {
    // Arrange
    renderMobileNavBar('/leaderBoard/weekly');

    // Assert
    const leaderboardText = screen.getByText('LeaderBoard');
    expect(leaderboardText).toHaveClass('text-blue-500');
  });

  it('should have correct navigation links', () => {
    // Arrange
    renderMobileNavBar();

    // Assert
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('LeaderBoard').closest('a')).toHaveAttribute('href', '/leaderBoard');
    expect(screen.getByText('Alerts').closest('a')).toHaveAttribute('href', '/alerts');
    expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile');
  });
});