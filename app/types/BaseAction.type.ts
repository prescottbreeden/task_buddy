export interface BaseAction {
  type: string;
  payload: any;
  message?: string;
  meta?: {
    url: string;
    method: string;
    feature: string;
  };
}
