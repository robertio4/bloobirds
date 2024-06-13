import React from 'react';

import { APP_PLAYBOOK_MESSAGING_PITCH_FORM } from '../../../app/_constants/routes';
import MessagingBattlecardsFilterSwitch from '../../../components/messagingTemplates/messagingBattlecardsFilterSwitch/messagingBattlecardsFilterSwitch';
import MessagingMineSwitch from '../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import { useRouter } from '../../../hooks';
import { useSnippetsEnabled } from '../../../hooks/useFeatureFlags';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import { FORM_MODES, TEMPLATE_TYPES } from '../../../utils/templates.utils';

const PitchTemplatesPage = () => {
  const { history } = useRouter();
  const hasSnippetsEnabled = useSnippetsEnabled();
  const ref = React.useRef(null);

  const config = {
    actionName: 'Create template',
    onClickAction: e =>
      history.push(`${APP_PLAYBOOK_MESSAGING_PITCH_FORM}?mode=${FORM_MODES.CREATION}`, {
        event: e,
      }),
    searchPlaceholder: 'Search',
  };

  return (
    <MessagingTemplatesLayout
      dataIntercom="account-settings-pitch-template-page"
      parentRef={ref}
      body={<MessagingTemplateCollection templateType={TEMPLATE_TYPES.PITCH} parentRef={ref} />}
      actions={
        <>
          <MessagingOfficialFilterSwitch />
          <MessagingBattlecardsFilterSwitch />
          <MessagingMineSwitch />
        </>
      }
      type={TEMPLATE_TYPES.PITCH}
      id="PITCH_MESSAGING_TEMPLATES"
      title={hasSnippetsEnabled ? 'Pitches' : 'Pitches & Snippets'}
      createConfig={config}
      pluralEntityName="Pitch templates"
    />
  );
};

export default PitchTemplatesPage;
