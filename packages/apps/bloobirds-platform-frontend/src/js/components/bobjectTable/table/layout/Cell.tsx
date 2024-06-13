import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import styles from './cell.module.css';

const Cell = ({
  children,
  actions,
  dataTest,
  className,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  dataTest: string;
  className?: string;
}) => {
  let content = children;
  if (actions) {
    content = (
      <div className={styles.withActions}>
        {content}
        {actions}
      </div>
    );
  }
  return (
    <TableCell className={className || styles.root}>
      <div data-test={dataTest}>{content}</div>
    </TableCell>
  );
};

export default Cell;
