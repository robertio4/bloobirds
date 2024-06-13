import { useTranslation } from 'react-i18next';

import { ColorType, Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import { ContactViewSubTab } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../context';
import styles from './contactViewFooter.module.css';

export interface ContactViewFooterProps {
  children?: any;
}

export interface ContactViewFooterTabProps {
  name: ContactViewSubTab;
  selected: ContactViewSubTab;
  icon: IconType;
  color?: ColorType;
  onClick: (tab: ContactViewSubTab) => void;
}

export const ContactViewFooterTab = (props: ContactViewFooterTabProps) => {
  const { name, icon, onClick, selected, color } = props;
  const isSelected = selected === name;
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation();

  const selectedColor = color || (name === 'Playbook' ? 'purple' : 'bloobirds');

  return (
    <div
      className={clsx(styles.tab_container, {
        [styles.tab_container_selected]: isSelected,
        [styles.tab_container_playbook_selected]: isSelected && selectedColor === 'purple',
      })}
      data-test={`contact-view-${name}-tab`}
      onClick={() => {
        if (onClick) {
          mixpanel.track(`CLICK_ON_TAB_FROM_BUBBLE_IN_ICON_${icon?.toUpperCase()}`);
          onClick(name);
        }
      }}
    >
      <Icon
        name={icon}
        color={isSelected ? selectedColor : 'softPeanut'}
        size={sidePeekEnabled ? 24 : 14}
        className={!sidePeekEnabled && styles.footer_icon}
      />
      <Text
        size="xs"
        color={isSelected ? selectedColor : 'softPeanut'}
        weight={isSelected ? 'heavy' : 'regular'}
      >
        {t(`common.${name}`)}
      </Text>
    </div>
  );
};

export const ContactViewFooter = (props: ContactViewFooterProps) => {
  const { children } = props;
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_wrapper}>{children}</div>
      <div className={styles.footer_shadow} />
    </div>
  );
};
