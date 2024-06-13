import { UserHelperKeys } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import { useUserHelpers } from '../../../../hooks/useUserHelpers';

const isUserCreatedModalAtom = atom({
  key: 'isUserCreatedModalAtom',
  default: false,
});

export const useUserCreatedModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(isUserCreatedModalAtom);
  const { has } = useUserHelpers();
  const dontShowAgain = has(UserHelperKeys.DONT_SHOW_AGAIN_CREATED_USER_MODAL);

  const handleCloseUserCreatedModal = () => {
    setModalOpen(false);
  };

  const handleOpenUserCreatedModal = () => {
    if (!dontShowAgain) setModalOpen(true);
  };
  return {
    handleCloseUserCreatedModal,
    handleOpenUserCreatedModal,
    modalOpen,
  };
};
