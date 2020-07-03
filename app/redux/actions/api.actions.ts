export interface ApiRequest {
  body: any;
  method: string;
  url: string;
  feature: string;
}

// action types
export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";

// action creators
export const apiRequest = ({ body, method, url, feature }: ApiRequest) => {
  return {
    type: `${feature} ${API_REQUEST}`,
    payload: body,
    meta: { method, url, feature },
  };
};

export const apiSuccess = ({ response, feature }: any) => {
  return {
    type: `${feature} ${API_SUCCESS}`,
    payload: response,
    meta: { feature },
  };
};

export const apiError = ({ response, feature }: any) => {
  return {
    type: `${feature} ${API_ERROR}`,
    payload: response,
    meta: { feature },
  };
};
