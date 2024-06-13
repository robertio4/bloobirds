import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Clipboard,
  ColorType,
  Icon,
  IconButton,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  TableCell,
  TableRow,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { formatDateAsText, parseUTCDateTimeToLocal } from '@bloobirds-it/utils';
import { capitalize } from 'lodash';

import { companyIdUrl, leadUrl, opportunityUrl } from '../../../app/_constants/routes';
import { ACTIONS, CRM } from '../../../constants/integrations';
import { toSentenceCase } from '../../../utils/strings.utils';
import CodeBlock from '../integrationsLogsTable/codeBlockModal/codeBlock/codeBlock';
import theme from '../integrationsLogsTable/codeBlockModal/codeBlock/theme';
import styles from '../integrationsLogsTable/codeBlockModal/codeBlockModal.module.css';
import { IntegrationLog, LogRowProps } from './types';

const checkStatus = (status: string) => {
  let color;

  switch (status) {
    case 'INIT':
    case 'WARNING':
      color = 'softBanana';
      break;
    case 'SUCCESS':
      color = 'grape';
      break;
    default:
      color = 'tomato';
  }
  return (
    <Label
      color={color as ColorType}
      overrideStyle={{
        boxSizing: 'border-box',
        padding: '4px 16px',
        width: '96px',
        height: '24px',
        textAlign: 'center',
      }}
      uppercase
    >
      {status}
    </Label>
  );
};

function generateBobejctUrl(bobjectType: string, bobjectId: string) {
  if (bobjectType === BOBJECT_TYPES.COMPANY) {
    return companyIdUrl(bobjectId);
  }
  if (bobjectType === BOBJECT_TYPES.LEAD) {
    return leadUrl(bobjectId);
  }
  return opportunityUrl(null, bobjectId);
}

