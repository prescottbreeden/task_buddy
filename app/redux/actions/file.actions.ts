// feature name
export const FILE = "[FILE]";

// action types
export const UPLOAD_FILE = `${FILE} SET`;

// action creators
export const uploadFile = (file: any) => {
  return {
    type: UPLOAD_FILE,
    payload: file,
  };
};
