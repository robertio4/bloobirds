import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const previousUrlAtom = atom({
  key: "previousUrlAtom",
  default: ""
});
export const usePreviousUrl = () => {
  const [previousUrl, setPreviousUrl] = useRecoilState(previousUrlAtom);
  const getPreviousUrl = () => previousUrl;
  const resetPreviousUrl = () => {
    setPreviousUrl("");
  };
  return {
    previousUrl,
    getPreviousUrl,
    resetPreviousUrl,
    setPreviousUrl
  };
};
