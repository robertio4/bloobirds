import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useIsOTOAccount } from '@bloobirds-it/hooks';
import PropTypes from 'prop-types';

import NoPermissionsPage from '../../pages/noPermissionsPage';
import styles from './subhomeLayout.module.css';

const SubhomeContext = React.createContext();

export const useSubhome = () => {
  const context = React.useContext(SubhomeContext);
  if (!context) {
    throw new Error('useSubhome must be used within a Subhome');
  }

  return context;
};

const SubhomeLayout = ({ children, name, defaultTab }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [showStats, setShowStats] = useState(true);
  const { slug } = useParams();
  const [availableTasks, setAvailableTasks] = useState([]);
  const isOTOAccount = useIsOTOAccount();

  useEffect(() => {
    if (slug && slug !== selectedTab) {
      setSelectedTab(slug);
    }
    setShowStats(true);
  }, [slug]);

  return (
    <SubhomeContext.Provider
      value={{
        availableTasks,
        setAvailableTasks,
        name,
        selectedTab,
        setSelectedTab,
        showStats,
        toggleStats: () => setShowStats(!showStats),
      }}
    >
      <div className={styles._container}>{isOTOAccount ? <NoPermissionsPage /> : children}</div>
    </SubhomeContext.Provider>
  );
};

SubhomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default SubhomeLayout;
