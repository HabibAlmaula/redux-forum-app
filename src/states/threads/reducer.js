import { requestState } from "@/utils/requestState";
import { ActionType } from "./action";

const initialState = {
  threads: [],
  requestState: requestState.initial,
  postRequestState: requestState.initial,
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
    case ActionType.POST_VOTE_REQUEST:
      console.log(`threads_before => ${JSON.stringify(threads.threads)}`);
      let tt = {
        ...threads,
        threads: threads.threads.map(thread => {
          let newThread;
          if (thread.id === action.payload.id) {
            if (action.payload.voteType === "up") {
              newThread = {
                ...thread,
                upVotesBy: [...thread.upVotesBy, action.payload.authUser],
                downVotesBy: thread.downVotesBy.filter(id => id !== action.payload.authUser)
              };
            } else if (action.payload.voteType === "down") {
              newThread = {
                ...thread,
                upVotesBy: thread.upVotesBy.filter(id => id !== action.payload.authUser),
                downVotesBy: [...thread.downVotesBy, action.payload.authUser]
              };

            } else {
              newThread = {
                ...thread,
                upVotesBy: thread.upVotesBy.filter(id => id !== action.payload.authUser),
                downVotesBy: thread.downVotesBy.filter(id => id !== action.payload.authUser)
              };
            }
            console.log(`newThread => ${JSON.stringify(newThread)}`);

            return newThread;
          } else {
            return thread;
          }
        })
      };
      console.log(`thread_after => ${JSON.stringify(tt.threads)}`);
      return tt;
    case ActionType.POST_VOTE_SUCCESS:
      return {
        ...threads,
        threads: threads.threads.map(thread => {
          if (thread.id === action.payload.thread.id) {
            return action.payload.thread;
          }
          return thread;
        })
      };

    case ActionType.POST_VOTE_FAILURE:
      return {
        ...threads,
        threads: threads.threads.map(thread => {
          if (thread.id === action.payload.id) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.filter(id => id !== action.payload.authUser),
              downVotesBy: thread.downVotesBy.filter(id => id !== action.payload.authUser)
            };
          } else {
            return thread;
          }
        })
      }

    case ActionType.POST_THREAD_REQUEST:
      return {
        ...threads,
        postRequestState: requestState.loading,
        error: null
      };

    case ActionType.POST_THREAD_SUCCESS:
      const newThread = {
        ...threads,
        postRequestState: requestState.success,
        threads: [action.payload.thread, ...threads.threads],
        error: null
      };
      console.log(`newThread => ${JSON.stringify(newThread)}`);
      return newThread;

    case ActionType.POST_THREAD_FAILURE:
      return {
        ...threads,
        postRequestState: requestState.failure,
        error: action.payload.error
      };

    default:
      return threads;

  }
};
