import { Table, TableBody, TableCell, TableHead } from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';
import React from 'react';
import CodeBlockModal from '../codeBlockModal/codeBlockModal';

const LogsTable = ({ syncLogs, crm }) => (
  <Table>
    <TableHead>
      <TableCell>datetime</TableCell>
      <TableCell>Bloobirds Id</TableCell>
      <TableCell>Object</TableCell>
      <TableCell>Action</TableCell>
      <TableCell>Sync Direction</TableCell>
      <TableCell>Status</TableCell>
    </TableHead>
    <TableBody>
      {syncLogs.map((log, index) => (
        <CodeBlockModal key={`log-${index}`} data={log} crm={crm} />
      ))}
    </TableBody>
  </Table>
);
export default LogsTable;

LogsTable.propTypes = {
  syncLogs: PropTypes.array,
};
