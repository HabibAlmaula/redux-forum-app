import api from "@/utils/api";

export const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  THUMB_UP: "THUMB_UP_THREAD",
  THUMB_DOWN: "THUMB_DOWN_THREAD",
};

export const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
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

export const asyncGetThreads = () => {
  return async (dispatch) => {
    try {
      const threads = await api.getThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
};
