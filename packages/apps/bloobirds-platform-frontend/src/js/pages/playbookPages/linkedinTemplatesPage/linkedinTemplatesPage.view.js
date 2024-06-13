import React from 'react';

import { APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM } from '../../../app/_constants/routes';
import MessagingMineSwitch from '../../../components/messagingTemplates/messagingMineSwitch/messagingMineSwitch';
import MessagingOfficialFilterSwitch from '../../../components/messagingTemplates/messagingOfficialFilterSwitch/messagingOfficialFilterSwitch';
import { useRouter } from '../../../hooks';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import { FORM_MODES, TEMPLATE_TYPES } from '../../../utils/templates.utils';

const LinkedinTemplatesPage = () => {
  const { history } = useRouter();
  const ref = React.useRef(null);
  const config = {
    actionName: 'Create template',
    onClickAction: e =>
      history.push(`${APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM}?mode=${FORM_MODES.CREATION}`, {
        event: e,
      }),
    searchPlaceholder: 'Search',
  };

  return (
    <MessagingTemplatesLayout
      parentRef={ref}
      dataIntercom="account-settings-linkedin-template-page"
      body={<MessagingTemplateCollection templateType={TEMPLATE_TYPES.LINKEDIN} parentRef={ref} />}
      actions={
        <>
          <MessagingOfficialFilterSwitch />
          <MessagingMineSwitch />
        </>
      }
      type={TEMPLATE_TYPES.LINKEDIN}
      id="LINKEDIN_MESSAGING_TEMPLATES"
      title="Linkedin Templates"
      createConfig={config}
      pluralEntityName="Linkedin templates"
    />
  );
};

export default LinkedinTemplatesPage;
