import { request } from './utils';
import { ApiHosts } from './ApiHosts';

const webRequest = props =>
  request({
    host: ApiHosts.webService.host(),
    includeAuth: true,
    ...props,
  });

export const WebApi = {
  search: ({ path }) =>
    webRequest({
      url: `/${path}`,
      method: 'GET',
    }),
  download: ({ path, id, reportType, jwt }) =>
    webRequest({
      url: `/${path}/${id}/download/${reportType}?_jwt=${jwt}`,
      method: 'GET',
      xlsxDownload: true,
    }),
  create: ({ path, body, params }) =>
    webRequest({
      url: `/${path}/create${params}`,
      method: 'POST',
      body,
      xlsxUpload: true,
    }),
  genericCreate: ({ path, body }) =>
    webRequest({
      url: `/${path}`,
      method: 'POST',
      body,
    }),
  validate: ({ path, body, params }) =>
    webRequest({
      url: `/${path}/validate${params}`,
      method: 'POST',
      body,
      xlsxUpload: true,
    }),
  delete: ({ path, body }) =>
    webRequest({
      url: `/${path}`,
      method: 'DELETE',
      body,
    }),
};
