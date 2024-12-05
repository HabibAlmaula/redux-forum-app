import { requestState } from "@/utils/requestState";
import { ActionType } from "./action";

const initialState = {
  threads: [],
  requestState: requestState.initial,
  error: null
};


export const threadsReducer = (threads = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_THREADS_REQUEST:
      return {
        ...threads,
        requestState: requestState.loading,
        error: null
      };
    case ActionType.FETCH_THREADS_SUCCESS:
      return {
        ...threads,
        requestState: requestState.success,
        threads: action.payload.threads,
        error: null
      };
    case ActionType.FETCH_THREADS_FAILURE:
      return {
        ...threads,
        requestState: requestState.failure,
        threads: [],
        error: action.payload.error
      };
    case ActionType.ADD_THREAD:
      return {
        ...threads,
        threads: threads.threads.concat(action.payload.thread)
      };
    case ActionType.THUMB_UP:
      return {
        ...threads,
        threads: threads.threads.map(thread => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              thumbs: thread.thumbs + 1
            };
          }
          return thread;
        })
      };
    case ActionType.THUMB_DOWN:
      return {
        ...threads,
        threads: threads.threads.map(thread => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              thumbs: thread.thumbs - 1
            };
          }
          return thread;
        })
      };
    default:
      return threads;

  }
};
