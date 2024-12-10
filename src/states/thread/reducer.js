import { requestState } from "@/utils/requestState";
import { ActionType } from "./action";

const initialState = {
  thread: null,
  requestState: requestState.initial,
  voteRequestState: requestState.initial,
  error: null,
};

const threadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_THREAD_DETAIL_REQUEST:
      return {
        ...state,
        requestState: requestState.loading,
        error: null,
      };
    case ActionType.FETCH_THREAD_DETAIL_REQUEST_NO_LOADING:
      return {
        ...state,
        requestState: requestState.success,
        error: null,
      };
    case ActionType.FETCH_THREAD_DETAIL_SUCCESS:
      return {
        ...state,
        requestState: requestState.success,
        thread: action.payload.thread,
        error: null,
      };
    case ActionType.FETCH_THREAD_DETAIL_FAILURE:
      return {
        ...state,
        requestState: requestState.failure,
        thread: null,
        error: action.payload.error,
      };
    case ActionType.POST_VOTE_THREAD_REQUEST: {
      let newThread;
      if (action.payload.voteType === "up") {
        newThread = {
          ...state.thread,
          upVotesBy: [...state.thread.upVotesBy, action.payload.authUser],
          downVotesBy: state.thread.downVotesBy.filter(id => id !== action.payload.authUser)
        };
      } else if (action.payload.voteType === "down") {
        newThread = {
          ...state.thread,
          upVotesBy: state.thread.upVotesBy.filter(id => id !== action.payload.authUser),
          downVotesBy: [...state.thread.downVotesBy, action.payload.authUser]
        };
      } else {
        // neutral case
        newThread = {
          ...state.thread,
          upVotesBy: state.thread.upVotesBy.filter(id => id !== action.payload.authUser),
          downVotesBy: state.thread.downVotesBy.filter(id => id !== action.payload.authUser)
        };
      }

      return {
        ...state,
        thread: newThread,
        voteRequestState: requestState.loading,
        error: null,
      };
    }
    case ActionType.POST_VOTE_THREAD_SUCCESS:
      return {
        ...state,
        voteRequestState: requestState.success,
        error: null,
      };
    case ActionType.POST_VOTE_THREAD_FAILURE: {
      const oldThread = {
        ...state.thread,
        upvotesBy: state.thread.upvotesBy.filter((id) => id !== action.payload.authUser),
        downvotesBy: state.thread.downvotesBy.filter((id) => id !== action.payload.authUser),
      }
      return {
        ...state,
        thread: oldThread,
        voteRequestState: requestState.failure,
        error: action.payload.error,
      };
    }
    case ActionType.POST_VOTE_COMMENT_REQUEST: {
      const newComments = state.thread.comments.map(comment => {
        let newComment;
        if (comment.id === action.payload.commentId) {
          if (action.payload.voteType === "up") {
            newComment = {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.authUser],
              downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser)
            };
          } else if (action.payload.voteType === "down") {
            newComment = {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
              downVotesBy: [...comment.downVotesBy, action.payload.authUser]
            };
          } else {
            newComment = {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
              downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser)
            };
          }
          return newComment;
        } else {
          return comment;
        }
      });
      console.log(`newComments => ${JSON.stringify(newComments)}`);
      return {
        ...state,
        thread: {
          ...state.thread,
          comments: newComments,
        },
        voteRequestState: requestState.loading,
        error: null,
      };
    }

    case ActionType.POST_VOTE_COMMENT_SUCCESS:
      return {
        ...state,
        voteRequestState: requestState.success,
        error: null,
      };

    case ActionType.POST_VOTE_COMMENT_FAILURE: {
      const oldComments = state.thread.comments.map(comment => {
        let newComment;
        if (comment.id === action.payload.id) {
          newComment = {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
            downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser),
          };
          return newComment;
        } else {
          return comment;
        }
      });
      return {
        ...state,
        thread: {
          ...state.thread,
          comments: oldComments,
        },
        voteRequestState: requestState.failure,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default threadReducer;
