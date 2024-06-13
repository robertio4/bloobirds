import React, { useState } from 'react';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { AttachedLink } from '@bloobirds-it/types';
import { addHttpIfNeeded } from '@bloobirds-it/utils';

import { getIconFromType } from '../../utils/smartEmailHelper.utils';
import styles from './attachmentLink.module.css';

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
        <Icon name={getIconFromType(type)} size={18} color={isHover ? 'bloobirds' : 'softPeanut'} />
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

export default AttachmentLink;
