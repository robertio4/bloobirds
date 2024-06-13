import React from 'react';

import {
  CheckItem,
  DateValue,
  Icon,
  Item,
  MultiSelect,
  RelativeDatePicker,
  Tag,
  TagGroup,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { BobjectTypes, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { RangeType } from '../../../../hooks/useDashboardFilters';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { useCadenceTags } from '../../cadenceEditionPage/cadenceEditionHeader/cadenceTags/useCadenceTags';
import { useManageCadenceList } from '../cadenceList/useManageCadenceList';
import styles from './cadenceFilters.module.css';

export const BobjectTypeFilter = ({
  selectedBobjectType,
  setSelectedBobjecType,
  setSearchValue,
}: {
  selectedBobjectType: BobjectTypes[] | string[];
  setSelectedBobjecType: (x: BobjectTypes[]) => void;
  setSearchValue?: (x: string) => void;
}) => {
  const isFullSalesEnabled = useFullSalesEnabled();

  return (
    <div className={styles.typeFilters}>
      <Text size="s">Type</Text>
      <TagGroup
        value={selectedBobjectType}
        onChange={(v: BobjectTypes[]) => {
          if (setSearchValue) setSearchValue('');
          setSelectedBobjecType(v);
        }}
        uppercase={false}
      >
        <Tag value={BobjectTypes.Company}>Company</Tag>
        <Tag value={BobjectTypes.Lead}>Lead</Tag>
        {isFullSalesEnabled && <Tag value={BobjectTypes.Opportunity}>Opportunity</Tag>}
      </TagGroup>
    </div>
  );
};

const UserFilter = ({
  value,
  setValue,
  placeholder,
}: {
  value: any[];
  setValue: (value: any[]) => void;
  placeholder: string;
}) => {
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter(user => user.enabled);
  const { settings } = useActiveUserSettings();
  const userId = settings?.user?.id;
  const restOfUser = users.filter(u => u.id !== userId);

  return (
    <div className={styles.authorFilter}>
      <Text size="s">{placeholder}</Text>
      <MultiSelect
        placeholder={value?.length > 0 ? 'Assigned to' : 'Any author'}
        size="small"
        onChange={value => {
          setValue(value);
        }}
        value={value || []}
      >
        {[
          <Item key="Any" value="">
            Any
          </Item>,
          <CheckItem key={userId} value={userId}>
            Me
          </CheckItem>,
          ...(restOfUser?.map(user => (
            <CheckItem key={user.id} value={user.id}>
              {user.value}
            </CheckItem>
          )) || []),
        ]}
      </MultiSelect>
    </div>
  );
};

export const AuthorFilter = () => {
  const { selectedAuthor, setSelectedAuthor } = useManageCadenceList();

  return <UserFilter value={selectedAuthor} setValue={setSelectedAuthor} placeholder="Author" />;
};

export const TagFilter = () => {
  const { cadenceTags } = useCadenceTags();
  const { selectedTags, setSelectedTags } = useManageCadenceList();

  return (
    <div className={styles.authorFilter}>
      <Text size="s">Tags</Text>
      <MultiSelect
        placeholder="Any tag"
        size="small"
        onChange={value => {
          setSelectedTags(value);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_FILTER_CADENCES_BY_TAG);
        }}
        value={selectedTags || []}
      >
        {[
          <Item key="Any" value="">
            Any
          </Item>,
          ...(cadenceTags?.map(tag => (
            <CheckItem key={tag.id} value={tag.name}>
              {tag.name}
            </CheckItem>
          )) || []),
        ]}
      </MultiSelect>
    </div>
  );
};

export const StartedByFilter = ({
  startedBy,
  setStartedBy,
}: {
  startedBy: string[];
  setStartedBy: (value: string[]) => void;
}) => <UserFilter value={startedBy} setValue={setStartedBy} placeholder="Started by" />;

export const StartDateFilter = ({
  rangeFilterDate,
  setRangeFilterDate,
}: {
  rangeFilterDate: {
    type: RangeType;
    end: Date;
    start: Date;
  };
  setRangeFilterDate: (rangeDate: { type: RangeType; end: Date; start: Date }) => void;
}) => {
  return (
    <div className={styles.authorFilter}>
      <Text size="s">Start date</Text>
      <RelativeDatePicker
        width="124px"
        dataTest="relative-date-picker-element"
        value={rangeFilterDate}
        defaultValue={{ type: 'last_month' }}
        adornment={<Icon name="calendar" size={12} color="softPeanut" />}
        onChange={value => {
          setRangeFilterDate(value as DateValue);
        }}
        size="small"
      />
    </div>
  );
};
