import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
  segToTime,
} from '@bloobirds-it/utils';
import { isToday } from 'date-fns';

import styles from './callInfo.module.css';

const getActivityData = activity => {
  const company = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)
    ?.referencedBobject;
  const companyName = company && getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const date = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const durationInSeconds = getValueFromLogicRole(
    activity,
    ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION,
  );
  const lead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const leadName = lead && getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const record = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);

  return {
    companyName,
    leadName,
    date,
    direction,
    duration: durationInSeconds ? segToTime(durationInSeconds, 'hhh mmm sss') : null,
    phone,
    record,
  };
};

const CallInfo = ({ activity }) => {
  const activityData = getActivityData(activity);
  const { t } = useTranslation();
  const { t: dateT } = useTranslation('translation', { keyPrefix: 'dates' });
  const isB2CAccount = useIsB2CAccount();

  const iconDirection =
    ACTIVITY_DIRECTION.INCOMING !== activityData?.direction ? 'arrowTopRight' : 'arrowDownLeft';

  return activityData?.date ? (
    <>
      <div className={styles._call_info}>
        <div className={styles._icon__wrapper}>
          <Icon name="phone" color="melon" size={28} />
          {activityData?.direction && (
            <div className={styles._icon_direction}>
              <Icon name={iconDirection} color="melon" size={12} />
            </div>
          )}
        </div>
        <div className={styles._card__body}>
          <Text color="darkGray" size="m" ellipsis={75}>
            {t('activityTimelineItem.item.' + activityData?.direction + 'Call')}{' '}
            <Text htmlTag="span" size="m" weight="bold">
              {activityData?.phone}
            </Text>{' '}
            {t('wizards.steps.callResult.at')}{' '}
            {
              // @ts-ignore
              !isToday(activityData?.date) && (
                <Text htmlTag="span" size="m" weight="bold">
                  {useGetI18nSpacetime(activityData?.date).format(dateT('shortMonth'))}
                </Text>
              )
            }{' '}
            <Text htmlTag="span" weight="bold" size="m">
              {useGetI18nSpacetime(activityData?.date).format('{time}')}
            </Text>
          </Text>
          <Text color="softPeanut" size="s" ellipsis={75}>
            {activityData?.leadName
              ? `${t('wizards.steps.callResult.with')} ${activityData?.leadName} `
              : null}
            {activityData?.companyName && !isB2CAccount
              ? `${t('wizards.steps.callResult.from')} ${activityData?.companyName}`
              : null}
          </Text>
        </div>
        {activityData?.record && (
          <div className={styles._record_button}>
            <IconButton
              name="voicemail"
              size={16}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                /*getSignedCallRecordingUrl()
                  .then(url => {
                    window.open(url, '_blank');
                  })
                  .catch(() => {
                    createToast({
                      message: 'Failed to get the recording, it may have been deleted',
                      type: 'error',
                    });
                  });*/
              }}
            />
          </div>
        )}
        <div className={styles._card__info}>
          {activityData?.duration && (
            <Text size="s" weight="medium">
              {activityData?.duration}
            </Text>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className={styles._loading_wrapper}>
      <Spinner name="loadingCircle" />
    </div>
  );
};

export default CallInfo;
