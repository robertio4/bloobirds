import { atom, useRecoilState } from 'recoil';

const sidebarTasksVisibleAtom = atom({
  key: 'sidebarTasksVisibleAtom',
  default: false,
});

export const useSidebarTasksVisibility = () => {
  const [visible, setVisible] = useRecoilState(sidebarTasksVisibleAtom);

  const closeSidebarTasks = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const toggleSidebarTasks = () => setVisible(!visible);

  return {
    isVisible: visible,
    closeSidebarTasks,
    toggleSidebarTasks,
  };
};
