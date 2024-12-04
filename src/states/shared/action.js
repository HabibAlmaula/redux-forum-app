import api from "@/utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await api.getUsers();
    dispatch(receiveUsersActionCreator(users));
    const threads = await api.getThreads();
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};
