import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, SearchInput, Text, Icon, countries, Flag } from '@bloobirds-it/flamingo-ui';

import { ShowDisableCheckbox } from '../../../../components/showDisableCheckbox/showDisableCheckbox';
import { TargetMarketsButton } from '../../../../components/targetMarketsButton/targetMarketsButton';
import TargetMarketsModal from '../../../../components/targetMarketsModal/targetMarketsModal';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useOpenTargetMarketModal } from '../../../../hooks/useSteppableModal';
import { useTargetMarketsModal } from '../../../../hooks/useTargetMarketsModal';
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
import styles from '../businessAssetsPage.module.css';
import { ExampleBusinessAsset } from '../exampleBusinessAsset/exampleBusinessAsset';
import { TargetMarketModal } from './targetMarketModal/targetMarketModal';
import { TargetMarketsList } from './targetMarketsList/targetMarketsList';

const TargetMarketTab = () => {
  const {
    modalOpen,
    handleCloseTargetMarketModal,
    handleOpenCreateEditModal,
    isCreation,
  } = useOpenTargetMarketModal();
  const [showExamplePage, setShowExamplePage] = useState();
  const [lenguage, setLenguage] = useState();
  const [searchValue, setSearchValue] = useState();
  const { isSmallDesktop } = useMediaQuery();
  const { isOpen: isOpenTargetMarketsModal, closeTargetMarketsModal } = useTargetMarketsModal();
  const [showDisabled, setShowDisabled] = useState(false);
  const { t } = useTranslation();

  return (
    <AccountSettingsTab>
      {!showExamplePage ? (
        <>
          <AccountSettingsTabHeader>
            <AccountSettingsTabHeaderLeft>
              <AccountSettingsTabTitle icon="company" color="purple">
                <div className={styles._business_asset_title}>
                  {t('common.targetMarket_other')}
                  <TargetMarketsButton size="small" textBefore={t('common.checkYour')} />
                </div>
              </AccountSettingsTabTitle>
              <AccountSettingsTabSubtitle>
                {t('playbook.targetMarketDefinition')}{' '}
                <span onClick={() => setShowExamplePage(true)}>
                  <Text htmlTag="span" size="xs" color="purple" className={styles._link}>
                    {t('playbook.seeSomeExamples')}
                  </Text>
                </span>
              </AccountSettingsTabSubtitle>
            </AccountSettingsTabHeaderLeft>
            <AccountSettingsTabHeaderRight>
              <ShowDisableCheckbox showDisabled={showDisabled} setShowDisabled={setShowDisabled} />
              <SearchInput
                width={200}
                placeholder={t('common.search')}
                onChange={value => setSearchValue(value)}
                color="purple"
              />
              <Button
                iconLeft="plus"
                onClick={() => handleOpenCreateEditModal({ isCreationType: true })}
                color="purple"
              >
                {!isSmallDesktop && t('playbook.newTargetMarket')}
              </Button>
            </AccountSettingsTabHeaderRight>
          </AccountSettingsTabHeader>
          <AccountSettingsTabContent>
            <AccountSettingsTableContainer>
              <TargetMarketsList
                searchValue={searchValue}
                setShowExamplePage={setShowExamplePage}
                showDisabled={showDisabled}
              />
            </AccountSettingsTableContainer>
          </AccountSettingsTabContent>
          {modalOpen && (
            <TargetMarketModal handleClose={handleCloseTargetMarketModal} isCreation={isCreation} />
          )}
          {isOpenTargetMarketsModal && (
            <TargetMarketsModal handleCloseModal={closeTargetMarketsModal} />
          )}
        </>
      ) : (
        <>
          <AccountSettingsTabHeader>
            <AccountSettingsTabHeaderLeft>
              <AccountSettingsTabTitle icon="company">
                <span className={styles._title__container}>
                  <span>{t('playbook.targetMarketsExample')}</span>
                  <span
                    className={styles._lenguage__text__container}
                    onClick={() => setLenguage('EN')}
                  >
                    <Flag code={countries.find(x => x.code === 'GB')?.code} />
                    <Text size="s" color="bloobirds" inline className={styles._lenguage__text}>
                      English example
                    </Text>
                  </span>
                  <span
                    className={styles._lenguage__text__container}
                    onClick={() => setLenguage('ES')}
                  >
                    <Flag code={countries.find(x => x.code === 'ES')?.code} />
                    <Text size="s" color="bloobirds" inline className={styles._lenguage__text}>
                      Ejemplo en español
                    </Text>
                  </span>
                </span>
              </AccountSettingsTabTitle>
            </AccountSettingsTabHeaderLeft>
            <AccountSettingsTabHeaderRight>
              <span onClick={() => setShowExamplePage(false)} className={styles._link}>
                <Icon name="cross" color="bloobirds" size={24} />
              </span>
            </AccountSettingsTabHeaderRight>
          </AccountSettingsTabHeader>
          <AccountSettingsTabContent>
            <ExampleBusinessAsset type="targetMarket_other" language={lenguage || 'EN'} />
          </AccountSettingsTabContent>
        </>
      )}
    </AccountSettingsTab>
  );
};

export default TargetMarketTab;
