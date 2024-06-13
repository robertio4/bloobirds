import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { Bobject } from '../typings/bobjects';
import useModalVisibility from './useModalVisibility';

const leadsAtom = atom({
  key: 'opportunityControlAtom',
  default: null,
});

const assignedToAtom = atom({
  key: 'assignedToAtom',
  default: null,
});

const useOpportunityControl = () => {
  const { isOpen, closeModal, openModal } = useModalVisibility('opportunityControl');
  const [leads, setLeads] = useRecoilState(leadsAtom);
  const [assignedTo, setAssignedTo] = useRecoilState(assignedToAtom);
  const resetLeads = useResetRecoilState(leadsAtom);

  const openOpportunityControlModal = (leads?: Array<Bobject>, assignedTo?: string) => {
    if (assignedTo) {
      setAssignedTo(assignedTo);
    }
    if (leads) {
      setLeads(leads);
    }
    openModal();
  };

  const closeOpportunityControlModal = () => {
    resetLeads();
    closeModal();
  };

  return {
    isOpen,
    leads,
    assignedTo,
    closeModal: closeOpportunityControlModal,
    openModal: openOpportunityControlModal,
  };
};

export default useOpportunityControl;
