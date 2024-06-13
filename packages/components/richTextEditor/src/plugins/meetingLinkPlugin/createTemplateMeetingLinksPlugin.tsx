import { useMemo } from 'react';

import { useActiveUserId, useMeetingLinks } from '@bloobirds-it/hooks';
import { toTitleCase } from '@bloobirds-it/utils';

import { ELEMENT_MEETING_LINK, ELEMENT_MISSING_MEETING_LINK } from './defaults';
import withTemplateMeetingLinksOverrides from './withTemplateMeetingLinksOverrides';

export const useTemplateMeetingLinksPlugin = replace => {
  const activeUserId = useActiveUserId();
  const { getUserMeetingLinks, isLoading } = useMeetingLinks();

  function getUserRelatedMeetingLinks(userId) {
    return getUserMeetingLinks(userId || activeUserId);
  }

  return useMemo(() => {
    return {
      key: ELEMENT_MEETING_LINK,
      isElement: true,
      isVoid: true,
      isInline: true,
      withOverrides: withTemplateMeetingLinksOverrides,
      options: {
        replace,
        getUserRelatedMeetingLinks,
      },
      plugins: [
        {
          key: ELEMENT_MISSING_MEETING_LINK,
          isElement: true,
          isInline: true,
        },
      ],
      then: (_, { type }) => ({
        options: {
          replace,
          getUserRelatedMeetingLinks,
        },
        deserializeHtml: {
          getNode: el => ({
            type,
            group: el.getAttribute('group'),
            name: el.getAttribute('name'),
            id: el.getAttribute('type'),
          }),
          rules: [{ validNodeName: 'MEETING_LINK' }],
        },
      }),
      serializeHtml: ({ element }) => {
        const group = toTitleCase(element.group);
        const name = toTitleCase(element.name);
        return <>{`${group}: ${name}`}</>;
      },
    };
  }, [isLoading]);
};
