import React from 'react';
import { Skeleton, TableCell, TableRow } from '@bloobirds-it/flamingo-ui';
import styles from './manageProductsModal.module.css';

const SkeletonTableRow = () => (
  <TableRow>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={68} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={70} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={46} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={42} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={69} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={65} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={100} height={25} />
    </TableCell>
    <TableCell className={styles.cell}>
      <Skeleton variant="text" width={24} height={25} />
    </TableCell>
  </TableRow>
);

export default SkeletonTableRow;
