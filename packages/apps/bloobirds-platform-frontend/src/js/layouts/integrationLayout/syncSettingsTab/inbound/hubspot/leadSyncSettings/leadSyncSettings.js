import React, { useState } from 'react';
import {
  Checkbox,
  Icon,
  Text,
  Divider,
  RadioGroup,
  Radio,
  Spinner,
  Collapsible,
} from '@bloobirds-it/flamingo-ui';
import styles from './syncLeadSettings.module.css';
import ContactListSelect from './contactListSelect/contactListSelect';

const LeadSyncSettings = ({ config, setConfig, contactLists }) => {
  let defaultRadioValue;
  if (config.contactList === 0) {
    defaultRadioValue = 'noList';
  } else if (config.contactList === -1) {
    defaultRadioValue = 'workflow';
  } else {
    defaultRadioValue = config.contactList;
  }
  const [radioGroupValue, setRadioGroupValue] = useState(defaultRadioValue);
  const [selectedContactList, setSelectedContactList] = useState(
    Object.prototype.hasOwnProperty.call(config, 'contactList') ? config.contactList : 'null',
  );
  const handleConfig = (configName, value) => {
    if (configName === 'contactList' && value === 'noList') {
      setConfig(configName, 0);
    } else if (configName === 'contactList' && value === 'workflow') {
      setConfig(configName, -1);
    } else {
      setConfig(configName, value);
    }
  };
  const [visible, setVisible] = useState(false);
  const handleChangeSelect = value => {
    setSelectedContactList(value);
    setRadioGroupValue(value);
    handleConfig('contactList', value);
  };

  const handleChangeRadio = value => {
    setRadioGroupValue(value);
    handleConfig('contactList', value);
  };

  return (
    <div className={styles._container}>
      <div>
        <div className={styles._radio_group}>
          <RadioGroup value={radioGroupValue} onChange={handleChangeRadio}>
            <Radio value={'noList'}>Sync all contacts from HubSpot to Bloobirds</Radio>
            <Radio value={'workflow'}>Sync only contacts from HubSpot Workflows</Radio>
            <Radio value={selectedContactList}>
              Sync only selected contacts from HubSpot to Bloobirds
            </Radio>
          </RadioGroup>
        </div>
        <div className={styles._children_multiselect}>
          <Text
            color={radioGroupValue === 'noList' ? 'softPeanut' : 'peanut'}
            size="m"
            weight="bold"
          >
            Only sync contacts included in this HubSpot list:
          </Text>
          <Icon name="arrowRight" color="softPeanut" size="24" />
          {contactLists ? (
            <ContactListSelect
              visible={visible}
              handleVisible={setVisible}
              config={config}
              handleSelect={handleChangeSelect}
              contactLists={contactLists}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <div className={styles._divider}>
        <Divider />
      </div>
      <Collapsible
        title={
          <Text size="m" color="peanut" weight="bold" inline>
            Advanced Settings
          </Text>
        }
        arrowPosition="right"
        color="peanut"
        className={styles._collapsible}
      >
        <div className={styles._syncContact}>
          <Text color="peanut" size="m">
            When syncing a HubSpot contact which is assigned to a company
          </Text>
          <div className={styles._radio_group}>
            <RadioGroup
              value={config.syncCompanyFromContact}
              onChange={value => handleConfig('syncCompanyFromContact', value)}
            >
              <Radio value={false}>Sync only the contact to Bloobirds</Radio>
              <Radio value>Sync the contact and the company to Bloobirds</Radio>
            </RadioGroup>
          </div>
        </div>
      </Collapsible>
      <div className={styles._divider}>
        <Divider />
      </div>
      <div className={styles._checkBox_small}>
        <Text color="peanut" size="m" weight="bold">
          New Bloobirds leads are created with the following properties when synced from HubSpot:
        </Text>
        <Text color="softPeanut" size="m">
          If the lead is created without a company in Bloobirds
        </Text>
        <Checkbox
          size="small"
          onClick={value => handleConfig('leadMql', value)}
          checked={config.leadMql}
        >
          MQL accepted
        </Checkbox>
        <Checkbox
          size="small"
          onClick={value => handleConfig('leadSal', value)}
          checked={config.leadSal}
        >
          SAL accepted
        </Checkbox>
        <Text color="softPeanut" size="m">
          If the lead is assigned to a company in Bloobirds
        </Text>
        <Checkbox
          size="small"
          onClick={value => handleConfig('leadCompanyMql', value)}
          checked={config.leadCompanyMql}
        >
          MQL accepted
        </Checkbox>
        <Checkbox
          size="small"
          onClick={value => handleConfig('leadCompanySal', value)}
          checked={config.leadCompanySal}
        >
          SAL accepted
        </Checkbox>
      </div>
    </div>
  );
};
export default LeadSyncSettings;
