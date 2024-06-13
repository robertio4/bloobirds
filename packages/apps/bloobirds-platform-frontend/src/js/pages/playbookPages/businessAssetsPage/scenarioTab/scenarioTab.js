import React, { useState } from 'react';

import { Button, SearchInput } from '@bloobirds-it/flamingo-ui';

import { ShowDisableCheckbox } from '../../../../components/showDisableCheckbox/showDisableCheckbox';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useOpenScenarioModal } from '../../../../hooks/useSteppableModal';
import {
  AccountSettingsTab,
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTableContainer,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../../layouts/accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { ScenarioModal } from './scenarioModal/scenarioModal';
import { ScenariosList } from './scenariosList/scenariosList';
import {useTranslation} from "react-i18next";

const ScenarioTab = () => {
  const {
    handleOpenCreateEditModal,
    modalOpen,
    handleCloseTargetMarketModal,
    isCreation,
  } = useOpenScenarioModal();
  const [searchValue, setSearchValue] = useState();
  const { isSmallDesktop } = useMediaQuery();
  const [showDisabled, setShowDisabled] = useState(false);
  const { t } = useTranslation();

  return (
    <AccountSettingsTab>
      <>
        <AccountSettingsTabHeader>
          <AccountSettingsTabHeaderLeft>
            <AccountSettingsTabTitle icon="company" color="purple">
              {t('common.scenario_other')}
            </AccountSettingsTabTitle>
            <AccountSettingsTabSubtitle>
              {t('playbook.scenarioDefinition')}{' '}
            </AccountSettingsTabSubtitle>
          </AccountSettingsTabHeaderLeft>
          <AccountSettingsTabHeaderRight>
            <ShowDisableCheckbox showDisabled={showDisabled} setShowDisabled={setShowDisabled} />
            <SearchInput
              width={200}
              placeholder="Search"
              onChange={value => setSearchValue(value)}
            />
            <Button
              iconLeft="plus"
              onClick={() => handleOpenCreateEditModal({ isCreationType: true })}
              color="purple"
            >
              {!isSmallDesktop && t('playbook.newScenario')}
            </Button>
          </AccountSettingsTabHeaderRight>
        </AccountSettingsTabHeader>
        <AccountSettingsTabContent>
          <AccountSettingsTableContainer>
            <ScenariosList searchValue={searchValue} showDisabled={showDisabled} />
          </AccountSettingsTableContainer>
        </AccountSettingsTabContent>
        {modalOpen && (
          <ScenarioModal handleClose={handleCloseTargetMarketModal} isCreation={isCreation} />
        )}
      </>
    </AccountSettingsTab>
  );
};

export default ScenarioTab;
