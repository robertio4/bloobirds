import React, { useState } from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import styles from './AlertBanner.module.css';

export const AlertBanner = ({ type, message, backgroundColor, borderColor, onHide = () => {} }) => {
  const [hide, setHide] = useState(false);
  const classes = classNames({
    [styles._alert_banner_container]: true,
    [styles[type]]: type,
    [styles._hided]: hide,
  });

  const styleInline = backgroundColor ? { backgroundColor, borderColor } : null;

  return (
    <div className={classes} style={styleInline}>
      <div className={styles._alert_banner_text}>{message}</div>
      <IconButton
        className={styles._alert_banner_icon}
        color="var(--peanut)"
        name="cross"
        onClick={() => {
          setHide(true);
          onHide();
        }}
      />
    </div>
  );
};
