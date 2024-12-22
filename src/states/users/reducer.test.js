import { describe, it, expect } from 'vitest';
import { usersReducer } from './reducer';
/**
* test scenario for usersReducers
*
* - usersReducer function
*  - should return the initial state when given by unknown action
*  - should return the users with the loading state when given by FETCH_USER_REQUEST action
*  - should return the users with the success state when given by FETCH_USER_SUCCESS action
*  - should return the users with the failure state when given by FETCH_USER_FAILURE action
*
*/


describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = {
      users: [],
      requestState: 'initial',
      error: null
    };

    // Act
    const result = usersReducer(initialState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should return the users with the loading state when given by FETCH_USER_REQUEST action', () => {
    // Arrange
    const initialState = {
      users: [],
      requestState: 'initial',
      error: null
    };

    // Act
    const result = usersReducer(initialState, { type: 'FETCH_USER_REQUEST' });

    // Assert
    expect(result).toEqual({
      users: [],
      requestState: 'loading',
      error: null
    });
  });

  it('should return the users with the success state when given by FETCH_USER_SUCCESS action', () => {
    // Arrange
    const initialState = {
      users: [],
      requestState: 'initial',
      error: null
    };

    // Act
    const result = usersReducer(initialState, { type: 'FETCH_USER_SUCCESS', payload: { users: ['user1', 'user2'] } });

    // Assert
    expect(result).toEqual({
      users: ['user1', 'user2'],
      requestState: 'success',
      error: null
    });
  });

  it('should return the users with the failure state when given by FETCH_USER_FAILURE action', () => {
    // Arrange
    const initialState = {
      users: [],
      requestState: 'initial',
      error: null
    };

    // Act
    const result = usersReducer(initialState, { type: 'FETCH_USER_FAILURE', payload: { error: 'error' } });

    // Assert
    expect(result).toEqual({
      users: [],
      requestState: 'failure',
      error: 'error'
    });
  });
});