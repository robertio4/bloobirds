import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport2_lodash_sortBy from "/vendor/.vite-deps-lodash_sortBy.js__v--db3f7ac0.js"; const sortBy = __vite__cjsImport2_lodash_sortBy.__esModule ? __vite__cjsImport2_lodash_sortBy.default : __vite__cjsImport2_lodash_sortBy;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
const searchMeetingLinks = (url) => {
  return api.get(url).then((res) => res?.data || []).catch(() => []);
};
export const useMeetingLinks = () => {
  const { data, error, mutate } = useSWR("/messaging/meetingLink", searchMeetingLinks);
  function getUserMeetingLinks(ownerId) {
    return sortBy(data?.meetingLinks, "defaultLink").reverse().filter(({ userId }) => userId === ownerId);
  }
  return {
    getUserMeetingLinks,
    meetingLinks: sortBy(data?.meetingLinks, "defaultLink").reverse(),
    isLoading: !data,
    isError: error,
    mutate
  };
};
export const useMeetingLink = () => {
  const activeUserId = useActiveUserId();
  const { createToast } = useToasts();
  const create = async ({ url, defaultLink, title }) => {
    return api.post(`/messaging/meetingLink`, {
      url,
      userId: activeUserId,
      title,
      defaultLink
    }).then(() => {
      createToast({
        message: `Meeting link created successfully.`,
        type: "success"
      });
    });
  };
  const update = async (meetingLink) => {
    return api.patch(`/messaging/meetingLink/${meetingLink.id}`, meetingLink).then(() => {
      createToast({
        message: `Meeting link edited successfully.`,
        type: "success"
      });
    });
  };
  const deleteById = async (id) => {
    return api.delete(`/messaging/meetingLink/${id}`).then(() => {
      createToast({
        message: `Meeting link deleted successfully.`,
        type: "success"
      });
    });
  };
  const setAsDefault = async (id) => {
    return api.patch(`/messaging/meetingLink/setDefault/${id}`).then(() => {
      createToast({
        message: `Meeting link set as default successfully.`,
        type: "success"
      });
    });
  };
  return {
    create,
    update,
    deleteById,
    setAsDefault
  };
};
