import { Label } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './salesLabel.module.css';

export const SalesLabel = ({ isSalesStage = false, contracted = false, overrideStyle = {} }) => {
  if (contracted) {
    return (
      <Label
        size={'small'}
        uppercase={false}
        color={isSalesStage ? 'peanut' : 'verySoftGrape'}
        textColor={isSalesStage ? 'white' : 'peanut'}
        overrideStyle={{
          ...{
            paddingLeft: '3px',
            paddingRight: '3px',
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
          },
          ...overrideStyle,
        }}
      >
        {isSalesStage ? 'Sa' : 'Pr'}
      </Label>
    );
  } else {
    return (
      <div className={styles._label_div}>
        <Label
          size={'small'}
          uppercase={false}
          color={isSalesStage ? 'peanut' : 'verySoftGrape'}
          textColor={isSalesStage ? 'white' : 'peanut'}
          overrideStyle={{
            ...{ borderTopRightRadius: 0, borderBottomLeftRadius: 0 },
            ...overrideStyle,
          }}
        >
          {isSalesStage ? 'Sales' : 'Prospecting'}
        </Label>
      </div>
    );
  }
};
