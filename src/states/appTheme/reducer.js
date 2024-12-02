import { ActionType } from "./action";
export const appThemeReducer = (theme = "light", action) => {
  switch (action.type) {
    case ActionType.SET_DARK_MODE:
      return action.payload.theme;
    default:
      return theme;
  }
};
