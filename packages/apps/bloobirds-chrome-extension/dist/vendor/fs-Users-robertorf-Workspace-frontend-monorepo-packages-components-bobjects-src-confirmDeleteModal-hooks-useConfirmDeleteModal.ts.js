import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const confirmDeleteModalAtom = atom({
  key: "confirmDeleteModal",
  default: {
    isOpen: false,
    bobject: null,
    isQueuedBulk: void 0,
    setRefresh: () => {
    },
    callback: () => {
    },
    length: null
  }
});
export const useConfirmDeleteModal = () => {
  const [state, setState] = useRecoilState(confirmDeleteModalAtom);
  const resetState = useResetRecoilState(confirmDeleteModalAtom);
  const closeDeleteModal = () => {
    resetState();
  };
  const openDeleteModal = (bobject, isQueuedBulk = false, setRefresh = () => {
  }, callback = () => {
  }, length) => {
    setState({
      isOpen: true,
      bobject,
      isQueuedBulk,
      setRefresh,
      length,
      callback
    });
  };
  return {
    ...state,
    openDeleteModal,
    closeDeleteModal
  };
};
