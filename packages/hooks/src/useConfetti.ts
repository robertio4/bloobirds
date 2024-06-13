import { atom, useRecoilState } from 'recoil';

const confettiAtom = atom({
  key: 'confettiAtom',
  default: { bloobirdsShape: false, display: false },
});

export const useConfetti = () => {
  const [show, setShow] = useRecoilState(confettiAtom);

  const throwConfetti = ({ bloobirdsShape = false }: { bloobirdsShape?: boolean }) => {
    setShow({ display: true, bloobirdsShape });
  };

  const hideConfetti = () => {
    setShow({ display: false, bloobirdsShape: false });
  };

  return { show, throwConfetti, hideConfetti };
};
