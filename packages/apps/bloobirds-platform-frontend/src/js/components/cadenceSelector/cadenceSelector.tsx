import React, { useMemo, useState } from 'react';

import { useCadences } from '@bloobirds-it/cadence';
import {
  Button,
  Checkbox,
  ColorType,
  CommandBox,
  Icon,
  IconType,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useCadenceV2Enabled } from '@bloobirds-it/hooks';
import {
  APP_CADENCES_MANAGE,
  BobjectTypes,
  cadenceEditUrlV2,
  UserPermission,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import { SearchData } from '../../../assets/svg';
import { APP_PLAYBOOK_CADENCES, cadenceEditUrl } from '../../app/_constants/routes';
import { useActiveUser } from '../../hooks';
import { useBobjectTypes } from '../../hooks/useBobjectTypes';
import { Bobject } from '../../typings/bobjects';
import styles from './cadeceSelector.module.css';

function CadenceGroupHeader({
  icon,
  title,
  color = 'softPeanut',
}: {
  icon: IconType;
  title: string;
  color?: ColorType;
}) {
  return (
    <div className={styles.headerGroup}>
      <Icon name={icon} color={color} size={14} />
      <Text inline color={color} size="xs">
        {title}
      </Text>
    </div>
  );
}

function CadenceItem({ cadence, isSelected }: { cadence: any; isSelected?: boolean }) {
  const { get } = useBobjectTypes();
  const { settings } = useActiveUserSettings();
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const isAdminUser =
    settings?.user?.roles?.includes('GLOBAL_ADMIN') ||
    settings?.user?.roles?.includes('ACCOUNT_ADMIN');
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);

  const classNames = clsx(styles.cadenceItemBox, {
    [styles.cadenceItemBox_selected]: isSelected,
  });

  const bobjectType = get(cadence?.bobjectType);

  return (
    <div className={classNames}>
      <Text size="s" color="peanut" className={styles.cadenceName}>
        {cadence.name}
      </Text>
      <div className={styles._callout_content}>
        {isSelected && hasCadencePermission && isAdminUser && (
          <Button
            variant="clear"
            size="small"
            iconLeft="eye"
            color="bloobirds"
            uppercase={false}
            className={styles.editButton}
            onClick={event => {
              window.open(
                `${
                  cadenceV2Enabled ? cadenceEditUrlV2(cadence.id) : cadenceEditUrl(cadence.id)
                }&name=${encodeURIComponent(cadence.name)}&bobjectType=${encodeURIComponent(
                  bobjectType?.name,
                )}`,
                '_blank',
              );
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            View
          </Button>
        )}
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.totalSteps}
          </Text>
          <Text color="softBloobirds" size="xs">
            Steps
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.totalDays}
          </Text>
          <Text color="softBloobirds" size="xs">
            Days
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {Math.round(cadence?.statistics?.automatedPercentage * 100 || 0)}%
          </Text>
          <Text color="softBloobirds" size="xs">
            Automated
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.activeCount}
          </Text>
          <Text color="softBloobirds" size="xs">
            Active
          </Text>
        </div>
      </div>
    </div>
  );
}

type FiltersType = {
  onlyOfficial: boolean;
  onlyMine: boolean;
  onlyNurturing: boolean;
};

type CadenceSlectorProps = {
  selectedBobject?: Bobject;
  onCadenceSelected: (c: any) => void;
  className?: string;
};

