import { Table, TableBody, TableCell, TableHead, Button, Icon } from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import styles from '../../businessAssetsPage.module.css';
import { useDependenciesActions } from '../../../../../hooks/useDependencies';
import { SegmentationRow } from './segmentationRow/segmentationRow';

export const SegmentationTable = ({ parentField, modalInfo, dependencies }) => {
  const [createRow, setCreateRow] = useState(true);
  const { handleSaveDependency, removeDependency } = useDependenciesActions();
  const handleCloseRow = () => {
    setCreateRow(false);
  };

  return (
    <>
      <Table className={styles.__table_row__container}>
        <TableHead>
          <TableCell width="170px">The field</TableCell>
          <TableCell width="150px">will display...</TableCell>
          <TableCell width="150px" />
        </TableHead>
        <TableBody>
          {dependencies?.length > 0 &&
            dependencies.map((condition, index) => (
              <SegmentationRow
                key={`condition-${condition}-${index}`}
                condition={condition}
                isEdition
                removeDependency={removeDependency}
              />
            ))}
          {createRow && (
            <SegmentationRow
              isCreation={createRow}
              setIsCreation={setCreateRow}
              saveDependency={handleSaveDependency}
              handleCloseRow={handleCloseRow}
              removeDependency={removeDependency}
              parentField={parentField}
              modalInfo={modalInfo}
            />
          )}
        </TableBody>
      </Table>
      <Button
        onClick={() => setCreateRow(true)}
        disabled={createRow}
        variant="clear"
        {...(!createRow ? { color: 'purple' } : {})}
      >
        <Icon color={createRow ? 'softPeanut' : 'purple'} size={16} name="plus" />
        Add new segmentation
      </Button>
    </>
  );
};
