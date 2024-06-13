import { atom, useRecoilState } from 'recoil';
import { Bobject } from '../typings/bobjects';
import useModalVisibility from './useModalVisibility';

const addCompanyBobjectAtom = atom({
  key: 'addCompanyBobjectAtom',
  default: null,
});

const addCompanyCallbackAtom = atom({
  key: 'addCompanyCallbackAtom',
  default: null,
});

const useAddCompany = () => {
  const { isOpen, closeModal, openModal } = useModalVisibility('addCompanyModal');
  const [bobject, setBobject] = useRecoilState<Bobject | Bobject[]>(addCompanyBobjectAtom);
  const [addCompanyCallback, setAddCompanyCallback] = useRecoilState(addCompanyCallbackAtom);

  const openAddCompany = ({
    bobject,
    onSaveCallback,
  }: {
    bobject: Bobject | Bobject[];
    onSaveCallback?: ({ response }: { response: any }) => void;
  }) => {
    if (bobject) {
      setBobject(bobject);
    }

    if (onSaveCallback) {
      setAddCompanyCallback(() => onSaveCallback);
    }

    openModal();
  };

  return {
    addCompanyCallback,
    isOpen,
    bobject,
    closeAddCompanyModal: closeModal,
    openAddCompanyModal: openAddCompany,
  };
};

export default useAddCompany;
