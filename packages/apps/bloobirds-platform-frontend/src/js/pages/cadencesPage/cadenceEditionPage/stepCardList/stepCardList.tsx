import React, { Fragment } from 'react';
import { groupBy } from 'lodash';
import { Text } from '@bloobirds-it/flamingo-ui';
import styles from './stepCardList.module.css';
import { StepCard } from './stepCard/stepCard';
import { BobjectType, CadenceStep } from '@bloobirds-it/types';

interface StepCardListProps {
  steps: Array<CadenceStep>;
  bobjectType: BobjectType;
  refreshCadences: () => void;
}

const DashedLine = () => <div className={styles._dashed_line} />;

export const StepCardList = ({ steps: allSteps, bobjectType, refreshCadences }: StepCardListProps) => {
  const stepsByDay = groupBy(allSteps, 'dayNumber');
  return (
    <div>
      {Object.entries(stepsByDay).map(([dayNumber, steps], dayIndex) => {
        return (
          <Fragment key={dayNumber}>
            {dayIndex > 0 && <DashedLine />}
            <div className={styles.dayLabel}>
              <Text weight="medium" size="xs" color="softBloobirds">
                Day {parseInt(dayNumber) + 1}
              </Text>
            </div>
            <div role="list">
              {steps.map(step => (
                <Fragment key={step.id}>
                  <DashedLine />
                  <StepCard
                    step={step}
                    bobjectType={bobjectType}
                    stepNumber={allSteps.findIndex(s => s.id === step.id)}
                    refreshCadences={refreshCadences}
                  />
                </Fragment>
              ))}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
