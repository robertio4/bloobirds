import { useEffect, useState, Suspense } from 'react';

import { SkipTaskModal } from '@bloobirds-it/bobjects';
import { Confetti } from '@bloobirds-it/confetti';
import { ToastContainer } from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserSettings,
  useDataModel,
  useLocalStorage,
  useRawAccountSettings,
  useSessionStorage,
  useWhatsappEnabled,
  useNotificationRemindersEnabled,
  useSWRLifespanEnabled,
} from '@bloobirds-it/hooks';
import { useInternationalizationSettings } from '@bloobirds-it/internationalization';
import { usePlover } from '@bloobirds-it/plover';
import { QuickLogModal } from '@bloobirds-it/quick-log-modal';
import {
  BobjectType,
  ExtensionHelperKeys,
  MessagesEvents,
  SessionStorageKeys,
  UserRole,
} from '@bloobirds-it/types';
import {
  getTokenEncoded,
  isLoggedIn,
  logout,
  isElementLoaded,
  isWhatsAppPage,
  isSalesforcePage,
  isDynamicsPage,
} from '@bloobirds-it/utils';
import { WIZARD_SOURCES, WizardProvider } from '@bloobirds-it/wizard-modal-context';
import { WizardModalFactory } from '@bloobirds-it/wizard-modal-controller';
import * as Sentry from '@sentry/react';
import mixpanel from 'mixpanel-browser';
import normalizeUrl from 'normalize-url';
import { RecoilRoot } from 'recoil';
import { mutate, SWRConfig } from 'swr';

import { ApiHosts } from '../../misc/api/ApiHosts';
import { shouldInjectSalesforce } from '../../utils/url';
import { AircallEventListener } from './aircallEventListener/aircallEventListener';
import { BubbleWrapper } from './bubbleWrapper/bubbleWrapper';
import { BulkActionsToasts } from './bulkActionsToasts/bulkActionsToasts';
import { fetchLeadFields } from './captureForm/captureForm';
import { ExtensionProvider } from './context';
import DynamicsObserver from './dynamicsObserver/dynamicsObserver';
import ExtensionLeftBar from './extensionLeftBar/extensionLeftBar';
import { getBellSelector, getSelector } from './extensionLeftBar/extensionLeftBar.utils';
import { ExtensionLeftBarProvider } from './extensionLeftBar/extensionLeftBarContext';
import GeneralSearchBarWrapper from './generalSearchBar/generalSearchBarWrapper';
import IdShortcutsRenderer from './idShortcuts/IdShortcuts';
import { NotificationReminders } from './notificationReminders/notificationReminders';
import { NotificationsWrapper } from './notificationsWrapper/notificationsWrapper';
import { staleCacheKeysMiddleware } from './swrTimestampMiddleware';
import SyncListButtonDynamics from './syncDynamicsLists/syncListButton';
import SyncListButton from './syncSalesforceLists/syncListButton';
import WhatsappRenderer from './whatsappRenderer/WhatsappRenderer';

if (process.env.NODE_ENV === 'production') {
  mixpanel.init('b2373343acb028c8d63ce064fadcada2');
} else {
  mixpanel.init('7700a68ac54ffa55064f2f2739a6a47e');
}

export function isAuth(hostname: string): boolean {
  //If the page is: localhost:5173, auth.bloobirds.com or auth.dev-bloobirds.com do not inject the app
  return (
    hostname === 'localhost' ||
    hostname === 'auth.bloobirds.com' ||
    hostname === 'auth.dev-bloobirds.com'
  );
}

