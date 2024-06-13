import { atom, useRecoilState } from 'recoil';

const customTaskCreationAtom = atom({
  key: 'customTaskCreationAtom',
  default: false,
});

export const useCustomTaskCreation = () => {
  const [customTaskCreation, setCustomTaskCreation] = useRecoilState<boolean>(
    customTaskCreationAtom,
  );

  return {
    customTaskCreation,
    setCustomTaskCreation,
  };
};
