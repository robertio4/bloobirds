import React, { useEffect, useState } from 'react';
import styles from '../../styles/fieldsPage.module.css';
import { Radio, RadioGroup } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

const SizePreview = ({ lines, active }) => (
  <div className={styles._size_field}>
    <div
      className={classNames({
        [styles._size_prev]: true,
        [styles._size_active]: active,
      })}
    >
      <div
        className={classNames({
          [styles._size_prev_first]: true,
          [styles._size_prev_active]: lines === 1,
        })}
      >
        <div />
      </div>
      <div
        className={classNames({
          [styles._size_prev_second]: true,
          [styles._size_prev_active]: lines === 2,
        })}
      >
        <div />
        <div />
      </div>
      <div
        className={classNames({
          [styles._size_prev_third]: true,
          [styles._size_prev_active]: lines === 3,
        })}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export const SizeField = ({ value, onChange, defaultValue }) => {
  const [processedDefault, setProcessedDefault] = useState('100%');

  useEffect(() => {
    if (defaultValue) {
      const intValue = parseInt(defaultValue, 10);
      if (intValue > 70) {
        setProcessedDefault('100%');
      }
      if (intValue < 69 && intValue > 40) {
        setProcessedDefault('50%');
      }
      if (intValue < 39) {
        setProcessedDefault('30%');
      }
    }
  }, [defaultValue]);
  return (
    <div className={styles._input_size}>
      <div className={styles._size_preview}>
        <SizePreview active={value === '100%'} lines={1} />
        <SizePreview active={value === '50%'} lines={2} />
        <SizePreview active={value === '30%'} lines={3} />
      </div>
      <RadioGroup onChange={onChange} value={value} defaultValue={processedDefault}>
        <Radio size="medium" value="100%">
          <div className={styles._size_radio_text}>Full width</div>
        </Radio>
        <div className={styles._size_between_radio} />
        <Radio size="medium" value="50%">
          <div className={styles._size_radio_text}>Two columns</div>
        </Radio>
        <div className={styles._size_between_radio} />
        <Radio size="medium" value="30%">
          <div className={styles._size_radio_text}>Three columns</div>
        </Radio>
      </RadioGroup>
    </div>
  );
};
