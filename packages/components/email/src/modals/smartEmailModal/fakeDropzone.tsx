import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { api } from '@bloobirds-it/utils';
import { insertImage } from '@bloobirds-it/rich-text-editor';

import { useDebounce } from 'use-debounce';

import styles from './smartEmailModal.module.css';

export default function FakeDropzone({ editor }) {
  const [dragging, setDragging] = useState(false);
  const [isDropzoneDragged, setDropzoneDragged] = useState(false);

  const [delayedDragging] = useDebounce(dragging, 50);

  useEffect(() => {
    window.addEventListener(
      'dragover',
      function (e) {
        e.preventDefault();
        setDragging(true);
      },
      false,
    );
    window.addEventListener(
      'dragleave',
      function (e) {
        e.preventDefault();
        setDragging(false);
      },
      false,
    );
    window.addEventListener(
      'drop',
      function (e) {
        e.preventDefault();
        setDragging(false);
      },
      false,
    );
    return () => {
      window.removeEventListener('dragover', () => {});
      window.removeEventListener('dragleave', () => {});
      window.removeEventListener('drop', () => {});
    };
  }, []);

  const dropImage = async e => {
    e.stopPropagation();
    e.preventDefault();

    setDragging(false);

    const { files } = e.dataTransfer;

    //@ts-ignore
    for (const file of files) {
      const [mime] = file.type.split('/');

      if (mime === 'image') {
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
      }
    }
  };

  if (!delayedDragging) {
    return null;
  }

  return (
    <div
      id="dropzone"
      style={{
        height: document.getElementById('emailBody')?.offsetHeight - 90 ?? 200,
      }}
      className={clsx(styles._editor__container__dragged, {
        [styles._editor__container__dragged__active]: isDropzoneDragged,
      })}
      onDragLeave={() => {
        setDropzoneDragged(false);
      }}
      onDragOver={() => {
        setDropzoneDragged(true);
      }}
      onDrop={dropImage}
    >
      Drop your images here
    </div>
  );
}
