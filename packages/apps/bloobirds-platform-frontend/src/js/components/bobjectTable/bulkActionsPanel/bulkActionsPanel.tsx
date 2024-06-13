import React, { useEffect, useState } from 'react';

import { Checkbox, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectType, PluralBobjectTypes, isBobjectType } from '@bloobirds-it/types';

import { useEntity, useQueryStringState } from '../../../hooks';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { useTableContext } from '../context/bobjectTable.context';
import { addQueryParamsFromTypes } from '../context/bobjectTable.utils';
import styles from './bulkActionPanel.module.css';
import { getComponentFromId } from './bulkActions.utils';
import UpdatePropertyModal from './modals/updatePropertyModal/updatePropertyModal';
import useUpdatePropertyModal from './modals/updatePropertyModal/useUpdatePropertyModal';
import { useBulkActionsPanel } from './useBulkActionsPanel';

/**
 * @deprecated
 * Use the one in @bloobirds-it/types
 */
export type UseAllItemsType = boolean | { query: { [id: string]: any }; totalItems: number };

export const BulkActionsPanel = ({
  bobjectType,
  bulkStage,
  setRefresh,
}: {
  bobjectType: BobjectType;
  bulkStage: string;
  setRefresh: React.SetStateAction<boolean>;
}) => {
  const {
    state: { bobjects, total },
    selectFunctions: {
      selectedItems,
      setSelectedItems,
      isSelectAllChecked,
      setSelectAllCheckedState,
    },
  } = useTableContext();
  const [useEveryObject, setUseEveryObject] = useState(false);
  const { availableActions } = useBulkActionsPanel(bobjectType);
  const { isUpdatePropertyModalOpen } = useUpdatePropertyModal();
  const entityBobjectFields = useEntity('bobjectFields');

  if (!isBobjectType(bobjectType)) {
    return null;
  }

  const [stateQuery] = useQueryStringState(
    'query',
    {},
    string => (string ? JSON.parse(decodeURI(string.replace(/&/g, '##AND##'))) : string),
    q => JSON.stringify(q),
  );

  const handleSelectAll = (value: boolean) => {
    setSelectedItems(value ? bobjects : []);
    setSelectAllCheckedState(value);
    setUseEveryObject(false);
  };
  const bobjectTypeEntity = useBobjectTypes()?.findBy('name')(bobjectType);

  const allItemsQuery = addQueryParamsFromTypes(
    stateQuery,
    bobjectTypeEntity,
    entityBobjectFields,
    bulkStage,
  );

  function handleSelectAllItems() {
    setUseEveryObject(true);
    setSelectedItems(bobjects);
  }

  useEffect(() => {
    if (!isSelectAllChecked) setUseEveryObject(false);
  }, [isSelectAllChecked]);

  return (
    <>
      <div className={styles._bulk_banner_wrapper}>
        <Checkbox size="small" checked={isSelectAllChecked} onClick={handleSelectAll} />
        {availableActions?.map(action => {
          const component = getComponentFromId(action);
          if (!React.isValidElement(component)) return;
          return React.cloneElement(component, {
            bobjects: selectedItems,
            bulkStage,
            setRefresh,
            useEveryObject: useEveryObject ? { query: allItemsQuery, totalItems: total } : true,
          });
        })}
      </div>
      <div className={styles._message}>
        {selectedItems?.length < total && !useEveryObject ? (
          <>
            <Text size="s" inline>
              All <b>{selectedItems.length}</b> {PluralBobjectTypes[bobjectType].toLowerCase()} on
              this page are selected from a total of <b>{total}</b>.
            </Text>{' '}
            {isSelectAllChecked && (
              <span className={styles._link} onClick={handleSelectAllItems}>
                <Text size="s" inline color="bloobirds" htmlTag="span">
                  Continue with a maximum of {total}
                </Text>
              </span>
            )}
          </>
        ) : (
          <Text size="s" inline>
            All <b>{useEveryObject ? total : selectedItems.length}</b> items selected.
          </Text>
        )}
      </div>
      {isUpdatePropertyModalOpen && <UpdatePropertyModal />}
    </>
  );
};
