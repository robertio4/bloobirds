import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { CadenceTableImmutableContext } from '../../CadenceTable';
import { CadenceType, cadenceTypesList } from '../../cadenceTable.type';
import { cadenceTasksDisplay } from '../../cadenceTable.utils';
import styles from '../timeTable.module.css';

const FirstColumnComponent = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.timetable.components',
  });
  return (
    <div className={clsx(styles.column, styles.first_column)}>
      <div className={styles.row} />
      {cadenceTypesList?.map((cadenceAction: CadenceType) => {
        const actionDisplayProps = cadenceTasksDisplay[cadenceAction];
        return (
          <div className={styles.row} key={cadenceAction}>
            <Icon name={actionDisplayProps.icon} color={actionDisplayProps.color} />
            <Text size="xs" color="softPeanut" uppercase>
              {t(actionDisplayProps.key)}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export const FirstColumn = React.memo(FirstColumnComponent);

export const LeftArrowAndFlag = () => {
  const { setScrollTo, isLeftPageDisabled } = useContext(CadenceTableImmutableContext);
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.timetable.components',
  });

  return (
    <div className={styles.edge_column}>
      <div className={styles.row}>
        <Tooltip position="top" title={t('firstActivity')}>
          <IconButton
            name="chevronFirst"
            color="darkBloobirds"
            size={16}
            onClick={() => setScrollTo('firstActivity')}
          />
        </Tooltip>
        <IconButton
          name="chevronLeft"
          color="darkBloobirds"
          size={16}
          onClick={() => setScrollTo('pageBack')}
          disabled={isLeftPageDisabled.current}
        />
        <Tooltip position="top" title={t('firstCadenceDay')}>
          <IconButton
            name="flag"
            size={16}
            color="darkBloobirds"
            onClick={() => setScrollTo('firstTask')}
          />
        </Tooltip>
      </div>
      {cadenceTypesList?.map((cadenceAction: CadenceType) => (
        <div className={styles.row} key={`empty-row-${cadenceAction}`} />
      ))}
    </div>
  );
};

export const RightArrowAndFlag = () => {
  const { setScrollTo, isRightPageDisabled } = useContext(CadenceTableImmutableContext);
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.timetable.components',
  });

  return (
    <div className={styles.edge_column}>
      <div className={styles.row}>
        <Tooltip position="top" title={t('lastCadenceDay')}>
          <IconButton
            name="flagFilled"
            size={16}
            color="darkBloobirds"
            onClick={() => setScrollTo('lastTask')}
          />
        </Tooltip>
        <IconButton
          name="chevronRight"
          size={16}
          color="darkBloobirds"
          onClick={() => setScrollTo('pageForward')}
          disabled={isRightPageDisabled.current}
        />
        <Tooltip position="top" title={t('lastActivity')}>
          <IconButton
            name="chevronLast"
            color="darkBloobirds"
            size={16}
            onClick={() => setScrollTo('lastActivity')}
          />
        </Tooltip>
      </div>
      {cadenceTypesList?.map((type, index) => (
        <div key={`row-column-${index}`} className={styles.row} />
      ))}
    </div>
  );
};
