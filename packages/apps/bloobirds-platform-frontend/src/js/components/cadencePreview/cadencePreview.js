import React from 'react';
import { usePreviewEmailModal } from '../../hooks/usePreviewEmailModal';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import { getReferencedBobject, isCompany, isLead, isOpportunity } from '../../utils/bobjects.utils';
import { CadencePreview } from '@bloobirds-it/cadence';

const WrappedCadencePreview = ({ cadenceId, selectedBobject }) => {
  const { handleOpenModal: handleOpenPreviewModal } = usePreviewEmailModal();
  const { selectedLead } = useSelectedLead();
  const { selectedOpportunity } = useSelectedOpportunity();

  const previewAutoEmail = (emailTemplateId, bobject) => {
    const templateRelevantBobjects = {
      company: isCompany(bobject) ? bobject : getReferencedBobject(selectedBobject),
      lead: isLead(bobject) ? bobject : selectedLead,
      opportunity: isOpportunity(bobject) ? bobject : selectedOpportunity,
    };
    handleOpenPreviewModal({
      templateId: emailTemplateId,
      ...templateRelevantBobjects,
    });
  };
  return (
    <CadencePreview
      cadenceId={cadenceId}
      selectedBobject={selectedBobject}
      onClickAutoEmail={previewAutoEmail}
    />
  );
};

export default WrappedCadencePreview;
