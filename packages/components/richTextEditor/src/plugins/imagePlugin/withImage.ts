import { ImagePlugin } from '@udecode/plate';
import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-core';
import { withImageEmbed } from './withImageEmbed';
import { withImageUpload } from './withImageUpload';

/**
 * @see withImageUpload
 * @see withImageEmbed
 */
export const withImage = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
  editor: E,
  plugin: WithPlatePlugin<ImagePlugin, V, E>,
) => {
  const {
    options: { disableUploadInsert, disableEmbedInsert },
  } = plugin;

  if (!disableUploadInsert) {
    editor = withImageUpload(editor, plugin);
  }

  if (!disableEmbedInsert) {
    editor = withImageEmbed(editor, plugin);
  }

  return editor;
};
