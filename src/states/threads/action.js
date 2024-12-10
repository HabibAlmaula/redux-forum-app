import api from "@/utils/api";

export const ActionType = {
  FETCH_THREADS_REQUEST: "FETCH_THREADS_REQUEST",
  FETCH_THREADS_SUCCESS: "FETCH_THREADS_SUCCESS",
  FETCH_THREADS_FAILURE: "FETCH_THREADS_FAILURE",
  ADD_THREAD: "ADD_THREAD",
  POST_VOTE_REQUEST: "POST_VOTE_REQUEST",
  POST_VOTE_SUCCESS: "POST_VOTE_SUCCESS",
  POST_VOTE_FAILURE: "POST_VOTE_FAILURE",
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

const postVoteRequestActionCreator = (id, voteType, authUser) => {
  return {
    type: ActionType.POST_VOTE_REQUEST,
    payload: {
      id,
      voteType,
      authUser,
    },
  };
}

const postVoteSuccessActionCreator = (thread) => {
  return {
    type: ActionType.POST_VOTE_SUCCESS,
    payload: {
      thread,
    },
  };
};

const postVoteFailureActionCreator = (id, error) => {
  return {
    type: ActionType.POST_VOTE_FAILURE,
    payload: {
      id,
      error,
    },
  };
};


export const asyncVoteThreads = (id, voteType, authUser) => {
  console.log("asyncVoteThreads", id, voteType, authUser);
  return async (dispatch) => {
    dispatch(postVoteRequestActionCreator(id, voteType, authUser));
    try {
      if (voteType === "up") {
        await api.upVoteThread(id);
      } else if (voteType === "down") {
        await api.downVoteThread(id);
      } else {
        await api.neutralizedVoteThread(id);
      }
      dispatch(postVoteSuccessActionCreator(thread));
    } catch (error) {
      dispatch(postVoteFailureActionCreator(id, error.message));
    }
  };
}
