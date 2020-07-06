import {newId} from "../utils/misc";

export interface TaskType {
  id: string;
  acceptanceCriteria?: string;
  accumulatedTime: number;
  assignedTo?: string;
  completed: boolean;
  completedDate?: Date;
  createdBy?: string;
  createdDate: Date;
  devOpsDescription?: string;
  isActive: boolean;
  iterationPath?: string;
  notes: string;
  originalEstimate?: string;
  parent?: string;
  parentId?: string;
  priority: string;
  severity?: string;
  startedDate?: Date;
  tags?: string;
  title: string;
  workItemType?: string;
}

export const emptyTask = (): TaskType => {
  return {
    accumulatedTime: 0,
    completed: false,
    createdDate: new Date(),
    id: newId(),
    isActive: false,
    notes: "click to edit notes",
    originalEstimate: '0',
    parent: "click to edit parent",
    priority: '0',
    title: "click to edit title",
    workItemType: "Task",
  };
};
