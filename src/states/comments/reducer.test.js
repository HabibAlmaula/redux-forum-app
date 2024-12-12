import { describe, it, expect } from 'vitest';
import { commentsReducer } from './reducer';
/**
* test scenario for commentsReducers
*
* - talkReducers function
*  - should return the initial state when given by unknown action
*  - should return the comments with the loading state when given by POST_COMMENT_REQUEST action
*  - should return the comments with the success state when given by POST_COMMENT_SUCCESS action
*  - should return the comments with the failure state when given by POST_COMMENT_FAILURE action
*
*/



describe('commentsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = {
      comments: [],
      requestState: 'initial',
      voteLoadingState: 'initial',
      error: null
    };

    // Act
    const result = commentsReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should return the comments with the loading state when given by POST_COMMENT_REQUEST action', () => {
    // Arrange
    const initialState = {
      comments: [],
      requestState: 'initial',
      voteLoadingState: 'initial',
      error: null
    };

    // Act
    const result = commentsReducer(initialState, { type: 'POST_COMMENT_REQUEST' });

    // Assert
    expect(result).toEqual({
      comments: [],
      requestState: 'loading',
      voteLoadingState: 'initial',
      error: null
    });
  });

  it('should return the comments with the success state when given by POST_COMMENT_SUCCESS action', () => {
    // Arrange
    const initialState = {
      comments: [],
      requestState: 'initial',
      voteLoadingState: 'initial',
      error: null
    };

    // Act
    const result = commentsReducer(initialState, { type: 'POST_COMMENT_SUCCESS', payload: { comment: 'comment' } });

    // Assert
    expect(result).toEqual({
      comments: ['comment'],
      requestState: 'success',
      voteLoadingState: 'initial',
      error: null
    });
  });

  it('should return the comments with the failure state when given by POST_COMMENT_FAILURE action', () => {
    // Arrange
    const initialState = {
      comments: [],
      requestState: 'initial',
      voteLoadingState: 'initial',
      error: null
    };

    // Act
    const result = commentsReducer(initialState, { type: 'POST_COMMENT_FAILURE', payload: { error: 'error' } });

    // Assert
    expect(result).toEqual({
      comments: [],
      requestState: 'failure',
      voteLoadingState: 'initial',
      error: 'error'
    });
  });
});