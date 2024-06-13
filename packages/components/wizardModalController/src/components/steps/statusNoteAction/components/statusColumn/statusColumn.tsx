import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Item, Label, RadioGroup, Select } from '@bloobirds-it/flamingo-ui';
import { Bobject, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';
import { EVENTS } from '@bloobirds-it/wizard-modal-context';

import { useStatusNoteActionContext } from '../../hooks/useStatusNoteActions';
import { ColumnHeader } from '../common/columnHeader';
import { AdditionalInfoSelect } from './components/aditionalInfoSelect';
import styles from './statusColumn.module.css';

const BobjectSelector = ({ bobjects }: { bobjects: Array<Bobject> }) => {
  const { bobjectType } = useStatusNoteActionContext();
  const { control } = useFormContext();
  const {
    field: { ref, ...selectField },
  } = useController({ name: 'selectedBobjectId', control });
  function getName(id: string) {
    const selectedBobject = bobjects.find(bobject => bobject?.id.value === id);
    return getTextFromLogicRole(selectedBobject, FIELDS_LOGIC_ROLE[bobjectType].NAME);
  }

  return (
    <Select
      width="100%"
      size="small"
      ref={ref as any}
      {...selectField}
      renderDisplayValue={v => {
        if (v) {
          return getName(v);
        }
      }}
    >
      {bobjects.map(bobject => {
        return (
          <Item key={bobject?.id.value} value={bobject?.id.value}>
            {getName(bobject?.id.value)}
          </Item>
        );
      })}
    </Select>
  );
};

export const StatusColumn = () => {
  const { bobject, t, machineContext } = useStatusNoteActionContext();
  const { t: commonT } = useTranslation('translation', { keyPrefix: 'common' });

  return (
    <>
      <ColumnHeader
        icon="activity"
        text={t('statusColumn.header')}
        subtext={t('statusColumn.description', {
          bobjectType: commonT(bobject?.id.typeName?.toLowerCase()),
        })}
      />
      {machineContext?.selectedOpportunityArray && (
        <BobjectSelector bobjects={machineContext.selectedOpportunityArray} />
      )}
      <ReducedStatusManager />
    </>
  );
};

function StatusSelector() {
  const {
    availableStatuses,
    handleSelectedStatus: [selectedStatus, setSelectedStatus],
    handleSelectedReason: [, setSelectedReason],
  } = useStatusNoteActionContext();

  return (
    <div className={styles._radios_list_status}>
      <RadioGroup
        value={selectedStatus}
        onChange={(value: string) => {
          setSelectedReason(null);
          setSelectedStatus(availableStatuses.find(({ id }) => id === value));
        }}
      >
        {availableStatuses?.map(status => {
          const isSelected = selectedStatus ? selectedStatus.id === status.id : false;
          const style = {
            backgroundColor: status.backgroundColor,
            borderColor: status.outlineColor,
            color: status.textColor,
          };
          const overrideStyle = isSelected ? { selectedStyle: style } : {};

          return (
            <Label
              value={status?.id}
              dataTest={status.logicRole}
              align="center"
              inline={false}
              key={`status-${status.name}`}
              selected={isSelected as boolean}
              hoverStyle={style}
              {...overrideStyle}
            >
              {status.name}
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

function ReducedStatusManager() {
  const { t, send } = useStatusNoteActionContext();
  const showRelatedStatuses = false;

  return (
    <div className={styles._change_lead_status__wrapper}>
      <StatusSelector />
      <AdditionalInfoSelect />
      {showRelatedStatuses && (
        <Button
          variant="clear"
          className={styles._change_lead_status__button}
          iconLeft="refresh"
          uppercase={false}
          onClick={() => {
            send(EVENTS.DETAIL);
          }}
        >
          {t('updateRelatedStatus')}
        </Button>
      )}
    </div>
  );
}
