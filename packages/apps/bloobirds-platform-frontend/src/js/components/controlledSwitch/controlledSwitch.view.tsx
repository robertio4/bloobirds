import React from 'react';
import { Controller } from 'react-hook-form';
import { Icon, Switch, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import styles from './controlledSwitch.module.css';

interface ControlledSwitchProps {
  control: any;
  name: string;
  children: string;
  disabled: boolean;
  tooltip: string;
  infoButton: boolean;
}

export const ControlledSwitch = ({
  control,
  name,
  children,
  disabled = false,
  tooltip = '',
  infoButton,
}: ControlledSwitchProps) => (
  <Tooltip title={!infoButton && tooltip} position="top">
    <div className={styles._switchText__container}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => (
          <Switch checked={value} onChange={onChange} disabled={disabled} />
        )}
      />
      <div className={styles._switchText__text}>
        <Text size="s" inline color="peanut">
          {children}
        </Text>
      </div>
      {infoButton && (
        <Tooltip title={tooltip} position="bottom-end">
          <Icon
            name="infoFilled"
            color="darkBloobirds"
            size={16}
            className={styles._switchText__icon}
          />
        </Tooltip>
      )}
    </div>
  </Tooltip>
);
