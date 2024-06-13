import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useUserHelpers } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { UserHelperKeys, UserRole } from '@bloobirds-it/types';
import { api, getUserTimeZone } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import useUserSalesforceIntegration from '../../../../../hooks/useUserSalesforceIntegration';
import styles from './otoQSGSteps.module.css';

export const ConnectToSFDC = () => {
  const { settings } = useActiveUserSettings();
  const { t } = useTranslation('translation', { keyPrefix: 'quickStartGuide.oto.blocks.sfdc' });
  const userRoles = settings?.user?.roles;
  const userName = settings?.user?.name;
  const { get, saveCustom } = useUserHelpers();
  const date = new Date() || new Date(get(UserHelperKeys.CONNECT_SALESFORCE));
  const isAdmin =
    userRoles?.includes(UserRole.ACCOUNT_ADMIN) || userRoles?.includes(UserRole.GLOBAL_ADMIN);
  const salesforceInstance = settings?.account?.salesforceInstance || '';
  const sfdcInstanceName = salesforceInstance?.split('//')[1];
  const { salesforceIntegration } = useUserSalesforceIntegration();
  const userTimeZone = getUserTimeZone();
  const timezone = settings?.user?.timeZone;
  const parsedDate = spacetime(salesforceIntegration?.creationDatetime)
    .goto(timezone || userTimeZone)
    .format('iso');
  const now = spacetime
    .now()
    .goto(timezone || userTimeZone)
    .format('iso');

  useEffect(() => {
    if (salesforceIntegration?.active)
      saveCustom({
        key: UserHelperKeys.CONNECT_SALESFORCE,
        data: salesforceIntegration?.creationDatetime,
      });
  }, [salesforceIntegration?.active]);

  const generateSFDCUrl = (isSandbox: boolean) => {
    api
      .get(
        isAdmin && !salesforceInstance
          ? `/utils/service/salesforce/welcome/generate-url/${isSandbox}`
          : `/utils/service/salesforce/generate-user-url?welcomeScreen=true`,
      )
      .then(response => response?.data)
      .then(res => {
        window.open(res.url, '_self');
      });
  };

  const sNow = useGetI18nSpacetime(new Date(now));
  const sDate = useGetI18nSpacetime(
    salesforceIntegration?.creationDatetime ? new Date(parsedDate) : date,
  );

  return (
    <>
      {salesforceIntegration?.active ? (
        <div className={styles.sfdc_connected}>
          <Icon name="salesforceOutlined" color="verySoftBloobirds" />
          <div>
            <Text size="s">{userName}</Text>
            <Text size="xs" color="softPeanut">
              {sfdcInstanceName}
            </Text>
          </div>
          <Text size="xs" color="softPeanut">
            {t('addedTime', {
              dateDistance: sNow.since(sDate).rounded,
            })}
          </Text>
        </div>
      ) : (
        <div className={styles.connect_sfdc_container}>
          <Button iconLeft="salesforce" onClick={() => generateSFDCUrl(false)}>
            {t('connectToSfdc')}
          </Button>
          <div className={styles.connect_sfdc_subtitle}>
            <Trans
              i18nKey="quickStartGuide.oto.blocks.sfdc.subtitle"
              components={[
                <Text key="0" color="softPeanut" size="s">
                  {''}
                </Text>,
                <span
                  key="1"
                  onClick={() => generateSFDCUrl(true)}
                  className={styles.sandboxLink}
                ></span>,
                <Text key="2" color="bloobirds" size="s">
                  {''}
                </Text>,
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};
