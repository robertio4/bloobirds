import {
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  TImageElement,
  InsertNodesOptions,
  ELEMENT_LIC,
  getParentNode,
  getPath,
} from '@udecode/plate';
import {
  getPluginType,
  insertNodes,
  PlateEditor,
  Value,
  focusEditor,
  findNodePath,
  getPointAfter,
  select,
} from '@udecode/plate-core';

const selectNextElementLic = (editor, type, path) => {
  if (type === ELEMENT_LIC) {
    if (path) {
      select(editor, getPointAfter(editor, path));
      const nextNode = getParentNode(editor, getPath(editor, editor.selection));

      if (
        nextNode &&
        nextNode[0]?.type === ELEMENT_LIC &&
        nextNode[1]?.toString() !== path?.toString()
      ) {
        selectNextElementLic(editor, nextNode[0]?.type, nextNode[1]);
      }
    }
  }
};

const newNode = {
  type: ELEMENT_PARAGRAPH,
  children: [{ text: '' }],
};

export const insertImage = <V extends Value>(
  editor: PlateEditor<V>,
  url: string | ArrayBuffer,
  options?: InsertNodesOptions,
) => {
  const text = { text: '' };
  const image = {
    type: getPluginType(editor, ELEMENT_IMAGE),
    url: url as any,
    width: 300,
    children: [text],
  };

  // If the cursor is inside a list item, we need to move the cursor to the end of the list item and insert the image there.
  const currentNode = getParentNode(editor, getPath(editor, editor.selection));
  if (currentNode[0]?.type === ELEMENT_LIC) {
    //@ts-ignore
    insertNodes(editor, newNode, {
      at: [editor.children.length],
    });
  }
  selectNextElementLic(editor, currentNode[0]?.type, currentNode[1]);

  insertNodes<TImageElement>(editor, image, options);

  setTimeout(() => {
    const path = findNodePath(editor, image);
    if (path) {
      select(editor, path);
    }
    focusEditor(editor);
  }, 500);
};
