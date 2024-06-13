import { AnyObject, ImagePlugin, select } from '@udecode/plate';
import {
  getInjectedPlugins,
  pipeInsertDataQuery,
  PlateEditor,
  Value,
  WithPlatePlugin,
} from '@udecode/plate-core';
import { insertImage } from './transforms/insertImage';
import { api } from '@bloobirds-it/utils';

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 */
export const withImageUpload = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
  editor: E,
  plugin: WithPlatePlugin<ImagePlugin, V, E>,
) => {
  const {
    options: { uploadImage },
  } = plugin;
  const { insertData } = editor;

  editor.insertData = (dataTransfer: DataTransfer) => {
    const text = dataTransfer.getData('text/plain');
    const { files } = dataTransfer;

    if (files && files.length > 0) {
      const injectedPlugins = getInjectedPlugins<AnyObject, V, E>(editor, plugin);
      if (
        !pipeInsertDataQuery<AnyObject, V, E>(injectedPlugins, {
          data: text,
          dataTransfer,
        })
      ) {
        return insertData(dataTransfer);
      }
      //@ts-ignore
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', async () => {
            if (!reader.result) {
              return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('visible', 'true');

            const response = await api.post('/messaging/mediaFiles', formData, {
              validateStatus: () => true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            if (response.status === 201) {
              insertImage(editor, response.data.url);
            }
          });

          reader.readAsDataURL(file);
        }
      }
    } else {
      insertData(dataTransfer);
    }
  };

  return editor;
};
