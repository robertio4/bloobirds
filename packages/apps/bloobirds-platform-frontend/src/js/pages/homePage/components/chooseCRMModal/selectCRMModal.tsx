import React, { useState } from 'react';
import {
  Button,
  Icon,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import classNames from 'classnames';
import styles from './selectCRMModal.module.css';
import { CRM } from '../../../../constants/integrations';
import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
} from '../../../../app/_constants/routes';

const getBoxDescription = (crm: 'HUBSPOT' | 'SALESFORCE' | string) => {
  switch (crm) {
    case CRM.HUBSPOT:
      return 'Connect with your Hubspot Account. You need to have a working Hubspot Account.';
    case CRM.SALESFORCE:
      return 'Connect your Salesforce Account. It’s preferred that the Salesforce user is a System Administrator profile ';
  }
};

const CRMLogo = ({
  logo,
  name,
  onChange,
  checked,
}: {
  logo: IconType;
  name: string;
  onChange: () => void;
  checked: boolean;
}) => {
  const boxDescription = getBoxDescription(name);
  return (
    <div
      className={classNames(styles._box__container, {
        [styles._box__container__checked]: checked,
      })}
      onClick={() => onChange()}
    >
      <Icon className={styles._logo} name={logo} size={40} color="lightPurple" />
      <Text size="s" align="center" className={styles._name__container}>
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
      </Text>
      <Text size="xs" className={styles._text__container}>
        {boxDescription}
      </Text>
    </div>
  );
};

export const SelectCRMViewModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedCRMUrl, setSelectedCRMUrl] = useState('');

  return (
    <Modal open onClose={onClose} variant="primary">
      <ModalHeader size="small" color="verySoftPurple">
        <ModalTitle>
          <div className={styles._title__container}>
            <Icon size={24} color="lightPurple" name="assignBoard" className={styles._icon} />
            <Text size="m" color="peanut">
              Integrate your CRM
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} size="small" color="purple" />
      </ModalHeader>
      <ModalContent>
        <Text size="l" color="peanut">
          What CRM do you wish to integrate with Bloobirds?
        </Text>
        <Text size="m" color="softPeanut" inline={true}>
          Choose the CRM that you’re interested in connecting with Bloobirds. In the integration
          page you’ll find useful resources to help and guide you through this process
        </Text>
        <div className={styles._bobject_selector_wrapper}>
          <CRMLogo
            logo="hubspot"
            name={CRM.HUBSPOT}
            onChange={() => setSelectedCRMUrl(APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS)}
            checked={selectedCRMUrl === APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS}
          />
          <CRMLogo
            logo="salesforce"
            name={CRM.SALESFORCE}
            onChange={() => setSelectedCRMUrl(APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS)}
            checked={selectedCRMUrl === APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose} color="lightPurple">
          CANCEL
        </Button>
        <Button
          onClick={() => {
            window.location.href = selectedCRMUrl;
          }}
          color="purple"
        >
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};
