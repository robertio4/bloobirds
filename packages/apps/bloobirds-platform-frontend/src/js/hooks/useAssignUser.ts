import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

const assignUserModalOpenAtom = atom({
  key: 'assignUserModalOpenAtom',
  default: false,
});

const addBobjectAtom = atom({
  key: 'addBobjectAtom',
  default: undefined,
});

const useAssignUserVisibility = () => {
  const [assignUserModalOpen, setAssignUserModalOpen] = useRecoilState(assignUserModalOpenAtom);

  const openAssignUserModal = () => {
    if (!assignUserModalOpen) {
      setAssignUserModalOpen(true);
    }
  };

  const closeAssignUserModal = () => {
    if (assignUserModalOpen) {
      setAssignUserModalOpen(false);
    }
  };

  return {
    isOpen: assignUserModalOpen,
    openAssignUserModal,
    closeAssignUserModal,
  };
};

interface AssignUserHookInterface {
  bobject: Bobject | Bobject[];
  closeAssignUserModal: () => void;
  openAssignUserModal: ({ bobject }: { bobject: Bobject | Bobject[] }) => void;
  isOpen: boolean;
}

const useAssignUser = (): AssignUserHookInterface => {
  const { closeAssignUserModal, openAssignUserModal, isOpen } = useAssignUserVisibility();
  const [bobjectsToReassign, setBobjectsToReassign] = useRecoilState<Bobject | Bobject[]>(
    addBobjectAtom,
  );

  const openAssignUser = ({ bobject }: { bobject: Bobject | Bobject[] }) => {
    if (bobject) {
      setBobjectsToReassign(bobject);
    }

    openAssignUserModal();
  };

  return {
    // Data could be a single object {} or multiple ones []
    bobject: bobjectsToReassign,
    closeAssignUserModal,
    openAssignUserModal: openAssignUser,
    isOpen,
  };
};

export default useAssignUser;
