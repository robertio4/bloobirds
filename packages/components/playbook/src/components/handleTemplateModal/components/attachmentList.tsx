import { useState } from 'react';

import { Icon, IconButton, Spinner, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { AttachedFile, AttachedLink } from '@bloobirds-it/types';
import { addHttpIfNeeded } from '@bloobirds-it/utils';
import clsx from 'clsx';

import styles from './attachment.module.css';

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

const AttachmentLink = ({ file, onDelete }: { file: AttachedLink; onDelete: () => void }) => {
  const { link, title, type } = file;
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Tooltip title={link} position="top">
      <div
        className={styles._attachment_box}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Icon name={'link'} size={18} color={isHover ? 'bloobirds' : 'softPeanut'} />
        <div onClick={() => window.open(addHttpIfNeeded(link), '_blank')}>
          <Text
            color={isHover ? 'bloobirds' : 'softPeanut'}
            decoration={isHover ? 'underline' : 'none'}
            ellipsis={20}
            size="xs"
          >
            {title}
          </Text>
        </div>
        <IconButton
          name="cross"
          onClick={onDelete}
          size={18}
          color={isHover ? 'softTomato' : 'lightestGray'}
        />
      </div>
    </Tooltip>
  );
};

interface AttachmentListProps {
  files: Array<AttachedFile>;
  onDelete?: (id: string) => void;
}

export function AttachmentList({ files, onDelete }: AttachmentListProps) {
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

interface AttachmentLinkListProps {
  files: Array<AttachedLink>;
  onDelete: (id: AttachedLink) => void;
}

export function AttachmentLinkList({ files, onDelete }: AttachmentLinkListProps) {
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
