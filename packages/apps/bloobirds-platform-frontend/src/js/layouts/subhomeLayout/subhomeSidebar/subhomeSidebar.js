import React, { useEffect } from 'react';
import styles from './subhomeSidebar.module.css';
import { Icon } from '@bloobirds-it/flamingo-ui';
import { useSidebar } from '../../../hooks/useSidebar';
import classNames from 'clsx';
import { useMediaQuery } from '../../../hooks';

const SubhomeSidebar = ({ children }) => {
  const { isCollapsed, toggle, collapse, expand } = useSidebar();
  const { isSmallDesktop } = useMediaQuery();
  const containerClasses = classNames(styles._container, {
    [styles.isCollapsed]: isCollapsed,
  });

  useEffect(() => {
    if (isSmallDesktop) {
      collapse();
    } else {
      expand();
    }
  }, [isSmallDesktop]);

  return (
    <div className={containerClasses}>
      <div className={styles.collapsible_button} onClick={toggle}>
        <Icon name={isCollapsed ? 'chevronRight' : 'chevronLeft'} size={10} />
      </div>
      {children}
    </div>
  );
};

export default SubhomeSidebar;
