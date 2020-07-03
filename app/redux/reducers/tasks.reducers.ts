import { SET_TASKS, DELETE_TASK } from "../actions/tasks.actions";
import { TaskType } from "../../types/TaskType.type";

const initState: TaskType[] = [];

export const tasksReducer = (tasks = initState, action: any) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;

    case DELETE_TASK:
      const { payload } = action;
      return tasks.filter((task) => task.id !== payload.id);

    default:
      return tasks;
  }
};
