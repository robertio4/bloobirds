import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@bloobirds-it/flamingo-ui';
import { useSalesforceLeftBarEnabled } from '@bloobirds-it/hooks';
import { v4 as uuid } from 'uuid';

import { getSalesforceSobjectFromPage, isSalesforceListPage } from '../../../utils/url';
import { useExtensionContext } from '../context';
import { SyncCadencesModal } from './components/syncCadencesModal/syncCadencesModal';
import { SyncListModal } from './components/syncListModal/syncListModal';
import SyncButton from './syncButton';
import styles from './syncListButton.module.css';

const allowedSobjectTypes = ['Lead', 'Contact', 'Account', 'Opportunity'];

const createLiElement = (id, className) => {
  const syncRootElement = document.createElement('li');

  syncRootElement.setAttribute('id', id);
  syncRootElement.setAttribute('style', 'align-self: center');
  syncRootElement.setAttribute('class', className);
  return syncRootElement;
};

const SyncListButtonContainer = () => {
  const { useGetSettings, useGetLoggedIn } = useExtensionContext();
  const settings = useGetSettings();
  const isLoggedIn = useGetLoggedIn();
  const isSalesforceList = isSalesforceListPage(window.location.href);
  const [renderId, setRenderId] = useState();
  const isSalesforceEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const listReferenceElement = document.getElementsByClassName('forceActionsContainer')[0];
  const sobjectType = getSalesforceSobjectFromPage(window.location.href);
  const isSyncableSobjectType = allowedSobjectTypes.includes(sobjectType);
  const { t } = useTranslation('translation', { keyPrefix: 'extension.syncBBButtons' });

  const shouldShowButton = isLoggedIn && isSalesforceEnabled && isSyncableSobjectType;
  const syncRootElement = createLiElement(
    'bb-sync-list-li',
    // @ts-ignore
    listReferenceElement?.childNodes?.[0]?.className,
  );
  const cadenceRootElement = createLiElement(
    'bb-cadence-list-li',
    // @ts-ignore
    listReferenceElement?.childNodes?.[0]?.className,
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
    const listReferenceElement = document.getElementsByClassName('forceActionsContainer')[0];
    const hasSyncButtonsInList =
      listReferenceElement?.querySelector('li[id="bb-sync-list-li"]') &&
      listReferenceElement?.querySelector('li[id="bb-cadence-list-li"]');

    if (!hasSyncButtonsInList && listReferenceElement && isSalesforceList && shouldShowButton) {
      setRenderId(uuid());
      listReferenceElement.insertBefore(syncRootElement, listReferenceElement.firstChild);
      listReferenceElement.insertBefore(cadenceRootElement, syncRootElement);
    }
  }, [renderId, listReferenceElement, isSalesforceList]);

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

  return shouldShowButton && renderId && isSalesforceList ? (
    <>
      <SyncButton
        key={`${renderId}_cadence_button`}
        id={'bb-cadence-list-li'}
        title={<CadenceSyncTitle />}
      >
        {/* @ts-ignore */}
        <SyncCadencesModal />
      </SyncButton>
      <SyncButton key={`${renderId}_list_button`} id={'bb-sync-list-li'} title={<ListSyncTitle />}>
        {/* @ts-ignore */}
        <SyncListModal />
      </SyncButton>
    </>
  ) : null;
};

export default SyncListButtonContainer;
