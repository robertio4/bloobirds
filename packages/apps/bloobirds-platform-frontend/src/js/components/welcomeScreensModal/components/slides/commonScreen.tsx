import React from 'react';
import { Trans } from 'react-i18next';

import { ColorType, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import otoStyles from './otoSlides/otoSlides.module.css';
import styles from './slides.module.css';

type Props = {
  text: React.ReactElement;
  svg: string;
  color?: ColorType;
  children?: React.ReactElement;
  isOTO?: boolean;
};

function CommonScreen({ text, svg, children, color, isOTO = false }: Props) {
  return (
    <div
      key={'AutomatedTask'}
      className={clsx({
        [isOTO ? otoStyles.backgroundWhite : styles.backgroundWhite]: color === 'white',
        [isOTO ? otoStyles.backgroundSoftPurple : styles.backgroundSoftPurple]: !color,
      })}
    >
      <div className={styles.subtitleContent}>
        <Text size="m" align="center" color="softPeanut" className={styles.subtitleText}>
          <Trans
            i18nKey="welcomeScreens.otoSlides.commonScreen.title"
            components={[
              <Text
                key="0"
                size="m"
                weight="bold"
                color="bloobirds"
                inline
                className={styles.subtitleText}
              >
                {''}
              </Text>,
            ]}
          />
        </Text>
      </div>
      <div className={styles.titleContent}>
        <Text size="xl" align="center">
          {text}
        </Text>
      </div>
      <div className={styles.svgContent}>
        <img height={isOTO ? 295 : 260} src={svg} alt="svg" />
      </div>
      {children}
    </div>
  );
}

export default CommonScreen;
