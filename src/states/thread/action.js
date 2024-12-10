import api from '@/utils/api';
import { toast } from 'react-toastify';

export const ActionType = {
  FETCH_THREAD_DETAIL_REQUEST: 'FETCH_THREAD_DETAIL_REQUEST',
  FETCH_THREAD_DETAIL_REQUEST_NO_LOADING:
    'FETCH_THREAD_DETAIL_REQUEST_NO_LOADING',
  FETCH_THREAD_DETAIL_SUCCESS: 'FETCH_THREAD_DETAIL_SUCCESS',
  FETCH_THREAD_DETAIL_FAILURE: 'FETCH_THREAD_DETAIL_FAILURE',
  POST_VOTE_THREAD_REQUEST: 'POST_VOTE_THREAD_REQUEST',
  POST_VOTE_THREAD_SUCCESS: 'POST_VOTE_THREAD_SUCCESS',
  POST_VOTE_THREAD_FAILURE: 'POST_VOTE_THREAD_FAILURE',
  POST_VOTE_COMMENT_REQUEST: 'POST_VOTE_COMMENT_REQUEST',
  POST_VOTE_COMMENT_SUCCESS: 'POST_VOTE_COMMENT_SUCCESS',
  POST_VOTE_COMMENT_FAILURE: 'POST_VOTE_COMMENT_FAILURE',
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
};

const postVoteSuccessActionCreator = (thread) => {
  return {
    type: ActionType.POST_VOTE_THREAD_SUCCESS,
    payload: {
      thread,
    },
  };
};

const postVoteFailureActionCreator = (error) => {
  return {
    type: ActionType.POST_VOTE_THREAD_FAILURE,
    payload: {
      error,
    },
  };
};


export const postVoteCommentRequestActionCreator = (threadId, commentId, voteType, authUser) => ({
  type: ActionType.POST_VOTE_COMMENT_REQUEST,
  payload: { threadId, commentId, voteType, authUser },
});

export const postVoteCommentSuccessActionCreator = () => ({
  type: ActionType.POST_VOTE_COMMENT_SUCCESS,
});

export const postVoteCommentFailureActionCreator = (error) => ({
  type: ActionType.POST_VOTE_COMMENT_FAILURE,
  payload: { error },
});

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
  console.log('asyncVoteThread', id, voteType, authUser);
  return async (dispatch) => {
    dispatch(postVoteRequestActionCreator(id, voteType, authUser));
    try {
      let thread;
      if (voteType === 'up') {
        thread = await api.upVoteThread(id);
      } else if (voteType === 'down') {
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

export const asyncVoteComment = (threadId, commentId, voteType, authUser) => {
  return async (dispatch) => {
    dispatch(postVoteCommentRequestActionCreator(threadId, commentId, voteType, authUser));
    try {
      if (voteType === 'up') {
        await api.upVoteComment(threadId, commentId);
      } else if (voteType === 'down') {
        await api.downVoteComment(threadId, commentId);
      } else {
        await api.neutralizedVoteComment(threadId, commentId);
      }
      dispatch(postVoteCommentSuccessActionCreator());
    } catch (error) {
      dispatch(postVoteCommentFailureActionCreator(error));
      toast.error(`Failed to vote comment, ${error.message}`);
    }
  };
};
