import {UPDATE_APPLICATION} from "../actions/application.actions";

const initState = {
  options: false,
  upload: false
};

export const applicationReducer = (applicationState = initState, action: any) => {
  switch (true) {
    case action.type.includes(UPDATE_APPLICATION):
      return {
        ...applicationState,
        ...action.payload,
      }

    default:
      return applicationState;
  }
};
