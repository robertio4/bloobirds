import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';

import styles from './relatedObjects.module.css';

export const ConfirmDeleteModal = ({
  setOpen,
  onClose,
}: {
  setOpen: (open: boolean) => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.confirmCloseModal',
  });

  const closeDeleteModal = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onClose();
    closeDeleteModal();
  };

  return (
    <Modal width={600} open onClose={closeDeleteModal}>
      <ModalHeader>
        <ModalTitle>{t('title')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className={styles.confirmCloseModalContent}>
          <Text size="m" align="center">
            {t('subtitle1')}
          </Text>
          <Text size="m" align="center" weight="bold">
            {t('subtitle2')}
          </Text>
          <Text size="m" align="center">
            {t('subtitle3')}
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={closeDeleteModal}>
          {t('cancel')}
        </Button>
        <Button variant="primary" dataTest="deleteModalDeleteButton" onClick={handleDelete}>
          {t('confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
