export const ActionType = {
  SET_DARK_MODE: "SET_DARK_MODE",
};

export const setDarkThemeActionCreator = (theme) => {
  return {
    type: ActionType.SET_DARK_MODE,
    payload: {
      theme,
    },
  };
}

export const asyncSetDarkTheme = (theme) => {
  if(!theme) {
    theme = getInitialTheme();
  }
  return async (dispatch) => {
    rawSetTheme(theme);
    dispatch(setDarkThemeActionCreator(theme));
  };
}

export const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

export const rawSetTheme = (rawTheme) => {
  const root = window.document.documentElement;
  const isDark = rawTheme === "dark";

  // Remove previous theme class
  root.classList.remove(isDark ? "light" : "dark");
  // Add new theme class
  root.classList.add(rawTheme);

  // Update data attribute for extra specificity
  root.setAttribute("data-theme", rawTheme);

  localStorage.setItem("color-theme", rawTheme);
};
