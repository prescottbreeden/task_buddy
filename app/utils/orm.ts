import {newId} from "./misc";

export const getId = (task: any) => {
  const id = task['ID'];
  return id ? id : newId();
};
export const getTitle = (task: any) => {
  const title = task.Title;
  return title ? title : 'type to edit';
};
export const getWorkItemType = (task: any) => { 
  const type = task['Work Item Type'];
  return type ? type: '';
};
export const getAssignedTo = (task: any) => {
  const assignedTo = task['Assigned To'];
  return assignedTo ? assignedTo : 'Unassigned';
};
export const getTags = (task: any) => {
  const tags = task.Tags;
  return tags ? tags : '';
};
export const getPriority = (task: any) => {
  const priority = task.Priority;
  return priority ? priority : '';
};
export const getSeverity = (task: any) => {
  const severity = task.Severity;
  return severity ? severity : '';
};
export const getReproSteps = (task: any) => {
  const reproSteps = task['Repro Steps'];
  return reproSteps ? reproSteps : '';
};
export const getIterationPath = (task: any) => {
  const iterationPath = task['Iteration Path'];
  return iterationPath ? iterationPath : '';
};
export const getCreatedBy = (task: any) => {
  const createdBy = task['Created By'];
  return createdBy ? createdBy : '';
};
export const getCreatedDate = (task: any) => {
  const createdDate = task['Created Date'];
  return createdDate ? createdDate : '';
};
export const getOriginalEstimate = (task: any) => {
  const originalEstimate = task['Original Estimate'];
  return originalEstimate ? originalEstimate : '0';
};
export const getDescription = (task: any) => {
  const description = task.Description;
  return description ? description : undefined;
};
export const getDevOpsDescription = (task: any) => {
  const devOpsDescription = task.Description;
  return devOpsDescription ? devOpsDescription : undefined;
};
export const getAcceptanceCriteria = (task: any) => {
  const acceptanceCriteria = task['Acceptance Criteria'];
  return acceptanceCriteria ? acceptanceCriteria : undefined;
};
export const getParent = (task: any) => {
  const parent = task['Parent'];
  return parent ? parent : undefined;
};
