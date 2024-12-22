/**
 * Scenario testing
 * - CommentInput Component
 *   - should render without crashing
 *   - should handle comment typing correctly
 *   - should handle comment submission correctly
 *   - should disable submit button when comment is empty
 *   - should disable submit button when comment is being posted
 *   - should show loading text when comment is being posted
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CommentInput from './CommentInput';
import { requestState } from '@/utils/requestState';

// Mock Redux store with proper initial state structure
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      comment: (state = { requestState: requestState.idle }) => ({
        ...state,
        ...initialState
      })
    },
    preloadedState: {
      comment: {
        requestState: requestState.idle,
        ...initialState
      }
    }
  });
};

// Updated wrapper function for rendering with Redux
const renderWithRedux = (ui, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>
    ),
    store
  };
};

describe('CommentInput Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render without crashing', () => {
    //arrange
    renderWithRedux(<CommentInput onSubmit={() => { }} />);
    //assert
    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
    expect(screen.getByText('Post Comment')).toBeInTheDocument();
  });

  test('should handle comment typing correctly', async () => {
    //arrange
    renderWithRedux(<CommentInput onSubmit={() => { }} />);
    const input = screen.getByPlaceholderText('Write a comment...');
    //act
    await userEvent.type(input, 'Test comment');
    //assert
    expect(input).toHaveValue('Test comment');
  });

  test('should handle comment submission correctly', async () => {
    //arrange
    const handleSubmit = vi.fn();
    renderWithRedux(<CommentInput onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Write a comment...');
    const button = screen.getByText('Post Comment');

    //act
    await userEvent.type(input, 'Test comment');
    await userEvent.click(button);

    //assert
    expect(handleSubmit).toHaveBeenCalledWith('Test comment');
    expect(input).toHaveValue('');
  });

  test('should disable submit button when comment is empty', () => {
    //arrange
    renderWithRedux(<CommentInput onSubmit={() => { }} />);
    const button = screen.getByText('Post Comment');

    //assert
    expect(button).toBeDisabled();
  });

  test('should disable submit button and show loading text when comment is being posted', () => {
    //arrange
    renderWithRedux(<CommentInput onSubmit={() => { }} />, {
      requestState: requestState.loading
    });

    const input = screen.getByPlaceholderText('Write a comment...');
    const button = screen.getByRole('button');

    //assert
    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
    expect(button).toHaveTextContent('Posting...');
  });

  test('should show loading text when comment is being posted', () => {
    //arrange
    renderWithRedux(<CommentInput onSubmit={() => { }} />, {
      requestState: requestState.loading
    });

    //assert
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Posting...');
  });
});