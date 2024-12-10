import { requestState } from '@/utils/requestState';
import { ActionType } from './action';

const initialState = {
  users: [],
  requestState: requestState.initial,
  error: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionType.FETCH_USER_REQUEST:
    return {
      ...state,
      requestState: requestState.loading,
      error: null
    };
  case ActionType.FETCH_USER_SUCCESS:
    return {
      ...state,
      requestState: requestState.success,
      users: action.payload.users,
      error: null
    };
  case ActionType.FETCH_USER_FAILURE:
    return {
      ...state,
      requestState: requestState.failure,
      users: [],
      error: action.payload.error
    };
  default:
    return state;
  }
};