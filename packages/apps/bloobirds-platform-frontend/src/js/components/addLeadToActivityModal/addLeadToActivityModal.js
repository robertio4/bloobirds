import React, { useState } from 'react';

import {
  Button,
  Callout,
  Modal,
  ModalCloseIcon,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../constants/mixpanel';
import { useActivity, useBobjectFormCreation } from '../../hooks';
import AutoCompleteSearchLeads from './AutoCompleteSearchLeads';
import styles from './addLeadToActivityModal.module.css';

const AddLeadToActivityModal = ({ open, handleClose, activity }) => {
  const [leadId, setLeadId] = useState(null);
  const { createToast } = useToasts();
  const { openAddLead } = useBobjectFormCreation();
  const { assignActivity } = useActivity('inbox');

  const handleAssign = () => {
    assignActivity(activity?.id.objectId, leadId)
      .then(res => {
        if (res.status === 200)
          createToast({
            message: 'Assigned lead successfully!',
            type: 'success',
          });
      })
      .catch(e => {
        createToast({
          message: 'There was assigning lead',
          type: 'error',
        });
        console.log(e);
      });
  };

  return (
    <Modal open={open} onClose={handleClose} width={700}>
      <ModalHeader>
        <ModalTitle>Assign call to a lead</ModalTitle>
        <ModalCloseIcon onClick={handleClose} />
      </ModalHeader>
      <div className={styles._content__wraper}>
        <div className={styles._info__wrapper}>
          <Callout icon="info" width="100%">
            <Text size="m">
              <span role="img" aria-label="icon-label">
                💡
              </span>{' '}
              Register this number if you want future calls to be associated with this lead.
            </Text>
          </Callout>
        </div>
        <div className={styles._autocomplete__wrapper}>
          <AutoCompleteSearchLeads onLeadIdChange={setLeadId} />
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
              mixpanel.track(MIXPANEL_EVENTS.ASSIGN_LEAD_PHONE_MODAL_LEAD_CREATED);
              openAddLead({ bobject: activity });
            }}
          >
            Create new lead
          </Button>
          <Button
            disabled={!leadId}
            onClick={() => {
              mixpanel.track(MIXPANEL_EVENTS.ASSIGN_LEAD_PHONE_MODAL_LEAD_ASSIGNED);
              handleAssign();
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
export default AddLeadToActivityModal;
