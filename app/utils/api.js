import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import { getToken, removeToken } from 'utils/token';
import Config from 'utils/getEnvConfig';

axios.defaults.baseURL = Config.API_URL;
// axios.defaults.timeout = 2500; // api call timeout

axios.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    if (error.response && error.response.status) {
      if (
        error.response.status === 403 ||
        (_has(error.response.data, 'error') &&
          error.response.data.error === 'invalid_token')
      ) {
        removeToken();
        window.location.replace('/');
      } else if (error.response.status === 401) {
        removeToken();
        window.location.href = `${
          Config.API_URL
        }/oauth/authorise?client_id=partners&grant_type=implicit&session_expired`;
      }

      if (error.response.status === 500 || error.response.status === 502) {
        window.location.href = '/server-down';
      }
    }

    return Promise.reject(error);
    // const errObj = {
    //   status: 500,
    //   message: 'System is temporarily unavailable. Please try again later.',
    // };
    // return Promise.reject(errObj);
  },
);
axios.interceptors.request.use(config => {
  const token = getToken().access_token;
  if (token === null || !token || /categor/.test(config.url)) return config;
  config.headers.common.Authorization = `Bearer ${token}`; // eslint-disable-line
  return config;
});

export function post(endpoint, payload, config) {
  const postFunc = axios.post(endpoint, payload, config);

  return postFunc.then(response => response).catch(errorHandler);
}

export function patch(endpoint, payload) {
  const patchFunc = axios.patch(endpoint, payload);

  return patchFunc.then(response => response).catch(errorHandler);
}

export function put(endpoint, payload) {
  const putFunc = axios.put(endpoint, payload);

  return putFunc.then(response => response).catch(errorHandler);
}

export function update(endpoint, payload) {
  const putFunc = axios.put(endpoint, payload);

  return putFunc.then(response => response).catch(errorHandler);
}

export function get(endpoint) {
  const getFunc = axios.get(endpoint);

  return getFunc.then(response => response).catch(errorHandler);
}

export function remove(endpoint) {
  const getFunc = axios.delete(endpoint);

  return getFunc.then(response => response).catch(errorHandler);
}

function errorHandler(error) {
  if (_isEmpty(error.response)) {
    throw error;
  } else {
    throw error.response.data;
  }
}
