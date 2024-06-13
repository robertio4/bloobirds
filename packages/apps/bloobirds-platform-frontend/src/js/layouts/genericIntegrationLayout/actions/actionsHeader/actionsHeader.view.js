import React from 'react';

import { Select, Item, Button } from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';

import {
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import styles from './actionsHeader.module.css';

const ActionsHeaderView = ({
  filters,
  onFilterChange,
  bobjectTypes,
  setShowActionModal,
  integrationName,
}) => {
  const bloobirdsTriggers = [
    { value: 'CREATE', label: 'Created' },
    { value: 'UPDATE', label: 'Updated' },
    { value: 'DELETE', label: 'Deleted' },
  ];
  const actions = [
    { value: 'UPSERT', label: 'Upsert' },
    { value: 'DELETE', label: 'Deleted' },
  ];

  return (
    <>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="zap">Actions</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            Here you can configure the actions and the triggers of your {integrationName}{' '}
            integration
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <Button iconLeft="addCircle" onClick={() => setShowActionModal(true)}>
            Configure a new action
          </Button>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <div className={styles._sync_logs_table}>
        <div className={styles._sync_logs_table_filters}>
          <div className={styles._sync_logs_object_filter}>
            <Select
              size="small"
              placeholder="Object type"
              borderless={false}
              width="108px"
              value={filters?.bobjectType}
              onChange={value => onFilterChange('bobjectType', value)}
            >
              <Item key="all" value="">
                <em>All</em>
              </Item>
              {bobjectTypes &&
                bobjectTypes.map(bobjectTypeItem => (
                  <Item key={bobjectTypeItem?.id} value={bobjectTypeItem?.name.toUpperCase()}>
                    {bobjectTypeItem?.name}
                  </Item>
                ))}
            </Select>
          </div>
          <div className={styles._sync_logs_separator} />
          <div className={styles._sync_logs_object_filter}>
            <Select
              size="small"
              placeholder="Trigger type"
              borderless={false}
              width="108px"
              value={filters?.bloobirdsTrigger}
              onChange={value => onFilterChange('bloobirdsTrigger', value)}
            >
              <Item key={'all'} value={''}>
                <em>All</em>
              </Item>
              {bloobirdsTriggers?.map(action => (
                <Item key={action} value={action?.value}>
                  {action?.label}
                </Item>
              ))}
            </Select>
          </div>
          <div className={styles._sync_logs_object_filter}>
            <Select
              size="small"
              placeholder="Action type"
              borderless={false}
              width="108px"
              value={filters?.genericAction}
              onChange={value => onFilterChange('genericAction', value)}
            >
              <Item key="all" value="">
                <em>All</em>
              </Item>
              {actions?.map(action => (
                <Item key={action} value={action?.value}>
                  {action?.label}
                </Item>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

ActionsHeaderView.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func,
};
export default ActionsHeaderView;
