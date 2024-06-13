import { Bobject } from '@bloobirds-it/types';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import useModalVisibility from '../../../../../hooks/useModalVisibility';
import { UseAllItemsType } from '../../bulkActionsPanel';
import { useInternalUpdateProperty } from './components/updateProperty/useInternalUpdateProperty';

const updatePropertyBobjectsAtom = atom({
  key: 'updatePropertyBobjects',
  default: undefined as Bobject[],
});

const useUpdatePropertyModal = () => {
  const [bobjects, setBobjects] = useRecoilState(updatePropertyBobjectsAtom);
  const resetBobjects = useResetRecoilState(updatePropertyBobjectsAtom);
  const {
    setStage,
    setPresetProperty,
    setUseAllItems,
    resetModalContent,
  } = useInternalUpdateProperty();

  const { openModal, closeModal, isOpen } = useModalVisibility('updatePropertyModal');

  const setBobjectsAndOpenUpdatePropertyModal = (
    bobjectToSet: Bobject[],
    stage: string,
    propertyToEdit: string = undefined,
    useAllItems: UseAllItemsType,
  ) => {
    if (bobjectToSet) {
      setBobjects(bobjectToSet);
      setStage(stage);
      if (propertyToEdit) {
        setPresetProperty(propertyToEdit);
      }
      setUseAllItems(useAllItems);
      openModal();
    }
  };

  const closeUpdatePropertyModal = () => {
    resetBobjects();
    resetModalContent();
    closeModal();
  };

  return {
    bobjects,
    setBobjectsAndOpenUpdatePropertyModal,
    closeUpdatePropertyModal,
    isUpdatePropertyModalOpen: isOpen,
  };
};

export default useUpdatePropertyModal;
