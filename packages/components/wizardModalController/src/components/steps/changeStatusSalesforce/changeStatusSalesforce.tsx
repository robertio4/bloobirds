import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  createToast,
  ModalContent,
  ModalFooter,
  ModalSection,
  Spinner,
} from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import {
  api,
  getValueFromLogicRole,
  isCompany,
  isLead,
  isOpportunity,
  getCurrentSalesforceStatusField,
  injectReferencesGetProcess,
  isContactSalesforce,
} from '@bloobirds-it/utils';
import { useWizardContext, WizardsModalParams } from '@bloobirds-it/wizard-modal-context';

import { useChangeStatusStepData } from '../../../hooks/useChangeStatusStepData';
import { useSalesforceStatusPicklistValue } from '../../../hooks/useSalesforceStatusPicklistValue';
import { AnimatedSidebar } from './animatedSidebar/animatedSidebar';
import { SalesforceStatusLoader } from './changeStatusLoader/changeStatusLoader';
import styles from './changeStatusSalesforce.module.css';
import { useRelatedBobjects } from './hooks/useRelatedBobjects';
import { SalesforceStatusSelector } from './salesforceStatusSelector/salesforceStatusSelector';
import { getSalesforceIdField } from './utils/changeStatusSalesforce.utils';

interface ChangeSalesforceStatusProps extends WizardsModalParams {
  handleNext?: (companyStatus: string, leadStatus: string) => void;
  handleSkip?: (openCadenceControlOnClose: boolean) => void;
}

