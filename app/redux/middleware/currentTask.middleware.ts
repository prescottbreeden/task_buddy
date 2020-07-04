import {BaseAction} from "../../types/BaseAction.type";
import { ipcRenderer } from 'electron';
import {SET_CURRENT_TASK} from "../actions/currenttask.actions";

export const currentTaskMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  switch (action.type) {
    case SET_CURRENT_TASK:
      ipcRenderer.send('currentTask:set', action.payload);
  }
};
