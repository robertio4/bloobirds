import React, { useState } from 'react';

import { ColorType, Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import styles from './banner.module.css';

type BannerType = 'warning' | 'error' | 'softWarning' | 'warningOrange' | 'success' | 'info';

interface BannerLinkProps {
  onClick: () => void;
  children: any;
}

interface BannerProps {
  type: BannerType;
  children: any;
  icon: IconType | Element;
  enableClose?: boolean;
}

function getIconColor(type: BannerType): ColorType {
  switch (type) {
    case 'warning':
    case 'softWarning':
      return 'banana';
    case 'warningOrange':
      return 'tangerine';
    case 'error':
      return 'tomato';
    case 'success':
      return 'softMelon';
    case 'info':
      return 'bloobirds';
  }
}

export function BannerLink({ children, onClick }: BannerLinkProps) {
  return (
    <span tabIndex={0} role="link" style={{ cursor: 'pointer' }} onClick={onClick}>
      <Text htmlTag="span" size="s" color="bloobirds">
        {children}
      </Text>
    </span>
  );
}

export function Banner({ type, children, icon, enableClose = false }: BannerProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className={classNames(styles.banner, styles[type])}>
          {icon && typeof icon === 'string' ? (
            <Icon name={icon} color={getIconColor(type)} />
          ) : (
            icon
          )}
          <Text size="s" color="peanut">
            {children}
          </Text>
          {enableClose && (
            <div className={styles.close} onClick={handleClose}>
              <Icon name="cross" color="peanut" size={20} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
