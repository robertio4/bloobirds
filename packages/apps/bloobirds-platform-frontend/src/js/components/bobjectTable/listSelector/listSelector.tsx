import React from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, IconButton, Item, Section, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { BobjectType, PluralBobjectTypes } from '@bloobirds-it/types';
import { useRecoilValue } from 'recoil';

import SessionManagerFactory from '../../../misc/session';
import { getPluralBobjectName } from '../../../utils/bobjects.utils';
import { listBobjectTypeAtom } from '../../header/header';
import WithTooltip from '../../withTooltip/withTooltip';
import styles from '../bobjectTable.module.css';
import { ListType, useBobjectTable } from '../useBobjectTable';
import { getViewUrl } from '../utils/bobjectTable.utils';

const SessionManager = SessionManagerFactory();

const sortAlphabeticallyByValue = (a: ListType, b: ListType) => {
  if (a?.bobjectView?.name < b?.bobjectView?.name) {
    return -1;
  }
  if (a?.bobjectView?.name > b?.bobjectView?.name) {
    return 1;
  }
  return 0;
};

const ListSelector = ({
  lists,
  entityType,
}: {
  lists: ListType[];
  entityType: BobjectType | 'Meeting';
}) => {
  const { ref: dropdownRef, visible: dropdownVisible, setVisible } = useVisible(false);
  const user = SessionManager?.getUser();
  const listBobjectType = useRecoilValue(listBobjectTypeAtom);
  const {
    forceLoadTable,
    view: { name },
  } = useBobjectTable();

  const generateListItems = (listEntities: ListType[], isEmpty: boolean) => {
    const listItems: React.ReactNode[] = [];
    if (isEmpty) listEntities = [{ bobjectView: { id: 'noLists', name: 'No lists saved yet' } }];
    listItems.push(
      listEntities?.sort(sortAlphabeticallyByValue).map(list => (
        <Item
          key={list?.bobjectView?.id}
          onClick={(value, event) => {
            event.stopPropagation();
            event.preventDefault();
            if (!isEmpty) {
              setVisible(false);
              forceLoadTable(list);
            }
          }}
          disabled={isEmpty}
          className={styles._lists_selector_item}
        >
          {!isEmpty ? (
            <Link
              to={getViewUrl(list)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '32px',
                color: 'inherit',
                textDecoration: 'inherit',
              }}
            >
              {list?.bobjectView?.name}
            </Link>
          ) : (
            <Text size="s" color="verySoftPeanut" className={styles._no_items_text}>
              {list?.bobjectView?.name}
            </Text>
          )}
        </Item>
      )),
    );

    return listItems;
  };

  const getListToShow = (lists: ListType[]) => {
    const allItem = (
      <Item value={entityType}>
        <Link
          to={getViewUrl({
            bobjectView: { viewType: listBobjectType?.toUpperCase() || entityType.toUpperCase },
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '32px',
            color: 'inherit',
            textDecoration: 'inherit',
          }}
        >
          All{' '}
          {listBobjectType
            ? listBobjectType === 'Meeting'
              ? 'Meetings'
              : PluralBobjectTypes[listBobjectType]
            : entityType}
        </Link>
      </Item>
    );

    const items: Array<object> = [allItem];
    const parsedLists: { userLists: ListType[]; publicLists: ListType[] } = {
      userLists: [],
      publicLists: [],
    };
    const sections = ['My lists', 'All lists'];

    lists?.forEach(list => {
      const isUserList = list?.bobjectView?.createdBy === user?.name;
      parsedLists[isUserList ? 'userLists' : 'publicLists'].push(list);
    });
    sections.forEach((sectionName, index) => {
      items?.push(
        <Section key={sectionName} id={sectionName}>
          {sectionName}
        </Section>,
      );
      const sectionLists = Object.values(parsedLists)[index];
      items?.push(generateListItems(sectionLists, sectionLists.length === 0));
    });

    return items;
  };

  return (
    <div className={styles._lists_selector}>
      <Dropdown
        ref={dropdownRef}
        width="100%"
        visible={dropdownVisible}
        style={{ height: '242px', overflow: 'scroll', marginLeft: '72px', marginTop: '8px' }}
        arrow={false}
        anchor={
          <div
            onClick={event => {
              event.stopPropagation();
              setVisible(!dropdownVisible);
            }}
          >
            <WithTooltip isDisabled={name?.length > 35} title={name}>
              <Text
                htmlTag="h2"
                size="l"
                weight={'bold'}
                ellipsis={35}
                inline
                className={styles._list_name}
              >
                {name || getPluralBobjectName(entityType, 2)}
              </Text>
            </WithTooltip>
            <IconButton name="chevronDown" size={20} color="peanut" />
          </div>
        }
      >
        {getListToShow(lists)}
      </Dropdown>
    </div>
  );
};

export default ListSelector;
