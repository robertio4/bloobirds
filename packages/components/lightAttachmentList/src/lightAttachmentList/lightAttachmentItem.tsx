import styles from './lightAttachmentList.module.css';
import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { api } from '@bloobirds-it/utils';

export function LightAttachmentItem({
  name,
  url,
  id,
}: {
  name: string;
  url?: string;
  id?: string;
}) {
  return (
    <div className={styles.item} role="listitem">
      <div className={styles.content}>
        <Icon name="file" size={16} color="softPeanut" />
        <Tooltip title={name} position="top">
          <Text size="xs" color="softPeanut">
            {name}
          </Text>
        </Tooltip>
        {url && (
          <IconButton
            name="download"
            size={16}
            color="bloobirds"
            onClick={event => {
              event.stopPropagation();
              api
                .get('/messaging/mediaFiles/download', {
                  params: {
                    file_id: id,
                  },
                  responseType: 'blob',
                })
                .then(res => {
                  const blobUrl = URL.createObjectURL(res.data);
                  const link = document.createElement('a');
                  link.download = name;
                  link.href = blobUrl;
                  link.click();
                  link.remove();
                });
            }}
          />
        )}
      </div>
    </div>
  );
}
