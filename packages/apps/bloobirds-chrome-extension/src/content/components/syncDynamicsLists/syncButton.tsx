import { useEffect, useRef, useState, cloneElement } from 'react';
import ReactDOM from 'react-dom';

import { isDynamicsListPage } from '@bloobirds-it/utils';

import { useExtensionContext } from '../context';
import styles from './syncListButton.module.css';

function checkButtonRenderable(
  ref: React.MutableRefObject<HTMLDivElement | undefined>,
  setRefReady: (value: ((prevState: boolean) => boolean) | boolean) => void,
) {
  setTimeout(() => {
    if (!ref.current && document.getElementById('bb-sync-cadences-button')) {
      setRefReady(true);
    } else {
      checkButtonRenderable(ref, setRefReady);
    }
  }, 500);
}

const SyncButton = ({ id, title, children }) => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const isDynamicsList = isDynamicsListPage(currentPage);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, setRefReady] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>();
  ref.current = document.getElementById(id) as HTMLDivElement;

  useEffect(() => {
    checkButtonRenderable(ref, setRefReady);
  }, []);

  if (isDynamicsList && ref.current) {
    return ReactDOM.createPortal(
      <a>
        <div onClick={() => setModalOpen(true)} className={styles.syncButton}>
          {title}
        </div>
        {modalOpen &&
          cloneElement(children, {
            onClose: () => setModalOpen(false),
          })}
      </a>,
      document.getElementById(id),
    );
  } else return null;
};

export default SyncButton;
