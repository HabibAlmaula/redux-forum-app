/**
 * Test Scenarios
 *
 * - Theme Action Creator
 *   - should create set dark theme action correctly
 *
 * - asyncSetDarkTheme thunk
 *   - should dispatch action correctly with provided theme
 *   - should dispatch action correctly with initial theme when no theme provided
 *
 * - getInitialTheme helper
 *   - should get theme from localStorage when available
 *   - should get theme from system preferences when localStorage empty
 *   - should return default light theme when no preference found
 *
 * - rawSetTheme helper
 *   - should set dark theme correctly on document
 *   - should set light theme correctly on document
 */

import { describe, beforeEach, it, expect, vi } from 'vitest';
import {
  ActionType,
  setDarkThemeActionCreator,
  asyncSetDarkTheme,
  getInitialTheme,
  rawSetTheme
} from './action';


// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}));

// Mock document methods
const mockClassList = {
  remove: vi.fn(),
  add: vi.fn(),
};
vi.spyOn(document.documentElement, 'classList', 'get').mockReturnValue(mockClassList);
vi.spyOn(document.documentElement, 'setAttribute');

describe('Theme Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Theme Action Creator', () => {
    it('should create set dark theme action correctly', () => {
      // Arrange
      const theme = 'dark';
      const expectedAction = {
        type: ActionType.SET_DARK_MODE,
        payload: { theme }
      };

      // Act
      const action = setDarkThemeActionCreator(theme);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe('asyncSetDarkTheme thunk', () => {
    it('should dispatch action correctly with provided theme', async () => {
      // Arrange
      const theme = 'dark';
      const dispatch = vi.fn();

      // Act
      await asyncSetDarkTheme(theme)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(setDarkThemeActionCreator(theme));
    });

    it('should dispatch action correctly with initial theme when no theme provided', async () => {
      // Arrange
      const dispatch = vi.fn();
      localStorageMock.getItem.mockReturnValue('light');

      // Act
      await asyncSetDarkTheme()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(setDarkThemeActionCreator('light'));
    });
  });

  describe('getInitialTheme helper', () => {
    it('should get theme from localStorage when available', () => {
      // Arrange
      localStorageMock.getItem.mockReturnValue('dark');

      // Act
      const result = getInitialTheme();

      // Assert
      expect(result).toBe('dark');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('color-theme');
    });

    it('should get theme from system preferences when localStorage empty', () => {
      // Arrange
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query
      }));

      // Act
      const result = getInitialTheme();

      // Assert
      expect(result).toBe('dark');
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    it('should return default light theme when no preference found', () => {
      // Arrange
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query
      }));

      // Act
      const result = getInitialTheme();

      // Assert
      expect(result).toBe('light');
    });
  });

  describe('rawSetTheme helper', () => {
    it('should set dark theme correctly on document', () => {
      // Arrange
      const theme = 'dark';
      const mockClassList = document.documentElement.classList;

      // Act
      rawSetTheme(theme);

      // Assert
      expect(mockClassList.remove).toHaveBeenCalledWith('light');
      expect(mockClassList.add).toHaveBeenCalledWith('dark');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
      expect(localStorage.setItem).toHaveBeenCalledWith('color-theme', 'dark');
    });

    it('should set light theme correctly on document', () => {
      // Arrange
      const theme = 'light';
      const mockClassList = document.documentElement.classList;

      // Act
      rawSetTheme(theme);

      // Assert
      expect(mockClassList.remove).toHaveBeenCalledWith('dark');
      expect(mockClassList.add).toHaveBeenCalledWith('light');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
      expect(localStorage.setItem).toHaveBeenCalledWith('color-theme', 'light');
    });
  });
});