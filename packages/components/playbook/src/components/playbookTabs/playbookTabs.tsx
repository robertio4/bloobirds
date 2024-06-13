import React, { memo } from 'react';

import { SnippetsTooltip } from '@bloobirds-it/discovery-tooltips';
import { PlaybookTab } from '@bloobirds-it/types';

import { Environment } from '../../types/playbook';
import styles from '../playbookFeed/playbookFeed.module.css';
import { PlaybookTabElement } from './playbookTabElement';

interface PlaybookTabProps {
  environment: Environment;
  hasSnippetsEnabled: boolean;
  hasWhatsappEnabled: boolean;
  tabSelected: PlaybookTab;
  handleChangeTab: (tab: PlaybookTab) => void;
  sidePeekEnabled: boolean;
}

export const PlaybookTabs = memo(
  ({
    environment,
    hasSnippetsEnabled,
    hasWhatsappEnabled,
    tabSelected,
    handleChangeTab,
    sidePeekEnabled,
  }: PlaybookTabProps) => {
    const props = {
      onClick: handleChangeTab,
      selected: tabSelected,
      sidePeekEnabled,
      isSmartEmail: environment === Environment.SMART_EMAIL,
    };
    switch (environment) {
      case Environment.SMART_EMAIL:
        return hasSnippetsEnabled ? (
          <div className={styles.tabs_container}>
            <PlaybookTabElement
              name={PlaybookTab.EMAILS}
              icon="mail"
              className={styles.see_tabs_item}
              dataTest="playbook-tab-emails-SEE"
              {...props}
            />
            <div style={{ position: 'relative', display: 'flex' }}>
              <PlaybookTabElement
                name={PlaybookTab.SNIPPETS}
                icon="snippet"
                className={styles.see_tabs_item}
                dataTest="playbook-tab-snippets-SEE"
                {...props}
              />
              <SnippetsTooltip />
            </div>
          </div>
        ) : null;
      case Environment.EXTENSION:
        return (
          <div className={styles.tabs_container}>
            <PlaybookTabElement name={PlaybookTab.PITCHES} icon="chat" {...props} />
            {hasSnippetsEnabled && (
              <PlaybookTabElement name={PlaybookTab.SNIPPETS} icon="snippet" {...props} />
            )}
            <PlaybookTabElement name={PlaybookTab.EMAILS} icon="mail" {...props} />
            <PlaybookTabElement name={PlaybookTab.LINKEDIN} icon="linkedin" {...props} />
            {hasWhatsappEnabled && (
              <PlaybookTabElement name={PlaybookTab.WHATSAPP} icon="whatsapp" {...props} />
            )}
            <PlaybookTabElement name={PlaybookTab.QQS} icon="chatSupport" {...props} />
          </div>
        );
      case Environment.DIALER:
      case Environment.LINKEDIN_TEMPLATE_SELECTOR:
      case Environment.WHATSAPP_TEMPLATE_SELECTOR:
        return <></>;
    }
  },
  (prevProps, nextProps) => prevProps.tabSelected === nextProps.tabSelected,
);
