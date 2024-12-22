import api from '@/utils/api';
import { toast } from 'react-toastify';

export const ActionType = {
  FETCH_THREADS_REQUEST: 'FETCH_THREADS_REQUEST',
  FETCH_THREADS_SUCCESS: 'FETCH_THREADS_SUCCESS',
  FETCH_THREADS_FAILURE: 'FETCH_THREADS_FAILURE',
  ADD_THREAD: 'ADD_THREAD',
  POST_VOTE_REQUEST: 'POST_VOTE_REQUEST',
  POST_VOTE_SUCCESS: 'POST_VOTE_SUCCESS',
  POST_VOTE_FAILURE: 'POST_VOTE_FAILURE',
  POST_THREAD_REQUEST: 'POST_THREAD_REQUEST',
  POST_THREAD_SUCCESS: 'POST_THREAD_SUCCESS',
  POST_THREAD_FAILURE: 'POST_THREAD_FAILURE',
  SEARCH_THREADS: 'SEARCH_THREADS',
  FILTER_CATEGORY_THREAD: 'FILTER_CATEGORY_THREAD',
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
};

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
};

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

const postThreadRequestActionCreator = () => {
  return {
    type: ActionType.POST_THREAD_REQUEST,
  };
};

const postThreadSuccessActionCreator = (thread) => {
  return {
    type: ActionType.POST_THREAD_SUCCESS,
    payload: {
      thread,
    },
  };
};

const postThreadFailureActionCreator = (error) => {
  return {
    type: ActionType.POST_THREAD_FAILURE,
    payload: {
      error,
    },
  };
};

const searchThreadsActionCreator = (query) => {
  return {
    type: ActionType.SEARCH_THREADS,
    payload: {
      query,
    },
  };
};

const filterCategoryThreadActionCreator = (category) => {
  return {
    type: ActionType.FILTER_CATEGORY_THREAD,
    payload: {
      category,
    },
  };
};


export const asyncVoteThreads = (id, voteType, authUser) => {
  console.log('asyncVoteThreads', id, voteType, authUser);
  return async (dispatch) => {
    dispatch(postVoteRequestActionCreator(id, voteType, authUser));
    try {
      if (voteType === 'up') {
        await api.upVoteThread(id);
      } else if (voteType === 'down') {
        await api.downVoteThread(id);
      } else {
        await api.neutralizedVoteThread(id);
      }
      dispatch(postVoteSuccessActionCreator());
    } catch (error) {
      dispatch(postVoteFailureActionCreator(id, error.message));
    }
  };
};



export const asyncPostThread = (title, body, category) => {
  return async (dispatch) => {
    dispatch(postThreadRequestActionCreator());
    try {
      const thread = await api.postThread(title, body, category);
      dispatch(postThreadSuccessActionCreator(thread));
      toast.success('Thread created successfully');
    } catch (error) {
      dispatch(postThreadFailureActionCreator(error.message));
      toast.error('Failed to create thread');
    }
  };
};


export const searchThreads = (query) => {
  return async (dispatch) => {
    dispatch(searchThreadsActionCreator(query));
  };
};

export const filterCategoryThread = (category) => {
  return async (dispatch) => {
    dispatch(filterCategoryThreadActionCreator(category));
  };
};