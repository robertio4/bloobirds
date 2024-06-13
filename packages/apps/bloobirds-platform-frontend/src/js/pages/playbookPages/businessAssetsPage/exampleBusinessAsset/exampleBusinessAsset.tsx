import React from 'react';
import { useTranslation } from 'react-i18next';

import { CircularBadge, Text, Divider, Tag } from '@bloobirds-it/flamingo-ui';

import { randomizeColorName } from '../../../../utils/styles.utils';
import { EXAMPLES } from './exampleBusinessAsset.constants';
import styles from './exampleBusinessAsset.module.css';

export const ExampleBusinessAsset = ({
  type,
  language,
}: {
  type: 'buyerPersona_other' | 'targetMarket_other';
  language: 'ES' | 'EN';
}) => {
  const { t } = useTranslation();
  const typeName = t(`common.${type}`);
  return (
    <div className={styles.examples__container}>
      <div className={styles.example__description}>
        <Text size="m" color="softPeanut">
          {t('playbook.thisIsABusinessModelExample')}
        </Text>
        <Text size="m" color="peanut">
          {EXAMPLES[type][language]?.description}
        </Text>
      </div>
      <div className={styles.example__icon}>
        <span role="img" aria-label="point right finger" className={styles.icon}>
          👉
        </span>
      </div>
      <div className={styles.example__cards}>
        <div>
          <Text size="m" color="softPeanut" align="left">
            {t('playbook.andThisIsHowWeTranslateIt', { type: typeName })}
          </Text>
        </div>
        <div className={styles.example__cards__container}>
          {EXAMPLES[type][language]?.examples.map(example => (
            <div className={styles.example__card} key={example?.title}>
              <div className={styles.card__header}>
                {/* @ts-ignore */}
                <CircularBadge size="l" color={randomizeColorName()} className={styles.avatar}>
                  {example.shortname || 'TS'}
                </CircularBadge>
                <div className={styles.card__title}>
                  <Text size="m" color="peanut" weight="bold">
                    {example.title}
                  </Text>
                  <Text size="xs" color="peanut">
                    {/* @ts-ignore */}
                    {example?.subtitle}
                  </Text>
                </div>
              </div>
              <Divider />
              <div className={styles.card__segmentation__container}>
                {example?.segmentation.map((seg: any) => (
                  <div className={styles.card__segmentation__element} key={seg?.title}>
                    <Text size="s" color="peanut" inline>
                      {seg.title}:
                    </Text>
                    {seg.values.map((v: any) => (
                      <Tag uppercase={false} key={v}>
                        <Text size="xs">{v}</Text>
                      </Tag>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
