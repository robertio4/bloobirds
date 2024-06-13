import React, { MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { Action, ColorType, Dropdown, IconType, Spinner, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useMediaQuery } from '@bloobirds-it/hooks';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../context';
import styles from './contactViewActions.module.css';

export interface ContactViewActionsProps {
  children?: any;
}

export interface ContactViewActionProps {
  color: ColorType;
  icon: IconType;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'medium';
  tooltip?: string;
}

export interface ContactViewDropdownActionProps {
  color: ColorType;
  icon: IconType;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  ref: any;
  children: any;
  isDisabled?: boolean;
}

export const CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE = 1226;

export const ContactViewActions = (props: ContactViewActionsProps) => {
  const { children } = props;
  return (
    <div className={styles.actions__container} data-test={`contact-view-ACTIONS-tab`}>
      {children}
    </div>
  );
};

export const ContactViewAction = (props: ContactViewActionProps) => {
  const { color, icon, onClick, isDisabled, size = 's', isLoading = false, tooltip } = props;
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.contactViewActions',
  });
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { windowDimensions } = useMediaQuery();

  return isLoading ? (
    <div
      style={{
        backgroundColor: `var(--${color})`,
      }}
      className={styles.loading_container}
    >
      <Spinner size={16} name="loadingCircle" color="white" />
    </div>
  ) : (
    <Tooltip title={isDisabled ? t('noPermissionsToPerformAction') : tooltip} position="top">
      <Action
        color={color}
        icon={icon}
        onClick={() => {
          mixpanel.track(`CLICK_ON_ACTION_FROM_BUBBLE_IN_ICON_${icon?.toUpperCase()}`);
          onClick();
        }}
        size={
          sidePeekEnabled && windowDimensions.width > CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE
            ? 'm'
            : size
        }
        disabled={isDisabled}
      />
    </Tooltip>
  );
};

export const ContactViewDropdownAction = React.forwardRef(
  (props: ContactViewDropdownActionProps, ref: MutableRefObject<HTMLDivElement>) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'sidePeek.contactViewActions',
    });
    const { color, icon, visible, children, setVisible, isDisabled } = props;
    const { useGetSidePeekEnabled } = useExtensionContext();
    const sidePeekEnabled = useGetSidePeekEnabled();
    const { windowDimensions } = useMediaQuery();

    return (
      <Tooltip title={isDisabled && t('noPermissionsToPerformAction')} position="top">
        <Dropdown
          anchor={
            <Action
              color={color}
              icon={icon}
              onClick={() => setVisible(!visible)}
              disabled={isDisabled}
              size={
                sidePeekEnabled && windowDimensions.width > CONTACT_ACTIONS_MAXIMUM_WINDOW_SIZE
                  ? 'm'
                  : 's'
              }
            />
          }
          visible={visible}
          ref={ref}
        >
          {children}
        </Dropdown>
      </Tooltip>
    );
  },
);
