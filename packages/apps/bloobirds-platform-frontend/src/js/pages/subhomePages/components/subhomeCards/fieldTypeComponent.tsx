import React from 'react';

import { Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_TYPE,
  Bobject,
  BobjectField,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import Name from '../../../../components/name/name';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { getTaskLocalTime } from '../../../../utils/tasks.utils';
import styles from './card.module.css';
import { getNameComponentFields } from './card.utils';

const BOLD_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT,
  TASK_FIELDS_LOGIC_ROLE.TITLE,
];

const tooltipDictionary: { [key: string]: string } = {
  [COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS]: 'Nº of leads',
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: 'Company source',
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: 'Target market',
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: 'Buyer persona',
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: 'Lead source',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: 'Opportunity amount',
};

const iconDictionary: { [key: string]: IconType } = {
  [BobjectTypes.Company]: 'company',
  [BobjectTypes.Lead]: 'person',
  [BobjectTypes.Opportunity]: 'fileOpportunity',
};

export const NameComponent = ({
  value,
  bobject,
}: {
  value: BobjectField | Bobject;
  bobject: Bobject;
}) => {
  const { name, bobjectType, bobjectToOpen } = getNameComponentFields(value, bobject);
  const icon = iconDictionary[bobjectType];

  return (
    <>
      {icon && (
        <div className={styles._icon_wrapper}>
          <Icon name={icon} color="verySoftBloobirds" />
        </div>
      )}
      <div className={styles._name_container}>
        <Tooltip title={name?.length > 40 ? name : `${bobjectType} name`} position="top">
          <Name name={name} bobject={bobjectToOpen} />
        </Tooltip>
      </div>
    </>
  );
};

export const PlainTextComponent = ({
  value,
  logicRole,
  ellipsis = 20,
}: {
  value: string | BobjectField;
  logicRole: string;
  ellipsis?: number;
}) => {
  if (logicRole === COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS)
    value = `${value || 0} ${value !== '1' ? 'leads' : 'lead'}`;
  if (logicRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT)
    value = `${new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(+value)}`;
  const isBoldFont = BOLD_FIELDS.includes(logicRole);
  if (typeof value !== 'string') return null;

  return (
    <Tooltip title={value.length > ellipsis ? value : tooltipDictionary[logicRole]} position="top">
      <div className={styles._number_leads_wrapper}>
        <Text
          size="s"
          color={isBoldFont ? 'peanut' : 'softPeanut'}
          weight={isBoldFont ? 'medium' : 'regular'}
          ellipsis={ellipsis}
        >
          {value}
        </Text>
      </div>
    </Tooltip>
  );
};

export const CurrentLocalTime = ({ task }: { task: Bobject }) => {
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const isScheduledEmail = type === TASK_TYPE.SCHEDULED_EMAIL;
  const currentTime = getTaskLocalTime(task);
  return (
    <>
      {!isScheduledEmail && currentTime && (
        <Tooltip title={currentTime?.length > 20 && currentTime} position="top">
          <div className={clsx(styles._now_time, styles._m_hidden)}>
            <Icon name="clock" size={20} color="darkBloobirds" />
            <Text size="s" color="darkBloobirds" ellipsis={20}>
              {currentTime}
            </Text>
          </div>
        </Tooltip>
      )}
    </>
  );
};
