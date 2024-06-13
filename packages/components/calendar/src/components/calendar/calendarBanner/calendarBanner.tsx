import React from 'react';

import { Icon, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { BannerStates } from '../calendar';
import styles from '../calendar.module.css';

const getBannerText = (bannerState: BannerStates, t: TFunction) => {
  switch (bannerState) {
    case BannerStates.PAST:
      return t('calendar.banner.past');
    case BannerStates.EDIT:
      return t('calendar.banner.edit');
    default:
      return t('calendar.banner.create');
  }
};

export const CalendarBanner = ({
  bannerState,
  hideSlotsBanner,
  t,
}: {
  bannerState: BannerStates;
  hideSlotsBanner: () => void;
  t: TFunction;
}) => {
  const isCreatingPastSlots = bannerState === BannerStates.PAST;

  return bannerState !== BannerStates.INACTIVE ? (
    <div
      className={clsx(styles._slots_callout, {
        [styles._slots_callout_past]: isCreatingPastSlots,
      })}
    >
      <Icon
        name={isCreatingPastSlots ? 'alertTriangle' : 'meetingSlots'}
        color={isCreatingPastSlots ? 'tomato' : 'grape'}
        size={16}
      />
      <Text size="xxs" color="peanut">
        {getBannerText(bannerState, t)}
      </Text>
      <IconButton name="cross" color="peanut" size={18} onClick={hideSlotsBanner} />
    </div>
  ) : null;
};
