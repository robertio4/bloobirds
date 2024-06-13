import React, { useEffect, useState } from 'react';

import { Button, Dropdown, Icon, IconButton, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { usePreviousUrl } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES, CompanyOrLeadLR, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import classNames from 'clsx';

import { APP_CL_COMPANIES, APP_CL_LEADS, companyIdUrl } from '../../../app/_constants/routes';
import WithTooltip from '../../../components/withTooltip/withTooltip';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import {
  useBobjectDetails,
  useBobjectFormCreation,
  useCadenceControl,
  useEntity,
  useRouter,
  useTaskNavigationStorage,
} from '../../../hooks';
import useAddCompany from '../../../hooks/useAddCompany';
import { useFullSalesEnabled } from '../../../hooks/useFeatureFlags';
import useParentCompany from '../../../hooks/useParentCompany';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import useSendToSales from '../../../hooks/useSendToSales';
import { BobjectType } from '../../../typings/bobjects';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
} from '../../../utils/bobjects.utils';
import { isCompanyPage, isLeadPage, isOpportunityPage } from '../../../utils/pages.utils';
import { ContactBobjects } from '../contact';
import { AddCompaniesRelatedModal } from './companiesRelatedDropdown/addCompaniesRelatedModal/addCompaniesRelatedModal';
import AddCompanyChildModal from './companiesRelatedDropdown/addCompanyChildModal/addCompanyChildModal';
import AddCompanyRelation from './companiesRelatedDropdown/addCompanyParentModal/addCompanyParentModal';
import CompaniesDropdown from './companiesRelatedDropdown/companiesRelatedDropdown';
import DeleteCompaniesRelatedModal from './companiesRelatedDropdown/deleteCompanyRelatedModal/deleteCompaniesRelatedModal';
import LeadsDropdown from './leadsDropdown/leadsDropdown';
import styles from './navegationBar.module.css';
import { NavigationTab } from './navigationTab/navigationTab';
import OpportunitiesDropdown from './opportunitiesDropdown/opportunitiesDropdown';
import TaskNavigator from './taskNavigator/taskNavigator.view';

