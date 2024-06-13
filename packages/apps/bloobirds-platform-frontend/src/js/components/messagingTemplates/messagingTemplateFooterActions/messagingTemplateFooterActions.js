import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { PlaybookConfirmationModal } from '@bloobirds-it/playbook';

import { useActiveUser } from '../../../hooks';
import { useSnippetsEnabled } from '../../../hooks/useFeatureFlags';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { useQueryParam } from '../../../hooks/useQueryParams';
import { FORM_MODES, TEMPLATE_TYPES } from '../../../utils/templates.utils';
import styles from './messagingTemplateFooterActions.module.css';

function getCopy(type, hasSnippetsEnabled) {
  if (type === TEMPLATE_TYPES.QUALIFYING_QUESTION) {
    return 'Save Qualifying Question';
  } else if (type === TEMPLATE_TYPES.PITCH && hasSnippetsEnabled) {
    return 'Save Pitch';
  } else if (type === TEMPLATE_TYPES.SNIPPET && hasSnippetsEnabled) {
    return 'Save Snippet';
  } else {
    return 'Save Template';
  }
}

const MessagingTemplateFooterActions = ({ mode, type, onCancel, onDelete, templateOwner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const templateId = useQueryParam('id');
  const { formState } = useFormContext();
  const isAdmin = useIsAccountAdmin();
  const hasSnippetsEnabled = useSnippetsEnabled();
  const { activeUser } = useActiveUser();

  const isTheOwner = activeUser.id === templateOwner || !templateOwner || isAdmin;

  const saveCopy = getCopy(type, hasSnippetsEnabled);
  const isCloning = mode === 'CLONE';

  return (
    <footer className={styles.footer}>
      {mode === FORM_MODES.EDITION && type !== TEMPLATE_TYPES.QUALIFYING_QUESTION ? (
        <Button
          type="button"
          disabled={formState.isSubmitting}
          onClick={() => setIsModalOpen(true)}
          variant="tertiary"
          color="tomato"
        >
          Delete
        </Button>
      ) : (
        <div />
      )}
      <div className={styles.buttons}>
        <Button disabled={formState.isSubmitting} variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Tooltip
          title={!isCloning && !isTheOwner ? "You can't edit a template that you don't own" : null}
          position="top"
        >
          <Button
            disabled={formState.isSubmitting || (!isCloning && !isTheOwner)}
            type="submit"
            variant="primary"
          >
            {isCloning ? 'Clone' : saveCopy}
          </Button>
        </Tooltip>
      </div>
      <PlaybookConfirmationModal
        openMode={isModalOpen && 'Delete'}
        templateId={templateId}
        onClose={() => setIsModalOpen(false)}
        onAccept={onDelete}
      />
    </footer>
  );
};

export default MessagingTemplateFooterActions;
