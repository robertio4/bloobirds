import React, { useEffect, useState } from 'react';

import { IconButton, Tab, TabGroup, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import classnames from 'clsx';

import { useDialer, usePhoneConnections, useRouter } from '../../hooks';
import { useActiveCompany } from '../../hooks/useActiveCompany';
import { ServiceApi } from '../../misc/api/service';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { isCompanyPage, isLeadPage, isOpportunityPage } from '../../utils/pages.utils';
import { useUserSettings } from '../userPermissions/hooks';
import CallErrorModalView from './callErrorModal';
import styles from './dialer.module.css';
import {
  isCallActive,
  isCallEnded,
  isCallIncoming,
  isCallIncomingToSDRPhone,
  isCallInCourse,
} from './dialer.utils';
import DialerWeb from './dialerWeb';
import LogCallTab from './logCallTab';
import { useSetCallFromPhoneSubscriptions } from './useCallFromPhoneSubscriptions';

const TABS = Object.freeze({
  webDialer: 'Dialer',
  logCall: 'Log call',
});

const DialerView = () => {
  const settings = useUserSettings();
  const { company: activeCompany } = useActiveCompany();
  const defaultTab = settings?.user?.dialerDefaultView;
  const [selectedTab, setSelectedTab] = useState(() => {
    return TABS[defaultTab] || TABS.webDialer;
  });

  const {
    activity,
    company,
    context,
    handleCloseDialer,
    isOpen,
    leads,
    openDialer,
    opportunity,
    selectedLead,
    send,
    getCompanyById,
    updateActivity,
    updateLeadsByCompany,
    updateSelectedLead,
    value: dialerState,
  } = useDialer();

  const { connection, errors, isIncomingCall } = context;
  const { connections, phonesList } = usePhoneConnections();
  const [newPhones, setNewPhones] = useState();

  const [fromPhoneNumber, setFromPhoneNumber] = useState('');
  const [isCallMuted, setIsCallMuted] = useState(false);
  const [callMethod, setCallMethod] = useState(
    settings?.user.incomingCallsForwarding ? connections?.defaultConnection?.phoneNumber : 'dialer',
  );

  useSetCallFromPhoneSubscriptions(
    send,
    !!settings?.user.incomingCallsForwarding || callMethod !== 'dialer',
  );

  const selectedLeadPhoneNumber = getValueFromLogicRole(selectedLead, 'LEAD__PHONE');
  const [selectedConnectionPhone, setSelectedConnectionPhone] = useState(selectedLeadPhoneNumber);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(selectedConnectionPhone);

  const { ref: keypadRef, visible: isKeypadVisible, setVisible: setIsKeypadVisible } = useVisible();

  const [selectedUserPhone, setSelectedUserPhone] = useState(
    newPhones?.length > 0 ? newPhones[0] : 'no-twilio-phone',
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [timerStatus, setTimerStatus] = useState('stopped');

  const { pathname } = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const callActive = isCallActive(dialerState);

  useEffect(() => {
    if (phonesList?.phones) {
      setNewPhones(phonesList?.phones.map(phone => phone.phoneNumber));
    }
  }, [phonesList?.phones]);

  useEffect(() => {
    if (errors.length >= 1) {
      setShowErrorModal(true);
    }
  }, [errors.length]);

  useEffect(() => {
    if (isOpen) {
      setTimerStatus('stopped');
      setCallMethod(
        settings?.user.incomingCallsForwarding
          ? connections.defaultConnection?.phoneNumber
          : 'dialer',
      );
      if (
        activeCompany?.id.objectId !== company?.id.objectId &&
        !isCallInCourse(dialerState) &&
        !isCallIncoming(dialerState)
      ) {
        getCompanyById(activeCompany?.id.objectId);
        updateLeadsByCompany(activeCompany?.id.value);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (leads.length > 0 && !selectedLead) {
      updateSelectedLead(leads[0]?.id.value);
    }
  }, [leads, isOpen]);

  useEffect(() => {
    const isIncoming = isCallIncoming(dialerState) || isCallIncomingToSDRPhone(dialerState);
    if (connection && isIncoming) {
      setSelectedTab(TABS.webDialer);

      const incomingPhone = connection.parameters.From;

      ServiceApi.request({
        url: '/calls/findBobjectsByPhone',
        method: 'GET',
        requestParams: { phone: incomingPhone },
      })
        .then(response => {
          setFromPhoneNumber(incomingPhone);
          openDialer({ leads: [response.lead], company: response.company });
        })
        // Incoming calls of unknown lead
        .catch(() => {
          setFromPhoneNumber(incomingPhone);
          openDialer({ leads: [], company: null });
        });
    }
  }, [connection?.parameters.From, dialerState]);

  useEffect(() => {
    if (isCallInCourse(dialerState)) {
      setTimerStatus('playing');
    }

    if (isCallEnded(dialerState)) {
      setTimerStatus('paused');
      setIsCallMuted(false);
      setFromPhoneNumber();
    }

    if (isOpen && !callActive) {
      const isSelectedLeadPage =
        isLeadPage(pathname) && pathname.includes(selectedLead?.id.objectId);
      const isSelectedCompanyPage =
        isCompanyPage(pathname) && pathname.includes(company?.id.objectId);
      const isSelectedOpportunity =
        isOpportunityPage(pathname) && pathname.includes(opportunity?.id.objectId);
      const isPreviousOpportunityPage = isOpportunityPage(prevPathname);
      if (
        (!isCompanyPage(pathname) && !isLeadPage(pathname)) ||
        (isCompanyPage(pathname) && !isSelectedCompanyPage) ||
        (isLeadPage(pathname) && !isSelectedLeadPage) ||
        (isOpportunityPage(pathname) && !isSelectedOpportunity) ||
        isOpportunityPage(pathname) !== isPreviousOpportunityPage
      ) {
        handleCloseDialer();
        setIsKeypadVisible(false);
      }
    }
    setPrevPathname(pathname);
  }, [dialerState, pathname]);

  useEffect(() => {
    setSelectedConnectionPhone(selectedLeadPhoneNumber);
  }, [selectedLead?.id.objectId]);

  useEffect(() => {
    setSelectedConnectionPhone(selectedLeadPhoneNumber);
  }, [selectedLeadPhoneNumber]);

  useEffect(() => {
    if (newPhones?.length > 0) {
      setSelectedUserPhone(newPhones[0]);
    }
  }, [newPhones]);

  useEffect(() => {
    setInputPhoneNumber(isIncomingCall ? fromPhoneNumber : selectedConnectionPhone || '');
  }, [isIncomingCall, fromPhoneNumber, selectedConnectionPhone]);

  useEffect(() => {
    setSelectedTab(TABS[defaultTab]);
  }, [defaultTab]);

  useEffect(
    () => () => {
      setInputPhoneNumber();
      setSelectedConnectionPhone();
    },
    [],
  );

  return (
    <>
      {showErrorModal && (
        <CallErrorModalView
          open={showErrorModal}
          errorCode={errors[0] ? errors[0].connection.code : 10001}
          close={() => setShowErrorModal(false)}
        />
      )}
      {isOpen && (
        <>
          <div className={styles._empty_space} />
          <div
            className={classnames(styles._container, {
              [styles._tab_container]: settings?.user?.enableLogCall,
            })}
            data-intercom="dialer-container"
          >
            {settings?.user?.enableLogCall && settings?.user?.dialerType === 'BLOOBIRDS_DIALER' ? (
              <>
                {!isCallInCourse(dialerState) && (
                  <div className={styles._close_icon__container}>
                    <IconButton
                      name="cross"
                      color="white"
                      onClick={() => {
                        handleCloseDialer();
                        setIsKeypadVisible(false);
                      }}
                    />
                  </div>
                )}
                <TabGroup value={selectedTab} onClick={setSelectedTab}>
                  <Tab color="white" name="Dialer">
                    <div className={styles._tab_content}>
                      <DialerWeb
                        activity={activity}
                        company={company}
                        context={context}
                        dialerState={dialerState}
                        fromPhoneNumber={fromPhoneNumber}
                        inputPhoneNumber={inputPhoneNumber}
                        isCallMuted={isCallMuted}
                        isKeypadVisible={isKeypadVisible}
                        keypadRef={keypadRef}
                        leads={leads}
                        newPhones={newPhones}
                        selectedConnectionPhone={selectedConnectionPhone}
                        selectedLead={selectedLead}
                        selectedUserPhone={selectedUserPhone}
                        send={send}
                        setInputPhoneNumber={setInputPhoneNumber}
                        setIsCallMuted={setIsCallMuted}
                        setIsKeypadVisible={setIsKeypadVisible}
                        setSelectedConnectionPhone={setSelectedConnectionPhone}
                        setSelectedUserPhone={setSelectedUserPhone}
                        setShowErrorModal={setShowErrorModal}
                        timerStatus={timerStatus}
                        updateActivity={updateActivity}
                        updateSelectedLead={updateSelectedLead}
                      />
                    </div>
                  </Tab>
                  <Tab
                    dataTest="Dialer-LogCall"
                    color="white"
                    name="Log call"
                    disabled={isCallActive(dialerState)}
                  >
                    <LogCallTab
                      availablePhones={newPhones}
                      handleClose={handleCloseDialer}
                      leads={leads}
                      selectedLead={selectedLead}
                      updateSelectedLead={updateSelectedLead}
                      inputPhoneNumber={inputPhoneNumber}
                      selectedConnectionPhone={selectedConnectionPhone}
                      setInputPhoneNumber={setInputPhoneNumber}
                      setSelectedConnectionPhone={setSelectedConnectionPhone}
                    />
                  </Tab>
                </TabGroup>
              </>
            ) : (
              <>
                <div className={styles._header__container}>
                  <div className={styles._title__container}>
                    <Text color="softPeanut" size="m">
                      Dialer
                    </Text>
                  </div>
                  {!isCallInCourse(dialerState) && (
                    <div className={styles._close_icon__container}>
                      <IconButton
                        name="cross"
                        color="white"
                        onClick={() => {
                          handleCloseDialer();
                          setIsKeypadVisible(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                {settings?.user?.dialerType === 'BLOOBIRDS_DIALER' && (
                  <DialerWeb
                    activity={activity}
                    company={company}
                    context={context}
                    dialerState={dialerState}
                    fromPhoneNumber={fromPhoneNumber}
                    inputPhoneNumber={inputPhoneNumber}
                    isCallMuted={isCallMuted}
                    isKeypadVisible={isKeypadVisible}
                    keypadRef={keypadRef}
                    leads={leads}
                    newPhones={newPhones}
                    selectedConnectionPhone={selectedConnectionPhone}
                    selectedLead={selectedLead}
                    selectedUserPhone={selectedUserPhone}
                    send={send}
                    setInputPhoneNumber={setInputPhoneNumber}
                    setIsCallMuted={setIsCallMuted}
                    setIsKeypadVisible={setIsKeypadVisible}
                    setSelectedConnectionPhone={setSelectedConnectionPhone}
                    setSelectedUserPhone={setSelectedUserPhone}
                    setShowErrorModal={setShowErrorModal}
                    timerStatus={timerStatus}
                    updateActivity={updateActivity}
                    updateSelectedLead={updateSelectedLead}
                  />
                )}
                {settings?.user?.enableLogCall && (
                  <LogCallTab
                    availablePhones={newPhones}
                    handleClose={handleCloseDialer}
                    leads={leads}
                    selectedLead={selectedLead}
                    updateSelectedLead={updateSelectedLead}
                    inputPhoneNumber={inputPhoneNumber}
                    selectedConnectionPhone={selectedConnectionPhone}
                    setInputPhoneNumber={setInputPhoneNumber}
                    setSelectedConnectionPhone={setSelectedConnectionPhone}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DialerView;
