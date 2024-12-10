export const ActionType = {
  FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',

};

export const fetchUserRequestActionCreator = () => ({
  type: ActionType.FETCH_USER_REQUEST,
});

export const fetchUserSuccessActionCreator = (users) => ({
  type: ActionType.FETCH_USER_SUCCESS,
  payload: { users },
});

export const fetchUserFailureActionCreator = (error) => ({
  type: ActionType.FETCH_USER_FAILURE,
  payload: { error },
});