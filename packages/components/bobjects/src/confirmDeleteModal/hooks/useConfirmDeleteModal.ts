import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { Bobject, UseAllItemsType } from '@bloobirds-it/types';

const confirmDeleteModalAtom = atom({
  key: 'confirmDeleteModal',
  default: {
    isOpen: false,
    bobject: null,
    isQueuedBulk: undefined,
    // use this to close bobject details from outside the component
    setRefresh: () => {},
    callback: () => {},
    length: null,
  },
});

export const useConfirmDeleteModal = () => {
  const [state, setState] = useRecoilState<any>(confirmDeleteModalAtom);
  const resetState = useResetRecoilState(confirmDeleteModalAtom);

  const closeDeleteModal = () => {
    resetState();
  };

  const openDeleteModal = (
    bobject: Bobject | Bobject[],
    isQueuedBulk: UseAllItemsType = false,
    setRefresh = () => {},
    callback = () => {},
    // Use it only in case list of bobjects is not long enough
    length?: number,
  ) => {
    setState({
      isOpen: true,
      bobject,
      isQueuedBulk,
      setRefresh,
      length,
      callback,
    });
  };

  return {
    ...state,
    openDeleteModal,
    closeDeleteModal,
  };
};
