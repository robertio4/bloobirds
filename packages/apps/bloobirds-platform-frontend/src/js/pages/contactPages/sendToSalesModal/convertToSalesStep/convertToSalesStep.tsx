import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  CircularBadge,
  Icon,
  Item,
  Label,
  ModalContent,
  ModalFooter,
  Select,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';
import useSWR from 'swr';

import { SalesLabel } from '../../../../components/salesLabel/salesLabel';
import UserSelect from '../../../../components/userSelect/userSelect';
import WithTooltip from '../../../../components/withTooltip/withTooltip';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../../../../constants/company';
import { SALESFORCE } from '../../../../constants/integrations';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../../../constants/lead';
import { useCompany, useEntity, useLeads } from '../../../../hooks';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import useSendToSales from '../../../../hooks/useSendToSales';
import { Bobject } from '../../../../typings/bobjects';
import { UserObject } from '../../../../typings/user';
import { api } from '../../../../utils/api';
import {
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import styles from './convertToSalesStep.module.css';

export interface LeadConvertedStatus {
  Id: string;
  ApiName: string;
  MasterLabel: string;
}

const ConvertToSalesStep = ({
  onClose,
  onBack,
  onNext,
}: {
  onClose?: () => void;
  onNext?: (createOpportunity?: boolean, leads?: Bobject[], userSelectedId?: string) => void;
  onBack?: () => void;
}) => {
  const inboundTriggerRepo = useEntity('accountIntegrationTriggers')?.all();
  const { bobject, leads, send, convertSalesforce } = useSendToSales();
  const { selectedLead } = useSelectedLead();
  const [userSelected, setUserSelected] = useState<UserObject>();
  const [isSubmittingSend, setIsSubmittingSend] = useState<boolean>(false);
  const [isSubmittingSendAndCreate, setIsSubmittingSendAndCreate] = useState<boolean>(false);
  const [leadsSelected, setLeadsSelected] = useState<Array<Bobject>>([]);
  const { company, getCompanyById, resetCompany } = useCompany('sendToSales');
  const {
    leads: companyLeads,
    updateLeadsByCompany,
    resetLeads,
    isFetching: isFetchingLeads,
    isLoaded: isLoadedLead,
  } = useLeads('sendToSales');
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const bobjectType = bobject?.id?.typeName;
  const isCompany = bobjectType === BOBJECT_TYPES.COMPANY;
  const companyName = isCompany
    ? getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME)
    : '';
  const leadName = !isCompany
    ? getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
    : '';
  const leadCompany = !isCompany
    ? getReferencedBobjectFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
    : undefined;
  const leadCompanyName = leadCompany
    ? getValueFromLogicRole(leadCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME)
    : undefined;
  const hasCompany = !!leadCompany;
  const companyHasLeadsInSales = (leads || companyLeads)?.some((lead: Bobject) => {
    const stage = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
    return stage === LEAD_STAGE_LOGIC_ROLE.SALES;
  });
  const companyInStageSales =
    company &&
    getFieldByLogicRole(leadCompany, COMPANY_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
      COMPANY_STAGE_LOGIC_ROLE.SALES;
  const isSubmitting = isSubmittingSend || isSubmittingSendAndCreate;
  const reducedInboundTrigger = inboundTriggerRepo?.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: { id: curr.id, jsonConfig: JSON.parse(curr.jsonConfig) },
    }),
    {},
  );
  const { data } = useSWR(
    `/utils/service/salesforce/getLeadConvertedStatus`,
    async () =>
      await api
        .get(`/utils/service/salesforce/getLeadConvertedStatus`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then((res: any) => res.data),
  );
  const salesforceConversionConfig =
    reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.convertLeads;

  const salesforceConversionStatusConfig =
    reducedInboundTrigger?.INBOUND__SALESFORCE?.jsonConfig.leadConvertedStatus;

  const [leadConversionStatus, setLeadConversionStatus] = useState<string>(
    salesforceConversionStatusConfig,
  );

  const isButtonsDisabled =
    (!companyHasLeadsInSales && leadsSelected?.length === 0) ||
    (salesforceConversionConfig && !leadConversionStatus);

  useEffect(() => {
    if (!isCompany) {
      setLeadsSelected([{ ...bobject, mainLead: true }]);
    }
  }, [bobject]);

  useEffect(() => {
    if (hasCompany) {
      getCompanyById(leadCompany?.id?.objectId);
    }
  }, [hasCompany]);

  useEffect(() => {
    if (company) {
      updateLeadsByCompany(company?.id?.value);
    }
  }, [company]);

  useEffect(() => {
    if (isCompany && !leads) {
      updateLeadsByCompany(bobject?.id?.value);
    }
  }, [isCompany, leads]);

  useEffect(() => {
    if (isCompany) {
      const isSelectedLeadProspecting =
        selectedLead &&
        getFieldByLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE?.STAGE)?.valueLogicRole !==
          LEAD_STAGE_LOGIC_ROLE.SALES;
      if (isSelectedLeadProspecting) {
        setLeadsSelected([{ ...selectedLead, mainLead: true }]);
      }
    }
  }, [selectedLead]);

  useEffect(
    () => () => {
      resetCompany();
      resetLeads();
    },
    [],
  );

  const handleSendToSales = async (open?: boolean) => {
    const assignedUserId = userSelected ? userSelected?.id : null;
    const companyId = isCompany ? bobject?.id?.objectId : null;
    const fullCompanyId = isCompany && bobject?.id?.value;
    if (salesforceConversionConfig && (leadCompany || isCompany)) {
      convertSalesforce(
        leadsSelected.map(lead => lead?.id?.value),
        leadConversionStatus,
        isCompany ? fullCompanyId : leadCompany?.id?.value,
      );
    }

    await send(
      leadsSelected.map(lead => lead?.id?.objectId),
      assignedUserId,
      companyId,
    );

    if (open) {
      onNext(true, leadsSelected, userSelected?.id);
    } else {
      onNext();
    }
  };

  return (
    <>
      <ModalContent>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.icons}>
              {!isCompany && <Icon name="people" size={36} />}
              {(isCompany || hasCompany) && (
                <Icon
                  name="company"
                  color={companyInStageSales ? 'peanut' : 'bloobirds'}
                  size={36}
                />
              )}
              <Icon name="arrowRight" size={24} color="verySoftPeanut" />
              <div className={styles.iconWithLabel}>
                <Icon name="fileOpportunity" color="white" />
                <Text size="xs" color="white">
                  Sales
                </Text>
              </div>
            </div>
            <Text size="m" align="center">
              Send to sales{' '}
              {!isCompany && (
                <>
                  <Text size="m" htmlTag="span" color="bloobirds">
                    {leadName}
                    {companyName ||
                      (leadCompanyName && (
                        <>
                          {' '}
                          <Text size="m" color="peanut" htmlTag="span">
                            and
                          </Text>{' '}
                        </>
                      ))}
                  </Text>
                </>
              )}
              <Text size="m" htmlTag="span" color="bloobirds">
                {companyName || leadCompanyName}
              </Text>
              {companyInStageSales && (
                <>
                  {' '}
                  <Text size="m" htmlTag="span">
                    already in sales
                  </Text>
                </>
              )}
            </Text>
            {isCompany && (
              <Text size="xs" align="center" color="softPeanut">
                This action cannot be undone, Bloobirds will change the company and the selected
                lead/s to sales stage in status active. You will find it on the sale tab
              </Text>
            )}
            {!isCompany && !hasCompany && (
              <Text size="xs" align="center" color="softPeanut" className={styles.leadPhrase}>
                This action cannot be undone, Bloobirds will change the lead to sales stage in
                status active. You will find it on the sale tab.
                <br />
                If you want the opportunities to be sync, select to convert also in Salesforce.
              </Text>
            )}
            {!isCompany && hasCompany && (
              <Text size="xs" align="center" color="softPeanut" className={styles.leadPhrase}>
                This action cannot be undone, Bloobirds will change{' '}
                {!companyInStageSales ? 'the company and' : ''} the selected lead/s to sales stage
                in status active. You will find it on the sale tab
              </Text>
            )}
          </div>
          <div className={clsx(styles.section, { [styles.leadSection]: !isCompany })}>
            <Text size="s" className={styles.title}>
              {isCompany && 'Do you wish to reassign the company and its selected lead(s)?'}
              {!isCompany && !hasCompany && 'Do you wish to reassign the lead'}
              {!isCompany &&
                hasCompany &&
                !companyInStageSales &&
                'Do you wish to reassign the company and its selected lead(s)?'}
              {!isCompany &&
                hasCompany &&
                companyInStageSales &&
                'Do you wish to reassign this lead and the rest of leads?'}
            </Text>
            <UserSelect
              width={507}
              onChange={(value: UserObject) => {
                setUserSelected(value);
              }}
              value={userSelected}
              disabled={isSubmitting}
            />
          </div>
          {(leads?.length > 0 || companyLeads?.length > 0) && (
            <div className={styles.section}>
              <Text size="s" className={styles.subtitle}>
                Which leads do you want to send to sales?
              </Text>
              <Text size="s" color="softPeanut">
                Select at least one to continue.
              </Text>
              <div className={styles.list}>
                {(leads || companyLeads)?.map((lead: Bobject) => {
                  const leadName = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
                  const leadIcpValue = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP);
                  const leadIcp = idealCustomerProfiles?.get(leadIcpValue);
                  const leadLinkedinRole = getValueFromLogicRole(
                    lead,
                    LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_JOB_TITLE,
                    true,
                  );
                  const isCurrentLead = lead?.id?.objectId === bobject?.id?.objectId;
                  const leadStage = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)
                    ?.valueLogicRole;
                  const isLeadInSales = leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;
                  const isSelected =
                    isCurrentLead ||
                    isLeadInSales ||
                    !!leadsSelected.find(
                      leadSelected => lead?.id?.objectId === leadSelected?.id?.objectId,
                    );
                  const salesforceContactLabel = getValueFromLogicRole(
                    lead,
                    SALESFORCE.CONTACT_ID_FIELD,
                  );
                  const salesforceLeadLabel = getValueFromLogicRole(lead, SALESFORCE.LEAD_ID_FIELD);

                  return (
                    <div className={styles.card} key={lead?.id?.objectId}>
                      <div className={styles.cardLeft}>
                        <div
                          className={clsx(styles.checkbox, {
                            [styles.checkboxDisabled]:
                              isCurrentLead || isLeadInSales || isSubmitting,
                          })}
                        >
                          <Checkbox
                            size="small"
                            checked={isSelected}
                            disabled={isCurrentLead || isLeadInSales || isSubmitting}
                            onClick={checked => {
                              let newLeadsSelected;
                              if (checked) {
                                newLeadsSelected = [...leadsSelected, lead];
                              } else {
                                newLeadsSelected = leadsSelected?.filter(
                                  leadItem => leadItem.id?.objectId !== lead.id?.objectId,
                                );
                              }
                              setLeadsSelected(newLeadsSelected);
                            }}
                          />
                        </div>
                        {leadIcp ? (
                          <Tooltip title={leadIcp.name} trigger="hover" position="top">
                            <CircularBadge
                              size="m"
                              style={{
                                backgroundColor: leadIcp?.color || 'var(--verySoftPeanut)',
                                height: '28px',
                                width: '28px',
                                color: 'white',
                                minWidth: '28px',
                                fontSize: 12,
                              }}
                            >
                              {leadIcp?.shortname || ''}
                            </CircularBadge>
                          </Tooltip>
                        ) : (
                          <CircularBadge
                            size="small"
                            style={{
                              backgroundColor: 'var(--verySoftPeanut)',
                              color: 'white',
                              height: '28px',
                              width: '28px',
                              minWidth: '28px',
                              fontSize: 20,
                            }}
                          >
                            ?
                          </CircularBadge>
                        )}
                        <div className={styles.nameWrapper}>
                          <WithTooltip
                            isDisabled={
                              salesforceConversionConfig &&
                              !salesforceContactLabel &&
                              leadName?.length > 20
                            }
                            title={leadName}
                          >
                            <Text
                              size="s"
                              color="bloobirds"
                              ellipsis={salesforceConversionConfig && !salesforceContactLabel && 20}
                            >
                              {leadName}
                            </Text>
                          </WithTooltip>
                          <Text size="xs" color="softPeanut" className={styles.jobTitle}>
                            {leadLinkedinRole}
                          </Text>
                        </div>
                      </div>
                      <div className={styles.labelsWrapper}>
                        {salesforceConversionConfig && !salesforceContactLabel && (
                          <Label
                            size="small"
                            color={isSelected ? 'veryLightBloobirds' : 'white'}
                            icon="salesforceOutlined"
                            iconColor={isSelected ? 'bloobirds' : 'lightBloobirds'}
                            textColor={isSelected ? 'peanut' : 'softPeanut'}
                            uppercase={false}
                          >
                            Convert to contact in SFDC
                          </Label>
                        )}
                        {isLeadInSales && (
                          <div className={styles.stageWrapper}>
                            <SalesLabel isSalesStage={isLeadInSales} contracted />
                          </div>
                        )}
                        {(salesforceContactLabel || salesforceLeadLabel) &&
                          salesforceConversionConfig && (
                            <div className={styles.sync_sf_container}>
                              <Label
                                size="small"
                                color={salesforceContactLabel ? 'gradientPurple' : 'softTangerine'}
                                textColor="white"
                                overrideStyle={{ fontSize: '10px' }}
                                uppercase={false}
                                icon="personBody"
                              >
                                {salesforceContactLabel ? 'Contact' : 'Lead'}
                              </Label>
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {salesforceConversionConfig && (
            <div>
              <Text size="s" className={styles.title}>
                Select a Salesforce Converted Status for your leads
              </Text>
              <Select
                autocomplete
                width="507px"
                adornment={<Icon size={20} name="search" color="softPeanut" />}
                onChange={setLeadConversionStatus}
                value={leadConversionStatus}
              >
                {data?.map((leadStatus: LeadConvertedStatus) => (
                  <Item key={leadStatus.Id} value={leadStatus.ApiName}>
                    {leadStatus.MasterLabel}
                  </Item>
                ))}
              </Select>
            </div>
          )}
          {!isLoadedLead && isFetchingLeads && (
            <div className={styles.section}>
              <Skeleton variant="text" height={16} width={400} />
              <Skeleton variant="text" height={16} width={250} />
              <div className={styles.list}>
                <Skeleton variant="rect" height={46} width={508} />
              </div>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        {onClose && (
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
        )}
        {onBack && (
          <Button variant="tertiary" onClick={onBack}>
            Back
          </Button>
        )}
        <div className={styles.actionButtons}>
          <WithTooltip isDisabled={isButtonsDisabled} title="Select at least one lead to continue">
            <Button
              variant="secondary"
              disabled={isButtonsDisabled || isSubmittingSend}
              onClick={async () => {
                setIsSubmittingSendAndCreate(true);
                await handleSendToSales(true);
              }}
            >
              {isSubmittingSendAndCreate ? (
                <Spinner color="bloobirds" size={14} name="loadingCircle" />
              ) : (
                'Send & Create opportunity'
              )}
            </Button>
          </WithTooltip>
          <WithTooltip isDisabled={isButtonsDisabled} title="Select at least one lead to continue">
            <Button
              variant="primary"
              disabled={isButtonsDisabled || isSubmittingSendAndCreate}
              onClick={async () => {
                setIsSubmittingSend(true);
                await handleSendToSales();
              }}
            >
              {isSubmittingSend ? <Spinner color="white" size={14} name="loadingCircle" /> : 'Send'}
            </Button>
          </WithTooltip>
        </div>
      </ModalFooter>
    </>
  );
};

export default ConvertToSalesStep;
