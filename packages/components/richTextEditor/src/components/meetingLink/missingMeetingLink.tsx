import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'clsx';
import { useSelected } from 'slate-react';

import styles from './meetingLink.module.css';

const MissingMeetingLink = ({ attributes, children, element }) => {
  const selected = useSelected();
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor' });

  const classes = classNames(styles.container, {
    [styles.focused]: selected,
  });
  return (
    <span {...attributes}>
      <span title={t('missingMeetingLink')} className={classes}>
        {element?.children[0]?.text}
      </span>
      {children}
    </span>
  );
};

export default MissingMeetingLink;
