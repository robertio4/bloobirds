import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const confettiAtom = atom({
  key: "confettiAtom",
  default: { bloobirdsShape: false, display: false }
});
export const useConfetti = () => {
  const [show, setShow] = useRecoilState(confettiAtom);
  const throwConfetti = ({ bloobirdsShape = false }) => {
    setShow({ display: true, bloobirdsShape });
  };
  const hideConfetti = () => {
    setShow({ display: false, bloobirdsShape: false });
  };
  return { show, throwConfetti, hideConfetti };
};
