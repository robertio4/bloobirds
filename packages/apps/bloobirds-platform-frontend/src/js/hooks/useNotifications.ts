import useSWRInfinite from 'swr/infinite';

import { ServiceApi } from '../misc/api/service';
import { Notification, NotificationsCategory, NotificationsTypes } from '../typings/notifications';
import { useNotificationCount } from './useNotificationsCount';

const fetchNotifications = async (url: string) => {
  const response = await ServiceApi.request({
    url,
    method: 'GET',
  });
  return response.content;
};

const fetchDeleteNotification = async (id: string) =>
  ServiceApi.request({
    url: `/notifications/${id}`,
    method: 'DELETE',
  });

export const useNotificationDelete = () => {
  const { reloadNotificationCount } = useNotificationCount();
  return async (id: string) => {
    await fetchDeleteNotification(id);
    await reloadNotificationCount();
  };
};

const getKey = (category: NotificationsCategory, types: NotificationsTypes[]) => (
  pageIndex: number,
  previousPageData: any,
) => {
  if (previousPageData && !previousPageData.length) return null;
  else if (category && types)
    return `/notifications?category=${category}&types=${types?.join(',')}&page=${pageIndex}&size=9`;
  else if (category) return `/notifications?category=${category}&page=${pageIndex}&size=9`;
  else if (types) return `/notifications?types=${types?.join(',')}&page=${pageIndex}&size=9`;
  else return null;
};

export const useNotifications = ({
  category,
  types,
}: {
  category?: NotificationsCategory;
  types?: NotificationsTypes[];
}) => {
  const { reloadNotificationCount } = useNotificationCount();
  const { data, size, setSize, mutate, isLoading } = useSWRInfinite(
    getKey(category, types),
    fetchNotifications,
  );

  const removeNotification = async (id: string) => {
    await fetchDeleteNotification(id);
    await mutate();
    await reloadNotificationCount();
  };

  const markAsReadByCategory = async () => {
    await ServiceApi.request({
      url: `/notifications/markCategoryAsRead?category=${category}`,
      method: 'GET',
    });
    const notifications = data?.map(subarray =>
      subarray?.map((notification: Notification) => ({ ...notification, read: true })),
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };

  const markAsReadByTypes = async (typesToRead = null) => {
    const typesToReadString = typesToRead || types;
    await ServiceApi.request({
      url: `/notifications/markTypesAsRead?types=${typesToReadString}`,
      method: 'GET',
    });
    const notifications = data?.map(subarray =>
      subarray?.map((notification: Notification) => ({ ...notification, read: true })),
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };

  const markAsReadById = async (id: string) => {
    await ServiceApi.request({
      url: `/notifications/markAsRead/${id}`,
      method: 'GET',
    });
    const notifications = data?.map(subarray =>
      subarray?.map((notification: Notification) => {
        if (notification.id === id) {
          return { ...notification, read: true };
        }
        return notification;
      }),
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };

  return {
    notifications: data?.flat() || [],
    isLastPage: data && data[data.length - 1]?.length < 9,
    isLoading,
    loadMore: () => setSize(size + 1),
    removeNotification,
    markAsReadById,
    markAsReadByCategory,
    markAsReadByTypes,
    mutate,
  };
};
