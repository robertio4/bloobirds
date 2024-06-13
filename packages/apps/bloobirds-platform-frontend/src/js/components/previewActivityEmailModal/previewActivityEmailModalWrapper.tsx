import React from 'react';

import { PreviewActivityEmailModal } from '@bloobirds-it/email';

import { usePreviewActivityEmailModal } from '../../hooks/usePreviewActivityEmailModal';

export const PreviewActivityEmailModalWrapper = ({ onClose }: { onClose: any }) => {
  const { activity } = usePreviewActivityEmailModal();

  return <PreviewActivityEmailModal activity={activity} onClose={onClose} />;
};
