import { BaseAction } from "../../types/BaseAction.type";
import {SET_TASKS, setTasks} from "../actions/tasks.actions";
import {ipcRenderer, IpcRendererEvent, remote} from "electron";
import {parseDataFromCSV} from "../../utils/misc";
//@ts-ignore
import { FindInPage } from 'electron-find';

export const tasksMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  let findInPage: any = null
  findInPage = new FindInPage(remote.getCurrentWebContents(), {
    boxBgColor: '#333',
    boxShadowColor: '#000',
    inputColor: '#aaa',
    inputBgColor: '#222',
    inputFocusColor: '#555',
    textColor: '#aaa',
    textHoverBgColor: '#555',
    caseSelectedColor: '#555',
  })
  ipcRenderer.on('on-find', () => {
    findInPage.openFindWindow()
  })

  ipcRenderer.on('file:parsed', (event: IpcRendererEvent, data: any) => {
    console.log(event);
    const all = parseDataFromCSV(data);
    next(setTasks(all));
  });

  switch (action.type) {
    case SET_TASKS:
      break;

  }
};
