import React from 'react';

import { useAstrolineVisibility, AstrolineSvg } from '@bloobirds-it/dialer';
import { Action, Dropdown, Item, Section, Tooltip, useVisible } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { AircallSvg, AircallSvgDisabled, JustCallSvgSettings } from '../../../../../assets/svg';
import { LeadTableActionsTooltip } from '../../../../components/discoveryTooltips/leadTableActionsTooltip';
import { useJustCallVisibility } from '../../../../components/justCallDialer/hooks/useJustCall';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useEntity } from '../../../../hooks';
import { useAirCallDialerVisibility } from '../../../../hooks/useAirCallDialerVisibility';
import { Bobject } from '../../../../typings/bobjects';
import { getFieldsByType, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import styles from '../leadTableActions.module.css';

export const LeadTableCallAction = ({
  leads,
  company,
  selectedLead,
  onClick,
  onOpenDialerClick,
}: {
  leads: Bobject[];
  company: Bobject;
  selectedLead: Bobject;
  onClick: () => void;
  onOpenDialerClick: () => void;
}) => {
  const settings = useUserSettings();
  const activeLead = leads?.find(lead => lead?.id?.objectId === selectedLead?.id?.objectId);
  const { openAirCallDialer } = useAirCallDialerVisibility();
  const { openJustCallDialer } = useJustCallVisibility();
  const { openAstrolineDialer } = useAstrolineVisibility();
  const leadPhoneNumbers =
    activeLead && getFieldsByType(activeLead, 'PHONE')?.filter((phone: any) => !!phone.value);
  const companyPhoneNumbers = getFieldsByType(company, 'PHONE')?.filter(
    (phone: any) => !!phone.value,
  );
  const selectedLeadName = getValueFromLogicRole(
    selectedLead,
    LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
    true,
  );
  const companyName = getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  const {
    ref: callRef,
    visible: isCallDropdownVisible,
    setVisible: setCallDropdownVisible,
  } = useVisible();

  const toggleVisibility = () => {
    setCallDropdownVisible(!isCallDropdownVisible);
  };

  const isAirCallActive = settings?.user?.dialerType === 'AIRCALL_DIALER';
  const isJustCallActive = settings?.user?.dialerType === 'JUST_CALL_DIALER';
  const isAstrolineActive = settings?.user?.dialerType === 'ASTROLINE_DIALER';
  const handleOpenAirCallDialer = (phoneNumber: string) => {
    openAirCallDialer(phoneNumber);
    mixpanel.track(MIXPANEL_EVENTS.AIRCALL_DIALER_OPENED);
  };

  const aircallUsers = useEntity('aircallUsers');
  const myAircallUserExists =
    aircallUsers && aircallUsers.all().some((user: any) => user.bloobirdsUser === settings.user.id);
  return (
    <LeadTableActionsTooltip helperKey={UserHelperKeys.CALL_AND_REPORT_RESULT}>
      {isAirCallActive || isJustCallActive || isAstrolineActive ? (
        <Dropdown
          ref={callRef}
          visible={isCallDropdownVisible}
          position="top"
          anchor={
            <Action
              icon="phone"
              color="melon"
              dataTest="callButton"
              onClick={() => {
                toggleVisibility();
              }}
            />
          }
        >
          {leadPhoneNumbers?.length > 0 && <Section icon="person">{selectedLeadName}</Section>}
          {leadPhoneNumbers?.length > 0 &&
            leadPhoneNumbers.map((phone: any) => (
              <Item
                key={`lead-phone-${phone.value}`}
                value={phone.value}
                className={styles._phone_item}
              >
                {phone.value}{' '}
                {isAirCallActive && (
                  <>
                    {myAircallUserExists ? (
                      <AircallSvg
                        onClick={() => {
                          handleOpenAirCallDialer(phone.value);
                          setCallDropdownVisible(false);
                          onClick();
                        }}
                      />
                    ) : (
                      <Tooltip
                        title="You don't have any Aircall User assigned, ask your admin to assign you one in Bloobirds Settings"
                        position="top"
                      >
                        <AircallSvgDisabled />
                      </Tooltip>
                    )}
                  </>
                )}
                {isJustCallActive && (
                  <>
                    <JustCallSvgSettings
                      onClick={() => {
                        openJustCallDialer(phone.value);
                        setCallDropdownVisible(false);
                      }}
                    />
                  </>
                )}
                {isAstrolineActive && (
                  <>
                    <img
                      className={styles.astroline_icon_img}
                      alt="astroline-logo-mini"
                      src={AstrolineSvg}
                      onClick={() => {
                        openAstrolineDialer();
                        // @ts-ignore
                        window.frames.sf?.postMessage(
                          { type: 'click2call', data: { number: phone?.value } },
                          '*',
                        );
                        setCallDropdownVisible(false);
                      }}
                    />
                  </>
                )}
                {settings.user.enableLogCall && (
                  <Action
                    icon="phone"
                    color="melon"
                    dataTest="callButton"
                    onClick={e => {
                      e.stopPropagation();
                      onOpenDialerClick();
                      setCallDropdownVisible(false);
                    }}
                  />
                )}
              </Item>
            ))}
          {companyPhoneNumbers.length > 0 && <Section icon="company">{companyName}</Section>}
          {companyPhoneNumbers.length > 0 &&
            companyPhoneNumbers.map((phone: any) => (
              <Item
                className={styles._phone_item}
                key={`company-phone-${phone.value}`}
                value={phone.value}
                onClick={() => handleOpenAirCallDialer(phone.value)}
              >
                {phone.value}{' '}
                {settings.user?.dialerType === 'AIRCALL_DIALER' && (
                  <>
                    {myAircallUserExists ? (
                      <AircallSvg
                        onClick={() => {
                          handleOpenAirCallDialer(phone.value);
                          setCallDropdownVisible(false);
                        }}
                      />
                    ) : (
                      <Tooltip
                        title="You don't have any Aircall User assigned, ask your admin to assign you one in Bloobirds Settings"
                        position="top"
                      >
                        <AircallSvgDisabled />
                      </Tooltip>
                    )}
                  </>
                )}
                {settings.user.enableLogCall && (
                  <Action
                    icon="phone"
                    color="melon"
                    dataTest="callButton"
                    onClick={e => {
                      e.stopPropagation();
                      onOpenDialerClick();
                      setCallDropdownVisible(false);
                    }}
                  />
                )}
              </Item>
            ))}
          {(leadPhoneNumbers ? leadPhoneNumbers?.length === 0 : true) &&
            companyPhoneNumbers?.length === 0 && <Item disabled>No phone numbers</Item>}
        </Dropdown>
      ) : (
        <Tooltip title="Call" position="top" trigger="hover">
          <Action
            icon="phone"
            color="melon"
            dataTest="callButton"
            onClick={() => {
              onOpenDialerClick();
              onClick();
            }}
          />
        </Tooltip>
      )}
    </LeadTableActionsTooltip>
  );
};
