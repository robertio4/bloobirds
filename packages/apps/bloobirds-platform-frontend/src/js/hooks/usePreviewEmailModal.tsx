import { atom, useRecoilState } from 'recoil';
import useModalVisibility from './useModalVisibility';

const taskIdAtom = atom({
  key: 'taskIdToPreviewAtom',
  default: null,
});

/**
 * This hook is only used if you want to preview a TASK email, not an activity
 */
export const usePreviewEmailModal = () => {
  const [taskId, setTaskId] = useRecoilState(taskIdAtom);
  const { isOpen, closeModal, openModal } = useModalVisibility('previewEmailModal');

  const handleOpenModal = ({ taskId }: { taskId: string }) => {
    setTaskId(taskId);
    openModal();
  };

  const handleClose = () => {
    setTaskId(null);
    closeModal();
  };

  return {
    isOpen,
    handleOpenModal,
    handleClose,
    taskId,
  };
};
