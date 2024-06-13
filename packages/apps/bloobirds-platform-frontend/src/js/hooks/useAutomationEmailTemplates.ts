import { TEMPLATE_TYPES } from '../utils/templates.utils';
import { useMessagingTemplates } from './useMessagingTemplates';

function useAutomationEmailTemplates() {
  const { messagingTemplates, isLoading } = useMessagingTemplates({
    name: null,
    segmentationValues: {},
    visibility: 'PUBLIC',
    type: TEMPLATE_TYPES.EMAIL,
    stage: 'ALL',
    page: 0,
    size: 200,
  });

  const validTemplates = messagingTemplates
    .filter(template => template.format === 'AST')
    .filter(template => template.visibility === 'PUBLIC');

  return {
    messagingTemplates: validTemplates,
    loading: isLoading,
  };
}

export default useAutomationEmailTemplates;
