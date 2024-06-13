import { getPluginType, insertNodes } from '@udecode/plate';

import { ELEMENT_SLOTS_FORM } from '../defaults';

export const createSlotsBlock = (editor, html) => {
  const type = getPluginType(editor, ELEMENT_SLOTS_FORM);
  return {
    html,
    type,
    children: [{ text: '' }],
  };
};

export const insertSlotsBlock = (editor, html, options) => {
  const slotsBlock = createSlotsBlock(editor, html);
  insertNodes(editor, slotsBlock, options);
};
