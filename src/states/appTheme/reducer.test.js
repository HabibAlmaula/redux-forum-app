import { describe, it, expect, beforeEach, vi } from 'vitest';
import { appThemeReducer } from './reducer';
import { ActionType } from './action';

/**
 * Test Scenarios
 *
 * - appThemeReducer
 *   - should return the initial state when given undefined state
 *   - should return current state for unknown action
 *   - should toggle theme from dark to light when SET_DARK_MODE action is dispatched
 *   - should toggle theme from light to dark when SET_DARK_MODE action is dispatched
 */

// Mock rawSetTheme since we don't want to actually modify the DOM in tests
vi.mock('./action', () => ({
  ActionType: {
    SET_DARK_MODE: 'SET_DARK_MODE'
  },
  rawSetTheme: vi.fn()
}));

describe('appThemeReducer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the initial state when given undefined state', () => {
    // Arrange
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    // Act
    const newState = appThemeReducer(initialState, action);

    // Assert
    expect(newState).toBe('light');
  });

  it('should return current state for unknown action', () => {
    // Arrange
    const initialState = 'dark';
    const action = { type: 'UNKNOWN' };

    // Act
    const newState = appThemeReducer(initialState, action);

    // Assert
    expect(newState).toBe('dark');
  });

  it('should toggle theme from dark to light when SET_DARK_MODE action is dispatched', () => {
    // Arrange
    const initialState = 'dark';
    const action = {
      type: ActionType.SET_DARK_MODE,
      payload: { theme: 'dark' }
    };

    // Act
    const newState = appThemeReducer(initialState, action);

    // Assert
    expect(newState).toBe('light');
  });

  it('should toggle theme from light to dark when SET_DARK_MODE action is dispatched', () => {
    // Arrange
    const initialState = 'light';
    const action = {
      type: ActionType.SET_DARK_MODE,
      payload: { theme: 'light' }
    };

    // Act
    const newState = appThemeReducer(initialState, action);

    // Assert
    expect(newState).toBe('dark');
  });
});