const CadenceSelector = React.forwardRef<HTMLDivElement, CadenceSlectorProps>(
  ({ selectedBobject, onCadenceSelected, className }, ref) => {
    const { settings } = useActiveUserSettings();
    const { cadences } = useCadences({
      bobjectTypeName: selectedBobject?.id?.typeName || [
        BobjectTypes.Company,
        BobjectTypes.Lead,
        BobjectTypes.Opportunity,
      ],
      accountId: settings?.account?.id,
    });
    const { activeUser } = useActiveUser();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FiltersType>({
      onlyOfficial: false,
      onlyMine: false,
      onlyNurturing: false,
    });
    const hasCadencePermission = settings?.user?.permissions?.includes(
      UserPermission.VIEW_CADENCES,
    );
    const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);

    const { filteredCadences, myCadences, teamCadences, officialCadences } = useMemo(() => {
      const filtered = cadences?.filter(filterCadences);

      function filterCadences(c: any) {
        if (!c.enabled) {
          return false;
        }

        const matchQuery =
          searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchQuery) {
          return false;
        }

        if (filters.onlyOfficial && !c.isOfficial) {
          return false;
        }

        if (filters.onlyMine && c.ownerId !== activeUser.id) {
          return false;
        }

        return !(filters.onlyNurturing && !c.isNurturingCadence);
      }

      const sortedCadences = filtered?.reduce(
        (sorted: any, cadence: any) => {
          if (cadence.isOfficial) {
            sorted.officialCadences = [...sorted.officialCadences, cadence];
          } else if (cadence.ownerId === activeUser?.id) {
            sorted.myCadences = [...sorted.myCadences, cadence];
          } else {
            sorted.teamCadences = [...sorted.teamCadences, cadence];
          }
          return sorted;
        },
        { myCadences: [], teamCadences: [], officialCadences: [] },
      );

      return {
        filteredCadences: filtered,
        ...sortedCadences,
      };
    }, [cadences, searchQuery, filters]);

    function handleSearch(query: string) {
      setSearchQuery(query);
    }

    return (
      <div>
        <CommandBox
          onSearch={handleSearch}
          ref={ref}
          {...(className ? { className: className } : {})}
        >
          <CommandBox.SearchBox>
            <CommandBox.Input className={styles.input} />
          </CommandBox.SearchBox>
          <div className={styles.filterGroup}>
            <Checkbox
              size="small"
              color="bloobirds"
              checked={filters.onlyOfficial}
              onClick={() =>
                setFilters(filters => ({ ...filters, onlyOfficial: !filters.onlyOfficial }))
              }
            >
              Show only Official
            </Checkbox>
            <Checkbox
              size="small"
              color="bloobirds"
              checked={filters.onlyMine}
              onClick={() => setFilters(filters => ({ ...filters, onlyMine: !filters.onlyMine }))}
            >
              Show only mine
            </Checkbox>
            <Checkbox
              size="small"
              color="bloobirds"
              checked={filters.onlyNurturing}
              onClick={() =>
                setFilters(filters => ({ ...filters, onlyNurturing: !filters.onlyNurturing }))
              }
            >
              Show only Nurturing Cadences
            </Checkbox>
          </div>
          {filteredCadences?.length > 0 && (
            <CommandBox.List className={styles.cadenceList}>
              {officialCadences?.length > 0 && (
                <CommandBox.Group
                  header={
                    <CadenceGroupHeader
                      icon={'bookmark'}
                      title="Official Cadences"
                      color="bloobirds"
                    />
                  }
                >
                  {officialCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem cadence={c} />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
              {myCadences?.length > 0 && (
                <CommandBox.Group
                  header={<CadenceGroupHeader icon={'cadence'} title="My Cadences" />}
                >
                  {myCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem cadence={c} />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
              {teamCadences?.length > 0 && (
                <CommandBox.Group
                  header={<CadenceGroupHeader icon={'cadence'} title="Team Cadences" />}
                >
                  {teamCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem cadence={c} />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
            </CommandBox.List>
          )}
          <CommandBox.Empty>
            <div className={styles.emptySearch}>
              <SearchData className={styles.emptySearchIcon} />
              <Text align="center" size="l">
                There are no results for your search.
              </Text>
              {hasCadencePermission && (
                <div
                  className={styles.emptySearchLink}
                  onClick={() => {
                    window.open(
                      cadenceV2Enabled ? APP_CADENCES_MANAGE : APP_PLAYBOOK_CADENCES,
                      '_blank',
                    );
                  }}
                >
                  <Text size="xs" color="bloobirds">
                    Create a new cadence
                  </Text>
                </div>
              )}
            </div>
          </CommandBox.Empty>
        </CommandBox>
      </div>
    );
  },
);

export default CadenceSelector;
