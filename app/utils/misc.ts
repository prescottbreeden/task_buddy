import { find, map, pipe, prop, findIndex, curry } from 'ramda';
import { BaseAction } from '../types/BaseAction.type';
import {TaskType, emptyTask} from '../types/TaskType.type';
import {
  getAcceptanceCriteria,
  getAssignedTo,
  getCreatedBy,
  getCreatedDate,
  getDevOpsDescription,
  getId,
  getIterationPath,
  getOriginalEstimate,
  getParent,
  getPriority,
  getReproSteps,
  getSeverity,
  getTags,
  getTitle,
  getWorkItemType,
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
    return bob.toDateString();
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

const generateParentString = (tasks: any[], task: any) => {
  if ('Parent' in task) {
    const parentTask = find((t: any) => getId(t) === getParent(task), tasks);
    if (parentTask) {
      return getTitle(parentTask);
    }
  }
  return getParent(task) ? 
    `Parent ID: ${getParent(task)}` :
    'No Parent Item Found';
}


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
      parent: generateParentString(tasks, task),
      parentId: getParent(task),
      priority: getPriority(task),
      reproSteps: getReproSteps(task),
      severity: getSeverity(task),
      tags: getTags(task),
      title: getTitle(task),
      workItemType: getWorkItemType(task),
    }
  })

}

