import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import classNames from 'clsx';
import styles from './targetMarketsButton.module.css';
import { useTargetMarketsModal } from '../../hooks/useTargetMarketsModal';
import {useTranslation} from "react-i18next";

export const TargetMarketsButton = ({
  size,
  textBefore,
}: {
  size?: 'medium' | 'small' | 's' | 'xs';
  textBefore: string;
}) => {
  const { openTargetMarketsModal } = useTargetMarketsModal();
  const { t } = useTranslation();
  const fontSize = () => {
    switch (size) {
      case 'medium':
        return 's';
      case 'small':
        return 'xs';
      default:
        return 's';
    }
  };
  return (
    <div
      className={classNames(styles._target_market_message, {
        [styles._target_market_message_small]: size === 'small',
      })}
      onClick={openTargetMarketsModal}
    >
      <Icon name="magic" color="purple" />
      {textBefore && (
        <Text size={fontSize()} color="purple" htmlTag="span">
          {textBefore}
        </Text>
      )}
      <Text size={fontSize()} color="purple" weight="bold" htmlTag="span" decoration="underline">
        {t('common.targetMarket_other')}!
      </Text>
    </div>
  );
};
