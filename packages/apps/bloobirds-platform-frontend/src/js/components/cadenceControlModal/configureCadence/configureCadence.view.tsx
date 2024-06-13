import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { CadencePreview } from '@bloobirds-it/cadence';
import {
  Button,
  Callout,
  DateTimePicker,
  Item,
  ModalContent,
  ModalFooter,
  Select,
  Spinner,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';
import { addHours, isBefore } from 'date-fns';
import spacetime from 'spacetime';

import AlertMessage from '../../../components/accountAlerts/alertMessage';
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_STATUS_LOGIC_ROLE } from '../../../constants/lead';
import { useCadenceControl } from '../../../hooks';
import useCadenceSteps from '../../../hooks/useCadenceSteps';
import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useCadences } from '../../../hooks/useCadences';
import { useHasCadenceStarted } from '../../../hooks/useHasCadenceStarted';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  isLead,
  isOpportunity,
} from '../../../utils/bobjects.utils';
import CadenceSelector from '../../cadenceSelector/cadenceSelector';
import CadenceIcon from '../cadenceIcon';
import styles from './configureCadence.module.css';

const parseDate = date => new Date(date.getTime() - date.getTimezoneOffset() * 60000);

const ConfigureCadenceStep = ({
  handleBack,
  handleNext,
}: {
  handleBack: () => void;
  handleNext: (hasLeads?: boolean) => void;
}) => {
  const { bobject, saveCadence, previousStep } = useCadenceControl();
  const { cadence, defaultCadence } = useCadenceTable(Array.isArray(bobject) ? undefined : bobject);
  const { isStarted: cadenceStarted } = useHasCadenceStarted();
  const [selectedCadence, setSelectedCadence] = useState(cadence?.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateHasChanged, setDateHasChanged] = useState(false);

  const isBulkAction = Array.isArray(bobject);
  const selectedBobject = isBulkAction ? bobject[0] : bobject;
  const { cadences } = useCadences(selectedBobject?.id.typeName);

  const { steps } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
  const ref = useRef(null);
  const modalRef = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));

  const isSelectedDatePast = isBefore(
    addHours(selectedDate, 1) || new Date(),
    new Date().setHours(0),
  );

  const LOGIC_ROLES = FIELDS_LOGIC_ROLE[selectedBobject?.id.typeName];

  const enabledCadences = cadences?.filter(cadenceElement => cadenceElement?.enabled);

  const stage = isOpportunity(bobject) ? 'sales' : 'prospecting';

  useEffect(() => {
    let showDateTime = false;
    steps?.forEach(step => {
      if (step?.dayNumber === 0 && step.actionTypes.includes('AUTOMATED_EMAIL')) {
        showDateTime = step.automationSchedulingMode === 'DELAY';
      }
    });
    setIsStartCadenceWithDateTime(showDateTime);
  }, [steps, selectedCadence]);

  useLayoutEffect(() => {
    if (!showCadenceSelector) {
      modalRef.current.click();
    }
  }, [showCadenceSelector]);

  const bobjectName = selectedBobject?.id.typeName;
  const findCadenceByName = cadenceName =>
    cadences?.find(cadenceData => cadenceData.name === cadenceName);

  const generateData = isActionInBulk => {
    if (isActionInBulk) {
      return {
        currentCadence: null,
        currentStartDate: null,
        defaultCadence: null,
      };
    }

    return {
      currentCadence: cadence,
      currentStartDate: getTextFromLogicRole(bobject, LOGIC_ROLES?.START_CADENCE),
      currentDefaultCadence: defaultCadence,
    };
  };
  const { currentCadence, currentStartDate, currentDefaultCadence } = generateData(isBulkAction);

  const hasData = !!(selectedCadence && selectedDate);
  const cadenceHasChanged = selectedCadence !== currentCadence?.id;

  useEffect(() => {
    if (currentDefaultCadence) {
      setSelectedCadence(currentDefaultCadence?.id);
    }
  }, [currentDefaultCadence]);

  useEffect(() => {
    if (currentCadence) {
      setSelectedCadence(cadence?.enabled ? currentCadence?.id : null);
    }
  }, [currentCadence]);

  useEffect(() => {
    if (currentStartDate) {
      setSelectedDate(new Date(currentStartDate));
    }
  }, [currentStartDate]);

  useEffect(() => {
    if (selectedDate?.getHours() === 0 && selectedDate?.getMinutes() === 0) {
      selectedDate.setHours(new Date().getHours());
      selectedDate.setMinutes(new Date().getMinutes());
      setSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  const disableButton =
    isSubmitting || !hasData || (!(dateHasChanged || cadenceHasChanged) && cadenceStarted);
  const showMessage =
    (selectedCadence === findCadenceByName(defaultCadence)?.id &&
      selectedCadence &&
      defaultCadence) ||
    (selectedDate && !isOpportunity);
  const hasCadences = cadences?.length > 0;
  const showLeadChangeStatusMessage =
    isLead(bobject) &&
    [
      LEAD_STATUS_LOGIC_ROLE.NEW,
      LEAD_STATUS_LOGIC_ROLE.BACKLOG,
      LEAD_STATUS_LOGIC_ROLE.DELIVERED,
    ].includes(getFieldByLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.STATUS)?.valueLogicRole);

  return (
    <>
      {isLead(bobject) && !cadences && (
        <div className={styles._banner_wrapper}>
          <Callout text={<AlertMessage type="noLeadCadence" />} width="100%" variant="alert" />
        </div>
      )}
      <ModalContent>
        <div className={styles._section_title__wrapper} ref={modalRef}>
          <Text
            dataTest="Text-Modal-ConfigureProspectingCadence"
            size="m"
            weight="medium"
            color="peanut"
          >
            Which cadence do you want to use?
          </Text>
        </div>
        <div className={styles._cadence_preview_wrapper}>
          <CadencePreview cadenceId={selectedCadence} />
        </div>
        {showCadenceSelector && (
          <CadenceSelector
            selectedBobject={selectedBobject}
            onCadenceSelected={c => {
              setSelectedCadence(c.id);
              setShowCadenceSelector(false);
            }}
            ref={ref}
          />
        )}
        <div className={styles._section__wrapper}>
          <div className={styles._list__wrapper}>
            <Select
              dataTest={`${bobjectName?.toUpperCase()}__CADENCE`}
              defaultValue={defaultCadence && findCadenceByName(defaultCadence)?.id}
              value={selectedCadence || (!hasCadences && 'none')}
              placeholder={`${bobjectName} cadence *`}
              disabled={!hasCadences}
              width="100%"
              onClick={() => setShowCadenceSelector(true)}
            >
              {hasCadences ? (
                enabledCadences?.map(cadenceItem => (
                  <Item
                    value={cadenceItem.id}
                    key={cadenceItem.id}
                    dataTest={`${cadenceItem.name}`}
                    className={styles.hidden}
                  >
                    {cadenceItem.name}
                  </Item>
                ))
              ) : (
                <Item value="none" dataTest="cadence-not-exist">
                  None
                </Item>
              )}
            </Select>
          </div>
          <div className={styles._date_picker__wrapper}>
            <DateTimePicker
              dataTest="BaseInput-Cadence-DatetimePicker"
              value={selectedDate}
              placeholder="Start cadence date *"
              withTimePicker={isStartCadenceWithDateTime}
              onChange={date => {
                setDateHasChanged(true);
                setSelectedDate(date);
              }}
            />
          </div>
        </div>
        {isSelectedDatePast && (
          <Callout width="100%" variant="alert" icon="alertTriangle">
            If you select a past date, only today and future tasks will be scheduled. If you want
            all the cadence tasks to be scheduled, select a future date or today.
          </Callout>
        )}
        {showLeadChangeStatusMessage && (
          <div
            className={clsx(styles._on_prospection_message, {
              [styles._with_more_messages]: isSelectedDatePast,
            })}
          >
            <Text size="m" htmlTag="span" color="peanut" inline>
              <span role="img" aria-label="backhand">
                👉{' '}
              </span>
              If they come from previous status New, Backlog and Delivered, both the{' '}
              <b>lead and its company</b> (if available) will change to status <b>on prospection</b>
              .
            </Text>
          </div>
        )}
        {!isBulkAction && hasCadences && showMessage ? (
          <Callout variant="alert" width="100%" withoutIcon>
            <div className={styles._message__wrapper}>
              <CadenceIcon />
              <div>
                <span role="img" aria-label="hand">
                  👉
                </span>{' '}
                {selectedCadence === findCadenceByName(defaultCadence)?.id && (
                  <b>This is your recommended {stage} cadence!</b>
                )}{' '}
                {!selectedDate && <>Select a date to continue.</>}
              </div>
            </div>
          </Callout>
        ) : (
          <div className={styles._cadence_placeholder} />
        )}
        {isBulkAction && (
          <Callout width="100%" withoutIcon>
            <div className={styles._message__wrapper}>
              <CadenceIcon />
              <div>
                <span role="img" aria-label="hand">
                  👉
                </span>{' '}
                The selected cadence will replace the default cadence.
              </div>
            </div>
          </Callout>
        )}
      </ModalContent>
      <ModalFooter>
        <div className={styles._buttons__wrapper}>
          {previousStep && (
            <Button variant="clear" onClick={handleBack}>
              Back
            </Button>
          )}
          <div>
            <Tooltip
              title={
                disableButton && 'Remember to change the start cadence date to start a new cadence'
              }
              position="top"
            >
              <Button
                dataTest="saveCadence"
                disabled={disableButton}
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    if (selectedCadence && selectedDate) {
                      const startCadenceDate = isStartCadenceWithDateTime
                        ? spacetime(selectedDate).format('iso-utc')
                        : parseDate(selectedDate);
                      saveCadence(selectedCadence, handleNext, startCadenceDate);
                    }
                  }, 2500);
                }}
              >
                {isSubmitting ? <Spinner name="loadingCircle" size={16} color="white" /> : 'Next'}
              </Button>
            </Tooltip>
          </div>
        </div>
      </ModalFooter>
    </>
  );
};

export default ConfigureCadenceStep;
