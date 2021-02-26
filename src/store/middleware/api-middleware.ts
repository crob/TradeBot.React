import { createAction } from '@reduxjs/toolkit';
import axios from "axios";

import ErrorHelper from "../../helpers/error-helper";
import HttpHelper from "../../helpers/http-helper";

export const apiCallBegan = createAction<any>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");

const apiMiddleware = ({ dispatch }: any) => (next: any) => async (action: any) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    baseURL = "/api",
  } = action.payload;

  if (onStart) dispatch({ type: onStart, payload: { url, data } });

  next(action);

  try {
    const response = await axios.request({
      baseURL: baseURL,
      url,
      method,
      data,
    });

    response.data = HttpHelper.reviveData(response.data);
    // General
    dispatch(apiCallSuccess(response.data));
    // Specific
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data });
      // dispatch(logLastAction({ type: onSuccess, payload: response.data }));
    }
  } catch (error) {
    // try and get the errors the server responded with
    let errors = error.response.data?.errors;
    if (!errors) {
      /*
        if we had an unexpected or a validation error we didn't
        catch we have to get our errors from the header instead
       */
      errors = error.response.headers.errors
        ? JSON.parse(error.response.headers.errors)
        : null;
    }
    if (errors) {
      errors = ErrorHelper.normaliseErrorMessages(errors);
    }

    // General
    dispatch(apiCallFailed(errors));
    // Specific
    console.log("errors", errors);
    if (onError) dispatch({ type: onError, payload: errors });
  }
};

export default apiMiddleware;
