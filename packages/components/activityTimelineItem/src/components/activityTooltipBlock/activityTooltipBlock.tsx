import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Checkbox, Text, TimelineItem } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import styles from './activityTooltipBlock.module.css';

const LearnMoreButton = ({ url, mixpanelEvent }: { url: string; mixpanelEvent: string }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  return (
    <Button
      size="small"
      color="lightestPurple"
      variant="primary"
      iconLeft="book"
      uppercase={false}
      className={styles.learnMoreButton}
      onClick={() => {
        window.open(url, '_blank');
        mixpanel.track(mixpanelEvent);
      }}
    >
      {t('learnMore')}
    </Button>
  );
};

const tooltipBlocks = t => [
  {
    id: 'EMAIL',
    title: t('emailTracking.title'),
    description: (
      <Text size="xxs" color="purple">
        <Trans i18nKey="activityTimelineItem.activityTooltip.emailTracking.description" />
      </Text>
    ),
    rightButton: (
      <LearnMoreButton
        url="https://support.bloobirds.com/hc/en-us/articles/360016268860-Email-tracking"
        mixpanelEvent={MIXPANEL_EVENTS.ACTIVITY_EMAIL_TOOLTIP_BUTTON_CLICKED}
      />
    ),
  },
  {
    id: 'LINKEDIN',
    title: t('linkedinTracking.title'),
    description: (
      <Text size="xxs" color="purple">
        <Trans i18nKey="activityTimelineItem.activityTooltip.linkedinTracking.description" />
      </Text>
    ),
    rightButton: (
      <LearnMoreButton
        url="https://support.bloobirds.com/hc/en-us/articles/360011435079-How-are-LinkedIn-messages-synchronised"
        mixpanelEvent={MIXPANEL_EVENTS.ACTIVITY_LINKEDIN_TOOLTIP_BUTTON_CLICKED}
      />
    ),
  },
];

export const ActivityTooltipBlock = ({
  sidePeekEnabled = false,
}: {
  sidePeekEnabled?: boolean;
}) => {
  const { save, has } = useUserHelpers();
  const { t } = useTranslation('translation', {
    keyPrefix: 'activityTimelineItem.activityTooltip',
  });

  const banishTooltip = () => {
    mixpanel.track(MIXPANEL_EVENTS.ACTIVITY_TOOLTIP_BLOCK_MARKED_AS_HIDDEN);
    save(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK);
  };

  return !has(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK) ? (
    <div
      className={clsx(styles.timeline_item_wrapper, {
        [styles.sidePeek_timeline_item_wrapper]: sidePeekEnabled,
      })}
    >
      {tooltipBlocks(t).map((tooltipBlock, index) => (
        <TimelineItem
          key={index + tooltipBlock.id}
          size="small"
          // @ts-ignore
          data={{
            icon: 'suggestions',
            color: 'verySoftPurple',
            iconColor: 'lightPurple',
            //@ts-ignore
            description: <div>{tooltipBlock.description}</div>,
          }}
          startDisplayDivider
          endDisplayDivider={tooltipBlock.id !== 'LINKEDIN'}
          backgroundColor="purple"
          activeHover={false}
        >
          <div className={styles.activityHeader}>
            <div className={styles.activityHeaderTitleWrapper}>
              <Text
                size="xs"
                weight="bold"
                color="purple"
                className={clsx(styles.activityHeaderTitle)}
              >
                {tooltipBlock.title}
              </Text>
            </div>
            {tooltipBlock.rightButton}
          </div>
        </TimelineItem>
      ))}
      <div
        className={styles.footer}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Checkbox
          onClick={value => {
            if (value) banishTooltip();
          }}
          size="small"
          color="purple"
        />
        <Text size="xxs">{t('doNotShowThisAgain')}</Text>
      </div>
    </div>
  ) : (
    <></>
  );
};
