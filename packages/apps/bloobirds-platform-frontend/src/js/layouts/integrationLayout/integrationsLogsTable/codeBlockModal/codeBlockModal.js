import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Clipboard,
  Icon,
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
import PropTypes from 'prop-types';

import { ACTIONS, CRM } from '../../../../constants/integrations';
import { toSentenceCase } from '../../../../utils/strings.utils';
import CodeBlock from './codeBlock/codeBlock';
import theme from './codeBlock/theme.js';
import styles from './codeBlockModal.module.css';

const checkStatus = status => {
  let color;

  switch (status) {
    case 'INIT':
      color = 'softBanana';
      break;
    case 'SUCCESS':
      color = 'grape';
      break;
    default:
      color = 'softTangerine';
  }
  return (
    <Label
      color={color}
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
const CodeBlockModal = ({ data, crm }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(true);
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  const generateDescription = objectType => {
    const app = data.triggerName.match(/INBOUND/i) ? capitalize(crm) : 'Bloobirds';
    if (data.dataSent.subscriptionType === 'custom.form.submissions') {
      return 'Form submission created in Hubspot';
    }

    switch (data.action) {
      case 'CREATE':
        if (objectType === BOBJECT_TYPES.ACTIVITY) {
          return 'New activity in Bloobirds';
        }
        if (data.externalObject === 'OpportunityContactRole') {
          return `Opportunity contact role created in ${app}`;
        }
        return `${objectType} created in ${app}`;
      case 'UPDATE':
        if (data.externalObject === 'OpportunityContactRole') {
          return `Opportunity contact role updated in ${app}`;
        }
        return `${objectType} updated in ${app}`;
      case 'UPDATEMANY':
        return `Many leads updated in ${app}`;
      case 'CREATEMANY':
        return `Many activities created in ${app}`;
      case 'DELETE':
        return `${objectType} deleted in ${app}`;
      case 'SEARCH':
      case 'GET':
        return 'Search';
      default:
        return 'Untitled action';
    }
  };

  const generateSyncDirection = type => {
    if (type.toLowerCase().includes('inbound')) {
      return (
        <span>
          {capitalize(crm)} <Icon name="arrowRight" color="peanut" size="12" /> Bloobirds
        </span>
      );
    }
    return (
      <span>
        Bloobirds <Icon name="arrowRight" color="peanut" size="12" /> {capitalize(crm)}
      </span>
    );
  };

  const actionVerbose = action =>
    [ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE].includes(action)
      ? `${toSentenceCase(action)}`
      : '';

  const genericDescription = () => (
    <Text inline size="s">
      When a{' '}
      <Text inline size="s" color="bloobirds" weight="bold">
        {data.bobjectType}
      </Text>{' '}
      is{' '}
      <Text inline size="s" weight="bold">
        {actionVerbose(data.triggerName)}
      </Text>{' '}
      at Bloobirds <Icon name="arrowRight" color="softPeanut" size="18" />{' '}
      <Text inline size="s" weight="bold">
        {capitalize(data.action)} {capitalize(data.externalObject)}
      </Text>{' '}
      at {capitalize(crm)}
    </Text>
  );
  const triggerDescription = () => {
    if (crm !== CRM.HUBSPOT && crm !== CRM.SALESFORCE) {
      return genericDescription();
    }
    const trigger = data.triggerName;

    if (trigger.match(/LEAD/i)) {
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
        data.externalObject.toString().charAt(0).toUpperCase() +
        data.externalObject.toString().slice(1).toLowerCase();
      return generateDescription(objectType);
    }
    return '';
  };

  data.logDate = formatDateAsText({
    text: parseUTCDateTimeToLocal(data.date, 'UTC'),
    patternFormat: '{month-short} {date-ordinal}, {time-24}',
    t,
  });

  const bobjectIdDisplay = bobjectId => {
    if (bobjectId) {
      if (bobjectId.includes('/')) {
        return bobjectId.split('/')[2];
      }
      return bobjectId;
    }
    return '';
  };

  return (
    <>
      <TableRow onClick={handleToggle}>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {data.logDate}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {bobjectIdDisplay(data.bobjectId)}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {data.bobjectType ? data.bobjectType : '-'}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color="peanut" weight="regular">
            {triggerDescription()}
          </Text>
        </TableCell>
        <TableCell>
          <Text size="s" color={'peanut'} weight="regular">
            {generateSyncDirection(data.integrationType)}
          </Text>
        </TableCell>
        <TableCell>{checkStatus(data.status)}</TableCell>
      </TableRow>
      <Modal title="View Sync Log content" open={open} onClose={handleClose}>
        <ModalContent>
          <div className={styles._code_block_header}>
            <p>log info</p>
            <Clipboard
              text={JSON.stringify(
                Object.fromEntries(
                  Object.keys(data)
                    .filter(key => data[key])
                    .map(key => [key, data[key]]),
                ),
                null,
                2,
              )}
            />
          </div>
          <CodeBlock language="json" theme={theme}>
            {JSON.stringify(
              Object.fromEntries(Object.keys(data).map(key => [key, data[key]])),
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
};

CodeBlockModal.propTypes = {
  data: PropTypes.object,
};
export default CodeBlockModal;
