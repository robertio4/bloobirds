import { addHttpsIfNeeded } from '@bloobirds-it/utils';
import { ELEMENT_LINK, insertNodes, isElement, removeNodes } from '@udecode/plate';

import { ELEMENT_MEETING_LINK, ELEMENT_MISSING_MEETING_LINK } from './defaults';

function getMeetingLinkURL(userMeetingLinks, node) {
  const { linkId } = node;
  if (linkId === '__default__') {
    return userMeetingLinks?.find(meetingLink => meetingLink.defaultLink);
  } else {
    return userMeetingLinks?.find(meetingLink => meetingLink.id === linkId);
  }
}

const withTemplateMeetingLinksOverrides = (
  editor,
  { options: { replace, getUserRelatedMeetingLinks } },
) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (isElement(node) && node.type === ELEMENT_MEETING_LINK && replace) {
      const userMeetingLinks = getUserRelatedMeetingLinks(
        node.userId !== '__me__' ? node.userId : undefined,
      );
      const { url } = getMeetingLinkURL(userMeetingLinks, node) || {};
      removeNodes(editor, { at: path });
      if (url) {
        insertNodes(
          editor,
          { ...node, ...{ type: ELEMENT_LINK, url: addHttpsIfNeeded(url) } },
          { at: path },
        );
      } else {
        insertNodes(editor, { ...node, ...{ type: ELEMENT_MISSING_MEETING_LINK } }, { at: path });
      }
    } else {
      normalizeNode(entry);
    }
  };

  return editor;
};

export default withTemplateMeetingLinksOverrides;
