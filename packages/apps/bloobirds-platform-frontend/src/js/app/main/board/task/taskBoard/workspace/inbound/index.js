import React from 'react';
import Header from './Header';
import Content from './Content';
import { useDocumentTitle } from '../../../../../../../hooks/useDocumentTitle';
import styles from './inbound.module.css';

const Inbound = ({ history }) => {
  useDocumentTitle('Inbound');
  return (
    <div className={styles.root}>
      <Header history={history} />
      <Content />
    </div>
  );
};

export default Inbound;
