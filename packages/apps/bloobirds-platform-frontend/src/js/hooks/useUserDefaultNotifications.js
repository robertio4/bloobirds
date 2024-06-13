import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useActiveUser } from './useActiveUser';
import { RestApi } from '../misc/api/rest';

const userDefaultNotificationsAtom = atom({
  key: 'defaultNotificationUsersAtom',
  default: {
    list: null,
    loaded: false,
  },
});

const fetchUserDefaultNotification = accountId =>
  RestApi.search({
    entity: 'userDefaultNotifications',
    query: {
      'account.id': accountId,
    },
  });

const addUserDefaultNotification = (accountId, notificationType, notificationData) =>
  RestApi.create({
    entity: 'userDefaultNotifications',
    data: {
      user: `/users/${notificationData?.userId}`,
      account: `/accounts/${accountId}`,
      notificationType,
    },
  });

const updateUserDefaultNotification = (accountId, notificationType, notificationData) =>
  RestApi.patch({
    entity: 'userDefaultNotifications',
    id: notificationData?.notificationId,
    data: {
      user: `/users/${notificationData?.userId}`,
      account: `/accounts/${accountId}`,
      notificationType,
    },
  });

const deleteUserDefaultNotification = notificationData =>
  RestApi.delete({
    entity: 'userDefaultNotifications',
    id: notificationData?.notificationId,
  });

export const useUserDefaultNotifications = () => {
  const { activeAccount } = useActiveUser();
  const [userDefaultNotifications, setUserDefaultNotifications] = useRecoilState(
    userDefaultNotificationsAtom,
  );

  useEffect(() => {
    if (!userDefaultNotifications.loaded && activeAccount?.id) {
      fetchUserDefaultNotification(activeAccount?.id).then(response => {
        const defaultUsers = response._embedded.userDefaultNotifications;
        const users = {};
        defaultUsers.forEach(user => {
          users[user.notificationType] = {
            userId: user.user,
            notificationId: user.id,
          };
        });
        setUserDefaultNotifications({
          list: users,
          loaded: true,
        });
      });
    }
  }, [userDefaultNotifications.loaded, activeAccount?.id]);

  const saveDefaultUsers = (accountId, data, callback = () => {}) => {
    if (data) {
      Object.keys(data).forEach(notification => {
        const existsNotification =
          data[notification] &&
          userDefaultNotifications.list[notification]?.userId !== data[notification]?.userId;
        const isUpdating = userDefaultNotifications.list[notification];
        const isDeleting = !data[notification]?.userId;

        if (existsNotification) {
          if (isUpdating && !isDeleting) {
            updateUserDefaultNotification(accountId, notification, data[notification]).then(
              response => {
                setUserDefaultNotifications({
                  list: {
                    ...userDefaultNotifications.list,
                    [response?.notificationType]: {
                      userId: response?.user,
                      notificationId: response?.id,
                    },
                  },
                });
                callback();
              },
            );
          } else if (isDeleting) {
            deleteUserDefaultNotification(data[notification]).then(() => {
              const newNotificationsList = { ...userDefaultNotifications.list };
              delete newNotificationsList[notification];

              setUserDefaultNotifications({
                list: newNotificationsList,
              });
              callback();
            });
          } else {
            addUserDefaultNotification(accountId, notification, data[notification]).then(
              response => {
                setUserDefaultNotifications({
                  list: {
                    ...userDefaultNotifications.list,
                    [response?.notificationType]: {
                      userId: response?.user,
                      notificationId: response?.id,
                    },
                  },
                });
                callback();
              },
            );
          }
        }
      });
    }
  };

  return {
    userDefaultNotifications: userDefaultNotifications.list,
    saveDefaultUsers,
  };
};
