import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { FormGroup, FormLabel } from '@bloobirds-it/bobjects';
import { Button, Icon, IconType, Text, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import {
  useIsB2CAccount,
  useIsPersonAccountAsAccount,
  useOtoSyncWithRelatedObjects,
  useSalesforceDataModel,
  useIsAutoSyncFromDifferentOwner,
} from '@bloobirds-it/hooks';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  ExtensionCompany,
  ExtensionOpportunity,
  LEAD_FIELDS_LOGIC_ROLE,
  LeadFieldType,
  LinkedInCompany,
  LinkedInLead,
  MessagesEvents,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SalesforceDataModelResponse,
} from '@bloobirds-it/types';
import { removeDulpicatedBobjects, baseUrls } from '@bloobirds-it/utils';
import { motion, useAnimation } from 'framer-motion';
import mixpanel from 'mixpanel-browser';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { useSyncWithParentsSalesforceSobject } from '../../../hooks/useSyncSalesforceSobject';
import { api } from '../../../utils/api';
import { SALESFORCE } from '../../../utils/integrations';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowGradientFooter,
} from '../bubbleWindow/bubbleWindow';
import ContactViewHeader from '../contactView/components/contactViewHeader/contactViewHeader';
import { useExtensionContext } from '../context';
import { DuplicatedBobjectsPage } from '../linkedInScreens/duplicatedBobjectsPage';
import NavigateMessageSalesforce from '../linkedInScreens/navigateMessageSalesforce';
import Loading from '../loadingIndicator/loadingIndicator';
import { AccountField } from './accountField/accountField';
import styles from './captureSalesforceForm.module.css';
import { CompanyField } from './companyField/companyField';
import { ConfirmationModal } from './confirmationModal/confirmationModal';

interface CaptureSalesforceLeadForm {
  defaultSobjectType: 'Lead' | 'Account' | 'Contact' | 'Opportunity';
  sobjectId: string;
  afterSyncing: (bobject: ExtensionCompany | LinkedInLead | ExtensionOpportunity) => void;
  syncLead?: boolean;
}

interface FormValues {
  companyName: string;
  createCompany: boolean;
  syncAccount: boolean;
  fields: {
    [id: string]: string;
  };
}

const picklistFieldTypes = [
  'PICKLIST',
  'MULTI_PICKLIST',
  'GLOBAL_PICKLIST',
  'MULTI_GLOBAL_PICKLIST',
];

const HIDED_FIELDS_LOGIC_ROLE = [
  LEAD_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.SURNAME,
  COMPANY_FIELDS_LOGIC_ROLE.COMPANY_PARENT,
  COMPANY_FIELDS_LOGIC_ROLE.PERSON_CONTACT_ID,
  SALESFORCE.LEAD_ID_FIELD,
  SALESFORCE.ACCOUNT_ID_FIELD,
  SALESFORCE.OPPORTUNITY_ID_FIELD,
  SALESFORCE.CONTACT_ID_FIELD,
];

const ASSIGNED_TO_FIELDS_LOGIC_ROLE = [
  LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
  COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
];

const bobjectFromSobject = {
  Lead: 'Lead',
  Contact: 'Lead',
  Account: 'Company',
  Opportunity: 'Opportunity',
};

const variants = {
  start: () => ({
    x: [0, 3, -3],
    transition: {
      repeat: 4,
      duration: 0.1,
    },
  }),
  reset: {
    rotate: 0,
  },
};

