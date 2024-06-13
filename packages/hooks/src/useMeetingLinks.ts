import { useToasts } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';
import useSWR from 'swr';

import { useActiveUserId } from './useActiveUser';

const searchMeetingLinks = (url: string) => {
  return api
    .get(url)
    .then(res => res?.data || [])
    .catch(() => []);
};

export const useMeetingLinks = () => {
  const { data, error, mutate } = useSWR('/messaging/meetingLink', searchMeetingLinks);

  function getUserMeetingLinks(ownerId: string) {
    return sortBy(data?.meetingLinks, 'defaultLink')
      .reverse()
      .filter(({ userId }) => userId === ownerId);
  }

  return {
    getUserMeetingLinks,
    meetingLinks: sortBy(data?.meetingLinks, 'defaultLink').reverse(),
    isLoading: !data,
    isError: error,
    mutate,
  };
};

export const useMeetingLink = () => {
  const activeUserId = useActiveUserId();
  const { createToast } = useToasts();

  const create = async ({ url, defaultLink, title }) => {
    return api
      .post(`/messaging/meetingLink`, {
        url,
        userId: activeUserId,
        title,
        defaultLink,
      })
      .then(() => {
        createToast({
          message: `Meeting link created successfully.`,
          type: 'success',
        });
      });
  };

  const update = async meetingLink => {
    return api.patch(`/messaging/meetingLink/${meetingLink.id}`, meetingLink).then(() => {
      createToast({
        message: `Meeting link edited successfully.`,
        type: 'success',
      });
    });
  };

  const deleteById = async (id: string) => {
    return api.delete(`/messaging/meetingLink/${id}`).then(() => {
      createToast({
        message: `Meeting link deleted successfully.`,
        type: 'success',
      });
    });
  };

  const setAsDefault = async (id: string) => {
    return api.patch(`/messaging/meetingLink/setDefault/${id}`).then(() => {
      createToast({
        message: `Meeting link set as default successfully.`,
        type: 'success',
      });
    });
  };

  return {
    create,
    update,
    deleteById,
    setAsDefault,
  };
};
