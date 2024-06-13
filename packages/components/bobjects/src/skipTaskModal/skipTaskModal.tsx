import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, IconButton, Item, Modal, Select, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useOpenSkipTaskModal, useSkipModal } from '@bloobirds-it/hooks';

import styles from './skipTaskModal.module.css';

export const SkipTaskModal = () => {
  const { isOpen } = useOpenSkipTaskModal();

  return isOpen ? <SkipTaskModalComponent /> : <></>;
};

const SkipTaskModalComponent = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.skipTaskModal' });
  const { closeSkipTaskModal, task, onSave } = useOpenSkipTaskModal();
  const { skipTask, skipReasons, isRequiredField } = useSkipModal();

  const [reasonSelected, setReasonSelected] = useState<string>(undefined);

  const handleSkip = () => {
    skipTask(task, reasonSelected).then(() => {
      closeSkipTaskModal();
      onSave();
    });
  };

  return (
    <Modal className={styles.modal} open onClose={closeSkipTaskModal}>
      <header className={styles.header}>
        <Text size="xl">{t('title')}</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={closeSkipTaskModal} />
      </header>
      <main className={styles.content}>
        <Text size="m">{t('subtitle')}</Text>
        <Select
          size="small"
          variant="form"
          placeholder={t('placeholder')}
          autocomplete
          width="100%"
          value={reasonSelected}
          onChange={setReasonSelected}
        >
          <Item value="">
            <em>{t('none')}</em>
          </Item>
          {skipReasons?.map((reason: any) => (
            <Item key={reason.id} label={reason.name} value={reason.id}>
              {reason.name}
            </Item>
          ))}
        </Select>
      </main>
      <footer className={styles.footer}>
        <Tooltip title={isRequiredField && !reasonSelected && t('required')} position="top">
          <Button
            variant="primary"
            disabled={isRequiredField && !reasonSelected}
            uppercase={false}
            onClick={handleSkip}
          >
            {t('save')}
          </Button>
        </Tooltip>
      </footer>
    </Modal>
  );
};
