import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

import { Dialer } from '@bloobirds-it/dialer';
import {
  useAircallPhoneLinkEnabled,
  useBobjectRefresh,
  useLocalStorage,
  useReminders,
  useSalesforceLeftBarEnabled,
  useSessionStorage,
  useWhatsappEnabled,
} from '@bloobirds-it/hooks';
import {
  MIXPANEL_EVENTS,
  MessagesEvents,
  LocalStorageKeys,
  SessionStorageKeys,
  SidepeekState,
} from '@bloobirds-it/types';
import {
  getExtensionBobjectByIdFields,
  getSobjectTypeFromId,
  isWhatsAppPage,
} from '@bloobirds-it/utils';
import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';
import normalizeUrl from 'normalize-url';
import { useSWRConfig } from 'swr';

import { useBubblePosition } from '../../../hooks/useBubblePosition';
import {
  useSalesforceLayerEnabled,
  useSalesforceSyncListEnabled,
} from '../../../hooks/useFeatureFlag';
import useWhatsapp from '../../../hooks/useWhatsapp';
import { Actions } from '../../../types/messages';
import { api } from '../../../utils/api';
import { moveMsgElement, moveSFDCButtonsElement } from '../../../utils/bubbleWrapper.utils';
import {
  isLinkedInProfilePage,
  isLinkedinSettingsPage,
  isSalesforceListPage,
  isSalesforcePage,
  isSalesNavigatorProfile,
  shouldInjectSalesforce,
} from '../../../utils/url';
import styles from '../app.module.css';
import { useExtensionContext } from '../context';
import FloatingIcon from '../floatingIcon/floatingIcon';
import FloatingMenu from '../floatingMenu/floatingMenu';
import { FloatingMenuProvider } from '../floatingMenu/floatingMenuContext';

