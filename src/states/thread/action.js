import api from "@/utils/api";

export const ActionType = {
  FETCH_THREAD_DETAIL_REQUEST: "FETCH_THREAD_DETAIL_REQUEST",
  FETCH_THREAD_DETAIL_REQUEST_NO_LOADING:
    "FETCH_THREAD_DETAIL_REQUEST_NO_LOADING",
  FETCH_THREAD_DETAIL_SUCCESS: "FETCH_THREAD_DETAIL_SUCCESS",
  FETCH_THREAD_DETAIL_FAILURE: "FETCH_THREAD_DETAIL_FAILURE",
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
