import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { api } from '../utils/api';
import useModalVisibility from './useModalVisibility';

const bobjectAtom = atom({
  key: 'automatedEmailToSendAtom',
  default: null,
});

const modalTypeAtom = atom({
  key: 'automatedEmailModalTypeAtom',
  default: null,
});

const emailTypeAtom = atom({
  key: 'automatedEmailTypeAtom',
  default: null,
});

const useSendAutomatedEmail = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('automatedSendEmail');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bobject, setBobject] = useRecoilState(bobjectAtom);
  const [modalType, setModalType] = useRecoilState(modalTypeAtom);
  const [emailType, setEmailType] = useRecoilState(emailTypeAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);
  const resetModalType = useResetRecoilState(modalTypeAtom);
  const { createToast } = useToasts();

  const openConfirmSendEmailModal = ({
    bobjectToSet,
    type = 'SEND_NOW',
    emailType = 'AUTOMATED',
  }: {
    bobjectToSet: Bobject | Bobject[];
    type?: 'SEND_NOW' | 'RETRY' | 'RESEND';
    emailType?: 'AUTOMATED' | 'SCHEDULED';
  }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }

    if (type) {
      setModalType(type);
    }

    if (emailType) {
      setEmailType(emailType);
    }

    if (!isOpen) {
      openModal();
    }
  };

  const closeConfirmSendEmailModal = () => {
    if (isOpen) {
      closeModal();
      resetBobject();
      resetModalType();
    }
  };

  const sendEmail = async () => {
    try {
      const isBulkAction = Array.isArray(bobject);
      setIsSubmitting(true);

      if (isBulkAction) {
        const url: string =
          emailType === 'SCHEDULED'
            ? `/messaging/scheduledEmails/send`
            : `/messaging/automatedEmail/send`;
        const tasksId = bobject.map(bobjectItem => bobjectItem?.id.objectId);
        await api.put(url, {
          tasksId,
        });

        closeConfirmSendEmailModal();
        setIsSubmitting(false);
        createToast({
          type: 'success',
          message: 'Emails has been succesfully sent',
          position: 'top-right',
        });
      } else {
        const url: string =
          emailType === 'SCHEDULED'
            ? `/messaging/scheduledEmails/${bobject?.id.objectId}/send`
            : `/messaging/automatedEmail/${bobject?.id.objectId}/send`;
        await api.put(url);

        closeConfirmSendEmailModal();
        setIsSubmitting(false);
        createToast({
          type: 'success',
          message: 'Email has been succesfully sent',
          position: 'top-right',
        });
      }
    } catch (e) {
      closeConfirmSendEmailModal();
      setIsSubmitting(false);
      if (e?.response?.status === 504) {
        createToast({
          type: 'warning',
          message: 'Email had a short delay 😞 Please check if it was sent correctly',
          position: 'top-right',
        });
      } else {
        createToast({
          type: 'error',
          message:
            'Something went wrong while trying to send the email. Please check the task details and try again later',
          position: 'top-right',
        });
      }
    }
  };

  return {
    bobject,
    emailType,
    isOpen,
    isSubmitting,
    modalType,
    closeConfirmSendEmailModal,
    openConfirmSendEmailModal,
    sendEmail,
  };
};

export default useSendAutomatedEmail;
