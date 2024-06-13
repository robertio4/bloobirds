import React, { Fragment, useMemo, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  CardBody,
  CardButton,
  CardHoverButtons,
  CardLeft,
  CardRight,
  CardHeader,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
  CircularBadge,
} from '@bloobirds-it/flamingo-ui';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';
import {
  formatDate,
  isBeforeToday,
  isDifferentYearThanCurrent,
  isToday,
  startOfDay,
  subDays,
} from '@bloobirds-it/utils';
import clsx from 'clsx';

import { opportunityUrl } from '../../../../app/_constants/routes';
import Name from '../../../../components/name/name';
import RightClickContextMenu from '../../../../components/rightClickContextMenu';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { getTimezone } from '../../../../constants/countryToTimeZone';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useBobjectFormVisibility,
  useRouter,
  useTaskDone,
  useMediaQuery,
  useContextMenu,
  useEntity,
  useTaskNavigationStorage,
} from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../../hooks/usePermissions';
import SubhomeCard from '../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import SubhomeContentSkeleton from '../../../../layouts/subhomeLayout/subhomeContent/subhomeContentSkeleton/subhomeContentSkeleton';
import SubhomeEmptyContent from '../../../../layouts/subhomeLayout/subhomeContent/subhomeEmptyContent/subhomeEmptyContent';
import {
  getTextFromLogicRole,
  getFieldByLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { removeHtmlTags } from '../../../../utils/email.utils';
import { addTaskDateGrouping } from '../../../../utils/tasks.utils';
import { getButtonMarkAsDone } from '../useSales';
import styles from './appointments.module.css';
import { AppointmentsFilters } from './appointmentsFilters';
import TaskIcon from './taskIcon';
import {
  useSalesAppointmentsFilters,
  useSalesAppointmentsPage,
  useSalesTasksAppointments,
} from './useSalesAppointments';

const checkIsOverdue = item => {
  const date = new Date(getValueFromLogicRole(item, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME));

  return startOfDay(new Date(date)) <= subDays(startOfDay(new Date()), 1);
};

const DateGroupHeader = ({ bobject }) => (
  <header className={styles._header} id={bobject.taskDate.hashDate}>
    <Text color="peanut" weight="medium" size="s" inline>
      {bobject.taskDate.prefix}
    </Text>
    <Text color="softPeanut" size="s" inline>
      {bobject.taskDate.formattedDate}
    </Text>
  </header>
);

const AppointmentCard = ({ appointment, showNextLine }) => {
  const hasSalesEnabled = useFullSalesEnabled();
  const { openEditModal } = useBobjectFormVisibility();
  const { showToast } = useTaskDone();
  const { history } = useRouter();
  const {
    ref: refContextMenu,
    xPos,
    yPos,
    isContextMenuVisible,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu();
  const isAccountAdmin = useIsAccountAdmin();
  const users = useEntity('users');
  const taskAssignedTo = getValueFromLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const cardUser = users?.get(taskAssignedTo);

  const type = getFieldByLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole;
  const name = getTextFromLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.TITLE);
  const description = getTextFromLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.DESCRIPTION);
  const date = getTextFromLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
  const status = getFieldByLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole;
  const company = getFieldByLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const opportunity = getFieldByLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const lead = getFieldByLogicRole(appointment, TASK_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const opportunityName = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const opportunityStatus = getFieldByLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companyCountry = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY);
  const companyHighPriority = getTextFromLogicRole(
    company,
    COMPANY_FIELDS_LOGIC_ROLE.HIGH_PRIORITY,
  );
  const companyCountryTimezone = getTimezone(companyCountry);
  const leadName =
    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
    getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const isCompleted = [
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
    TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
  ].includes(status);
  const isOverdue = checkIsOverdue(appointment);

  const buttonData = getButtonMarkAsDone({ company, task: appointment });

  const { isSmallDesktop } = useMediaQuery();

  const handleMarkAsDone = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    showToast(true, id);
  };

  const handleOnClick = e => {
    const companyIdValue = getValueFromLogicRole(
      opportunity,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
    );
    const companyId = companyIdValue?.split('/')[2];
    const pathUrl = hasSalesEnabled
      ? opportunityUrl(undefined, opportunity?.id?.objectId)
      : companyId && opportunityUrl(companyId, opportunity?.id?.objectId);
    history.push(pathUrl, { event: e });
  };

  return (
    <SubhomeCard
      hasNextCard={showNextLine}
      key={appointment?.id.objectId}
      isCompleted={isCompleted}
      onClick={handleOnClick}
      cardRef={refContextMenu}
      onContextMenu={handleContextMenu}
      dataTest={`appointment-card-${appointment?.id.objectId}`}
    >
      <CardHeader>
        <CardLeft>
          <TaskIcon type={type} />
        </CardLeft>
        <CardBody>
          <div className={styles._name_wrapper}>
            <Tooltip title={removeHtmlTags(description || '')} position="top">
              <Text
                dataTest="AppointmentCard-TaskName"
                size="s"
                weight="medium"
                color="peanut"
                decoration={isCompleted ? 'line-through' : ''}
              >
                {name}
              </Text>
            </Tooltip>
          </div>
          {opportunityName && (
            <>
              <div className={styles._bobject_name}>
                <Icon name="fileOpportunity" size={20} />
                <Name
                  name={opportunityName}
                  bobject={opportunity || company}
                  isCompleted={isCompleted}
                />
              </div>
            </>
          )}
          {lead && (
            <div className={styles._bobject_name}>
              <Icon name="person" size={20} />
              <Name name={leadName} bobject={lead} isCompleted={isCompleted} />
            </div>
          )}
          {companyHighPriority && <Icon size="16" name="zap" color="banana" />}
          {companyName && (
            <div className={styles._bobject_name}>
              <Icon name="company" size={20} />
              <Name name={companyName} bobject={company} isCompleted={isCompleted} />
            </div>
          )}
          {companyCountry && (
            <>
              <span className={clsx(styles._separator, styles._s_hidden)} />
              <div className={clsx(styles._country, styles._s_hidden)}>
                <Tooltip title="Company country" position="top">
                  <Text size="s" color="peanut">
                    {companyCountry}
                  </Text>
                </Tooltip>
              </div>
            </>
          )}
          {companyCountryTimezone && (
            <div className={clsx(styles._timezone, styles._s_hidden, styles._m_hidden)}>
              <Tooltip title={`${companyCountryTimezone} ${companyCountry}`} position="top">
                <Text size="s" color="darkBloobirds">
                  {companyCountryTimezone}
                </Text>
              </Tooltip>
            </div>
          )}
          {isContextMenuVisible && (
            <RightClickContextMenu
              url={opportunityUrl(
                hasSalesEnabled ? undefined : company?.id.objectId,
                opportunity?.id.objectId,
              )}
              xPos={xPos}
              yPos={yPos}
              hideContextMenu={hideContextMenu}
            />
          )}
        </CardBody>
        <CardRight>
          {opportunityStatus?.text && (
            <div className={clsx(styles._status, styles._s_hidden)}>
              <Tooltip title="Opportunity status" position="top">
                <Label
                  dataTest="opportunityStatus"
                  overrideStyle={{
                    backgroundColor: opportunityStatus?.valueBackgroundColor,
                    color: opportunityStatus?.valueTextColor,
                    borderColor: opportunityStatus?.valueOutlineColor,
                  }}
                >
                  <Text htmlTag="span" color={opportunityStatus?.valueTextColor} size="s">
                    {opportunityStatus?.text}
                  </Text>
                </Label>
              </Tooltip>
            </div>
          )}
          {isAccountAdmin && cardUser && (
            <div className={styles._assigned_circle}>
              <Tooltip title={cardUser?.name} position="top">
                <CircularBadge
                  size="s"
                  color="lightBloobirds"
                  style={{ color: 'var(--softPeanut)', fontSize: '9px' }}
                >
                  {cardUser?.shortname || 'U'}
                </CircularBadge>
              </Tooltip>
            </div>
          )}
          <div className={clsx(styles._date, styles._s_hidden, styles._m_hidden, styles._l_hidden)}>
            {/* <Tooltip title={formatDate(new Date(date), 'PPP')} position="top" trigger="hover"> */}
            <Text size="s" color="softPeanut" inline align="right">
              {date &&
                `Due date ${formatDate(
                  new Date(date),
                  isDifferentYearThanCurrent(date) ? 'MMM dd yyyy' : 'MMM dd HH:mm',
                )}`}
            </Text>
          </div>
          {isOverdue && (
            <div
              className={clsx(
                styles._overdue,
                styles._s_hidden,
                styles._m_hidden,
                styles._l_hidden,
              )}
            >
              <Text size="s" color="tomato" inline align="right">
                Overdue
              </Text>
            </div>
          )}
        </CardRight>
        <CardHoverButtons>
          <Tooltip title={buttonData?.tooltip} position="top">
            <CardButton
              dataTest="Subhome-MarkAsDone"
              iconLeft="check"
              onClick={event => handleMarkAsDone(event, appointment?.id.objectId)}
              disabled={buttonData.disabled}
            >
              {!isSmallDesktop && 'Mark as done'}
            </CardButton>
          </Tooltip>
          {type === TASK_TYPE.NEXT_STEP && (
            <IconButton
              name="edit"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();

                openEditModal({ bobject: appointment });
              }}
            />
          )}
        </CardHoverButtons>
      </CardHeader>
    </SubhomeCard>
  );
};
const AppointmentsList = () => {
  const { items: tasks, isLoading, totalMatching, resetItems } = useSalesTasksAppointments();
  const { addTasksToNavigation } = useTaskNavigationStorage();
  const { usingDefaultFilters } = useSalesAppointmentsFilters();
  const { hasNextPage, loadNextPage, setHasNextPage } = useSalesAppointmentsPage();

  const filteredTasks = useMemo(
    () =>
      usingDefaultFilters
        ? addTaskDateGrouping(tasks, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME, checkIsOverdue)
        : tasks,
    [tasks, usingDefaultFilters],
  );

  useEffect(() => {
    if (filteredTasks?.length === totalMatching) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  }, [filteredTasks, totalMatching]);

  useEffect(() => {
    addTasksToNavigation(
      filteredTasks.filter(task => {
        const day = getValueFromLogicRole(task, TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME);
        return isToday(new Date(day)) || isBeforeToday(new Date(day));
      }),
    );
  }, [filteredTasks]);

  useEffect(
    () => () => {
      resetItems();
    },
    [],
  );

  return (
    <>
      {!isLoading && filteredTasks.length === 0 ? (
        <SubhomeEmptyContent />
      ) : (
        <>
          <div className={styles._select_all_wrapper}>
            {totalMatching !== undefined && !Number.isNaN(totalMatching) && (
              <Label size="small">{`${totalMatching} results`}</Label>
            )}
          </div>
          <InfiniteScroll
            dataLength={filteredTasks.length}
            hasMore={hasNextPage}
            className={styles._list_wrapper}
            next={loadNextPage}
            scrollThreshold={0.75}
            scrollableTarget="subhomeContent"
            loader={<SubhomeContentSkeleton visible />}
          >
            {filteredTasks.map((appointment, index) => {
              const nextBobject = filteredTasks[index + 1];
              const showNextLine = nextBobject && !nextBobject?.taskDate?.isFirstOfDay;
              return (
                <Fragment key={appointment.id.value}>
                  {appointment.taskDate?.isFirstOfDay && <DateGroupHeader bobject={appointment} />}
                  <AppointmentCard appointment={appointment} showNextLine={showNextLine} />
                </Fragment>
              );
            })}
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export function AppointmentsContent() {
  return (
    <>
      <AppointmentsFilters />
      <AppointmentsList />
    </>
  );
}
