import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';

import styles from '../css/informationPanel.module.css';
import { INACTIVE_HANDLING_OPTIONS } from '../types/inactiveHandling.constant';

export const InformationPanel = ({
  selectedOption: { type },
  bobject,
}: {
  selectedOption: { type: INACTIVE_HANDLING_OPTIONS };
  bobject: Bobject;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling.informationPanel',
  });
  const { t: generalT } = useTranslation('translation', {
    keyPrefix: 'wizards.steps.inactiveHandling',
  });
  const bobjectType = bobject?.id?.typeName;
  const modalText =
    type === INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG || type === INACTIVE_HANDLING_OPTIONS.DISCARD
      ? generalT(`${bobjectType?.toLowerCase()}.${type}`)
      : 'undefined';

  const SelectedOptionInfoDisplay = () => {
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('backToBacklog.title')}
            </Text>
            <Text size="xs">{modalText}</Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('discard.title')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {modalText}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('discard.subtitle')}
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('newCadence.title')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('newCadence.subtitle')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('newCadence.description')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              <Trans
                i18nKey="wizards.steps.inactiveHandling.informationPanel.newCadence.link"
                components={[
                  <a
                    key="0"
                    href={'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {''}
                  </a>,
                ]}
              />
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('nextStep.title')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('nextStep.subtitle')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('nextStep.description')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              <Trans
                i18nKey="wizards.steps.inactiveHandling.informationPanel.nextStep.link1"
                components={[
                  <a
                    key="0"
                    href={'https://support.bloobirds.com/hc/en-us/articles/4861712344860-Reminders'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {''}
                  </a>,
                ]}
              />
            </Text>
            <Text size="xs" className={styles._text_block}>
              <Trans
                i18nKey="wizards.steps.inactiveHandling.informationPanel.nextStep.link2"
                components={[
                  <a
                    key="0"
                    href={'https://support.bloobirds.com/hc/en-us/sections/360003357720-Tasks'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {''}
                  </a>,
                ]}
              />
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('reassign.title')}
            </Text>
            <Text size="xs">{t('reassign.subtitle')}</Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('sendToNurturing.title')}
            </Text>
            <Text size="xs" className={styles._text_block}>
              {t('sendToNurturing.subtitle')}
            </Text>{' '}
            <Text size="xs" className={styles._text_block}>
              <Trans
                i18nKey="wizards.steps.inactiveHandling.informationPanel.sendToNurturing.link1"
                components={[
                  <a
                    key="0"
                    href={' https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {''}
                  </a>,
                ]}
              />
            </Text>{' '}
            <Text size="xs" className={styles._text_block}>
              <Trans
                i18nKey="wizards.steps.inactiveHandling.informationPanel.sendToNurturing.link2"
                components={[
                  <a
                    key="0"
                    href={'https://support.bloobirds.com/hc/en-us/articles/5856774476188'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {''}
                  </a>,
                ]}
              />
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              {t('onHold.title')}
            </Text>
            <Text size="xs">{t('onHold.subtitle')}</Text>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles._informationPanel}>
      <SelectedOptionInfoDisplay />
    </div>
  );
};
