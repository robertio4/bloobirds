import React from 'react';

import { useDocumentTitle } from "../../hooks";
import styles from './accountSettingsPage.module.css';
import Routes from './accountSettingsPages.routes';
import SideBar from './sidebar/sidebar.view';

const AccountSettingsPage = () => {
  useDocumentTitle('Account Settings');
  return (
    <div className={styles._container}>
      <SideBar />
      <div className={styles._content__container}>
        <Routes />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
