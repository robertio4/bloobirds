import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const astrolineVisibleAtom = atom({
  key: "astrolineDialerVisible",
  default: false
});
export const useAstrolineVisibility = () => {
  const [astrolineVisible, setAstrolineVisible] = useRecoilState(astrolineVisibleAtom);
  const toggleVisibility = () => {
    setAstrolineVisible(!astrolineVisible);
  };
  const openAstrolineDialer = () => {
    if (!astrolineVisible) {
      setAstrolineVisible(true);
    }
  };
  return {
    astrolineVisible,
    setAstrolineVisible,
    toggleVisibility,
    openAstrolineDialer
  };
};
