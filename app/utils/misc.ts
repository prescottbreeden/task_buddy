import { map, pipe, prop, findIndex } from "ramda";
import { BaseAction } from "../types/BaseAction.type";

export const mergeObjects = <T>(obj1: T) => (obj2: Partial<T>): T => ({
  ...obj1,
  ...obj2,
});

export const insertItem = <T>(array: T[], k: keyof T) => (payload: T): T[] => {
  return map(
    (item: T) => (item[k] === payload[k] ? {...payload} : { ...item }),
    array
  );
};

export const upsertItem = <T>(array: T[], k: keyof T) => (payload: T): T[] => {
  const payloadValue = prop(k, payload);
  const index = findIndex((item: any) => item[k] === payloadValue, array);
  return index === -1
    ? [...array, payload]
    : insertItem<T>(array, k)(payload)
};

export const dispatcher = (fn: (action: BaseAction) => void) => (
  action: BaseAction
) => {
  return fn(action);
};

export const buildOnChange = <T>(
  allItems: T[],
  selector: keyof T,
  actionCreator: (data: T[]) => BaseAction,
  dispatcher: (action: BaseAction) => void
) => (item: T) => (data: Partial<T>) => {
  return pipe(
    mergeObjects<T>(item),
    upsertItem<T>(allItems, selector),
    actionCreator,
    dispatcher
  )(data);
};

export const newId = () => Math.random().toString(36).substring(7);
