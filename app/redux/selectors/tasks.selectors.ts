import { TaskType } from "../../types/TaskType.type";

export const getTasks = (state: any): TaskType[] => state.tasks;
export const getCurrentTask = (state: any): TaskType => {
  const tasks = getTasks(state);
  const currentTask = state.currentTask;
  const [task] = tasks.filter((task: TaskType) => {
    return task.id === currentTask.id;
  });
  return task;
};
