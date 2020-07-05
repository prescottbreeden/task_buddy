import { TaskType } from "../../types/TaskType.type";
import * as R from 'ramda';

export const getTasks = (state: any) => {
  const { filters } = state.application;
  const tasks = state.tasks.reduce((prev: TaskType[], curr: TaskType) => {
    if (curr.workItemType && filters[curr.workItemType]) {
      prev = [...prev, curr];
    }
    return prev;
  }, []);

  const { sortBy } = state.application;
  const sorted = R.sortBy(R.prop(sortBy))(tasks);

  return sorted;
}

export const getCurrentTask = (state: any) => {
  const tasks = getTasks(state);
  const currentTask = state.currentTask;
  const [task] = tasks.filter((task: any) => {
    return task.id === currentTask.id;
  });
  return task;
};
