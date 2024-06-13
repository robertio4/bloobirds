import React, { useState } from 'react';

import { Button, Modal, ModalFooter, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectPicklistValueEntity, PluralBobjectTypes } from '@bloobirds-it/types';

import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE,
} from '../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../constants/opportunity';
import { useBobjectFormCreation, useLeads, useOpportunity, usePicklistValues } from '../../hooks';
import useAddCompany from '../../hooks/useAddCompany';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import {
  getFieldByLogicRole,
  getObjectIdFromId,
  getOpportunityLeadsIds,
  getPluralBobjectName,
  isLead,
  isOpportunity,
} from '../../utils/bobjects.utils';
import AutoCompleteSearchCompanies from '../autoCompleteSearchCompanies/autoCompleteSearchCompanies';
import styles from './addCompanyModal.module.css';

const getStatusId = (companyStatuses: BobjectPicklistValueEntity[], statusLogicRole: string) =>
  companyStatuses.find(value => value.logicRole === statusLogicRole)?.id;

const AddCompanyModal = () => {
  const [companyId, setCompanyId] = useState<string>();
  const { createToast } = useToasts();
  const { openAddCompany } = useBobjectFormCreation();
  const { patchLead, patchLeads } = useLeads('add-company-modal');
  const { updateOpportunity, updateOpportunities } = useOpportunity('add-company-modal');
  const { closeAddCompanyModal, bobject, addCompanyCallback } = useAddCompany();
  const hasSalesEnabled = useFullSalesEnabled();
  const isBulkAction = Array.isArray(bobject);
  const mainBobject = isBulkAction ? bobject[0] : bobject;
  const isOpportunityBobject = isOpportunity(mainBobject);
  const isLeadBobject = isLead(mainBobject);
  const mainBobjectTypeName = mainBobject?.id?.typeName;
  const isMainBobjectSalesStage =
    isLeadBobject &&
    getFieldByLogicRole(mainBobject, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole ===
      LEAD_STAGE_LOGIC_ROLE.SALES;
  const companyStage =
    (hasSalesEnabled && isOpportunityBobject) || isMainBobjectSalesStage
      ? COMPANY_STAGE_LOGIC_ROLE.SALES
      : COMPANY_STAGE_LOGIC_ROLE.PROSPECT;
  const statusLogicRole =
    isOpportunityBobject && hasSalesEnabled
      ? COMPANY_FIELDS_LOGIC_ROLE.SALES_STATUS
      : COMPANY_FIELDS_LOGIC_ROLE.STATUS;
  const statusValueLogicRole =
    isOpportunityBobject && hasSalesEnabled
      ? COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE
      : COMPANY_STATUS_LOGIC_ROLE.DELIVERED;
  const companyStatuses = usePicklistValues({
    picklistLogicRole: statusLogicRole,
  });
  const statusId = getStatusId(companyStatuses, statusValueLogicRole);

  const patchBobjectCallback = ({ response }: { response: any }) => {
    if (typeof addCompanyCallback === 'function') {
      addCompanyCallback({ response });
    } else {
      createToast({
        message: `${getPluralBobjectName(
          mainBobjectTypeName,
          isBulkAction ? bobject?.length : 1,
        )} successfully assigned`,
        type: 'success',
      });
    }
  };

  const updateLeadBobject = ({
    leadBobject,
    companyId,
  }: {
    leadBobject: Bobject[] | Bobject;
    companyId: string;
  }) => {
    const data = {
      [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
    };
    if (isBulkAction) {
      leadBobject = leadBobject as Bobject[];
      let leadsData = {};
      leadBobject.forEach((element: Bobject) => {
        leadsData = { ...leadsData, [element?.id?.objectId]: data };
      });
      return patchLeads(leadsData);
    } else {
      return patchLead(bobject?.id?.objectId, data);
    }
  };

  const updateOpportunityBobject = async ({
    opportunityBobject,
    companyId,
  }: {
    opportunityBobject: Bobject[] | Bobject;
    companyId: string;
  }) => {
    const data = {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
    };
    if (isBulkAction) {
      opportunityBobject = opportunityBobject as Bobject[];
      let actionData = {};
      opportunityBobject.forEach((element: Bobject) => {
        actionData = { ...actionData, [element?.id?.objectId]: data };
      });
      return updateOpportunities(actionData);
    } else {
      opportunityBobject = opportunityBobject as Bobject;
      let leadsData = {};
      getOpportunityLeadsIds(opportunityBobject).forEach((leadId: string) => {
        leadsData = {
          ...leadsData,
          [getObjectIdFromId(leadId)]: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyId },
        };
      });
      await patchLeads(leadsData);
      return updateOpportunity(bobject?.id?.objectId, data);
    }
  };

  const updateMainBobject = ({ response }: { response: any }) => {
    if (isLeadBobject) {
      updateLeadBobject({ leadBobject: bobject, companyId: response?.objectId }).then(() =>
        patchBobjectCallback({ response }),
      );
    }

    if (isOpportunityBobject && hasSalesEnabled) {
      updateOpportunityBobject({
        opportunityBobject: bobject,
        companyId: response?.objectId,
      }).then(() => patchBobjectCallback({ response }));
    }
  };

  const assignMainBobject = () => {
    if (isLeadBobject) {
      return updateLeadBobject({
        leadBobject: bobject,
        companyId: companyId,
      }).then(() => patchBobjectCallback({ response: companyId }));
    } else if (isOpportunityBobject && hasSalesEnabled) {
      return updateOpportunityBobject({
        opportunityBobject: bobject,
        companyId: companyId,
      }).then(() => patchBobjectCallback({ response: companyId }));
    }
  };

  return (
    <Modal title="Add company" open onClose={closeAddCompanyModal} width={640}>
      <div className={styles._content__wraper}>
        <div className={styles._info__wrapper}>
          <Text size="m" weight="bold">
            {`Assign an existing company or create a new one for ${
              isBulkAction
                ? `these ${Object.keys(PluralBobjectTypes)[
                    mainBobject?.id?.typeName
                  ]?.toLowerCase()}`
                : `this ${mainBobjectTypeName?.toLowerCase()}`
            }`}
          </Text>
        </div>
        <div className={styles._autocomplete__wrapper}>
          <AutoCompleteSearchCompanies
            onCompanyIdChange={setCompanyId}
            onChange={undefined}
            value={''}
            width="518px"
            size={24}
          />
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={closeAddCompanyModal}>
            Cancel
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button
            variant="secondary"
            disabled={!!companyId}
            onClick={() => {
              openAddCompany({
                status: statusId,
                stage: companyStage,
                onSuccess: ({ response }: { response: any }) => {
                  updateMainBobject({ response });
                },
              });
              closeAddCompanyModal();
            }}
          >
            Create new company
          </Button>
          <Button
            disabled={!companyId}
            onClick={() => {
              assignMainBobject();
              closeAddCompanyModal();
            }}
          >
            Assign
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default AddCompanyModal;
