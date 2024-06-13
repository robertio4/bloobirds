import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Spinner, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import { isToday } from 'date-fns';
import { capitalize } from 'lodash';

import { ACTIVITY_DIRECTION } from '../../../constants/activity';
import { getSignedCallRecordingUrl } from '../../../utils/calls.utils';
import { getActivityData } from '../contactFlow.utils';
import styles from './callInfo.module.css';

const CallInfo = ({ activity }: { activity: Bobject }) => {
  const { createToast } = useToasts();
  const activityData = getActivityData(activity);
  const iconDirection =
    ACTIVITY_DIRECTION.INCOMING !== activityData?.direction ? 'arrowDownLeft' : 'arrowTopRight';
  const { t } = useTranslation();

  return activityData?.date ? (
    <>
      <div className={styles._call_info}>
        <div className={styles._icon__wrapper}>
          <Icon name="phone" color="melon" size={36} />
          {activityData?.direction && (
            <div className={styles._icon_direction}>
              <Icon name={iconDirection} color="melon" size={16} />
            </div>
          )}
        </div>
        <div className={styles._card__body}>
          <Text color="darkGray" size="l" ellipsis={75}>
            {capitalize(activityData?.direction)} call{' '}
            <Text htmlTag="span" weight="bold">
              {activityData?.phone}
            </Text>{' '}
            at{' '}
            {!isToday(activityData?.date) && (
              <Text htmlTag="span" weight="bold">
                {`${formatDateAsText({
                  text: activityData?.date,
                  patternFormat: '{month-short} {date-ordinal}',
                  t,
                })}`}
              </Text>
            )}
            <Text htmlTag="span" weight="bold">
              {formatDateAsText({ text: activityData?.date, patternFormat: 'time-24', t })}
            </Text>
          </Text>
          <Text color="softPeanut" size="m" ellipsis={75}>
            {activityData?.leadName ? `with ${activityData?.leadName} ` : null}
            {activityData?.companyName ? `from ${activityData?.companyName}` : null}
          </Text>
        </div>
        {activityData?.record && (
          <div className={styles._record_button}>
            <IconButton
              name="voicemail"
              size={24}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                getSignedCallRecordingUrl()
                  .then(url => {
                    window.open(url, '_blank');
                  })
                  .catch(() => {
                    createToast({
                      message: 'Failed to get the recording, it may have been deleted',
                      type: 'error',
                    });
                  });
              }}
            />
          </div>
        )}
        <div className={styles._card__info}>
          {activityData?.duration && (
            <Text size="m" weight="medium">
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
