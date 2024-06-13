import { getPluginType, insertNodes, PlateEditor, TImageElement } from '@udecode/plate';
import { ELEMENT_IMAGE_LINK } from '../defaults';
import { Value } from '@udecode/plate-core';

export const insertImageLink = <V extends Value>(
  editor: PlateEditor<V>,
  url: string | ArrayBuffer,
  href: string,
) => {
  const text = { text: '' };
  const image: TImageElement = {
    type: getPluginType(editor, ELEMENT_IMAGE_LINK),
    url: url as any,
    href: href as any,
    children: [text],
  };
  insertNodes<TImageElement>(editor, image);
};
