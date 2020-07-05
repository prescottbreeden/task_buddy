// feature name
export const APPLICATION = "[APPLICATION]";

// action types
export const UPDATE_APPLICATION = `${APPLICATION} UPDATE`;

// action creators
export const updateApplication = (props: any) => {
  return {
    type: UPDATE_APPLICATION,
    payload: props,
  };
};
