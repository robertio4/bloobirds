import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import useModalVisibility from '../../hooks/useModalVisibility';

const changeStatusBobjectAtom = atom({
  key: 'changeStatusBobjectIdAtom',
  default: undefined,
});

const useChangeStatus = () => {
  const [changeStatusBobject, setChangeStatusBobject] = useRecoilState<Bobject | Bobject[]>(
    changeStatusBobjectAtom,
  );
  const resetChangeStatusBobject = useResetRecoilState(changeStatusBobjectAtom);

  const {
    openModal: openChangeStatusModal,
    closeModal: closeChangeStatusModal,
    isOpen,
  } = useModalVisibility('changeStatusModal');

  const openModal = (bobjectToSet: Bobject | Array<Bobject>) => {
    if (bobjectToSet) {
      setChangeStatusBobject(bobjectToSet);
      openChangeStatusModal();
    }
  };

  const closeModal = () => {
    resetChangeStatusBobject();
    closeChangeStatusModal();
  };

  return {
    bobject: changeStatusBobject,
    closeChangeStatusModal: closeModal,
    openChangeStatusModal: openModal,
    isChangeStatusModalOpen: isOpen,
  };
};

export default useChangeStatus;
