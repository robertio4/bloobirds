import { request } from './utils';
import { ApiHosts } from './ApiHosts';

const callsRequest = props =>
  request({
    host: ApiHosts.callService.host(),
    includeAuth: true,
    ...props,
  });

export const CallsApi = {
  get: ({ path }) =>
    callsRequest({
      url: `/${path}`,
      method: 'GET',
    }),
  patch: ({ path, body }) =>
    callsRequest({
      url: `/${path}`,
      method: 'PATCH',
      body,
    }),
};
