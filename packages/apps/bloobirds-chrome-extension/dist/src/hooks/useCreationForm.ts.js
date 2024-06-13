import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const createLeadAtom = atom({
  key: "createLeadAtom",
  default: false
});
const syncLeadAtom = atom({
  key: "syncLeadAtom",
  default: false
});
export const useCreationForm = () => {
  const [createLead, setCreateLead] = useRecoilState(createLeadAtom);
  const [syncLead, setSyncLead] = useRecoilState(syncLeadAtom);
  return {
    createLead,
    setCreateLead,
    syncLead,
    setSyncLead
  };
};
