import React from 'react';
import clsx from 'clsx';
import styles from './lightAttachmentList.module.css';
import { LightAttachmentItem } from './lightAttachmentItem';

export function LightAttachmentList({
  files,
  betterAttachments,
}: {
  files: string[];
  betterAttachments?: { name: string; url: string; id: string }[];
}) {
  const listClasses = clsx(styles.list, {
    [styles.wrappedList]: files.length > 5,
  });

  return (
    <div className={listClasses} role="list">
      {betterAttachments
        ? betterAttachments.map(
            file =>
              !!file && (
                <LightAttachmentItem key={file.id} name={file.name} url={file.url} id={file.id} />
              ),
          )
        : files.map(file => !!file && <LightAttachmentItem key={file} name={file} />)}
    </div>
  );
}
