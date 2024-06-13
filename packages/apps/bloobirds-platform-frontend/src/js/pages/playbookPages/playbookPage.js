import React from 'react';

import { useDocumentTitle } from '../../hooks';
import styles from './playbookPage.module.css';
import Routes from './playbookPage.routes';
import SideBar from './sidebar/sidebar';

const PlaybookPage = () => {
  useDocumentTitle('My Playbook');
  return (
    <div className={styles._container}>
      <SideBar />
      <div className={styles._content__container}>
        <Routes />
      </div>
    </div>
  );
};

export default PlaybookPage;
