import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { Switch, useLocation } from 'react-router-dom';

import { Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { useEventSubscription } from '@bloobirds-it/plover';
import { BobjectId, BobjectType } from '@bloobirds-it/types';
import { getReferencedBobject } from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import * as Sentry from '@sentry/react';
import queryString from 'query-string';
// @ts-ignore
import { v4 as uuid } from 'uuid';

import {
  APP_CL_COMPANIES_COMPANY,
  APP_CL_COMPANIES_COMPANY_OPPORTUNITY,
  APP_CL_LEADS_LEAD,
  APP_CL_OPPORTUNITIES,
  APP_CL_OPPORTUNITIES_OPPORTUNITY,
} from '../../app/_constants/routes';
import AddCompanyModal from '../../components/addCompanyModal/addCompanyModal';
import ChangeStatusModal from '../../components/changeStatusModal/changeStatusModal';
import useChangeStatus from '../../components/changeStatusModal/useChangeStatus';
import OpportunityControlModal from '../../components/opportunityControlModal/opportunityControlModal';
import UndoToast from '../../components/undoToast/undoToast';
import { useUserSettings } from '../../components/userPermissions/hooks';
import { useDialerVisibility, useOpenContactFlow, useRouter, useSharedState } from '../../hooks';
import { useActiveCompany } from '../../hooks/useActiveCompany';
import { useActiveLeads } from '../../hooks/useActiveLeads';
import { useActiveOpportunities } from '../../hooks/useActiveOpportunities';
import { fetchActivity } from '../../hooks/useActivity';
import useAddCompany from '../../hooks/useAddCompany';
import { useContactFlowVisibility } from '../../hooks/useContactFlow';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { useLinkedinChatModal } from '../../hooks/useLinkedinChatModal';
import useOpportunityControl from '../../hooks/useOpportunityControl';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import { isLead, isOpportunity } from '../../utils/bobjects.utils';
import ErrorPage from '../errorPage';
import NoPermissionsPage from '../noPermissionsPage';
import CompanyPage from './companyPage/companyPage';
import styles from './contactPage.module.css';
import { ContactBobjectsProvider, useContactBobjects } from './contactPageContext';
import LeadPage from './leadPage/leadPage';
import LinkedinChatModal from './linkedinChatModal/linkedinChatModal';
import NavigationBar from './navegationBar/navegationBar';
import OpportunityPage from './opportunityPage/opportunityPage';

export interface URLBobject {
  type: BobjectType;
  id: BobjectId;
}

function isDocumentHidden() {
  return document.hidden;
}

const ContactFlowListener = (): null => {
  const { company, active } = useContactBobjects();
  const { settings } = useUserSettings();
  const [version, setVersion] = useState(0);
  const ref = useRef(null);
  const [, setNotificationObjectId] = useSharedState('notificationId');
  const { open } = useOpenContactFlow();
  const openContactFlow = (data: any) => {
    if (
      data?.notification?.type === 'REPORT_CALL' &&
      (settings?.showCCFAllTabs || !isDocumentHidden())
    ) {
      const url = data.notification.url;
      const notificationId = data.notification.id;
      const urlWithoutQueryParams = url.split('?')[0];
      const urlId = urlWithoutQueryParams.split('/')[4];
      if (active?.id.objectId === urlId || company?.id.objectId === urlId) {
        open(data?.notification?.objectId);
        setNotificationObjectId(notificationId);
      }
    }
  };

  useEventSubscription('notification', (data: any) => {
    ref.current = data;
    setVersion(v => v + 1);
  });

  useEffect(() => {
    if (version > 0) {
      openContactFlow(ref.current);
      ref.current = null;
    }
  }, [version]);

  return null;
};

const ContactPage = () => {
  const { history } = useRouter();
  const settings = useUserSettings();
  const {
    isOpen: isOpenContactFlow,
    closeContactFlow,
  } = useContactFlowVisibility();
  const { isChangeStatusModalOpen } = useChangeStatus();
  const { isOpen: isOpenOpportunityControl } = useOpportunityControl();
  const { isOpen: isOpenLinkedinChatModal } = useLinkedinChatModal();
  const { isOpen: isOpenAddCompanyModal } = useAddCompany();
  const {
    activity: contactFlowActivity,
    clear: clearContactFlowVisibility,
    step: contactFlowStep,
    trigger: contactFlowTrigger,
  } = useOpenContactFlow();
  const { updateSelectedLead, resetSelectedLead } = useSelectedLead();
  const { updateSelectedOpportunity, resetSelectedOpportunity } = useSelectedOpportunity();
  const { createToast } = useToasts();
  const contactBobjects = useContactBobjects();
  const hasSalesEnabled = useFullSalesEnabled();
  const isOTOAccount = useIsOTOAccount();

  const { setActiveCompany, resetActiveCompany } = useActiveCompany();
  const { setActiveLeads, resetActiveLeads } = useActiveLeads();
  const { setActiveOpportunities, resetActiveOpportunities } = useActiveOpportunities();
  const parentRef = useRef(null);
  const { openWizard, resetWizardProperties } = useWizardContext();

  //Patch to allow the usage of all the flows
  useEffect(() => {
    if (contactBobjects?.company) {
      setActiveCompany(contactBobjects.company);
    }
    return () => {
      resetActiveCompany();
    };
  }, [contactBobjects?.company?.id.value]);

  useEffect(() => {
    if (contactBobjects?.leads) {
      setActiveLeads(contactBobjects.leads);
    }
    return () => {
      resetActiveLeads();
    };
  }, [contactBobjects?.leads]);

  useEffect(() => {
    if (contactBobjects?.opportunities) {
      setActiveOpportunities(contactBobjects.opportunities);
    }
    return () => {
      resetActiveOpportunities();
    };
  }, [contactBobjects?.opportunities]);

  useEffect(() => {
    if (isLead(contactBobjects.active)) {
      updateSelectedLead(contactBobjects.active);
    }
    if (isOpportunity(contactBobjects.active)) {
      updateSelectedOpportunity(contactBobjects.active);
    }
  }, [contactBobjects.active]);

  useEffect(() => {
    if (contactFlowActivity && !isOpenContactFlow) {
      fetchActivity(
        Array.isArray(contactFlowActivity) ? contactFlowActivity[0] : contactFlowActivity,
        true,
      ).then(activityResponse => {
        openWizard(WIZARD_MODALS.CONTACT_FLOW_APP, activityResponse, {
          referenceBobject: getReferencedBobject(activityResponse),
          handleClose: () => {
            resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_APP);
            closeContactFlow();
            clearContactFlowVisibility();
          },
          openAtStep: contactFlowStep,
          contactFlowActivity: contactFlowActivity,
          contactFlowTrigger: contactFlowTrigger,
        });
      });
    }
  }, [contactFlowActivity]);

  useEffect(
    () => () => {
      resetSelectedLead();
      resetSelectedOpportunity();
    },
    [],
  );

  useEffect(() => {
    if (contactBobjects.error) {
      Sentry.captureException(
        new Error('Error loading the contact bobjects: ' + contactBobjects.error),
      );
    }
  }, [contactBobjects.error]);

  if (isOTOAccount) {
    return <NoPermissionsPage />;
  }

  return !contactBobjects.error ? (
    <>
      <div
        ref={parentRef}
        style={{ height: '100%', overflow: 'auto' }}
        className={styles._container}
        id={contactBobjects?.active?.id.objectId}
      >
        {contactBobjects?.active && <ContactFlowListener />}
        <div style={{ display: 'none' }}>
          <span id="userId">{settings?.user.id}</span>
          <span id="bobjectId">{contactBobjects?.active?.id.value}</span>
          <span id="companyId">{contactBobjects?.company?.id.value}</span>
        </div>
        <NavigationBar contactBobjects={contactBobjects} />
        <div>
          <Switch>
            <Route
              exact
              path={
                hasSalesEnabled
                  ? APP_CL_OPPORTUNITIES_OPPORTUNITY
                  : APP_CL_COMPANIES_COMPANY_OPPORTUNITY
              }
              render={() => <OpportunityPage parentRef={parentRef} />}
            />
            <Route
              exact
              path={APP_CL_COMPANIES_COMPANY}
              render={() => <CompanyPage parentRef={parentRef} />}
            />
            <Route
              exact
              path={APP_CL_LEADS_LEAD}
              render={() => <LeadPage parentRef={parentRef} />}
            />

            {hasSalesEnabled && (
              <Route
                exact
                path={APP_CL_COMPANIES_COMPANY_OPPORTUNITY}
                render={routeProps => {
                  const {
                    match: { params },
                  } = routeProps;
                  return <Redirect to={`${APP_CL_OPPORTUNITIES}/${params?.opportunityId}`} />;
                }}
              />
            )}
          </Switch>
        </div>
        {isChangeStatusModalOpen && (
          <ChangeStatusModal
            onSave={() => createToast({ message: 'Status updated successfully', type: 'success' })}
          />
        )}
        {isOpenLinkedinChatModal && <LinkedinChatModal />}
        {isOpenOpportunityControl && <OpportunityControlModal />}
        {isOpenAddCompanyModal && <AddCompanyModal />}
        <UndoToast />
      </div>
    </>
  ) : (
    <ErrorPage
      action={{
        name: contactBobjects.error.status === 404 ? 'Back to lists' : 'Refresh',
        handleClick: contactBobjects.error.status === 404 ? history.goBack : window.location.reload,
        icon: contactBobjects.error.status === 404 ? 'arrowLeft' : 'refresh',
      }}
      showSupport={contactBobjects.error.status !== 404}
    >
      <Text color="softPeanut" align="center" size="m">
        <Text color="softPeanut" inline weight="bold" size="m">
          {contactBobjects.error.status}
        </Text>
        {" That's an error."}
      </Text>
      <Text color="softPeanut" align="center" size="m" htmlTag="span">
        {contactBobjects.error.status === 404
          ? `This resource does not exist.`
          : 'We are experiencing problems. Try refreshing the page. If this problem persists, please contact support.'}
      </Text>
    </ErrorPage>
  );
};

const ContactPageWithContext = () => {
  // Check if it comes from searchBar and should remount the component
  const { search } = useLocation();
  const { history } = useRouter();

  const values = queryString.parse(search);
  let id;
  if (values.fromSearchBar) {
    id = uuid();
    // remove the query param from the url
    history.replace({
      pathname: history.location.pathname,
      search: '',
    });
  }
  return (
    <ContactBobjectsProvider key={id}>
      <ContactPage />
    </ContactBobjectsProvider>
  );
};

export default ContactPageWithContext;
