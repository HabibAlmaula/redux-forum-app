// /**
//  * Scenario testing
//  * - CommentInput Component
//  *   - should render without crashing
//  *   - should handle comment typing correctly
//  *   - should handle comment submission correctly
//  *   - should disable submit button when comment is empty
//  *   - should disable submit button when comment is being posted
//  *   - should show loading text when comment is being posted
//  */

// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import { describe, it, expect, vi } from 'vitest';
// import  matchers  from '@testing-library/jest-dom/matchers';
// import CommentInput from './CommentInput';

// expect.extend(matchers);

// describe('CommentInput Component', () => {
//   it('should handle comment typing correctly', () => {
//     // Arrange
//     render(<CommentInput onSubmit={() => {}} />);
//     const input = screen.getByPlaceholderText('Write a comment...');

//     // Act
//     userEvent.type(input, 'Test comment');

//     // Assert
//     expect(input.value).toBe('Test comment');
//   });

//   it('should handle comment submission correctly', () => {
//     // Arrange
//     const handleSubmit = vi.fn();
//     render(<CommentInput onSubmit={handleSubmit} />);
//     const input = screen.getByPlaceholderText('Write a comment...');
//     const button = screen.getByText('Post Comment');

//     // Act
//     userEvent.type(input, 'Test comment');
//     userEvent.click(button);

//     // Assert
//     expect(handleSubmit).toHaveBeenCalledWith('Test comment');
//   });

//   it('should disable submit button when comment is empty', () => {
//     // Arrange
//     render(<CommentInput onSubmit={() => {}} />);
//     const button = screen.getByText('Post Comment');

//     // Act
//     // No action needed as input is empty

//     // Assert
//     expect(button).toBeDisabled();
//   });

//   it('should disable submit button when comment is being posted', () => {
//     // Arrange
//     const handleSubmit = vi.fn();
//     render(<CommentInput onSubmit={handleSubmit} />);
//     const input = screen.getByPlaceholderText('Write a comment...');
//     const button = screen.getByText('Post Comment');

//     // Act
//     userEvent.type(input, 'Test comment');
//     userEvent.click(button);

//     // Assert
//     expect(button).toBeDisabled();
//   });

//   it('should show loading text when comment is being posted', () => {
//     // Arrange
//     const handleSubmit = vi.fn();
//     render(<CommentInput onSubmit={handleSubmit} />);
//     const input = screen.getByPlaceholderText('Write a comment...');
//     const button = screen.getByText('Post Comment');

//     // Act
//     userEvent.type(input, 'Test comment');
//     userEvent.click(button);

//     // Assert
//     expect(button).toHaveTextContent('Posting...');
//   });
// });






// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { describe, test, expect, vi, beforeEach } from 'vitest';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import CommentInput from './CommentInput';
// import { requestState } from '@/utils/requestState';


// describe('CommentInput Component', () => {

//   // Mock Redux store
//   const createMockStore = (initialState = {}) => {
//     return configureStore({
//       reducer: {
//         comment: (state = initialState, action) => state
//       }
//     });
//   };

//   // Wrapper function for rendering with Redux
//   const renderWithRedux = (ui, initialState = { requestState: requestState.idle }) => {
//     const store = createMockStore({ comment: initialState });
//     return render(
//       <Provider store={store}>
//         {ui}
//       </Provider>
//     );
//   };
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   test('should render without crashing', () => {
//     renderWithRedux(<CommentInput onSubmit={() => {}} />);
//     expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
//     expect(screen.getByText('Post Comment')).toBeInTheDocument();
//   });

//   test('should handle comment typing correctly', async () => {
//     renderWithRedux(<CommentInput onSubmit={() => {}} />);
//     const input = screen.getByPlaceholderText('Write a comment...');

//     await userEvent.type(input, 'Test comment');

//     expect(input).toHaveValue('Test comment');
//   });

//   test('should handle comment submission correctly', async () => {
//     const handleSubmit = vi.fn();
//     renderWithRedux(<CommentInput onSubmit={handleSubmit} />);

//     const input = screen.getByPlaceholderText('Write a comment...');
//     const button = screen.getByText('Post Comment');

//     await userEvent.type(input, 'Test comment');
//     await userEvent.click(button);

//     expect(handleSubmit).toHaveBeenCalledWith('Test comment');
//     expect(input).toHaveValue('');
//   });

//   test('should disable submit button when comment is empty', () => {
//     renderWithRedux(<CommentInput onSubmit={() => {}} />);
//     const button = screen.getByText('Post Comment');

//     expect(button).toBeDisabled();
//   });

//   test('should disable submit button when comment is being posted', () => {
//     renderWithRedux(
//       <CommentInput onSubmit={() => {}} />,
//       { requestState: requestState.loading }
//     );

//     const input = screen.getByPlaceholderText('Write a comment...');
//     const button = screen.getByText('Posting...');

//     expect(button).toBeDisabled();
//     expect(input).toBeDisabled();
//   });

//   test('should show loading text when comment is being posted', () => {
//     renderWithRedux(
//       <CommentInput onSubmit={() => {}} />,
//       { requestState: requestState.loading }
//     );

//     expect(screen.getByText('Posting...')).toBeInTheDocument();
//   });
// });



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
      comment: (state = { requestState: requestState.idle }, action) => ({
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
    renderWithRedux(<CommentInput onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
    expect(screen.getByText('Post Comment')).toBeInTheDocument();
  });

  test('should handle comment typing correctly', async () => {
    renderWithRedux(<CommentInput onSubmit={() => {}} />);
    const input = screen.getByPlaceholderText('Write a comment...');

    await userEvent.type(input, 'Test comment');

    expect(input).toHaveValue('Test comment');
  });

  test('should handle comment submission correctly', async () => {
    const handleSubmit = vi.fn();
    renderWithRedux(<CommentInput onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText('Write a comment...');
    const button = screen.getByText('Post Comment');

    await userEvent.type(input, 'Test comment');
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith('Test comment');
    expect(input).toHaveValue('');
  });

  test('should disable submit button when comment is empty', () => {
    renderWithRedux(<CommentInput onSubmit={() => {}} />);
    const button = screen.getByText('Post Comment');

    expect(button).toBeDisabled();
  });

  test('should disable submit button and show loading text when comment is being posted', () => {
    renderWithRedux(<CommentInput onSubmit={() => {}} />, {
      requestState: requestState.loading
    });

    const input = screen.getByPlaceholderText('Write a comment...');
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
    expect(button).toHaveTextContent('Posting...');
  });

  test('should show loading text when comment is being posted', () => {
    renderWithRedux(<CommentInput onSubmit={() => {}} />, {
      requestState: requestState.loading
    });

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Posting...');
  });
});