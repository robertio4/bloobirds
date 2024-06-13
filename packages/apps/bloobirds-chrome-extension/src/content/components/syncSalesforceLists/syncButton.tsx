import { useEffect, useRef, useState, cloneElement } from 'react';
import ReactDOM from 'react-dom';

import { useSalesforceSyncListEnabled } from '../../../hooks/useFeatureFlag';
import { isSalesforceListPage } from '../../../utils/url';
import { useSalesforceListSelection } from './useSalesforceListSelection';

function checkButtonRenderable(
  ref: React.MutableRefObject<HTMLDivElement | undefined>,
  setRefReady: (value: ((prevState: boolean) => boolean) | boolean) => void,
) {
  setTimeout(() => {
    if (!ref.current && document.getElementById('bb-sync-cadences-li')) {
      setRefReady(true);
    } else {
      checkButtonRenderable(ref, setRefReady);
    }
  }, 500);
}

const SyncButton = ({ id, title, children }) => {
  const isSalesforceList = isSalesforceListPage(window.location.href);
  const isSalesforceSyncListEnabled = useSalesforceSyncListEnabled();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, setRefReady] = useState<boolean>(false);

  const { selectedSalesforceIds } = useSalesforceListSelection();

  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get('filterName');
  const isRecentList = listId === 'Recent';

  const ref = useRef<HTMLDivElement>();
  ref.current = document.getElementById(id) as HTMLDivElement;

  useEffect(() => {
    checkButtonRenderable(ref, setRefReady);
  }, []);

  if (isSalesforceList && ref.current && isSalesforceSyncListEnabled) {
    return ReactDOM.createPortal(
      <a>
        <div onClick={() => setModalOpen(true)}>{title}</div>
        {modalOpen &&
          cloneElement(children, {
            onClose: () => setModalOpen(false),
            salesforceIds: selectedSalesforceIds,
            isRecentList,
          })}
      </a>,
      document.getElementById(id),
    );
  } else return null;
};

export default SyncButton;
