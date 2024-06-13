import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Item, Select } from '@bloobirds-it/flamingo-ui';

import { CadenceTableImmutableContext } from '../CadenceTable';
import { CadenceLead } from '../cadenceTable.type';
import styles from './cadenceHeader.module.css';
import { toSentenceCase } from "@bloobirds-it/utils";

interface LeadFilterProps {
  bobjectType: string;
  leads: CadenceLead[];
}

export const LeadFilter = (props: LeadFilterProps) => {
  const { bobjectType, leads } = props;
  const { setLeadFilter } = useContext(CadenceTableImmutableContext);
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceTable.header' });
  const { t: bobjectTypeT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  const setFilterValue = (value: string) => {
    if (value === 'all') {
      setLeadFilter([]);
    } else if (value === 'noLeads') {
      setLeadFilter(null);
    } else {
      setLeadFilter([value]);
    }
  };

  return (
    <div className={styles._filter_wrapper}>
      <Select
        onChange={setFilterValue}
        placeholder={t('placeholder')}
        size="small"
        defaultValue={'all'}
        variant="filters"
        width="275px"
      >
        <Item value="all">
          {t('allItem', { bobjectType: toSentenceCase(bobjectTypeT(bobjectType.toLowerCase())) })}
        </Item>
        <Item value="noLeads">
          <em>{t('noLeadAssigned')}</em>
        </Item>
        {leads?.map(lead => (
          <Item value={lead.id.value} key={`${lead.id.objectId}`}>
            {lead.fullName}
          </Item>
        ))}
      </Select>
    </div>
  );
};
