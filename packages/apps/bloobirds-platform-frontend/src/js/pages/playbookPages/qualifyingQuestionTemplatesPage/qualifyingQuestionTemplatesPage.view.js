import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Text } from '@bloobirds-it/flamingo-ui';

import {
  APP_PLAYBOOK_MESSAGING_QQ_FORM,
  APP_PLAYBOOK_MESSAGING_QQ_SCORES,
} from '../../../app/_constants/routes';
import { ShowDisableCheckbox } from '../../../components/showDisableCheckbox/showDisableCheckbox';
import { useRouter } from '../../../hooks';
import MessagingTemplatesLayout from '../../../layouts/messagingSectionLayout';
import MessagingTemplateCollection from '../../../layouts/messagingSectionLayout/messagingTemplateCollection';
import { FORM_MODES, TEMPLATE_TYPES } from '../../../utils/templates.utils';

const QualifyingQuestionTemplatesPage = () => {
  const { history } = useRouter();
  const ref = React.useRef(null);
  const config = {
    actionName: 'Create',
    onClickAction: e =>
      history.push(`${APP_PLAYBOOK_MESSAGING_QQ_FORM}?mode=${FORM_MODES.CREATION}`, { event: e }),
    searchPlaceholder: 'Search',
  };
  const [showDisabled, setShowDisabled] = useState(false);

  return (
    <MessagingTemplatesLayout
      parentRef={ref}
      dataIntercom="account-settings-qualifying-question-page"
      body={
        <MessagingTemplateCollection
          templateType={TEMPLATE_TYPES.QUALIFYING_QUESTION}
          parentRef={ref}
          showDisabled={showDisabled}
        />
      }
      type={TEMPLATE_TYPES.QUALIFYING_QUESTION}
      actions={
        <Link to={APP_PLAYBOOK_MESSAGING_QQ_SCORES} style={{ textDecoration: 'none', height: 24 }}>
          <IconButton name="settings">
            <Text color="bloobirds" decoration="none" size="s">
              Score rating settings
            </Text>
          </IconButton>
        </Link>
      }
      id="QQ_MESSAGING_TEMPLATES"
      title="Qualifying Questions"
      createConfig={config}
      pluralEntityName="Qualifying questions"
      rightActions={
        <div style={{ marginRight: '12px' }}>
          <ShowDisableCheckbox showDisabled={showDisabled} setShowDisabled={setShowDisabled} />
        </div>
      }
    />
  );
};

export default QualifyingQuestionTemplatesPage;
