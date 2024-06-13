import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Spinner, Text, Tooltip, Label } from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { api, formatDateAsText, parseUTCDateTimeToLocal } from '@bloobirds-it/utils';
import classnames from 'classnames';
import ProptTypes from 'prop-types';

import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
} from '../../../../../app/_constants/routes';
import { CRM, CRM_DISPLAY_NAME, LOG_STATUS, ORIGIN } from '../../../../../constants/integrations';
import { useBobjectDetailsVisibility, useRouter } from '../../../../../hooks';
import { BobjectApi } from '../../../../../misc/api/bobject';
import { toTitleCase } from '../../../../../utils/strings.utils';
import styles from './integrationDetail.module.css';

const IntegrationDetailView = ({
  integration,
  iconColor,
  log,
  loading,
  bobjectType,
  bobjectId,
  externalId,
  setLoading,
  pollLogRefresh,
  externalObjectType,
}) => {
  const [errorExpanded, setErrorExpanded] = useState(false);
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const { history } = useRouter();
  const { t } = useTranslation();

  const getStatusText = (lastLog, extId) => {
    if (lastLog?.hasError) {
      return LOG_STATUS.SYNC_ERROR;
    }
    if (!extId) {
      return LOG_STATUS.NOT_SYNCED;
    }

    if (!lastLog) {
      return LOG_STATUS.NO_LOGS;
    }

    return LOG_STATUS.SYNCED;
  };

  const getTooltipText = status => {
    switch (status) {
      case LOG_STATUS.NO_LOGS:
        return (
          'This object has no logs, it may not have \n' + 'been updated for more than 3 months.'
        );
      case LOG_STATUS.NOT_SYNCED:
        return 'This object is not synced with the CRM';
      case LOG_STATUS.SYNCED:
      case LOG_STATUS.SYNC_ERROR:
        return `Last update ${formatDateAsText({
          text: parseUTCDateTimeToLocal(log.date, 'UTC'),
          patternFormat: '{month-short} {date-ordinal}, {time-24}',
          t,
        })}`;
    }
  };
  const direction = log?.integrationType?.toLowerCase().includes('inbound')
    ? ORIGIN.CRM
    : ORIGIN.BLOOBIRDS;

  const getDirectionText = lastLog => {
    const bloobirds = (
      <Text size="s" color="peanut">
        Bloobirds
      </Text>
    );

    const crm = (
      <Text size="s" color="peanut">
        {CRM_DISPLAY_NAME[integration.type]}
      </Text>
    );
    const arrow = <Icon name="arrowRight" color={iconColor} size="16" className={styles.arrow} />;
    const listOrder = [bloobirds, arrow, crm];
    if (lastLog?.integrationType?.toLowerCase().includes('inbound')) {
      return <>{listOrder?.reverse().map(component => component)}</>;
    }
    return <>{listOrder?.map(component => component)}</>;
  };

  const statusText = getStatusText(log, externalId);
  const tooltipText = getTooltipText(statusText);

  const statusClass = classnames(styles.sync_status, {
    [styles.sync_status_synced]: statusText === LOG_STATUS.SYNCED,
    [styles.sync_status_no_logs]: [LOG_STATUS.NO_LOGS, LOG_STATUS.NOT_SYNCED].includes(statusText),
    [styles.sync_status_error]: statusText === LOG_STATUS.SYNC_ERROR,
  });

  const SLUG_BY_BOBJECT = Object.freeze({
    [BOBJECT_TYPES.OPPORTUNITY]: 'deal',
    [BOBJECT_TYPES.LEAD]: 'contact',
    [BOBJECT_TYPES.COMPANY]: 'company',
  });
  const openInCRM = () => {
    const slug = SLUG_BY_BOBJECT[bobjectType];
    let viewInCrmUrl;
    if (integration?.type === CRM.HUBSPOT) {
      viewInCrmUrl = `https://app.hubspot.com/contacts/${integration?.portalId}/${slug}/${externalId}`;
    }

    if (integration?.type === CRM.SALESFORCE) {
      viewInCrmUrl = `${integration?.instanceHost}/${externalId}`;
    }
    window.open(viewInCrmUrl, '_blank');
  };

  const goToLogs = e => {
    const query = {
      page: 0,
      pageSize: 25,
      bobjectType: bobjectType.toUpperCase(),
      dateRange: 'all_time',
      textSearch: bobjectId,
      bobjectId: bobjectId,
    };
    const queryString = new URLSearchParams(query).toString();
    history.push(
      `${
        integration.type === CRM.SALESFORCE
          ? APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS
          : APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS
      }?${queryString}`,
      { event: e },
    );
    closeBobjectDetailsModal();
  };

  const syncBloobirds = () => {
    if (
      [BOBJECT_TYPES.LEAD, BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.OPPORTUNITY].includes(bobjectType)
    ) {
      BobjectApi.request()
        .bobjectType(bobjectType)
        .partialSet({ bobjectId, data: { params: { noIntegrationCheck: true }, contents: {} } })
        .then(pollLogRefresh);
    }
  };

  const syncCRM = () => {
    const endpoint =
      integration.type === CRM.SALESFORCE
        ? '/service/salesforce/bobject/resync'
        : '/hubspot/bobject/resync';
    api
      .post('/utils' + endpoint, {
        bobjectType: bobjectType?.toUpperCase(),
        externalObjectId: externalId,
        externalObjectType,
      })
      .then(pollLogRefresh);
  };

  const onClickSync = () => {
    setLoading(true);
    setErrorExpanded(false);
    if (direction === ORIGIN.BLOOBIRDS) {
      syncBloobirds();
    } else {
      syncCRM();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div className={styles.name}>
          <Icon
            name={integration?.type?.toLowerCase()}
            color={iconColor}
            className={styles.icon}
            size={16}
          />
          <Text size="m" color="peanut" align="center" className={styles.integration_title}>
            {CRM_DISPLAY_NAME[integration?.type]}
          </Text>
        </div>
        <div className={styles.icon_group}>
          {log && (
            <Tooltip title="View logs" position="bottom">
              <IconButton
                name="alignJustify"
                size={16}
                className={styles.icon_group_icon}
                onClick={goToLogs}
              />
            </Tooltip>
          )}
          {log && log?.hasError && (
            <Tooltip title="Sync" position="bottom">
              <IconButton
                name="refresh"
                size={16}
                onClick={onClickSync}
                className={styles.icon_group_icon}
                disabled={loading}
              />
            </Tooltip>
          )}
          {externalId && (
            <Tooltip title={`View in ${toTitleCase(integration?.type)}`} position="bottom">
              <IconButton
                name="externalLink"
                size={16}
                className={styles.icon_group_icon}
                onClick={openInCRM}
              />
            </Tooltip>
          )}
          {integration.type === 'SALESFORCE' && externalId && (
            <div className={styles.sync_sf_container}>
              <Label
                size="small"
                color={externalObjectType === 'Lead' ? 'softTangerine' : 'gradientPurple'}
                textColor="white"
                overrideStyle={{ fontSize: '10px' }}
                uppercase={false}
                icon={externalObjectType === 'Account' ? 'company' : 'personBody'}
              >
                {externalObjectType}
              </Label>
            </div>
          )}
          {!loading && (
            <Tooltip title={tooltipText} position="top">
              <div className={statusClass}>{statusText}</div>
            </Tooltip>
          )}
          {loading && <Spinner name="loadingCircle" size={12} />}
          {log && log?.hasError && !loading && (
            <IconButton
              name={errorExpanded ? 'minusSquare' : 'plusSquare'}
              size={16}
              className={styles.expand_icon}
              onClick={() => setErrorExpanded(!errorExpanded)}
            />
          )}
        </div>
      </div>
      {log && log?.hasError && errorExpanded && !loading && (
        <div className={styles.error_body}>
          <div className={styles.sync_direction}>{getDirectionText(log)}</div>
          <div className={styles.error_body_text}>
            <Text size="s" color="darkBloobirds">
              {log?.error}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

IntegrationDetailView.propTypes = {
  bobjectId: ProptTypes.string,
  bobjectType: ProptTypes.string,
  externalId: ProptTypes.string,
  externalObjectType: ProptTypes.string,
  iconColor: ProptTypes.string,
  integration: ProptTypes.object,
  loading: ProptTypes.bool,
  log: ProptTypes.object,
};

export default IntegrationDetailView;
