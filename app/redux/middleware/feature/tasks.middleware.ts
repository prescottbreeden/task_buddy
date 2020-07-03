import { FETCH_TASKS, TASKS, setTasks } from "../../actions/tasks.actions";
import { apiRequest, API_SUCCESS, API_ERROR } from "../../actions/api.actions";
import { setLoader } from "../../actions/loader.actions";
import { setNotification } from "../../actions/notification.actions";
import { BaseAction } from "../../../types/BaseAction.type";

const TASKS_URL = "";

export const tasksMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  switch (action.type) {
    case FETCH_TASKS:
      next(
        apiRequest({
          body: null,
          method: "GET",
          url: TASKS_URL,
          feature: TASKS,
        })
      );
      next(setLoader({ state: true, feature: TASKS }));
      break;

    case `${TASKS} ${API_SUCCESS}`:
      next(setTasks(action.payload));
      next(setLoader({ state: false, feature: TASKS }));
      break;

    case `${TASKS} ${API_ERROR}`:
      next(
        setNotification({ message: action.payload.message, feature: TASKS })
      );
      next(setLoader({ state: false, feature: TASKS }));
      break;
  }
};
