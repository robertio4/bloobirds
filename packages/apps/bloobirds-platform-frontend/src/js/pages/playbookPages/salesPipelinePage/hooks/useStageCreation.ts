import { atom, useRecoilState } from 'recoil';

const stageCreationAtom = atom({
  key: 'stageCreationAtom',
  default: false,
});

export const useStageCreation = () => {
  const [stageCreation, setStageCreation] = useRecoilState<boolean>(stageCreationAtom);

  return {
    stageCreation,
    setStageCreation,
  };
};