const ChangeStatusSalesforce = ({
  handleBack,
  handleNext,
  handleSkip,
  buttonsConfig,
  wizardKey,
  machineContext,
}: ChangeSalesforceStatusProps) => {
  const { getWizardProperties, accountId } = useWizardContext();
  const { referenceBobject, handleOnSave } = getWizardProperties(wizardKey);
  const { t } = useTranslation('translation', {
    keyPrefix: 'wizards',
  });
  const mainObject =
    wizardKey === 'CONTACT_FLOW_OTO' && machineContext?.selectedOpportunityObject
      ? machineContext?.selectedOpportunityObject
      : referenceBobject;

  const [isSubmitting, setIsSubmitting] = useState(null);
  const [bobjectWithReferences, setBobjectWithReferences] = useState(null);
  const { changeStatusStepData, setChangeStatusStepData } = useChangeStatusStepData();
  const { getOpportunityRelated, getCompanyRelated, getLeadRelated } = useRelatedBobjects();
  const isB2CAccount = useIsB2CAccount();
  const methods = useForm({ shouldUnregister: false });
  const { handleSubmit } = methods;
  const {
    companyCrmStatusValues,
    leadCrmStatusValues,
    opportunityCrmStatusValues,
  } = useSalesforceStatusPicklistValue();
  const referenceBobjectType = mainObject?.id?.typeName;
  const isCompanyReference = isCompany(mainObject);
  const isLeadReference = isLead(mainObject);
  const isOpportunityReference = isOpportunity(mainObject);
  const companyRelated = !isCompanyReference && getCompanyRelated(bobjectWithReferences);
  const leadRelated = isOpportunityReference && getLeadRelated(bobjectWithReferences);
  const opportunityRelated =
    !isOpportunityReference && getOpportunityRelated(mainObject, accountId);
  const showCompanyStatusSelector =
    !buttonsConfig?.salesforceStatusShowOnlyMainObject &&
    (isLeadReference || isOpportunityReference) &&
    companyRelated;
  const showLeadStatusSelector =
    !buttonsConfig?.salesforceStatusShowOnlyMainObject &&
    isOpportunityReference &&
    !companyRelated &&
    leadRelated;
  const showOpportunityStatusSelector =
    !buttonsConfig?.salesforceStatusShowOnlyMainObject && isLeadReference && opportunityRelated;

  const { crmObject } = getSalesforceIdField(
    mainObject,
    wizardKey === 'CONTACT_FLOW_OTO' && buttonsConfig?.checkExistingOpportunity,
    machineContext?.selectedOpportunityObject,
  );

  const showSkipButton =
    buttonsConfig?.showSkipButton != undefined ? buttonsConfig?.showSkipButton : false;
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : false;
  const openCadenceControlOnClose =
    buttonsConfig?.openCadenceOnSkip != undefined ? buttonsConfig?.openCadenceOnSkip : false;

  function getBobjectWithReferences(bobjectId: string, changeStatusStepData) {
    if (bobjectId && changeStatusStepData) {
      api.get(`/bobjects/${bobjectId}/form?injectReferences=true`).then(data => {
        const bobjectWithReferences = injectReferencesGetProcess(data?.data);
        setBobjectWithReferences(bobjectWithReferences);
        const crmStatusValues = getReferenceObjectStatusValues(bobjectWithReferences);
        updateStatus(bobjectWithReferences, crmStatusValues, changeStatusStepData);
      });
    }
  }

  const getReferenceObjectStatusValues = bobjectWithReferences => {
    let statusPicklistValues;
    if (isCompanyReference) {
      statusPicklistValues = companyCrmStatusValues;
    } else if (isLeadReference) {
      const isContact =
        wizardKey === 'CONTACT_FLOW_OTO' && buttonsConfig?.checkExistingOpportunity
          ? machineContext?.selectedOpportunityObject
          : isContactSalesforce(bobjectWithReferences);
      statusPicklistValues = isContact
        ? leadCrmStatusValues?.filter(status => status.salesforceObjectType === 'Contact')
        : leadCrmStatusValues?.filter(status => status.salesforceObjectType === 'Lead');
    } else {
      statusPicklistValues = opportunityCrmStatusValues;
    }

    return statusPicklistValues;
  };

  const bobjectStatuses = getReferenceObjectStatusValues(bobjectWithReferences);
  const updateStatus = statusInfo => {
    if (!statusInfo) return;
    const newStatusData = Object.entries(statusInfo).reduce(
      (acc, curr) => {
        const [bobjectType, { bobject, statusValues, statusKey }] = curr;
        if (bobject && bobjectType) {
          const sfdcStatusField = getCurrentSalesforceStatusField(bobject);
          if (sfdcStatusField) {
            const statusName = statusValues?.find(
              status => status.salesforceLabel === sfdcStatusField.value,
            )?.name;
            if (
              !changeStatusStepData[statusKey] ||
              changeStatusStepData[statusKey] !== statusName
            ) {
              return { ...acc, [statusKey]: statusName };
            } else {
              return { ...acc, [statusKey]: changeStatusStepData[statusKey] };
            }
          }
        }
        return acc;
      },
      { companyStatus: undefined, leadStatus: undefined, opportunityStatus: undefined },
    );
    setChangeStatusStepData(newStatusData);
  };

  useEffect(() => {
    getBobjectWithReferences(mainObject?.id?.value, changeStatusStepData);
  }, [mainObject?.id?.value]);

  function getSampleBobject(bobject) {
    return Array.isArray(bobject) ? bobject[0] : bobject;
  }

  useEffect(() => {
    if (changeStatusStepData) {
      const statusInfo = {
        [BobjectTypes.Company]: {
          bobject: getSampleBobject(companyRelated),
          statusValues: companyCrmStatusValues,
          statusKey: 'companyStatus',
        },
        [BobjectTypes.Lead]: {
          bobject: isLeadReference ? referenceBobject : getSampleBobject(leadRelated),
          statusValues: leadCrmStatusValues,
          statusKey: 'leadStatus',
        },
        [BobjectTypes.Opportunity]: {
          bobject: isOpportunityReference ? referenceBobject : getSampleBobject(opportunityRelated),
          statusValues: opportunityCrmStatusValues,
          statusKey: 'opportunityStatus',
        },
      };
      if (
        Object.values(statusInfo).reduce((acc, { bobject }) => {
          if (bobject) {
            return acc + 1;
          }
          return acc;
        }, 0) > 0
      ) {
        updateStatus(statusInfo);
      }
    }
  }, [companyRelated, leadRelated, opportunityRelated?.id?.value]);

  useEffect(() => {
    const salesforceId = referenceBobject?.salesforceId;
    const valuesToMap = new Map();
    if (buttonsConfig?.salesforceStatusFields?.length > 0) {
      buttonsConfig?.salesforceStatusFields?.forEach(salesforceField => {
        const sobjectName = salesforceField?.objectType;
        const sobjectFields = salesforceField?.statusRestrictions?.flatMap(status =>
          status?.fields.map(({ field }) => field),
        );
        api
          .post('/utils/service/salesforce/query', {
            query: `SELECT ${sobjectFields.join(
              ',',
            )} FROM ${sobjectName} WHERE Id='${salesforceId}'`,
          })
          .then(data => {
            const sobjectValues = data?.data?.reduce((acc, field) => {
              if (field) {
                const fieldValues = Object.entries(field)?.filter(
                  ([_, value]) => typeof value === 'string',
                );
                return fieldValues?.reduce((acc, [key, value]) => {
                  return {
                    ...acc,
                    [key]: value,
                  };
                }, {});
              } else {
                return acc;
              }
            }, {});
            const statusFields = salesforceField?.statusRestrictions?.reduce((acc, status) => {
              return {
                ...acc,
                [status.salesforceStatus]: status?.fields?.reduce((acc, fieldValue) => {
                  return { ...acc, [fieldValue.field]: sobjectValues?.[fieldValue.field] };
                }, {}),
              };
            }, {});
            valuesToMap.set(sobjectName, statusFields);
            methods.setValue('salesforceLiveFieldsValues', valuesToMap);
          });
      });
    }
  }, []);
  const buildDataToSend = data => {
    const dataToSend = {};

    const insertData = (relatedObject, statusKey, bobjectType) => {
      const objectToSend =
        referenceBobjectType === bobjectType ? bobjectWithReferences : relatedObject;
      if (changeStatusStepData[statusKey] && objectToSend) {
        const statusField = getCurrentSalesforceStatusField(objectToSend);

        const { crmId, crmObject } = getSalesforceIdField(
          objectToSend,
          wizardKey === 'CONTACT_FLOW_OTO' && buttonsConfig?.checkExistingOpportunity,
          machineContext?.selectedOpportunityObject,
        );
        const crmStatusValue = changeStatusStepData[statusKey];
        const extraFields = data?.[crmObject]?.[crmStatusValue];
        if (crmStatusValue !== statusField?.value || extraFields) {
          dataToSend[crmObject] = {
            bobjectId: objectToSend?.id?.value,
            crmStatusValue,
            crmObject,
            crmId: getValueFromLogicRole(objectToSend, crmId),
            extraFields,
          };
        }
      }
    };

    insertData(companyRelated, 'companyStatus', BobjectTypes.Company);
    insertData(leadRelated, 'leadStatus', BobjectTypes.Lead);
    insertData(opportunityRelated, 'opportunityStatus', BobjectTypes.Opportunity);
    return dataToSend;
  };

  const saveAndNext = data => {
    setIsSubmitting(true);
    const dataToSend = buildDataToSend(data);
    if (dataToSend) {
      api
        .post(`/utils/crmStatus/updateCrmStatus`, {
          fieldsToUpdate: dataToSend,
          crm: 'SALESFORCE',
          accountId: accountId,
        })
        .then(() => {
          createToast({
            message: t('steps.changeSalesforceStatus.toasts.success'),
            type: 'success',
          });
          setIsSubmitting(false);
          handleOnSave?.();
          handleNext(changeStatusStepData.companyStatus, changeStatusStepData.leadStatus);
        })
        .catch(e => {
          createToast({
            message: t('steps.changeSalesforceStatus.toasts.errorUpdating', {
              error: e?.response?.data?.message ? `: ${e?.response?.data?.message}` : '.',
            }),
            type: 'error',
          });
          setIsSubmitting(false);
        });
    } else {
      handleNext(changeStatusStepData.companyStatus, changeStatusStepData.leadStatus);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ModalSection size="l" title={`Do you want to update the status?`}>
            {bobjectWithReferences ? (
              <>
                <div className={styles._section__wrapper}>
                  <div className={styles._content__wrapper}>
                    <SalesforceStatusSelector
                      statusList={bobjectStatuses}
                      bobject={mainObject}
                      changeStatusStepData={changeStatusStepData}
                      setChangeStatusStepData={setChangeStatusStepData}
                      onClick={() => {
                        methods.unregister(crmObject);
                      }}
                    />

                    {!isB2CAccount && showCompanyStatusSelector && (
                      <SalesforceStatusSelector
                        statusList={companyCrmStatusValues}
                        bobject={companyRelated}
                        changeStatusStepData={changeStatusStepData}
                        setChangeStatusStepData={setChangeStatusStepData}
                      />
                    )}
                    {showLeadStatusSelector && (
                      <SalesforceStatusSelector
                        statusList={leadCrmStatusValues?.filter(
                          status => status.salesforceObjectType === 'Lead',
                        )}
                        bobject={leadRelated}
                        changeStatusStepData={changeStatusStepData}
                        setChangeStatusStepData={setChangeStatusStepData}
                      />
                    )}
                    {showOpportunityStatusSelector && (
                      <SalesforceStatusSelector
                        statusList={opportunityCrmStatusValues}
                        bobject={opportunityRelated}
                        changeStatusStepData={changeStatusStepData}
                        setChangeStatusStepData={setChangeStatusStepData}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <SalesforceStatusLoader />
            )}
          </ModalSection>
          <AnimatedSidebar
            changeStatusStepData={changeStatusStepData}
            salesforceStatusFieldsRequirements={buttonsConfig?.salesforceStatusFields}
            crmObject={crmObject}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {hasPreviousStep && (
            <Button variant="clear" onClick={handleBack} className={styles.back_button}>
              {buttonsConfig?.previousButtonTitle || t('common.back')}
            </Button>
          )}
          {showSkipButton && (
            <Button
              variant="secondary"
              onClick={() => handleSkip(openCadenceControlOnClose)}
              className={styles.skip_button}
            >
              {t('common.skipWizard')}
            </Button>
          )}
          {!buttonsConfig?.hideSaveButton && (
            <Button dataTest="Form-Save" onClick={handleSubmit(saveAndNext)}>
              {isSubmitting ? (
                <Spinner name="loadingCircle" color="white" />
              ) : (
                buttonsConfig?.nextButtonTitle || t('common.saveAndClose')
              )}
            </Button>
          )}
        </div>
      </ModalFooter>
    </FormProvider>
  );
};

export default ChangeStatusSalesforce;
