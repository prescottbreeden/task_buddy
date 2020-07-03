import {newId} from "../utils/misc";

export interface TaskType {
  id: string;
  accumulatedTime: number;
  completed: boolean;
  completedDate?: Date;
  description: string;
  isActive: boolean;
  name: string;
  notes: string;
  originalEstimate: string;
  priority: number;
  relatedFeature: string;
  startedDate: Date;
}

export const emptyTask = (): TaskType => {
  return {
    id: newId(),
    accumulatedTime: 0,
    completed: false,
    description: "type to edit",
    isActive: false,
    name: "type to edit",
    notes: "type to edit",
    originalEstimate: '0',
    priority: 1,
    relatedFeature: "type to edit",
    startedDate: new Date(Date.now()),
  };
};
