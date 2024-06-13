import { DiscoveryTooltip } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './meetingForm.modules.css';
import { useQuickStartEnabled } from '../../hooks/useQuickStartGuide';
import { useHasQueryParam } from '../../hooks/useHasQueryParam';
import startCadence from '../../../assets/tooltipImages/startCadence.png';
import markAsDone from '../../../assets/tooltipImages/markAsDoneTooltip.png';

const tooltipInfoDictionary = {
  LaunchCadence: {
    title: 'Start your first cadence here',
    description: '',
    image: startCadence,
    className: styles._start_cadence_tooltip_content,
  },
  MarkAsDone: {
    title: 'Well done! Mark as done this task and continue...',
    description:
      'Mark a task as completed to clear your task feed. At the end of the day it should be empty. You can also complete tasks from the company, lead and opportunity view.',
    image: markAsDone,
    className: styles._mark_as_done_tooltip_content,
  },
};

export const ProspectCardInfoTooltip = ({
  defaultTooltipVisible,
  children,
}: {
  children: React.ReactElement;
  defaultTooltipVisible: boolean;
}) => {
  const hasQSGEnabled = useQuickStartEnabled();
  const tooltipType = useHasQueryParam('fromGuide');
  const shouldBeShown =
    hasQSGEnabled && ['LaunchCadence', 'MarkAsDone'].includes(useHasQueryParam('fromGuide'));
  const { title, description, image, className } = tooltipInfoDictionary[tooltipType] || {};

  return shouldBeShown ? (
    <div className={styles._start_cadence_tooltip}>
      <DiscoveryTooltip
        title={title}
        isPersistent
        visible={defaultTooltipVisible}
        anchor={children}
        height="220px"
        position="bottom"
        anchorShouldNotOpen
        className={className}
      >
        <DiscoveryTooltip.TooltipImage>
          <img src={image} alt={tooltipType} width={136} />
        </DiscoveryTooltip.TooltipImage>
        <DiscoveryTooltip.TooltipFooter description={description} className={styles._lone_button}>
          <DiscoveryTooltip.TooltipButton isMainButton onClick={() => {}}>
            Ok
          </DiscoveryTooltip.TooltipButton>
        </DiscoveryTooltip.TooltipFooter>
      </DiscoveryTooltip>
    </div>
  ) : (
    children
  );
};
