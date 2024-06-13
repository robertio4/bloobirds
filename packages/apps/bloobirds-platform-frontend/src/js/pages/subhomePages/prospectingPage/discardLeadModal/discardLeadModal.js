import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Button,
  Item,
  Modal,
  ModalFooter,
  Select,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useLeads } from '../../../../hooks';
import useDiscardLead from '../../../../hooks/useDiscardLead';
import { ServiceApi } from '../../../../misc/api/service';
import styles from './discardLeadModal.module.css';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE } from '../../../../constants/lead';
import { getTextFromLogicRole } from '../../../../utils/bobjects.utils';

const fetcherReason = url =>
  ServiceApi.request({
    url,
    method: 'GET',
  });

const DiscardLeadModal = () => {
  const [discardedReason, setDiscardedReason] = useState();
  const { createToast } = useToasts();
  const { patchLead, patchLeads } = useLeads('discard-lead-modal');
  const { closeDiscardLeadModal, lead, discardLeadCallback } = useDiscardLead();
  const isBulkAction = Array.isArray(lead);
  const leadFullName =
    !isBulkAction &&
    (getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
      getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL));
  const { data: reasons } = useSWR('/service/view/field/statusReasons/Lead', fetcherReason);
  const discardedReasons = reasons?.find(
    reason => reason?.logicRole === LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  )?.fieldValues;

  const onSave = () => {
    const data = {
      [LEAD_FIELDS_LOGIC_ROLE.STATUS]: LEAD_STATUS_LOGIC_ROLE.DISCARDED,
      [LEAD_FIELDS_LOGIC_ROLE.DISCARDED_REASONS]: discardedReason?.value,
    };
    if (!isBulkAction) {
      patchLead(lead?.id?.objectId, data).then(() =>
        createToast({
          message: 'Lead successfully discarded!',
          type: 'success',
        }),
      );
    } else {
      let leadsData = {};
      lead.forEach(leadObject => {
        leadsData = { ...leadsData, [leadObject?.id?.objectId]: data };
      });
      patchLeads(leadsData).then(() => {
        if (typeof discardLeadCallback === 'function') {
          discardLeadCallback();
        } else {
          createToast({
            message: 'Leads successfully discarded!',
            type: 'success',
          });
        }
      });
    }
  };

  return (
    <Modal title="Discard lead" open onClose={closeDiscardLeadModal} width={640}>
      <div className={styles._content__wraper}>
        <div className={styles._info__wrapper}>
          <Text size="m" weight="bold">
            {!isBulkAction
              ? `Are you sure you want to discard "${leadFullName}"?`
              : `Are you sure you want to discard ${lead?.length} leads`}
          </Text>
          <Text size="m" color="softPeanut">
            Select a discard reason to continue
          </Text>
        </div>
        <div className={styles._autocomplete__wrapper}>
          <Select width={520} placeholder="Discard reasons">
            {discardedReasons?.map(reason => (
              <Item
                key={`lead-reason-item-${reason.value}`}
                value={reason.value}
                onClick={() => {
                  setDiscardedReason(reason);
                }}
              >
                {reason.label}
              </Item>
            ))}
          </Select>
        </div>
      </div>
      <ModalFooter>
        <Button variant="clear" color="tomato" onClick={closeDiscardLeadModal}>
          Cancel
        </Button>
        <Button
          disabled={!lead}
          onClick={() => {
            onSave();
            closeDiscardLeadModal();
          }}
        >
          Discard lead
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default DiscardLeadModal;
