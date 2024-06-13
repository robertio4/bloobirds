import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { ACTIVITY_FIELDS_LOGIC_ROLE, Bobject, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  formatDate,
  getFieldByLogicRole,
  getRelatedBobject,
  getTextFromLogicRole,
} from '@bloobirds-it/utils';

import styles from './infoAiAnalysis.module.css';
import { IconLabelAnalysis, InfoSectionAnalysis } from './infoAiAnalysis.utils';

const CallAnalysis = ({ activity }: { activity: Bobject }) => {
  const { t, i18n } = useTranslation();

  const result = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);
  const leadNumber = getTextFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER,
  );
  const lead = getRelatedBobject(activity, 'Lead');
  const leadName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const creationDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const format =
    i18n.language === 'en'
      ? '{month-short} {day-pad} {year}, {time-24}'
      : '{day-pad} {month-short} {year}, {time-24}';
  const creationDateTime = useGetI18nSpacetime(creationDate).format(format);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const title = t('ai.aiAnalysis.' + direction + 'Call');
  const assignee = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);

  return (
    <div className={styles.container}>
      <Text size="xl" weight="heavy">
        {title}
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
      </div>
      <div className={styles.infoSection}>
        <InfoSectionAnalysis
          icon="gridSquares"
          title={t('ai.aiAnalysis.meetingResult')}
          info={result}
          isLabel
          style={{
            color: 'var(--extraCall)',
            backgroundColor: 'var(--verySoftMelon)',
            borderColor: 'var(--verySoftMelon)',
          }}
        />
        <InfoSectionAnalysis
          icon="phone"
          title={t('ai.aiAnalysis.leadNumber')}
          info={leadNumber || t('common.none')}
        />
        <InfoSectionAnalysis
          icon="calendar"
          title={t('ai.aiAnalysis.callDate')}
          info={creationDateTime || t('common.none')}
        />
        <InfoSectionAnalysis
          icon="person"
          title={t('ai.aiAnalysis.assignedTo')}
          info={assignee?.text || t('common.none')}
        />
      </div>
    </div>
  );
};

export default CallAnalysis;
