import { atom, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { isOpportunityPage } from '../utils/pages.utils';
import { useRouter } from './useRouter';

const selectedOpportunityAtom = atom({
  key: 'selectedOpportunityAtom',
  default: undefined,
});

export const useSelectedOpportunity = () => {
  const { pathname } = useRouter();
  const selectedOpportunity = useRecoilValue(selectedOpportunityAtom);
  const updateSelectedOpportunity = useSetRecoilState(selectedOpportunityAtom);
  const resetSelectedOpportunity = useResetRecoilState(selectedOpportunityAtom);
  useEffect(() => !isOpportunityPage(pathname) && updateSelectedOpportunity(undefined), [pathname]);

  return {
    resetSelectedOpportunity,
    selectedOpportunity,
    updateSelectedOpportunity,
  };
};
