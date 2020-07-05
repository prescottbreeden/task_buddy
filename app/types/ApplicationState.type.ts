export interface ApplicationState {
  filters: {
    Task: boolean;
    Bug: boolean;
    ['User Story']: boolean;
  },
  options: boolean;
  sortBy: string;
  upload: boolean;
}