const CaptureSalesforceForm = ({
  defaultSobjectType,
  sobjectId,
  afterSyncing,
  syncLead = false,
}: CaptureSalesforceLeadForm) => {
  const { data, mutate } = useSyncWithParentsSalesforceSobject({
    sobjectType: defaultSobjectType,
    sobjectId,
  });

  // Why this silly variable, because before it was like this const sobjectType = isPersonAccount ? 'Contact' : defaultSobjectType;
  const sobjectType = defaultSobjectType;
  const bobjectType = bobjectFromSobject[sobjectType];
  const mainObject = data?.[bobjectType?.toLowerCase()];
  const accountRelatedData = data?.company;
  const { createToast } = useToasts();
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const controls = useAnimation();
  const {
    useGetDataModel,
    useGetSettings,
    setSalesforceSyncMutate,
    useGetIsLoading,
    setIsLoading,
    setDuplicatesDetected,
    useGetDuplicatesDetected,
    refreshActiveBobjectContext,
    setActiveBobject,
  } = useExtensionContext();
  const isLoading = useGetIsLoading();
  const { setCreateLead, setSyncLead } = useCreationForm();
  const { t } = useTranslation('translation', {
    keyPrefix: 'extension.salesforcePages.captureSalesforceForm',
  });
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const duplicatesDetected = useGetDuplicatesDetected();
  const syncAutomatically = settings?.user?.autoSyncObjectsSalesforce;
  const isAccountAdmin = settings?.user?.accountAdmin;
  const activeUserId = settings?.user?.id;
  const isLead = sobjectType === 'Lead';
  const isContact = sobjectType === 'Contact';
  const isAccount = sobjectType === 'Account';
  const isOpportunity = sobjectType === 'Opportunity';
  const [duplicates, setDuplicates] = useState([]);
  const sfdcDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const hasOtoSyncWithRelatedObjectsFlag = useOtoSyncWithRelatedObjects(dataModel?.getAccountId());
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const isB2CAccount = useIsB2CAccount();
  const isAutoSyncFromDifferentOwner = useIsAutoSyncFromDifferentOwner();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fields: {},
      companyName: '',
      createCompany: false,
    },
  });

  const assignedToFieldId = {
    company: dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id,
    lead: dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id,
    opportunity: dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO)?.id,
  };

  // Account related data, only for Contact and Opportunity cases, the || on the next line is only for Lead cases
  const accountRelatedAssignedToFieldValue =
    accountRelatedData?.rawBobject?.[assignedToFieldId?.company];
  const accountRelatedHasAssignedToField = !!accountRelatedAssignedToFieldValue;
  const accountRelatedIsDifferentAssignedTo =
    accountRelatedHasAssignedToField &&
    !!activeUserId &&
    accountRelatedAssignedToFieldValue !== activeUserId;
  const accountRelatedSalesforceOwner = sfdcDataModel?.salesforceUsers?.find(
    user => user?.salesforceUserId === accountRelatedData?.sobject?.['OwnerId'],
  );
  const isPersonAccount = accountRelatedData?.sobject?.IsPersonAccount;

  // Main object data
  const leadNameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.NAME);
  const salesforceOwner = sfdcDataModel?.salesforceUsers?.find(
    user => user?.salesforceUserId === mainObject?.sobject?.['OwnerId'],
  );
  const assignedToFieldValue =
    mainObject?.rawBobject?.[assignedToFieldId?.[mainObject?.id?.typeName?.toLowerCase()]];
  const hasAssignedToField = !!assignedToFieldValue;
  const isDifferentAssignedTo =
    hasAssignedToField &&
    !!activeUserId &&
    assignedToFieldValue !== activeUserId &&
    !isAutoSyncFromDifferentOwner;
  const leadSurnameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.SURNAME);
  const leadCompanyField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.COMPANY);
  const companyNameField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const companyWebsiteField = dataModel?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.WEBSITE);
  const oppNameField = dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  const bloobirdsAssignedToName = dataModel?.findValueById(assignedToFieldValue)?.name;
  const hasLeadNameOrSurname =
    mainObject?.rawBobject?.[leadNameField?.id] || mainObject?.rawBobject?.[leadSurnameField?.id];

  // Other variables
  const mappingUrl = `${
    baseUrls[process.env.NODE_ENV]
  }/app/account-settings/integration/salesforce/mapping`;
  const baseUrl = baseUrls[process.env.NODE_ENV];

  // Filling form data with sync endpoint result
  useEffect(() => {
    const { fields: currentFields, createCompany } = getValues();

    reset({
      createCompany,
      companyName: mainObject?.sobject?.['Company'],
      fields: {
        ...currentFields,
        ...mainObject?.rawBobject,
      },
    });
  }, [data]);

  useEffect(() => {
    setSalesforceSyncMutate(() => mutate());
  }, []);

  const companyId = watch(`fields.${leadCompanyField?.id}`);
  const createCompany = watch('createCompany');
  const syncAccount = watch('syncAccount');

  const saveButtonMessage = useMemo(() => {
    if (isContact || isOpportunity) {
      return isContact ? t('saveContactIn') : isOpportunity ? t('saveOpportunityIn') : '';
    }
    if (isAccount) {
      return t('saveAccountIn');
    }
    if (createCompany || syncAccount) {
      return t('saveLeadIn');
    }
    if (companyId) {
      return t('saveLeadToCompanyIn');
    }
    return t('saveLeadIn');
  }, [companyId, createCompany, data, syncAccount, accountRelatedData]);

  const viewPerSobjectType = {
    Lead: {
      title: hasLeadNameOrSurname
        ? `${mainObject?.rawBobject?.[leadNameField?.id] || ''} ${
            mainObject?.rawBobject?.[leadSurnameField?.id] || ''
          }`
        : t('untitledLead'),
      icon: 'person' as IconType,
      subtitle: null,
    },
    Contact: {
      title: hasLeadNameOrSurname
        ? `${mainObject?.rawBobject?.[leadNameField?.id] || ''} ${
            mainObject?.rawBobject?.[leadSurnameField?.id] || ''
          }`
        : t('untitledLead'),
      icon: 'person' as IconType,
      subtitle: null,
    },
    Account: {
      title: mainObject?.rawBobject?.[companyNameField?.id] || t('untitledAccount'),
      subtitle: mainObject?.rawBobject?.[companyWebsiteField?.id],
      icon: 'company' as IconType,
    },
    Opportunity: {
      title: mainObject?.rawBobject?.[oppNameField?.id],
      icon: 'fileOpportunity' as IconType,
      subtitle: null,
    },
  };

  const companyField = {
    id: leadCompanyField?.id,
    logicRole: LEAD_FIELDS_LOGIC_ROLE.COMPANY,
    name: 'Company',
    order: leadCompanyField?.ordering,
    type: 'REFERENCE' as LeadFieldType,
    visible: true,
    required: false,
    enabled: true,
    values: [],
  };

  const syncWithRelatedObjects = async () => {
    try {
      const syncResponse = await api.post(
        `/utils/service/salesforce/syncSobjectWithParents/${sobjectType}/${sobjectId}`,
        {
          params: {
            returnRepresentation: true,
          },
        },
      );
      if (afterSyncing) {
        setCreateLead(false);
        setSyncLead(false);
        afterSyncing(syncResponse?.data);
      }

      if (
        sobjectType == 'Account' &&
        isPersonAccountAsAccount &&
        isB2CAccount &&
        syncResponse?.data?.salesforceId != null &&
        syncResponse?.data?.personContactId != null
      ) {
        setActiveBobject(null);
        refreshActiveBobjectContext();
      } else {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: bobjectType },
          }),
        );
        setTimeout(() => {
          refreshActiveBobjectContext();
        }, 1500);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setIsLoading(false);
        setDuplicatesDetected(true);
        setDuplicates(error?.response?.data?.duplicates);
      } else {
        createToast({
          message: t('toast', { object: sobjectType || 'object' }),
          type: 'error',
        });
      }
    }
  };

  const save = async (data: FormValues) => {
    const isOppWithRelated = sobjectType === 'Opportunity' && data?.syncAccount;
    try {
      let possibleAccountIdCreated;
      if (
        data?.syncAccount &&
        accountRelatedData &&
        !accountRelatedData?.id?.objectId &&
        !isOppWithRelated
      ) {
        const accountResponse = await api.post('/linkedin/companies', {
          contents: {
            ...accountRelatedData?.rawBobject,
          },
          params: {
            returnRepresentation: true,
          },
        });
        if (accountResponse) {
          possibleAccountIdCreated = accountResponse?.data?.id?.value;
        }
      }
      const fetch = {
        lead: async () =>
          await api.post('/linkedin/leads', {
            fields: {
              ...data.fields,
              [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId
                ? accountRelatedData?.id?.value
                : possibleAccountIdCreated,
            },
            companyName: syncAccount ? null : data.companyName,
            createCompany: syncAccount ? false : data.createCompany,
          }),
        contact: async () =>
          await api.post('/linkedin/leads', {
            fields: {
              ...data.fields,
              [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId
                ? accountRelatedData?.id?.value
                : possibleAccountIdCreated,
            },
            companyName: null,
            createCompany: false,
          }),
        account: async () =>
          await api.post('/linkedin/companies', {
            contents: {
              ...data.fields,
            },
            params: {
              returnRepresentation: true,
            },
          }),
        opportunity: async () => {
          return isOppWithRelated
            ? await api.post(
                `/utils/service/salesforce/syncSobjectWithParents/${sobjectType}/${sobjectId}`,
                {
                  params: {
                    returnRepresentation: true,
                  },
                },
              )
            : await api.post('/linkedin/opportunities', {
                contents: {
                  ...data.fields,
                  [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: accountRelatedData?.id?.objectId
                    ? accountRelatedData?.id?.value
                    : possibleAccountIdCreated,
                },
                params: {
                  returnRepresentation: true,
                },
              });
        },
      };

      const response = await fetch[sobjectType?.toLowerCase()]();
      if (sobjectType?.toLowerCase() === 'lead') {
        mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_LEAD_OTO);
      }
      if (afterSyncing) {
        setCreateLead(false);
        setSyncLead(false);
        afterSyncing(response?.data);
      }
      if (isOppWithRelated) {
        setTimeout(() => {
          refreshActiveBobjectContext();
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        setIsLoading(false);
        setDuplicatesDetected(true);
        setDuplicates(error?.response?.data?.duplicates);
      } else {
        createToast({
          message: t('toast', { object: sobjectType || 'object' }),
          type: 'error',
        });
      }
    }
  };

  // Making the autosync magic
  const automaticallySync = async () => {
    if (hasOtoSyncWithRelatedObjectsFlag) {
      await syncWithRelatedObjects();
    } else {
      if (isLead) {
        if (accountRelatedData) {
          // This means the account has a Lead-Account relation
          const values = getValues()?.fields;
          save({
            createCompany: false,
            companyName: null,
            syncAccount: true,
            fields: {
              ...values,
            },
          });
        } else {
          // This means there's no Lead-Account relation, so we have to see it company has exact match or not
          const companyName = mainObject?.sobject?.['Company'];
          if (companyName) {
            const companies = await api.get<Array<LinkedInCompany>>('/linkedin/search/companies', {
              params: { name: companyName },
            });
            const company = companies?.data.find(company => company.name === companyName);
            if (company) {
              const values = getValues()?.fields;
              save({
                createCompany: false,
                syncAccount: false,
                companyName,
                fields: {
                  ...values,
                  [leadCompanyField?.id]: company?.id?.value,
                },
              });
            } else {
              save({
                ...getValues(),
                createCompany: true,
              });
            }
          } else {
            save(getValues());
          }
        }
      } else if (isAccount || isContact || isOpportunity) {
        const values = getValues()?.fields;
        save({
          createCompany: false,
          companyName: null,
          syncAccount: !isAccount,
          fields: {
            ...values,
          },
        });
      }
    }
  };

  const allowSavingWithOrWithoutAssignedTo =
    hasAssignedToField || isPersonAccount || isAutoSyncFromDifferentOwner;

  useEffect(() => {
    if (data && syncAutomatically && allowSavingWithOrWithoutAssignedTo && !isDifferentAssignedTo) {
      automaticallySync();
    }
  }, [allowSavingWithOrWithoutAssignedTo, data]);

  useEffect(() => {
    if (syncLead && data) {
      automaticallySync();
    }
  }, [syncLead, data]);

  useEffect(() => {
    controls?.start('start');
  }, []);

  if (!isLead && !isAccount && !isOpportunity && !isContact) {
    return <NavigateMessageSalesforce />;
  }
  if (!data || isLoading) {
    return <Loading />;
  }

  // To avoid a flicker when having the sync automatically setting
  if (syncAutomatically && allowSavingWithOrWithoutAssignedTo && !isDifferentAssignedTo) {
    const filteredDuplicates = removeDulpicatedBobjects(duplicates?.map(d => d?.bobject) || []);

    return duplicatesDetected ? (
      <DuplicatedBobjectsPage bobjects={filteredDuplicates} sobjectId={sobjectId} />
    ) : (
      <Loading />
    );
  }

  const isAssignedToGroupUser = mainObject?.sobject?.['OwnerId']?.slice(0, 3) === '00G';

  if (syncLead) {
    return <Loading />;
  }

  return (
    <BubbleWindow>
      <>
        <div>
          <ContactViewHeader
            onlyHeader={true}
            title={viewPerSobjectType[sobjectType]?.title}
            subtitle={viewPerSobjectType[sobjectType]?.subtitle}
            icon={viewPerSobjectType[sobjectType]?.icon}
          />
        </div>
        <BubbleWindowContent>
          <form className={styles.formContainer}>
            {!allowSavingWithOrWithoutAssignedTo && (
              <>
                <FormGroup>
                  <FormLabel>{t('assignedTo')}</FormLabel>
                  <span className={styles.tooltip_container}>
                    <Tooltip title={t('tooltipNotMapped', { sobjectType })} position="top">
                      <Icon name="alertTriangle" color="banana" />
                    </Tooltip>
                  </span>
                </FormGroup>
                <motion.div
                  className={styles.callout}
                  variants={variants}
                  animate={controls}
                  id="callout-bb-assigned-to"
                >
                  <Text size="xs" color="peanut">
                    {t('recordNotSynced')}
                    {!isAssignedToGroupUser ? (
                      <>
                        <b>
                          {salesforceOwner?.salesforceUserName || mainObject?.sobject?.['OwnerId']}
                        </b>{' '}
                        {t('notMapped')}
                        {isAccountAdmin && (
                          <a
                            color="var(--bloobirds)"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              window.open(
                                `${baseUrl}/app/account-settings/integration/salesforce/users`,
                                '_blank',
                              )
                            }
                          >
                            {t('reviewMapped')}
                          </a>
                        )}
                      </>
                    ) : (
                      <Trans i18nKey="extension.salesforcePages.captureSalesforceForm.assignedToGroup" />
                    )}
                  </Text>
                </motion.div>
              </>
            )}
            {(isContact || isOpportunity || isLead) && accountRelatedData?.id?.objectId && (
              <FormGroup key={accountRelatedData?.id?.objectId}>
                <FormLabel>{t('account')}</FormLabel>
                <Text size="s" color="peanut" className={styles.ellipsis}>
                  {accountRelatedData?.name || t('untitledCompany')}
                </Text>
              </FormGroup>
            )}
            {data &&
              mainObject?.rawBobject &&
              Object.keys(mainObject?.rawBobject)?.map(fieldId => {
                const value = mainObject?.rawBobject?.[fieldId];
                const field = dataModel?.findFieldById(fieldId);
                if (HIDED_FIELDS_LOGIC_ROLE.includes(field?.logicRole)) {
                  return null;
                }
                const showAssignedAlert =
                  ASSIGNED_TO_FIELDS_LOGIC_ROLE.includes(field?.logicRole) && isDifferentAssignedTo;
                const fieldLabel = field?.name;
                const isPicklist = picklistFieldTypes.includes(field?.fieldType);
                const fieldValue = isPicklist
                  ? dataModel?.findValueById(value)?.name
                  : typeof value === 'string'
                  ? value
                  : t('empty');

                return (
                  <FormGroup key={fieldId}>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <div className={showAssignedAlert && styles.with_assigned_value}>
                      <Text
                        size="s"
                        color={fieldValue ? 'peanut' : 'softPeanut'}
                        className={styles.ellipsis}
                      >
                        {fieldValue || t('empty')}
                      </Text>
                      {showAssignedAlert && (
                        <Tooltip title={t('tooltipOwner', { sobjectType })} position="top">
                          <Icon name="alertTriangle" color="banana" />
                        </Tooltip>
                      )}
                    </div>
                  </FormGroup>
                );
              })}
          </form>
          {isAccountAdmin && (
            <div className={styles.extraFormInfo}>
              <Text size="xs" color="softPeanut" align="center">
                {t('missingInfo')}
              </Text>
              <span onClick={() => window.open(mappingUrl, '_blank')}>
                <Text size="xs" color="bloobirds" align="center">
                  {t('mapMoreFields')}
                  <Icon name="externalLink" size={16} />
                </Text>
              </span>
            </div>
          )}
        </BubbleWindowContent>
        {(isContact || isOpportunity || isLead) &&
          !accountRelatedData?.id?.objectId &&
          accountRelatedData && (
            <BubbleWindowFooter className={styles.company_footer}>
              <span>
                <AccountField
                  control={control}
                  accountName={accountRelatedData?.rawBobject?.[companyNameField?.id]}
                  hasDifferentAssignedTo={accountRelatedIsDifferentAssignedTo}
                  salesforceOwnerName={accountRelatedSalesforceOwner?.salesforceUserName}
                  hasBloobirdsAssignedTo={!!accountRelatedAssignedToFieldValue}
                  sobjectType={sobjectType}
                />
              </span>
            </BubbleWindowFooter>
          )}
        {isLead && !accountRelatedData && (
          <BubbleWindowFooter className={styles.company_footer}>
            <span className={styles.companyField}>
              <CompanyField
                style="gradient"
                key={companyField?.id}
                control={control}
                {...companyField}
              />
            </span>
          </BubbleWindowFooter>
        )}
        <BubbleWindowGradientFooter>
          <div className={styles.footer_container}>
            <Text size="xs" color="white" className={styles.wizardStartCadenceTitle} weight="bold">
              {t('nextStep')}
            </Text>
            <span onClick={() => !allowSavingWithOrWithoutAssignedTo && controls.start('start')}>
              <Button
                expand
                disabled={!allowSavingWithOrWithoutAssignedTo || isSubmitting}
                onClick={() => {
                  isDifferentAssignedTo ? setConfirmationModal(true) : handleSubmit(save)();
                }}
                variant="tertiary"
                iconRight="bloobirds"
                className={styles.button}
              >
                {saveButtonMessage}
              </Button>
            </span>
          </div>
        </BubbleWindowGradientFooter>
      </>
      {confirmationModal && (
        <ConfirmationModal
          onClose={() => setConfirmationModal(false)}
          onSave={() => {
            handleSubmit(save)();
            setConfirmationModal(false);
          }}
          sobjectType={sobjectType}
          assignedName={bloobirdsAssignedToName}
        />
      )}
    </BubbleWindow>
  );
};

export default CaptureSalesforceForm;
