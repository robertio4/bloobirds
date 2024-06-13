import { atom, useRecoilState } from 'recoil';

export const openGeneralSearchBarAtom = atom({
  key: 'openGeneralSearchBarAtom',
  default: false,
});

export const useGeneralSearchVisibility = () => {
  const [isOpen, setIsOpen] = useRecoilState(openGeneralSearchBarAtom);

  return {
    isOpen,
    setIsOpen,
    openGeneralSearchBar: () => setIsOpen(true),
    closeGeneralSearchBar: () => setIsOpen(false),
    toggleVisibility: () => setIsOpen(!isOpen),
  };
};