const App = (): JSX.Element => {
  const { get } = useSessionStorage();
  const { get: getLocal } = useLocalStorage();
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [canShowLeftBar, setCanShowLeftBar] = useState(false);
  const [canShowBell, setCanShowBell] = useState(false);
  const { settings } = useActiveUserSettings(loggedIn);
  const url = normalizeUrl(window.location.href);
  const accountId = settings?.account?.id;
  const account = settings?.account;
  const user = settings?.user;
  const accountSettings = settings?.settings;
  const accountProps = settings?.account;
  const dataModel = useDataModel(
    settings && `/utils/service/datamodel/extension/${settings?.user?.id}`,
    loggedIn,
  );
  const { getRawAccountSetting } = useRawAccountSettings();
  const isAdmin =
    settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) ||
    settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const hasSWRLifespanController = useSWRLifespanEnabled(accountId);
  const hasNotificationRemindersEnabled = useNotificationRemindersEnabled(accountId);

  useInternationalizationSettings(settings?.user.language ?? settings?.account.language);

  if (process.env.NODE_ENV === 'production' && user?.id) {
    mixpanel.identify(user?.id);
    mixpanel.people.set({
      $name: user?.name,
      $email: user?.email,
      account_id: account?.id,
      account_name: account?.name,
      account_type: accountProps?.type,
      churned: accountProps?.churned,
      csCriteria: accountProps?.customerSuccessCriteria,
      oto_account: getRawAccountSetting('OTO_ACCOUNT'),
      b2c_account: getRawAccountSetting('B2C_ACCOUNT'),
      account_email_type: accountSettings?.mailtoLinksType,
      account_open_calendar_pop_up: accountSettings?.openCalendarPopupAfterMeeting,
      dialer_default_view: user?.dialerDefaultView,
      dialer_type: user?.dialerType,
      employee_role: user?.employeeRole,
      email_server: accountSettings?.mailtoLinksType,
      has_manual_call: user?.enableLogCall,
      phone_server: accountProps?.dialerTypes?.join(','),
      type: user?.type,
      task_reminders_enabled: user?.remindersEnabled,
      task_sound_reminders_enabled: user?.remindersSoundEnabled,
      task_reminders_before_minutes: user?.remindersBeforeMinutes,
      incoming_calls_forwarded: user?.incomingCallsForwarding,
      user_dialer_type: user?.dialerType,
      user_type: isAdmin ? UserRole.ACCOUNT_ADMIN : UserRole.ACCOUNT_USER,
    });

    const isLinkedinPage = window.location.href?.includes('linkedin');
    const isSalesforcePage = window.location.href?.match('^.*://.*.lightning.force.com.*');

    mixpanel.register({
      from_chrome_extension: true,
      from_linkedin: isLinkedinPage,
      from_salesforce: !!isSalesforcePage,
      source: isLinkedinPage ? 'linkedin' : isSalesforcePage ? 'salesforce' : 'other',
    });

    mixpanel.add_group('account', account?.name);
    Sentry.setUser({
      id: user?.id,
      username: user?.name,
    });
    Sentry.setTag('account', account?.id);
    Sentry.setTag('accountName', account?.name);
  }

  useEffect(() => {
    const callBack = event => {
      // We only accept messages from ourselves
      if (event.source !== window) {
        return;
      }

      if (event.data.type && event.data.type === 'FROM_AUTH') {
        console.log('Login event received');
        //We can now log in with the token
        chrome?.storage?.sync?.set({ token: event.data.token });
        window.dispatchEvent(new CustomEvent(MessagesEvents.UserLoggedIn));
      }

      if (event.data.type && event.data.type === 'FROM_AUTH_LOGOUT') {
        console.log('Logout event received');
        //Clear the token
        logout();
      }
    };
    window.addEventListener('message', callBack, false);
    return () => window.removeEventListener('message', callBack);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      isElementLoaded(getBellSelector()).then(() => {
        const root = document.createElement('div');
        root.setAttribute('id', 'placeholder-div');
        root.setAttribute('style', 'align-self: center');
        const referenceElement = isSalesforcePage(url)
          ? document.getElementsByClassName('slds-global-actions__item slds-grid')[0]
          : isDynamicsPage(url)
          ? document.querySelector('#topBar ul[data-id="CommandBar"]')
          : document.getElementsByClassName('global-nav__primary-item')[5];
        referenceElement?.append(root);
        setCanShowBell(true);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    isLoggedIn().then((isLogged: boolean) => {
      setLoggedIn(isLogged);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (accountId) {
      sessionStorage.setItem('accountId', accountId);
    }
  }, [accountId]);

  useEffect(() => {
    // Prefetch fields
    fetchLeadFields('/linkedin/settings/layout').then(result =>
      mutate('/linkedin/settings/layout', result),
    );
  }, []);

  isElementLoaded(getSelector(url)).then(element => {
    if (element && shouldInjectSalesforce(url)) {
      setCanShowLeftBar(true);
    }
  });

  if (loading && loggedIn) {
    return null;
  }

  if ((!dataModel || !settings) && loggedIn) {
    return null;
  }

  //If the page is salesforce, the account has an instance ?.account?.salesforceInstance; and the instance is not the same as the current page, do not inject the app
  const salesforceInstance = settings?.account?.salesforceInstance;
  if (
    isSalesforcePage(url) &&
    salesforceInstance &&
    !url.includes(salesforceInstance.replace('my.salesforce.com', ''))
  ) {
    return null;
  }

  const activeBobjectListeners: Record<BobjectType, Set<() => void>> = {
    Company: new Set(),
    Lead: new Set(),
    Opportunity: new Set(),
    Task: new Set(),
    Activity: new Set(),
    Product: new Set(),
    OpportunityProduct: new Set(),
  };

  const initialContext = {
    loggedIn,
    dataModel,
    settings,
    currentPage: url,
    contactViewBobjectId: null,
    activeBobject: null,
    extendedContext: { type: null, open: false },
    activeBobjectListeners,
    openStartTasksNavigation: get(SessionStorageKeys.OpenStartTasksNavigation) || false,
    sidePeekEnabled: !getLocal(ExtensionHelperKeys.SIDEPEEK_DISABLED),
    taskId: null,
    loading: false,
    salesforceSyncMutate: null,
    activeBobjectContext: null,
    activeTab: null,
    currentTask: null,
    isSettings: get(SessionStorageKeys.IsSettings) || false,
  };

  const initialWizardContext = {
    accountId,
    bobject: null,
    source: WIZARD_SOURCES.OTO,
  };

  //If the page is: localhost:5173, auth.bloobirds.com or auth.dev-bloobirds.com do not inject the app save it to a const
  const isAuthPage = isAuth(window.location.hostname);

  if (isWhatsAppPage() && !hasWhatsappEnabled) {
    return null;
  }
  const canWhatsappRenderer = isWhatsAppPage() && hasWhatsappEnabled;

  return (
    <ExtensionProvider value={initialContext}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateIfStale: false,
          revalidateOnReconnect: true,
          use: [useSWRNext => staleCacheKeysMiddleware(useSWRNext, hasSWRLifespanController)],
        }}
      >
        <Sentry.ErrorBoundary>
          <RecoilRoot key="bb-chrome-extension">
            <PloverWrapper loggedIn={loggedIn}>
              <WizardProvider value={initialWizardContext}>
                {!isAuthPage && (
                  <Suspense fallback={<></>}>
                    <Confetti />
                    <ToastContainer />
                    {canShowBell && <GeneralSearchBarWrapper />}
                    <ExtensionLeftBarProvider>
                      {canShowLeftBar && <ExtensionLeftBar url={url} />}
                      {canShowBell && <NotificationsWrapper />}
                      {canShowBell && isDynamicsPage && <SyncListButtonDynamics key={url} />}
                      {canShowBell && <BulkActionsToasts />}
                      <IdShortcutsRenderer />
                      {canShowBell && <SyncListButton key={'syncListButton' + url} />}
                      {canWhatsappRenderer && <WhatsappRenderer />}
                      {isDynamicsPage && <DynamicsObserver />}
                    </ExtensionLeftBarProvider>
                    <BubbleWrapper />
                    <SkipTaskModal />
                    {canShowBell && <QuickLogModal />}
                    {canShowBell && hasNotificationRemindersEnabled && <NotificationReminders />}
                    {canShowBell && <AircallEventListener />}
                    <WizardModalFactory />
                  </Suspense>
                )}
              </WizardProvider>
            </PloverWrapper>
          </RecoilRoot>
        </Sentry.ErrorBoundary>
      </SWRConfig>
    </ExtensionProvider>
  );
};

const PloverWrapper = ({ children, loggedIn }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (loggedIn) {
      getTokenEncoded().then((data: string) => {
        setToken(data);
        localStorage.setItem('bb-app-session', `{"token":"${data}"}`);
      });
    }
  }, [loggedIn]);

  usePlover(token, ApiHosts.websocket.host(), false);

  return <>{children}</>;
};

export default Sentry.withProfiler(App);
