import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';
import { isToday } from 'date-fns';

import styles from './meetingInfo.module.css';

interface MeetingData {
  companyName: string;
  date: string;
  leadName: string;
  title: string;
  lead?: Bobject;
  company?: Bobject;
}

const getMeetingData = (activity: Bobject): MeetingData => {
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const companyName = company && getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const date = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const leadName = lead && getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const title = lead && getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  return {
    company,
    companyName,
    date,
    lead,
    leadName,
    title,
  };
};

const MeetingInfo = ({ activity }) => {
  const meetingData = getMeetingData(activity);
  const { t } = useTranslation();
  const { t: dateT } = useTranslation('translation', { keyPrefix: 'dates' });
  const isB2CAccount = useIsB2CAccount();

  return meetingData.date ? (
    <>
      <div className={styles.info}>
        <div className={styles._icon__wrapper}>
          <Icon name="calendar" color="extraMeeting" size={28} />
        </div>
        <div className={styles._card__body}>
          <Text color="darkGray" size="m" ellipsis={75}>
            <Text htmlTag="span" size="m" weight="bold">
              {meetingData?.title}
            </Text>{' '}
            {t('wizards.steps.callResult.at')}{' '}
            {
              // @ts-ignore
              !isToday(meetingData?.date) && (
                <Text htmlTag="span" size="m" weight="bold">
                  {useGetI18nSpacetime(meetingData?.date).format(dateT('shortMonth'))}
                </Text>
              )
            }{' '}
            <Text htmlTag="span" weight="bold" size="m">
              {useGetI18nSpacetime(meetingData?.date).format('{time}')}
            </Text>
          </Text>
          <Text color="softPeanut" size="s" ellipsis={75}>
            {meetingData?.leadName
              ? `${t('wizards.steps.callResult.with')} ${meetingData?.leadName} `
              : null}
            {meetingData?.companyName && !isB2CAccount
              ? `${t('wizards.steps.callResult.from')} ${meetingData?.companyName}`
              : null}
          </Text>
        </div>
      </div>
    </>
  ) : (
    <div className={styles._loading_wrapper}>
      <Spinner name="loadingCircle" />
    </div>
  );
};

export default MeetingInfo;
