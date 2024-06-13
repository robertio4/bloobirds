import React from 'react';
import styles from './LogoCheckbox.module.css';
import { Checkbox, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import classNames from 'classnames';
import { toTitleCase } from '../../utils/strings.utils';

// selected prop is used in case you are using a multicheckbox, instead use isChecked
const LogoCheckbox = ({
  logo,
  name,
  value,
  onChange,
  disabled,
  disabledMessage = '',
  checked,
  color = 'bloobirds',
  selectedColor = 'verySoftBloobirds',
}) => {
  return (
    <Tooltip title={disabled ? disabledMessage : null} position="top">
      <div
        className={classNames(styles._box__container, {
          [styles._box__container__checked]: checked,
          [styles._box__container__disabled]: disabled,
        })}
        style={{
          border: `1px solid var(--verySoft${toTitleCase(color)})`,
          ...(checked
            ? {
                backgroundColor: `var(--${selectedColor})`,
              }
            : {}),
        }}
        onClick={() => (disabled ? null : onChange(value))}
      >
        <div className={styles._checkbox__container}>
          <Checkbox
            disabled={disabled}
            onClick={() => (disabled ? null : onChange(value))}
            checked={checked}
            size="small"
            color={color}
          />
        </div>
        <div className={styles._logo}>{logo && logo(disabled)}</div>
        <div className={styles._name__container}>
          <Text size="s">{name}</Text>
        </div>
      </div>
    </Tooltip>
  );
};

export default LogoCheckbox;
