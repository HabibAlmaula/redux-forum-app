import { ActionType } from "./action";

export const threadsReducer = (threads = [], action) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    default:
      return threads;
  }
};
