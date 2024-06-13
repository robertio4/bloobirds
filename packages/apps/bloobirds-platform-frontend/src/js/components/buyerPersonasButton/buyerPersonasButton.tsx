import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import classNames from 'clsx';
import styles from './buyerPersonasButton.module.css';
import { useBuyerPersonasModal } from '../../hooks/useBuyerPersonasModal';

export const BuyerPersonasButton = ({
  size,
  textBefore,
}: {
  size?: 'medium' | 'small' | string;
  textBefore?: string;
}) => {
  const { openBuyerPersonasModal } = useBuyerPersonasModal();
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
      className={classNames(styles._buyer_personas_message, {
        [styles._buyer_personas_message_small]: size === 'small',
      })}
      onClick={() => openBuyerPersonasModal()}
    >
      <Icon name="magic" color="purple" />
      {textBefore && (
        <Text size={fontSize()} color="purple" htmlTag="span">
          {textBefore}
        </Text>
      )}
      <Text size={fontSize()} color="purple" weight="bold" htmlTag="span" decoration="underline">
        Buyer personas
      </Text>
    </div>
  );
};
