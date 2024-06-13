import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@bloobirds-it/flamingo-ui';
import { isDynamicsListPage, getDynamicsEntityType } from '@bloobirds-it/utils';
import { v4 as uuid } from 'uuid';

import { useExtensionContext } from '../context';
import { SyncCadencesModal } from './components/syncCadencesModal/syncCadencesModal';
import { SyncListModal } from './components/syncListModal/syncListModal';
import SyncButton from './syncButton';
import styles from './syncListButton.module.css';

const allowedSobjectTypes = ['contact', 'account', 'lead', 'opportunity'];

const createButtonElement = id => {
  const syncRootElement = document.createElement('button');

  syncRootElement.setAttribute('id', id);
  syncRootElement.setAttribute(
    'style',
    'align-self: auto; border: none; background: none; color: var(--bloobirds)',
  );
  return syncRootElement;
};

const SyncListButtonContainer = () => {
  const { useGetCurrentPage, useGetLoggedIn } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const isLoggedIn = useGetLoggedIn();
  const isDynamicsList = isDynamicsListPage(currentPage);
  const [renderId, setRenderId] = useState();
  const listReferenceElement = document.querySelector('[data-id="data-set-quickFind-container"]')
    ?.parentNode?.parentNode;
  const objectType = getDynamicsEntityType(currentPage);
  const isSyncableSobjectType = allowedSobjectTypes.includes(objectType);
  const { t } = useTranslation('translation', { keyPrefix: 'extension.syncBBButtons' });

  const shouldShowButton = isLoggedIn && isSyncableSobjectType;
  const syncRootElement = createButtonElement(
    'bb-sync-list-button',
    // @ts-ignore
    listReferenceElement?.childNodes?.[1]?.className,
  );
  const cadenceRootElement = createButtonElement(
    'bb-cadence-list-button',
    // @ts-ignore
    listReferenceElement?.childNodes?.[1]?.className,
  );

  useEffect(() => {
    function chromeTabListener(request) {
      if (request.message === 'TAB_UPDATED') {
        setRenderId(uuid());
      }
    }

    chrome?.runtime?.onMessage.addListener(chromeTabListener);
    return () => {
      chrome?.runtime?.onMessage.removeListener(chromeTabListener);
    };
  }, []);

  useEffect(() => {
    if (listReferenceElement) {
      const hasSyncButtonsInList =
        listReferenceElement?.querySelector('button[id="bb-sync-list-button"]') &&
        listReferenceElement?.querySelector('button[id="bb-cadence-list-button"]');

      if (!hasSyncButtonsInList && isDynamicsList && shouldShowButton) {
        setRenderId(uuid());
        const childNodes = listReferenceElement.childNodes;
        listReferenceElement.insertBefore(syncRootElement, childNodes[1]);
        listReferenceElement.insertBefore(cadenceRootElement, syncRootElement);
      }
    }
  }, [renderId, listReferenceElement, isDynamicsList]);

  const CadenceSyncTitle = () => (
    <>
      <Icon name="playOutline" size={14} className={styles.iconButton} /> {t('addToCadence')}
    </>
  );

  const ListSyncTitle = () => (
    <>
      {t('syncIn')} <Icon name="bloobirds" size={14} className={styles.iconButton} />
    </>
  );

  return shouldShowButton && renderId && isDynamicsList ? (
    <>
      <SyncButton
        key={`${renderId}_cadence_button`}
        id={'bb-cadence-list-button'}
        title={<CadenceSyncTitle />}
      >
        {/* @ts-ignore */}
        <SyncCadencesModal />
      </SyncButton>
      {/*<SyncButton*/}
      {/*  key={`${renderId}_list_button`}*/}
      {/*  id={'bb-sync-list-button'}*/}
      {/*  title={<ListSyncTitle />}*/}
      {/*>*/}
      {/*  /!* @ts-ignore *!/*/}
      {/*  <SyncListModal />*/}
      {/*</SyncButton>*/}
    </>
  ) : null;
};

export default SyncListButtonContainer;
