import React from 'react';

import { AttachedLink } from '@bloobirds-it/types';
import clsx from 'clsx';

import AttachmentLink from '../attachmentLink/attachmentLink';
import styles from './attachmentLinkList.module.css';

interface AttachmentListProps {
  files: Array<AttachedLink>;
  onDelete: (id: AttachedLink) => void;
}

function AttachmentLinkList({ files, onDelete }: AttachmentListProps) {
  const listClasses = clsx(styles.list, {
    [styles.wrappedList]: files?.length > 5,
  });

  return (
    <div className={listClasses} role="list">
      {files.map(file => (
        <AttachmentLink
          key={file.title}
          file={file}
          onDelete={typeof onDelete === 'function' ? () => onDelete(file) : null}
        />
      ))}
    </div>
  );
}

export default AttachmentLinkList;
