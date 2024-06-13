import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';
import classnames from 'classnames';

import { useHover } from '../../../../../hooks';
import styles from './syncRuleCheckbox.module.css';

const SyncRulesSubTypes = ({
  title,
  description,
  checked,
  onChecked,
  disabled,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChecked: any;
  disabled: boolean;
}) => {
  const [ref, isHovered] = useHover();
  const checkClass = classnames(styles._sub_types_radio_button, {
    [styles._radio_button_hovered]: isHovered && !checked && !disabled,
    [styles._radio_button_checked]: checked && !disabled,
    [styles._radio_button_disabled]: disabled,
  });
  const boxClass = classnames(styles._sub_types_checkbox_box, {
    [styles._checkbox_box_disabled]: disabled,
  });

  const handleClickCheckbox = () => {
    if (!disabled && onChecked) {
      onChecked();
    }
  };

  return (
    <>
      <div className={boxClass} ref={ref} onClick={handleClickCheckbox}>
        <div className={styles._radio_button_holder}>
          <span className={checkClass} />
        </div>
        <span className={styles._sub_types_checkbox_text_holder}>
          <Text
            color={disabled ? 'softPeanut' : 'peanut'}
            weight="bold"
            size="s"
            className={styles._checkbox_title}
          >
            {title}
          </Text>
          <Text size="s" color={disabled ? 'verySoftPeanut' : 'softPeanut'}>
            {description}
          </Text>
        </span>
      </div>
    </>
  );
};
export default SyncRulesSubTypes;
