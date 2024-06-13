import React from 'react';

import { TEMPLATE_TYPES } from '@bloobirds-it/types';

import { useQueryParams } from '../../../../hooks/useQueryParams';
import MessagingTemplateFormLayout from '../../../../layouts/messagingSectionLayout/messagingTemplateFormLayout';

const WhatsappTemplateFormContainer = () => {
  const queryParams = useQueryParams();

  return (
    <MessagingTemplateFormLayout
      templateType={TEMPLATE_TYPES.WHATSAPP}
      formMode={queryParams.get('mode')}
    />
  );
};

export default WhatsappTemplateFormContainer;
