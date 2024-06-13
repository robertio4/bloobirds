import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@bloobirds-it/flamingo-ui';

import styles from './saveWithSlotsModal.module.css';

const SaveWithSlotsModal = ({
  handleClose,
  onConfirm,
  open,
}: {
  handleClose: () => void;
  onConfirm: () => void;
  open: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose} width={640}>
      <ModalHeader className={styles.header}>
        <Icon name="alertTriangle" color="peanut" />
        <Text color="peanut" size="m">
          {t('smartEmailModal.components.saveWithNoSlotsModal.saveTemplate')}
        </Text>
      </ModalHeader>
      <ModalContent className={styles.text}>
        <Text color="peanut" size="m" inline align="center">
          <Trans i18nKey="smartEmailModal.components.saveWithNoSlotsModal.modalContentText" />
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose} color="extraMeeting">
          {t('smartEmailModal.components.saveWithNoSlotsModal.backAndEdit')}
        </Button>
        <Button onClick={onConfirm}>
          {t('smartEmailModal.components.saveWithNoSlotsModal.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SaveWithSlotsModal;
