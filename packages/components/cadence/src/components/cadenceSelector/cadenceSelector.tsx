import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import { Bobject, BobjectType, UserPermission, UserRole } from '@bloobirds-it/types';
import clsx from 'clsx';
import isArray from 'lodash/isArray';

import { useCadences } from '../../hooks/useCadences';
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

function CadenceItem({
  cadence,
  isSelected,
  bobjectTypeName,
}: {
  cadence: any;
  isSelected?: boolean;
  bobjectTypeName: BobjectType;
}) {
  const classNames = clsx(styles.cadenceItemBox, {
    [styles.cadenceItemBox_selected]: isSelected,
  });
  const { settings } = useActiveUserSettings();
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceSelector' });
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
  const userRoles = settings?.user?.roles;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);

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
                `https://app.bloobirds.com/app/${
                  cadenceV2Enabled ? 'cadences' : 'playbook/cadences'
                }/edit?cadence=${encodeURIComponent(cadence?.id)}&name=${encodeURIComponent(
                  cadence.name,
                )}&bobjectType=${encodeURIComponent(bobjectTypeName)}`,
                '_blank',
              );
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {t('view')}
          </Button>
        )}
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.totalSteps}
          </Text>
          <Text color="softBloobirds" size="xs">
            {t('steps')}
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.totalDays}
          </Text>
          <Text color="softBloobirds" size="xs">
            {t('days')}
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {Math.round(cadence?.statistics?.automatedPercentage * 100 || 0)}%
          </Text>
          <Text color="softBloobirds" size="xs">
            {t('automated')}
          </Text>
        </div>
        <div className={styles._callout_block}>
          <Text weight="bold" size="s" color="softBloobirds">
            {cadence?.statistics?.activeCount}
          </Text>
          <Text color="softBloobirds" size="xs">
            {t('active')}
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
  selectedBobject: Bobject | BobjectType[];
  onCadenceSelected: (c: any) => void;
  className?: string;
  userId: string;
};

export const CadenceSelector = React.forwardRef<HTMLDivElement, CadenceSlectorProps>(
  ({ selectedBobject, onCadenceSelected, className, userId }, ref) => {
    const { settings } = useActiveUserSettings();
    const { t } = useTranslation('translation', { keyPrefix: 'cadence.cadenceSelector' });
    const { cadences } = useCadences({
      bobjectTypeName: (isArray(selectedBobject)
        ? selectedBobject
        : selectedBobject?.id?.typeName) as BobjectType,
      accountId: isArray(selectedBobject) ? settings?.account?.id : selectedBobject?.id?.accountId,
      includeDeleted: true,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FiltersType>({
      onlyOfficial: false,
      onlyMine: false,
      onlyNurturing: false,
    });
    const cadenceV2Enabled = useCadenceV2Enabled(settings?.account?.id);
    const hasCadencePermission = settings?.user?.permissions?.includes(
      UserPermission.VIEW_CADENCES,
    );
    const { filteredCadences, myCadences, teamCadences, officialCadences } = useMemo(() => {
      const filtered = cadences?.filter(filterCadences);

      function filterCadences(c: any) {
        if (!c.enabled) {
          return false;
        }

        if (c.name.includes('(Deleted)')) {
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

        if (filters.onlyMine && c.ownerId !== userId) {
          return false;
        }

        return !(filters.onlyNurturing && !c.isNurturingCadence);
      }

      const sortedCadences = filtered?.reduce(
        (sorted: any, cadence: any) => {
          if (cadence.isOfficial) {
            sorted.officialCadences = [...sorted.officialCadences, cadence];
          } else if (cadence.ownerId === userId) {
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
              {t('showOnlyOfficial')}
            </Checkbox>
            <Checkbox
              size="small"
              color="bloobirds"
              checked={filters.onlyMine}
              onClick={() => setFilters(filters => ({ ...filters, onlyMine: !filters.onlyMine }))}
            >
              {t('showOnlyMine')}
            </Checkbox>
            <Checkbox
              size="small"
              color="bloobirds"
              checked={filters.onlyNurturing}
              onClick={() =>
                setFilters(filters => ({ ...filters, onlyNurturing: !filters.onlyNurturing }))
              }
            >
              {t('showOnlyNurturing')}
            </Checkbox>
          </div>
          {filteredCadences?.length > 0 && (
            <CommandBox.List className={styles.cadenceList}>
              {officialCadences?.length > 0 && (
                <CommandBox.Group
                  header={
                    <CadenceGroupHeader
                      icon={'bookmark'}
                      title={t('officialCadences')}
                      color="bloobirds"
                    />
                  }
                >
                  {officialCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem
                          cadence={c}
                          //TODO: Careful with this
                          bobjectTypeName={
                            isArray(selectedBobject)
                              ? selectedBobject[0]
                              : selectedBobject?.id?.typeName
                          }
                        />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
              {myCadences?.length > 0 && (
                <CommandBox.Group
                  header={<CadenceGroupHeader icon={'cadence'} title={t('myCadences')} />}
                >
                  {myCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem
                          cadence={c}
                          //TODO: Careful with this
                          bobjectTypeName={
                            isArray(selectedBobject)
                              ? selectedBobject[0]
                              : selectedBobject?.id?.typeName
                          }
                        />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
              {teamCadences?.length > 0 && (
                <CommandBox.Group
                  header={<CadenceGroupHeader icon={'cadence'} title={t('teamCadences')} />}
                >
                  {teamCadences?.map((c: { id: React.Key }) => {
                    return (
                      <CommandBox.Item key={c.id} action={() => onCadenceSelected(c)}>
                        <CadenceItem
                          cadence={c}
                          //TODO: Careful with this
                          bobjectTypeName={
                            isArray(selectedBobject)
                              ? selectedBobject[0]
                              : selectedBobject?.id?.typeName
                          }
                        />
                      </CommandBox.Item>
                    );
                  })}
                </CommandBox.Group>
              )}
            </CommandBox.List>
          )}
          <CommandBox.Empty>
            <div className={styles.emptySearch}>
              <Text align="center" size="l">
                {t('noResults')}
              </Text>
              {hasCadencePermission && (
                <div
                  className={styles.emptySearchLink}
                  onClick={() => {
                    window.open(
                      `https://app.bloobirds.com/app/${
                        cadenceV2Enabled ? 'cadences' : 'playbook/cadences'
                      }`,
                      '_blank',
                    );
                  }}
                >
                  <Text size="xs" color="bloobirds">
                    {t('createNewCadence')}
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
