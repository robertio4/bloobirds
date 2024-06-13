import React from 'react';

import { TEMPLATE_TYPES } from '@bloobirds-it/types';

import { APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM } from '../../../app/_constants/routes';
import MessagingMineSwitch from '../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import { useRouter } from '../../../hooks';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import { FORM_MODES } from '../../../utils/templates.utils';

const WhatsappTemplatesPage = () => {
  const { history } = useRouter();
  const ref = React.useRef(null);
  const config = {
    actionName: 'Create template',
    onClickAction: e =>
      history.push(`${APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM}?mode=${FORM_MODES.CREATION}`, {
        event: e,
      }),
    searchPlaceholder: 'Search',
  };

  return (
    <MessagingTemplatesLayout
      parentRef={ref}
      dataIntercom="account-settings-whatsapp-template-page"
      body={<MessagingTemplateCollection templateType={TEMPLATE_TYPES.WHATSAPP} parentRef={ref} />}
      actions={
        <>
          <MessagingOfficialFilterSwitch />
          <MessagingMineSwitch />
        </>
      }
      type={TEMPLATE_TYPES.WHATSAPP}
      id="WHATSAPP_MESSAGING_TEMPLATES"
      title="Whatsapp Templates"
      createConfig={config}
      pluralEntityName="Whatsapp templates"
    />
  );
};

export default WhatsappTemplatesPage;
