import React, { useState } from 'react';

import { Button, Tab, TabGroup } from '@bloobirds-it/flamingo-ui';
import { useCadenceV2Enabled, useRouter } from '@bloobirds-it/hooks';
import {
  APP_CADENCES_ANALYZE,
  APP_CADENCES_MANAGE,
  BobjectTypes,
  UserPermission,
} from '@bloobirds-it/types';

import { useUserSettings } from '../../components/userPermissions/hooks';
import useMediaQuery from '../../hooks/useMediaQuery';
import CadencesLayout from '../../layouts/cadencesLayout/cadencesLayout';
import NoPermissionsPage from '../noPermissionsPage';
import { AnalyzeTab } from './analyzeTab/analyzeTab';
import styles from './cadencesPage.module.css';
import { CreateEditCadenceSettings } from './components/createEditCadenceSettings/createEditCadenceSettings';
import { ManageTab } from './manageTab/manageTab';

export enum CadenceTabs {
  Manage = 'Manage',
  Analyze = 'Analyze',
}

const CadencesPageView = ({ tab }: { tab: CadenceTabs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSmallDesktop } = useMediaQuery();
  const { history, location } = useRouter();
  const settings = useUserSettings();
  const accountId = settings?.account?.id;
  const hasCadencePermission = settings?.user?.permissions?.includes(UserPermission.VIEW_CADENCES);
  const cadenceV2Enabled = useCadenceV2Enabled(accountId);

  //const urlParams = new URLSearchParams(location.search);
  const changeTab = (newTab: CadenceTabs) => {
    let route;
    //let state;
    switch (newTab) {
      case CadenceTabs.Manage:
        route = APP_CADENCES_MANAGE;
        break;
      /* Temporary hidden due to performance issues
      case CadenceTabs.Analyze:
        route = APP_CADENCES_ANALYZE;
        urlParams.delete('cadence');
        state = { search: urlParams.toString() };
        break;*/
      default:
        route = APP_CADENCES_MANAGE;
    }
    history.push({ pathname: route /*...state*/ });
  };

  if (!hasCadencePermission || !cadenceV2Enabled) {
    return <NoPermissionsPage />;
  }

  return (
    <>
      <CadencesLayout
        title="Cadences"
        leftAction={
          <Button
            dataTest="createCadence"
            iconLeft={isSmallDesktop ? 'plus' : undefined}
            color="bloobirds"
            onClick={() => setIsModalOpen(true)}
          >
            {!isSmallDesktop && 'Create cadence'}
          </Button>
        }
      >
        <div className={styles.tabGroupWrapper}>
          <TabGroup value={tab} onClick={changeTab} defaultValue="Manage">
            <Tab dataTest="cadencesManageTab" name="Manage" color="bloobirds">
              <ManageTab />
            </Tab>
            <Tab dataTest="cadencesAnalyzeTab" name="Analyze" color="bloobirds">
              <AnalyzeTab />
            </Tab>
          </TabGroup>
        </div>
      </CadencesLayout>
      {isModalOpen && (
        <CreateEditCadenceSettings
          onClose={() => setIsModalOpen(false)}
          bobjectType={BobjectTypes.Company}
        />
      )}
    </>
  );
};

export default CadencesPageView;
