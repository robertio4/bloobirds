import React, { useEffect, useState, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AddToCalendarModal from '@bloobirds-it/add-to-calendar';
import { ConfirmDeleteModal, SkipTaskModal } from '@bloobirds-it/bobjects';
import { CadenceControlModal } from '@bloobirds-it/cadence';
import { Confetti } from '@bloobirds-it/confetti';
import { AstrolineDialer } from '@bloobirds-it/dialer';
import { Spinner, ToastContainer } from '@bloobirds-it/flamingo-ui';
import {
  useAddToCalendar,
  useQuickLogActivity,
  useIsOTOAccount,
  useOpenSkipTaskModal,
  usePreviousUrl,
  useRawAccountSettings,
  useRouter,
  useCopilotEnabled,
} from '@bloobirds-it/hooks';
import { useInternationalizationSettings } from '@bloobirds-it/internationalization';
import { useEventSubscription, usePlover } from '@bloobirds-it/plover';
import { QuickLogModal } from '@bloobirds-it/quick-log-modal';
import { UserHelperKeys, UserRole } from '@bloobirds-it/types';
import { WIZARD_SOURCES, WizardProvider } from '@bloobirds-it/wizard-modal-context';
import { WizardModalFactory } from '@bloobirds-it/wizard-modal-controller';
import * as Sentry from '@sentry/react';
import mixpanel from 'mixpanel-browser';
import useSWR, { SWRConfig } from 'swr';

import { LogoSvg } from '../../../assets/svg';
import { SdfcOTOAccounts } from '../../components/accountBanners/accountBanners';
import AppCalendar from '../../components/appCalendar/appCalendar';
import AppCalendarSales from '../../components/appCalendar/appCalendarSales';
import BobjectDetailsModal from '../../components/bobjectDetailsModal/bobjectDetailsModal';
import BobjectForm from '../../components/bobjectForm';
import { TableContextProvider } from '../../components/bobjectTable/context/bobjectTable.context';
import ConvertObject from '../../components/contactFlowModal/convertBobject/convertBobject';
import OpportunityControl from '../../components/contactFlowModal/opportunityControl/opportunityControl';
import Dialer from '../../components/dialer';
import DownloadConfirmationModal from '../../components/downloadConfirmationModal';
import DuplicateValidationModal from '../../components/duplicateValidationModal';
import ErrorBoundary from '../../components/errorBoundary';
import GeneralSearchBarWrapper from '../../components/generalSearchBar/generalSearchBarWrapper';
import Header from '../../components/header/header';
import { JustCallDialer } from '../../components/justCallDialer/components/justCallDialer.view';
import MinimizableModals from '../../components/minimizableModals';
import { PreviewActivityEmailModalWrapper } from '../../components/previewActivityEmailModal/previewActivityEmailModalWrapper';
import { PreviewEmailModalWrapper } from '../../components/previewEmailModal/previewEmailModalWrapper';
import RescheduleCadenceTaskModal from '../../components/rescheduleTask/rescheduleCadenceTaskModal';
import { useRescheduleCadenceTask } from '../../components/rescheduleTask/useRescheduleCadenceTask';
import { UserPermissionContext } from '../../components/userPermissions';
import { useUserSettings } from '../../components/userPermissions/hooks';
import ViewTagsModal from '../../components/viewTagsModal';
import WelcomeScreens from '../../components/welcomeScreensModal/welcomeScreens';
import {
  useActiveUser,
  useBobjectDetails,
  useBobjectFormVisibility,
  useCadenceControl,
  useDuplicateValidationModal,
  useEntity,
} from '../../hooks';
import { AircallProvider } from '../../hooks/useAirCallDialerVisibility';
import { useBobjectTypes } from '../../hooks/useBobjectTypes';
import { useBobjectsDownload } from '../../hooks/useBobjectsDownload';
import { useFeatureFlags, useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { useLogin } from '../../hooks/useLogin';
import useManageProducts from '../../hooks/useManageProducts';
import { usePingVersion } from '../../hooks/usePingVersion';
import { usePreviewActivityEmailModal } from '../../hooks/usePreviewActivityEmailModal';
import { usePreviewEmailModal } from '../../hooks/usePreviewEmailModal';
import { useReminders } from '../../hooks/useReminders';
import { useTagsModal } from '../../hooks/useTagsModal';
import { useUserHelpers } from '../../hooks/useUserHelpers';
import { useAppCalendarVisibility } from '../../hooks/useUserTasks';
import { ApiHosts, servicesEnv } from '../../misc/api/ApiHosts';
import { useIntercom } from '../../misc/intercom/intercom';
import SessionManagerFactory from '../../misc/session';
import AccountSettings from '../../pages/accountSettingsPages';
import AiAnalysisPage from '../../pages/aiAnalysisPages';
import CadencesPage from '../../pages/cadencesPage/cadencesPage';
import ManageProductsModal from '../../pages/contactPages/opportunityPage/manageProductsModal/manageProductsModal';
import Dashboard from '../../pages/dashboardPages';
import PlaybookPage from '../../pages/playbookPages/playbookPage';
import UserSettings from '../../pages/userSettingsPages';
import { api } from '../../utils/api';
import * as Routes from '../_constants/routes';
import styles from './AuthenticatedScopeApp.module.css';
import Board from './board';
import NotFoundManager from './notFound';
import PlaygroundPages from '../../pages/playgroundPages';

const SessionManager = SessionManagerFactory();

const withBasicWebsocketSubscriptions = Component => () => {
  const { setPingVersion } = usePingVersion();
  const { logout, logoutRedirect } = useLogin();

  useEventSubscription('Ping', data => {
    setPingVersion(data?.version);
  });

  useEventSubscription('logout', () => {
    api.get('/auth/service/jwt/new-auth-enabled').then(data => {
      logout({
        onError: () => {
          if (data?.data?.newAuthEnabled) logoutRedirect();
        },
        redirectToAuth: data?.data?.newAuthEnabled,
      });
    });
  });
  return <Component />;
};

const AuthenticatedScopeWrapper = ({ children }) => {
  const contextToken = SessionManager.getToken();
  const token = SessionManager.getRootToken();

  useEffect(() => {
    if (token !== contextToken) {
      SessionManager.updateToken(contextToken);
    }
  }, [token, contextToken]);

  return (
    <SWRConfig
      value={{
        fetcher: async url => {
          try {
            const response = await api.get(url);
            return response.data;
          } catch (error) {
            console.warn(error);
          }
        },
        revalidateOnFocus: false,
      }}
    >
      <ErrorBoundary>
        <UserPermissionContext>{children}</UserPermissionContext>
      </ErrorBoundary>
    </SWRConfig>
  );
};

const ApplicationModals = () => {
  const { isOpen: isAddToCalendarOpen } = useAddToCalendar();
  const { isOpen: isBobjectDetailsOpen } = useBobjectDetails();
  const { isOpen: isBobjectFormOpen } = useBobjectFormVisibility();
  const { isOpen: isDuplicateValidationOpen } = useDuplicateValidationModal();
  const { isModalOpen: isDownloadConfirmationModalOpen } = useBobjectsDownload();
  const { isOpen: isOpenSkipTaskModal } = useOpenSkipTaskModal();
  const { isOpen: isOpenQuickLogModal } = useQuickLogActivity();
  const {
    resetCadenceControlInfo,
    step: initialStep,
    closeCadenceControl,
    bobject: cadenceBobject,
    isOpen: isOpenCadenceControl,
    previousStep,
  } = useCadenceControl();
  const { isOpen: isOpenCalendar } = useAppCalendarVisibility();
  const { isOpen: isRescheduleTaskModalOpen } = useRescheduleCadenceTask();
  const {
    isOpen: isPreviewEmailModalOpen,
    handleClose: handlePreviewEmailClose,
    handleOpenModal,
  } = usePreviewEmailModal();
  const {
    isOpen: isPreviewActivityEmailModalOpen,
    handleClose: handlePreviewActivityEmailClose,
  } = usePreviewActivityEmailModal();
  const { openTagsModal } = useTagsModal();
  const {
    isOpen: isOpenManageProductsModal,
    closeModal: closeManageProductsModal,
  } = useManageProducts();

  const settings = useUserSettings();
  const {
    user: { dialerType },
  } = settings;
  const helpers = useUserHelpers();
  const hasCompletedWelcomeScreens = helpers.has(UserHelperKeys.COMPLETE_WELCOME_SCREEN);
  const { history, location } = useRouter();
  const hasSalesEnabled = useFullSalesEnabled();

  const previewAutoEmail = emailTemplateId => {
    handleOpenModal({ templateId: emailTemplateId });
  };

  return (
    <>
      <ConfirmDeleteModal history={history} location={location} />
      <MinimizableModals />
      <GeneralSearchBarWrapper />
      {openTagsModal && <ViewTagsModal />}
      {isDownloadConfirmationModalOpen && <DownloadConfirmationModal />}
      {dialerType === 'JUST_CALL_DIALER' && <JustCallDialer />}
      {dialerType === 'ASTROLINE_DIALER' && <AstrolineDialer launchCCF={false} />}
      {isDuplicateValidationOpen && <DuplicateValidationModal />}
      {isBobjectFormOpen && <BobjectForm />}
      {isBobjectDetailsOpen && <BobjectDetailsModal />}
      {isAddToCalendarOpen && <AddToCalendarModal />}
      {isOpenSkipTaskModal && <SkipTaskModal />}
      {isOpenQuickLogModal && <QuickLogModal />}
      {isOpenCadenceControl && (
        <CadenceControlModal
          step="CONFIGURE_CADENCE"
          bobject={cadenceBobject}
          setIsOpen={resetCadenceControlInfo}
          callbackOnClose={closeCadenceControl}
          initialStep={initialStep}
          onEmailPreviewClicked={previewAutoEmail}
          previousStep={previousStep}
        />
      )}
      {isRescheduleTaskModalOpen && <RescheduleCadenceTaskModal />}
      {isOpenCalendar && (hasSalesEnabled ? <AppCalendarSales /> : <AppCalendar />)}
      {isPreviewEmailModalOpen && <PreviewEmailModalWrapper onClose={handlePreviewEmailClose} />}
      {isPreviewActivityEmailModalOpen && (
        <PreviewActivityEmailModalWrapper onClose={handlePreviewActivityEmailClose} />
      )}
      {isOpenManageProductsModal && (
        <ManageProductsModal open handleClose={closeManageProductsModal} />
      )}
      {!hasCompletedWelcomeScreens && <WelcomeScreens />}
      <Confetti />
      <WizardModalFactory>
        <div key={'CONTACT_FLOW_APP'} id={'CONTACT_FLOW_APP'}>
          <div key={'CONVERT_OBJECT'}>
            <ConvertObject />
          </div>
          <div key={'OPPORTUNITY_CONTROL'}>
            <OpportunityControl />
          </div>
        </div>
      </WizardModalFactory>
    </>
  );
};

const WebsocketComponent = React.memo(() => {
  usePlover(SessionManager.getToken(), ApiHosts.websocket.host(), false);
  return null;
});

const AuthenticatedScope = () => {
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectTypes = useBobjectTypes();
  const fieldTypes = useEntity('fieldTypes');
  useReminders();
  const { setUserActiveData } = useActiveUser();
  const account = SessionManager.getAccount();
  const user = SessionManager.getUser();
  const { resetPreviousUrl } = usePreviousUrl();
  const { featureFlags } = useFeatureFlags();
  const { has } = useUserHelpers();
  const settings = useUserSettings();
  const isOTOAccount = useIsOTOAccount();
  const isCopilotEnabled = useCopilotEnabled(account.id) || false;
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const { getRawAccountSetting } = useRawAccountSettings();
  useInternationalizationSettings(settings?.user?.language ?? settings?.account?.language);

  useEffect(() => {
    resetPreviousUrl();
  }, []);

  useEffect(() => {
    if (settings) {
      const userSettings = settings?.user;
      const accountSettings = settings?.settings;
      const accountProps = settings?.account;
      setUserActiveData(user, account);
      Sentry.setUser({
        id: user?.id,
        username: user?.name,
      });
      Sentry.setTag('account', account?.id);
      Sentry.setTag('accountName', account?.name);
      window.zestSettings = {
        contact_name: user?.name,
        contact_email: user?.email,
        contact_id: user?.id,
      };

      const isAdmin =
        settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) ||
        settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
      const hasSalesforce = settings?.account?.salesforceInstance;
      setShouldShowBanner(
        isOTOAccount && isAdmin && !hasSalesforce && has(UserHelperKeys.COMPLETE_WELCOME_SCREEN),
      );

      sessionStorage.setItem('accountId', account?.id);
      if (servicesEnv === 'production') {
        mixpanel.identify(user?.id);
        mixpanel.people.set({
          $name: user?.name,
          $email: userSettings?.email,
          account_id: account?.id,
          account_name: account?.name,
          account_type: accountProps?.type,
          churned: accountProps?.churned,
          csCriteria: accountProps?.customerSuccessCriteria,
          oto_account: getRawAccountSetting('OTO_ACCOUNT'),
          account_email_type: accountSettings?.mailToLinksType,
          account_open_calendar_pop_up: accountSettings?.openCalendarPopupAfterMeeting,
          dialer_default_view: userSettings?.dialerDefaultView,
          dialer_type: userSettings?.dialerType,
          employee_role: userSettings?.employeeRole,
          email_server: accountSettings?.mailtoLinksType,
          has_manual_call: userSettings?.enableLogCall,
          phone_server: accountProps?.dialerTypes?.join(','),
          type: userSettings?.type,
          task_reminders_enabled: userSettings?.remindersEnabled,
          task_sound_reminders_enabled: userSettings?.remindersSoundEnabled,
          task_reminders_before_minutes: userSettings?.remindersBeforeMinutes,
          incoming_calls_forwarded: userSettings?.incomingCallsForwarding,
          user_dialer_type: user?.dialerType,
          user_type: isAdmin ? UserRole.ACCOUNT_ADMIN : UserRole.ACCOUNT_USER,
        });

        mixpanel.register({
          from_chrome_extension: false,
        });

        mixpanel.add_group('account', account?.name);
      }
    }
  }, [user, account, settings]);

  useIntercom();

  return (
    <Suspense fallback={<></>}>
      {fieldTypes && bobjectPicklistFieldValues && bobjectFields && bobjectTypes && featureFlags ? (
        <>
          <WebsocketComponent />
          <TableContextProvider>
            <AircallProvider>
              <Header />
              {shouldShowBanner && <SdfcOTOAccounts />}
              <div className={styles._content}>
                <Route exact path={Routes.APP} render={() => <Redirect to={Routes.APP_TASKS} />} />
                <Dialer />
                <Board />
                <Route
                  exact
                  path={Routes.APP_MANAGEMENT}
                  render={() => <Redirect to={Routes.APP_MANAGEMENT_USER} />}
                />
                <Route path={Routes.APP_MANAGEMENT_USER} component={UserSettings} />
                <Route path={Routes.APP_ACCOUNT} component={AccountSettings} />
                <Route path={Routes.APP_MANAGEMENT_ACCOUNT} component={AccountSettings} />
                <Route path={Routes.APP_CADENCES} component={CadencesPage} />
                <Route path={Routes.APP_PLAYBOOK} component={PlaybookPage} />
                <Route path={Routes.APP_DASHBOARD} component={Dashboard} />
                {isCopilotEnabled && (
                  <Route path={Routes.APP_PLAYGROUND} component={PlaygroundPages} />
                )}
                <Route path={Routes.APP_AI_ANALYSIS_ACTIVITY} component={AiAnalysisPage} />
                <NotFoundManager />
                <ApplicationModals />
                <ToastContainer />
              </div>
            </AircallProvider>
          </TableContextProvider>
        </>
      ) : (
        <div className={styles.loader}>
          <LogoSvg fill="var(--bloobirds)" width={50} />
          <div className={styles.spinner}>
            <Spinner name="loadingCircle" />
          </div>
        </div>
      )}
    </Suspense>
  );
};

const WebsocketSubscribedApp = withBasicWebsocketSubscriptions(AuthenticatedScope);

const AuthenticatedScopeApp = () => {
  const accountWizard = SessionManager.getAccount();
  const initialWizardContext = {
    accountId: accountWizard?.id,
    bobject: null,
    source: WIZARD_SOURCES.APP,
  };

  return (
    <AuthenticatedScopeWrapper>
      <WizardProvider value={initialWizardContext}>
        <WebsocketSubscribedApp />
      </WizardProvider>
    </AuthenticatedScopeWrapper>
  );
};

export default AuthenticatedScopeApp;
