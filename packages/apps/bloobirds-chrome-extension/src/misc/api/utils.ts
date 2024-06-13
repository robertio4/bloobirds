import { getTokenEncoded } from '@bloobirds-it/utils';
import * as Sentry from '@sentry/react';
import { stringify } from 'query-string';

const buildOptions = async (method, body, includeAuth, xlsxDownload, xlsxUpload) => {
  let headers = {
    'Access-Control-Allow-Headers': 'Authorization',
    'x-include-references-to-many': true,
  };
  if (!xlsxUpload) {
    headers = {
      ...headers,
      'content-type': 'application/json',
    };
  }
  if (!xlsxDownload && !xlsxUpload) {
    headers = {
      ...headers,
      Accept: 'application/json',
    };
  }

  const ops = {
    headers,
    method,
    mode: 'cors',
  };

  if (!xlsxDownload && includeAuth) {
    const token = await getTokenEncoded();
    ops.headers.Authorization = `Bearer ${token}`;
  }
  if (xlsxUpload) {
    ops.body = body;
  } else if (body !== undefined) {
    ops.body = JSON.stringify(body);
  }
  return ops;
};

export const request = async ({
  host,
  url,
  method,
  body,
  requestParams,
  failureAction,
  includeAuth = true,
  xlsxDownload,
  xlsxUpload,
}) => {
  let params = '';
  if (requestParams !== undefined && Object.keys(requestParams).length > 0) {
    params = `?${stringify(requestParams)}`;
  }
  const endpoint = `${host}${url}${params}`;
  const options = await buildOptions(method, body, includeAuth, xlsxDownload, xlsxUpload);
  return fetch(endpoint, options)
    .then(response => {
      if (response) {
        if (response.status === 200 || response.status === 201) {
          return xlsxDownload ? response : response.json();
        }
        if (response.status === 202 || response.status === 204) {
          return response;
        }
      }
      return Promise.reject({ type: failureAction, response });
    })
    .catch(error => {
      Sentry.captureException(new Error(`Failed to fetch: ${endpoint}`), {
        tags: {
          module: 'api',
        },
        extra: {
          origin: 'Api request',
        },
      });
      return error;
    });
};
