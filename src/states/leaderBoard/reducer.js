import { requestState } from '@/utils/requestState';
import { ActionType } from './action';

const initialState = {
  requestState: requestState.initial,
  leaderBoards: [],
  error: null,
};


export const leaderBoardReducer = (leaderBoards = initialState, action) => {
  switch (action.type) {
  case ActionType.FETCH_LEADERBOARD_REQUEST:
    return {
      ...leaderBoards,
      requestState: requestState.loading,
      error: null,
    };
  case ActionType.FETCH_LEADERBOARD_SUCCESS:
    return {
      ...leaderBoards,
      requestState: requestState.success,
      leaderBoards: action.payload.leaderBoards,
      error: null,
    };
  case ActionType.FETCH_LEADERBOARD_FAILURE:
    return {
      ...leaderBoards,
      requestState: requestState.failure,
      leaderBoards: [],
      error: action.payload.error,
    };
  default:
    return leaderBoards;
  }
};