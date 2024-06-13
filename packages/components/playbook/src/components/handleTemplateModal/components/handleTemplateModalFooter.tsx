import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';
import { AttachmentList } from '@bloobirds-it/misc';

import { OpenMode } from '../../playbookConfirmationModal/playbookConfirmationModal';
import styles from '../handleTemplateModal.module.css';
import { AttachmentLinkList } from './attachmentList';

export const HandleTemplateModalFooter = ({
  attachedFiles,
  removeAttachedFile,
  attachedLinks,
  removeAttachedLink,
  isSubmitting,
  isEditing,
  openConfirmationModal,
}: {
  attachedFiles;
  removeAttachedFile;
  attachedLinks;
  removeAttachedLink;
  isSubmitting;
  isEditing;
  openConfirmationModal: (action: OpenMode) => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.handleTemplate' });

  return (
    <div>
      {attachedFiles?.length > 0 && (
        <AttachmentList files={attachedFiles} onDelete={removeAttachedFile} />
      )}
      {attachedLinks?.length > 0 && (
        <AttachmentLinkList files={attachedLinks} onDelete={removeAttachedLink} />
      )}
      <div className={styles.footerActions}>
        <span data-intercom="send-email-modal-action-cancel">
          <Button
            variant="clear"
            color={isSubmitting ? undefined : 'tomato'}
            onClick={() => openConfirmationModal(isEditing ? 'Delete' : 'Discard')}
            disabled={isSubmitting}
          >
            {isEditing ? t('deleteTemplate') : t('discardTemplate')}
          </Button>
        </span>
        <div className={styles.footerButtons}>
          {isEditing && (
            <Button
              variant="secondary"
              iconLeft="clock"
              onClick={() => openConfirmationModal('Discard')}
              color="purple"
            >
              {t('discardChanges')}
            </Button>
          )}

          <Button
            onClick={() => openConfirmationModal('Save')}
            variant="primary"
            iconLeft={'save'}
            color="purple"
          >
            {t('saveTemplate')}
          </Button>
        </div>
      </div>
    </div>
  );
};
