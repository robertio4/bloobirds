import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useAddToCalendar, useDataModel } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { addMinutes, api, formatDate, getValueFromLogicRole } from '@bloobirds-it/utils';

import { methods } from './addToCalendarModal.constants';
import styles from './addToCalendarModal.module.css';
import { buildCalendarLink } from './addToCalendarModal.utils';

const getBobjectData = (id: string) => {
  return api.get(`/bobjects/${id}/form`).then(response => {
    return response.data;
  });
};

const AddToCalendarModal = () => {
  const { closeAddToCalendarModal, addToCalendarState } = useAddToCalendar();
  const {
    leadId,
    companyId,
    opportunityId,
    title,
    dateTime,
    accountExecutiveId,
    bobjectType,
  } = addToCalendarState;
  const { settings } = useActiveUserSettings();
  const { t } = useTranslation();
  const isOutlook = settings?.settings.calendarLinksType !== 'GOOGLE_CALENDAR';
  const [lead, setLead] = useState<Bobject>(null);
  const [company, setCompany] = useState<Bobject>(null);
  const [opportunity, setOpportunity] = useState<Bobject>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dataModel = useDataModel();
  const eventTitle = title || t('common.untitledEvent');

  useEffect(() => {
    if (leadId && (!lead || lead.id.value !== leadId)) {
      setLoading(true);
      getBobjectData(leadId).then(response => {
        setLead(response);
        setLoading(false);
      });
    }
  }, [leadId, lead]);

  useEffect(() => {
    if (companyId && (!company || company?.id.value !== companyId)) {
      setLoading(true);
      getBobjectData(companyId).then(response => {
        setCompany(response);
        setLoading(false);
      });
    }
  }, [companyId, company]);

  useEffect(() => {
    if (opportunityId && (!opportunity || opportunity?.id.value !== opportunityId)) {
      setLoading(true);
      getBobjectData(opportunityId).then(response => {
        setOpportunity(response);
        setLoading(false);
      });
    }
  }, [opportunityId, opportunity]);

  const name = useMemo(() => {
    if (opportunity) {
      return getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
    }
    if (lead) {
      return getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
    }
    if (company) {
      return getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME);
    }
    return '';
  }, [company, lead, opportunity]);

  const url = useMemo(() => {
    const eventLeadName = name && `${t('addToCalendarModal.with')} ${name}`;
    const calendarEventTitle = `${eventTitle}${eventLeadName}`;
    const leadEmail = getValueFromLogicRole(lead, 'LEAD__EMAIL');
    const guests = [];

    if (leadEmail && bobjectType === 'Activity') {
      guests.push(leadEmail);
    }
    if (accountExecutiveId && bobjectType === 'Activity') {
      guests.push(
        dataModel
          .findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE)
          ?.values?.find(ae => ae.id === accountExecutiveId).name,
      );
    }

    return (
      dateTime &&
      buildCalendarLink(
        {
          title: calendarEventTitle,
          fromDate: dateTime,
          toDate: addMinutes(dateTime as number, 30),
          guests,
        },
        isOutlook ? methods.METHOD_OUTLOOK : methods.METHOD_GOOGLE,
      )
    );
  }, [name, title, dateTime, settings, lead]);

  const openLink = () => {
    window.open(url, '_blank');
    closeAddToCalendarModal();
  };

  return (
    <Modal open onClose={closeAddToCalendarModal} width={500}>
      <ModalHeader>
        <ModalTitle>{t('addToCalendarModal.title')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <Text color="softPeanut" size="m" align="center">
          {t('addToCalendarModal.header')}
        </Text>
        <div className={styles._main}>
          <div className={styles._calendar}>
            <header>
              <Text align="center" size="m" weight="bold" color="white">
                {formatDate(dateTime, 'MMM').toUpperCase()}
              </Text>
            </header>
            <div>
              <Text align="center" size="xxl" weight="bold" color="peanut">
                {(dateTime as Date)?.getDate()}
              </Text>
              <Text align="center" size="s" color="peanut">
                {formatDate(dateTime, 'hh:mm a').toLowerCase()}
              </Text>
            </div>
          </div>
          <div className={styles._text}>
            <Text size="l" weight="bold" color="peanut">
              {eventTitle}
            </Text>
            {loading ? (
              <Spinner name="dots" />
            ) : (
              name && (
                <Text size="m" color="peanut">
                  {t('common.with')} {name}
                </Text>
              )
            )}
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button dataTest="Form-Close" onClick={closeAddToCalendarModal} variant="tertiary">
          {t('common.close')}
        </Button>
        <Button onClick={openLink} variant="primary">
          {t('addToCalendarModal.addToCalendar')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddToCalendarModal;
