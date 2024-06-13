import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import WithTooltip from '../../../../../components/withTooltip/withTooltip';
import styles from './addButton.module.css';

export const AddButton = ({
  onClick,
  disabled,
  showTooltip,
}: {
  onClick: () => void;
  disabled?: boolean;
  showTooltip?: boolean;
}) => (
  <WithTooltip
    isDisabled={disabled}
    title={
      showTooltip
        ? 'To create an opportunity first send the company and/or the lead to the sales stage.'
        : null
    }
  >
    <div
      className={classNames(styles.buttonWrapper, { [styles.buttonDisabled]: disabled })}
      onClick={e => {
        e.stopPropagation();
        if (!disabled) {
          onClick();
        }
      }}
    >
      <Icon name="addCircle" color={disabled ? 'verySoftPeanut' : 'darkBloobirds'} size={16} />
      <Text size="xs" color={disabled ? 'verySoftPeanut' : 'darkBloobirds'} htmlTag="span">
        Add
      </Text>
    </div>
  </WithTooltip>
);
