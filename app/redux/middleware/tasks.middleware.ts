import { BaseAction } from "../../types/BaseAction.type";
import {SET_TASKS, setTasks} from "../actions/tasks.actions";
import {ipcRenderer, IpcRendererEvent} from "electron";
import {parseDataFromCSV} from "../../utils/misc";
import {TaskType} from "../../types/TaskType.type";

export const tasksMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  ipcRenderer.on('file:parsed', (event: IpcRendererEvent, data: any) => {
    console.log(event);
    const all = parseDataFromCSV(data);
    const tasks = all.filter((item: TaskType) => item.workItemType === 'Task');
    next(setTasks(tasks));
  });

  switch (action.type) {
    case SET_TASKS:
      break;

  }
};
