import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Item, Select } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';

import { CadenceTableContext, CadenceTableImmutableContext } from '../CadenceTable';
import { CadenceBobject, CadenceLead, KindFilterType, TIME_WINDOW } from '../cadenceTable.type';
import { CurrentCadence } from './CurrentCadence';
import { LeadFilter } from './LeadFilter';
import styles from './cadenceHeader.module.css';

interface CadenceHeaderProps {
  activeUserId: string;
  bobject: CadenceBobject;
  leads?: CadenceLead[];
  openCadenceControl?: (params: any) => void;
}

export function CadenceHeader(props: CadenceHeaderProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceTable.header' });
  return (
    <div className={styles._title__wrapper}>
      <div className={styles._name__wrapper}>
        <CurrentCadence {...props} />
        {props.bobject?.id.typeName !== BobjectTypes.Lead && (
          <LeadFilter bobjectType={props.bobject?.id.typeName} leads={props.leads} />
        )}
      </div>
      <div className={styles._right_wrapper}>
        {t('show')} :
        <TimeWindowFilter />
        <KindFilter />
        <TodayButton />
      </div>
    </div>
  );
}

export const TimeWindowFilter = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.header.timeWindowFilter',
  });

  const { timeWindow } = useContext(CadenceTableContext);
  const { setTimeWindow } = useContext(CadenceTableImmutableContext);
  return (
    <div className={styles._filter_right_wrapper}>
      <Select
        value={timeWindow}
        onChange={(value: TIME_WINDOW) => setTimeWindow(value)}
        placeholder={t('placeholder')}
        size="small"
        variant="filters"
        width="150px"
      >
        <Item value={TIME_WINDOW.DAILY}>{t('daily')}</Item>
        <Item value={TIME_WINDOW.WEEKLY}>{t('weekly')}</Item>
        <Item value={TIME_WINDOW.MONTHLY}>{t('monthly')}</Item>
      </Select>
    </div>
  );
};

const KindFilter = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'cadence.cadenceTable.header.kindFilter',
  });

  const { setKindFilter } = useContext(CadenceTableImmutableContext);
  const setFilterValue = (value: KindFilterType) => {
    if (value === 'anyKind') {
      setKindFilter(null);
    } else {
      setKindFilter(value);
    }
  };
  return (
    <div className={styles._filter_right_wrapper}>
      <Select
        onChange={setFilterValue}
        placeholder={t('placeholder')}
        size="small"
        defaultValue={t('anyType')}
        //value={kindFilter}
        variant="filters"
        width="120px"
      >
        <Item value="anyKind">{t('anyType')}</Item>
        <Item value="ATTEMPTS">{t('attempts')}</Item>
        <Item value="TOUCHES">{t('touches')}</Item>
        <Item value="INCOMING">{t('incoming')}</Item>
        <Item value="OUTGOING">{t('outgoing')}</Item>
        <Item value="MISSED">{t('missed')}</Item>
      </Select>
    </div>
  );
};

const TodayButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceTable.header' });

  const { setScrollTo } = useContext(CadenceTableImmutableContext);
  return (
    <div className={styles._filter_right_wrapper}>
      <Button variant="tertiary" size="small" onClick={() => setScrollTo('today')}>
        {t('today').toUpperCase()}
      </Button>
    </div>
  );
};
