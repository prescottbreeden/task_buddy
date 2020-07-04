import {newId} from "../utils/misc";

export interface TaskType {
  id: string;
  accumulatedTime: number;
  assignedTo?: string;
  completed: boolean;
  completedDate?: Date;
  createdBy?: string;
  createdDate: Date;
  description: string;
  isActive: boolean;
  iterationPath?: string;
  notes: string;
  originalEstimate?: string;
  priority?: number;
  relatedFeature: string;
  severity?: string;
  startedDate?: Date;
  tags?: string;
  title: string;
  workItemType?: string;
}

export const emptyTask = (): TaskType => {
  return {
    id: newId(),
    accumulatedTime: 0,
    completed: false,
    createdDate: new Date(Date.now()),
    description: "type to edit",
    isActive: false,
    title: "type to edit",
    notes: "type to edit",
    originalEstimate: '0',
    relatedFeature: "type to edit",
  };
};
