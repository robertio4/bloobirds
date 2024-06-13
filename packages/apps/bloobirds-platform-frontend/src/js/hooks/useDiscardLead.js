import { atom, useRecoilState } from 'recoil';

const discardLeadModalOpenAtom = atom({
  key: 'discardLeadModalOpenAtom',
  default: false,
});

const discardLeadAtom = atom({
  key: 'discardLeadAtom',
  default: undefined,
});

const discardLeadCallbackAtom = atom({
  key: 'discardLeadCallbackAtom',
  default: null,
});

const useDiscardLeadVisibility = () => {
  const [discardLeadModalOpen, setDiscardLeadModalOpen] = useRecoilState(discardLeadModalOpenAtom);

  const openDiscardLeadModal = () => {
    if (!discardLeadModalOpen) {
      setDiscardLeadModalOpen(true);
    }
  };

  const closeDiscardLeadModal = () => {
    if (discardLeadModalOpen) {
      setDiscardLeadModalOpen(false);
    }
  };

  return {
    isOpen: discardLeadModalOpen,
    openDiscardLeadModal,
    closeDiscardLeadModal,
  };
};

const useDiscardLead = () => {
  const { closeDiscardLeadModal, openDiscardLeadModal, isOpen } = useDiscardLeadVisibility();
  const [discardLead, setDiscardLead] = useRecoilState(discardLeadAtom);
  const [discardLeadCallback, setDiscardLeadCallback] = useRecoilState(discardLeadCallbackAtom);

  const openDiscardLead = ({ lead, onSaveCallback }) => {
    if (lead) {
      setDiscardLead(lead);
    }
    setDiscardLeadCallback(() => onSaveCallback);

    openDiscardLeadModal();
  };

  return {
    isOpen,
    lead: discardLead,
    discardLeadCallback,
    closeDiscardLeadModal,
    openDiscardLeadModal: openDiscardLead,
  };
};

export default useDiscardLead;
