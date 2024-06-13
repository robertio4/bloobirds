import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import style from './subhomeSidebar.module.css';
import { useSubhome } from '../../subhomeLayout';
import { useRouter } from '../../../../hooks';
import { useSidebar } from '../../../../hooks/useSidebar';

export interface SubhomeSidebarProps {
  children: string | React.ReactElement;
  tabName: string;
  tabUrl: string;
  icon: IconType;
  tooltipText?: string;
  counter?: number;
  extra?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export const SubhomeSidebarTabs = ({ children }) => (
  <div className={style.section__container}>{children}</div>
);

export const SubhomeSidebarTab = ({
  children,
  tabName,
  tabUrl,
  extra = false,
  counter,
  disabled = false,
  icon,
  active = false,
  tooltipText,
}: SubhomeSidebarProps) => {
  const { selectedTab, setSelectedTab } = useSubhome();
  const { isCollapsed } = useSidebar();
  const { history } = useRouter();
  const isThisTabSelected = selectedTab === tabName;

  const tabClasses = clsx(style.item__container, {
    [style.item__container__disabled]: disabled,
    [style.item__container__selected]: isThisTabSelected,
    [style.isCollapsed]: isCollapsed,
  });

  const counterClasses = clsx(style._counter__container, { [style._active_counter]: active });

  const getFontSize = (length: number) => {
    switch (length) {
      case 1:
      case 2:
        return '12px';
      case 3:
        return '10px';
      case 4:
      case 5:
      case 6:
        return '8px';
      default:
        return '12px';
    }
  };

  const color = isThisTabSelected ? 'bloobirds' : 'verySoftPeanut';
  return (
    <div
      className={tabClasses}
      data-test={`Tab-Subhome-${tabName}`}
      onClick={() => {
        if (!disabled) {
          setSelectedTab(tabName);
          history.push(tabUrl);
        }
      }}
    >
      <Icon name={icon} size={38} color={color} className={style.icon} />
      {typeof children === 'string' ? (
        <Text size="m" color={color}>
          {children}
        </Text>
      ) : (
        children
      )}
      <div className={style._section_tooltip}>{children}</div>
      {extra && !isCollapsed ? <div className={style._extra_container}> {extra} </div> : null}
      {counter !== undefined && !Number.isNaN(counter) && (
        <Tooltip title={tooltipText || null} position={tooltipText && 'right'}>
          <div
            data-test={`Tab-${tabName}-Counter`}
            className={counterClasses}
            style={{ fontSize: getFontSize(counter?.toString().length) }}
          >
            {counter}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

SubhomeSidebarTab.propTypes = {
  children: PropTypes.any,
  counter: PropTypes.number,
  disabled: PropTypes.bool,
  tabName: PropTypes.string.isRequired,
};
