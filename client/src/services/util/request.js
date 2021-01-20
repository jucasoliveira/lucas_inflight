import { DEFAULT_REQUEST_TIMEOUT, ERR_REQUEST_NETWORK_ERROR } from './const';
import isUndefined from 'lodash/isUndefined';
import config from '../../config/config.json';

const request = ({
  method = 'GET',
  host = config.serverUrl,
  route,
  params,
  headers = {},
  body,
  timeout = DEFAULT_REQUEST_TIMEOUT
}) => {
  /* eslint-enable */
  try {
    return new Promise((resolve, reject) => {
      const requestObject = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Connection: 'close',
          ...headers
        },
        body: JSON.stringify(body),
        timeout,
        redirect: 'follow'
      };

      let url = `${host}${route}`;
      if (params) {
        Object.keys(params)
          .filter((key) => !isUndefined(key))
          .forEach((key, index) => (url += `${index === 0 ? '?' : '&'}${key}=${params[key]}`));
      }

      return fetch(url, requestObject)
        .then((response) =>
          handleResponse({ response, resolve, reject, method, route, body, params })
        )
        .catch((error) => handleError({ error, resolve, reject, method, route, body, params }));
    });
  } catch (err) {
    console.error(err, 'request/request');
    return Promise.reject();
  }
};

const handleResponse = ({ response, resolve, reject, method, route }) => {
  try {
    const { status } = response;
    if (status === 204) {
      console.log(`HTTP ${method} ${status} ⟸ ${route}`);
      resolve({
        data: {}
      });
    } else {
      return response
        .text()
        .then((text) => (text.length ? JSON.parse(text) : {}))
        .then((res) => {
          if (status === 200 || status === 201) {
            resolve({
              data: res
            });
          } else if (status === 402 || status === 403) {
            resolve({
              data: res,
              actionRequired: true
            });
          } else {
            reject({
              error: res
            });
          }
        });
    }
  } catch (err) {
    console.error(err, 'request/handleResponse');
    reject();
  }
};

const handleError = ({ error, reject, route, body, params }) => {
  try {
    const { response } = error;

    if (response !== undefined) {
      const errorCode = (response.data && response.data.errorCode) || response.status;
      console.error({ errorCode }, { route, body, params });
      return reject({
        error: errorCode
      });
    }
    const errorCode = ERR_REQUEST_NETWORK_ERROR;
    console.error({ errorCode }, { route, body, params });
    return reject({
      error: errorCode
    });
  } catch (err) {
    console.error(err, 'request/handleError');
    reject({ error: 0 });
  }
};

export default request;
