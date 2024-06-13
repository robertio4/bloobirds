import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import {
  Button,
  Icon,
  IconButton,
  Input,
  Item,
  Section,
  Select,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { isValidPhone } from '@bloobirds-it/utils';
import classnames from 'clsx';
import { parsePhoneNumber } from 'libphonenumber-js';
import md5 from 'md5';
import mixpanel from 'mixpanel-browser';

import { companyUrl, leadUrl } from '../../../app/_constants/routes';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { useOpenContactFlow } from '../../../hooks';
import { useActiveCompany } from '../../../hooks/useActiveCompany';
import { ApiHosts } from '../../../misc/api/ApiHosts';
import { request } from '../../../misc/api/utils';
import {
  getValueFromLogicRole,
  getFieldsByType,
  getTextFromLogicRole,
} from '../../../utils/bobjects.utils';
import { useUserSettings } from '../../userPermissions/hooks';
import Keypad from '../keypad';
import styles from './logCallTab.module.css';

const LogCallTab = ({
  availablePhones = [],
  handleClose = () => {},
  leads,
  selectedConnectionPhone,
  selectedLead,
  setSelectedConnectionPhone,
  updateSelectedLead,
  inputPhoneNumber,
  setInputPhoneNumber,
}) => {
  const { open } = useOpenContactFlow();
  const [callDirection, setCallDirection] = useState('OUTGOING');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: keypadRef, visible: isKeypadVisible, setVisible: setIsKeypadVisible } = useVisible();
  const history = useHistory();
  const { company } = useActiveCompany();
  const companyPhoneNumbers = useMemo(
    () => getFieldsByType(company, 'PHONE').filter(phone => !!phone.value),
    [company],
  );
  const leadPhoneNumbers = useMemo(
    () => getFieldsByType(selectedLead, 'PHONE').filter(phone => !!phone.value),
    [selectedLead],
  );
  const selectedLeadName = getValueFromLogicRole(
    selectedLead,
    LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
    true,
  );
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const [selectedUserPhone, setSelectedUserPhone] = useState(
    availablePhones?.length > 0 ? availablePhones[0] : 'no-twilio-phone',
  );
  const isButtonDisabled = !selectedUserPhone || !isValidPhone(inputPhoneNumber);
  const { createToast } = useToasts();
  const settings = useUserSettings();
  const autoChangePhoneExtension = settings?.user?.autoChangePhoneExtension;

  useEffect(() => {
    if (!selectedConnectionPhone || !inputPhoneNumber) {
      if (leadPhoneNumbers.length > 0) {
        setSelectedConnectionPhone(leadPhoneNumbers[0].value);
        setInputPhoneNumber(leadPhoneNumbers[0].value);
      } else if (companyPhoneNumbers.length > 0) {
        setSelectedConnectionPhone(companyPhoneNumbers[0].value);
        setInputPhoneNumber(companyPhoneNumbers[0].value);
      }
    }
  }, [leadPhoneNumbers, companyPhoneNumbers]);

  const handleOnLogCall = () => {
    setIsSubmitting(true);
    request({
      host: ApiHosts.callService.host(),
      url: '/whiteLabel/call',
      body: {
        sdrPhone: selectedUserPhone,
        leadPhone: inputPhoneNumber,
        companyId: company?.id?.value,
        leadId: selectedLead?.id?.value,
        callDateTime: new Date().toISOString(),
        direction: callDirection,
        callSid: `BB${md5(`${selectedUserPhone}${inputPhoneNumber}${Date.now()}`)}`,
      },
      method: 'POST',
      failureAction: () => {
        console.info('failed');
      },
    }).then(response => {
      setIsSubmitting(false);
      const { activity } = response;
      createToast({ type: 'success', message: 'Call logged correctly' });
      open(activity?.objectId);
      handleClose();
      mixpanel.track('OUTGOING_CALL_MANUAL_CREATED');
    });
  };

  const handleVisitContactView = () => {
    if (company) {
      history.push(companyUrl(company));
    } else if (selectedLead) {
      history.push(leadUrl(selectedLead));
    }
  };

  useEffect(() => {
    try {
      if (
        autoChangePhoneExtension &&
        inputPhoneNumber &&
        availablePhones &&
        availablePhones.length > 1
      ) {
        const parsedInputPhone = parsePhoneNumber(inputPhoneNumber);
        if (
          parsedInputPhone &&
          (!selectedUserPhone ||
            parsePhoneNumber(selectedUserPhone)?.country !== parsedInputPhone?.country)
        ) {
          const userPhonesSameCountry = availablePhones.filter(userPhone => {
            try {
              const parsedUserPhone = parsePhoneNumber(userPhone);
              return parsedUserPhone?.country === parsedInputPhone?.country;
            } catch (e) {
              return false;
            }
          });
          if (userPhonesSameCountry.length > 0) {
            setSelectedUserPhone(userPhonesSameCountry[0]);
          }
        }
      }
    } catch (e) {
      console.log('Not country in input phone number');
    }
  }, [inputPhoneNumber, availablePhones]);

  return (
    <div className={styles._container}>
      <div className={styles._input__container__link}>
        <Input
          placeholder="Company"
          value={companyName || 'Unknown company'}
          width="100%"
          inline
          darkMode
          disabled
        />
        <div className={styles._company_link} onClick={handleVisitContactView}>
          <Icon name="arrowRight" color="white" size={16} />
        </div>
      </div>
      <div className={styles._input__container}>
        <Select
          placeholder="Lead"
          width="100%"
          value={selectedLead?.id?.value || 'unknownLead'}
          darkMode
          onChange={value => updateSelectedLead(value)}
          disabled={leads.length === 0}
        >
          {leads?.length > 0 ? (
            leads?.map(lead => (
              <Item value={lead?.id?.value} key={`lead-${lead?.id?.value}`}>
                {getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME) ||
                  getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL) ||
                  'Untitled lead'}
              </Item>
            ))
          ) : (
            <Item value="unknownLead">Unknown lead</Item>
          )}
        </Select>
      </div>
      <div className={styles._input__container}>
        <Select
          placeholder="Phone number"
          value={selectedConnectionPhone}
          onChange={value => {
            setInputPhoneNumber(value);
            setSelectedConnectionPhone(value);
          }}
          width="100%"
          darkMode
        >
          {leadPhoneNumbers?.length > 0 && <Section icon="person">{selectedLeadName}</Section>}
          {leadPhoneNumbers?.length > 0 &&
            leadPhoneNumbers?.map(phone => (
              <Item key={`lead-phone-${phone?.value}`} value={phone?.value}>
                {phone.value}
              </Item>
            ))}
          {companyPhoneNumbers.length > 0 && <Section icon="company">{companyName}</Section>}
          {companyPhoneNumbers.length > 0 &&
            companyPhoneNumbers.map(phone => (
              <Item key={`company-phone-${phone?.value}`} value={phone?.value}>
                {phone?.value}
              </Item>
            ))}
        </Select>
      </div>
      <div className={styles._phone__container}>
        <input
          className={styles._phone_number}
          value={inputPhoneNumber}
          onPaste={event => {
            setInputPhoneNumber(event.target.value.replace(/[^0-9, ^+]/g, ''));
          }}
          onChange={event => {
            setInputPhoneNumber(event.target.value);
          }}
          onKeyDown={event => {
            const { keyCode, key, ctrlKey, metaKey } = event;
            const allowCode = [187, 37, 39, 46, 8, 107];

            if ((ctrlKey || metaKey) && (key === 'c' || key === 'x' || key === 'v')) {
              return;
            }

            if (
              (keyCode < 48 || keyCode > 57) &&
              (keyCode < 96 || keyCode > 105) &&
              allowCode.indexOf(keyCode) === -1
            ) {
              event.preventDefault();
            }
          }}
        />
      </div>
      <div className={styles._input__container}>
        <Select
          placeholder="Your Bloobirds number"
          value={selectedUserPhone}
          width="100%"
          darkMode
          onChange={value => setSelectedUserPhone(value)}
        >
          {availablePhones && availablePhones.length > 0 ? (
            availablePhones.map(phone => (
              <Item key={`available-phone-${phone.value}`} value={phone}>
                {phone}
              </Item>
            ))
          ) : (
            <Item value="no-twilio-phone">Your account does not have an active phone number</Item>
          )}
        </Select>
      </div>
      <>
        <Select
          placeholder="Direction"
          size="medium"
          value={callDirection}
          width="100%"
          darkMode
          onChange={isOutgoing => setCallDirection(isOutgoing)}
        >
          <Item value="OUTGOING">Outgoing</Item>
          <Item value="INCOMING">Incoming</Item>
        </Select>
      </>
      <div className={styles._buttons__container}>
        <Keypad
          anchor={
            <IconButton
              name="dragAndDrop"
              color="white"
              onClick={() => setIsKeypadVisible(!isKeypadVisible)}
            />
          }
          handleClose={() => setIsKeypadVisible(!isKeypadVisible)}
          innerRef={keypadRef}
          handleKeyPress={value => {
            if (value === 'backspace') {
              setInputPhoneNumber(inputPhoneNumber.slice(0, -1));
              return null;
            }
            setInputPhoneNumber(`${inputPhoneNumber || ''}${value}`);
            return null;
          }}
          visible={isKeypadVisible}
        />
        <div
          className={classnames(styles._button__wrapper, {
            [styles._disabled]: isButtonDisabled || isSubmitting,
          })}
        >
          <Button
            dataTest="Dialer-LogCallAction"
            color="extraCall"
            iconLeft="plus"
            variant="primary"
            onClick={handleOnLogCall}
            disabled={isButtonDisabled || isSubmitting}
          >
            LOG CALL MANUALLY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogCallTab;
