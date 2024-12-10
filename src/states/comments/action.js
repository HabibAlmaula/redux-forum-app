import api from "@/utils/api";
import { toast } from "react-toastify";
import { asyncFetchThreadDetail } from "../thread/action";

export const ActionType = {
    POST_COMMENT_REQUEST: "POST_COMMENT_REQUEST",
    POST_COMMENT_SUCCESS: "POST_COMMENT_SUCCESS",
    POST_COMMENT_FAILURE: "POST_COMMENT_FAILURE",
    // POST_VOTE_COMMENT_REQUEST: "POST_VOTE_COMMENT_REQUEST",
    // POST_VOTE_COMMENT_SUCCESS: "POST_VOTE_COMMENT_SUCCESS",
    // POST_VOTE_COMMENT_FAILURE: "POST_VOTE_COMMENT_FAILURE",
}

export const postCommentRequestActionCreator = () => ({
    type: ActionType.POST_COMMENT_REQUEST,
});

export const postCommentSuccessActionCreator = (comment) => ({
    type: ActionType.POST_COMMENT_SUCCESS,
    payload: { comment },
});

export const postCommentFailureActionCreator = (error) => ({
    type: ActionType.POST_COMMENT_FAILURE,
    payload: { error },
});

// export const postVoteCommentRequestActionCreator = (id, voteType, authUser) => ({
//     type: ActionType.POST_VOTE_COMMENT_REQUEST,
//     payload: { id, voteType, authUser },
// });

// export const postVoteCommentSuccessActionCreator = (comment) => ({
//     type: ActionType.POST_VOTE_COMMENT_SUCCESS,
//     payload: { comment },
// });

// export const postVoteCommentFailureActionCreator = (error) => ({
//     type: ActionType.POST_VOTE_COMMENT_FAILURE,
//     payload: { error },
// });


export const asyncPostComment = (threadId, comment) => {
    return async (dispatch) => {
        dispatch(postCommentRequestActionCreator());
        try {
            const response = await api.createComment(threadId, comment);
            const data = response.data;
            dispatch(postCommentSuccessActionCreator(data));
            toast.success("Comment posted successfully");
        } catch (error) {
            dispatch(postCommentFailureActionCreator(error));
            toast.error(`Failed to post comment, ${error.message}`);
        } finally {
            dispatch(asyncFetchThreadDetail(threadId, false));
        }
    };
};


// export const asyncVoteComment = (threadId, commentId, voteType, authUser) => {
//     return async (dispatch) => {
//         dispatch(postVoteCommentRequestActionCreator(threadId, commentId, voteType, authUser));
//         try {
//             if (voteType === "up") {
//                 await api.upVoteComment(threadId, commentId);
//             } else if (voteType === "down") {
//                 await api.downVoteComment(threadId, commentId);
//             } else {
//                 await api.neutralizedVoteComment(threadId, commentId);
//             }
//             dispatch(postVoteCommentSuccessActionCreator());
//         } catch (error) {
//             dispatch(postVoteCommentFailureActionCreator(error));
//             toast.error(`Failed to vote comment, ${error.message}`);
//         }
//     };
// }