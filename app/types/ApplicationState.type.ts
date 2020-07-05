export interface ApplicationState {
  devOps: boolean,
  filters: {
    Task: boolean;
    Bug: boolean;
    ['User Story']: boolean;
  },
  options: boolean;
  sortBy: string;
  upload: boolean;
}
