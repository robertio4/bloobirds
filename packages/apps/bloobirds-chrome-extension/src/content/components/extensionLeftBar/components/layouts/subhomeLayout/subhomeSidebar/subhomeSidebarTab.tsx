import React from 'react';

import { Icon, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { SalesforceTabs } from '../../../tabs';
import { useSubhomeContext } from '../subhomeLayout';
import style from './subhomeSidebar.module.css';

export interface SubhomeSidebarProps {
  tabName: SalesforceTabs;
  tabUrl?: string;
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
  tabName,
  counter,
  disabled = false,
  icon,
  active = false,
  tooltipText,
}: SubhomeSidebarProps) => {
  const { selectedTab, setSelectedTab } = useSubhomeContext();
  const isThisTabSelected = selectedTab === tabName;

  const tabClasses = clsx(style.item__container, {
    [style.item__container__disabled]: disabled,
    [style.item__container__selected]: isThisTabSelected,
    [style.isCollapsed]: true,
  });

  const counterClasses = clsx(style._counter__container, style._counter__text_tabs, {
    [style._active_counter]: active,
  });

  const color = isThisTabSelected ? 'bloobirds' : 'verySoftPeanut';
  return (
    <div
      className={tabClasses}
      data-test={`Tab-Subhome-${tabName}`}
      onClick={() => {
        if (!disabled) {
          setSelectedTab(tabName);
        }
      }}
    >
      {counter === undefined && (
        <Tooltip title={tooltipText || null} position="right">
          <Icon name={icon} size={24} color={color} className={style.icon} />
        </Tooltip>
      )}

      {counter !== undefined && !Number.isNaN(counter) && (
        <>
          <Icon name={icon} size={24} color={color} className={style.icon} />
          <Tooltip title={tooltipText || null} position="right">
            <div data-test={`Tab-${tabName}-Counter`} className={counterClasses}>
              {counter}
            </div>
          </Tooltip>
        </>
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
