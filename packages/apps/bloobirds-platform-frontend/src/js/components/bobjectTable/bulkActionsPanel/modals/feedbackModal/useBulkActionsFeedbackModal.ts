import { atom, useRecoilState } from 'recoil';

const bulkFeedbackModalStateAtom = atom({
  key: 'bulkFeedbackModalState',
  default: false,
});

export const useBulkActionsFeedbackModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(bulkFeedbackModalStateAtom);

  const toggleModalVisibility = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleModalVisibility };
};
