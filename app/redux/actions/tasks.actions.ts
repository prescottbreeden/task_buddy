import { TaskType } from "../../types/TaskType.type";

// feature name
export const TASKS = "[Tasks]";

// action types
export const FETCH_TASKS = `${TASKS} FETCH`;
export const SET_TASKS = `${TASKS} SET`;
export const DELETE_TASK = `${TASKS} DELETE`;

// action creators
export const setTasks = (tasks: TaskType[]) => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};

export const deleteTask = (task: TaskType) => {
  return {
    type: DELETE_TASK,
    payload: task,
  };
};

export const fetchTasks = (query: any) => {
  return {
    type: FETCH_TASKS,
    payload: query,
  };
};
