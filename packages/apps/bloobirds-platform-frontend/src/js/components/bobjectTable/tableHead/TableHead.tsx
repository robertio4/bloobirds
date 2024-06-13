import React from 'react';
import { useLocation } from 'react-router';

import { Checkbox, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BobjectField } from '@bloobirds-it/types';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { useEntity } from '../../../hooks';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import { withWrappers } from '../../../misc/utils';
import { useUserPermissions } from '../../userPermissions/hooks';
import { useTableContext } from '../context/bobjectTable.context';
import { useBobjectTable } from '../useBobjectTable';
import styles from './TableHead.module.css';

const directions = {
  asc: 'ASC',
  desc: 'DESC',
};
const opposite = direction => (direction === directions.asc ? directions.desc : directions.asc);

const TableCellHeader = ({ bobjectField, bobjectType }) => {
  const { setSort, setDirection, direction, sort } = useBobjectTable();

  const isSortColumn = bobjectField?.id === sort;
  const isOwnType = bobjectField?.bobjectType === bobjectType?.id;
  let columnName = bobjectField ? bobjectField?.name : '';
  const bobjectTypes = useBobjectTypes();
  const referenceFieldType = useEntity('fieldTypes').findBy('enumName')('REFERENCE');
  const isReferenceType = bobjectField?.fieldType === referenceFieldType.id;
  if (!isOwnType && bobjectTypes && bobjectField) {
    columnName = `${columnName} from ${bobjectTypes.get(bobjectField?.bobjectType)?.name}`;
  }

  const sortProperties = isOwnType
    ? {
        onClick: () => {
          const newDirection = isSortColumn ? opposite(direction) : directions.asc;
          setSort(bobjectField?.id, direction);
          setDirection(newDirection);
        },
      }
    : null;

  return (
    <TableCell {...sortProperties} className={styles._tableHeadField}>
      {isOwnType && !isReferenceType ? (
        <TableSortLabel
          direction={(isSortColumn ? direction : directions.asc).toLowerCase()}
          active={isSortColumn}
          className={styles._tableHeadFieldSort}
        >
          <span className={styles._tableHeadFieldText}>{columnName} </span>
        </TableSortLabel>
      ) : (
        <Tooltip
          title={
            isReferenceType
              ? 'Reference fields are not able to be sorted in lists'
              : 'Cross object fields are not able to be sorted in lists!'
          }
          position="top"
        >
          <span className={styles._tableHeadFieldText}>{columnName} </span>
        </Tooltip>
      )}
    </TableCell>
  );
};
const BobjectTableHead = withWrappers({ router: true })(props => {
  const isLists = useLocation()?.pathname.includes('app/cl/');
  const { bulkActions: hasBulkActionsPermission } = useUserPermissions();

  const {
    state: { bobjects },
    selectFunctions: {
      selectedItems,
      setSelectedItems,
      isSelectAllChecked,
      setSelectAllCheckedState,
    },
  } = useTableContext();

  const handleSelectAll = value => {
    setSelectedItems(value ? bobjects : []);
    setSelectAllCheckedState(!isSelectAllChecked);
  };

  const shouldShowCheckbox = isLists && hasBulkActionsPermission;

  return (
    <TableHead>
      <TableRow className={props.root}>
        {shouldShowCheckbox && (
          <TableCell className={styles._checkbox}>
            {!isSelectAllChecked && selectedItems?.length === 0 ? (
              <Checkbox checked={isSelectAllChecked} size="small" onClick={handleSelectAll} />
            ) : (
              <div />
            )}
          </TableCell>
        )}
        {props.bobjectFields?.map((bobjectField: BobjectField) => (
          <TableCellHeader bobjectField={bobjectField} key={bobjectField.id} {...props} />
        ))}
      </TableRow>
    </TableHead>
  );
});

export default BobjectTableHead;
