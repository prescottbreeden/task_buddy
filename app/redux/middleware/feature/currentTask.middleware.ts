import { SET_CURRENT_TASK } from "../../actions/currenttask.actions";

const initState = {};

export const currentTaskReducer = (task = initState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_TASK:
      return action.payload;

    default:
      return task;
  }
};
