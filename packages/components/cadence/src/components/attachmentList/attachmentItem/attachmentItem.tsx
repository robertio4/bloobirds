import React from 'react';

import { Icon, IconButton, Spinner, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { AttachedFile } from '@bloobirds-it/types';

import styles from './attachmentItem.module.css';

interface AttachmentItemProps extends AttachedFile {
  onDelete: (id: string) => void;
}

function AttachmentItem({ id, uploading, name, onDelete }: AttachmentItemProps) {
  return (
    <div className={styles.item} role="listitem">
      <div className={styles.content}>
        {uploading ? (
          <Spinner name="loadingCircle" size={14} color="softPeanut" />
        ) : (
          <Icon name="file" size={16} color="softPeanut" />
        )}
        <Tooltip title={name} position="top">
          <Text size="xs" color="softPeanut">
            {name}
          </Text>
        </Tooltip>
      </div>
      {!uploading && onDelete && (
        <IconButton name="cross" onClick={() => onDelete(id)} size={16} color="softPeanut" />
      )}
    </div>
  );
}

export default AttachmentItem;
