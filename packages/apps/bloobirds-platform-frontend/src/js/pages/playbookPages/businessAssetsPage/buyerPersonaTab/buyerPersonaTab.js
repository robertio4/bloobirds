import React, { useState } from 'react';

import {
  Button,
  SearchInput,
  Text,
  Icon,
  countries,
  Flag,
  Checkbox,
} from '@bloobirds-it/flamingo-ui';

import { BuyerPersonasButton } from '../../../../components/buyerPersonasButton/buyerPersonasButton';
import BuyerPersonasModal from '../../../../components/buyerPersonasModal/buyerPersonasModal';
import { ShowDisableCheckbox } from '../../../../components/showDisableCheckbox/showDisableCheckbox';
import { useBuyerPersonasModal } from '../../../../hooks/useBuyerPersonasModal';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { useOpenBuyerPersonaModal } from '../../../../hooks/useSteppableModal';
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
import { BuyerPersonaModal } from './buyerPersonaModal/buyerPersonaModal';
import { BuyerPersonasList } from './buyerPersonasList/buyerPersonasList';
import {useTranslation} from "react-i18next";

const BuyerPersonaTab = () => {
  const {
    modalOpen,
    handleCloseBuyerPersonaModal,
    handleOpenCreateEditModal,
    isCreation,
  } = useOpenBuyerPersonaModal();
  const [showExamplePage, setShowExamplePage] = useState();
  const [lenguage, setLenguage] = useState();
  const [searchValue, setSearchValue] = useState();
  const { isSmallDesktop } = useMediaQuery();
  const { isOpen: isOpenBuyerPersonasModal, closeBuyerPersonasModal } = useBuyerPersonasModal();
  const [showDisabled, setShowDisabled] = useState(false);
  const { t } = useTranslation();

  return (
    <AccountSettingsTab>
      {!showExamplePage ? (
        <>
          <AccountSettingsTabHeader>
            <AccountSettingsTabHeaderLeft>
              <AccountSettingsTabTitle icon="person" color="purple">
                <div className={styles._business_asset_title}>
                  {t('common.buyerPersona_other')}
                  <BuyerPersonasButton size="small" textBefore="Check your" />
                </div>
              </AccountSettingsTabTitle>
              <AccountSettingsTabSubtitle>
                {t('playbook.buyerPersonaDefinition')}{' '}
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
                placeholder="Search"
                onChange={value => setSearchValue(value)}
              />
              <Button
                iconLeft="plus"
                onClick={() => handleOpenCreateEditModal({ isCreationType: true })}
                color="purple"
              >
                {!isSmallDesktop && t('playbook.newBuyerPersona')}
              </Button>
            </AccountSettingsTabHeaderRight>
          </AccountSettingsTabHeader>
          <AccountSettingsTabContent>
            <AccountSettingsTableContainer>
              <BuyerPersonasList
                setShowExamplePage={setShowExamplePage}
                searchValue={searchValue}
                showDisabled={showDisabled}
              />
            </AccountSettingsTableContainer>
          </AccountSettingsTabContent>
          {modalOpen && (
            <BuyerPersonaModal handleClose={handleCloseBuyerPersonaModal} isCreation={isCreation} />
          )}
          {isOpenBuyerPersonasModal && (
            <BuyerPersonasModal handleCloseModal={closeBuyerPersonasModal} />
          )}
        </>
      ) : (
        <>
          <AccountSettingsTabHeader>
            <AccountSettingsTabHeaderLeft>
              <AccountSettingsTabTitle icon="person">
                <span className={styles._title__container}>
                  <span>{t('playbook.buyerPersonaExample')}</span>
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
            <ExampleBusinessAsset type="buyerPersona_other" language={lenguage || 'EN'} />
          </AccountSettingsTabContent>
        </>
      )}
    </AccountSettingsTab>
  );
};

export default BuyerPersonaTab;
