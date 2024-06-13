import React from 'react';

import { APP_PLAYBOOK_MESSAGING_SNIPPET_FORM } from '../../../app/_constants/routes';
import MessagingBattlecardsFilterSwitch from '../../../components/messagingTemplates/messagingBattlecardsFilterSwitch/messagingBattlecardsFilterSwitch';
import MessagingMineSwitch from '../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import { useRouter } from '../../../hooks';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import { FORM_MODES, TEMPLATE_TYPES } from '../../../utils/templates.utils';

export const SnippetTemplatesPage = () => {
  const { history } = useRouter();
  const ref = React.useRef(null);

  const config = {
    actionName: 'Create snippet',
    onClickAction: e =>
      history.push(`${APP_PLAYBOOK_MESSAGING_SNIPPET_FORM}?mode=${FORM_MODES.CREATION}`, {
        event: e,
      }),
    searchPlaceholder: 'Search',
  };

  return (
    <MessagingTemplatesLayout
      dataIntercom="account-settings-pitch-template-page"
      parentRef={ref}
      body={<MessagingTemplateCollection templateType={TEMPLATE_TYPES.SNIPPET} parentRef={ref} />}
      actions={
        <>
          <MessagingOfficialFilterSwitch />
          <MessagingBattlecardsFilterSwitch />
          <MessagingMineSwitch />
        </>
      }
      type={TEMPLATE_TYPES.SNIPPET}
      id="SNIPPET_MESSAGING_TEMPLATES"
      title="Snippets"
      createConfig={config}
      pluralEntityName="Snippet templates"
    />
  );
};
