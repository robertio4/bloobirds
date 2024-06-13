import React from 'react';

import { useActiveUserId, useMeetingLinks } from '@bloobirds-it/hooks';
import { addHttpsIfNeeded } from '@bloobirds-it/utils';

import MissingMeetingLink from './missingMeetingLink';

const getMeetingLinkURL = (meetingLinks, linkId) => {
  if (linkId === '__default__') return meetingLinks?.find(link => link.defaultLink)?.url;
  return meetingLinks?.find(link => link.id === linkId)?.url;
};
const MeetingLink = ({ attributes, element, children }) => {
  const { userId, linkId, children: elementChildren } = element;
  const activeUserId = useActiveUserId();
  const { getUserMeetingLinks } = useMeetingLinks();
  const meetingLinks = getUserMeetingLinks(userId === '__me__' ? activeUserId : userId);
  const link = getMeetingLinkURL(meetingLinks, linkId);

  if (link) {
    const linkURL = addHttpsIfNeeded(link);

    return (
      <span {...attributes}>
        <a href={linkURL} target="_blank" rel="noreferrer">
          {elementChildren[0]?.text}
        </a>
        {children}
      </span>
    );
  } else {
    return (
      <MissingMeetingLink attributes={attributes} element={element}>
        {children}
      </MissingMeetingLink>
    );
  }
};

export default MeetingLink;
