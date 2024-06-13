import { useTranslation } from 'react-i18next';

import {
  CheckItem,
  Icon,
  MultiSelect,
  RelativeDatePicker,
  Section,
} from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { AnimatePresence, motion } from 'framer-motion';

import { useTaskFeedContext } from '../hooks/useTasksTab';
import { CustomChipGroup, Chip } from './components/customChipGroup';
import styles from './tasksTabFilters.module.css';

const DateFilter = ({ filter }) => {
  const { useTaskFeedFilterValues } = useTaskFeedContext();
  const { setDateFilterValue, dateFilterValue } = useTaskFeedFilterValues();

  return (
    <RelativeDatePicker
      width="100%"
      size="small"
      variant="filters"
      onChange={setDateFilterValue}
      value={dateFilterValue}
      placeholder={filter.fieldName || 'Date'}
      adornment={<></>}
    />
  );
};

const OwnerFilter = ({ filter }) => {
  const { useTaskFeedFilterValues } = useTaskFeedContext();
  const { setOwnerFilterValue, ownerFilterValue } = useTaskFeedFilterValues();

  return (
    <div className={styles.filter}>
      <MultiSelect
        placeholder={filter.fieldName || 'Owner'}
        width="100%"
        size={'small'}
        variant={'filters'}
        selectAllOption
        value={ownerFilterValue}
        onChange={setOwnerFilterValue}
      >
        {filter.users.map(user => (
          <CheckItem key={user.key} value={user.key}>
            {user.value}
          </CheckItem>
        ))}
      </MultiSelect>
    </div>
  );
};

const StatusFilter = ({ filter }) => {
  const { useTaskFeedFilterValues } = useTaskFeedContext();
  const { setStatusFilterValue, statusFilterValue } = useTaskFeedFilterValues();

  return (
    <div className={styles.filter}>
      <MultiSelect
        placeholder={filter.fieldName || 'Status'}
        size={'small'}
        variant={'filters'}
        selectAllOption
        value={statusFilterValue}
        width="100%"
      >
        {filter.statuses
          ? Object.keys(filter.statuses).map(status => {
              return [
                <Section key={status}>{status}</Section>,
                filter.statuses[status] &&
                  filter.statuses[status].map(item => (
                    <CheckItem
                      key={item.key}
                      value={item.key}
                      onClick={value => setStatusFilterValue({ value, section: status })}
                    >
                      {item.value}
                    </CheckItem>
                  )),
              ];
            })
          : null}
      </MultiSelect>
    </div>
  );
};

const TaskTypeFilter = ({ filter }) => {
  return (
    <div className={styles.filter}>
      <MultiSelect
        width="100%"
        placeholder={filter.fieldName || 'Task Type'}
        size={'small'}
        variant={'filters'}
        selectAllOption
      >
        <CheckItem value={'1'}>Task Type 1</CheckItem>
        <CheckItem value={'2'}>Task Type 2</CheckItem>
      </MultiSelect>
    </div>
  );
};

const StageFilter = ({ filter }) => {
  return (
    <div className={styles.filter}>
      <MultiSelect
        width="100%"
        placeholder={filter.fieldName || 'Stage'}
        size={'small'}
        variant={'filters'}
        selectAllOption
      >
        <CheckItem value={'1'}>Stage 1</CheckItem>
        <CheckItem value={'2'}>Stage 2</CheckItem>
      </MultiSelect>
    </div>
  );
};

const ObjectFilter = ({ filter }) => {
  const { useTaskFeedFilterValues } = useTaskFeedContext();
  const { setObjectFilterValue, objectFilterValue } = useTaskFeedFilterValues();
  const isB2CAccount = useIsB2CAccount();
  return (
    <div className={styles.filter}>
      <MultiSelect
        placeholder={filter.fieldName || 'Object'}
        size={'small'}
        variant={'filters'}
        selectAllOption
        value={objectFilterValue}
        width="100%"
      >
        {filter.bobjectTypes &&
          filter.bobjectTypes
            .filter(t => (isB2CAccount ? t.key !== 'Company' : true))
            .map(bobjectType => (
              <CheckItem
                key={bobjectType.value}
                value={bobjectType.value}
                onClick={value => setObjectFilterValue(value)}
              >
                {bobjectType.key}
              </CheckItem>
            ))}
      </MultiSelect>
    </div>
  );
};

const hidableClusters = ['overdueTasks', 'reminders'];

export const TasksTabFilters = ({ filtersVisible }) => {
  const {
    useTaskFeedConfiguredFilters,
    useTaskFeedFilterValues,
    useGetState,
    setVisibleClusters,
    tasks,
  } = useTaskFeedContext();
  const { t } = useTranslation();
  const filters = useTaskFeedConfiguredFilters();
  const { filterValues, setFilterValue } = useTaskFeedFilterValues();
  const sort = useGetState(state => state?.sort);
  const visibleClusters = useGetState(state => state?.visibleClusters);

  const clustersWithoutTasks =
    tasks?.clusters &&
    hidableClusters.filter(cluster => tasks.clusters[cluster].tasks.length === 0);

  return (
    <div className={styles.filters}>
      <AnimatePresence>
        {filtersVisible && (
          <motion.div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              {filters
                ?.filter(f => f)
                .map(filter => {
                  if (filter.type === 'DATE') {
                    return <DateFilter key={filter} filter={filter} />;
                  }
                  if (filter.type === 'OWNER') {
                    return <OwnerFilter key={filter} filter={filter} />;
                  }
                  if (filter.type === 'STATUS') {
                    return <StatusFilter key={filter} filter={filter} />;
                  }
                  if (filter.type === 'TASK_TYPE') {
                    return <TaskTypeFilter key={filter} filter={filter} />;
                  }
                  if (filter.type === 'STAGE') {
                    return <StageFilter key={filter} filter={filter} />;
                  }
                  if (filter.type === 'OBJECT') {
                    return <ObjectFilter key={filter} filter={filter} />;
                  }
                  return (
                    <div key={filter.field} className={styles.filter}>
                      <MultiSelect
                        width="100%"
                        placeholder={filter.fieldName}
                        value={filterValues[filter.field]?.values || []}
                        onChange={value => setFilterValue(filter.field, value)}
                        size={'small'}
                        variant={'filters'}
                        selectAllOption
                        autocomplete={filter.fieldPicklistValues?.length > 8}
                      >
                        {filter.fieldPicklistValues?.map(item => (
                          <CheckItem key={item.valueId} value={item.valueId}>
                            {item.valueName}
                          </CheckItem>
                        ))}
                      </MultiSelect>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}
        {sort?.type === 'BY_BLOOBIRDS_CLUSTERING' && (
          <CustomChipGroup
            onChange={value => {
              if (value?.length) setVisibleClusters(value);
            }}
            value={visibleClusters}
            hiddenValues={clustersWithoutTasks}
          >
            <Chip value="overdueTasks">
              <Icon name="calendar" size={14} color="tomato" />
              <span>{t('taskFeed.overdueTasks')}</span>
            </Chip>
            <Chip value="scheduledTasks">
              <Icon name="event" size={14} color="bloobirds" />
              <span>{t('taskFeed.scheduledTasks')}</span>
            </Chip>
            <Chip value="reminders">
              <Icon name="clock" size={14} color="melon" />
              <span>{t('taskFeed.reminders')}</span>
            </Chip>
            <Chip value="dailyTasks">
              <Icon name="cadence" size={14} color="grape" />
              <span>{t('taskFeed.dailyTasks')}</span>
            </Chip>
          </CustomChipGroup>
        )}
      </AnimatePresence>
    </div>
  );
};
