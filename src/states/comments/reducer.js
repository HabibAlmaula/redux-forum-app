import { requestState } from "@/utils/requestState";
import { ActionType } from "./action";

const initialState = {
    comments: [],
    requestState: requestState.initial,
    voteLoadingState: requestState.initial,
    error: null
};


export const commentsReducer = (comments = initialState, action = {}) => {
    switch (action.type) {
        case ActionType.POST_COMMENT_REQUEST:
            return {
                ...comments,
                requestState: requestState.loading,
                error: null
            };

        case ActionType.POST_COMMENT_SUCCESS:
            return {
                ...comments,
                requestState: requestState.success,
                comments: [...comments.comments, action.payload.comment],
                error: null
            };

        case ActionType.POST_COMMENT_FAILURE:
            return {
                ...comments,
                requestState: requestState.failure,
                comments: [],
                error: action.payload.error
            };

        // case ActionType.POST_VOTE_COMMENT_REQUEST:
        //     console.log(`comments_before => ${JSON.stringify(comments)}`);
        //     return {
        //         ...comments,
        //         comments: comments.comments.map(comment => {
        //             let newComment;
        //             if (comment.id === action.payload.id) {
        //                 if (action.payload.voteType === "up") {
        //                     newComment = {
        //                         ...comment,
        //                         upVotesBy: [...comment.upVotesBy, action.payload.authUser],
        //                         voteLoadingState: requestState.loading,
        //                         downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser)
        //                     };
        //                 } else if (action.payload.voteType === "down") {
        //                     newComment = {
        //                         ...comment,
        //                         upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
        //                         voteLoadingState: requestState.loading,
        //                         downVotesBy: [...comment.downVotesBy, action.payload.authUser]
        //                     };
        //                 } else {
        //                     newComment = {
        //                         ...comment,
        //                         upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
        //                         voteLoadingState: requestState.loading,
        //                         downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser)
        //                     };
        //                 }
        //                 console.log(`newComment => ${JSON.stringify(newComment)}`);
        //                 return newComment;
        //             } else {
        //                 return comment;
        //             }
        //         }),
        //         error: null
        //     };

        // case ActionType.POST_VOTE_COMMENT_SUCCESS:
        //     return {
        //         ...comments,
        //         voteLoadingState: requestState.success,
        //         error: null
        //     };

        // case ActionType.POST_VOTE_COMMENT_FAILURE:
        //     return {
        //         ...comments,
        //         comments: comments.comments.map(comment => {
        //             if (comment.id === action.payload.id) {
        //                 return {
        //                     ...comment,
        //                     voteLoadingState: requestState.failure,
        //                     upVotesBy: comment.upVotesBy.filter(id => id !== action.payload.authUser),
        //                     downVotesBy: comment.downVotesBy.filter(id => id !== action.payload.authUser)
        //                 };
        //             } else {
        //                 return {
        //                     ...comment,
        //                     voteLoadingState: requestState.failure
        //                 };
        //             }
        //         }),
        //         requestState: requestState.failure,
        //         error: action.payload.error
        //     };


        default:
            return comments;
    }
}