export const BubbleWrapper = () => {
  const {
    useGetLoggedIn,
    useGetSettings,
    setCurrentPage,
    useGetCurrentPage,
    setActiveBobject,
    useGetActiveBobject,
    updateActiveBobject,
    setExtendedContext,
    launchBobjectSideEffects,
    useGetSidePeekEnabled,
    setCustomPage,
    refreshActiveBobjectContext,
    setContactViewBobjectId,
    setForcedActiveSubTab,
    setNoMatchFound,
    useGetActiveBobjectContext,
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn();
  const { get, set } = useLocalStorage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(
    window.location.href.includes('bb-open') || get(LocalStorageKeys.IsMenuOpen),
  );
  useReminders({ setViewBobjectId: setContactViewBobjectId });
  const [dragging, setDragging] = useState(false);
  const sidePeekEnabled = useGetSidePeekEnabled();
  const url = normalizeUrl(window.location.href);
  const { position, bounds, setPosition, width } = useBubblePosition();
  const [shownInCurrentPage, setShownInCurrentPage] = useState<boolean>(false);
  const settings = useGetSettings();
  const activeBobjectContext = useGetActiveBobjectContext();
  const isSalesforceEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);
  const currentPage = useGetCurrentPage();
  const activeBobject = useGetActiveBobject();
  const isSalesforceLayerActive = useSalesforceLayerEnabled();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const hasWhatsappEnabled = useWhatsappEnabled(settings?.account?.id);

  const { remove } = useSessionStorage();
  const isSalesforceList = isSalesforceListPage(currentPage);
  const isSalesforceSyncListEnabled = useSalesforceSyncListEnabled();
  const syncBBButtonsRendered = isSalesforceSyncListEnabled && isSalesforceList;

  // We need to move messages element to the right when side peek is open
  useWhatsapp(
    isMenuOpen,
    sidePeekEnabled,
    !!document.getElementById('vepaar-app'),
    hasWhatsappEnabled,
  );

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    set('sidepeekState', SidepeekState.UserMinimized);
  };

  const updateBobject = async () => {
    // Refresh only the active bobject
    const newBobject = await getExtensionBobjectByIdFields(activeBobject?.id);
    if (newBobject?.data) updateActiveBobject(newBobject.data);
  };

  useBobjectRefresh(activeBobject?.id?.value, activeBobject?.id?.typeName, updateBobject);

  const launchActiveBobjectSideEffects = async (e: CustomEvent) => {
    const bobjectType = e.detail?.type;

    // Launch side effects for left bar
    launchBobjectSideEffects(bobjectType);

    if (activeBobject) {
      if (bobjectType !== activeBobject?.id?.typeName) {
        refreshActiveBobjectContext();
        // Launch side effects for active bobject if not the same type
        launchBobjectSideEffects(activeBobject?.id?.typeName);
      } else {
        // Refresh active bobject
        const newBobject = await getExtensionBobjectByIdFields(activeBobject?.id);
        if (newBobject?.data) setActiveBobject(newBobject.data);
      }
    } else if (bobjectType) {
      launchBobjectSideEffects(bobjectType);
    }
  };

  useEffect(() => {
    window.addEventListener(MessagesEvents.ActiveBobjectUpdated, launchActiveBobjectSideEffects);
    return () => {
      window.removeEventListener(
        MessagesEvents.ActiveBobjectUpdated,
        launchActiveBobjectSideEffects,
      );
    };
  }, [activeBobject?.id?.value]);

  const updateSubTab = (e: CustomEvent) => {
    const subTab = e.detail?.subTab;
    if (subTab) {
      setForcedActiveSubTab(subTab);
    }
  };

  useEffect(() => {
    window.addEventListener(MessagesEvents.SubTabUpdated, updateSubTab);
    return () => {
      window.removeEventListener(MessagesEvents.SubTabUpdated, updateSubTab);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        isLinkedInProfilePage(currentPage) ||
        isSalesforcePage(currentPage) ||
        isSalesNavigatorProfile(currentPage)
      ) {
        if (get('isMenuOpen') === null) {
          setIsMenuOpen(true);
        }
      }
    }, 2000);
  }, []);

  const openExtension = async (e: CustomEvent) => {
    const bobjectId = e.detail?.bobjectId;
    const source = e.detail?.source;
    const bobjects = e.detail?.bobjects;
    const info = e.detail?.info;
    const resetAll = e.detail?.resetAll;
    const avoidRefreshBobjectFromContext = e.detail?.avoidRefreshBobjectFromContext;
    const matchesContext = activeBobjectContext?.bobjectIds?.includes(bobjectId);
    const alwaysOpen = e.detail?.alwaysOpen;
    const closeExtension = !!e.detail?.close;

    if (closeExtension) {
      setIsMenuOpen(false);
      return;
    }

    if (!shownInCurrentPage || alwaysOpen) {
      setIsMenuOpen(true);
    }
    setShownInCurrentPage(true);
    if (source && !bobjectId && Array.isArray(bobjects)) {
      setNoMatchFound({ source, bobjects, info });
    } else if (bobjectId) {
      if (avoidRefreshBobjectFromContext && matchesContext) {
        return;
      }
      setContactViewBobjectId(bobjectId);
    } else if (resetAll) {
      setContactViewBobjectId(null);
    }
  };

  useEffect(() => {
    window.addEventListener(MessagesEvents.ForceOpenExtension, openExtension);
    return () => {
      window.removeEventListener(MessagesEvents.ForceOpenExtension, openExtension);
    };
  }, [activeBobjectContext?.bobjectIds?.length]);

  useEffect(() => {
    window.addEventListener(MessagesEvents.UrlNotFound, openExtension);
    return () => {
      window.removeEventListener(MessagesEvents.UrlNotFound, openExtension);
    };
  }, []);

  useEffect(() => {
    set(LocalStorageKeys.IsMenuOpen, isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    moveMsgElement(isMenuOpen && sidePeekEnabled);
  }, [isMenuOpen, sidePeekEnabled]);

  useEffect(() => {
    moveSFDCButtonsElement(isMenuOpen && sidePeekEnabled && loggedIn, syncBBButtonsRendered);
  }, [isMenuOpen, sidePeekEnabled, loggedIn, url]);

  const setActiveBobjectFromUrl = (message: any) => {
    if (message.type === Actions.HistoryUpdate || message.message === Actions.TabUpdate) {
      const url = normalizeUrl(window.location.href);
      if (url !== currentPage) {
        setShownInCurrentPage(false);
        setTimeout(() => {
          setCurrentPage(url);
          setActiveBobject(null);
          setExtendedContext(null);
          setCustomPage(null);
        }, 250);
      }
    }
  };

  useEffect(() => {
    chrome?.runtime?.onMessage.addListener(setActiveBobjectFromUrl);
    return () => {
      chrome?.runtime?.onMessage.removeListener(setActiveBobjectFromUrl);
    };
  }, [currentPage]);

  useEffect(() => {
    remove(SessionStorageKeys.ActiveTab);
    remove(SessionStorageKeys.ActiveSubTab);
  }, [activeBobject?.id?.value]);

  const isSalesforce = isSalesforcePage(currentPage);
  if (isSalesforce && !loggedIn) {
    return null;
  }

  if (isSalesforce && !isSalesforceEnabled) {
    return null;
  }

  if (isLinkedinSettingsPage(currentPage)) {
    return null;
  }

  if (isSalesforce && !shouldInjectSalesforce(currentPage)) {
    return null;
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.dragging]: dragging,
      })}
    >
      {isSalesforceLayerActive && !hasAircallPhoneLinkEnabled && <Dialer />}

      {position && (
        <>
          <FloatingIcon
            visible={!isMenuOpen}
            onClick={() => {
              if (sidePeekEnabled) {
                mixpanel.track(MIXPANEL_EVENTS.MAXIMIZE_SIDEPEEK_VIEW);
              } else {
                mixpanel.track(MIXPANEL_EVENTS.MAXIMIZE_BUBBLE_VIEW);
              }

              setIsMenuOpen(true);
              set('sidepeekState', SidepeekState.UserMaximized);
            }}
          />

          <Draggable
            handle="#bb-handle"
            bounds={bounds}
            position={position}
            onStart={() => {
              setDragging(true);
            }}
            onStop={(e, data) => {
              setDragging(false);
              setPosition({ x: data.x, y: data.y });
            }}
          >
            <div className={styles.content}>
              {!sidePeekEnabled && (
                <FloatingMenuWrapper
                  visible={isMenuOpen}
                  dragging={dragging}
                  onClose={handleMenuClose}
                  position={position}
                  url={url}
                />
              )}
            </div>
          </Draggable>

          {sidePeekEnabled && (
            <FloatingMenuWrapper
              visible={isMenuOpen}
              dragging={false}
              onClose={handleMenuClose}
              position={position}
              width={width}
              url={url}
            />
          )}
        </>
      )}
    </div>
  );
};

