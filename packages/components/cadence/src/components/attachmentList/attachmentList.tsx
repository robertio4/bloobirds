import React from 'react';

import { AttachedFile } from '@bloobirds-it/types';
import clsx from 'clsx';

import AttachmentItem from './attachmentItem/attachmentItem';
import styles from './attachmentList.module.css';

interface AttachmentListProps {
  files: Array<AttachedFile>;
  onDelete?: (id: string) => void;
}

function AttachmentList({ files, onDelete }: AttachmentListProps) {
  const listClasses = clsx(styles.list);
  return (
    <div className={listClasses} role="list">
      {files.map(file => (
        <AttachmentItem
          key={file.internalId}
          {...file}
          onDelete={typeof onDelete === 'function' ? () => onDelete(file?.id) : null}
        />
      ))}
    </div>
  );
}

export default AttachmentList;
