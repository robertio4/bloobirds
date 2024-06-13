import { ColorType, Icon, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './subhomeSidebar.module.css';

interface SidebarHeaderProps {
  counter: number;
  active: boolean;
  icon?: IconType;
  color?: ColorType;
  tooltipText: string;
}

const SubhomeSidebarHeader = ({
  counter,
  active,
  icon,
  color,
  tooltipText,
}: SidebarHeaderProps) => {
  return (
    <div className={styles.header}>
      <Icon name={icon} color={color} size={32} />
      <Tooltip title={tooltipText || null} position="right">
        <div
          data-test="Tab-SidebarHeaderCounter"
          className={clsx(styles._counter__container, styles._counter__text_header, {
            [styles._active_counter]: active,
          })}
        >
          {counter || '0'}
        </div>
      </Tooltip>
    </div>
  );
};

SubhomeSidebarHeader.propTypes = {
  counter: PropTypes.number,
};

export default SubhomeSidebarHeader;
