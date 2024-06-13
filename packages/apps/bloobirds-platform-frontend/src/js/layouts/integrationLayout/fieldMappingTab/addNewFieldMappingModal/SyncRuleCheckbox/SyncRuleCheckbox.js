import React, { useMemo } from 'react';

import { Text, Tooltip, useHover } from '@bloobirds-it/flamingo-ui';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { checkRelatedMapping } from '../newFielMapping.utils';
import SyncRulesSubTypes from './SyncRulesSubTypes';
import styles from './syncRuleCheckbox.module.css';

const SyncRuleCheckbox = props => {
  const {
    title,
    description,
    checked,
    onChecked,
    disabled,
    subTypes,
    syncRule,
    setSyncRule,
    selectedCRMField,
  } = props;
  const [ref, isHovered] = useHover();
  const crmRule = useMemo(
    () =>
      syncRule === 'CRM_BUT_BLOOBIRDS_UPDATE' ||
      syncRule === 'CRM_BUT_BLOOBIRDS_CREATE' ||
      syncRule === 'CRM',
    [syncRule],
  );
  const checkClass = classnames(styles._radio_button, {
    [styles._radio_button_checked]: checked && !disabled,
    [styles._radio_button_hovered]: isHovered && !checked && !disabled,
    [styles._radio_button_disabled]: disabled,
  });

  const boxClass = classnames(styles._checkbox_box, {
    [styles._checkbox_box_disabled]: disabled,
  });

  const handleClickCheckbox = () => {
    if (!disabled && onChecked) {
      onChecked();
    }
  };

  return (
    <>
      {disabled ? (
        <div className={boxClass} ref={ref} onClick={handleClickCheckbox}>
          <Tooltip
            title="When mapping fields across objects, information can only be sent from Bloobirds to the CRM."
            position="top"
          >
            <div className={styles._radio_button_holder}>
              <span className={checkClass} />
            </div>
            <div className={styles._checkbox_text_holder}>
              <Text
                color={disabled ? 'softPeanut' : 'bloobirds'}
                className={styles._checkbox_title}
              >
                {title}
              </Text>
              <Text size="m" color={disabled ? 'verySoftPeanut' : 'softPeanut'}>
                {description}
              </Text>
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className={boxClass} ref={ref} onClick={handleClickCheckbox}>
          <div className={styles._radio_button_holder}>
            <span className={checkClass} />
          </div>
          <div className={styles._checkbox_text_holder}>
            <Text color={disabled ? 'softPeanut' : 'bloobirds'} className={styles._checkbox_title}>
              {title}
            </Text>
            <Text size="m" color={disabled ? 'verySoftPeanut' : 'softPeanut'}>
              {description}
            </Text>
          </div>
        </div>
      )}
      {crmRule &&
        subTypes &&
        Object.keys(subTypes)?.map((subType, index) => (
          <SyncRulesSubTypes
            key={`index-${index}`}
            title={subTypes[subType]?.title}
            description={subTypes[subType]?.description}
            checked={subType === syncRule}
            onChecked={() => setSyncRule(subType)}
            disabled={disabled || checkRelatedMapping(subType, selectedCRMField, 'subrule')}
          />
        ))}
    </>
  );
};

SyncRuleCheckbox.propTypes = {
  checked: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  onChecked: PropTypes.func,
  selectedCRMField: PropTypes.object,
  setSyncRule: PropTypes.func,
  subTypes: PropTypes.object,
  syncRule: PropTypes.string,
  title: PropTypes.string,
};

export default SyncRuleCheckbox;
