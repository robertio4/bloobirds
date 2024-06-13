import React from 'react';

import { Banner, BannerLink } from '@bloobirds-it/banner';
import { useRouter } from '@bloobirds-it/hooks';
import { APP_ACCOUNT_INTEGRATION_SALESFORCE_CONNECT } from '@bloobirds-it/types';

export const SdfcOTOAccounts = () => {
  const { history } = useRouter();
  return (
    <Banner icon="salesforceOutlined" type="info">
      Salesforce is <b>not connected</b>. Please, set up a <b>Salesforce Integration</b>{' '}
      <BannerLink onClick={() => history.push(APP_ACCOUNT_INTEGRATION_SALESFORCE_CONNECT)}>
        <b>here</b>
      </BannerLink>{' '}
      to use the features of our Chrome Extension
    </Banner>
  );
};
