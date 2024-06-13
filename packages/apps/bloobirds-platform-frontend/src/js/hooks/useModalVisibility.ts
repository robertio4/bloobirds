import { atomFamily, useRecoilState } from 'recoil';

const modalOpenAtom = atomFamily({
  key: 'modalOpenAtom',
  default: false,
});

const useModalVisibility = (family: string) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenAtom(family));

  const openModal = () => {
    if (!modalOpen) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  return {
    isOpen: modalOpen,
    openModal,
    closeModal,
  };
};

export default useModalVisibility;
