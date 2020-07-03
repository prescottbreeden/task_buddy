// action types
export const SET_NOTIFICATION = "SET_NOTIFICATION";

// action creators
export const setNotification = ({ message, feature }: any) => {
  return {
    type: `${feature} ${SET_NOTIFICATION}`,
    payload: message,
    meta: { feature },
  };
};
