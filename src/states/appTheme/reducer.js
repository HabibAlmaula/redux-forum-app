import { ActionType, rawSetTheme } from "./action";
export const appThemeReducer = (theme = "light", action) => {
  switch (action.type) {
    case ActionType.SET_DARK_MODE:
      const usedTheme = action.payload.theme === "dark" ? "light" : "dark";
      rawSetTheme(usedTheme);
      return usedTheme;
    default:
      return theme;
  }
};
