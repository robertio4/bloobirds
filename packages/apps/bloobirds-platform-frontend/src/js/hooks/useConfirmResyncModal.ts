import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import React from 'react';
import { Bobject } from '../typings/bobjects';
import { UseAllItemsType } from '../components/bobjectTable/bulkActionsPanel/bulkActionsPanel';

const confirmResyncModalAtom = atom({
  key: 'confirmResyncModal',
  default: {
    isOpen: false,
    bobject: null,
    isQueuedBulk: undefined,
    setRefresh: () => {},
  },
});

const useConfirmResyncModal = () => {
  const [state, setState] = useRecoilState(confirmResyncModalAtom);
  const resetState = useResetRecoilState(confirmResyncModalAtom);

  const closeResyncModal = () => {
    resetState();
  };

  const openResyncModal = (
    bobject: Bobject | Bobject[],
    isQueuedBulk: UseAllItemsType = false,
    setRefresh: React.SetStateAction<boolean>,
  ) => {
    setState({
      isOpen: true,
      bobject,
      isQueuedBulk,
      setRefresh,
    });
  };

  return {
    ...state,
    openResyncModal,
    closeResyncModal,
  };
};

export default useConfirmResyncModal;
