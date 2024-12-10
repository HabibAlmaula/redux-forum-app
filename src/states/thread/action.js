import api from "@/utils/api";

export const ActionType = {
  FETCH_THREAD_DETAIL_REQUEST: "FETCH_THREAD_DETAIL_REQUEST",
  FETCH_THREAD_DETAIL_REQUEST_NO_LOADING:
    "FETCH_THREAD_DETAIL_REQUEST_NO_LOADING",
  FETCH_THREAD_DETAIL_SUCCESS: "FETCH_THREAD_DETAIL_SUCCESS",
  FETCH_THREAD_DETAIL_FAILURE: "FETCH_THREAD_DETAIL_FAILURE",
  POST_VOTE_THREAD_REQUEST: "POST_VOTE_THREAD_REQUEST",
  POST_VOTE_THREAD_SUCCESS: "POST_VOTE_THREAD_SUCCESS",
  POST_VOTE_THREAD_FAILURE: "POST_VOTE_THREAD_FAILURE",
};

const fetchThreadDetailRequestActionCreator = (id) => {
  return {
    type: ActionType.FETCH_THREAD_DETAIL_REQUEST,
    payload: {
      id,
    },
  };
};

const fetchThreadDetailRequestNoLoadingActionCreator = (id) => {
  return {
    type: ActionType.FETCH_THREAD_DETAIL_REQUEST_NO_LOADING,
    payload: {
      id,
    },
  };
};

const fetchThreadDetailSuccessActionCreator = (thread) => {
  return {
    type: ActionType.FETCH_THREAD_DETAIL_SUCCESS,
    payload: {
      thread,
    },
  };
};

const fetchThreadDetailFailureActionCreator = (error) => {
  return {
    type: ActionType.FETCH_THREAD_DETAIL_FAILURE,
    payload: {
      error,
    },
  };
};

const postVoteRequestActionCreator = (id, voteType, authUser) => {
  return {
    type: ActionType.POST_VOTE_THREAD_REQUEST,
    payload: {
      id,
      voteType,
      authUser,
    },
  };
}

const postVoteSuccessActionCreator = (thread) => {
  return {
    type: ActionType.POST_VOTE_THREAD_SUCCESS,
    payload: {
      thread,
    },
  };
}

const postVoteFailureActionCreator = (error) => {
  return {
    type: ActionType.POST_VOTE_THREAD_FAILURE,
    payload: {
      error,
    },
  };
}

export const asyncFetchThreadDetail = (id, withLoading = true) => {
  return async (dispatch) => {
    if (withLoading) {
      dispatch(fetchThreadDetailRequestActionCreator(id));
    } else {
      dispatch(fetchThreadDetailRequestNoLoadingActionCreator(id));
    }
    try {
      const thread = await api.getThread(id);
      dispatch(fetchThreadDetailSuccessActionCreator(thread));
    } catch (error) {
      dispatch(fetchThreadDetailFailureActionCreator(error));
    }
  };
};

export const asyncVoteThread = (id, voteType, authUser) => {
  console.log("asyncVoteThread", id, voteType, authUser);
  return async (dispatch) => {
    dispatch(postVoteRequestActionCreator(id, voteType, authUser));
    try {
      let thread;
      if (voteType === "up") {
        thread = await api.upVoteThread(id);
      } else if (voteType === "down") {
        thread = await api.downVoteThread(id);
      } else {
        thread = await api.neutralizedVoteThread(id);
      }
      dispatch(postVoteSuccessActionCreator(thread));
    } catch (error) {
      dispatch(postVoteFailureActionCreator(error));
    }
  };
};
