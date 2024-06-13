import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  createToast,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from '@bloobirds-it/types';
import { replaceVariables, api, getFieldByLogicRole } from '@bloobirds-it/utils';

import styles from './sendEmailModal.module.css';

enum ModalType {
  SEND = 'SEND_NOW',
  RETRY = 'RETRY',
  RESEND = 'RESEND',
}

const MODAL_TEXT = t => ({
  [ModalType.SEND]: {
    single: t('send'),
  },
  [ModalType.RETRY]: {
    single: t('retry'),
  },
  [ModalType.RESEND]: {
    bulk: t('bulk'),
  },
});

const SendEmailModal = ({
  bobject,
  modalType,
  onSubmit = () => {},
  onClose = () => {},
}: {
  bobject: Bobject;
  modalType: ModalType;
  onSubmit?: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.sendEmailModal',
  });
  const title = modalType === ModalType.SEND ? t('sendEmail') : t('retrySend');
  const isBulkAction = Array.isArray(bobject);
  const text = isBulkAction
    ? // @ts-ignore
      replaceVariables(MODAL_TEXT(t)[modalType]?.bulk, {
        EMAILS_NUMBER: bobject?.length,
      })
    : // @ts-ignore
      MODAL_TEXT(t)[modalType].single;

  const isScheduledEmail =
    // @ts-ignore Task type has a different logic role composition
    getFieldByLogicRole(bobject, TASK_FIELDS_LOGIC_ROLE.TASK_TYPE)?.valueLogicRole ===
    TASK_TYPE.SCHEDULED_EMAIL;
  const [isSubmitting, setIsSubmitting] = useState(null);

  const sendEmail = async () => {
    try {
      const isBulkAction = Array.isArray(bobject);
      setIsSubmitting(true);

      if (isBulkAction) {
        const url: string = isScheduledEmail
          ? `/messaging/scheduledEmails/send`
          : `/messaging/automatedEmail/send`;
        const tasksId = bobject.map(bobjectItem => bobjectItem?.id.objectId);
        await api.put(url, {
          tasksId,
        });

        onClose();
        setIsSubmitting(false);
        createToast({
          type: 'success',
          message: t('toasts.success'),
          position: 'top-right',
        });
        onSubmit();
      } else {
        const url: string = isScheduledEmail
          ? `/messaging/scheduledEmails/${bobject?.id.objectId}/send`
          : `/messaging/automatedEmail/${bobject?.id.objectId}/send`;
        await api.put(url);

        onClose();
        setIsSubmitting(false);
        createToast({
          type: 'success',
          message: t('toasts.success'),
          position: 'top-right',
        });
        onSubmit();
      }
    } catch (e) {
      onClose();
      setIsSubmitting(false);
      if (e?.response?.status === 504) {
        createToast({
          type: 'warning',
          message: t('toasts.delay'),
          position: 'top-right',
        });
      } else {
        createToast({
          type: 'error',
          message: t('toasts.error'),
          position: 'top-right',
        });
        onSubmit();
      }
    }
  };

  return (
    <Modal open width={640} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>
          <Text size="m">{text}</Text>
          <Text size="m">
            <Trans i18nKey="smartEmailModal.components.sendEmailModal.cannotBeUndonde" />
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" key="backButton" onClick={onClose}>
          {t('back')}
        </Button>
        ,
        <Button
          variant="primary"
          key="sendEmailButton"
          dataTest="confirmSendAutomatedEmailButton"
          onClick={() => {
            sendEmail();
          }}
        >
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            t('sendButton', { count: isBulkAction ? bobject.length : 1 })
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SendEmailModal;
