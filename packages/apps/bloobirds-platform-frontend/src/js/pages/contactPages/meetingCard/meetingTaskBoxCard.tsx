import React from 'react';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardLeft,
  CardRight,
  IconButton,
  Label,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import DateText from '../../../components/activitySection/activityItem/dateText';
import { BobjectNameLink } from '../../../components/bobjectNameLinks/bobjectNameLink';
import CardIcon from '../../../components/cardIcon/cardIcon';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MEETING_MAIN_TYPE_VALUES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useActivity } from '../../../hooks';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';
import styles from './meetingTaskBoxCard.module.css';

export const MeetingTaskBoxCard = ({ bobject }: { bobject: Bobject<BobjectTypes.Activity> }) => {
  const { updateActivity } = useActivity('activityCard');
  const bobjectId = bobject?.id?.objectId;
  const { createToast } = useToasts();
  const { openWizard } = useWizardContext();
  const lead = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const date = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const assignee = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const activityCreator = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const meetingType = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const isFirstMeeting =
    meetingType?.valueLogicRole === MEETING_MAIN_TYPE_VALUES.FIRST_MEETING ||
    !meetingType?.valueLogicRole;
  const isReported =
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED).valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;

  const markAsReported = () => {
    updateActivity(bobject?.id.objectId, {
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES,
    }).then(() => {
      createToast({ message: 'Meeting successfully reported', type: 'success' });
    });
  };

  return (
    <div className={styles._card}>
      <Card key={bobjectId}>
        <CardHeader>
          <CardLeft>
            <CardIcon name="calendar" color="tomato" />
          </CardLeft>
          <CardBody>
            <Text size="s" className={styles._callCard_body__text}>
              <b>Meeting arranged</b> with
            </Text>
            {lead && (
              <div className={styles._callCard_body__link}>
                <BobjectNameLink bobject={lead} icon="person" />
              </div>
            )}
            {lead && company && <div className={styles._separator} />}
            {company && (
              <div className={styles._callCard_body__link}>
                <BobjectNameLink bobject={company} icon="company" />
              </div>
            )}
            {(assignee || activityCreator) && (
              <AssigneeComponent value={assignee?.value ? assignee : activityCreator} />
            )}
            {meetingType && (
              <Label
                overrideStyle={{
                  padding: '3px 4px',
                  color: 'var(--peanut)',
                  marginLeft: '8px',
                }}
                uppercase={false}
              >
                {meetingType?.text || 'First Meeting'}
              </Label>
            )}
          </CardBody>
          <CardRight>
            {date && (
              <div className={styles._date_text_wrapper}>
                <DateText date={date} />
              </div>
            )}
            {isReported ? (
              <div data-test="Icon-thumbsUp" className={styles._button_reported_container}>
                <IconButton name="thumbsUp" color="melon" size={16} />
              </div>
            ) : (
              <Button
                dataTest="Activity-ReportResult"
                variant="secondary"
                size="small"
                iconLeft="thumbsUp"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!isFirstMeeting) {
                    markAsReported();
                  } else {
                    openWizard(WIZARD_MODALS.MEETING_RESULT, bobject);
                  }
                }}
              >
                {isFirstMeeting ? 'Report result' : 'Mark as done'}
              </Button>
            )}
            <div />
          </CardRight>
        </CardHeader>
      </Card>
    </div>
  );
};
