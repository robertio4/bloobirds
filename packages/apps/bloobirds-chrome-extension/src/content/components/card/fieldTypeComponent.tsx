import { useTranslation } from 'react-i18next';

import {
  ColorType,
  Icon,
  IconButton,
  IconType,
  Label,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectField,
  BobjectType,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  CustomTask,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
  TASK_TYPE,
  CompanyOrLeadLR,
} from '@bloobirds-it/types';
import {
  convertHtmlToString,
  formatDateAsText,
  getFieldByLogicRole,
  getNameComponentFields,
  getTaskLocalTime,
  getTaskReferenceBobject,
  getTaskText,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isCadenceTask,
  isScheduledTask,
  isMeetingTypeTask,
  parseCurrency,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { getReferencedBobjectFromLogicRole } from '../../../utils/bobjects.utils';
import { addHttpIfNeeded } from '../../../utils/url';
import { Name } from '../name/name';
import styles from './card.module.css';

const BOLD_FIELDS = [
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  LEAD_FIELDS_LOGIC_ROLE.ICP,
  TASK_FIELDS_LOGIC_ROLE.TITLE,
];

const tooltipDictionary: { [key: string]: string } = {
  [COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS]: 'numberOfLeads',
  [COMPANY_FIELDS_LOGIC_ROLE.SOURCE]: 'companySource',
  [COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET]: 'targetMarket',
  [LEAD_FIELDS_LOGIC_ROLE.ICP]: 'buyerPersona',
  [LEAD_FIELDS_LOGIC_ROLE.SOURCE]: 'leadSource',
  [OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT]: 'opportunityAmount',
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
  t: TFunction,
) => {
  if (name?.includes('Attempt') && bobjectType === BobjectTypes.Task) {
    const description = getTextFromLogicRole(bobjectToOpen, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
    const referencedBobject = getTaskReferenceBobject(bobjectToOpen);
    const referencedBobjectType = referencedBobject?.id?.typeName;
    const cadenceName = getTextFromLogicRole(
      referencedBobject,
      // @ts-ignore
      (FIELDS_LOGIC_ROLE[referencedBobjectType] as CompanyOrLeadLR)?.CADENCE,
    );
    return removeHtmlTags(
      `${description || ''}${cadenceName ? ` ${t('common.cadence')} : ${cadenceName}` : ''}`,
    );
  } else if (!name && bobjectType === 'Email') {
    return t('extension.card.leadEmail');
  } else {
    return name;
  }
};

export const NameComponent = ({
  value,
  bobject,
  shrinkName = true,
  showIcon = true,
  isBody = false,
  customTasks,
}: {
  value: BobjectField | Bobject;
  bobject: Bobject;
  shrinkName?: boolean;
  showIcon?: boolean;
  isBody?: boolean;
  customTasks?: CustomTask[];
}) => {
  const { t } = useTranslation();
  const { name, bobjectType, bobjectToOpen } = getNameComponentFields(value, bobject);
  const icon = iconDictionary[bobjectType];
  const isTask = bobjectType === BobjectTypes.Task;
  const isScheduled = isTask && isScheduledTask(bobject);
  const isCadence = isTask && isCadenceTask(bobject);
  const isContactBeforeMeeting = isTask && isMeetingTypeTask(bobject);
  const isScheduledDescription = isScheduled && isBody;

  let nameValue = name;
  let cadenceName = null;
  let tooltipTitle = getTooltipTitle(bobjectType, name, bobjectToOpen, t);
  if (!name) {
    const isLead = bobjectType === BobjectTypes.Lead;
    nameValue = getValueFromLogicRole(
      isLead ? bobjectToOpen : bobject?.id?.typeName === BobjectTypes.Lead ? bobject : undefined,
      LEAD_FIELDS_LOGIC_ROLE.EMAIL,
      true,
    );
    if (!nameValue) {
      const referenceBobject = getReferencedBobjectFromLogicRole(
        bobject,
        TASK_FIELDS_LOGIC_ROLE.LEAD,
      );
      nameValue = getValueFromLogicRole(referenceBobject, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
    }
    tooltipTitle = getTooltipTitle('Email', name, bobjectToOpen, t);
  }

  if (isScheduled || isCadence || isContactBeforeMeeting) {
    nameValue = getTaskText(bobject, 'Title', customTasks, true, t);
    if (isCadence && isTask) {
      const relatedBobject = getTaskReferenceBobject(bobject);
      cadenceName = getTextFromLogicRole(
        relatedBobject,
        FIELDS_LOGIC_ROLE[relatedBobject?.id?.typeName]?.CADENCE,
      );
    }
  }

  return isTask ? (
    <div className={clsx({ [styles._title]: !isScheduledDescription })} style={{ paddingRight: 4 }}>
      <Tooltip
        title={!isScheduledDescription && (nameValue?.length > 42 ? nameValue : tooltipTitle)}
        position="top"
      >
        <Text
          size="xs"
          weight="medium"
          inline={!isScheduledDescription}
          ellipsis={!isScheduledDescription ? 42 : undefined}
        >
          {nameValue}
        </Text>
        {isCadence && <CadenceName cadenceName={cadenceName} />}
      </Tooltip>
    </div>
  ) : (
    <>
      {icon && showIcon && (
        <div className={styles._icon_wrapper}>
          <Icon size={16} name={icon} color="verySoftBloobirds" />
        </div>
      )}
      <div className={styles._name_container} style={{ flexShrink: shrinkName ? 1 : 0 }}>
        <Tooltip title={tooltipTitle} position="top">
          <Name
            name={nameValue || t('bobjectNameUndefined', { bobjectType })}
            bobject={bobjectToOpen}
          />
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

export const PlainTextComponent = ({
  value,
  logicRole,
  isBody = false,
}: {
  value: string;
  logicRole: string;
  isBody?: boolean;
}) => {
  const { t } = useTranslation();
  if (logicRole === COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS)
    value = `${value || 0} ${value !== '1' ? 'leads' : 'lead'}`;

  const isBoldFont = BOLD_FIELDS.includes(
    logicRole as COMPANY_FIELDS_LOGIC_ROLE | LEAD_FIELDS_LOGIC_ROLE | TASK_FIELDS_LOGIC_ROLE,
  );

  const props: TextProps = isBoldFont
    ? {
        color: 'peanut',
        weight: 'medium',
        ellipsis: 35,
      }
    : {
        color: isBody ? 'peanut' : 'softPeanut',
        weight: 'regular',
        ellipsis: isBody ? undefined : 35,
      };

  if (typeof value !== 'string' && (value as { text: string })?.text)
    value = (value as { text: string }).text;

  return (
    <Tooltip
      title={value?.length > 35 ? value : t(`extension.card.${tooltipDictionary[logicRole]}`)}
      position="top"
    >
      <div className={styles._number_leads_wrapper}>
        <Text size="xs" {...props} className={styles._plain_component}>
          {value}
        </Text>
      </div>
    </Tooltip>
  );
};

export const DescriptionComponent = ({ value }: { value: string }) => (
  <Text size="xs" weight="medium" className={styles._description}>
    {convertHtmlToString(value)}
  </Text>
);

export const AmountComponent = ({ value, logicRole }: { value: string; logicRole: string }) => {
  const { t } = useTranslation();
  const dataModel = useDataModel();
  const { prefix, suffix } =
    dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};

  const props: TextProps = {
    color: 'peanut',
    weight: 'medium',
    ellipsis: 20,
  };

  return (
    <Tooltip
      title={value?.length > 20 ? value : t(`extension.card.${tooltipDictionary[logicRole]}`)}
      position="top"
    >
      <div className={styles._amount_wrapper}>
        <Text size="xs" {...props} className={styles._plain_component}>
          {prefix ? prefix : ''} {parseCurrency(value)} {suffix ? suffix : ''}
        </Text>
      </div>
    </Tooltip>
  );
};

export const ScheduledDateTime = ({
  scheduledDateTime,
  isOverdue,
  isCadence = false,
}: {
  scheduledDateTime: string | Date;
  isOverdue: boolean;
  isCadence?: boolean;
}) => {
  const { t } = useTranslation();
  if (!scheduledDateTime) return <></>;

  return (
    <Tooltip title={isOverdue && 'Overdue'} position="top">
      <div className={styles._datetime}>
        {!isCadence && (
          <Text size="xs" color={isOverdue ? 'tomato' : 'darkBloobirds'}>
            {formatDateAsText({ text: scheduledDateTime, patternFormat: '{time-24}', t })}
          </Text>
        )}
        <Text size="xs" color={isOverdue ? 'tomato' : 'darkBloobirds'}>
          {formatDateAsText({ text: scheduledDateTime, patternFormat: t('dates.shortMonth'), t })}
        </Text>
      </div>
    </Tooltip>
  );
};

export const PriorityLabel = ({
  priority,
  showOnlyImportant,
}: {
  priority: string | BobjectField;
  showOnlyImportant?: boolean;
}) => {
  if (!priority) return null;
  const dataModel = useDataModel();
  const priorityTasks = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);

  const id = typeof priority === 'string' ? priority : priority?.value;

  const priorityFieldValue = priorityTasks?.find(priorityTask => priorityTask.id === id);
  const isImportant = priorityFieldValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;

  if (showOnlyImportant && !isImportant) return null;

  return (
    <div className={styles.priority_container}>
      <Label
        overrideStyle={{
          backgroundColor: priorityFieldValue?.backgroundColor,
          color: priorityFieldValue?.textColor,
          borderColor: priorityFieldValue?.backgroundColor,
          textTransform: 'initial',
        }}
        size={'small'}
      >
        {isImportant && <Icon name="flagFilled" size={12} color="softTomato" />}{' '}
      </Label>
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
            <Text size="xs" color="peanut">
              {companyCountry}
            </Text>
          </Tooltip>
        </div>
      )}
    </>
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

export const CurrentLocalTime = ({ task }: { task: Bobject<BobjectTypes.Task> }) => {
  const type = getFieldByLogicRole(task, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)
    ?.valueLogicRole as string;
  const isScheduledEmail = type === TASK_TYPE.SCHEDULED_EMAIL;
  const currentTime = getTaskLocalTime(task);
  return (
    <>
      {!isScheduledEmail && currentTime && (
        <Tooltip title={currentTime?.length > 20 && currentTime} position="top">
          <div className={clsx(styles._now_time, styles._m_hidden)}>
            <Icon name="clock" size={20} color="darkBloobirds" />
            <Text size="xs" color="darkBloobirds" ellipsis={20}>
              {currentTime}
            </Text>
          </div>
        </Tooltip>
      )}
    </>
  );
};

export const CadenceName = ({ cadenceName }: { cadenceName: string }) => {
  return cadenceName ? (
    <div className={styles._cadence_name}>
      <div className={styles._separator} />
      <Icon name="cadence" size={18} color="softPeanut" />
      <Text size="xs" color="peanut" className={styles._cadence_name_text}>
        {cadenceName}
      </Text>
    </div>
  ) : (
    <></>
  );
};
