import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { BobjectApi } from '../misc/api/bobject';

const duplicateValidationAtom = atom({
  key: 'duplicateValidation',
  default: {
    isOpen: false,
    duplicates: [],
    bobject: null,
  },
});

const useDuplicateValidationModal = () => {
  const [state, setState] = useRecoilState(duplicateValidationAtom);
  const resetState = useResetRecoilState(duplicateValidationAtom);

  const closeDuplicateValidationModal = () => {
    resetState();
  };

  const openDuplicateValidationModal = async ({ duplicates, bobjectType, currentBobjectId }) => {
    // We have to make the find in order to avoid seeing the same object as we are trying to update
    const bobjectId = currentBobjectId
      ? duplicates[0]?.duplicates
          ?.find(bobject => bobject?.id !== currentBobjectId)
          ?.id?.split('/')?.[2]
      : duplicates[0].duplicates[0]?.id?.split('/')?.[2];
    const bobject = await BobjectApi.request().bobjectType(bobjectType).getForm(bobjectId);

    setState({
      isOpen: true,
      duplicates,
      bobject,
    });
  };

  return {
    ...state,
    openDuplicateValidationModal,
    closeDuplicateValidationModal,
  };
};

export default useDuplicateValidationModal;
