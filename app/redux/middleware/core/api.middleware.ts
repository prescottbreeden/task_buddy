import { BaseAction } from "../../../types/BaseAction.type";
import { API_REQUEST, apiSuccess, apiError } from "../../actions/api.actions";

export const apiMiddleware = ({ dispatch }: any) => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  if (action.type.includes(API_REQUEST) && action.meta) {
    const { url, method, feature } = action.meta;
    fetch(url, { method })
      .then((response) => response.json())
      .then((data) => dispatch(apiSuccess({ data, feature })))
      .catch((error) => dispatch(apiError({ error, feature })));
  }
};
