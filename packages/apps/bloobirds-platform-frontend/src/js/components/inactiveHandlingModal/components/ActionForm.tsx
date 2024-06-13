import React, { Dispatch, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { CadencePreview } from '@bloobirds-it/cadence';
import {
  Callout,
  DateTimePicker,
  Icon,
  Input,
  Item,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';
import { sortBy } from 'lodash';

import { GLOBAL_PICKLISTS } from '../../../constants/globalPicklists';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useActiveUser, useOpportunity } from '../../../hooks';
import useCadenceSteps from '../../../hooks/useCadenceSteps';
import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useCadences } from '../../../hooks/useCadences';
import { useGlobalPicklistValues, usePicklistValues } from '../../../hooks/usePicklistValues';
import { Bobject, MainBobjectTypes } from '../../../typings/bobjects';
import { CadenceObject } from '../../../typings/cadence';
import { UserObject } from '../../../typings/user';
import CadenceSelector from '../../cadenceSelector/cadenceSelector';
import { INACTIVE_HANDLING_OPTIONS, modalAndActionText } from '../inactiveHandling.constant';
import styles from './informationPanel.module.css';

const AddTaskComponent = ({ handleData }: { handleData?: (data: any) => void }) => {
  const activeUserId = useActiveUser()?.activeUser?.id;
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter(user => user?.enabled);

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center" className={styles._add_task_title}>
        Add the task’s details
      </Text>
      <Input
        placeholder="Title *"
        width="552px"
        onChange={title => {
          handleData({ title });
        }}
      />
      <div className={styles._selects_wrapper}>
        <Select
          placeholder="Assigned To"
          width="270px"
          defaultValue={activeUserId}
          onChange={assignedTo => handleData({ assignedTo })}
        >
          {sortBy(users, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
        <DateTimePicker
          placeholder="Schedule Datetime"
          defaultValue={new Date()}
          width="270px"
          onChange={date => handleData({ date })}
        />
      </div>
    </div>
  );
};

const DiscardComponent = ({
  bobject,
  handleData,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
}) => {
  const discardedReasons = useGlobalPicklistValues({
    logicRole: GLOBAL_PICKLISTS.DISCARDED_REASON,
  })?.filter(reason => reason.enabled);
  const closedLostReason = usePicklistValues({
    picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.CLOSED_LOST_REASON,
  });
  const isOpportunity = bobject?.id?.typeName === BobjectTypes.Opportunity;

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        {modalAndActionText[bobject?.id?.typeName as MainBobjectTypes]?.actionText}?
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={isOpportunity ? 'Closed lost reason*' : 'Discarded Reason *'}
          width="564px"
          onChange={discardedValue => handleData({ discardedValue })}
        >
          {sortBy(isOpportunity ? closedLostReason : discardedReasons, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

const OnHoldComponent = ({
  handleData,
}: {
  bobject: Bobject;
  handleData?: (data: any) => void;
}) => {
  const onHoldReasons = useGlobalPicklistValues({
    logicRole: GLOBAL_PICKLISTS.ON_HOLD_REASONS,
  })?.filter(reason => reason.enabled);

  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        What is the reason for sending to on hold?
      </Text>
      <div className={styles._selects_wrapper}>
        <Select
          placeholder={'On Hold Reason *'}
          width="564px"
          onChange={onHoldedValue => {
            handleData({ onHoldedValue });
          }}
        >
          {sortBy(onHoldReasons, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value}
            </Item>
          ))}
        </Select>
      </div>
    </div>
  );
};

const ReassignComponent = ({ handleData }: { handleData?: (data: any) => void }) => {
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter((user: UserObject) => user.enabled);
  return (
    <div className={styles._add_task_module}>
      <Text size="m" weight="bold" align="center">
        Select a colleague to reassign
      </Text>
      <div className={styles._reassign_selects_wrapper}>
        <Select
          placeholder="Assigned To"
          width="564px"
          onChange={assignedTo => handleData({ assignedTo })}
        >
          {sortBy(users, 'value')?.map(item => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
      </div>
      {/*<Input placeholder="Note for the new user" width="564px" height="100px"/>*/}
    </div>
  );
};

const CadenceComponent = ({
  bobject,
  isNurturing,
  handleData,
}: {
  bobject: Bobject;
  isNurturing?: boolean;
  handleData?: (data: any) => void;
}) => {
  const [showCadenceSelector, setShowCadenceSelector] = useState(false);
  const { cadence, defaultCadence } = useCadenceTable(bobject);
  const [selectedCadence, setSelectedCadence] = useState(cadence?.id);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { oppNurturingValues } = useOpportunity('inactiveModal');
  const isBulkAction = Array.isArray(bobject);
  const selectedBobject = isBulkAction ? bobject[0] : bobject;
  const { cadences } = useCadences(selectedBobject?.id.typeName);

  const { steps } = useCadenceSteps(selectedCadence);
  const [isStartCadenceWithDateTime, setIsStartCadenceWithDateTime] = useState(false);

  const ref = useRef(null);
  const modalRef = useRef(null);
  useClickAway(ref, () => setShowCadenceSelector(false));

  const enabledCadences = cadences?.filter(
    (cadenceElement: CadenceObject) => cadenceElement?.enabled,
  );

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
      modalRef?.current?.click();
    }
  }, [showCadenceSelector]);

  const bobjectName = selectedBobject?.id.typeName;
  const findCadenceByName = cadenceName =>
    cadences?.find(cadenceData => cadenceData.name === cadenceName);

  const hasCadences = cadences?.length > 0;

  return (
    <div className={styles._add_task_module} ref={modalRef}>
      {isNurturing && bobjectName === BobjectTypes.Opportunity && (
        <>
          <Text size="m" weight="bold" align="center" className={styles._add_task_title}>
            Which Nurturing status do you want to change the opportunity to?
          </Text>
          <div className={styles._nurturing_preview_wrapper}>
            {oppNurturingValues?.length === 0 ? (
              <Callout variant="alert" withoutIcon={true} width="100%">
                <div className={styles._stage_callout__wrapper}>
                  <Icon name="info" color="banana" className={styles._stage_callout__icon} />
                  <Text size="s">
                    You do not have any opportunity stage set up as nurturing. Continue with the
                    current one or set up a new stage{' '}
                    <a
                      href={'https://app.bloobirds.com/app/playbook/sales-pipeline'}
                      target="_blank"
                      rel="noreferrer"
                    >
                      on your Sales Pipeline
                    </a>
                  </Text>
                </div>
              </Callout>
            ) : (
              <Select
                dataTest={`OPPORTUNITY__STATUS`}
                placeholder={'Nurturing opportunity stages*'}
                width="564px"
                onChange={nurturingStage => handleData({ nurturingStage })}
              >
                {sortBy(oppNurturingValues, 'value')?.map(item => (
                  <Item key={item.id} value={item.id}>
                    {item.value}
                  </Item>
                ))}
              </Select>
            )}
          </div>
        </>
      )}
      <Text size="m" weight="bold" align="center" className={styles._add_task_title}>
        What cadence do you want to use?
      </Text>
      <div className={styles._cadence_preview_wrapper}>
        <CadencePreview cadenceId={selectedCadence} selectedBobject={bobject} />
      </div>
      {showCadenceSelector && (
        <CadenceSelector
          selectedBobject={bobject}
          onCadenceSelected={c => {
            handleData({ cadenceId: c.id });
            setSelectedCadence(c.id);
            setShowCadenceSelector(false);
          }}
          className={clsx(styles.box, { [styles._nurturing_bottom]: isNurturing })}
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
            width="270px"
            onClick={() => setShowCadenceSelector(true)}
            dropdownProps={{ visible: false }}
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
            width="270px"
            placeholder="Start cadence date *"
            withTimePicker={isStartCadenceWithDateTime}
            onChange={startCadenceDate => {
              setSelectedDate(startCadenceDate);
              handleData({ startCadenceDate });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ActionForm = ({
  selectedOptionHandler,
  bobject,
  isSalesBobject,
}: {
  selectedOptionHandler: [
    { type: INACTIVE_HANDLING_OPTIONS; data: any },
    Dispatch<React.SetStateAction<{ type: INACTIVE_HANDLING_OPTIONS; data: any }>>,
  ];
  bobject: Bobject;
  isSalesBobject: boolean;
}) => {
  const [selectedOption, setSelectedOption] = selectedOptionHandler;

  let component;

  switch (selectedOption?.type) {
    case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
      component = <AddTaskComponent />;
      break;
    case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
      component = <CadenceComponent isNurturing bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
      component = <CadenceComponent bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.REASSIGN:
      component = <ReassignComponent />;
      break;
    case INACTIVE_HANDLING_OPTIONS.DISCARD:
      component = <DiscardComponent bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
      component = isSalesBobject ? <></> : <OnHoldComponent bobject={bobject} />;
      break;
    case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
    default:
      component = <></>;
      break;
  }

  return React.cloneElement(component, {
    handleData: (data: any) => {
      setSelectedOption({ ...selectedOption, data: { ...selectedOption.data, ...data } });
    },
  });
};

export default ActionForm;