const FloatingMenuWrapper = props => {
  const { position } = props;

  const {
    setActiveBobject,
    setExtendedContext,
    setIsLoading,
    useGetSalesforceSyncMutate,
    updateActiveBobject,
  } = useExtensionContext();
  const salesforceSyncMutate = useGetSalesforceSyncMutate();
  const { get } = useLocalStorage();
  const { mutate } = useSWRConfig();

  const onRefresh = async activeBobject => {
    setIsLoading(!!salesforceSyncMutate);
    if (activeBobject?.salesforceId) {
      const sobjectId = activeBobject?.salesforceId;
      const sobjectType = getSobjectTypeFromId(sobjectId);
      setIsLoading(true);
      await api.get(`/utils/service/salesforce/resync/${sobjectType}/${sobjectId}`, {});
      setIsLoading(false);
      mutate(`/utils/service/salesforce/related/${sobjectType}/${sobjectId}`);
    }
    if (isWhatsAppPage() && activeBobject) {
      updateActiveBobject(activeBobject);
    } else {
      setActiveBobject(null);
    }
    setExtendedContext(null);
    if (salesforceSyncMutate && typeof salesforceSyncMutate === 'function')
      salesforceSyncMutate().then(() => setIsLoading(false));
  };

  const initialContext = {
    isHome: false,
    onRefresh,
    history: [],
    goBack: undefined,
    showBackButton: false,
    lastVisitedBobjects: get(LocalStorageKeys.LastVisitedBobjects) || [],
    position,
    customPage: null,
    meta: null,
    isDuplicatePage: false,
  };

  return (
    <FloatingMenuProvider value={initialContext}>
      <FloatingMenu {...props} />
    </FloatingMenuProvider>
  );
};
