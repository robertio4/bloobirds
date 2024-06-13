import { atom, useRecoilState } from 'recoil';

const addLeadModalOpenAtom = atom({
  key: 'addLeadModalOpenAtom',
  default: false,
});

const addLeadCompanyAtom = atom({
  key: 'addLeadCompanyAtom',
  default: undefined,
});

const useAddLeadVisibility = () => {
  const [addLeadModalOpen, setAddLeadModalOpen] = useRecoilState(addLeadModalOpenAtom);

  const openAddLeadModal = () => {
    if (!addLeadModalOpen) {
      setAddLeadModalOpen(true);
    }
  };

  const closeAddLeadModal = () => {
    if (addLeadModalOpen) {
      setAddLeadModalOpen(false);
    }
  };

  return {
    isOpen: addLeadModalOpen,
    openAddLeadModal,
    closeAddLeadModal,
  };
};

const useAddLead = () => {
  const { closeAddLeadModal, openAddLeadModal, isOpen } = useAddLeadVisibility();
  const [addLeadCompany, setAddLeadCompany] = useRecoilState(addLeadCompanyAtom);

  const openAddLead = ({ company }) => {
    if (company) {
      setAddLeadCompany(company);
    }

    openAddLeadModal();
  };

  return {
    company: addLeadCompany,
    closeAddLeadModal,
    openAddLeadModal: openAddLead,
    isOpen,
  };
};

export default useAddLead;
