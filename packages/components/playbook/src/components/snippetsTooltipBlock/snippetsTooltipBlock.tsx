import React from 'react';

import { Checkbox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { ExtensionHelperKeys, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import styles from './snippetsTooltipBlock.module.css';

export const SnippetsTooltipBlock = ({ hasBeenSeen }: { hasBeenSeen?: boolean }) => {
  const containerClasses = clsx(styles.container, { [styles.containerSeen]: hasBeenSeen });
  const { save, has } = useUserHelpers();

  const banishTooltip = () => {
    save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
    mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_TOOLTIP_BLOCK_MARKED_AS_HIDDEN);
  };

  return !has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN) ? (
    <div
      className={containerClasses}
      onClick={() =>
        window.open(
          'https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time',
          '_blank',
        )
      }
    >
      <div className={styles.cardText}>
        <div className={styles.leftIcons_container}>
          <Icon name="snippet" color="lightPurple" size={24} />
        </div>
        <div className={styles.templateTextWrapper}>
          <Text size="xs">
            <div>
              <b>Always write better and faster</b> Snippets are a great ally for professionals
              generating a great deal of content and who can reuse pieces of it to deliver quality
              texts faster.
            </div>
          </Text>
          <div className={styles.shortcutContainer}>
            <Text size="xs" weight="bold">
              Shortcut
            </Text>
            <div
              onClick={() =>
                window.open(
                  'https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time',
                  '_blank',
                )
              }
            >
              <Text size="xs" color="purple" className={styles.shortcut}>
                /why-snippets-are-the-best
              </Text>
            </div>
          </div>
          <div
            className={styles._footer_section}
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
            <Text size="xs">Do not show this again</Text>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
