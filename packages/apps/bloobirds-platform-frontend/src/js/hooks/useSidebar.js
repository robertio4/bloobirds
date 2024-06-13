import { atom, useRecoilState } from 'recoil';

const isSidebarCollapsedAtom = atom({
  key: 'sidebarAtomVisibility',
  default: false,
});

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useRecoilState(isSidebarCollapsedAtom);
  const toggle = () => setIsCollapsed(x => !x);
  return {
    isCollapsed,
    toggle,
    collapse: () => setIsCollapsed(true),
    expand: () => setIsCollapsed(false),
  };
};
