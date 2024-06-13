import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@bloobirds-it/flamingo-ui';

import { PlaybookConfirmationModal } from '../../playbookConfirmationModal/playbookConfirmationModal';
import styles from '../handleTemplate.module.css';

export const HandleTemplateHeader = ({
  onBack,
  handleSave,
  viewSegmentation,
  switchView,
  isEditing,
  isSnippet,
}: {
  onBack;
  handleSave;
  viewSegmentation: boolean;
  switchView: () => void;
  isEditing: boolean;
  isSnippet: boolean;
}) => {
  const [discardModalOpen, setDiscardModalOpen] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateFormHeader' });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.formHeader}>
          {!viewSegmentation ? (
            <>
              <Button
                iconLeft="cross"
                size="small"
                color="tomato"
                onClick={() => setDiscardModalOpen(true)}
                variant="clear"
                uppercase={false}
                className={styles.noPadding}
              >
                {isEditing ? t('discardChanges') : t('discardTemplate')}
              </Button>
              <Button
                iconLeft="save"
                size="small"
                color="purple"
                onClick={handleSave}
                uppercase={false}
              >
                {t('save')}
              </Button>
            </>
          ) : (
            <Button
              iconLeft="arrowLeft"
              size="small"
              color="purple"
              onClick={switchView}
              variant="clear"
              uppercase={false}
              className={styles.noPadding}
            >
              {t('goBack')}
            </Button>
          )}
        </div>
        <div className={styles.headerText}>
          <Text size="m" weight="bold">
            {isEditing
              ? t('editTitle', { type: isSnippet ? 'snippet' : 'template' })
              : t('saveNewTitle', { type: isSnippet ? 'snippet' : 'template' })}
          </Text>
          {!viewSegmentation && (
            <Button
              variant="clear"
              size="small"
              uppercase={false}
              iconLeft={viewSegmentation ? 'noteAction' : 'sliders'}
              onClick={switchView}
              color="purple"
              className={styles.noPadding}
            >
              {t('changeSegmentation')}
            </Button>
          )}
        </div>
      </div>
      <PlaybookConfirmationModal
        openMode={discardModalOpen && 'Discard'}
        templateId={isEditing && 'templateId'}
        onClose={() => setDiscardModalOpen(false)}
        onAccept={onBack}
      />
    </>
  );
};
