import { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import { CardBody, Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useIsB2CAccount } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectField,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  UserPermission,
} from '@bloobirds-it/types';
import {
  generateBobjectBasedData,
  getFieldByLogicRole,
  getTaskReferenceBobject,
  isCadenceTask,
} from '@bloobirds-it/utils';
import { v4 as uuid } from 'uuid';

import { useExtensionContext } from '../context';
import { checkIsOverdue } from '../extensionLeftBar/extensionLeftBar.utils';
import { TaskIconDisplay } from '../taskIconDisplay/taskIconDisplay';
import styles from './card.module.css';
import {
  AmountComponent,
  CurrentLocalTime,
  DescriptionComponent,
  LinkedinComponent,
  NameComponent,
  PlainTextComponent,
  PriorityLabel,
  ScheduledDateTime,
} from './fieldTypeComponent';

const CustomCardBody = ({
  bobject,
  fieldsArray,
  isBody = false,
}: {
  bobject: Bobject<BobjectTypes.Task>;
  fieldsArray?: Array<string>;
  isBody?: boolean;
}) => {
  const { t } = useTranslation();
  const id = uuid();
  const bobjectType = bobject?.id?.typeName;
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const { customTasks } = useCustomTasks();
  const isB2CAccount = useIsB2CAccount();
  const userFilterAvailable =
    settings?.user?.accountAdmin || settings?.user?.permissions?.includes(UserPermission.EDIT_ALL);
  const referencedBobjectData = useCallback(
    () => generateBobjectBasedData(bobject, fieldsArray, customTasks, isB2CAccount),
    [bobject],
  );

  const subhomeItemFields = referencedBobjectData();
  const referencedBobject = getTaskReferenceBobject(bobject);
  const referencedBobjectType = referencedBobject?.id?.typeName;
  const isHighPriority =
    (subhomeItemFields?.bobjectType === BobjectTypes.Company ||
      subhomeItemFields?.bobjectType === BobjectTypes.Lead) &&
    getFieldByLogicRole(bobject, FIELDS_LOGIC_ROLE[subhomeItemFields?.bobjectType]?.HIGH_PRIORITY)
      ?.text === 'Yes';

  const isReferencedBobjectHighPriority =
    getFieldByLogicRole(
      referencedBobject,
      FIELDS_LOGIC_ROLE[referencedBobjectType as BobjectTypes.Company | BobjectTypes.Lead]
        ?.HIGH_PRIORITY,
    )?.text === 'Yes';
  const taskHasLeadWithCompany =
    subhomeItemFields?.fields?.filter(
      field =>
        field?.value &&
        [TASK_FIELDS_LOGIC_ROLE.COMPANY, TASK_FIELDS_LOGIC_ROLE.LEAD].includes(
          field?.logicRole as TASK_FIELDS_LOGIC_ROLE,
        ),
    )?.length > 1;

  const isOverdue = checkIsOverdue(bobject);
  const isCadence = isCadenceTask(bobject);

  return (
    <CardBody key={`${id}_CardBody`}>
      {isHighPriority && (
        <div key={`${id}_HighPriorityIcon`} className={styles._icon__container}>
          <Tooltip title={t('common.highPriority')} position="top">
            <Icon name="zap" size={18} color="banana" />
          </Tooltip>
        </div>
      )}
      {bobjectType === BobjectTypes.Task && !isBody && (
        <TaskIconDisplay key={`${id}_TaskIconDisplay`} bobject={bobject} />
      )}
      {/*@ts-ignore*/}
      {subhomeItemFields?.fields.map(({ value, logicRole }, idx) => {
        if (logicRole) {
          if (value) {
            switch (logicRole) {
              case TASK_FIELDS_LOGIC_ROLE.TITLE:
                return (
                  <Fragment key={`${id}${idx}${logicRole}`}>
                    <NameComponent
                      value={value as Bobject | BobjectField}
                      bobject={subhomeItemFields?.bobject}
                      isBody={isBody}
                      customTasks={customTasks}
                    />
                    {isReferencedBobjectHighPriority && logicRole === TASK_FIELDS_LOGIC_ROLE.TITLE && (
                      <div>
                        <Icon size={16} name="zap" color="banana" />
                      </div>
                    )}
                  </Fragment>
                );
              case LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
              case COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL:
                if (bobjectType !== BobjectTypes.Task)
                  return <LinkedinComponent key={`${id}${idx}${logicRole}`} value={value} />;
                break;
              case COMPANY_FIELDS_LOGIC_ROLE.NAME:
              case LEAD_FIELDS_LOGIC_ROLE.FULL_NAME:
              case OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME:
              case OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY:
              case LEAD_FIELDS_LOGIC_ROLE.COMPANY:
              case LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY:
              case TASK_FIELDS_LOGIC_ROLE.COMPANY:
              case TASK_FIELDS_LOGIC_ROLE.LEAD:
              case TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY:
                return (
                  <Fragment key={`${id}${idx}${logicRole}`}>
                    {logicRole.includes('__COMPANY') && taskHasLeadWithCompany && (
                      <div className={styles._separator} key={`${id}${idx}${logicRole}_div`} />
                    )}
                    <NameComponent
                      key={`${id}${idx}${logicRole}_nameComponent`}
                      value={value as Bobject | BobjectField}
                      bobject={subhomeItemFields?.bobject}
                    />
                  </Fragment>
                );
              case COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
              case LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
              case TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
              case OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO:
                return isBody ? (
                  <div key={`${id}${idx}${logicRole}`} className={styles._assigned_to}>
                    <AssigneeComponent
                      key={`${id}${idx}${logicRole}`}
                      value={value as BobjectField}
                    />
                  </div>
                ) : (
                  userFilterAvailable && (
                    <AssigneeComponent
                      key={`${id}${idx}${logicRole}`}
                      value={value as BobjectField}
                    />
                  )
                );
              case TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME:
                return (
                  <div className={styles.rightSide} key={`${id}${idx}${logicRole}`}>
                    <ScheduledDateTime
                      key={`${id}${idx}${logicRole}`}
                      scheduledDateTime={value as string}
                      isOverdue={isOverdue}
                      isCadence={isCadence}
                    />
                  </div>
                );
              case COMPANY_FIELDS_LOGIC_ROLE.SOURCE:
              case LEAD_FIELDS_LOGIC_ROLE.SOURCE:
                return <Fragment key={`${id}${idx}${logicRole}`}></Fragment>;
              case OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT:
                return (
                  <AmountComponent
                    key={`${id}${idx}${logicRole}`}
                    value={value as string}
                    logicRole={logicRole}
                  />
                );
              case TASK_FIELDS_LOGIC_ROLE.DESCRIPTION:
                return (
                  <DescriptionComponent key={`${id}${idx}${logicRole}`} value={value as string} />
                );
              case TASK_FIELDS_LOGIC_ROLE.PRIORITY:
                return (
                  <PriorityLabel
                    priority={value as BobjectField}
                    key={`${id}-${idx}`}
                    showOnlyImportant={true}
                  />
                );
              case COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS:
                return (
                  <Fragment key={`${id}${idx}${logicRole}`}>
                    <PlainTextComponent
                      value={value as string}
                      logicRole={logicRole}
                      isBody={isBody}
                    />
                  </Fragment>
                );
              case COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET:
              case LEAD_FIELDS_LOGIC_ROLE.ICP:
                return <Fragment key={`${id}${idx}`}></Fragment>;
              default:
                return (
                  <div key={`${id}${idx}${logicRole}`} className={styles.plainContainer}>
                    <PlainTextComponent
                      value={value as string}
                      logicRole={logicRole}
                      isBody={isBody}
                    />
                  </div>
                );
            }
          } else {
            switch (logicRole) {
              default:
              case ACTIVITY_FIELDS_LOGIC_ROLE.TIME:
                return <Fragment key={`${id}${idx}${logicRole}`}></Fragment>;
              case 'CUSTOM_TASK_TIMEZONE':
                return (
                  <CurrentLocalTime
                    key={`${id}${idx}${logicRole}`}
                    task={bobject as Bobject<BobjectTypes.Task>}
                  />
                );
            }
          }
        } else return <Fragment key={`${id}${idx}`}></Fragment>;
      })}
    </CardBody>
  );
};

export default CustomCardBody;
