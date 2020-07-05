import { SET_TASKS, DELETE_TASK, UPDATE_TASKS } from "../actions/tasks.actions";
import { TaskType } from "../../types/TaskType.type";
import {upsertItem} from "../../utils/misc";

const initState: TaskType[] = [];

export const tasksReducer = (tasks = initState, action: any) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;

    case UPDATE_TASKS:
      const updated = upsertItem<TaskType>(tasks, 'id')(action.payload);
      return updated;

    case DELETE_TASK:
      const { payload } = action;
      return tasks.filter((task) => task.id !== payload.id);

    default:
      return tasks;
  }
};
