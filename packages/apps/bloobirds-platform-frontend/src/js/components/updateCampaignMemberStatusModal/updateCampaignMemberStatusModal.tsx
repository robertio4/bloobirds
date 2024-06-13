import React, { useState } from 'react';
import {
  Button,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { SalesforceLogo } from '../../../assets/svg';
import styles from './updateCampaignMemberStatusModal.module.css';
import useUpdateSalesforceCampaignStatus from '../../hooks/useUpdateCampaignStatus';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';

interface PicklistValue {
  active: boolean;
  defaultValue: boolean;
  label: string;
  value: string;
}

interface Field {
  label: string;
  length: number;
  name: string;
  nillable: boolean;
  picklistValues: Array<PicklistValue>;
  type: string;
  updateable: boolean;
}

const UpdateCampaignMemberStatusModal = ({ onClose }: { onClose: () => void }) => {
  const {
    campaignMember: campaignStatus,
    lead,
    campaignName,
    campaignMemberStatus,
    updateSalesforceCampaignStatus,
  } = useUpdateSalesforceCampaignStatus();
  const leadName = lead ? getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) : '';
  const [status, setStatus] = useState(campaignMemberStatus);

  return (
    <Modal open onClose={onClose} width={640}>
      <ModalHeader>
        <ModalTitle>Update campaign member status</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>
          <div className={styles.logo}>
            <SalesforceLogo />
          </div>
          <div className={styles.text}>
            <Text size="m">
              Update lead{' '}
              <Text size="m" color="bloobirds" htmlTag="span">
                {leadName}
              </Text>{' '}
              campaign status
            </Text>
            <Text size="m">Campaign: {campaignName}</Text>
            <div className={styles.dropdown}>
              <Text size="m">Status</Text>
              <Select
                placeholder="Available statuses"
                value={status}
                onChange={value => setStatus(value)}
              >
                {campaignStatus?.map((picklistValue: string, index: number) => (
                  <Item key={`campaign_status${index}`} value={picklistValue}>
                    {picklistValue}
                  </Item>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose}>
          Back
        </Button>
        <Button onClick={() => updateSalesforceCampaignStatus(status)}>Update status</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateCampaignMemberStatusModal;
