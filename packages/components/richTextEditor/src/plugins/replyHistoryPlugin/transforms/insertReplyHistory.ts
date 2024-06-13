import { getPluginType } from '@udecode/plate';
import { ELEMENT_REPLY_HISTORY } from '../defaults';

export const createReplyHistory = (editor, { html, sentAt, sentBy }) => {
  const type = getPluginType(editor, ELEMENT_REPLY_HISTORY);
  return {
    html,
    type,
    sentAt,
    sentBy,
    children: [{ text: '' }],
  };
};
