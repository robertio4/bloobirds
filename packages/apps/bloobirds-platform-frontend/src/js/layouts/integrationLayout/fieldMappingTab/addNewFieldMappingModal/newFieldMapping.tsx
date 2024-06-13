import React, { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalSection,
  Callout,
  Select,
  Item,
  Section,
  useToasts,
  Spinner,
  Checkbox,
  Tooltip,
  Icon,
} from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import {
  CRM,
  CRM_DISPLAY_NAME,
  SYNC_RULE,
  TRIGGER_MAPPING_NAMES,
} from '../../../../constants/integrations';
import { useActiveUser } from '../../../../hooks';
import { useFullSalesEnabled, useInboundHubspotEnabled } from '../../../../hooks/useFeatureFlags';
import { RestApi } from '../../../../misc/api/rest';
import SyncRuleCheckbox from './SyncRuleCheckbox/SyncRuleCheckbox';
import { checkRelatedMapping, syncRules } from './newFielMapping.utils';
import styles from './newFieldMapping.module.css';
import {
  BobjectFieldType,
  NewFieldMappingsModal,
  TriggerMappingType,
} from './newFieldMappings.types';

function fetchMappings() {
  return api.get('/utils/triggerMappings').then(response => {
    return response.data;
  });
}

const NewFieldMapping = ({
  bobjectFields,
  customMappings,
  bobjectTypes,
  customMap,
  open,
  handleOpen,
  handleRefreshMappings,
  triggerMapping,
  mapping,
  crm,
  isFetching,
  crmObjectFields,
  setOrderingCustomMap,
}: NewFieldMappingsModal) => {
  const { data: triggerMappings } = useSWR<TriggerMappingType[]>('triggerMappings', fetchMappings);
  const relatedMappings = triggerMappings
    ?.find(({ name }) => name === mapping.name)
    ?.triggerMappingRelatedObject?.map(({ crmObjectLabel, crmRelationshipField }) => ({
      crmObjectLabel,
      relationshipField: crmRelationshipField,
    }));
  const salesforceDatamodel = useSalesforceDataModel();
  const parsedOptions: Record<string, any[]> = {
    [mapping.title]: crmObjectFields,
    ...(relatedMappings &&
      Object.fromEntries(
        relatedMappings.map(({ crmObjectLabel, relationshipField }) => [
          crmObjectLabel,
          // @ts-ignore
          salesforceDatamodel.types?.[crmObjectLabel.toLowerCase()]?.fields?.map(field => ({
            ...field,
            crmIsFromRelatedObject: true,
            relationshipField,
          })),
        ]),
      )),
  };
  const reducedOptions = useMemo(() => {
    return Object.entries(parsedOptions)?.reduce((acc, [mappingName, fields]) => {
      acc.push(
        <Section id={mappingName}>
          <div className={styles._section}>{mappingName}</div>
        </Section>,
      );

      fields?.forEach(field =>
        acc.push(
          <Item key={field.name} label={field.label} value={{ ...field, mappingName }}>
            {field.label}
          </Item>,
        ),
      );
      return acc;
    }, []);
  }, [crmObjectFields]);

  const triggerMappingName = mapping?.name;
  const isActiveHubspotInbound = useInboundHubspotEnabled();
  const salesFeatureEnabled = useFullSalesEnabled();
  const [selectedCRMField, setSelectedCRMField] = useState(customMap && customMap.keyName);
  const [crmUser, setCrmUser] = useState(customMap?.crmUserId);
  const [existMappingCRM, setExistMappingCRM] = useState(false);
  const [existMappingBB, setExistMappingBB] = useState(false);

  const [selectValue, setSelectValue] = useState(customMap && customMap.bobjectField);
  const [nextStep, setNextStep] = useState(false);
  const [syncRule, setSyncRule] = useState('');
  const syncRuleInitialState =
    triggerMappingName === 'HUBSPOT_FORM_SUBMISSIONS' || selectedCRMField?.crmIsFromRelatedObject
      ? 'CRM'
      : customMap?.syncRule;

  useEffect(() => {
    setSyncRule(syncRuleInitialState);
  }, [customMap]);

  const isHubspot = crm === CRM.HUBSPOT;
  const syncRuleOptions = syncRules(crm, isHubspot);

  const canRenderSyncRule = (isHubspot && isActiveHubspotInbound) || !isHubspot;

  const disabledNextStep = !selectValue || !selectedCRMField;

  const handleClose = () => {
    setSelectedCRMField('');
    setSelectValue('');
    setNextStep(false);
    setSyncRule(syncRuleInitialState);
    handleOpen(false);
  };
  const handleSecondButton = () => {
    if (nextStep) {
      setNextStep(false);
      setSyncRule(syncRuleInitialState);
    } else {
      handleClose();
    }
  };
  const modalSectionTitle = `Map Bloobirds field to ${CRM_DISPLAY_NAME[crm]} field`;
  const crmPlaceHolder = `${CRM_DISPLAY_NAME[crm]} field`;
  const { activeAccount } = useActiveUser();
  const { createToast } = useToasts();
  const title = customMap ? 'Edit field mapping' : 'Create field mapping';
  const editing = !!customMap;
  const createItems = (field: [string, BobjectFieldType], sectionName: string) => {
    const bobjectField = field[1];
    const bobjectFieldId = field[0];
    return (
      <Item
        key={bobjectFieldId}
        label={bobjectField.name}
        value={bobjectFieldId}
        section={sectionName}
      >
        {bobjectField.name}
      </Item>
    );
  };

  useEffect(() => {
    if (!parsedOptions) return;
    const editedField = Object.values(parsedOptions)
      .flatMap(value => value)
      ?.find(value => {
        return [value?.name, value?.label].includes(customMap?.keyName);
      });
    setSelectedCRMField(customMap && editedField);
    setSelectValue(customMap && customMap.bobjectField);
    setCrmUser(customMap && customMap.crmUserId);
    setExistMappingCRM(false);
    setExistMappingBB(false);
  }, [customMap, open]);

  const { lead, activity, opportunity, company } = useMemo(() => {
    const fieldsEntries = Object.entries(bobjectFields);
    const fieldsSize = fieldsEntries.length;
    return fieldsEntries.reduce(
      //TODO review why values arent getting in this variables
      (acc, [id, field], currentIndex) => {
        if (!bobjectTypes) return acc;
        const fieldType = Object.entries(bobjectTypes)
          .find(([_, id]) => id === field.bobjectType)?.[0]
          ?.toLowerCase() as Lowercase<Exclude<BobjectTypes, BobjectTypes.Task>>;
        if (!['lead', 'company', 'opportunity', 'activity'].includes(fieldType)) return acc;
        acc[fieldType].push(createItems([id, field], `${fieldType}-fields`));
        if (currentIndex === fieldsSize - 1) {
          Object.values(acc).forEach(element => {
            element.sort((a, b) => (a.props.label > b.props.label ? 1 : -1));
          });
        }
        return acc;
      },
      { lead: [], company: [], opportunity: [], activity: [] },
    );
  }, [bobjectFields, bobjectTypes]);

  const showLeadFields = mapping.bobjectType !== 'Company';
  const showActivityFields =
    mapping.bobjectType === 'Activity' || (mapping.bobjectType === 'Deal' && !salesFeatureEnabled);

  const showOpportunityFields =
    (mapping.bobjectType === 'Opportunity' || mapping.bobjectType === 'Deal') &&
    salesFeatureEnabled;

  const handleOnSubmit = () => {
    if (!selectedCRMField || !selectValue) return;
    const body = {
      account: `/accounts/${activeAccount.id}`,
      triggerMapping: `/customMappings/${triggerMapping}`,
      bobjectField: `/bobjectFields/${selectValue}`,
      keyName: selectedCRMField.name,
      maxLength: selectedCRMField?.length,
      crmFieldType: selectedCRMField?.type,
      crmUserId: crmUser,
      syncRule,
      ...(selectedCRMField?.crmIsFromRelatedObject && {
        crmIsFromRelatedObject: selectedCRMField?.crmIsFromRelatedObject,
        crmRelationField: selectedCRMField?.relationshipField,
      }),
    };
    if (customMap) {
      RestApi.patch({
        entity: 'customMappings',
        id: customMap.id,
        body,
      })
        .then(() => {
          handleRefreshMappings(true);
          createToast({ message: 'Field mapping updated!', type: 'success' });
          setOrderingCustomMap({
            value: true,
            column: 'updateDatetime',
          });
        })
        .catch(() => {
          createToast({
            type: 'error',
            message: 'There was an error updating your field mapping!',
          });
        });
    } else {
      RestApi.create({
        entity: 'customMappings',
        body,
      })
        .then(() => {
          handleRefreshMappings(true);
          createToast({ message: 'New field mapping created!', type: 'success' });
          setOrderingCustomMap({
            value: false,
            column: 'creationDatetime',
          });
        })
        .catch(() =>
          createToast({
            type: 'error',
            message: 'There was an error creating your field mapping!',
          }),
        );
    }
    handleClose();
  };
  const handleCrmField = value => {
    const crmName = customMappings.filter(customMapping => {
      if (value.crmIsFromRelatedObject) {
        const relatedMapping = relatedMappings?.find(
          relatedMapping => relatedMapping.relationshipField === value.relationshipField,
        );
        return (
          relatedMapping.crmObjectLabel + customMapping.keyName ===
          relatedMapping.crmObjectLabel + value.name
        );
      }
      return customMapping.keyName === value.name;
    });
    if (crmName.length > 0) {
      if (!editing || value.name !== customMap.keyName) setExistMappingCRM(true);
    } else {
      setExistMappingCRM(false);
    }
    if (value.crmIsFromRelatedObject) setSyncRule(SYNC_RULE.CRM);
    setSelectedCRMField(value);
  };
  const handleSelectChange = (bloobirdsField: string) => {
    const salesforceName = customMappings.filter(
      customMapping => customMapping.bobjectField === bloobirdsField,
    );
    if (salesforceName.length > 0) {
      if (!editing || bloobirdsField !== customMap.bobjectField) setExistMappingBB(true);
    } else {
      setExistMappingBB(false);
    }
    setSelectValue(undefined);
    setSelectValue(bloobirdsField);
  };

  const bobjectType = Object.keys(bobjectTypes).find(
    key => bobjectTypes[key] === bobjectFields[selectValue]?.bobjectType,
  );

  const mappingBobjectType =
    mapping.bobjectType === 'Deal' && salesFeatureEnabled ? 'Opportunity' : 'Activity';

  const crossObjectRule = (rule: string) =>
    triggerMappingName !== TRIGGER_MAPPING_NAMES.HUBSPOT_FORM_SUBMISSIONS &&
    triggerMappingName !== TRIGGER_MAPPING_NAMES.LEAD_COMPANY__SALESFORCE &&
    bobjectType !== (mapping.bobjectType === 'Deal' ? mappingBobjectType : mapping.bobjectType) &&
    (rule === SYNC_RULE.CRM || rule === SYNC_RULE.BOTH);

  const exceptionToCrossObject = (rule: string) =>
    (triggerMappingName === TRIGGER_MAPPING_NAMES.HUBSPOT_FORM_SUBMISSIONS ||
      triggerMappingName === TRIGGER_MAPPING_NAMES.LEAD_COMPANY__SALESFORCE) &&
    rule !== SYNC_RULE.CRM &&
    rule !== SYNC_RULE.NO_SYNC;

  const disableSyncRule = (rule: string) =>
    exceptionToCrossObject(rule) ||
    crossObjectRule(rule) ||
    checkRelatedMapping(rule, selectedCRMField);

  function handleNextStep() {
    setSyncRule(syncRuleInitialState);
    setNextStep(true);
  }

  return (
    <>
      <Modal title={title} open={open} onClose={handleSecondButton}>
        <ModalContent>
          <ModalSection title={modalSectionTitle} icon="settings">
            <div className={styles._modal_section}>
              {bobjectFields && (
                <Select
                  placeholder="Bloobirds field"
                  autocomplete
                  value={selectValue || ''}
                  onChange={value => {
                    handleSelectChange(value);
                  }}
                  disabled={nextStep}
                  width="100%"
                >
                  <Section id="company-fields">
                    <div className={styles._section}>Company fields</div>
                  </Section>
                  {company}
                  {showLeadFields && (
                    <Section id="lead-fields">
                      <div className={styles._section}>Lead fields</div>
                    </Section>
                  )}
                  {showLeadFields && lead}
                  {showActivityFields && (
                    <Section id="activity-fields">
                      <div className={styles._section}>Activity fields</div>
                    </Section>
                  )}
                  {showActivityFields && activity}
                  {showOpportunityFields && (
                    <Section id="opportunity-fields">
                      <div className={styles._section}>Opportunity fields</div>
                    </Section>
                  )}
                  {showOpportunityFields && opportunity}
                </Select>
              )}
              <div className={styles._modal_section_text}>
                <svg className={styles._modal_section_svg}>
                  <g>
                    <path d="M5 10 l250 0" />
                  </g>
                </svg>
              </div>
              {!isFetching ? (
                <Select
                  placeholder={selectedCRMField ? '' : crmPlaceHolder}
                  onChange={handleCrmField}
                  value={selectedCRMField}
                  disabled={nextStep}
                  width="100%"
                  autocomplete
                  renderDisplayValue={field => field?.label}
                >
                  {reducedOptions}
                </Select>
              ) : (
                <Spinner name="loadingCircle" />
              )}
            </div>
            <div>
              <Checkbox size="small" checked={crmUser} onClick={() => setCrmUser(!crmUser)}>
                User mapping
                <Tooltip
                  title={`Use this mappings when you want to translate a Bloobirds user into a ${CRM_DISPLAY_NAME[crm]} user.`}
                  position="top"
                >
                  <Icon name="infoFilled" size={24} />
                </Tooltip>
              </Checkbox>
            </div>
            {(existMappingCRM || existMappingBB) && (
              <div className={styles._callout}>
                <Callout variant="alert">
                  {existMappingBB && 'Bloobirds field is already mapped. '}
                  {existMappingCRM && `${CRM_DISPLAY_NAME[crm]} field is already mapped.`}
                </Callout>
              </div>
            )}
          </ModalSection>
          {nextStep && canRenderSyncRule && (
            <ModalSection title="Select the sync rule" icon="arrowRight">
              <div className={styles._modal_section_rule}>
                {Object.entries(syncRuleOptions).map(([rule, value], index) => (
                  <SyncRuleCheckbox
                    key={`rule-${index}`}
                    title={value.title}
                    description={value.description}
                    checked={
                      syncRule === 'CRM_BUT_BLOOBIRDS_CREATE' ||
                      syncRule === 'CRM_BUT_BLOOBIRDS_UPDATE'
                        ? rule === 'CRM'
                        : rule === syncRule
                    }
                    onChecked={() => setSyncRule(rule)}
                    setSyncRule={setSyncRule}
                    disabled={disableSyncRule(rule)}
                    // @ts-ignore
                    subTypes={value?.subTypes}
                    syncRule={syncRule}
                    selectedCRMField={selectedCRMField}
                  />
                ))}
              </div>
            </ModalSection>
          )}
        </ModalContent>
        <ModalFooter>
          <Button variant="clear" color="bloobirds" onClick={handleSecondButton}>
            {nextStep ? 'Back' : 'Cancel'}
          </Button>
          {!nextStep && canRenderSyncRule && (
            <Button
              onClick={handleNextStep}
              disabled={disabledNextStep || existMappingCRM || existMappingBB}
            >
              Next step
            </Button>
          )}
          {(nextStep || (isHubspot && !isActiveHubspotInbound)) && (
            <Button
              disabled={disabledNextStep || existMappingCRM || existMappingBB}
              onClick={handleOnSubmit}
            >
              Confirm
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};
export default NewFieldMapping;
