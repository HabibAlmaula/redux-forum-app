import api from "@/utils/api";
import { 
  fetchUserFailureActionCreator, 
  fetchUserRequestActionCreator, 
  fetchUserSuccessActionCreator 
} from "../users/action";
import { 
  fetchThreadsFailureActionCreator, 
  fetchThreadsRequestActionCreator, 
  fetchThreadsSuccessActionCreator 
} from "../threads/action";

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  // Set loading states
  dispatch(fetchUserRequestActionCreator());
  dispatch(fetchThreadsRequestActionCreator());

  try {
    // Fetch data concurrently using Promise.all
    const [users, threads] = await Promise.all([
      api.getUsers(),
      api.getThreads()
    ]);

    // Batch dispatch success actions
    Promise.resolve().then(() => {
      dispatch(fetchUserSuccessActionCreator(users));
      dispatch(fetchThreadsSuccessActionCreator(threads));
    });
  } catch (error) {
    // Handle errors
    const errorMessage = error.message;
    Promise.resolve().then(() => {
      dispatch(fetchUserFailureActionCreator(errorMessage));
      dispatch(fetchThreadsFailureActionCreator(errorMessage));
    });
  }
};