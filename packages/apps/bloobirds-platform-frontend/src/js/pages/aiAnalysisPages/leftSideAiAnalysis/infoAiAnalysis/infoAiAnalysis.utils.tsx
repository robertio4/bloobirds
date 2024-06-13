import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { ColorType, FontSizeType, Icon, IconType, Label, Text } from '@bloobirds-it/flamingo-ui';

import styles from './infoAiAnalysis.module.css';

export const IconLabelAnalysis = ({
  id,
  labelProps,
  iconProps,
  text,
}: {
  id: string;
  labelProps?: {
    weight: 'bold' | 'regular' | 'medium' | 'heavy';
    color: ColorType;
    size: FontSizeType;
  };
  iconProps: { name: IconType; color: ColorType; size: number };
  text: string;
}) => {
  return (
    <div id={id} className={styles.iconLabel}>
      <Icon {...iconProps} />
      <Text {...labelProps}>{text}</Text>
    </div>
  );
};

export const InfoSectionAnalysis = ({
  icon,
  title,
  info,
  isLabel = false,
  style,
}: {
  icon: IconType;
  title: string;
  info: string;
  isLabel?: boolean;
  style?: CSSProperties;
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.infoSectionContainer}>
      <IconLabelAnalysis
        id={title}
        iconProps={{ name: icon, color: 'verySoftBloobirds', size: 20 }}
        labelProps={{ weight: 'heavy', color: 'peanut', size: 'xs' }}
        text={title}
      />
      <div className={styles.infoSectionValue}>
        {!isLabel ? (
          <Text className={styles.infoSectionText} size="xs">
            {info ? info : t('common.none')}
          </Text>
        ) : (
          <>
            {info ? (
              <Label
                overrideStyle={{
                  minWidth: '80px',
                  minHeight: '18px',
                  display: 'flex',
                  ...style,
                }}
                uppercase={false}
                size="small"
              >
                {info}
              </Label>
            ) : (
              <div style={{ marginTop: '4px' }}>{t('common.none')}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
