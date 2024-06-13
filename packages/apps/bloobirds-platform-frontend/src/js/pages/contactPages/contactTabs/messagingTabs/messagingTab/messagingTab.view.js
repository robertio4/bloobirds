import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import EmailButton from '../../../../../components/emailButton';
import MessagingBattlecardsFilterSwitch from '../../../../../components/messagingTemplates/messagingBattlecardsFilterSwitch/messagingBattlecardsFilterSwitch';
import MessagingMineSwitch from '../../../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import MessagingSearchBar from '../../../../../components/messagingTemplates/messagingSearchBar/messagingSearchBar';
import MessagingVisibilitySwitch from '../../../../../components/messagingTemplates/messagingVisibilitySwitch/messagingVisibilitySwitch';
import MessagingTemplateCollection from '../../../../../layouts/messagingSectionLayout/messagingTemplateCollection/messagingTemplateCollection.container';
import { toTitleCase } from '../../../../../utils/strings.utils';
import { TEMPLATE_TYPES } from '../../../../../utils/templates.utils';
import BannerPlaybook from './bannerPlaybook';
import styles from './messagingTab.module.css';

const MessagingTab = ({ type, parentRef }) => (
  <div>
    <BannerPlaybook />
    <header className={styles.header}>
      <Text className={styles.title} htmlTag="h4" size="l" color="peanut">
        {toTitleCase(type)} templates
      </Text>
      <div className={styles.actions}>
        <div className={styles.switches}>
          <MessagingMineSwitch />
          <MessagingOfficialFilterSwitch />
          {type === TEMPLATE_TYPES.PITCH && <MessagingBattlecardsFilterSwitch />}
          <MessagingVisibilitySwitch />
        </div>
        <MessagingSearchBar placeholder="Search" />
      </div>
      {type === TEMPLATE_TYPES.EMAIL && (
        <div className={styles.emailButton}>
          <EmailButton isFromBB templateBody="" isBlankEmail />
        </div>
      )}
    </header>
    <MessagingTemplateCollection
      type="CONTACT_VIEW"
      templateType={TEMPLATE_TYPES[type]}
      parentRef={parentRef}
      scrollMargin={1000}
    />
  </div>
);

export default MessagingTab;
