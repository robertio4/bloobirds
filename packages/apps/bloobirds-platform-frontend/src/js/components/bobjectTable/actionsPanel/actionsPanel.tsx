import React, { useEffect, useState } from 'react';

import { useMediaQuery } from '@bloobirds-it/hooks';

import { SaveListButtonTooltip } from '../../discoveryTooltips/saveListButtonTooltip';
import { useBobjectTable } from '../useBobjectTable';
import styles from './actionsPanel.module.css';
import DownloadButton from './downloadButton';
import RefreshButton from './refreshButton';
import ResetButton from './resetButton';
import { SaveEditButton } from './saveEditButton/saveEditButton';

export const ActionsPanel = ({
  viewType,
  viewActions,
  bobjectType,
  refreshAction,
  isLoading,
}: any) => {
  const { isSmallDesktop } = useMediaQuery();
  const { editionMode, view, isModified } = useBobjectTable();
  const [shouldContractElements, setShouldContractElements] = useState(false);
  const isChangedInbound = viewType === ('MQL' || 'SAL') && editionMode === 'EDIT';
  const showSaveButton =
    editionMode && viewActions && !isChangedInbound && (!!view.id || isModified);

  const type = viewType ? viewType : bobjectType;

  const element = document.getElementById('actionsPanel');
  const refreshShouldContract = async () => {
    if (shouldContractElements) {
      await setShouldContractElements(false);
    }
    if (element && (isSmallDesktop || element.scrollWidth > element.clientWidth)) {
      setShouldContractElements(true);
    }
  };

  // @ts-ignore
  useEffect(refreshShouldContract, [view.id, isModified, element?.offsetLeft]);

  return (
    <div id="actionsPanel" className={styles._actions_container}>
      <RefreshButton
        onClick={refreshAction}
        isLoading={isLoading}
        shouldContractElements={shouldContractElements}
      />
      <DownloadButton shouldContractElements={shouldContractElements} />
      <ResetButton shouldContractElements={shouldContractElements} />
      {showSaveButton && (
        <SaveListButtonTooltip defaultTooltipVisible>
          <SaveEditButton viewType={type} shouldContractElements={shouldContractElements} />
        </SaveListButtonTooltip>
      )}
    </div>
  );
};
