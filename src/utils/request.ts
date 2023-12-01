// import { getAuthKey, logoutClearLocal } from './local-storage/user';

import { delay } from 'redux-saga/effects';
import { message } from 'antd';
import {
  getAccessToken,
  getRefreshToken,
  logoutClearLocal,
} from 'store/localStore';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response): object | any {
  if (response.status === 204 || response.status === 205) {
    return { status: 'OK' };
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: Response): Promise<any> {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const processedResponse = await response.json();
  if (response.status === 401)
    if (processedResponse?.message?.includes('Please authenticate')) {
      message.error('Please login again!');
      setTimeout(() => {
        if (getAccessToken() || getRefreshToken()) {
          logoutClearLocal();
          window.location.reload();
        }
      }, 2000);
    }

  const error = new ResponseError(response);
  error.response = {
    ...response,
    statusText: processedResponse?.message || error?.response?.statusText,
  };
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url           The URL we want to request
 * @param  {object} [body]        The options we want to pass to "fetch"
 * @param  {boolean} needsAuth    To request with token
 * @param  {any} headers          The headers we want to pass to "fetch"
 * @param  {string} method        The method to use for the request
 * @param  {any} responseType     Response type for options
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  body?: any,
  needsAuth: boolean = true,
  headers: any = {},
  method: string = 'POST',
  responseType?: any,
): Promise<{} | { err: ResponseError }> {
  delay(500);

  try {
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

    if (needsAuth) {
      headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    const options = {
      method,
      headers,
      body: method === 'POST' ? JSON.stringify(body) : null,
      responseType,
    };

    const fetchResponse = await fetch(url, options);
    const response = await checkStatus(fetchResponse);
    return parseJSON(response);
  } catch (e: any) {
    console.log(e);
    const errMsg = e?.response?.statusText;
    if (navigator.onLine) {
      if (errMsg) message.error(errMsg);
      else message.info('Connection issue! Please contact admin.');
    } else {
      message.warning('Internet connection unstable!');
    }

    return { message: errMsg, status: e?.response?.status };
  }
}
