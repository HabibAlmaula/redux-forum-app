import { toast } from "react-toastify";
import api from "../../utils/api";


export const ActionType = {
  SET_USER_LOGIN: "SET_USER_LOGIN",
  POST_LOGIN_REQUEST: "POST_LOGIN_REQUEST",
  POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
  POST_LOGIN_FAILURE: "POST_LOGIN_FAILURE",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_REQUEST_SUCCESS: "LOGOUT_REQUEST_SUCCESS",
  REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAILURE: "REGISTER_USER_FAILURE",
};

export const setUserLoginActionCreator = (authUser) => {
  return {
    type: ActionType.SET_USER_LOGIN,
    payload: {
      authUser,
    },
  };
};

export const postLoginActionCreator = () => {
  return {
    type: ActionType.POST_LOGIN_REQUEST,
  };
}

export const postLoginSuccessActionCreator = (authUser) => {
  return {
    type: ActionType.POST_LOGIN_SUCCESS,
    payload: {
      authUser,
    },
  }
}

export const postLoginFailureActionCreator = (error) => {
  return {
    type: ActionType.POST_LOGIN_FAILURE,
    payload: {
      error,
    },
  }
}

export const logoutActionCreator = () => {
  return {
    type: ActionType.LOGOUT_REQUEST,
  };
};

export const logoutSuccessActionCreator = () => {
  return {
    type: ActionType.LOGOUT_REQUEST_SUCCESS,
  };
};


export const registerUserRequestActionCreator = () => ({
  type: ActionType.REGISTER_USER_REQUEST,
});

export const registerUserSuccessActionCreator = (user) => ({
  type: ActionType.REGISTER_USER_SUCCESS,
  payload: { user },
});

export const registerUserFailureActionCreator = (error) => ({
  type: ActionType.REGISTER_USER_FAILURE,
  payload: { error },
});


export const asyncSetUserLogin = (authUser) => {
  return async (dispatch) => {
    dispatch(setUserLoginActionCreator(authUser));
  };
}

export const asyncLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(postLoginActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(postLoginSuccessActionCreator(authUser));
      toast.success("You have successfully logged in");
    } catch (error) {
      dispatch(postLoginFailureActionCreator(error.message));
      toast.error(error.message);
    }
  };
};

export const asyncUserRegister = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(registerUserRequestActionCreator());
    try {
      await api.register({ name, email, password });
      dispatch(registerUserSuccessActionCreator({ name, email }));
      toast.success("You have successfully registered");
    } catch (error) {
      dispatch(registerUserFailureActionCreator(error.message));
      toast.error(error.message);
    }
  };
};


export const asyncLogoutUser = () => {
  return (dispatch) => {
    dispatch(logoutActionCreator());
    api.putAccessToken("");
    //add delay for better user experience
    setTimeout(() => {
      dispatch(logoutSuccessActionCreator());
    }, 500);
  };
};
