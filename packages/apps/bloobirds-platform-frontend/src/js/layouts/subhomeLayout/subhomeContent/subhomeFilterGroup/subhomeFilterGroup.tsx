import React, { ReactElement } from 'react';
import styles from './subhomeFilterGroup.module.css';

const SubhomeFilterGroup = ({ children }: { children: ReactElement[] | ReactElement }) => (
  <div className={styles.groupContainer}>{children}</div>
);

export default SubhomeFilterGroup;
