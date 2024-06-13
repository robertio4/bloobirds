import React from 'react';

import { AssigneeComponent } from '@bloobirds-it/bobjects';
import {
  Button,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardLeft,
  CardRight,
  IconButton,
  Label,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';

import { bobjectUrl } from '../../../../../app/_constants/routes';
import { parseEmailPixels } from '../../../../../components/activitySection/activityItem/activityItem.utils';
import DateText from '../../../../../components/activitySection/activityItem/dateText';
import { BobjectNameLink } from '../../../../../components/bobjectNameLinks/bobjectNameLink';
import CardIcon from '../../../../../components/cardIcon/cardIcon';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MEETING_MAIN_TYPE_VALUES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { useActivity, useRouter } from '../../../../../hooks';
import SubhomeCard from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCard';
import { ActivityCardDropdown } from '../../../../../layouts/subhomeLayout/subhomeContent/subhomeCard/subhomeCardButtons/activityCardDropdown';
import {
  getFieldByLogicRole,
  getReferencedBobject,
  getTextFromLogicRole,
} from '../../../../../utils/bobjects.utils';
import { isHtml } from '../../../../../utils/strings.utils';
import { useSubhomeContext } from '../../../subhomeContext';
import styles from './meetingActivityCard.module.css';

export const MeetingActivityCard = ({
  bobject,
  hasNextCard,
}: {
  bobject: Bobject;
  hasNextCard: boolean;
}) => {
  const { selectOneItem, selectedItems } = useSubhomeContext();
  const { updateActivity } = useActivity('activityCard');
  const { openWizard } = useWizardContext();
  const { history } = useRouter();
  const bobjectId = bobject?.id?.objectId;
  const { createToast } = useToasts();
  const lead = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const company = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const isChecked = selectedItems.some(selectedItem => selectedItem?.id.objectId === bobjectId);
  const date = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const assignee = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const activityCreator = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const note = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const leadSource = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SOURCE);
  const companySource = getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.SOURCE);
  const noteToShow = isHtml(note) ? (
    <div dangerouslySetInnerHTML={{ __html: parseEmailPixels(note) }} />
  ) : (
    note
  );
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

  const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const referencedBobject = getReferencedBobject(bobject);
    e.stopPropagation();
    e.preventDefault();
    const url = bobjectUrl(referencedBobject);
    history.push(url, { event: e });
  };

  return (
    <>
      <SubhomeCard
        hasNextCard={hasNextCard}
        key={bobjectId}
        onClick={e => {
          handleOnClick(e);
        }}
        dataTest={`call-card-${bobjectId}`}
      >
        <CardHeader>
          <CardLeft>
            <div className={styles._check_wrapper}>
              <CardCheckbox
                size="small"
                checked={isChecked}
                onClick={(value, event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const isReported =
                    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
                      ?.valueLogicRole === REPORTED_VALUES_LOGIC_ROLE.YES;

                  selectOneItem(!isReported ? bobject : ({ ...bobject, isReported } as Bobject));
                }}
              />
            </div>
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
            {activityCreator && <AssigneeComponent value={activityCreator} extra={'User: '} />}
            {assignee && assignee?.text && (
              <AssigneeComponent value={assignee} extra={'Account executive Assigned: '} />
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
                {meetingType?.text}
              </Label>
            )}
            {leadSource ? (
              <span className={styles.source}>
                <Tooltip title="Lead source" position="top">
                  <Text size="s" color="softPeanut">
                    {leadSource}
                  </Text>
                </Tooltip>
              </span>
            ) : companySource ? (
              <span className={styles.source}>
                <Tooltip title="Company source" position="top">
                  <Text size="s" color="softPeanut">
                    {companySource}
                  </Text>
                </Tooltip>
              </span>
            ) : (
              ''
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
            <ActivityCardDropdown bobject={bobject} />
            <div />
          </CardRight>
        </CardHeader>
        {noteToShow && note !== 'null' ? (
          <CardContent>
            <Text size="xs">
              <b>Note:</b> {noteToShow}
            </Text>
          </CardContent>
        ) : (
          <></>
        )}
      </SubhomeCard>
    </>
  );
};
