import { api } from '../../../utils/api';

/**
 * @param provider
 * @param bbPage
 * @param target
 */
export const fetchAndOpenNylasUrl = ({
  provider,
  bbPage = '',
  target = '_blank',
}: {
  provider?: 'google' | 'outlook';
  bbPage?: string;
  target?: string;
}) => {
  api
    .get(`/utils/nylas/generate-url?${provider && `provider=${provider}`}&bb-page=${bbPage}`)
    .then(payload => {
      window.open(payload.data.url, target);
    });
};

export const fetchAndOpenLegacyUrl = () => {
  api.get('/utils/service/gmail/connections/endpoint').then(payload => {
    window.open(payload.data.endpoint);
  });
};
