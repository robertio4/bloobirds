import React, { useState } from 'react';
import styles from './cadenceSettings.module.css';
import { Button, Callout, Text } from '@bloobirds-it/flamingo-ui';
import PauseCadenceModal from './pauseCadenceModal/pauseCadenceModal';
import { usePausePeriods, usePausePeriodsModal } from '@bloobirds-it/hooks';
import PauseCadenceCard from './pauseCadenceCard/pauseCadenceCard';
import { useActiveUser } from '../../../hooks';

const CadenceSettings = () => {
  const [showPast, setShowPast] = useState(false);
  const { activeUser } = useActiveUser();
  const { periods } = usePausePeriods({ userId: activeUser.id });
  const { openCreatePauseModal } = usePausePeriodsModal();
  // @ts-ignore will be fixed once 'hooks' export typing
  const hasFinishedPeriods = periods?.list?.filter(period => period.finished).length > 0;
  // @ts-ignore will be fixed once 'hooks' export typing
  const hasActivePeriods = periods.list.some(period => !period.finished);
  const hasPeriods = periods?.list?.length > 0;

  return (
    <div className={styles._container} data-intercom="user-settings-page-cadence">
      <PauseCadenceModal />
      <div className={styles._content__box}>
        <div className={styles._section__box}>
          <div className={styles._title__container}>
            <div className={styles._title__content}>
              <Text size="m" color="softPeanut" htmlTag="span">
                Active pauses
              </Text>
            </div>
            <div className={styles._add_pause__container}>
              <Button
                dataTest={'pauseCadence'}
                iconLeft="plus"
                size="small"
                onClick={openCreatePauseModal}
              >
                Pause Cadence
              </Button>
            </div>
          </div>
          <div className={styles._subSection__container}>
            {periods && hasPeriods && hasActivePeriods ? (
              <>
                <div className={styles._callout__container}>
                  <Callout icon="clock" variant="alert">
                    This process may take time to finish! Your tasks are being rescheduled...
                    <Text weight="bold" size="m">
                      Wait a few minutes before trying to pause it again!
                    </Text>
                  </Callout>
                </div>
                {periods.list.map(
                  // @ts-ignore will be fixed once 'hooks' export typing
                  period => !period.finished && <PauseCadenceCard key={period.id} {...period} />,
                )}
              </>
            ) : (
              <>
                <Text color="softPeanut" size="l">
                  No active pauses so far!
                </Text>
                <div className={styles._description__text}>
                  <Text align="center">
                    {' '}
                    Going on holiday for a few days? 🌴 <br />
                    Pause your cadences for the days you&apos;ll be out.
                    <br />
                    You can resume them when you&apos;re back!
                  </Text>
                </div>
              </>
            )}
          </div>
          <div
            className={styles._past__periods__button__container}
            onClick={() => setShowPast(!showPast)}
          >
            {hasFinishedPeriods && (
              <Text size="m" weight="bold" color="bloobirds">
                {showPast ? 'HIDE' : 'SHOW'} PAST PAUSES
              </Text>
            )}
          </div>
          <div className={styles._subSection__container}>
            {periods &&
              showPast &&
              periods.list.map(
                // @ts-ignore will be fixed once 'hooks' export typing
                period =>
                  period.finished && <PauseCadenceCard completed key={period.id} {...period} />,
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadenceSettings;
