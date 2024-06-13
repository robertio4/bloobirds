import React from 'react';

import { Spinner, useToasts } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useRouter } from '../../../hooks';
import useMessagingTemplate from '../../../hooks/useMessagingTemplate';
import { useQueryParam } from '../../../hooks/useQueryParams';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { FORM_MODES, TEMPLATE_TYPES, typeToUrl } from '../../../utils/templates.utils';
import MessagingTemplateForm from './messagingTemplateForm';

const MessagingTemplateFormLayoutContainer = ({ formMode, templateType }) => {
  const { history } = useRouter();
  const templateId = useQueryParam('id');
  const fromUrl = useQueryParam('from');
  const mode = useQueryParam('mode');
  const { createToast } = useToasts();
  const helpers = useUserHelpers();

  const {
    messagingTemplate,
    saveMessagingTemplate,
    deleteMessagingTemplate,
    isLoading,
    error,
  } = useMessagingTemplate(templateId);

  if (formMode === FORM_MODES.EDITION && isLoading) {
    return <Spinner name="loadingCircle" />;
  }
  if (formMode === FORM_MODES.CLONE && isLoading) {
    return <Spinner name="loadingCircle" />;
  }
  const navigateBack = () => {
    history.push(fromUrl || typeToUrl(templateType));
  };

  return (
    <MessagingTemplateForm
      mode={mode}
      templateType={templateType}
      messagingTemplate={messagingTemplate}
      error={error}
      onSave={async newMessagingTemplate => {
        const res = await saveMessagingTemplate(newMessagingTemplate);
        if (res === 409) {
          createToast({
            type: 'error',
            message: 'A pitch with the same name already exists, please try with a new one',
          });
        } else {
          createToast({
            type: 'success',
            message:
              newMessagingTemplate?.type === TEMPLATE_TYPES.PITCH
                ? 'Pitch saved successfully'
                : 'Template saved successfully',
          });
          if (newMessagingTemplate?.type === 'EMAIL' && !newMessagingTemplate.id) {
            helpers.save(UserHelperKeys.CREATE_FIRST_EMAIL_TEMPLATE);
          }
          if (newMessagingTemplate?.type === 'PITCH' && !newMessagingTemplate.id) {
            helpers.save(UserHelperKeys.CREATE_YOUR_FIRST_PITCH);
          }
          navigateBack();
        }
      }}
      onDelete={async () => {
        await deleteMessagingTemplate(templateId);
        createToast({ type: 'success', message: 'Template deleted successfully' });
        navigateBack();
      }}
      onCancel={navigateBack}
    />
  );
};

export default MessagingTemplateFormLayoutContainer;
