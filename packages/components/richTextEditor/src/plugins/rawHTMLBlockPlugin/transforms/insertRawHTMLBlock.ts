import {
  findNode,
  getPluginType,
  insertNodes,
  removeNodes,
  withoutNormalizing,
} from '@udecode/plate';

import { ELEMENT_RAW_HTML_BLOCK } from '../defaults';

export const createRawHTMLBlock = (editor, html) => {
  const type = getPluginType(editor, ELEMENT_RAW_HTML_BLOCK);
  return {
    id: 'signature',
    html,
    type,
    children: [{ text: '' }],
  };
};

export const insertRawHTMLBlock = (editor, html, options) => {
  const rawHTMLBlock = createRawHTMLBlock(editor, html);
  insertNodes(editor, rawHTMLBlock, options);
};

export const replaceHTMLBlock = (editor, id, type, html) => {
  if (editor) {
    const pluginType = getPluginType(editor, type);
    const htmlBlock = findNode(editor, {
      at: [],
      match: { id, type: pluginType },
    });

    if (htmlBlock) {
      const [node, path] = htmlBlock;

      if (html?.length) {
        withoutNormalizing(editor, () => {
          removeNodes(editor, { at: path });
          insertNodes(
            editor,
            { ...node, html, type: pluginType },
            {
              at: path,
            },
          );
        });
      }
    } else {
      withoutNormalizing(editor, () => {
        insertNodes(editor, createRawHTMLBlock(editor, html));
      });
    }
  }
};
