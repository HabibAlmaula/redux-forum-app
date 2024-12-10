import { requestState } from '@/utils/requestState';
import { ActionType } from './action';


const initialState = {
  authUser: null,
  requestState: requestState.initial,
  error: null
};

const authUserReducer = (authUser = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.SET_USER_LOGIN:
    return {
      ...authUser,
      authUser: action.payload.authUser
    };
  case ActionType.POST_LOGIN_REQUEST:
    return {
      ...authUser,
      requestState: requestState.loading,
      error: null
    };
  case ActionType.POST_LOGIN_SUCCESS:
    return {
      ...authUser,
      requestState: requestState.success,
      authUser: action.payload.authUser,
      error: null
    };

  case ActionType.POST_LOGIN_FAILURE:
    return {
      ...authUser,
      requestState: requestState.failure,
      authUser: null,
      error: action.payload.error
    };

  case ActionType.LOGOUT_REQUEST:
    return {
      ...authUser,
      requestState: requestState.loading,
      error: null
    };

  case ActionType.LOGOUT_REQUEST_SUCCESS:
    return {
      ...authUser,
      requestState: requestState.success,
      authUser: null,
      error: null
    };

  case ActionType.REGISTER_USER_REQUEST:
    return {
      ...authUser,
      authUser: null,
      requestState: requestState.loading,
      error: null
    };

  case ActionType.REGISTER_USER_SUCCESS:
    return {
      ...authUser,
      requestState: requestState.success,
      authUser: null,
      error: null
    };

  case ActionType.REGISTER_USER_FAILURE:
    return {
      ...authUser,
      requestState: requestState.failure,
      authUser: null,
      error: action.payload.error
    };

  default:
    return authUser;
  }
};

export default authUserReducer;
