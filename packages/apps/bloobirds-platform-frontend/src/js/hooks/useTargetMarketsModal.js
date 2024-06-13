import { UserHelperKeys } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import { useUserHelpers } from './useUserHelpers';

const targetMarketsModalOpenAtom = atom({
  key: 'targetMarketsModalOpenAtom',
  default: false,
});

export const useTargetMarketsModal = () => {
  const { save } = useUserHelpers();
  const [targetMarketsModalOpen, setTargetMarketsModalOpen] = useRecoilState(
    targetMarketsModalOpenAtom,
  );

  const openTargetMarketsModal = () => {
    if (!targetMarketsModalOpen) {
      setTargetMarketsModalOpen(true);
    }
  };

  const closeTargetMarketsModal = () => {
    save(UserHelperKeys.CHECK_OUT_YOUR_TARGET_MARKETS);
    if (targetMarketsModalOpen) {
      setTargetMarketsModalOpen(false);
    }
  };

  return {
    isOpen: targetMarketsModalOpen,
    closeTargetMarketsModal,
    openTargetMarketsModal,
  };
};
