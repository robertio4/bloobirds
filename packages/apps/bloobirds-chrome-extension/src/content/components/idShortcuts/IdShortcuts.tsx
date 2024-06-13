import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Icon, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useAllowBLinksInCRM,
  useDebouncedCallback,
  useIsB2CAccount,
  useIsPersonAccountAsAccount,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  Bobject,
  BobjectId,
  LocalStorageKeys,
  MessagesEvents,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import {
  api,
  getSobjectTypeFromId,
  getTextFromLogicRole,
  injectReferencedBobjects,
  isSalesforcePage,
  isSyncableSobject,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import normalizeUrl from 'normalize-url';
import { v4 as uuid } from 'uuid';

import { ExtendedContextTypes } from '../../../types/extendedContext';
import { getReferencedBobject } from '../../../utils/bobjects.utils';
import { useExtensionContext } from '../context';
import styles from './idShortcuts.module.css';
import {
  extractRecordIdElements,
  generateBBLink,
  generateCurrentPage,
  getShouldProcessMutations,
} from './idShortcuts.utils';

function ButtonsRenderer() {
  const [listOfPortalElements, setListOfPortalElements] = useState([]);
  const openedRecordId = useRef(null);
  const openCurrentPageRef = useRef(null);
  const [iframe, setIframe] = useState(null);
  const isDynamics = !!document.location.href.match('^.*://.*.crm4.dynamics.com.*');

  const {
    setCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setCustomPage,
    useGetCurrentPage,
    useGetActiveBobject,
    addBobjectToHistory,
    setContactViewBobjectId,
    closeExtendedScreen,
    useGetSettings,
  } = useExtensionContext();

  const { createToast } = useToasts();

  const currentPage = useGetCurrentPage();
  const settings = useGetSettings();

  const activeBobject = useGetActiveBobject();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const shouldShowAccounts = !isB2CAccount || isPersonAccountAsAccount;
  const { t } = useTranslation();

  const debouncedExtractNodes = useDebouncedCallback(
    () => {
      if (isB2CAccount !== null && isPersonAccountAsAccount != null) {
        extractRecordIdElements(
          document.body,
          insertBloobirdsLink,
          shouldShowAccounts,
          insertActivityBloobirdsLink,
        );
      }
    },
    250,
    [isB2CAccount, isPersonAccountAsAccount, settings],
  );

  const debouncedExtractIframeNodes = useDebouncedCallback(
    () => {
      if (iframe) {
        const iframeDocument = iframe.contentDocument;
        if (iframeDocument) {
          extractRecordIdElements(
            iframeDocument.body,
            insertBloobirdsLink,
            shouldShowAccounts,
            insertActivityBloobirdsLink,
          );
        }
      }
    },
    250,
    [isB2CAccount, isPersonAccountAsAccount, iframe],
  );

  function processBs(mutationsList) {
    const shouldProcessMutations = getShouldProcessMutations(mutationsList);
    if (shouldProcessMutations) {
      debouncedExtractNodes();
    }
  }

  function processReportsBs(mutationsList) {
    const shouldProcessMutations = getShouldProcessMutations(mutationsList);
    if (shouldProcessMutations) {
      debouncedExtractIframeNodes();
    }
  }

  const debouncedProcessBs = useDebouncedCallback(
    mutationsList => {
      processBs(mutationsList);
    },
    1000,
    [],
  );

  const debouncedProcessReportsBs = useDebouncedCallback(
    mutationsList => {
      processReportsBs(mutationsList);
    },
    1000,
    [],
  );

  const mutationObserver = useMemo(() => {
    const observer = new MutationObserver(mutationsList => {
      // Schedule the callback to be run when the browser is idle
      debouncedProcessBs(mutationsList);
    });

    return observer;
  }, []);

  const mutationObserverReports = useMemo(() => {
    return new MutationObserver(mutationsList => {
      debouncedProcessReportsBs(mutationsList);
    });
  }, [iframe]);

  useEffect(() => {
    mutationObserver.observe(document.querySelector('div.active') || document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
      mutationObserverReports.observe(iframe.contentDocument?.body, {
        childList: true,
        subtree: true,
      });
    }
    return () => {
      mutationObserverReports.disconnect();
    };
  }, [iframe]);

  function updateCurrentPage(recordid, href) {
    let newPage;
    if (isDynamics) {
      newPage = href;
      if (!newPage) {
        const dynamicsUrl = new URL(document.location.href);
        const resource = dynamicsUrl.origin;
        const urlSearchParams = new URLSearchParams(window.location.search);
        const bobjectDynamicsType = urlSearchParams?.get('etn');
        const appId = urlSearchParams?.get('appid');
        newPage = `${resource}/main.aspx?appid=${appId}&etn=${bobjectDynamicsType}&pagetype=entityrecord&id=${recordid}`;
      }
    } else {
      newPage = generateCurrentPage(recordid, getSobjectTypeFromId(recordid));
    }
    const isMenuOpen = localStorage.getItem(LocalStorageKeys.IsMenuOpen);

    if (
      !recordid ||
      (isMenuOpen === 'true' && (openedRecordId.current === recordid || currentPage === newPage)) ||
      (!isSyncableSobject(recordid) && !isDynamics)
    ) {
      return;
    }
    openedRecordId.current = recordid;
    if (activeBobject) {
      addBobjectToHistory(activeBobject);
    }

    setCurrentPage(newPage);
    setExtendedContext(null);
    setCustomPage(null);
    setActiveBobject(null);

    // Send event MessagesEvents.ForceOpenExtension
    const event = new CustomEvent(MessagesEvents.ForceOpenExtension, {
      detail: { alwaysOpen: true },
    });
    window.dispatchEvent(event);
  }

  openCurrentPageRef.current = updateCurrentPage;

  async function openExtendedActivity(activityId: string) {
    if (!activityId) {
      closeExtendedScreen();
      setActiveBobject(null);
      setExtendedContext(null);

      createToast({
        message: t('extension.salesforceToasts.activityNotFound'),
        type: 'info',
        position: 'top-center',
      });
    }

    const bobject = await api
      .get<Bobject>(`/bobjects/${activityId}/form?injectReferences=true`)
      .then(res => res.data);

    const activity = injectReferencedBobjects(bobject);
    const referencedBobject = getReferencedBobject(activity);
    const activityType: ACTIVITY_TYPES = getTextFromLogicRole(
      activity,
      ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    ) as ACTIVITY_TYPES;

    setContactViewBobjectId(referencedBobject?.id?.value);

    let contextType: ExtendedContextTypes = undefined;

    switch (activityType) {
      case ACTIVITY_TYPES.MEETING:
        contextType = ExtendedContextTypes.MEETING_DETAILS;
        break;
      case ACTIVITY_TYPES.EMAIL:
        contextType = ExtendedContextTypes.EMAIL_THREAD;
        break;
      case ACTIVITY_TYPES.CALL:
        contextType = ExtendedContextTypes.CALL_DETAILS;
        break;
    }

    setExtendedContext({
      type: contextType,
      bobject: activity,
    });
  }

  function insertActivityBloobirdsLink(recordId: string, button: any) {
    const bbLink = generateBBLink(recordId, button);

    if (bbLink)
      //Add the portal element to the list
      setListOfPortalElements(prevState => [
        ...prevState,
        {
          anchor: bbLink,
          children: (
            <div
              onClick={event => {
                event.stopPropagation();
                api
                  .post<Record<string, BobjectId>>(
                    `/bobjects/${settings?.account?.id}/Activity/search/crm`,
                    {
                      crmIds: [recordId],
                      crm: 'SALESFORCE',
                    },
                  )
                  .then(response => {
                    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SFDC_B_LINK_ + 'ACTIVITY');
                    window.dispatchEvent(
                      new CustomEvent(MessagesEvents.ForceOpenExtension, {
                        detail: { alwaysOpen: true },
                      }),
                    );
                    return openExtendedActivity(response?.data?.[recordId]?.value);
                  });
              }}
              className={styles.icon}
              style={{ cursor: 'pointer' }}
            >
              <style scoped>
                {`
                  svg {
                    fill: #1991ff;
                    stroke: #1991ff;
                  };
                  path {
                    fill: #1991ff;
                    stroke: #1991ff;
                  };
                `}
              </style>
              <Icon name="bloobirds" size={14} />
            </div>
          ),
        },
      ]);
  }

  async function insertBloobirdsLink(recordId: string, button: Element) {
    if (!recordId || !button) {
      return;
    }

    const bbLink = generateBBLink(recordId, button);

    const href = button.getAttribute('href');

    if (bbLink)
      ReactDOM.unstable_batchedUpdates(() => {
        setListOfPortalElements(prevState => [
          ...prevState,
          {
            anchor: bbLink,
            children: (
              <div
                onClick={event => {
                  event.stopPropagation();
                  const sobjectType = getSobjectTypeFromId(recordId);
                  mixpanel.track(
                    MIXPANEL_EVENTS.CLICK_ON_SFDC_B_LINK_ + sobjectType?.toUpperCase(),
                  );
                  openCurrentPageRef.current(recordId, href);
                }}
                className={styles.icon}
                style={{ cursor: 'pointer', marginBottom: isDynamics ? '2px' : '0' }}
              >
                {!isDynamics && (
                  <style scoped>
                    {`
                svg {
                  fill: #1991ff;
                  stroke: #1991ff;
                };
                path {
                  fill: #1991ff;
                  stroke: #1991ff;
                };
              `}
                  </style>
                )}
                <Icon name="bloobirds" size={14} />
              </div>
            ),
          },
        ]);
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isB2CAccount === null || isPersonAccountAsAccount === null) {
        return;
      }
      extractRecordIdElements(
        document.body,
        insertBloobirdsLink,
        shouldShowAccounts,
        insertActivityBloobirdsLink,
      );

      // If it's a reports page, we need to extract the content of the iframe
      const iframe = document.querySelector('iframe[title="Report Viewer"]') as HTMLIFrameElement;
      setIframe(iframe);
      if (iframe) {
        const iframeDocument = iframe.contentDocument;
        if (iframeDocument) {
          extractRecordIdElements(
            iframeDocument.body,
            insertBloobirdsLink,
            shouldShowAccounts,
            insertActivityBloobirdsLink,
          );
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isB2CAccount, isPersonAccountAsAccount]);

  return (
    <>
      {listOfPortalElements.map(element => {
        return ReactDOM.createPortal(element.children, element.anchor);
      })}
    </>
  );
}

function IdShortcutsRenderer() {
  const [utabId, setUtabId] = useState(null);
  const accountId = useActiveAccountId();
  const url = normalizeUrl(window.location.href);

  const allowBLinksInCRM = useAllowBLinksInCRM(accountId);

  const { useGetLoggedIn } = useExtensionContext();
  const loggedIn = useGetLoggedIn();

  const isDynamics = !!document.location.href.match('^.*://.*.crm4.dynamics.com.*');

  useEffect(() => {
    function chromeTabListener(request) {
      if (request.message === 'TAB_UPDATED') {
        setUtabId(uuid());
      }
    }
    chrome?.runtime?.onMessage.addListener(chromeTabListener);
    return () => {
      chrome?.runtime?.onMessage.removeListener(chromeTabListener);
    };
  }, []);

  if (!loggedIn) {
    return null;
  }

  if (isDynamics) {
    // const pageType = new URLSearchParams(window.location.search)?.get('pagetype');
    // if (pageType === 'entitylist' && true) {
    return <ButtonsRenderer key={utabId || 'first-render'} />;
    // }
  } else if (isSalesforcePage(url) && allowBLinksInCRM) {
    return <ButtonsRenderer key={utabId || 'first-render'} />;
  }

  return null;
}

export default IdShortcutsRenderer;
