import React from 'react';
import { usePreviewEmailModal } from '../../hooks/usePreviewEmailModal';
import { PreviewEmailModal } from '@bloobirds-it/email';

export const PreviewEmailModalWrapper = ({ onClose }: { onClose: any }) => {
  const { taskId } = usePreviewEmailModal();

  return <PreviewEmailModal taskId={taskId} onClose={onClose} />;
};
