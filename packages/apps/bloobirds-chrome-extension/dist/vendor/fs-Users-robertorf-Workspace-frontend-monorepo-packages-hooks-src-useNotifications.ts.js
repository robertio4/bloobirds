import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useEventSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import { NotificationsCategory } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import useSWRInfinite from "/vendor/.vite-deps-swr_infinite.js__v--a838075a.js";
const fetcher = (url) => api.get(url);
const contentFetcher = async (url) => {
  const response = await api.get(url);
  return response?.data.content;
};
const fetchDeleteNotification = (id) => api.delete(`/utils/notifications/${id}`, {
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  data: {}
});
const fetchDeleteNotificationByObjectId = (id) => api.delete(`/utils/notifications/deleteByObjectId/${id}`, {
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  data: {}
});
const useNotificationsData = () => {
  const { data: unreadByCategory, mutate } = useSWR(
    "/utils/notifications/countUnreadByCategory",
    fetcher
  );
  const totalUnread = useMemo(
    () => Object.values(unreadByCategory?.data || {}).reduce(
      (x, y) => x + y,
      0
    ),
    [unreadByCategory]
  );
  return {
    unreadByCategory,
    totalUnread,
    mutate
  };
};
const getKey = (category, types) => (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length)
    return null;
  else if (category && types)
    return `/utils/notifications?category=${category}&types=${types?.join(
      ","
    )}&page=${pageIndex}&size=9`;
  else if (category)
    return `/utils/notifications?category=${category}&page=${pageIndex}&size=9`;
  else if (types)
    return `/utils/notifications?types=${types?.join(",")}&page=${pageIndex}&size=9`;
  else
    return null;
};
const useNotifications = (defaultCategory = NotificationsCategory.UPDATES) => {
  const [category, setCategory] = useState(defaultCategory);
  const { mutate: reloadNotificationCount } = useNotificationsData();
  const data = useSWRInfinite(getKey(category), contentFetcher);
  const { data: content, size, setSize, mutate, error } = data;
  const removeNotification = async (id) => {
    await fetchDeleteNotification(id);
    await mutate();
    await reloadNotificationCount();
  };
  const removeNotificationByObjectId = async (id) => {
    await fetchDeleteNotificationByObjectId(id);
    await mutate();
    await reloadNotificationCount();
  };
  useEventSubscription("notification", () => {
    reloadNotificationCount();
    mutate();
  });
  const markAsReadByCategory = async () => {
    await api.get(`/utils/notifications/markCategoryAsRead?category=${category}`);
    const notifications = content?.map(
      (subarray) => subarray?.map((notification) => ({ ...notification, read: true }))
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };
  const markAsReadByTypes = async (types) => {
    await api.get(`/utils/notifications/markTypesAsRead?types=${types}`);
    const notifications = content?.map(
      (subarray) => subarray?.map((notification) => ({ ...notification, read: true }))
    );
    await mutate(notifications, false);
    await reloadNotificationCount();
  };
  const markAsReadById = async (id) => {
    await api.get(`/utils/notifications/markAsRead/${id}`);
    const notifications = content?.map(
      (subarray) => subarray?.map((notification) => {
        if (notification.id === id) {
          return { ...notification, read: true };
        }
        return notification;
      })
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
    notifications: content?.flat() || [],
    isLastPage: content && content[content.length - 1]?.length < 9,
    isLoading: !content && !error,
    loadMore: () => setSize(size + 1),
    removeNotification,
    markAsReadById,
    markAsReadByCategory,
    markAsReadByTypes,
    mutate,
    refresh,
    removeNotificationByObjectId
  };
};
export { useNotifications, useNotificationsData };
