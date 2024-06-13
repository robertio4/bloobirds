import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import useSendAutomatedEmail from '../../hooks/useSendAutomatedEmail';
import ConfirmModal from '../confirmModal/confirmModal';
import { replaceVariables } from '../../utils/strings.utils';

enum ModalType {
  SEND = 'SEND_NOW',
  RETRY = 'RETRY',
  RESEND = 'RESEND',
}

const MODAL_TEXT = {
  [ModalType.SEND]: {
    single:
      'You are about to send an email. Be sure to check the contents are correct before sending it.',
  },
  [ModalType.RETRY]: {
    single:
      'You are going to try and send this email again. Be sure to check the contents are correct before sending it.',
  },
  [ModalType.RESEND]: {
    bulk:
      'You are going to try and send or resend ##EMAILS_NUMBER## emails. Be sure to check the contents are correct before sending them',
  },
};

const ConfirmSendAutomatedEmailModal = ({ onSubmit = () => {} }: { onSubmit?: () => void }) => {
  const {
    closeConfirmSendEmailModal,
    sendEmail,
    modalType,
    bobject,
    isSubmitting,
  } = useSendAutomatedEmail();
  const title = modalType === ModalType.SEND ? 'Send email' : 'Retry Send Email';
  const isBulkAction = Array.isArray(bobject);
  const text = isBulkAction
    ? replaceVariables(MODAL_TEXT[modalType]?.bulk, {
        EMAILS_NUMBER: bobject?.length,
      })
    : MODAL_TEXT[modalType].single;

  return (
    <ConfirmModal
      open
      title={title}
      body={
        <>
          <Text size="m">{text}</Text>
          <Text size="m">
            <b>This action cannot be undone</b>, are you sure you want to continue?
          </Text>
        </>
      }
      buttons={[
        <Button variant="tertiary" key="backButton" onClick={closeConfirmSendEmailModal}>
          Back
        </Button>,
        <Button
          variant="primary"
          key="sendEmailButton"
          dataTest="confirmSendAutomatedEmailButton"
          onClick={() => {
            sendEmail();
            onSubmit();
          }}
        >
          {isSubmitting ? (
            <Spinner color="white" size={14} name="loadingCircle" />
          ) : (
            `Send${isBulkAction ? 's' : ''} email`
          )}
        </Button>,
      ]}
      onClose={closeConfirmSendEmailModal}
    />
  );
};

export default ConfirmSendAutomatedEmailModal;
