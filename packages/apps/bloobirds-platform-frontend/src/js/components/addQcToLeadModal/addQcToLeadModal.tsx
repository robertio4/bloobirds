import React, { useState } from 'react';

import { Button, Callout, Modal, ModalFooter, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import { companyIdUrl } from '../../app/_constants/routes';
import AutoCompleteSelect from '../../app/main/board/task/taskBoard/workspace/addQcTask/AutoCompleteSelect';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from '../../constants/lead';
import { useBobjectFormCreation } from "../../hooks";
import { useRouter } from "../../hooks";
import { BobjectApi } from '../../misc/api/bobject';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../utils/bobjects.utils';
import styles from './addQcToLeadModal.module.css';
import { Bobject, BobjectTypes } from "@bloobirds-it/types";

interface AddQcToLeadModalProps {
  open: boolean;
  handleClose: () => void;
  lead?: Bobject<BobjectTypes.Lead>;
  leadId?: string;
}

const AddQcToLeadModal = ({ open, handleClose, lead, leadId }: AddQcToLeadModalProps) => {
  const [companyId, setCompanyId] = useState(null);
  const { createToast } = useToasts();
  const { openAddCompanyAndAssign, openAddCompanyInSales } = useBobjectFormCreation();
  const { history } = useRouter();
  const leadName = lead && getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  const leadStage = lead
    ? getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole
    : undefined;
  const isLeadInSalesStage = leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;

  const assignLeadToCompany = async () => {
    try {
      const data = {
        [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
      };

      await BobjectApi.request()
        .Lead()
        .partialSet({
          bobjectId: lead?.id?.objectId || leadId,
          data,
        });
      createToast({ type: 'success', message: 'Lead added to an existing Qualified Company' });
      history.push(companyIdUrl(companyId));
    } catch (e) {
      createToast({ type: 'error', message: 'Something went wrong' });
    }
  };

  return (
    <Modal
      title={leadName ? `Assign ${leadName} to other company` : 'Assign lead to a company'}
      open={open}
      onClose={handleClose}
      width={700}
    >
      <div className={styles._content__wraper}>
        <div className={styles._autocomplete__wrapper}>
          <AutoCompleteSelect onCompanyIdChange={setCompanyId} />
        </div>
        <div className={styles._info__wrapper}>
          <Callout icon="info" width="100%">
            <Text size="m">
              This will move all <strong>past activity</strong> related to the lead{' '}
              <strong>to the new company&apos;s activity feed </strong>
              (Calls, Emails, LinkedIn Messages, Notes and Meetings). All lead activity from now on
              will appear in the new company&apos;s activity feed.
            </Text>
          </Callout>
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button
            variant="secondary"
            onClick={() => {
              if (!companyId && isLeadInSalesStage) {
                openAddCompanyInSales(lead?.id.objectId || leadId);
              } else {
                openAddCompanyAndAssign(lead?.id.objectId || leadId);
              }
              handleClose();
            }}
          >
            Create new QC
          </Button>
          <Button
            disabled={!companyId}
            onClick={() => {
              assignLeadToCompany();
              handleClose();
            }}
          >
            Assign
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AddQcToLeadModal;
