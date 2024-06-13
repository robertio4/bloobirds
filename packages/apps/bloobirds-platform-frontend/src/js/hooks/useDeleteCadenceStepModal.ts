import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import useModalVisibility from './useModalVisibility';

const cadenceStepIdAtom = atom({
  key: 'cadenceStepIdAtom',
  default: null,
});

const useDeleteCadenceStepModal = () => {
  const [stepId, setStepId] = useRecoilState(cadenceStepIdAtom);
  const resetStepId = useResetRecoilState(cadenceStepIdAtom);
  const { closeModal, isOpen, openModal } = useModalVisibility('deleteCadenceStep');

  const openDeleteCadenceStepModal = ({ id }: { id: string }) => {
    if (id) {
      setStepId(id);
    }

    openModal();
  };

  const closeDeleteCadenceStepModal = () => {
    resetStepId();

    closeModal();
  };

  return {
    isOpen,
    stepId,
    openModal: openDeleteCadenceStepModal,
    closeModal: closeDeleteCadenceStepModal,
  };
};

export default useDeleteCadenceStepModal;
