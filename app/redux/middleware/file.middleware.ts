import {BaseAction} from "../../types/BaseAction.type";
import { ipcRenderer } from 'electron';
import {UPLOAD_FILE} from "../actions/file.actions";

export const fileMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  switch (action.type) {
    case UPLOAD_FILE:
      const file = action.payload[0];
      ipcRenderer.send('file:upload', file.path);
  }
};
