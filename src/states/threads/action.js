import api from "@/utils/api";

export const ActionType = {
  FETCH_THREADS_REQUEST: "FETCH_THREADS_REQUEST",
  FETCH_THREADS_SUCCESS: "FETCH_THREADS_SUCCESS",
  FETCH_THREADS_FAILURE: "FETCH_THREADS_FAILURE",
  ADD_THREAD: "ADD_THREAD",
  THUMB_UP: "THUMB_UP_THREAD",
  THUMB_DOWN: "THUMB_DOWN_THREAD",
};

export const fetchThreadsRequestActionCreator = () => {
  return {
    type: ActionType.FETCH_THREADS_REQUEST,
  };
};

export const fetchThreadsSuccessActionCreator = (threads) => {
  return {
    type: ActionType.FETCH_THREADS_SUCCESS,
    payload: {
      threads,
    },
  };
}

export const fetchThreadsFailureActionCreator = (error) => {
  return {
    type: ActionType.FETCH_THREADS_FAILURE,
    payload: {
      error,
    },
  };
};

export const addThreadActionCreator = (thread) => {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

export const thumbUpActionCreator = (threadId) => {
  return {
    type: ActionType.THUMB_UP,
    payload: {
      threadId,
    },
  };
};

export const thumbDownActionCreator = (threadId) => {
  return {
    type: ActionType.THUMB_DOWN,
    payload: {
      threadId,
    },
  };
};