const NavigationBar = ({ contactBobjects }: { contactBobjects: ContactBobjects | null }) => {
  const { history, pathname } = useRouter();
  const { previousUrl } = usePreviousUrl();
  const {
    ref: refOpportunities,
    visible: visibleOpportunities,
    setVisible: setVisibleOpportunities,
  } = useVisible();
  const {
    ref: refCompanyParent,
    visible: visibleCompanyParent,
    setVisible: setVisibleCompanyParent,
  } = useVisible();
  const { ref: refLeads, visible: visibleLeads, setVisible: setVisibleLeads } = useVisible();
  const isSalesFeatureEnabled = useFullSalesEnabled();
  const hasSalesEnabled = useFullSalesEnabled();
  const { openBobjectDetails } = useBobjectDetails();
  const { openAddCompanyModal } = useAddCompany();
  const [openAddCompanyRelatedModal, setOpenAddCompanyRelatedModal] = useState(false);
  const {
    referencedBobjectsUrls,
    isTaskCompleted,
    shouldShowNavigation,
    finishNavigation,
    ...taskNavigation
  } = useTaskNavigationStorage();

  const getRelativeIds = () => {
    const ids = [];
    ids.push(contactBobjects?.company?.id?.objectId);
    contactBobjects?.leads?.forEach(lead => {
      ids.push(lead?.id?.objectId);
    });
    contactBobjects?.opportunities?.forEach(lead => ids.push(lead?.id?.objectId));
    return ids;
  };
  const { openCadenceControl } = useCadenceControl();
  const { openAddLead, openAddOpportunity, openAddLeadWithOpportunity } = useBobjectFormCreation();
  const { openSendToSalesModal } = useSendToSales();
  const { selectedLead: currentSelectedLead } = useSelectedLead();
  const {
    parentCompany,
    siblingCompanies,
    childCompanies,
    openEditModal,
    setOpenEditModal,
    setOpenEditChildModal,
    openEditChildModal,
  } = useParentCompany();

  const noRelatedCompanies =
    !siblingCompanies &&
    !parentCompany &&
    (!childCompanies || childCompanies?.data?.contents.length === 0);
  const [companyRelatedActive, setCompanyRelatedActive] = useState(false);
  const hasCompaniesRelated =
    parentCompany || (childCompanies && childCompanies?.data?.contents.length !== 0);
  const relatedCompanies =
    childCompanies?.data?.contents?.length +
    (parentCompany ? 1 : 0) +
    (siblingCompanies?.length || 0);
  const hasOpportunities =
    contactBobjects?.opportunities?.length && contactBobjects?.opportunities?.length > 0;
  const hasLeads = contactBobjects?.leads?.length && contactBobjects?.leads?.length > 0;

  const selectedLead = isLead(contactBobjects?.active)
    ? contactBobjects.leads.find(lead => lead.id.value === contactBobjects?.active?.id.value)
    : null;

  const selectedOpportunity = isOpportunity(contactBobjects?.active)
    ? contactBobjects.opportunities.find(
        opportunity => opportunity.id.value === contactBobjects?.active?.id.value,
      )
    : null;

  const isActiveCompanyTab = isCompanyPage(pathname) && !isOpportunityPage(pathname);

  const isLeadWithoutCompany = isLeadPage(pathname) && !contactBobjects?.company;
  const isLeadWithOpportunity =
    isLead(contactBobjects?.active) && contactBobjects?.opportunities?.length > 0;

  const isOpportunityWithoutCompany = isOpportunityPage(pathname) && !contactBobjects?.company;
  const isOpportunityWithoutCompanyWithoutLeads =
    isOpportunityWithoutCompany && !contactBobjects?.leads;
  const isOpportunityWithLeads = isOpportunityPage(pathname) && contactBobjects?.leads?.length > 0;
  const activeBobject = contactBobjects?.active;
  const activeBobjectType = activeBobject?.id.typeName;
  const activeBobjectStage = getFieldByLogicRole(
    activeBobject,
    (FIELDS_LOGIC_ROLE[activeBobjectType] as CompanyOrLeadLR)?.STAGE,
  );
  const isCompanyOrLead = isCompany(activeBobject) || isLead(activeBobject);
  const isCompanyInSales =
    getFieldByLogicRole(contactBobjects?.company, COMPANY_FIELDS_LOGIC_ROLE?.STAGE)
      ?.valueLogicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
  const isLeadInSales =
    contactBobjects?.leads &&
    getFieldByLogicRole(contactBobjects?.leads[0], LEAD_FIELDS_LOGIC_ROLE?.STAGE)
      ?.valueLogicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const isStageSales =
    [COMPANY_STAGE_LOGIC_ROLE.SALES, LEAD_STAGE_LOGIC_ROLE.SALES].includes(
      activeBobjectStage?.valueLogicRole,
    ) ||
    ((isCompanyInSales || isLeadInSales) && activeBobjectType === BOBJECT_TYPES.OPPORTUNITY);

  const showSendToSalesButton = hasSalesEnabled && isCompanyOrLead && !isStageSales;

  const canCreateAnOpportunity = hasSalesEnabled ? isStageSales : true;

  const topHalfClasses = classNames(styles._topHalf__container, {
    [styles._topHalf__gradient]: shouldShowNavigation,
    [styles._topHalf__completed_gradient]: shouldShowNavigation && isTaskCompleted(),
  });

  const companyName = getValueFromLogicRole(
    contactBobjects?.company,
    COMPANY_FIELDS_LOGIC_ROLE.NAME,
  );

  const leadName = getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const opportunityName = getValueFromLogicRole(
    selectedOpportunity,
    OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  );
  const hasCompany = !!contactBobjects?.company;
  const showAddLeadButton = hasSalesEnabled
    ? !isLead(contactBobjects?.active) && !isOpportunityWithLeads
    : !isLeadWithoutCompany;
  const showAddOpportunityButton = hasSalesEnabled
    ? !isOpportunity(contactBobjects?.active)
    : !isLeadWithoutCompany;

  const handleBackButton = () => {
    const url = new URL(window.location.href);
    if (shouldShowNavigation) {
      finishNavigation();
    }
    if (previousUrl !== '' && previousUrl !== APP_CL_COMPANIES) {
      history.goBack();
    } else if (isLeadPage(url.href)) {
      history.push(APP_CL_LEADS);
    } else {
      history.push(APP_CL_COMPANIES);
    }
  };

  const handleCompanyLink = () => {
    setCompanyRelatedActive(false);
    if (contactBobjects?.company) {
      const companyUrl = companyIdUrl(contactBobjects?.company.id.objectId);
      history.push(companyUrl);
    }
  };

  const redirectTo = ({ response, bobjectType }: { response: any; bobjectType: BobjectType }) => {
    let id = response?.objectId;
    if (typeof response === 'string') id = response;
    const url = bobjectType === 'Company' ? companyIdUrl(id) : `${APP_CL_LEADS}/${id}`;
    if (url) {
      history.push(url);
    }
  };

  useEffect(() => {
    const urlArray = pathname.split('/');
    if (
      shouldShowNavigation &&
      referencedBobjectsUrls &&
      !Object.values(referencedBobjectsUrls)
        .map(ids => ids.id.objectId)
        ?.includes(urlArray[urlArray.length - 1]) &&
      !getRelativeIds()?.includes(urlArray[urlArray.length - 1])
    ) {
      finishNavigation();
    }
    setCompanyRelatedActive(false);
  }, [pathname]);

  useEffect(() => {
    if (noRelatedCompanies) {
      setCompanyRelatedActive(false);
    }
  }, [noRelatedCompanies]);
  const inboundTriggerRepo = useEntity('accountIntegrationTriggers')?.all();
  const reducedInboundTrigger = inboundTriggerRepo?.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: { id: curr.id, jsonConfig: JSON.parse(curr.jsonConfig) },
    }),
    {},
  );

  const salesforceConversionConfig =
    reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.convertLeads;

  return (
    <div className={styles._container}>
      <div className={topHalfClasses}>
        <div className={styles._bobjectName__container}>
          {companyName && (
            <div
              className={styles._company_name_container}
              onClick={() => {
                openBobjectDetails({ id: contactBobjects?.company?.id.value });
              }}
            >
              <Icon
                name="company"
                color={shouldShowNavigation ? 'white' : 'softBloobirds'}
                size={16}
              />
              <Text
                color={shouldShowNavigation ? 'white' : 'softBloobirds'}
                size="m"
                className={styles._bobjectName}
              >
                {companyName}
              </Text>
            </div>
          )}
          {leadName && (
            <div>
              <Icon name="person" color={shouldShowNavigation ? 'white' : 'softPeanut'} size={16} />
              <Text
                color={shouldShowNavigation ? 'white' : 'peanut'}
                size="m"
                className={styles._bobjectName}
              >
                {leadName}
              </Text>
            </div>
          )}
          {opportunityName && (
            <div>
              <Icon
                name="fileOpportunity"
                color={shouldShowNavigation ? 'white' : 'softPeanut'}
                size={16}
              />
              <Text
                color={shouldShowNavigation ? 'white' : 'peanut'}
                size="m"
                className={styles._bobjectName}
              >
                {opportunityName}
              </Text>
            </div>
          )}
        </div>
        {showSendToSalesButton && !shouldShowNavigation && (
          <div className={styles.sendSalesButton}>
            <WithTooltip
              isDisabled={
                (isCompany(contactBobjects?.active) && !hasLeads) ||
                (salesforceConversionConfig && !companyName)
              }
              title={
                salesforceConversionConfig && !companyName
                  ? 'As you are converting also in Salesforce the lead must have a company to be converted'
                  : 'You need at least one lead to "Send to Sales" the company'
              }
            >
              <Button
                onClick={() => {
                  const leads = contactBobjects?.leads;
                  openSendToSalesModal({
                    bobjectToSet: contactBobjects?.active,
                    leads: activeBobjectType === BOBJECT_TYPES.COMPANY ? leads : null,
                  });
                }}
                disabled={
                  (isCompany(contactBobjects?.active) && !hasLeads) ||
                  (salesforceConversionConfig && !companyName)
                }
                iconRight="fileOpportunity"
              >
                Send to Sales
              </Button>
            </WithTooltip>
          </div>
        )}
        {shouldShowNavigation && (
          <TaskNavigator
            finishNavigation={finishNavigation}
            taskNavigation={taskNavigation}
            isTaskCompleted={isTaskCompleted}
          />
        )}
      </div>
      <div className={styles._bottomHalf__container}>
        <IconButton
          color="bloobirds"
          name="arrowLeft"
          onClick={handleBackButton}
          size={16}
          dataTest="goBackButton"
        />
        <div className={styles._tab_container}>
          <NavigationTab
            onClick={handleCompanyLink}
            onAddButtonClick={() => {
              openAddCompanyModal({
                bobject: contactBobjects?.active,
                onSaveCallback: ({ response }) => redirectTo({ response, bobjectType: 'Company' }),
              });
            }}
            showAddButton={isLeadWithoutCompany || (hasSalesEnabled && isOpportunityWithoutCompany)}
            tab="Company"
            active={isActiveCompanyTab}
            dataTest="Navigation-Company"
            empty={hasSalesEnabled ? !hasCompany : false}
          />
        </div>
        <div className={styles._tab_container}>
          <Dropdown
            ref={refLeads}
            visible={visibleLeads}
            anchor={
              <NavigationTab
                onClick={() => {
                  if (hasLeads) {
                    setVisibleLeads(!visibleLeads);
                  }
                }}
                onAddButtonClick={() => {
                  if (hasSalesEnabled && (isOpportunity(activeBobject) || isLeadWithOpportunity)) {
                    openAddLeadWithOpportunity({
                      bobject: contactBobjects?.active,
                      onSuccess: ({ response }) =>
                        redirectTo({
                          response,
                          bobjectType: 'Lead',
                        }),
                    });
                  } else {
                    openAddLead({
                      bobject: contactBobjects?.company,
                      onSuccess: ({ response }) => redirectTo({ response, bobjectType: 'Lead' }),
                    });
                  }
                }}
                showAddButton={showAddLeadButton}
                tab="Leads"
                active={isLeadPage(pathname)}
                empty={!contactBobjects?.leads || !hasLeads}
                numberOfItems={contactBobjects?.leads?.length}
                dataTest="Navigation-Lead"
              />
            }
            arrow={false}
            position="bottom-start"
          >
            <LeadsDropdown
              toggleVisibility={() => setVisibleLeads(!visibleLeads)}
              leads={contactBobjects?.leads || []}
            />
          </Dropdown>
        </div>
        {isSalesFeatureEnabled && (
          <div className={styles._tab_container}>
            <Dropdown
              ref={refOpportunities}
              visible={visibleOpportunities}
              anchor={
                <NavigationTab
                  onClick={() => {
                    if (hasOpportunities) {
                      setVisibleOpportunities(!visibleOpportunities);
                    }
                  }}
                  onAddButtonClick={() =>
                    openAddOpportunity({
                      bobject: contactBobjects.active,
                      company: contactBobjects.company,
                      lead: currentSelectedLead,
                      onSuccess: openCadenceControl,
                      assignedTo: null,
                    })
                  }
                  showAddButton={showAddOpportunityButton}
                  tab="Opportunities"
                  active={isOpportunityPage(pathname)}
                  disabled={!canCreateAnOpportunity}
                  empty={!contactBobjects?.opportunities || !hasOpportunities}
                  dataTest="Navigation-Opportunity"
                  numberOfItems={
                    !isOpportunityWithoutCompanyWithoutLeads
                      ? contactBobjects?.opportunities?.length
                      : 0
                  }
                  showTooltip={
                    isSalesFeatureEnabled &&
                    [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD].includes(activeBobjectType)
                  }
                />
              }
              arrow={false}
              position="bottom-start"
            >
              <OpportunitiesDropdown
                toggleVisibility={() => setVisibleOpportunities(!visibleOpportunities)}
                opportunities={contactBobjects?.opportunities}
              />
            </Dropdown>
          </div>
        )}
        <div className={styles._tab_container}>
          <Dropdown
            ref={refCompanyParent}
            visible={visibleCompanyParent}
            anchor={
              <NavigationTab
                onClick={() => {
                  if (hasCompaniesRelated) {
                    setVisibleCompanyParent(true);
                    setCompanyRelatedActive(true);
                  }
                }}
                numberOfItems={relatedCompanies}
                onAddButtonClick={() => setOpenAddCompanyRelatedModal(!openAddCompanyRelatedModal)}
                showAddButton={!(isLeadWithoutCompany || isOpportunityWithoutCompany)}
                showChevron={!noRelatedCompanies}
                tab="Related Companies"
                active={companyRelatedActive}
                empty={noRelatedCompanies}
                dataTest="Navigation-Company-Related"
              />
            }
            arrow={false}
            position="bottom-start"
          >
            <CompaniesDropdown
              toggleDropdownVisibility={() => {
                setVisibleCompanyParent(false);
              }}
            />
          </Dropdown>
        </div>
      </div>
      <AddCompaniesRelatedModal
        openModal={openAddCompanyRelatedModal}
        handleCloseModal={() => setOpenAddCompanyRelatedModal(false)}
        companyName={companyName}
      />
      <AddCompanyRelation
        open={openEditModal}
        setOpen={setOpenEditModal}
        handleCompaniesRelatedModal={setOpenEditModal}
      />
      <DeleteCompaniesRelatedModal />
      <AddCompanyChildModal
        handleCompaniesRelatedModal={setOpenEditChildModal}
        open={openEditChildModal}
        setOpen={setOpenEditChildModal}
      />
    </div>
  );
};

export default NavigationBar;
