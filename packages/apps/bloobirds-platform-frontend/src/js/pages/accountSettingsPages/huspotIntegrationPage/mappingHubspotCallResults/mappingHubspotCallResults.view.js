import React from 'react';
import { Table, Text, Icon, TableCell, TableHead, TableBody } from '@bloobirds-it/flamingo-ui';
import styles from './mappingHubpotCallResults.css';

const MappingHubspotCallResultsView = ({ titleColumns, descending, handleSorting, row }) => {
  const icon = descending ? 'arrowDown' : 'arrowUp';

  return (
    <div>
      <Table>
        <TableHead>
          <TableCell onClick={() => handleSorting(!descending)}>
            <div className={styles._cell_header}>
              <Text size="xs" uppercase>
                {titleColumns[0]}
              </Text>
              <Icon name={icon} size="16" color="peanut" />
            </div>
          </TableCell>
          <TableCell>
            <Text size="xs" uppercase>
              {titleColumns[1]}
            </Text>
          </TableCell>
        </TableHead>
        <TableBody>{row}</TableBody>
      </Table>
    </div>
  );
};
export default MappingHubspotCallResultsView;
