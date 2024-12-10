import { configureStore } from "@reduxjs/toolkit";
import { appThemeReducer } from "./appTheme/reducer";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import { threadsReducer } from "./threads/reducer";
import { usersReducer } from "./users/reducer";
import threadReducer from "./thread/reducer";
import { commentsReducer } from "./comments/reducer";

export const store = configureStore({
  reducer: {
    appTheme: appThemeReducer,
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    thread: threadReducer,
    users: usersReducer,
    comment: commentsReducer
  },
});
