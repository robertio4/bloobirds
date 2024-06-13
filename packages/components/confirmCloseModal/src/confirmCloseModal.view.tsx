import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useMinimizableModal, useMinimizableModals } from '@bloobirds-it/hooks';

import styles from './confirmCloseModal.module.css';

export const ConfirmCloseModal = () => {
  const { confirmationModal } = useMinimizableModals();
  const { open, id } = confirmationModal;
  const { closeModal, type, cancelConfirmModal } = useMinimizableModal(id);
  const { t } = useTranslation();
  const handleDelete = () => {
    cancelConfirmModal();
    closeModal();
  };

  return (
    <Modal width={600} open={open} onClose={cancelConfirmModal}>
      <ModalHeader>
        <ModalTitle>{t('confirmCloseModal.close')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className={styles._content}>
          <Text size="m">
            {t('confirmCloseModal.title', { type: t(`minimizableModals.${type}`) })}
          </Text>
          <Text size="m">
            <Trans i18nKey="confirmCloseModal.subtitle" />
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={cancelConfirmModal}>
          {t('confirmCloseModal.cancel')}
        </Button>
        <Button
          variant="primary"
          color="tomato"
          dataTest="deleteModalDeleteButton"
          onClick={handleDelete}
        >
          {t('confirmCloseModal.discard')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
