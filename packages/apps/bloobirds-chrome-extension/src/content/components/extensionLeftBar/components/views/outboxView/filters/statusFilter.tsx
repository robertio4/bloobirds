import { useTranslation, Trans } from 'react-i18next';

import { useFilters } from '@bloobirds-it/filters';
import { Item, Select } from '@bloobirds-it/flamingo-ui';
import {
  BobjectField,
  BobjectTypes,
  TASK_AUTOMATED_STATUS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
} from '@bloobirds-it/types';

export const scheduledStatus = [
  { id: '', value: <Trans i18nKey={'leftBar.filters.all'} /> },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
    value: <Trans i18nKey={'leftBar.filters.scheduled'} />,
  },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED,
    value: <Trans i18nKey={'leftBar.filters.succesfullySent'} />,
  },
  {
    id: TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED,
    value: <Trans i18nKey={'leftBar.filters.failed'} />,
  },
];
export const automatedStatus = [
  { id: '', value: <Trans i18nKey={'leftBar.filters.all'} /> },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PENDING,
    value: <Trans i18nKey={'leftBar.filters.scheduled'} />,
  },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED,
    value: <Trans i18nKey={'leftBar.filters.succesfullySent'} />,
  },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.RESCHEDULED,
    value: <Trans i18nKey={'leftBar.filters.rescheduled'} />,
  },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.PAUSED,
    value: <Trans i18nKey={'leftBar.filters.paused'} />,
  },
  {
    id: TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED,
    value: <Trans i18nKey={'leftBar.filters.failed'} />,
  },
];

interface FilterProps {
  shouldBeDisplayed?: boolean;
  isAutomatedStatus?: boolean;
}

const StatusFilter = ({ shouldBeDisplayed = true, isAutomatedStatus }: FilterProps) => {
  const bobjectType = BobjectTypes.Task;
  const { setORsFilters } = useFilters();
  const { t } = useTranslation();
  const values = isAutomatedStatus ? automatedStatus : scheduledStatus;

  const handleOnChange = (value: string) => {
    if (value === TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED) {
      setORsFilters('statusFilter', value, bobjectType, [
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
          filterValues: TASK_AUTOMATED_STATUS_LOGIC_ROLE.FAILED,
        },
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
          filterValues: [TASK_STATUS_VALUE_LOGIC_ROLE.REJECTED],
        },
      ]);
    } else if (value === TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED) {
      setORsFilters('statusFilter', value, bobjectType, [
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
          filterValues: TASK_AUTOMATED_STATUS_LOGIC_ROLE.COMPLETED,
        },
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
          filterValues: [
            TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED,
            TASK_STATUS_VALUE_LOGIC_ROLE.COMPLETED_OVERDUE,
          ],
        },
      ]);
    } else {
      setORsFilters('statusFilter', value, bobjectType, [
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.STATUS,
          filterValues: [TASK_STATUS_VALUE_LOGIC_ROLE.TODO, TASK_STATUS_VALUE_LOGIC_ROLE.OVERDUE],
        },
        {
          fieldLR: TASK_FIELDS_LOGIC_ROLE.AUTOMATED_STATUS,
          filterValues: value ? [value] : '',
        },
      ]);
    }
  };

  return (
    <>
      {shouldBeDisplayed ? (
        <Select
          size="small"
          variant="filters"
          placeholder={t('leftBar.filters.status')}
          onChange={handleOnChange}
          autocomplete={values?.length > 8}
        >
          {values?.map((item: BobjectField) => (
            <Item key={item.id} value={item.id}>
              {item.value || item?.name}
            </Item>
          ))}
        </Select>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatusFilter;
