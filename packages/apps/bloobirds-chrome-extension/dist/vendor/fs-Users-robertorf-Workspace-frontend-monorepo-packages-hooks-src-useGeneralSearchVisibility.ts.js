import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
export const openGeneralSearchBarAtom = atom({
  key: "openGeneralSearchBarAtom",
  default: false
});
export const useGeneralSearchVisibility = () => {
  const [isOpen, setIsOpen] = useRecoilState(openGeneralSearchBarAtom);
  return {
    isOpen,
    setIsOpen,
    openGeneralSearchBar: () => setIsOpen(true),
    closeGeneralSearchBar: () => setIsOpen(false),
    toggleVisibility: () => setIsOpen(!isOpen)
  };
};
