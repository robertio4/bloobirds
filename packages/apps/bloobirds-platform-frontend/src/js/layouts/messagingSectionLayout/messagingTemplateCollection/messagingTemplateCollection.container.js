import React from 'react';

import { Spinner } from '@bloobirds-it/flamingo-ui';
import { fil } from 'date-fns/locale';

import { useQualifyingQuestions } from '../../../hooks';
import useActiveMessagingFilters from '../../../hooks/useActiveMessagingFilters';
import { useMessagingTemplates } from '../../../hooks/useMessagingTemplates';
import { TEMPLATE_TYPES } from '../../../utils/templates.utils';
import MessagingTemplateCollectionView from './messagingTemplateCollection.view';

const MessagingTemplateCollection = ({ templateType, ...props }) => {
  const filters = useActiveMessagingFilters();
  const { messagingTemplates, isLoading } = useMessagingTemplates({
    ...filters,
    type: templateType,
    size: 200,
  });

  if (isLoading) {
    return <Spinner name="loadingCircle" />;
  }

  if (messagingTemplates.length === 0) {
    return null;
  }

  return (
    <MessagingTemplateCollectionView
      templateCollection={messagingTemplates}
      templateType={templateType}
      {...props}
    />
  );
};

const QualifyingQuestionCollection = ({ templateType, ...props }) => {
  const filters = useActiveMessagingFilters();

  let newFilters = filters;
  if (!filters.enabled && !props?.showDisabled) {
    newFilters = {
      ...filters,
      enabled: !props?.showDisabled,
    };
  }
  const { qualifyingQuestions, isLoading } = useQualifyingQuestions(newFilters);

  if (isLoading) {
    return <Spinner name="loadingCircle" />;
  }

  if (qualifyingQuestions.length === 0) {
    return null;
  }

  return (
    <MessagingTemplateCollectionView
      templateCollection={qualifyingQuestions}
      templateType={templateType}
      {...props}
    />
  );
};

// TODO: Rename type to "viewType" or remove it when refactor
const MessagingTemplateCollectionContainer = props => {
  const { templateType } = props;
  if (templateType === TEMPLATE_TYPES.QUALIFYING_QUESTION) {
    return <QualifyingQuestionCollection {...props} />;
  }
  return <MessagingTemplateCollection {...props} />;
};

export default MessagingTemplateCollectionContainer;
