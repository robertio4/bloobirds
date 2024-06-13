import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconType, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { PlaybookTab, templateTypes } from '@bloobirds-it/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

import styles from '../playbookFeed/playbookFeed.module.css';

export interface PlaybookTabProps {
  selected: PlaybookTab;
  name: PlaybookTab;
  icon: IconType;
  onClick: (tab: PlaybookTab) => void;
  className?: string;
  sidePeekEnabled?: boolean;
  dataTest?: string;
  isSmartEmail: boolean;
}

export const PlaybookTabElement = (props: PlaybookTabProps) => {
  const {
    name,
    icon,
    onClick,
    selected,
    sidePeekEnabled,
    className,
    dataTest,
    isSmartEmail,
  } = props;
  const isSelected = selected === name;
  const { t } = useTranslation();

  const isSmallScreen = window.innerWidth < 1440;

  const largeView = useMemo(() => {
    return sidePeekEnabled && !isSmallScreen;
  }, [sidePeekEnabled, isSmallScreen]);

  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => {
    return largeView || isSmartEmail ? (
      <> {children} </>
    ) : (
      <Tooltip title={t(`playbook.${name.toLowerCase()}`)} position="bottom">
        {children}
      </Tooltip>
    );
  };

  const AnimationWrapper = ({ children }: { children: React.ReactNode }) => {
    return largeView || isSmartEmail ? (
      <>{children}</>
    ) : (
      isSelected && (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'flex',
          }}
        >
          {children}
        </motion.div>
      )
    );
  };

  return (
    <TooltipWrapper>
      <div
        style={{ width: largeView ? 74 : undefined }}
        className={clsx(className || styles.tab_container)}
        onClick={() => {
          if (onClick) {
            onClick(name);
            mixpanel.track(`CLICK_ON_${templateTypes[name]}_SECTION_FROM_PLAYBOOK_OTO`);
          }
        }}
        {...(dataTest ? { 'data-test': dataTest } : {})}
      >
        <Icon name={icon} color={isSelected ? 'purple' : 'softPeanut'} size={largeView ? 24 : 20} />

        <AnimationWrapper>
          <Text
            size="xs"
            color={isSelected ? 'purple' : 'softPeanut'}
            weight={isSelected ? 'bold' : 'regular'}
            className={styles.title_sidePeek}
          >
            {t(`playbook.${name.toLowerCase()}`)}
          </Text>
        </AnimationWrapper>
      </div>
    </TooltipWrapper>
  );
};
