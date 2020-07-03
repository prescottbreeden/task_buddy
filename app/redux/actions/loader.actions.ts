// action types
export const SET_LOADER = "SET_LOADER";

// action creators
export const setLoader = ({ state, feature }: any) => ({
  type: `${feature} ${SET_LOADER}`,
  payload: state,
  meta: { feature },
});
