import {UPDATE_APPLICATION} from "../actions/application.actions";

const initState = {
  options: false,
  upload: false,
  filters: {
    Bug: true,
    Task: true,
    ['User Story']: false,
  },
  sortBy: ''
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
