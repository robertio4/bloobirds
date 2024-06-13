import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_DIRECTION } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import { isToday } from 'date-fns';

import { useContactFlow } from '../../../../hooks';
import { getActivityData } from '../../callResult.utils';
import styles from './callInfo.module.css';

const CallInfo = () => {
  const { activity } = useContactFlow();
  const activityData = getActivityData(activity);

  const iconDirection =
    ACTIVITY_DIRECTION.INCOMING !== activityData?.direction ? 'arrowDownLeft' : 'arrowTopRight';
  const { t } = useTranslation('translation', {
    keyPrefix: 'contactFlowModal.callResult',
  });
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
            <Trans
              i18nKey="contactFlowModal.callResult.callInfo.title"
              values={{
                direction: t(activityData?.direction),
                phone: activityData?.phone,
                date:
                  // @ts-ignore
                  (!isToday(activityData?.date)
                    ? formatDateAsText({
                        text: activityData?.date,
                        patternFormat: '{month-short} {date-ordinal}',
                        t,
                      })
                    : '') +
                  formatDateAsText({ text: activityData?.date, patternFormat: 'time-24', t }),
                leadName: activityData?.leadName ? `with ${activityData?.leadName} ` : "",
                companyName: activityData?.companyName ? `from ${activityData?.companyName}` : ""
              }}
              components={[
                <Text key="0" color="softPeanut" size="s" ellipsis={75}>{""}</Text>
              ]}
            />
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
