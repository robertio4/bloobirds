import React, { useEffect, useMemo, useState } from 'react';
import {
  Callout,
  Checkbox,
  Chip,
  ChipGroup,
  Icon,
  Item,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import PropTypes from 'prop-types';
import styles from './syncDealsHubspot.css';
import { useFeatureFlags, useFullSalesEnabled } from '../../../../../../hooks/useFeatureFlags';
import { CRM_DISPLAY_NAME } from '../../../../../../constants/integrations';

const SyncDealsHubspot = ({
  accountMeetingTrigger,
  dealPipeline,
  handleDisabled,
  disabled,
  stages,
  handleMeetingTrigger,
  isMeeting,
  accountOpportunityTrigger,
  handleOpportunityTrigger,
  meetingType,
  disabledCallOutPipelines,
  setDisabledCallOutPipelines,
}) => {
  const isSalesEnabled = useFullSalesEnabled();

  const { isFlagEnabled } = useFeatureFlags();
  const isActiveHubspotInbound = isFlagEnabled('INBOUND_HUBSPOT');

  const [disableSelects, setDisabledSelects] = useState(!accountMeetingTrigger.createDeal);
  const [disableSalesSelects, setDisabledSalesSelects] = useState(
    !accountOpportunityTrigger?.createOpportunity,
  );
  const [selectedStages, setSelectedStages] = useState(
    stages && stages[accountMeetingTrigger.dealPipeline],
  );
  const mappedStages = useMemo(
    () =>
      stages &&
      stages[accountMeetingTrigger?.dealPipeline]?.map(stage => (
        <Item key={stage?.stageId} value={stage?.stageId}>
          {stage?.label}
        </Item>
      )),
    [selectedStages],
  );
  const mappedOppStages = useMemo(
    () =>
      stages &&
      stages[accountOpportunityTrigger?.dealPipeline]?.map(stage => (
        <Item key={stage?.stageId} value={stage?.stageId}>
          {stage?.label}
        </Item>
      )),
    [selectedStages],
  );
  const mappedPipelines = useMemo(
    () =>
      dealPipeline?.map(pipeline => (
        <Item key={pipeline?.pipelineId} value={pipeline?.pipelineId}>
          {pipeline?.label}
        </Item>
      )),
    [dealPipeline],
  );
  const defaultStage = useMemo(() => accountMeetingTrigger?.dealStage, [accountMeetingTrigger]);

  const handlePipelineChange = value => {
    setSelectedStages(stages[value]);
    handleDisabled({ ...disabled, isDisabledDeals: false });
    setDisabledCallOutPipelines(false);
    handleMeetingTrigger({ ...accountMeetingTrigger, dealPipeline: value });
  };
  const handleCreateOppChange = value => {
    if (
      value &&
      accountOpportunityTrigger?.dealPipeline &&
      accountOpportunityTrigger?.defaultStage
    ) {
      handleDisabled({ ...disabled, isDisabledDeals: false });
    }
    if (!value) {
      handleDisabled({ ...disabled, isDisabledDeals: false });
    }
  };

  return (
    <div className={styles._container}>
      {!isSalesEnabled && (
        <div className={!isMeeting ? styles._disabled_chip_group : styles._chipGroup}>
          <Text color={!isMeeting ? 'softPeanut' : 'peanut'} size="m" weight="bold">
            Do you also want a Hubspot Deal to be created when a Meeting is created?
          </Text>

          <ChipGroup
            defaultValue={accountMeetingTrigger.createDeal}
            onChange={value => {
              setDisabledSelects(!disableSelects);
              handleDisabled({ ...disabled, isDisabledDeals: false });
              handleMeetingTrigger({ ...accountMeetingTrigger, createDeal: value });
            }}
          >
            <Chip value disabled={!isMeeting}>
              Yes
            </Chip>
            <Chip value={false} disabled={!isMeeting}>
              No
            </Chip>
          </ChipGroup>
        </div>
      )}
      {isSalesEnabled && !meetingType && (
        <>
          <Checkbox
            expand
            onClick={value => {
              handleCreateOppChange(value);
              handleOpportunityTrigger({
                ...accountOpportunityTrigger,
                createOpportunity: value,
              });
              setDisabledSalesSelects(!value);
            }}
            defaultChecked={accountOpportunityTrigger?.createOpportunity}
          >
            {`Create Opportunities from Bloobirds to ${CRM_DISPLAY_NAME.HUBSPOT} as Deals`}
          </Checkbox>
          <div className={styles._children_multiselect}>
            <Text color={'peanut'} size="m" weight="bold">
              Default deal pipeline:
            </Text>

            <Icon name="arrowRight" color="softPeanut" size="24" />
            {mappedPipelines && (
              <div>
                <Select
                  value={accountOpportunityTrigger?.dealPipeline}
                  onChange={value => {
                    if (value !== accountOpportunityTrigger?.dealPipeline) {
                      handleDisabled({ ...disabled, isDisabledDeals: false });
                      handleOpportunityTrigger({
                        ...accountOpportunityTrigger,
                        dealPipeline: value,
                        dealStageMapping: {},
                        defaultStage: '',
                      });
                      setSelectedStages(stages[value]);
                    }
                  }}
                  width="310px"
                  disabled={disableSalesSelects}
                  placeholder="Default Hubspot Pipeline*"
                >
                  {mappedPipelines}
                </Select>
              </div>
            )}
          </div>
          <div className={styles._children_multiselect}>
            <Text color={'peanut'} size="m" weight="bold">
              Default Hubspot Stage:
            </Text>

            <Icon name="arrowRight" color="softPeanut" size="24" />
            {mappedPipelines && (
              <div>
                <Select
                  value={accountOpportunityTrigger?.defaultStage}
                  onChange={value => {
                    if (value !== accountOpportunityTrigger?.defaultStage) {
                      handleDisabled({ ...disabled, isDisabledDeals: false });
                      handleOpportunityTrigger({
                        ...accountOpportunityTrigger,
                        defaultStage: value,
                      });
                    }
                  }}
                  width="310px"
                  disabled={disableSalesSelects}
                  placeholder="Default Hubspot Stage*"
                >
                  {mappedOppStages}
                </Select>
              </div>
            )}
          </div>
        </>
      )}
      {!isSalesEnabled && meetingType && (
        <>
          <div className={styles._text}>
            <Text
              color={disableSelects || !isMeeting ? 'softPeanut' : 'peanut'}
              size="m"
              weight="bold"
            >
              Default state of Deals when created:
            </Text>
          </div>
          {mappedPipelines && (
            <div className={styles._select_group}>
              <Select
                defaultValue={accountMeetingTrigger.dealPipeline}
                onChange={handlePipelineChange}
                placeholder="Default Hubspot Pipeline*"
                disabled={disableSelects || !isMeeting}
                width="310px"
              >
                {mappedPipelines}
              </Select>

              <Select
                value={defaultStage}
                onChange={value => {
                  handleDisabled({ ...disabled, isDisabledActivities: false });
                  handleMeetingTrigger({ ...accountMeetingTrigger, dealStage: value });
                }}
                placeholder="Default Hubspot Stage*"
                disabled={disableSelects || !isMeeting}
                width="310px"
              >
                {mappedStages}
              </Select>
              {isActiveHubspotInbound && !disabledCallOutPipelines && (
                <div className={styles._callout}>
                  <Callout variant="alert">
                    <span role="img" aria-label="icon-label">
                      👉
                    </span>
                    Changing the default deal pipeline also means to update the stage to change the
                    company status to account
                  </Callout>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SyncDealsHubspot;

SyncDealsHubspot.propTypes = {
  accountMeetingTrigger: PropTypes.any,
  dealPipeline: PropTypes.any,
};
