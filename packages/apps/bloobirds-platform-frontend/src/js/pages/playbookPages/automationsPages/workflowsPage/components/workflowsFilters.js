import React from 'react';
import styles from '../workflowsPage.module.css';
import { Select, Text, Item } from '@bloobirds-it/flamingo-ui';
import { useEntity } from '../../../../../hooks';
import { useWorkflow } from '../../workflowEditionPage/context/workflowsContext';
import SessionManagerFactory from '../../../../../misc/session';

export const WorkflowsFilters = () => {
  const users = useEntity('users');
  const loggedUser = SessionManagerFactory().getUser()?.id;
  const isLoggedUser = id => id === loggedUser;

  const {
    state: { listFilters },
    updateFilters,
  } = useWorkflow();

  const isChanged = listFilters !== {};

  function handleChange(field, filterValue) {
    updateFilters({ ...listFilters, [field]: filterValue });
  }

  // function handleClearFilters() {
  //   Object.keys(listFilters) &&
  //     Object.keys(listFilters).forEach(key => {
  //       listFilters[key] = undefined;
  //     });
  //   updateFilters(listFilters);
  // }

  return (
    <div className={styles.filters_container}>
      <Text htmlTag="span" size="s" color="softPeanut" className={styles.filters_title__container}>
        Filters:
      </Text>
      <div className={styles._filter__input}>
        <Select
          width="130px"
          size="small"
          placeholder="Author"
          value={listFilters?.author}
          borderless={false}
          onChange={filterValue => handleChange('author', filterValue)}
        >
          <Item key={'empty.author-filter'} value="">
            All
          </Item>
          {users?.filterBy('active', true).map(user => (
            <Item key={user?.id} value={user?.id}>
              {isLoggedUser(user?.id) ? 'Me' : user?.name}
            </Item>
          ))}
        </Select>
      </div>
      {/*<div className={styles._filter__input}>*/}
      {/*  <DateTimePicker*/}
      {/*    disabled*/}
      {/*    width="130px"*/}
      {/*    size="small"*/}
      {/*    placeholder="Creation date"*/}
      {/*    borderless={false}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={styles._filter__input}>
        <Select
          width="130px"
          size="small"
          placeholder="Status"
          borderless={false}
          value={listFilters?.isEnabled}
          onChange={filterValue => handleChange('isEnabled', filterValue)}
        >
          <Item key="All" value="">
            All
          </Item>
          <Item key="disabled" value={false}>
            Disabled
          </Item>
          <Item key="enabled" value={true}>
            Enabled
          </Item>
        </Select>
      </div>
      {/*<div className={styles._filter__input}>*/}
      {/*  <Checkbox*/}
      {/*    backgroundColor="white"*/}
      {/*    size="small"*/}
      {/*    onClick={filterValue => handleChange('unused', filterValue)}*/}
      {/*  >*/}
      {/*    <Text color="peanut" size="s">*/}
      {/*      Unused workflows*/}
      {/*    </Text>*/}
      {/*  </Checkbox>*/}
      {/*</div>*/}
    </div>
  );
};
