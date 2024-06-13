import React, { useEffect } from 'react';

import {
  useIsB2CAccount,
  useIsPersonAccountAsAccount,
  useLocalStorage,
  useObjectCreationSettings,
  useSalesforceDataModel,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import {
  MessagesEvents,
  SalesforceDataModelResponse,
  SidepeekState,
  UserHelperKeys,
} from '@bloobirds-it/types';
import {
  getMainSalesforceObjectFromURL,
  getSalesforceObjectFromWSParam,
  isDynamicsPage,
  isLeadOrContactSalesforcePage,
  isLinkedInMessagesPage,
  isLinkedInProfilePage,
  isSalesforceAccountPage,
  isSalesforceCasePage,
  isSalesforceOpportunityPage,
  isSalesforcePage,
  isSalesNavigatorMessagesPage,
  isSalesNavigatorProfile,
  isTaskOrEventSalesforcePage,
} from '@bloobirds-it/utils';

import { useSalesforceLayerEnabled } from '../../../hooks/useFeatureFlag';
import { isListOrSetupPage } from '../../../utils/url';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import { DynamicsPage } from '../dynamicsAccountPage/dynamicsAccountPage';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import Loading from '../loadingIndicator/loadingIndicator';
import MinimizableModals from '../minimizabeModals/minimizableModals';
import NoContextPage from '../noContextPage/noContextPage';
import { RelateSalesforceUserPage } from '../relateSalesforceUserPage/relateSalesforceUserPage';
import { SalesforceAccountPage } from '../salesforceAccountPage/salesforceAccountPage';
import { SalesforceCasePage } from '../salesforceCasePage/salesforceCasePage';
import { SalesforceLeadOrContactPage } from '../salesforceLeadOrContactPage/salesforceLeadOrContactPage';
import { SalesforceObjectPage } from '../salesforceObjectPage/salesforceObjectPage';
import { SalesforceOpportunityPage } from '../salesforceOpportunityPage/salesforceOpportunityPage';
import { SalesforceTaskOrEventPage } from '../salesforceTaskOrEventPage/salesforceTaskOrEventPage';
import { WhatsappDuplicates } from '../whatsappRenderer/layouts/whatsappduplicates/whatsappDuplicates';
import LeadCaptureSettings from './leadCaptureSettings';
import MessagesInfo from './messagesSynced';
import NavigateMessage from './navigateMessage';
import ProfileForm from './profileForm';

const SalesforcePages = {
  Lead: <SalesforceLeadOrContactPage />,
  Contact: <SalesforceLeadOrContactPage />,
  Account: <SalesforceAccountPage />,
  Opportunity: <SalesforceOpportunityPage />,
};

const DynamicsPages = ({ info }) => {
  switch (info.entity) {
    case 'lead':
      return <ProfileForm info={info} />;
    case 'contact':
      return <ProfileForm info={info} />;
    case 'account':
      return <DynamicsPage info={info} />;
    case 'opportunity':
      return <DynamicsPage info={info} />;
    default:
      return <NoContextPage />;
  }
};

const DynamicsScreens = () => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const urlParams = new URLSearchParams(currentPage);
  const entity = urlParams.get('etn');
  const id = urlParams.get('id');
  if (!id) {
    return <NoContextPage />;
  }
  return <DynamicsPages info={{ entity, id }} />;
};

const syncableSobjects = (isB2CAccount: boolean, isPersonAccountAsAccount: boolean) => [
  'Lead',
  'Contact',
  'Opportunity',
  ...(isB2CAccount && !isPersonAccountAsAccount ? [] : ['Account']),
];

