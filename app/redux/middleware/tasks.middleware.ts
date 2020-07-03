import { BaseAction } from "../../types/BaseAction.type";

export const tasksMiddleware = () => (next: Function) => (
  action: BaseAction
) => {
  next(action);

  switch (action.type) {

  }
};
