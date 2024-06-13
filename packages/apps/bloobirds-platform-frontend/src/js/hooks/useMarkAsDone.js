import { atom, useRecoilState } from 'recoil';

const markAsDoneModalOpenAtom = atom({
  key: 'markAsDoneModalOpenAtom',
  default: false,
});

const addTaskIdAtom = atom({
  key: 'addTaskIdAtom',
  default: undefined,
});

const useMarkAsDoneVisibility = () => {
  const [markAsDoneModalOpen, setMarkAsDoneModalOpen] = useRecoilState(markAsDoneModalOpenAtom);
  const openMarkAsDoneModal = () => {
    if (!markAsDoneModalOpen) {
      setMarkAsDoneModalOpen(true);
    }
  };

  const closeMarkAsDoneModal = () => {
    if (markAsDoneModalOpen) {
      setMarkAsDoneModalOpen(false);
    }
  };

  return {
    isOpen: markAsDoneModalOpen,
    openMarkAsDoneModal,
    closeMarkAsDoneModal,
  };
};

const useMarkAsDone = () => {
  const { closeMarkAsDoneModal, openMarkAsDoneModal, isOpen } = useMarkAsDoneVisibility();
  const [addTaskId, setTaskId] = useRecoilState(addTaskIdAtom);

  const openMarkAsDone = allTasksIds => {
    if (allTasksIds) {
      setTaskId(allTasksIds);
    }

    openMarkAsDoneModal();
  };

  return {
    taskId: addTaskId,
    closeMarkAsDoneModal,
    openMarkAsDoneModal: openMarkAsDone,
    isOpen,
  };
};

export default useMarkAsDone;
