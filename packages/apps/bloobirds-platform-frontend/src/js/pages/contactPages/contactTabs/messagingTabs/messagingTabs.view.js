import React, { useEffect } from 'react';

import { TabGroup, Tab } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useRouter, useWhatsappEnabled } from '@bloobirds-it/hooks';
import { TEMPLATE_TYPES } from '@bloobirds-it/types';

import QualifyingQuestions from '../../../../components/qualifyingQuestions';
import { useContactView } from '../../../../hooks';
import { useSnippetsEnabled } from '../../../../hooks/useFeatureFlags';
import MessagingTab from './messagingTab';
import styles from './messagingTabs.module.css';

const MessagingTabs = props => {
  const { subtab: activeSubtab, setSubtab, setScrollOffset, scrollOffset } = useContactView();
  const hasSnippetsEnabled = useSnippetsEnabled();
  const { query } = useRouter();
  const { settings } = useActiveUserSettings();
  const accountId = settings?.account?.id;
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);

  useEffect(() => {
    if (!scrollOffset) {
      setScrollOffset(document.getElementById('contact-tabs')?.offsetTop - 48);
    }
  }, [query?.id]);

  return (
    <article className={styles._container}>
      <div className={styles._wrapper}>
        <TabGroup
          value={activeSubtab}
          onClick={subtab => {
            setSubtab(subtab);
            setScrollOffset(document.getElementById(query.id)?.scrollTop);
          }}
        >
          <Tab
            name={hasSnippetsEnabled ? 'Pitches' : 'Pitches & Snippets'}
            iconLeft="alignLeft"
            variant="secondary"
            color="softMelon"
            active={activeSubtab}
          >
            <MessagingTab type={TEMPLATE_TYPES.PITCH} {...props} />
          </Tab>
          <Tab
            name="Email Templates"
            iconLeft="mail"
            variant="secondary"
            color="softTangerine"
            dataTest="emailTab"
          >
            <MessagingTab type={TEMPLATE_TYPES.EMAIL} {...props} />
          </Tab>
          <Tab name="Linkedin Templates" iconLeft="linkedin" variant="secondary" color="bloobirds">
            <MessagingTab type={TEMPLATE_TYPES.LINKEDIN} {...props} />
          </Tab>
          {hasWhatsappEnabled && (
            <Tab name="WhatsApp Templates" iconLeft="whatsapp" variant="secondary" color="whatsapp">
              <MessagingTab type={TEMPLATE_TYPES.WHATSAPP} {...props} />
            </Tab>
          )}
          <Tab
            name="Qualifying Questions"
            iconLeft="chatSupport"
            variant="secondary"
            color="softBanana"
          >
            <QualifyingQuestions />
          </Tab>
        </TabGroup>
      </div>
    </article>
  );
};

export default MessagingTabs;