export function LogRow({ log, integration, isOTOAccount }: LogRowProps) {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();

  const generateDescription = (objectType: string) => {
    const app = log.triggerName.match(/INBOUND/i) ? capitalize(integration) : 'Bloobirds';
    if (log.dataSent?.subscriptionType === 'custom.form.submissions') {
      return 'Form submission created in Hubspot';
    }

    switch (log.action) {
      case 'CREATE':
        if (objectType === BOBJECT_TYPES.ACTIVITY) {
          return 'New activity in Bloobirds';
        }
        if (log.externalObject === 'OpportunityContactRole') {
          return `Opportunity contact role created in ${app}`;
        }
        return `${objectType} created in ${app}`;
      case 'UPDATE':
        if (log.externalObject === 'OpportunityContactRole') {
          return `Opportunity contact role updated in ${app}`;
        }
        return `${objectType} updated in ${app}`;
      case 'UPDATEMANY':
        return `Many leads updated in ${app}`;
      case 'CREATEMANY':
        return `Many activities created in ${app}`;
      case 'DELETE':
        return `${objectType} deleted in ${app}`;
      case 'MERGE':
        return `${objectType} merged in ${app}`;
      case 'SEARCH':
      case 'GET':
        return 'Search';
      default:
        return 'Untitled action';
    }
  };

  const generateSyncDirection = (type: string) => {
    if (type.toLowerCase().includes('inbound')) {
      return (
        <span>
          {capitalize(integration)} <Icon name="arrowRight" color="peanut" size={12} /> Bloobirds
        </span>
      );
    }
    return (
      <span>
        Bloobirds <Icon name="arrowRight" color="peanut" size={12} /> {capitalize(integration)}
      </span>
    );
  };

  const actionVerbose = (action: keyof typeof ACTIONS) =>
    [ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE].includes(action)
      ? `${toSentenceCase(action)}`
      : '';

  const genericDescription = () => (
    <Text inline size="s">
      When a{' '}
      <Text inline size="s" color="bloobirds" weight="bold">
        {log.bobjectType}
      </Text>{' '}
      is{' '}
      <Text inline size="s" weight="bold">
        {actionVerbose(log.triggerName)}
      </Text>{' '}
      at Bloobirds <Icon name="arrowRight" color="softPeanut" size={18} />{' '}
      <Text inline size="s" weight="bold">
        {capitalize(log.action)} {capitalize(log.externalObject)}
      </Text>{' '}
      at {capitalize(integration)}
    </Text>
  );
  const triggerDescription = () => {
    if (integration !== CRM.HUBSPOT && integration !== CRM.SALESFORCE) {
      return genericDescription();
    }
    const trigger = log.triggerName;

    if (trigger.match(/LEAD/i) || trigger.match(/CONTACT/i)) {
      return generateDescription('Lead');
    }
    if (trigger.match(/COMPANY/i)) {
      return generateDescription('Company');
    }
    if (trigger.match(/QC/i)) {
      return generateDescription('Company');
    }
    if (trigger.match(/ACTIVITY/i)) {
      return generateDescription('Activity');
    }
    if (trigger.match(/MEETING/i)) {
      return generateDescription('Meeting');
    }
    if (trigger.match(/OPPORTUNITY_PRODUCT/i)) {
      return generateDescription('Opportunity Product');
    }
    if (trigger.match(/OPPORTUNITY/i)) {
      return generateDescription('Opportunity');
    }
    if (trigger.match(/PRODUCT/i)) {
      return generateDescription('Product');
    }
    if (trigger.match(/INBOUND/i)) {
      const objectType =
        log.externalObject.toString().charAt(0).toUpperCase() +
        log.externalObject.toString().slice(1).toLowerCase();
      return generateDescription(objectType);
    }
    return '';
  };

  const formatedDate = formatDateAsText({
    text: parseUTCDateTimeToLocal(log.timestamp, 'UTC'),
    patternFormat: '{month-short} {date-ordinal}, {time-24}',
    t,
  });

  const bobjectIdDisplay = (log: IntegrationLog) => {
    if (log.bobjectName) {
      return log.bobjectName;
    }
    if (log.bobjectId) {
      if (log.bobjectId.includes('/')) {
        return log.bobjectId.split('/')[2];
      }
      return log.bobjectId;
    }
    return '';
  };

  return (
    <>
      <TableRow
        onClick={log.error ? () => setOpenError(error => !error) : null}
        className={log.error ? styles.rowWithError : null}
      >
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {formatedDate}
          </Text>
        </TableCell>
        <TableCell>
          <div className={styles.bobjectIdCell}>
            <Text size="s" color="peanut" weight="regular">
              {bobjectIdDisplay(log)}
            </Text>
            {log.bobjectId &&
            !isOTOAccount &&
            (log.bobjectType === BOBJECT_TYPES.LEAD ||
              log.bobjectType === BOBJECT_TYPES.COMPANY ||
              log.bobjectType === BOBJECT_TYPES.OPPORTUNITY) ? (
              <IconButton
                className={styles.bobjectLink}
                name="link"
                color="bloobirds"
                size={16}
                onClick={event => {
                  window.open(generateBobejctUrl(log.bobjectType, log.bobjectId), '_blank');
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            ) : null}
          </div>
        </TableCell>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {log.bobjectType && log.bobjectType !== 'EMPTY' ? log.bobjectType : '-'}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {triggerDescription()}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color={'peanut'} weight="regular">
            {generateSyncDirection(log.integrationType)}
          </Text>
        </TableCell>
        <TableCell>
          <div className={styles.statusCell}>
            {checkStatus(log.status)}{' '}
            <Button
              iconLeft="info"
              variant="clear"
              size="small"
              color="bloobirds"
              uppercase={false}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                setOpen(open => !open);
              }}
            >
              Details
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {openError && log.error && (
        <TableRow className={styles.errorRow}>
          <TableCell colspan={6} className={styles.errorCell}>
            <div className={styles.errorContainer}>
              <Icon name="alertCircle" color="tomato" size={16} />
              {log.errorDescription && (
                <Text size="s" color="peanut" weight="medium">
                  {log.errorDescription}
                </Text>
              )}
              <Text size="xs" color="peanut" weight="regular">
                <em>{log.error}</em>
              </Text>
            </div>
          </TableCell>
        </TableRow>
      )}
      <Modal title="View Sync Log content" open={open} onClose={handleClose}>
        <ModalContent>
          <div className={styles._code_block_header}>
            <p>log info</p>
            <Clipboard
              text={JSON.stringify(
                Object.fromEntries(
                  Object.keys(log)
                    .filter(key => log[key as keyof IntegrationLog])
                    .map(key => [key, log[key as keyof IntegrationLog]]),
                ),
                null,
                2,
              )}
            />
          </div>
          <CodeBlock language="json" theme={theme}>
            {JSON.stringify(
              Object.fromEntries(
                Object.keys(log).map(key => [key, log[key as keyof IntegrationLog]]),
              ),
              null,
              2,
            )}
          </CodeBlock>
        </ModalContent>
        <div className={styles._modal_footer}>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}
