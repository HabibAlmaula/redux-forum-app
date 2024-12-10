import api from "@/utils/api";

export const ActionType = {
    FETCH_LEADERBOARD_REQUEST: "FETCH_LEADERBOARD_REQUEST",
    FETCH_LEADERBOARD_SUCCESS: "FETCH_LEADERBOARD_SUCCESS",
    FETCH_LEADERBOARD_FAILURE: "FETCH_LEADERBOARD_FAILURE",
}


const fetchLeaderBoardRequestActionCreator = () => {
    return {
        type: ActionType.FETCH_LEADERBOARD_REQUEST,
    };
};

const fetchLeaderBoardSuccessActionCreator = (leaderBoards) => {
    return {
        type: ActionType.FETCH_LEADERBOARD_SUCCESS,
        payload: {
            leaderBoards,
        },
    };
};

const fetchLeaderBoardFailureActionCreator = (error) => {
    return {
        type: ActionType.FETCH_LEADERBOARD_FAILURE,
        payload: {
            error,
        },
    };
};

export const asyncFetchLeaderBoard = () => {
    return async (dispatch) => {
        dispatch(fetchLeaderBoardRequestActionCreator());
        try {
            const leaderBoards = await api.getLeaderBoards();
            dispatch(fetchLeaderBoardSuccessActionCreator(leaderBoards));
        } catch (e) {
            dispatch(fetchLeaderBoardFailureActionCreator(e.message));
        }
    };
}


