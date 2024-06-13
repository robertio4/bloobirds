import React from 'react';

import { Dropdown, Icon, IconButton, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { formatDate, formatDistanceToNow, isDifferentYearThanCurrent } from '@bloobirds-it/utils';
import { differenceInCalendarDays } from 'date-fns';
import mixpanel from 'mixpanel-browser';

import { STEPS } from '../../../../../../components/cadenceControlModal/cadenceControlModal.machine';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../../constants/company';
import { MIXPANEL_EVENTS } from '../../../../../../constants/mixpanel';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_INFO_ACTIVITY_TYPE_VALUES_LOGICROLE_NAME,
} from '../../../../../../constants/opportunity';
import {
  useBobjectDetails,
  useBobjectFormCreation,
  useCadenceControl,
} from '../../../../../../hooks';
import useAssignUser from '../../../../../../hooks/useAssignUser';
import { parseAmount } from '../../../../../../utils/amount.utils';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../../../utils/bobjects.utils';
import styles from '../../allMyOpps.module.css';

// Keeping in JS as TSX does not behave well with React.forwardRef in some tries
export const AllMyOppsKanbanCard = React.forwardRef(
  ({ myOpp, showNextLine, amountPrefix, ...props }, ref) => {
    const { visible, setVisible, ref: divRef } = useVisible();
    const { openBobjectDetails } = useBobjectDetails();
    const { openCadenceControl } = useCadenceControl();
    const company = getFieldByLogicRole(myOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)
      ?.referencedBobject;
    const opportunityName = getTextFromLogicRole(myOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
    const amountOppValue = getTextFromLogicRole(myOpp, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT);
    const activityOppDate = getValueFromLogicRole(
      myOpp,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.EXTRA_INFO_ACTIVITY_DATE,
    );
    const activityOppType = getFieldByLogicRole(
      myOpp,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.EXTRA_INFO_ACTIVITY,
    )?.valueLogicRole;

    const taskOppDate = getValueFromLogicRole(
      myOpp,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.EXTRA_INFO_TASK_DATE,
    );
    const opportunityLastAttempt = getValueFromLogicRole(
      myOpp,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.ATTEMPTS_LAST_DAY,
    );
    const inactiveDays = opportunityLastAttempt
      ? formatDistanceToNow(new Date(opportunityLastAttempt))
      : null;

    const activityDays = activityOppDate ? formatDistanceToNow(new Date(activityOppDate)) : null;
    const activityType = activityOppType
      ? OPPORTUNITY_INFO_ACTIVITY_TYPE_VALUES_LOGICROLE_NAME[activityOppType]
      : null;
    const taskDays = taskOppDate ? formatDistanceToNow(new Date(taskOppDate)) : null;
    const daysDifference = opportunityLastAttempt
      ? differenceInCalendarDays(new Date(opportunityLastAttempt), new Date())
      : null;
    const { openAddTask } = useBobjectFormCreation();
    const { openAssignUserModal } = useAssignUser();
    const opportunityCloseDate = getTextFromLogicRole(
      myOpp,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSE_DATE,
    );
    const companyName = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
    const getColor = () => {
      if (daysDifference > -7) {
        return 'peanut';
      } else if (daysDifference > -14) {
        return 'banana';
      } else {
        return 'tomato';
      }
    };

    return (
      <div className={styles._reduced_card_container} ref={ref} {...props}>
        <div className={styles._reduced_card_title}>
          <div
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              openBobjectDetails({
                id: myOpp?.id?.value,
                showContactButton: true,
              });
            }}
          >
            <Text size="s" color="bloobirds" align="center">
              {opportunityName}
            </Text>
          </div>
        </div>
        {amountOppValue && (
          <div className={styles._tag__container}>
            <div className={styles._tag__content}>
              <Text
                dataTest="Text-opportunityAmount"
                weight="bold"
                align="center"
                size="m"
                ellipsis={12}
              >
                {`${amountPrefix} ${!amountOppValue ? '-' : parseAmount(amountOppValue, 2, 0)}`}
              </Text>
            </div>
          </div>
        )}
        {companyName && (
          <div className={styles._reduced_card_company_name}>
            <div
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                openBobjectDetails({
                  id: company?.id?.value,
                  showContactButton: true,
                });
              }}
            >
              <Text size="xs" color="bloobirds" align="center">
                {companyName}
              </Text>
            </div>
          </div>
        )}
        {opportunityCloseDate && (
          <div className={styles._reduced_Card_closed_date}>
            <Text size="xxs" color="softPeanut">
              Closes{' '}
              {formatDate(
                new Date(opportunityCloseDate),
                isDifferentYearThanCurrent(opportunityCloseDate) ? 'MMM dd yyyy' : 'MMM dd',
              )}
            </Text>
          </div>
        )}
        {!(activityDays && activityType) && inactiveDays && daysDifference < -1 && (
          <div className={styles._reduced_Card_closed_date}>
            <Text size="xxs" color={getColor()}>
              Last attempt {inactiveDays} ago
            </Text>
          </div>
        )}
        {((activityDays && activityType) || taskDays) && (
          <div className={styles._reduced_Card_separator} />
        )}
        {activityDays && activityType && (
          <div className={styles._reduced_Card_closed_date}>
            <Text size="xxs" color="softPeanut" className={styles._subtitle_text} align="center">
              {activityType} {activityDays?.replace('about', '')} ago
            </Text>
          </div>
        )}
        {taskDays && (
          <div className={styles._reduced_Card_closed_date}>
            <Text size="xxs" color="softPeanut" align="center">
              Task due in {taskDays}
            </Text>
          </div>
        )}
        <div className={styles._contextMenu}>
          <Dropdown
            ref={divRef}
            visible={visible}
            anchor={
              <IconButton
                size={16}
                dataTest="Kanban-opp-card-options"
                name="moreOpenholesVertical"
                color="softPeanut"
                onClick={() => setVisible(!visible)}
              />
            }
          >
            <Item
              onClick={() => {
                mixpanel.track(
                  MIXPANEL_EVENTS.SET_CADENCE_ACTION_CLICKED_ON_ALL_MY_OPPS_KANBAN_TAB,
                );
                setVisible(!visible);
                openCadenceControl({
                  bobjectToSet: myOpp,
                  previousStep: false,
                  step: STEPS.CONFIGURE_CADENCE,
                });
              }}
              adornment={<Icon name="calendar" color="bloobirds" size={16} />}
            >
              Set cadence
            </Item>
            <Item
              onClick={() => {
                mixpanel.track(MIXPANEL_EVENTS.ADD_TASK_ACTION_CLICKED_ON_ALL_MY_OPPS_KANBAN_TAB);
                setVisible(!visible);
                openAddTask({
                  bobject: myOpp,
                });
              }}
              adornment={<Icon name="check" color="bloobirds" size={16} />}
            >
              Add task
            </Item>
            <Item
              onClick={() => {
                mixpanel.track(MIXPANEL_EVENTS.REASSIGN_ACTION_CLICKED_ON_ALL_MY_OPPS_KANBAN_TAB);
                setVisible(!visible);
                openAssignUserModal({
                  bobject: myOpp,
                });
              }}
              adornment={<Icon name="personAdd" color="bloobirds" size={16} />}
            >
              Reassign
            </Item>
          </Dropdown>
        </div>
      </div>
    );
  },
);
