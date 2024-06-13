import React, { useEffect, useState } from 'react';

import { Button, SearchInput, SortableList } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import { EntityCard } from '../../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import { useOrdering } from '../../../../../hooks/useOrdering';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabEmptyContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { GroupCard } from '../../components/groupCard/groupCard';
import { GroupModal } from '../../components/groupModal/groupModal';
import { GROUP_COLUMNS } from '../../constants/group.constants';
import { useGroupFields } from '../../hooks/useGroupFields';
import styles from '../../styles/fieldsPage.module.css';

const GroupsTab = () => {
  const { isSmallDesktop } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [editField, setEditField] = useState();

  const { parseOrderingRequest, handleUpdateOrdering } = useOrdering();
  const { groups, handleRefresh } = useGroupFields();

  const [groupsList, setGroupsList] = useState();

  useEffect(() => {
    if (searchValue) {
      const filteredList = groups.filter(group =>
        group.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setGroupsList(filteredList);
    } else {
      setGroupsList(groups);
    }
  }, [searchValue, groups]);

  const openEditField = field => {
    setEditField(field);
    setOpen(true);
  };

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="list">Groups</AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle />
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <SearchInput
            width={200}
            placeholder="Search"
            onChange={value => setSearchValue(value)}
            color="softBloobirds"
          />
          <Button iconLeft="plus" onClick={() => setOpen(true)}>
            {!isSmallDesktop && 'Create new Group'}
          </Button>
          {open && (
            <GroupModal
              handleClose={() => {
                setOpen(false);
                setEditField(undefined);
              }}
              isCreation={!editField}
              group={editField}
              refresh={handleRefresh}
            />
          )}
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        {groupsList?.length > 0 ? (
          <>
            <AccountSettingsTableContainer>
              <EntityList>
                <>
                  <EntityListHeader>
                    <EntityHeaderItem />
                    {GROUP_COLUMNS.map(column => (
                      <EntityHeaderItem label={column?.label} key={column?.label} />
                    ))}
                  </EntityListHeader>
                  <SortableList
                    className={styles._tbody}
                    onReorder={v => {
                      setGroupsList(v);
                      const newOrdering = parseOrderingRequest({ list: v, takeIndex: true });
                      handleUpdateOrdering({
                        list: newOrdering,
                        entityName: 'bobjectFieldGroups',
                        callback: () => {
                          handleRefresh();
                        },
                      });
                    }}
                    disabled={searchValue?.length > 0}
                    data={groupsList}
                    keyExtractor={group => group?.id}
                    renderItem={({
                      item: group,
                      innerRef,
                      containerProps,
                      handleProps,
                      isDragging,
                    }) => (
                      <EntityCard
                        ref={innerRef}
                        {...containerProps}
                        {...handleProps}
                        className={classNames(styles.row, {
                          [styles._card__dragging]: isDragging,
                        })}
                      >
                        <GroupCard
                          group={group}
                          refresh={handleRefresh}
                          openEditField={openEditField}
                        />
                      </EntityCard>
                    )}
                  />
                </>
              </EntityList>
            </AccountSettingsTableContainer>
          </>
        ) : (
          <AccountSettingsTabEmptyContent>
            No Groups for the following search
          </AccountSettingsTabEmptyContent>
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default GroupsTab;
