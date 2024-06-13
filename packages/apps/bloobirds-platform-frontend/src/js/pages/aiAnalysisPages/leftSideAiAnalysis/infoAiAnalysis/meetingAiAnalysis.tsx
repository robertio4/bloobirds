import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { ACTIVITY_FIELDS_LOGIC_ROLE, Bobject, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getFieldByLogicRole, getRelatedBobject, getTextFromLogicRole } from '@bloobirds-it/utils';

import styles from './infoAiAnalysis.module.css';
import { IconLabelAnalysis, InfoSectionAnalysis } from './infoAiAnalysis.utils';

const MeetingAnalysis = ({ activity }: { activity: Bobject }) => {
  const { t, i18n } = useTranslation();

  const scheduledDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const scheduledDateTime = useGetI18nSpacetime(scheduledDate).format(
    '{day-short} {day-pad} {month-short} {year} · {time-24}',
  );
  const creationDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const format =
    i18n.language === 'en'
      ? '{month-short} {day-pad} {year}, {time-24}'
      : '{day-pad} {month-short} {year}, {time-24}';
  const creationDateTime = useGetI18nSpacetime(creationDate).format(format);
  const meetingResult = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);
  const meetingResultValue = meetingResult?.text;
  const meetingType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const assignedTo = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO);
  const meetingTitle = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const lead = getRelatedBobject(activity, 'Lead');
  const leadName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);

  const meetingResultLR = ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT;
  const meetingResultField = getFieldByLogicRole(activity, meetingResultLR);
  const meetingResultValueLogicRole = meetingResultField?.valueLogicRole;

  return (
    <div className={styles.container}>
      <Text size="xl" weight="heavy">
        {meetingTitle}
      </Text>
      <div className={styles.infoSubtitles}>
        <IconLabelAnalysis
          id="User name"
          iconProps={{ name: 'person', color: 'verySoftBloobirds', size: 20 }}
          labelProps={{
            weight: 'heavy',
            color: 'darkGray',
            size: 'm',
          }}
          text={leadName}
        />
        <IconLabelAnalysis
          id="Creation date"
          labelProps={{
            weight: 'heavy',
            color: 'softPeanut',
            size: 'm',
          }}
          iconProps={{ name: 'clock', color: 'softPeanut', size: 20 }}
          text={scheduledDateTime}
        />
      </div>
      <div className={styles.infoSection}>
        <InfoSectionAnalysis
          icon="bookmark"
          title={t('ai.aiAnalysis.meetingType')}
          info={meetingType}
          isLabel
          style={{
            color: 'var(--peanut)',
          }}
        />
        <InfoSectionAnalysis
          icon="gridSquares"
          title={t('ai.aiAnalysis.meetingResult')}
          info={meetingResultValue}
          isLabel
          style={{
            color:
              meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                ? 'var(--tomato)'
                : 'var(--extraCall)',

            backgroundColor:
              meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                ? 'var(--verySoftTomato)'
                : 'var(--verySoftMelon)',
            borderColor:
              meetingResultValueLogicRole === 'ACTIVITY__MEETING_RESULT__CANCELLED'
                ? 'var(--verySoftTomato)'
                : 'var(--verySoftMelon)',
          }}
        />
        <InfoSectionAnalysis
          icon="calendar"
          title={t('ai.aiAnalysis.meetingCreation')}
          info={creationDateTime || 'Unknown'}
        />
        <InfoSectionAnalysis
          icon="person"
          title={t('ai.aiAnalysis.assignedTo')}
          info={assignedTo}
        />
      </div>
    </div>
  );
};

export default MeetingAnalysis;
