import { atom, useRecoilState } from 'recoil';
import useModalVisibility from './useModalVisibility';

const opportunityIdAtom = atom({
  key: 'opportunityId',
  default: null,
});

const useManageProducts = () => {
  const { isOpen, openModal, closeModal } = useModalVisibility('manageProducts');
  const [opportunityId, setOpportunityId] = useRecoilState(opportunityIdAtom);

  const openProductsModal = (opportunityId: string) => {
    setOpportunityId(opportunityId);
    openModal();
  };

  return {
    opportunityId,
    isOpen,
    openProductsModal,
    closeModal,
  };
};

export default useManageProducts;
