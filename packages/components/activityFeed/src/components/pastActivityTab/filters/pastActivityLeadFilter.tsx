import React from 'react';
import { useTranslation } from 'react-i18next';

import { CheckItem, Icon, MultiSelect } from '@bloobirds-it/flamingo-ui';
import { Bobject, ExtensionBobject, LeadForFilter } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './pastActivityFilters.module.css';

const PastActivityLeadFilter = ({
  setLeadFilter,
  leadsAvailable,
  selectedLead,
  setSelectedLead,
  isSEE = true,
}: {
  setLeadFilter: (lead: Bobject[] | ExtensionBobject[]) => void;
  leadsAvailable: LeadForFilter[];
  selectedLead: Bobject[] | ExtensionBobject[];
  setSelectedLead: (lead: Bobject[] | ExtensionBobject[]) => void;
  isSEE?: boolean;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'activityTimelineItem.activityFeed' });
  return (
    <div className={clsx(styles._lead_multiselect, { [styles.shortened_input]: !isSEE })}>
      <Icon name="person" color="bloobirds" size={16} />
      <MultiSelect
        size="small"
        borderless
        value={selectedLead}
        defaultValue={selectedLead}
        onChange={value => {
          setSelectedLead(value);
          setLeadFilter(value);
        }}
        placeholder={isSEE ? t('selectLead') : t('select')}
        autocomplete
        selectAllOption
        errorStyle={selectedLead?.length === 0}
        itemsTitle={t('activityFrom')}
        transparent
        renderDisplayValue={
          isSEE
            ? undefined
            : value =>
                value.length === leadsAvailable?.length
                  ? t('allLeads')
                  : `${value?.length} lead${value?.length > 1 ? 's' : ''}`
        }
      >
        {leadsAvailable?.map(filterLead => (
          <CheckItem key={filterLead?.id} value={filterLead?.id} label={filterLead?.name}>
            {filterLead?.name}
          </CheckItem>
        ))}
      </MultiSelect>
    </div>
  );
};

export default PastActivityLeadFilter;
