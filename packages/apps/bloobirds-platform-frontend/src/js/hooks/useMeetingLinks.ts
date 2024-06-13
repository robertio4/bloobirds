import { useToasts } from '@bloobirds-it/flamingo-ui';
import { sortBy } from 'lodash';
import useSWR from 'swr';

import { MeetingLink } from '../typings/messaging';
import { api } from '../utils/api';
import { useActiveUser } from './useActiveUser';

const searchMeetingLinks = (url: string) => {
  return api.get(url).then(res => res?.data);
};

export const useMeetingLinks = () => {
  const { data, error, mutate, isValidating } = useSWR<{ meetingLinks: Array<MeetingLink> }>(
    '/messaging/meetingLink',
    searchMeetingLinks,
  );

  function getUserMeetingLinks(ownerId: string) {
    return sortBy(data?.meetingLinks, 'defaultLink')
      .reverse()
      .filter(({ userId }) => userId === ownerId);
  }

  return {
    getUserMeetingLinks,
    meetingLinks: sortBy(data?.meetingLinks, 'defaultLink').reverse(),
    isLoading: isValidating,
    isError: error,
    mutate,
  };
};

export const useMeetingLink = () => {
  const { activeUser } = useActiveUser();
  const { createToast } = useToasts();

  const create = async ({ url, defaultLink, title }: MeetingLink) => {
    return api
      .post(`/messaging/meetingLink`, {
        url,
        userId: activeUser?.id,
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

  const update = async (meetingLink: MeetingLink) => {
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
