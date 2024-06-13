import { Bobject,  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE, } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { BobjectApi } from '../misc/api/bobject';
import useModalVisibility from './useModalVisibility';

const bobjectAtom = atom({
  key: 'rescheduleAutomatedEmailAtom',
  default: null,
});

const useRescheduleAutomatedEmail = () => {
  const { isOpen, closeModal, openModal } = useModalVisibility('rescheduleAutomatedEmailModal');
  const [bobject, setBobject] = useRecoilState(bobjectAtom);
  const resetBobject = useResetRecoilState(bobjectAtom);

  const openRescheduleAutomatedEmailModal = ({
    bobjectToSet,
  }: {
    bobjectToSet: Bobject | Bobject[];
  }) => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }

    if (!isOpen) {
      openModal();
    }
  };

  const closeRescheduleAutomatedEmailModal = () => {
    if (isOpen) {
      closeModal();
      resetBobject();
    }
  };

  const rescheduleEmail = ({ datetime }: { datetime: Date }) => {
    if (Array.isArray(bobject)) {
      let data: any;
      bobject.forEach(bobjectItem => {
        data = {
          ...data,
          [bobjectItem?.id.objectId]: {
            [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
            [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
            [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
          },
        };
      });
      BobjectApi.request().Task().bulkPartialSet(data);
    } else {
      const data = {
        [TASK_FIELDS_LOGIC_ROLE.SCHEDULED_DATETIME]: datetime,
        [TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS]: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      };
      BobjectApi.request().Task().partialSet({ bobjectId: bobject?.id.objectId, data });
    }
  };

  return {
    bobject,
    isOpen,
    openRescheduleAutomatedEmailModal,
    closeRescheduleAutomatedEmailModal,
    rescheduleEmail,
  };
};

export default useRescheduleAutomatedEmail;
