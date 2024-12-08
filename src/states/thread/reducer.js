import { requestState } from "@/utils/requestState"
import { ActionType } from "./action"

const initialState = {
    thread: null,
    requestState: requestState.initial,
    error: null
}

const threadReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_THREAD_DETAIL_REQUEST:
            return {
                ...state,
                requestState: requestState.loading,
                error: null
            }
        case ActionType.FETCH_THREAD_DETAIL_SUCCESS:
            return {
                ...state,
                requestState: requestState.success,
                thread: action.payload.thread,
                error: null
            }
        case ActionType.FETCH_THREAD_DETAIL_FAILURE:
            return {
                ...state,
                requestState: requestState.failure,
                thread: null,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default threadReducer