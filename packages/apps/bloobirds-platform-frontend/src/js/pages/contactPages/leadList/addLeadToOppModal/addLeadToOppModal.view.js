import React, { useEffect, useMemo, useState } from 'react';

import {
  Button,
  CircularBadge,
  Item,
  Modal,
  ModalContent,
  ModalFooter,
  Select,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { STAGE_VALUES_LOGIC_ROLES } from '@bloobirds-it/types';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useLeads, useEntity, useOpportunity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { useContactBobjects } from '../../contactPageContext';
import styles from './addLeadToOppModal.module.css';

const AddLeadToOpportunityModal = ({ handleClose, leads: opportunityLeads = [] }) => {
  const { createToast } = useToasts();
  const { active: selectedOpportunity } = useContactBobjects();
  const { company } = useContactBobjects();
  const { updateLeadsByCompany, isLoaded, leads } = useLeads('leadAssigment');
  const [selectedLeadId, setSelectedLeadId] = useState();
  const [selectedContactRole, setSelectedContactRole] = useState();
  const [filteredLeads, setFilteredLeads] = useState([]);
  const settings = useUserSettings();
  const { updateOpportunity } = useOpportunity();
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const selectDisabled = leads?.length === 0;
  const hasSalesEnabled = useFullSalesEnabled();
  const existsLead = leadId => opportunityLeads.find(oppLead => oppLead?.id.value === leadId);

  const availableRoles = useMemo(() => {
    return selectedOpportunity?.fields?.filter(
      field => field.type === 'REFERENCE' && field.referencedBobjectType === 'Lead' && !field?.text,
    );
  }, [selectedOpportunity]);

  const handleContinue = () => {
    const newData = {
      [selectedContactRole]: `${settings?.account.id}/Lead/${selectedLeadId}`,
    };
    updateOpportunity(selectedOpportunity?.id?.objectId, newData).then(() =>
      createToast({ type: 'success', message: 'Changes successfully saved' }),
    );
    handleClose();
  };

  useEffect(() => {
    updateLeadsByCompany(company?.id.value);
  }, [company]);

  useEffect(() => {
    setFilteredLeads(
      leads?.filter(lead => {
        const stage = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole;
        if (existsLead(lead?.id.value)) {
          return false;
        }
        if (hasSalesEnabled) {
          return stage === STAGE_VALUES_LOGIC_ROLES.Lead.SALES;
        } else {
          return true;
        }
      }),
    );
  }, [leads]);

  const buttonDisabled = useMemo(() => {
    return !selectedLeadId || !selectedContactRole;
  }, [selectedLeadId, selectedContactRole]);

  return (
    <Modal open onClose={handleClose} title="Lead assigment">
      <ModalContent>
        <div className={styles._leadContainer}>
          <Text size="m" weight="medium">
            Choose from your existing leads to continue
          </Text>
          <div className={styles._selectorsContainer}>
            <Select
              placeholder="Lead name*"
              dataTest="leadFlow-leadDropdown"
              value={selectedLeadId}
              onChange={setSelectedLeadId}
              disabled={selectDisabled}
              width="100%"
              renderDisplayValue={value => {
                if (!value) {
                  return null;
                }
                const valueLead = filteredLeads?.find(lead => lead?.id.objectId === value);
                return (
                  getValueFromLogicRole(valueLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
                  getValueFromLogicRole(valueLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL) ||
                  'Untitled lead'
                );
              }}
            >
              <Item value="">
                <em>None</em>
              </Item>
              {isLoaded &&
                filteredLeads?.map(lead => {
                  const leadICP = idealCustomerProfiles?.get(
                    getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
                  );
                  const jobTitle = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE);
                  const leadName = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
                  const leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
                  return (
                    <Item
                      dataTest="leadFlow-leadDropdownName"
                      value={lead?.id.objectId}
                      key={`lead-${lead.id.value}`}
                    >
                      <>
                        {leadICP ? (
                          <Tooltip title={leadICP?.name} trigger="hover" position="top">
                            <CircularBadge
                              size="medium"
                              style={{
                                backgroundColor: leadICP?.color || 'var(--verySoftPeanut)',
                                color: 'white',
                              }}
                            >
                              {leadICP?.shortname || ''}
                            </CircularBadge>
                          </Tooltip>
                        ) : (
                          <CircularBadge
                            size="medium"
                            style={{
                              backgroundColor: 'var(--verySoftPeanut)',
                              color: 'white',
                              fontSize: 20,
                            }}
                          >
                            ?
                          </CircularBadge>
                        )}
                        <div className={styles._lead__info}>
                          <Text color="peanut" size="m" weight="medium" ellipsis={50}>
                            {leadName || leadEmail || 'Untitled Lead'}
                          </Text>
                          <Text
                            color="softPeanut"
                            size="s"
                            inline
                            className={styles._lead__company}
                            ellipsis={80}
                          >
                            {jobTitle || ''}
                          </Text>
                        </div>
                      </>
                    </Item>
                  );
                })}
            </Select>
            <Select
              data-test="lead-flow-contact-role"
              disabled={selectDisabled}
              onChange={setSelectedContactRole}
              width="100%"
              placeholder="Contact role*"
            >
              {availableRoles?.map(role => (
                <Item key={role?.name} value={role?.logicRole}>
                  {role?.label}
                </Item>
              ))}
            </Select>
          </div>
          <div>
            <Text size="xs" color="softPeanut">
              {hasSalesEnabled ? '*Remember only leads in Sales stage will be shown' : ''}
            </Text>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          <Button variant="clear" onClick={handleClose}>
            Cancel
          </Button>
          <div className={styles._forward__buttons}>
            <Button
              dataTest="leadFlow-continueButton"
              disabled={buttonDisabled}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AddLeadToOpportunityModal;
