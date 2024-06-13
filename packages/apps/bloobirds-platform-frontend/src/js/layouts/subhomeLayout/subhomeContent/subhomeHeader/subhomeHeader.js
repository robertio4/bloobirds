import React from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import { startCase } from 'lodash';
import styles from './subhomeHeader.module.css';
import { useSubhome } from '../../subhomeLayout';
import InactiveTabDiscoveryTooltip from '../../../../components/discoveryTooltips/inactiveTab';

const SubhomeHeader = ({ children = null }) => {
  return (
    <div className={styles._header} id="subhomeHeader">
      <SubhomeTitle />
      {children}
    </div>
  );
};

const SubhomeTitle = () => {
  const { selectedTab } = useSubhome();

  return (
    <div className={styles._subhome_title}>
      <Text size="l" color="softPeanut">
        {startCase(selectedTab)}
      </Text>
      {selectedTab === 'inactive' && <InactiveTabDiscoveryTooltip />}
    </div>
  );
};

export default SubhomeHeader;
