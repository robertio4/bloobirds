import React from 'react';

import {
  Button,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@bloobirds-it/flamingo-ui';

import styles from './confirmSendModal.module.css';
import { Trans, useTranslation } from "react-i18next";

const ConfirmSendModal = ({
  handleClose,
  onConfirm,
  open,
}: {
  handleClose: () => void;
  onConfirm: () => void;
  open: boolean;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.confirmSendModal',
  });
  return (
    <Modal open={open} onClose={handleClose} width={640}>
      <ModalHeader className={styles.header}>
        <Icon name="save" color="peanut" />
        <Text color="peanut" size="m">
          {t('title')}
        </Text>
      </ModalHeader>
      <ModalContent className={styles.text}>
        <Text color="peanut" size="m" inline>
          <Trans i18nKey="smartEmailModal.components.confirmSendModal.content"/>
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose} color="extraMeeting">
          {t('cancel')}
        </Button>
        <Button onClick={onConfirm}>{t('sendEmail')}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmSendModal;
