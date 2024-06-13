import React, { useState } from 'react';

import { Button, Modal, ModalFooter, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import AutoCompleteSearchLeads from '../../../../components/autoCompleteSearchLeads/autoCompleteSearchLeads';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useBobjectFormCreation, useLeads } from '../../../../hooks';
import useAddLead from '../../../../hooks/useAddLead';
import styles from './addLeadModal.module.css';

const AddLeadModal = () => {
  const [leadId, setLeadId] = useState();
  const { createToast } = useToasts();
  const { openAddLead } = useBobjectFormCreation();
  const { patchLead } = useLeads('add-lead-modal');
  const { closeAddLeadModal, company } = useAddLead();
  const searchQuery = {
    [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: ['__MATCH_EMPTY_ROWS__'],
  };

  const handleAssign = () => {
    patchLead(leadId, {
      [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: company?.id.value,
    }).then(() =>
      createToast({
        message: 'Assigned lead successfully!',
        type: 'success',
      }),
    );
  };

  return (
    <Modal title="Add lead" open onClose={closeAddLeadModal} width={640}>
      <div className={styles._content__wraper}>
        <div className={styles._info__wrapper}>
          <Text size="m" weight="bold">
            Assign an existing lead without company or create a new one
          </Text>
        </div>
        <div className={styles._autocomplete__wrapper}>
          <AutoCompleteSearchLeads
            width={'520px'}
            onLeadIdChange={setLeadId}
            searchQuery={searchQuery}
            value={''}
            size={24}
            inputSize="medium"
          />
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={closeAddLeadModal}>
            Cancel
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button
            variant="secondary"
            onClick={() => {
              openAddLead({
                bobject: company,
                onSuccess: ({ response }) => {
                  patchLead(response?.objectId, {
                    [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: company?.id?.objectId,
                  }).then(() =>
                    createToast({
                      message: 'Assigned lead successfully!',
                      type: 'success',
                    }),
                  );
                },
              });
              closeAddLeadModal();
            }}
          >
            Create new lead
          </Button>
          <Button
            disabled={!leadId}
            onClick={() => {
              handleAssign();
              closeAddLeadModal();
            }}
          >
            Assign
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default AddLeadModal;
