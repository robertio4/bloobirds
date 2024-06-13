import { atom, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

const selectedLeadAtom = atom({
  key: 'selectedLeadAtom',
  default: undefined,
});

export const useSelectedLead = () => {
  const selectedLead = useRecoilValue(selectedLeadAtom);
  const updateSelectedLead = useSetRecoilState(selectedLeadAtom);
  const resetSelectedLead = useResetRecoilState(selectedLeadAtom);

  return {
    resetSelectedLead,
    selectedLead,
    updateSelectedLead,
  };
};
