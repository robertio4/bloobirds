import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useActivityFeed } from '@bloobirds-it/activity-feed';
import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { Bobject, ExtensionHelperKeys, LeadForFilter, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import isEqual from 'lodash/isEqual';
import mixpanel from 'mixpanel-browser';

import styles from '../pastActivity.module.css';
import { ActivityFeedUserFilter } from './activityFeedUserFilter';
import MagicFilter from './magicFilter';
import PastActivityLeadFilter from './pastActivityLeadFilter';
import PastActivityTypeFilter from './pastActivityTypeFilter';

export const PastActivityFilters = ({
  magicFilterHandling: [activeMagicFilter, setActiveMagicFilter],
  leadFilterOptions,
  filters,
  setFilters,
  activeBobject,
}: {
  magicFilterHandling: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  leadFilterOptions: LeadForFilter[];
  filters: {
    user: string;
    lead: Bobject[];
    type: Bobject[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{ user: string; lead: Bobject[]; type: Bobject[] }>
  >;
  activeBobject: Bobject;
}) => {
  const {
    filters: newActivityFeedFilters,
    setFilters: setNewActivityFeedFilters,
    setActiveMagicFilter: setNewFeedMagicFilter,
  } = useActivityFeed({ activeBobject, subscribeMutator: () => undefined });
  const [showTypeFilters, setShowTypeFilters] = useState<boolean>(false);
  const { has } = useUserHelpers();
  const activityBlockHidden = has(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK);
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.pastActivityTab',
  });

  function setUserFilter(value: string) {
    if (!isEqual(value, filters.user)) {
      //@ts-ignore
      setFilters({ ...filters, user: value });
      setNewActivityFeedFilters({
        ...newActivityFeedFilters,
        user: value,
        activeBobjectId: activeBobject?.id?.value,
      });
    }
  }
  function setLeadFilter(value: Bobject[]) {
    if (!isEqual(value, filters.lead)) {
      //@ts-ignore
      setFilters({ ...filters, lead: value });
      setNewActivityFeedFilters({
        ...newActivityFeedFilters,
        lead: value,
        activeBobjectId: activeBobject?.id?.value,
      });
    }
  }

  function setTypeFilter(value: Bobject[]) {
    if (!isEqual(value, filters.type)) {
      //@ts-ignore
      setFilters({ ...filters, type: value });
      setNewActivityFeedFilters({
        ...newActivityFeedFilters,
        type: value,
        activeBobjectId: activeBobject?.id?.value,
      });
    }
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.leftHeader}>
            <Text size="m" color="peanut" weight="medium">
              {t('title')}
            </Text>
            <Button
              iconLeft="slidersHor"
              size="small"
              onClick={() => {
                setShowTypeFilters(!showTypeFilters);
              }}
              color={activeMagicFilter ? 'softPeanut' : 'bloobirds'}
              variant={showTypeFilters ? 'primary' : 'clear'}
              disabled={activeMagicFilter}
            />
          </div>
          <div className={styles._top_filters}>
            <MagicFilter
              isDisabled={filters.type?.length !== 0}
              magicFilterHandling={[
                activeMagicFilter,
                () => {
                  setShowTypeFilters(false);
                  setActiveMagicFilter(!activeMagicFilter);
                  setNewFeedMagicFilter(!activeMagicFilter);
                },
              ]}
            />
            {activityBlockHidden && (
              <IconButton
                onClick={() => {
                  mixpanel.track(MIXPANEL_EVENTS.ACTIVITY_TOOLTIP_TOP_BUTTON_CLICKED);
                  window.open(
                    'https://support.bloobirds.com/hc/en-us/articles/360016268860-Email-tracking',
                    '_blank',
                  );
                }}
                size={18}
                className={styles.suggestionsButton}
                name="suggestions"
                color="purple"
              />
            )}
          </div>
        </div>
        <div className={styles.headerSecondRow}>
          <ActivityFeedUserFilter selectedUser={filters.user} setUserFilter={setUserFilter} />
          <PastActivityLeadFilter
            setLeadFilter={setLeadFilter}
            leadsAvailable={leadFilterOptions}
            //@ts-ignore
            selectedLead={filters.lead}
            setSelectedLead={setLeadFilter}
          />
        </div>
      </div>
      {showTypeFilters && (
        <PastActivityTypeFilter filters={filters} setTypeFilter={setTypeFilter} />
      )}
    </>
  );
};
