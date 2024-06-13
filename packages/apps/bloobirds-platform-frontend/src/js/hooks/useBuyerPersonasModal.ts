import { UserHelperKeys } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import { useUserHelpers } from './useUserHelpers';

const buyerPersonasModalOpenAtom = atom({
  key: 'buyerPersonasModalOpenAtom',
  default: false,
});

export const useBuyerPersonasModal = () => {
  const { save } = useUserHelpers();
  const [buyerPersonasModalOpen, setBuyerPersonasModalOpen] = useRecoilState(
    buyerPersonasModalOpenAtom,
  );

  const openBuyerPersonasModal = () => {
    if (!buyerPersonasModalOpen) {
      setBuyerPersonasModalOpen(true);
    }
  };

  const closeBuyerPersonasModal = () => {
    save(UserHelperKeys.CHECK_OUT_YOUR_BUYER_PERSONAS);
    if (buyerPersonasModalOpen) {
      setBuyerPersonasModalOpen(false);
    }
  };

  return {
    isOpen: buyerPersonasModalOpen,
    closeBuyerPersonasModal,
    openBuyerPersonasModal,
  };
};