const SalesforceScreens = () => {
  const { useGetSettings, useGetCurrentPage } = useExtensionContext();
  const settings = useGetSettings();
  const currentPage = useGetCurrentPage();
  const isLeadOrContactPage = isLeadOrContactSalesforcePage(currentPage);
  const isAccountPage = isSalesforceAccountPage(currentPage);
  const sfdcDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const isB2CAccount = useIsB2CAccount();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const { get, set } = useLocalStorage();
  const isMenuOpen = get('isMenuOpen');
  const sidepeekState = get('sidepeekState');

  const userHasSalesforceUserRelated = sfdcDataModel?.mappedUsers?.find(
    mappedUser => mappedUser?.bloobirdsUserId === settings?.user?.id,
  );
  const isOpportunityPage = isSalesforceOpportunityPage(currentPage);
  const isTaskOrEventPage = isTaskOrEventSalesforcePage(currentPage);
  const isCasePage = isSalesforceCasePage(currentPage);

  useEffect(() => {
    if (sidepeekState == SidepeekState.UserMaximized) {
      set('sidepeekState', SidepeekState.InitialState);
    }
  }, [currentPage]);
  const tryToOpenExtension = () => {
    if (isMenuOpen != 'undefined' && !isMenuOpen && sidepeekState != SidepeekState.UserMinimized) {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ForceOpenExtension, {
          detail: { alwaysOpen: true },
        }),
      );
    }
  };

  const tryToCloseExtension = () => {
    if (isMenuOpen != 'undefined' && isMenuOpen && sidepeekState != SidepeekState.UserMaximized) {
      window.dispatchEvent(
        new CustomEvent(MessagesEvents.ForceOpenExtension, {
          detail: { close: true },
        }),
      );
    }
  };

  if (!sfdcDataModel.accountId) {
    return <Loading />;
  }

  const isMainObjectPage = isLeadOrContactPage || isAccountPage || isOpportunityPage;
  const mainSobjectFromURL = getMainSalesforceObjectFromURL(currentPage);
  const secondarySobjectFromURL = getSalesforceObjectFromWSParam(currentPage);

  let componentToRender;
  if (sfdcDataModel && !userHasSalesforceUserRelated) {
    componentToRender = {
      component: <RelateSalesforceUserPage onSave={() => sfdcDataModel?.mutate()} />,
      screenKey: 'RelateSalesforceUserPage',
    };
  } else if (
    syncableSobjects(isB2CAccount, isPersonAccountAsAccount).includes(mainSobjectFromURL) &&
    isMainObjectPage
  ) {
    componentToRender = {
      component: SalesforcePages[mainSobjectFromURL],
      screenKey: 'SalesforcePages',
    };
  } else if (
    syncableSobjects(isB2CAccount, isPersonAccountAsAccount).includes(secondarySobjectFromURL) &&
    isMainObjectPage
  ) {
    componentToRender = {
      component: SalesforcePages[secondarySobjectFromURL],
      screenKey: 'SalesforcePages',
    };
  } else if (isTaskOrEventPage) {
    componentToRender = {
      component: <SalesforceTaskOrEventPage />,
      screenKey: 'SalesforceTaskOrEventPage',
    };
  } else if (isCasePage) {
    componentToRender = { component: <SalesforceCasePage />, screenKey: 'SalesforceCasePage' };
  } else if (!isListOrSetupPage(currentPage)) {
    componentToRender = {
      component: (
        <SalesforceObjectPage
          closeExtensionCallback={tryToCloseExtension}
          openExtensionCallback={tryToOpenExtension}
        />
      ),
      screenKey: 'SalesforceObjectPage',
    };
  } else {
    componentToRender = { component: <NoContextPage />, screenKey: 'NoContextPage' };
  }

  if (componentToRender?.screenKey) {
    if (componentToRender?.screenKey == 'NoContextPage') {
      tryToCloseExtension();
    } else if (componentToRender?.screenKey != 'SalesforceObjectPage') {
      tryToOpenExtension();
    }
  }
  return componentToRender?.component;
};

export default (): JSX.Element => {
  const {
    useGetCurrentPage,
    useGetActiveBobject,
    useGetIsLoading,
    useGetNoMatchFound,
    useGetIsSettings,
  } = useExtensionContext();
  const { getIsHome } = useFloatingMenuContext();
  const currentPage = useGetCurrentPage();
  const isLoading = useGetIsLoading();
  const isSettings = useGetIsSettings();
  const isHome = getIsHome();
  const activeBobject = useGetActiveBobject();
  const isProfile = isLinkedInProfilePage(currentPage) || isSalesNavigatorProfile(currentPage);
  const noMatchFound = useGetNoMatchFound();
  const isMessaging =
    isLinkedInMessagesPage(currentPage) || isSalesNavigatorMessagesPage(currentPage);
  const isEmpty = !currentPage;
  const { save, helpers } = useUserHelpers();
  const { enabledObjectCreation } = useObjectCreationSettings();

  useEffect(() => {
    if (helpers) save(UserHelperKeys.DOWNLOAD_CHROME_EXTENSION);
  }, [helpers]);

  const isSalesforce = isSalesforcePage(currentPage);
  const isDynamics = isDynamicsPage(currentPage);

  const isSalesforceLayerActive = useSalesforceLayerEnabled();

  //TODO: Aqui tenemos que poner la frontera entre linkedin y salesforce, si hay parte comparitda que sea la misma, porque estamos duplicando flows
  const getComponent = () => {
    if (isSettings) {
      return <LeadCaptureSettings />;
    }
    if (noMatchFound?.source === 'WHATSAPP' || noMatchFound?.source === 'LEFTBAR') {
      if (noMatchFound?.bobjects.length === 0) {
        if (enabledObjectCreation) {
          return <ProfileForm info={noMatchFound.info} />;
        } else {
          return <NoContextPage />;
        }
      }
      return <WhatsappDuplicates bobjects={noMatchFound?.bobjects} />;
    }
    if (isHome) {
      return isSalesforceLayerActive ? <NoContextPage /> : <NavigateMessage />;
    }
    if (isLoading) {
      return <Loading />;
    }
    if (activeBobject) {
      return <ContactView />;
    }
    if (isDynamics) {
      return <DynamicsScreens />;
    }

    if (isSalesforce) {
      // TODO: Added this middleware for now, in the future this should be merged with LinkedIn screens
      return <SalesforceScreens />;
    } else if (isProfile) {
      return <ProfileForm />;
    } else if (isMessaging) {
      return <MessagesInfo />;
    } else if (isEmpty) {
      return <Loading />;
    } else {
      return isSalesforceLayerActive ? <NoContextPage /> : <NavigateMessage />;
    }
  };

  return (
    <>
      <MinimizableModals />
      {getComponent()}
    </>
  );
};
