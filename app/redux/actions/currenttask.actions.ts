// feature name
export const CURRENT_TASK = "[CURRENT_TASK]";

// action types
export const SET_CURRENT_TASK = `${CURRENT_TASK} SET`;

// action creators
export const setCurrentTask = (task: any) => {
  return {
    type: SET_CURRENT_TASK,
    payload: task,
  };
};
