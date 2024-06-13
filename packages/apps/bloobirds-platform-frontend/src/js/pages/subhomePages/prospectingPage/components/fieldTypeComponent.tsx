import React from 'react';
import { useTranslation } from 'react-i18next';

import { ColorType, Icon, IconButton, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  CompanyOrLeadLR,
  FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  Bobject,
  BobjectField,
  BobjectType,
} from '@bloobirds-it/types';
import { removeHtmlTags, formatDate, formatDateAsText } from '@bloobirds-it/utils';
import clsx from 'clsx';

import Name from '../../../../components/name/name';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';
import { addHttpIfNeeded } from '../../../../utils/url.utils';
import styles from '../../components/subhomeCards/card.module.css';
import { getNameComponentFields } from '../../components/subhomeCards/card.utils';

const BOLD_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
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

const getTooltipTitle = (
  bobjectType: BobjectType | string,
  name: string,
  bobjectToOpen: Bobject,
) => {
  if ((name?.includes('Attempt') || name?.includes('Step')) && bobjectType === BobjectTypes.Task) {
    const description = getTextFromLogicRole(bobjectToOpen, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
    const referencedBobject = getTaskReferenceBobject(bobjectToOpen);
    const referencedBobjectType = referencedBobject?.id?.typeName;
    const cadenceName = getTextFromLogicRole(
      referencedBobject,
      (FIELDS_LOGIC_ROLE[referencedBobjectType] as CompanyOrLeadLR)?.CADENCE,
    );
    return description
      ? removeHtmlTags(description)
      : removeHtmlTags(cadenceName ? ` Cadence : ${cadenceName}` : '');
  } else if (!name && bobjectType === 'Email') {
    return 'Lead email';
  } else {
    return name?.length > 40 ? name : `${bobjectType} name`;
  }
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
  const isTask = bobjectType === BobjectTypes.Task;
  let nameValue = name;
  let tooltipTitle = getTooltipTitle(bobjectType, name, bobjectToOpen);
  if (!name) {
    nameValue = getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
    if (!nameValue) {
      const referenceBobject = getReferencedBobjectFromLogicRole(
        bobject,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
      );
      nameValue = getValueFromLogicRole(referenceBobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
    }
    tooltipTitle = getTooltipTitle('Email', name, bobjectToOpen);
  }

  return isTask ? (
    <div className={styles._title}>
      <Tooltip title={nameValue?.length > 20 ? nameValue : tooltipTitle} position="top">
        <Text size="s" weight="medium" inline ellipsis={20}>
          {nameValue}
        </Text>
      </Tooltip>
    </div>
  ) : (
    <>
      {icon && (
        <div className={styles._icon_wrapper}>
          <Icon name={icon} color="verySoftBloobirds" />
        </div>
      )}
      <div className={styles._name_container}>
        <Tooltip title={tooltipTitle} position="top">
          <Name name={nameValue || `Untitled ${bobjectType}`} bobject={bobjectToOpen} />
        </Tooltip>
      </div>
    </>
  );
};

interface TextProps {
  color: ColorType;
  weight: 'medium' | 'regular' | 'bold' | 'heavy';
  ellipsis: number;
}

export const PlainTextComponent = ({ value, logicRole }: { value: string; logicRole: string }) => {
  if (logicRole === COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS)
    value = `${value || 0} ${value !== '1' ? 'leads' : 'lead'}`;
  if (logicRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT)
    value = `${new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(+value)}`;
  const isBoldFont = BOLD_FIELDS.includes(logicRole);
  const props: TextProps = isBoldFont
    ? {
        color: 'peanut',
        weight: 'medium',
        ellipsis: 20,
      }
    : { color: 'softPeanut', weight: 'regular', ellipsis: 20 };
  if (typeof value !== 'string' && value?.text) value = value.text;

  return (
    <Tooltip title={value?.length > 20 ? value : tooltipDictionary[logicRole]} position="top">
      <div className={styles._number_leads_wrapper}>
        <Text size="s" {...props}>
          {value}
        </Text>
      </div>
    </Tooltip>
  );
};

export const ScheduledDatetime = ({ value }: { value: string }) => {
  const { t } = useTranslation();
  return (
    <div className={styles._datetime}>
      <Tooltip title="Scheduled time" position="top">
        <Text
          size="s"
          color="bloobirds"
          weight="bold"
          htmlTag="span"
          className={styles._datetime_hour}
        >
          {formatDateAsText({ text: value, patternFormat: '{time}', t })}{' '}
        </Text>
        <Text size="s" color="bloobirds" htmlTag="span" className={styles._time}>
          {formatDateAsText({ text: value, patternFormat: '{month-short} {date-ordinal}', t })}
        </Text>
      </Tooltip>
    </div>
  );
};

export const TimeZoneDisplay = ({ bobject }: { bobject: Bobject }) => {
  const company: Bobject = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);

  return (
    <>
      {companyCountry && (
        <div className={clsx(styles._country, styles._s_hidden)}>
          <Tooltip title="Company country" position="top">
            <Text size="s" color="peanut">
              {companyCountry}
            </Text>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export const RelatedActivityTime = ({ bobject }: { bobject: Bobject }) => {
  const status = getTextFromLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.STATUS);
  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);
  const activityRelated = getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.MEETING_ACTIVITY)
    ?.referencedBobject;
  const activityRelatedDatetime = getValueFromLogicRole(
    activityRelated,
    ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  );

  return activityRelatedDatetime ? (
    <div className={styles._title}>
      <Tooltip title={''} position="top">
        <Text
          dataTest="Task-Card-ActivityRelatedDatetime"
          size="s"
          ellipsis={25}
          color="darkBloobirds"
          decoration={isCompleted ? 'line-through' : ''}
          inline
        >
          <b>Scheduled on:</b>{' '}
          {activityRelatedDatetime && formatDate(new Date(activityRelatedDatetime), 'MMM dd HH:mm')}
        </Text>
      </Tooltip>
    </div>
  ) : (
    <></>
  );
};

export const LinkedinComponent = ({ value }: { value: string | Bobject | BobjectField }) => {
  return (
    <IconButton
      size={20}
      name="linkedin"
      color="bloobirds"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        window.open(addHttpIfNeeded(value) as string, '_blank');
      }}
    />
  );
};
