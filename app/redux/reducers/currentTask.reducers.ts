import { SET_CURRENT_TASK } from "../actions/currenttask.actions";

const initState = {};

export const currentTaskReducer = (currentTask = initState, action: any) => {
  switch (true) {
    case action.type.includes(SET_CURRENT_TASK):
      return action.payload;

    default:
      return currentTask;
  }
};
