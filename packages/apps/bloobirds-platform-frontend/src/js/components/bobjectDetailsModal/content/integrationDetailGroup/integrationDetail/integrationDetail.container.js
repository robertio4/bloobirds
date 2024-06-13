import React, { useEffect, useState } from 'react';
import IntegrationDetail from './integrationDetail.view';
import PropTypes from 'prop-types';
import isAfter from 'date-fns/isAfter';
import { poll } from './integrationDetail.util';
import { useToasts } from '@bloobirds-it/flamingo-ui';
import SessionManagerFactory from '../../../../../misc/session';
import { CRM } from '../../../../../constants/integrations';
import { api } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

const IntegrationDetailContainer = ({ bobjectType, bobjectId, integration, ...rest }) => {
  const [lastLog, setLastLog] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [syncFailed, setSyncFailed] = useState(false);
  const [logChanged, setLogChanged] = useState(false);
  const { createToast } = useToasts();
  const SessionManager = SessionManagerFactory();
  const integrationType =
    integration.type === CRM.HUBSPOT
      ? ['HUBSPOT', 'INBOUND_HUBSPOT']
      : ['SALESFORCE', 'INBOUND_SALESFORCE'];

  useEffect(() => {
    if (syncFailed && !logChanged && !loading) {
      createToast({
        type: 'warning',
        message: 'The search took too long, please try again in a few minutes.',
        position: 'top-right',
      });
    }
    if (syncFailed && logChanged && !loading) {
      createToast({
        type: 'warning',
        message: 'Synchronisation has returned an error, check the detail to find out more.',
        position: 'top-right',
      });
    }
    if (!syncFailed && logChanged && !loading) {
      createToast({
        type: 'success',
        message: 'Object has been synced successfully',
        position: 'top-right',
      });
    }
  }, [syncFailed, loading, logChanged]);

  //TODO: add the feature flag here, to retrieve the logs from timescale
  const requestLog = () => {
    return api
      .get(
        `/logging/v2/logs/integrations/${SessionManager.getAccount().id}?${new URLSearchParams({
          integrationType,
          page: 1,
          size: 1,
          bobjectId: bobjectId,
          dateTo: new Date().toISOString(),
          dateFrom: spacetime().subtract(90, 'day').toNativeDate().toISOString(),
        })}`,
      )
      .then(response => response?.data);
  };

  const pollLogRefresh = () => {
    const checkLogDate = response => {
      const currentDate = new Date(
        lastLog?.date?.year,
        lastLog?.date?.monthValue - 1,
        lastLog?.date?.dayOfMonth,
        lastLog?.date?.hour,
        lastLog?.date?.minute,
        lastLog?.date?.second,
      );
      if (response?.content?.length > 0) {
        const log = response?.content[0];
        const logDate = new Date(
          log?.date?.year,
          log?.date?.monthValue - 1,
          log?.date?.dayOfMonth,
          log?.date?.hour,
          log?.date?.minute,
          log?.date?.second,
        );
        return isAfter(logDate, currentDate);
      }
      return false;
    };
    setLoading(true);
    setLogChanged(false);
    setSyncFailed(false);
    poll({ fn: requestLog, validate: checkLogDate, interval: 1000, maxAttempts: 10 })
      .then(response => {
        const log = response?.content[0];
        log.hasError = log?.status === 'FAILED';
        setLastLog({ ...log });
        setLogChanged(true);
        setLoading(false);
        if (log.hasError) {
          setSyncFailed(true);
        }
      })
      .catch(() => {
        setSyncFailed(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (bobjectId && refresh) {
      if (!loading) {
        setLoading(true);
      }
      requestLog()
        .then(response => {
          if (response?.logs?.length > 0) {
            const log = response?.logs[0];
            log.hasError = log?.status === 'FAILED';
            setLastLog({ ...log });
          }
          setLoading(false);
          setRefresh(false);
        })
        .catch(() => {
          setLoading(false);
          setRefresh(false);
        });
    } else {
      setLoading(false);
      setRefresh(false);
    }
  }, [integration.type, refresh]);

  return (
    <IntegrationDetail
      {...rest}
      log={lastLog}
      integration={integration}
      loading={loading}
      bobjectId={bobjectId}
      bobjectType={bobjectType}
      setLoading={setLoading}
      pollLogRefresh={pollLogRefresh}
    />
  );
};

IntegrationDetailContainer.propTypes = {
  bobjectId: PropTypes.string,
  bobjectType: PropTypes.string,
  externalId: PropTypes.string,
  iconColor: PropTypes.string,
  integration: PropTypes.object,
};

export default IntegrationDetailContainer;
