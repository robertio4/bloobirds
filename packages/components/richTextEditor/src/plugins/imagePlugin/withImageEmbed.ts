import { ImagePlugin, isImageUrl } from '@udecode/plate';
import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-core';
import { insertImage } from './transforms/insertImage';

/**
 * If inserted text is image url, insert image instead.
 */
export const withImageEmbed = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
  editor: E,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  plugin: WithPlatePlugin<ImagePlugin, V, E>,
) => {
  const { insertData } = editor;

  editor.insertData = (dataTransfer: DataTransfer) => {
    const text = dataTransfer.getData('text/plain');

    if (isImageUrl(text)) {
      insertImage(editor, text);
      return;
    }

    insertData(dataTransfer);
  };

  return editor;
};
