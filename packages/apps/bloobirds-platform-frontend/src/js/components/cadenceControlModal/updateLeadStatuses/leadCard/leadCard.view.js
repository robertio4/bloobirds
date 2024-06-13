import { CircularBadge, Item, Select, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LabelsDropdown } from '../../../../components/labelsDropdown';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../../../../constants/lead';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useLeadReasons } from '../../../../hooks/useLeadReasons';
import { usePicklistValues } from '../../../../hooks/usePicklistValues';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { isDiscarded, isNurturing } from '../../../../utils/lead.utils';
import { ellipsis } from '../../../../utils/strings.utils';
import styles from './leadCard.module.css';

const LeadCard = ({ lead, opportunities }) => {
  const { control, setValue, watch, register } = useFormContext();

  const salesFeatureEnabled = useFullSalesEnabled();
  const {
    leadReasons,
    resetLeadReasonList,
    updateLeadReasons,
    isLoaded: reasonsLoaded,
  } = useLeadReasons(`lead-${lead?.id.objectId}`);
  const idealCustomerProfiles = useEntity('idealCustomerProfiles');
  const hasReasons = leadReasons?.list?.length > 0;
  const [leadICP, setLeadICP] = useState(
    idealCustomerProfiles?.get(getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
  );
  const leadId = useMemo(() => lead?.id.objectId, [lead]);
  const leadStage = useMemo(
    () => getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.STAGE)?.valueLogicRole,
    [lead],
  );
  const isLeadSales = leadStage === LEAD_STAGE_LOGIC_ROLE.SALES;
  const sales = isLeadSales ? 'SALES_' : '';
  const leadStatus = useMemo(
    () => getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE[`${sales}STATUS`])?.valueLogicRole,
    [lead],
  );
  const leadName = useMemo(
    () => getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)?.text,
    [lead],
  );
  const leadJobTitle = useMemo(
    () => getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE)?.text,
    [lead],
  );
  const leadOpportunity = useMemo(
    () => getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.value,
    [lead],
  );
  const leadReason = useMemo(() => {
    const status = leadStatus?.split('__')[2];
    return getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE[`${sales}${status}_REASONS`])?.value;
  }, [lead]);

  const leadStatuses = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE[`${sales}STATUS`],
  });
  const watchStatusField = watch(`${leadId}.status`);
  const disabledReasons = !isDiscarded(watchStatusField) && !isNurturing(watchStatusField);

  useEffect(() => setValue(`${leadId}.status`, leadStatus), [leadStatus]);
  useEffect(() => setValue(`${leadId}.opportunity`, leadOpportunity || 'none'), [leadOpportunity]);
  useEffect(() => setValue(`${leadId}.reason`, leadReason || 'not-apply'), [leadReason]);
  register(`${leadId}.sales`);
  useEffect(() => setValue(`${leadId}.sales`, sales || ''), [sales]);

  useLayoutEffect(() => {
    if (idealCustomerProfiles && !leadICP) {
      setLeadICP(
        idealCustomerProfiles.get(getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP)),
      );
    }
  }, [idealCustomerProfiles, leadICP]);

  useEffect(() => {
    if (!disabledReasons && !hasReasons && reasonsLoaded) {
      updateLeadReasons(leadStatus?.split('__')[2], isLeadSales);
    }
  }, [disabledReasons, hasReasons, reasonsLoaded]);

  useEffect(() => {
    if (
      [
        LEAD_STATUS_LOGIC_ROLE.DISCARDED,
        LEAD_STATUS_LOGIC_ROLE.NURTURING,
        LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.DISCARDED,
        LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.NURTURING,
      ].includes(watchStatusField)
    ) {
      if (leadReasons?.list?.length > 0 && (!leadReason || leadStatus !== watchStatusField)) {
        setValue(`${leadId}.reason`, leadReasons?.list[0]?.value);
      } else if (leadStatus === watchStatusField) {
        setValue(`${leadId}.reason`, leadReason);
      }
    } else {
      setValue(`${leadId}.reason`, 'not-apply');
    }
  }, [leadReasons, watchStatusField]);

  useEffect(() => () => resetLeadReasonList(), []);

  const leadStatusItems = useMemo(
    () =>
      leadStatuses
        .filter(status => status.enabled)
        .sort((a, b) => (a.ordering > b.ordering ? 1 : -1))
        .map(status => ({
          text: status?.value,
          styles: {
            backgroundColor: status?.backgroundColor,
            outlineColor: status?.outlineColor,
            textColor: status?.textColor,
          },
          id: status?.logicRole,
          ordering: status.ordering,
        })),
    [leadStatuses],
  );

  return (
    <div className={styles._container} key={`leadCard-${lead.id}`}>
      <div className={styles._column_1}>
        {leadICP ? (
          <Tooltip title="Lead name" trigger="hover" position="top">
            <CircularBadge
              size="medium"
              style={{
                backgroundColor: leadICP?.color || 'var(--verySoftPeanut)',
                color: 'white',
              }}
            >
              {leadICP?.shortname || ''}
            </CircularBadge>
          </Tooltip>
        ) : (
          <CircularBadge
            size="medium"
            style={{
              backgroundColor: 'var(--verySoftPeanut)',
              color: 'white',
              fontSize: 20,
            }}
          >
            ?
          </CircularBadge>
        )}
        <div className={styles._name__container}>
          <Text size="s">{ellipsis(leadName, 25)}</Text>
          <Text size="xs" color="softPeanut">
            {ellipsis(leadJobTitle, 27)}
          </Text>
        </div>
      </div>
      <div className={styles._column_2}>
        <div data-test="BaseInput-leadStatus" className={styles._lead_status}>
          {leadStatuses && (
            <Controller
              name={`${leadId}.status`}
              render={({ onChange, value }) => (
                <LabelsDropdown
                  items={leadStatusItems}
                  value={value}
                  width={175}
                  onChange={newValue => {
                    onChange(newValue);
                    if (isDiscarded(newValue) || isNurturing(newValue)) {
                      updateLeadReasons(newValue?.split('__')[2]);
                    } else if (leadReasons?.list?.length > 0) {
                      resetLeadReasonList();
                    }
                  }}
                />
              )}
              control={control}
            />
          )}
        </div>
        <div data-test="BaseInput-statusReason" className={styles._reasons_list}>
          <Controller
            name={`${leadId}.reason`}
            as={
              <Select
                dataTest="reasons"
                disabled={disabledReasons}
                size="small"
                borderless={false}
                width={218}
              >
                {hasReasons &&
                  leadReasons?.list.map(reason => (
                    <Item key={reason?.label} dataTest={reason?.label} value={reason?.value}>
                      {reason?.label}
                    </Item>
                  ))}
                {!hasReasons && <Item value="not-apply">Does not apply for this lead status</Item>}
              </Select>
            }
            control={control}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
