import React, { useState } from 'react';

import { InviteeCard } from '@bloobirds-it/calendar';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, Invitee } from '@bloobirds-it/types';
import { convertHtmlToString } from '@bloobirds-it/utils';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/activity';
import { useEntity } from '../../../../../hooks';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';
import { switchDateFormat } from '../../../../../misc/utils';
import {
  getFieldByLogicRole,
  getFieldByName,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../../utils/bobjects.utils';
import { toHoursAndMinutes } from '../../../../../utils/numbers.utils';
import { isHtml } from '../../../../../utils/strings.utils';
import { parseEmailPixels } from '../../activityItem.utils';
import styles from './meetingCardBody.modules.css';

export const MeetingCardBody = ({ meeting }: { meeting: Bobject }) => {
  const meetingTitle = getValueFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const title = isHtml(meetingTitle) ? convertHtmlToString(meetingTitle) : meetingTitle;
  const meetingScheduledDate = getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const meetingCreationDatetime = getTextFromLogicRole(
    meeting,
    ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME,
  );
  const duration = getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION);
  const templateReminder = getTextFromLogicRole(
    meeting,
    ACTIVITY_FIELDS_LOGIC_ROLE.REMINDER_TEMPLATE,
  );
  const messagingTemplates = useEntity('messagingTemplates');
  const template = messagingTemplates?.all()?.find(mess => mess?.id === templateReminder);
  const meetingResult = getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);
  const noteInternal = getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const noteInternalToShow = isHtml(noteInternal) ? (
    <div dangerouslySetInnerHTML={{ __html: parseEmailPixels(noteInternal) }} />
  ) : (
    noteInternal
  );
  const calendarNote = getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE);
  const meetingInvitees = getTextFromLogicRole(
    meeting,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES,
  );
  const [showMore, setShowMore] = useState<boolean>(false);
  const parsedInvitees = meetingInvitees ? JSON.parse(meetingInvitees) : null;

  // This is pretty unsafe, but until we migrate to the new calendar note field with logic role, we can use it
  // Here you can find that majority of accounts use it https://metabase.bloobirds.com/question/32-notes-to-calendar-field
  const unSafeCalendarNotes = getFieldByName(meeting, 'Notes to Calendar Event (Lead)')?.value;
  const meetingAssignedToField = getFieldByLogicRole(
    meeting,
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
  );
  const meetingAssignedTo = meetingAssignedToField?.text;
  const meetingAssignedToNameField = meetingAssignedToField?.label;
  const meetingAccountExecutive = getTextFromLogicRole(
    meeting,
    ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
  );
  const creationText = meetingCreationDatetime && switchDateFormat(meetingCreationDatetime, true);
  const text = meetingScheduledDate && switchDateFormat(meetingScheduledDate, true);
  const isHTMLNote = isHtml(calendarNote);
  const isSalesEnabled = useFullSalesEnabled();
  const hasNylasId = !!getTextFromLogicRole(meeting, ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID);

  return (
    <div>
      <div className={styles.body__header}>
        <div className={styles._header}>
          <Text size="l">{title || ''}</Text>
          {duration && (
            <span className={styles._duration_element}>
              <Icon name="clock" color="darkBloobirds" size={20} />
              <Text size="s" color="darkBloobirds" weight="bold" className={styles.duration}>
                {toHoursAndMinutes(Number(duration))}
              </Text>
            </span>
          )}
        </div>
        <div>
          <Text size="xs" htmlTag="span" weight="bold">
            {meetingScheduledDate && `Scheduled for: `}
          </Text>
          <Text size="xs" htmlTag="span">
            {text || 'none'}
          </Text>
        </div>
      </div>
      <div className={styles.body__content}>
        <div className={styles.left_body__content}>
          <div className={styles.top_section}>
            <div className={styles.top_left_section}>
              <span>
                <Icon name="calendar" size={16} color="bloobirds" className={styles.section_icon} />
                <Text htmlTag="span" size="xs" weight="bold">
                  Meeting creation date
                </Text>
              </span>
              <Text size="xs">{creationText || 'none'}</Text>
            </div>
            <div className={styles.top_left_section}>
              <span>
                <Icon name="bell" size={16} color="bloobirds" className={styles.section_icon} />
                <Text htmlTag="span" size="xs" weight="bold">
                  Reminder set
                </Text>
              </span>
              <Text size="xs">{template?.name || 'none'}</Text>
            </div>
            <div className={styles.top_left_section}>
              <span>
                <Icon
                  name="gridSquares"
                  size={16}
                  color="bloobirds"
                  className={styles.section_icon}
                />
                <Text htmlTag="span" size="xs" weight="bold">
                  Meeting Result
                </Text>
              </span>
              <Text size="xs">{meetingResult || 'none'}</Text>
            </div>
            <div className={styles.top_left_section}>
              <span>
                <Icon name="person" size={16} color="bloobirds" className={styles.section_icon} />
                <Text htmlTag="span" size="xs" weight="bold">
                  {isSalesEnabled ? meetingAssignedToNameField : 'Account Executive'}
                </Text>
              </span>
              <Text size="xs">
                {isSalesEnabled ? meetingAssignedTo || 'none' : meetingAccountExecutive || 'none'}
              </Text>
            </div>
          </div>
          <div className={styles.bottom_section}>
            {parsedInvitees ? (
              <>
                <span>
                  <Icon name="people" size={16} color="bloobirds" className={styles.section_icon} />
                  <Text htmlTag="span" size="xs" weight="bold">
                    Attendees
                  </Text>
                </span>
                <div className={styles.invitees_container}>
                  {parsedInvitees?.map((invitee: Invitee, index: number) => {
                    if (!showMore && index > 3) {
                      return null;
                    }
                    return (
                      <div key={`${index}${invitee.email}`} className={styles.invitees}>
                        <InviteeCard
                          width="300px"
                          invitee={invitee}
                          readOnly
                          shouldShowStatus={hasNylasId}
                        />
                      </div>
                    );
                  })}
                </div>
                {parsedInvitees?.length > 4 && (
                  <div onClick={() => setShowMore(!showMore)}>
                    <Text className={styles.showMore} size="s" color="bloobirds">
                      Show {showMore ? 'less' : 'more'}
                    </Text>
                  </div>
                )}
              </>
            ) : (
              <>
                <span>
                  <Icon
                    name="taskAction"
                    size={16}
                    color="bloobirds"
                    className={styles.section_icon}
                  />
                  <Text htmlTag="span" size="xs" weight="bold">
                    Note (calendar)
                  </Text>
                </span>
                {isHTMLNote ? (
                  <div
                    className={styles.html_message}
                    dangerouslySetInnerHTML={{ __html: calendarNote }}
                  />
                ) : (
                  <Text size="xs">{calendarNote || unSafeCalendarNotes || 'none'}</Text>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.right_body__content}>
          <div className={styles.right_body_section}>
            <span>
              <Icon name="noteAction" size={16} color="bloobirds" className={styles.section_icon} />
              <Text htmlTag="span" size="xs" weight="bold">
                Note (internal)
              </Text>
            </span>
            <Text size="xs">{noteInternalToShow || 'none'}</Text>
            {parsedInvitees && (
              <>
                <span>
                  <Icon
                    name="taskAction"
                    size={16}
                    color="bloobirds"
                    className={styles.section_icon}
                  />
                  <Text htmlTag="span" size="xs" weight="bold">
                    Note (calendar)
                  </Text>
                </span>
                {isHTMLNote ? (
                  <div
                    className={styles.html_message}
                    dangerouslySetInnerHTML={{ __html: calendarNote }}
                  />
                ) : (
                  <Text size="xs">{calendarNote || unSafeCalendarNotes || 'none'}</Text>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
