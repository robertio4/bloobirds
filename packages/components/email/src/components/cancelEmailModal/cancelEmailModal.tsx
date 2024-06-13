import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import styles from './cancelEmailModal.module.css';

const CancelEmailModal = ({
  handleClose,
  onSubmit,
  open,
  bobject,
}: {
  handleClose: () => void;
  onSubmit: () => void;
  open: boolean;
  bobject: Bobject;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { createToast } = useToasts();
  const isBulkAction = Array.isArray(bobject);
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.cancelEmailModal',
  });

  const cancelEmail = () => {
    setIsSubmitting(true);
    api
      .delete(`/bobjects/${bobject?.id?.value}`, {
        headers: { 'Content-Type': 'application/json' },
        data: {},
      })
      .then(() => {
        handleClose();
        if (onSubmit) {
          onSubmit();
        }
        setIsSubmitting(false);
        createToast({
          message: t('toasts.success'),
          type: 'success',
        });
      })
      .catch(() => {
        handleClose();
        setIsSubmitting(false);
        createToast({
          message: t('toasts.error'),
          type: 'error',
        });
      });
  };

  return (
    <Modal title="Cancel email" open={open} onClose={handleClose} width={640}>
      <ModalContent>
        <div className={styles.text}>
          {!isBulkAction ? (
            <Text size="m" align="center">
              {t('title')}
              <br />
              <b>{t('subtitle')}</b>
            </Text>
          ) : (
            <Text size="m" align="center">
              {t('titleBulk', { count: bobject?.length || 0 })}
              <br />
              <b>{t('subtitle')}</b>
            </Text>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose}>
          {t('back')}
        </Button>
        <Button color="tomato" onClick={cancelEmail}>
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            t('cancelEmail')
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CancelEmailModal;
