import { atom, useRecoilState } from 'recoil';

import { NotificationsCategory } from '../typings/notifications';
import { useNotifications } from './useNotifications';

const categoryAtom = atom({
  key: 'notificationBellCategory',
  default: 'UPDATES' as NotificationsCategory,
});

const useNotificationBell = () => {
  const [category, setCategory] = useRecoilState<NotificationsCategory>(categoryAtom);
  const methods = useNotifications({ category });

  return {
    category,
    setCategory,
    ...methods,
  };
};

export default useNotificationBell;
