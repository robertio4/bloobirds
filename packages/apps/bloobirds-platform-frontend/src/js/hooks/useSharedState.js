import { useLayoutEffect } from 'react';
import { atomFamily, useRecoilState } from 'recoil';

const sharedStateFamily = atomFamily({
  key: 'sharedStateFamily',
  default: null,
});

export const useSharedState = (key, defaultValue) => {
  const [value, setValue] = useRecoilState(sharedStateFamily(key));

  useLayoutEffect(() => {
    if (!value) {
      setValue(defaultValue);
    }
  }, []);

  return [value, setValue];
};
