import { requestState } from "@/utils/requestState";
import { ActionType } from "./action";

const initialState = {
    comments: [],
    requestState: requestState.initial,
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

        default:
            return comments;
    }
}