import api from "@/utils/api";
import { hideLoading } from "react-redux-loading-bar";
import { showLoading } from "react-redux-loading-bar";

export const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

export const receiveUsersActionCreator = (users) => ({
  type: ActionType.RECEIVE_USERS,
  payload: { users },
});

export const asyncUserRegister = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};
