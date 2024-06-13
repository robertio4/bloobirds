import { useMemo, useState } from 'react';

import { useEventSubscription } from '@bloobirds-it/plover';
import { Notification, NotificationsCategory, NotificationsTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string): Promise<{ [category: string]: number }> => api.get(url);

const contentFetcher = async (url: string) => {
  const response = await api.get(url);
  // @ts-ignore
  return response?.data.content;
};

const fetchDeleteNotification = (id: string) =>
  api.delete(`/utils/notifications/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });

const fetchDeleteNotificationByObjectId = (id: string) =>
  api.delete(`/utils/notifications/deleteByObjectId/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });

const useNotificationsData = (): {
  unreadByCategory: { [category: string]: number };
  totalUnread: number;
  mutate: () => void;
} => {
  const { data: unreadByCategory, mutate } = useSWR(
    '/utils/notifications/countUnreadByCategory',
    fetcher,
  );

  const totalUnread = useMemo(
    () =>
      Object.values(unreadByCategory?.data || {}).reduce(
        (x: number, y: number) => x + y,
        0,
      ) as number,
    [unreadByCategory],
  );

  return {
    unreadByCategory,
    totalUnread,
    mutate,
  };
};

const getKey = (category: NotificationsCategory, types?: NotificationsTypes[]) => (
  pageIndex: number,
  previousPageData: any,
) => {
  if (previousPageData && !previousPageData.length) return null;
  else if (category && types)
    return `/utils/notifications?category=${category}&types=${types?.join(
      ',',
    )}&page=${pageIndex}&size=9`;
  else if (category) return `/utils/notifications?category=${category}&page=${pageIndex}&size=9`;
  else if (types) return `/utils/notifications?types=${types?.join(',')}&page=${pageIndex}&size=9`;
  else return null;
};

const useNotifications = (defaultCategory = NotificationsCategory.UPDATES) => {
  const [category, setCategory] = useState<NotificationsCategory>(defaultCategory);

  const { mutate: reloadNotificationCount } = useNotificationsData();
  const data = useSWRInfinite(getKey(category), contentFetcher);
  const { data: content, size, setSize, mutate, error } = data;

  const removeNotification = async (id: string) => {
    await fetchDeleteNotification(id);
    await mutate();
    await reloadNotificationCount();
  };

  const removeNotificationByObjectId = async (id: string) => {
    await fetchDeleteNotificationByObjectId(id);
    await mutate();
    await reloadNotificationCount();
  };

  useEventSubscription('notification', () => {
    reloadNotificationCount();
    mutate();
  });

  const markAsReadByCategory = async () => {
    await api.get(`/utils/notifications/markCategoryAsRead?category=${category}`);
    const notifications = content?.map(subarray =>
      subarray?.map((notification: Notification) => ({ ...notification, read: true })),
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };

  const markAsReadByTypes = async (types: [NotificationsTypes]) => {
    await api.get(`/utils/notifications/markTypesAsRead?types=${types}`);
    const notifications = content?.map(subarray =>
      subarray?.map((notification: Notification) => ({ ...notification, read: true })),
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };

  const markAsReadById = async (id: string) => {
    await api.get(`/utils/notifications/markAsRead/${id}`);
    const notifications = content?.map(subarray =>
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

  function refresh() {
    mutate();
    reloadNotificationCount();
  }

  return {
    category,
    setCategory,
    notifications: content?.flat() || ([] as Notification[]),
    isLastPage: content && content[content.length - 1]?.length < 9,
    isLoading: !content && !error,
    loadMore: () => setSize(size + 1),
    removeNotification,
    markAsReadById,
    markAsReadByCategory,
    markAsReadByTypes,
    mutate,
    refresh,
    removeNotificationByObjectId,
  };
};

export { useNotifications, useNotificationsData };
