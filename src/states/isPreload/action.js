import api from '../../utils/api';
import { asyncLogoutUser, asyncSetUserLogin } from '../authUser/action';
import { asyncSetDarkTheme } from '../appTheme/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      // preload process
      dispatch(setIsPreloadActionCreator(true));
      dispatch(asyncSetDarkTheme());
      const authUser = await api.getOwnProfile();
      dispatch(asyncSetUserLogin(authUser));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        dispatch(asyncLogoutUser());
      }
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
