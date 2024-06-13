import React, { Suspense } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  CircularBadge,
  Icon,
  IconType,
  Skeleton,
  Tab,
  TabGroup,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, useCrmStatus } from '@bloobirds-it/hooks';
import { CrmStatusMapping, CrmStatusResponse } from '@bloobirds-it/types';

import { useActiveUser } from '../../../hooks';
import SessionManagerFactory from '../../../misc/session';
import NoPermissionsPage from '../../noPermissionsPage';
import { crmObjects } from './crmStatus.constants';
import styles from './crmStatus.module.css';
import CrmStatusTabTemplate from './crmStatusTabTemplate/crmStatusTabTemplate';

const CrmStatus = () => {
  const roleManager = SessionManagerFactory().getRoleManager();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });
  const { activeAccount } = useActiveUser();
  const { crmStatusList, mutateList } = useCrmStatus(
    activeAccount.id,
    crmObjects.map(crmObject => crmObject.crmObject),
    'SALESFORCE',
    isNoStatusPlanAccount,
  );

  if (!roleManager.isAccountAdmin()) {
    return <NoPermissionsPage />;
  }
  return (
    <Suspense fallback={<Skeleton variant="rect" height={300} width="100%" />}>
      <div className={styles._container}>
        <div className={styles._header}>
          <div className={styles._leftContent}>
            <div className={styles._title}>
              <Text htmlTag="h3" size="xl" weight="medium" color="peanut">
                {t('title')}
              </Text>
            </div>
            <div className={styles._subtitle}>
              <Text htmlTag="h4" size="xs" className={styles._subtitleText}>
                <Trans i18nKey="accountSettings.crmStatus.subtitle" />
              </Text>
            </div>
          </div>
          <div className={styles._infoBlock}>
            <Text htmlTag="p" size="xs">
              <Trans i18nKey="accountSettings.crmStatus.infoStatus.active" />
              <br />
              <Trans i18nKey="accountSettings.crmStatus.infoStatus.nurturing" />
              <br />
              <Trans i18nKey="accountSettings.crmStatus.infoStatus.inactive" />
              <br />
              <Trans i18nKey="accountSettings.crmStatus.infoStatus.lost" />
              <br />
              <Trans i18nKey="accountSettings.crmStatus.infoStatus.won" />
              <br />
            </Text>
            <span role="img" aria-label="Lightbulb" className={styles._lightbulbIcon}>
              💡
            </span>
          </div>
        </div>
        <TabGroup>
          {crmObjects.map(crmObject => {
            const crmStatus = crmStatusList?.find(
              (crmStatusItem: CrmStatusResponse) =>
                crmStatusItem.crmObjectType == crmObject.crmObject,
            );
            const hasEmptyMapping =
              crmStatus?.crmStatusMappingList &&
              crmStatus?.crmStatusMappingList?.some(
                (crmStatusMapping: CrmStatusMapping) =>
                  crmStatusMapping.statusCategoryId === null ||
                  crmStatusMapping.statusCategoryId === '',
              );
            return (
              <Tab
                name={crmObject.label}
                key={`${crmObject.crmObject}-key`}
                iconLeft={crmObject.icon as IconType}
                extra={
                  hasEmptyMapping
                    ? (((
                        <Tooltip title={'Unassigned statuses'} position="top">
                          <CircularBadge size="small" className={styles._circularBadge}>
                            {
                              ((
                                <Icon name="alertTriangle" color="banana" size={20} />
                              ) as unknown) as string
                            }
                          </CircularBadge>
                        </Tooltip>
                      ) as unknown) as string)
                    : undefined
                }
              >
                <CrmStatusTabTemplate
                  crmObject={crmObject.crmObject}
                  crmStatus={crmStatus}
                  mutateList={mutateList}
                />
              </Tab>
            );
          })}
        </TabGroup>
      </div>
    </Suspense>
  );
};

export default CrmStatus;
