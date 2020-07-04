import { map, pipe, prop, findIndex, curry } from 'ramda';
import { BaseAction } from '../types/BaseAction.type';
import {TaskType, emptyTask} from '../types/TaskType.type';

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

const getId = (task: any) => {
  const id = task['ID'];
  return id ? id : newId();
};
const getTitle = (task: any) => {
  const title = task.Title;
  return title ? title : 'type to edit';
};
const getWorkItemType = (task: any) => { 
  const type = task['Work Item Type'];
  return type ? type: '';
};
const getAssignedTo = (task: any) => {
  const assignedTo = task['Assigned To'];
  return assignedTo ? assignedTo : 'Unassigned';
};
const getTags = (task: any) => {
  const tags = task.Tags;
  return tags ? tags : '';
};
const getPriority = (task: any) => {
  const priority = task.Priority;
  return priority ? priority : '';
};
const getSeverity = (task: any) => {
  const severity = task.Severity;
  return severity ? severity : '';
};
const getReproSteps = (task: any) => {
  const reproSteps = task['Repro Steps'];
  return reproSteps ? reproSteps : '';
};
const getIterationPath = (task: any) => {
  const iterationPath = task['Iteration Path'];
  return iterationPath ? iterationPath : '';
};
const getCreatedBy = (task: any) => {
  const createdBy = task['Created By'];
  return createdBy ? createdBy : '';
};
const getCreatedDate = (task: any) => {
  const createdDate = task['Created Date'];
  return createdDate ? createdDate : '';
};
const getOriginalEstimate = (task: any) => {
  const originalEstimate = task['Original Estimate'];
  return originalEstimate ? originalEstimate : '0';
};
const getDescription = (task: any) => {
  const description = task.Description;
  return description ? description : undefined;
};

export const parseDataFromCSV = (tasks: any[]): TaskType[] => {
  return tasks.map((task: any) => {
    console.log(task);
    return {
      ...emptyTask(),
      assignedTo: getAssignedTo(task),
      createdBy: getCreatedBy(task),
      createdDate: getCreatedDate(task),
      description: getDescription(task),
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

