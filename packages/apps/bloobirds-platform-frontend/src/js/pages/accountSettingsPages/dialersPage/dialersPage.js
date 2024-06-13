import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Tab, TabGroup } from '@bloobirds-it/flamingo-ui';

import { APP_ACCOUNT_DIALERS } from '../../../app/_constants/routes';
import { useRouter } from '../../../hooks';
import { useFeatureFlags } from '../../../hooks/useFeatureFlags';
import AccountSettingsLayout from '../../../layouts/accountSettingsLayout';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import { AircallIntegration } from './aircallIntegration/aircallIntegration';
import { AstrolineIntegration } from './astrolineIntegration/astrolineIntegration';
import { JustcallIntegration } from './justCallIntegration/justcallIntegration';
import { NumintecIntegration } from './numintecIntegration/numintecIntegration';
import { RingoverIntegration } from './ringoverIntegration/ringoverIntegration';
import { TwilioIntegration } from './twilioIntegration/twilioIntegration';

const DialersPage = ({ tab }) => {
  const roleManager = SessionManagerFactory().getRoleManager();
  const { t } = useTranslation();
  const { isFlagEnabled } = useFeatureFlags();
  const { history } = useRouter();
  const changeTab = useCallback(
    newTab => {
      history.push(`${APP_ACCOUNT_DIALERS}/${newTab.toLowerCase().replace(/\s+/g, '-')}`);
    },
    [history],
  );

  if (!roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }

  return (
    <AccountSettingsLayout title={t('accountSettings.dialers.title')}>
      <TabGroup value={tab} onClick={changeTab}>
        <Tab name={t('common.twilio')}>
          <TwilioIntegration />
        </Tab>
        <Tab name={t('common.aircall')}>
          <AircallIntegration />
        </Tab>
        {isFlagEnabled('JUSTCALL') && (
          <Tab name={t('common.justcall')}>
            <JustcallIntegration />
          </Tab>
        )}
        {isFlagEnabled('ASTROLINE_DIALER') && (
          <Tab name={t('common.astroline')}>
            <AstrolineIntegration />
          </Tab>
        )}
        {isFlagEnabled('NUMINTEC_DIALER') && (
          <Tab name={t('common.numintec')}>
            <NumintecIntegration />
          </Tab>
        )}
        {isFlagEnabled('RINGOVER_DIALER') && (
          <Tab name={t('common.ringover')}>
            <RingoverIntegration />
          </Tab>
        )}
      </TabGroup>
    </AccountSettingsLayout>
  );
};

export default DialersPage;
