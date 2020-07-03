import { BaseAction } from "../../types/BaseAction.type";
import {SET_TASKS, setTasks} from "../actions/tasks.actions";
import {ipcRenderer, IpcRendererEvent} from "electron";
import {parseDataFromCSV} from "../../utils/misc";

export const tasksMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  ipcRenderer.on('file:parsed', (event: IpcRendererEvent, data: any) => {
    const tasks = parseDataFromCSV(data);
    console.log(tasks);
    next(setTasks(tasks));
  });

  switch (action.type) {
    case SET_TASKS:
      break;

  }
};
