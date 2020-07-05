import {UPDATE_APPLICATION} from "../actions/application.actions";

const initState = {
  devOps: true,
  filters: {
    Bug: true,
    Task: true,
    ['User Story']: false,
  },
  options: false,
  sortBy: 'parent',
  upload: false,
};

export const applicationReducer = (appState = initState, action: any) => {
  switch (true) {
    case action.type.includes(UPDATE_APPLICATION):
      return {
        ...appState,
        ...action.payload,
      }

    default:
      return appState;
  }
};
