import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './meetingForm.modules.css';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import createList from '../../../assets/tooltipImages/createList.png';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';

export const CreateListTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  children: React.ReactElement;
  defaultTooltipVisible: boolean;
}) => {
  const hasQSGEnabled = useQuickStartEnabled();
  const shouldBeShown = hasQSGEnabled && useHasQueryParam('fromGuide') === 'createList';

  return (
    <span>
      {shouldBeShown ? (
        <DiscoveryTooltip
          title={`Create your first list`}
          isPersistent
          visible={defaultTooltipVisible}
          anchor={children}
          height="220px"
          position="top-end"
          anchorShouldNotOpen
        >
          <DiscoveryTooltip.TooltipImage className={styles._home_filters_image}>
            <img src={createList} width={133} alt={'calendar'} />
          </DiscoveryTooltip.TooltipImage>
          <DiscoveryTooltip.TooltipFooter description="" className={styles._lone_button}>
            <DiscoveryTooltip.TooltipButton isMainButton onClick={() => {}}>
              Ok
            </DiscoveryTooltip.TooltipButton>
          </DiscoveryTooltip.TooltipFooter>
        </DiscoveryTooltip>
      ) : (
        children
      )}
    </span>
  );
};
