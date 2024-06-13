import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEvent } from 'react-use';

import { IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useSalesforceLeftBarEnabled, useSessionStorage } from '@bloobirds-it/hooks';
import { MessagesEvents, SalesforceTabs, SessionStorageKeys } from '@bloobirds-it/types';
import { isLoggedIn, isElementLoaded } from '@bloobirds-it/utils';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { useExtensionContext } from '../context';
import Tabs, { LeftBarFooter } from './components/tabs';
import ExtensionLeftBarContent from './components/views/views';
import styles from './extensionLeftBar.module.css';
import { getSelector, getStyle, setPadding } from './extensionLeftBar.utils';
import { useExtensionLeftBarContext } from './extensionLeftBarContext';

export default function ExtensionLeftBar({ url }) {
  const { useGetLoggedIn, useGetSettings, useGetDataModel } = useExtensionContext();
  const { t } = useTranslation();
  const loggedIn = useGetLoggedIn();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const [open, setOpen] = useState<boolean>(true);
  const [dimensions, setDimensions] = useState(getStyle(url, true, open));
  const mainContent = document.getElementById('content-main');
  const minimizableModalsContainer = document.querySelector('div.oneUtilityBarContainer');
  const { setIsCollapsedLeftBar, setCurrentTab, currentTab } = useExtensionLeftBarContext();
  const { set, get } = useSessionStorage();
  const [openTab, setOpenTab] = useState<boolean>(false);
  const isSalesforceLeftBarEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const menuBtnRef = useRef(null);

  const observer = new MutationObserver(() => {
    setPadding(open, window.location.href);
  });

  const config = {
    childList: true,
    subtree: true,
  };

  const openLeftBar = async (e: CustomEvent) => {
    const tabSelected = e.detail?.tab;
    setCurrentTab(tabSelected || SalesforceTabs.TASKS);
    setOpenTab(true);
    setOpen(true);
  };

  useEffect(() => {
    if (mainContent) {
      observer.observe(mainContent, config);
    } else if (minimizableModalsContainer) {
      observer.observe(minimizableModalsContainer, config);
    } else {
      observer.disconnect();
    }
    return () => observer.disconnect();
  }, [mainContent, minimizableModalsContainer, url]);

  useEffect(() => {
    setCurrentTab(get(SessionStorageKeys.CurrentTab) || '');
    setOpen(get(SessionStorageKeys.BarStatus) !== 'closed');
    window.addEventListener(MessagesEvents.OpenLeftBarTab, openLeftBar);
    return () => window.removeEventListener(MessagesEvents.OpenLeftBarTab, openLeftBar);
  }, []);

  const isLogged = useCallback(() => {
    isLoggedIn().then(isLogged => {
      const selector = getSelector(url);
      isElementLoaded(selector).then(() => {
        if (isSalesforceLeftBarEnabled) {
          setPadding(isLogged && get(SessionStorageKeys.BarStatus) !== 'closed', url);
        }
      });
    });
  }, [isSalesforceLeftBarEnabled]);

  useEffect(() => {
    isLogged();
    window.addEventListener(MessagesEvents.UserLoggedIn, () => {
      isLogged();
    });

    window.addEventListener(MessagesEvents.UserLoggedOut, () => {
      isLogged();
    });
  }, [isSalesforceLeftBarEnabled]);

  useEffect(() => {
    if (loggedIn && isSalesforceLeftBarEnabled) {
      setPadding(open, url);
      setIsCollapsedLeftBar(!open);
    }
  }, [open, loggedIn]);

  useEffect(() => {
    set(SessionStorageKeys.BarStatus, open ? 'open' : 'closed');
    set(SessionStorageKeys.CurrentTab, currentTab || '');
  }, [open, currentTab]);

  useEffect(() => {
    if (currentTab && currentTab !== SalesforceTabs.TOOLTIP) {
      setOpenTab(true);
    } else {
      setOpenTab(false);
    }
  }, [currentTab]);

  useEvent('resize', () => {
    setDimensions(getStyle(url, true, open));
  });

  const onToggle = () => {
    if (openTab) {
      setCurrentTab(null);
    } else {
      setOpen(!open);
    }
  };

  const leftBarStyles = classNames(styles.leftBar, { [styles.leftBarCollapsed]: !open });
  const buttonContainerStyles = classNames(styles.buttonContainer, {
    [styles.buttonContainerCollapsed]: !open,
    [styles.buttonContainerInContent]: open && openTab,
    [styles.buttonWithoutHeader]: dimensions?.top === 0,
  });

  if (loggedIn && isSalesforceLeftBarEnabled && dataModel) {
    return (
      <div
        className={styles.root}
        onMouseOver={() => (menuBtnRef.current.style.display = 'flex')}
        onMouseOut={() => (menuBtnRef.current.style.display = 'none')}
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <div
          className={leftBarStyles}
          style={{ ...dimensions, zIndex: (dimensions?.zIndex || 1) + 1 }}
        >
          <div className={buttonContainerStyles} ref={menuBtnRef} style={{ display: 'none' }}>
            <Tooltip title={t(`common.${[open ? 'collapse' : 'expand']}`)} position="right">
              <IconButton
                className={styles.button}
                name={open ? 'chevronLeft' : 'chevronRight'}
                onClick={() => onToggle()}
                size={10}
                color="bloobirds"
              />
            </Tooltip>
          </div>

          {open && (
            <motion.div
              initial={{ width: '0px' }}
              animate={{ width: '56px', height: '100%' }}
              transition={{
                duration: 0.5,
              }}
            >
              <div className={styles.leftBar_wrapper}>
                <Tabs />
                <LeftBarFooter />
              </div>
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {openTab && <ExtensionLeftBarContent dimensions={dimensions} />}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
