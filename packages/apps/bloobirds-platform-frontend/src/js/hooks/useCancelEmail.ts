import { useState } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { BobjectApi } from '../misc/api/bobject';
import useModalVisibility from './useModalVisibility';

const bobjectAtom = atom({
  key: 'emailToCancelAtom',
  default: null,
});

const cancellEmailCallbackAtom = atom({
  key: 'cancellEmailCallbackAtom',
  default: null,
});

const useCancelEmail = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('cancelEmail');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bobject, setBobject] = useRecoilState(bobjectAtom);
  const [cancelEmailCallback, setCancelEmailCallback] = useRecoilState(cancellEmailCallbackAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);
  const { createToast } = useToasts();

  const openCancelEmailModal = ({
    bobjectToSet,
    onCancelCallback,
  }: {
    bobjectToSet: Bobject | Array<Bobject>;
    onCancelCallback?: () => void;
  }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
    setCancelEmailCallback(() => onCancelCallback);
    if (!isOpen) {
      openModal();
    }
  };

  const closeCancelEmailModal = () => {
    if (isOpen) {
      closeModal();
      resetBobject();
    }
  };

  const cancelEmail = () => {
    setIsSubmitting(true);
    if (Array.isArray(bobject)) {
      const objectsIds = bobject.map(element => element?.id.value) || [];

      BobjectApi.request()
        .Task()
        .bulkDelete(objectsIds)
        .then(() => {
          closeCancelEmailModal();
          setIsSubmitting(false);
          cancelEmailCallback();
          createToast({
            message: 'Emails have been succesfully cancel',
            type: 'info',
          });
        })
        .catch(() => {
          closeCancelEmailModal();
          setIsSubmitting(false);
          createToast({
            message: 'There was an error deleting the emails, please try again!',
            type: 'error',
          });
        });
    } else {
      BobjectApi.request()
        .Task()
        .delete(bobject?.id?.objectId)
        .then(() => {
          closeCancelEmailModal();
          setIsSubmitting(false);
          createToast({
            message: 'Email has been successfully cancelled',
            type: 'info',
          });
        })
        .catch(() => {
          closeCancelEmailModal();
          setIsSubmitting(false);
          createToast({
            message: 'There was an error deleting the email, please try again!',
            type: 'error',
          });
        });
    }
  };

  return {
    bobject,
    isOpen,
    isSubmitting,
    openCancelEmailModal,
    closeCancelEmailModal,
    cancelEmail,
    cancelEmailCallback,
  };
};

export default useCancelEmail;
