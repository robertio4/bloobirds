import { api } from './api';

// TODO: Add provider as how we were doing it before was not working
export const fetchAndOpenNylasUrl = () => {
  api.get('/utils/nylas/generate-url').then(payload => {
    window.open(payload.data.url);
  });
};

export const fetchAndOpenLegacyUrl = () => {
  api.get('/utils/service/gmail/connections/endpoint').then(payload => {
    window.open(payload.data.endpoint);
  });
};
