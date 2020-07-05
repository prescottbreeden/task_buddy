import { map, pipe, prop, findIndex, curry } from 'ramda';
import { BaseAction } from '../types/BaseAction.type';
import {TaskType, emptyTask} from '../types/TaskType.type';
import {
  getAcceptanceCriteria,
  getAssignedTo,
  getCreatedBy,
  getCreatedDate,
  getDescription,
  getId,
  getIterationPath,
  getOriginalEstimate,
  getPriority,
  getReproSteps,
  getSeverity,
  getTags,
  getTitle,
  getWorkItemType,
  getDevOpsDescription
} from './orm';

export const mergeObjects = <T>(obj1: T) => (obj2: Partial<T>): T => ({
  ...obj1,
  ...obj2,
});

export const insertItem = <T>(array: T[], k: keyof T) => (payload: T): T[] => {
  return map(
    (item: T) => (item[k] === payload[k] ? { ...payload } : { ...item }),
    array
  );
};

export const upsertItem = <T>(array: T[], k: keyof T) => (payload: T): T[] => {
  const payloadValue = prop(k, payload);
  const index = findIndex((item: any) => item[k] === payloadValue, array);
  return index === -1 ? [...array, payload] : insertItem<T>(array, k)(payload);
};

export const dispatcher = (fn: (action: BaseAction) => void) => (
  action: BaseAction
) => {
  return fn(action);
};

export const buildOnChange = <T>(
  actionCreator: (data: T) => BaseAction,
  dispatcher: (action: BaseAction) => void
) => (item: T) => (data: Partial<T>) => {
  console.log(item);
  return pipe(
    mergeObjects<T>(item),
    actionCreator,
    dispatcher
  )(data);
};

export const newId = () => Math.random().toString(36).substring(7);

export const renderData = curry((data: any, property: string): string => {
  const bob = prop(property, data);
  if (bob && bob instanceof Date) {
    return bob.toLocaleDateString();
  }
  if (bob && typeof bob === 'number') {
    return bob.toString().replace(/(\r\n\t|\n|\r\t)/gm,"");
  }
  if (bob && typeof bob === 'string') {
    return bob.replace(/(\r\n\t|\n|\r\t)/gm,"");
  }
  return '';
});

export const noBlank = (bob: string) => {
  return bob ? bob : '-';
};


export const parseDataFromCSV = (tasks: any[]): TaskType[] => {
  return tasks.map((task: any) => {
    return {
      ...emptyTask(),
      acceptanceCriteria: getAcceptanceCriteria(task),
      assignedTo: getAssignedTo(task),
      createdBy: getCreatedBy(task),
      createdDate: getCreatedDate(task),
      devOpsDescription: getDevOpsDescription(task),
      id: getId(task),
      iterationPath: getIterationPath(task),
      originalEstimate: getOriginalEstimate(task),
      priority: getPriority(task),
      reproSteps: getReproSteps(task),
      severity: getSeverity(task),
      tags: getTags(task),
      title: getTitle(task),
      workItemType: getWorkItemType(task),
    }
  })

}

