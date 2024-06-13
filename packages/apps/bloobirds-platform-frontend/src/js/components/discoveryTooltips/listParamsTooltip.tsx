import React from 'react';

import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperTooltipsKeys } from '@bloobirds-it/types';

import filtersAndColumns from '../../../assets/tooltipImages/filtersAndColumns.png';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import styles from './meetingForm.modules.css';

export const ListParamsTooltip = ({
  defaultTooltipVisible,
}: {
  defaultTooltipVisible: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const hasQSGEnabled = useQuickStartEnabled();
  const shouldBeShown =
    hasQSGEnabled && !has(UserHelperTooltipsKeys.CREATE_FIRST_LIST_FILTERS_COLUMNS);

  return (
    <span className={styles._filters_colums_tooltip}>
      {shouldBeShown && (
        <DiscoveryTooltip
          title="Now customize filters and columns"
          isPersistent
          visible={defaultTooltipVisible}
          anchor={<div />}
          height="300px"
          position="top-end"
          anchorShouldNotOpen
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img src={filtersAndColumns} width={211} alt={'filtersAndColumns'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter
            description="Choose the filters and columns in the order you need to access the information more easily."
            className={styles._lone_button}
          >
            <DiscoveryTooltip.TooltipButton
              isMainButton
              onClick={() => {
                save(UserHelperTooltipsKeys.CREATE_FIRST_LIST_FILTERS_COLUMNS);
              }}
            >
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      )}
    </span>
  );
};
