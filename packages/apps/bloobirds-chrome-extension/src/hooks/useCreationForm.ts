import { atom, useRecoilState } from 'recoil';

const createLeadAtom = atom({
  key: 'createLeadAtom',
  default: false,
});

const syncLeadAtom = atom({
  key: 'syncLeadAtom',
  default: false,
});

/**
 * The usage of this hook is made to force the view of creation of a lead | company | opp in the bubble.
 * Even if you are on Linkedin or Salesforce or whatever, you should use this if you want to force the capture
 * form in the contact view of the corresponding object.
 */
export const useCreationForm = () => {
  const [createLead, setCreateLead] = useRecoilState(createLeadAtom);
  const [syncLead, setSyncLead] = useRecoilState(syncLeadAtom);

  return {
    createLead,
    setCreateLead,
    syncLead,
    setSyncLead,
  };
};
