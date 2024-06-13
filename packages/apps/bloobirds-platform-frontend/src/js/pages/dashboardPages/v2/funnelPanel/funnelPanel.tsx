import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Dropdown,
  Icon,
  IconButton,
  Item,
  SankeyChart,
  Section,
  Select,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountSettings,
  useNoStatusOppSetting,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { format } from 'date-fns';
import useSWR from 'swr';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { Panel } from '../../../../constants/newDashboards';
import { useEntity } from '../../../../hooks';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { useNewDrillDownModal } from '../../../../hooks/useNewDrillDownModal';
import { buildSankeyTooltipForEntity } from '../../funnelPanel/sankeyTooltip/sankeyTooltip';
import { useFunnelData } from '../../v1/panels/shared/useFunnelData';
import styles from './funnelPanel.module.css';

interface StepsSlidersProps {
  onAccept: (prevSteps: number, laterSteps: number) => void;
  onCancel: () => void;
  prevSteps: number;
  laterSteps: number;
}

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
}

interface Status {
  id: string;
  value: string;
  enabled: string;
  ordering: number;
}

interface GroupedStatuses {
  disabled: Status[];
  enabled: Status[];
}

interface RecordTypes {
  Id: string;
  Name: string;
}

interface SalesforceStage {
  active: boolean;
  defaultValue: boolean;
  label: string;
  validFor: string;
  value: string;
}

const SalesforceStageSelector = ({ onChangeStage }: { onChangeStage: (stage: string) => void }) => {
  const { data: recordTypes } = useSWR('/utils/service/salesforce/getRecordTypes', () =>
    api
      .get<RecordTypes[]>('/utils/service/salesforce/getRecordTypes')
      .then(response => response.data),
  );

  const [selectedRecordType, setSelectedRecordType] = useState<string | undefined>(
    recordTypes ? recordTypes[0]?.Id : undefined,
  );

  const { data: stages } = useSWR(
    selectedRecordType && `/utils/service/salesforce/opportunityStages/${selectedRecordType}`,
    () =>
      api
        .get<SalesforceStage[]>(`/utils/service/salesforce/opportunityStages/${selectedRecordType}`)
        .then(response => response.data),
  );
  const [selectedStage, setSelectedStage] = useState<string | undefined>(
    stages?.length > 0 ? stages[0].value : undefined,
  );

  useEffect(() => {
    if (!selectedRecordType && recordTypes && recordTypes.length > 0) {
      setSelectedRecordType(recordTypes[0].Id);
    }
  }, [recordTypes]);

  useEffect(() => {
    if (stages && selectedRecordType && selectedStage != stages[0].value) {
      setSelectedStage(stages[0].value);
    }
  }, [selectedRecordType, stages]);

  useEffect(() => {
    if (selectedStage) {
      onChangeStage(selectedStage);
    }
  }, [selectedStage]);

  return (
    <div className={styles.salesforceStageSelector}>
      <Select
        size="small"
        borderless={false}
        width="112px"
        placeholder="Record type"
        value={selectedRecordType}
        onChange={value => setSelectedRecordType(value)}
      >
        {recordTypes?.map(type => (
          <Item key={type.Id} value={type.Id}>
            {type.Name}
          </Item>
        ))}
      </Select>
      <Select
        size="small"
        borderless={false}
        width="112px"
        placeholder="Salesforce stage"
        value={selectedStage}
        onChange={value => setSelectedStage(value)}
      >
        {stages?.map(stage => (
          <Item key={stage.value} value={stage.value}>
            {stage.label}
          </Item>
        ))}
      </Select>
    </div>
  );
};

const Slider = ({ value, onChange, min, max, label }: SliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(parseInt(e.target.value));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const setRangeBackground = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const val = parseInt(target.value);

      target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
    };

    const element = inputRef.current;

    element.addEventListener('input', setRangeBackground);

    return () => {
      element.removeEventListener('input', setRangeBackground);
    };
  }, []);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const currentVal = parseInt(inputRef.current.value);
      inputRef.current.style.backgroundSize = ((currentVal - min) * 100) / (max - min) + '% 100%';
    }
  }, [inputRef]);

  return (
    <div className={styles.sliderRoot}>
      <Text className={styles.sliderLabel} size="s" color="darkGray">
        {label}
      </Text>
      <div className={styles.sliderInputWrapper}>
        <Text size="s" color="darkGray">
          {min}
        </Text>
        <input
          id="mySlider"
          type="range"
          className={styles.sliderInput}
          value={value}
          onChange={handleChange}
          min={1}
          max={4}
          step={1}
          ref={inputRef}
        />
        <Text size="s" color="darkGray">
          {max}
        </Text>
      </div>
    </div>
  );
};

const StepsSliders = ({ onAccept, onCancel, prevSteps, laterSteps }: StepsSlidersProps) => {
  const [prev, setPrev] = useState<number>(prevSteps ?? 1);
  const [later, setLater] = useState<number>(laterSteps ?? 1);

  const handleAccept = () => {
    if (onAccept) {
      onAccept(prev, later);
    }
  };
  return (
    <div className={styles.stepsRoot}>
      <Slider value={prev} onChange={setPrev} min={1} max={4} label={'Nº of Previous Steps'} />
      <Slider value={later} onChange={setLater} min={1} max={4} label={'Nº of Later Steps'} />
      <div className={styles.stepsButtons}>
        <Button size="small" variant="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export const FunnelPanel = ({ panelDefinition }: { panelDefinition: Panel }) => {
  const { save: saveHelper, has: hasHelper } = useUserHelpers();
  const title = panelDefinition.title;
  const panelInformation = panelDefinition.information;
  const bobjectField = useEntity('bobjectFields')?.findByLogicRole(panelDefinition.funnelField);
  const statuses = useEntity('bobjectPicklistFieldValues')?.filterBy(
    'bobjectField',
    bobjectField?.id,
  );

  const groupedStatuses: GroupedStatuses = statuses?.reduce(
    (acc: GroupedStatuses, status: Status) => {
      if (status.enabled) {
        acc.enabled = [...acc.enabled, status];
      } else {
        acc.disabled = [...acc.disabled, status];
      }
      return acc;
    },
    { enabled: [], disabled: [] },
  );

  groupedStatuses?.disabled.sort((a, b) => a.ordering - b.ordering);
  groupedStatuses?.enabled.sort((a, b) => a.ordering - b.ordering);
  const [startingStatus, setStartingStatus] = useState<string>();
  const { launchFunnelDrillDown, setIsFunnel, setOpenDrillDown } = useNewDrillDownModal();
  const isNoStatusOppAccount = useNoStatusOppSetting();
  const { isLoading } = useActiveAccountSettings();
  const [firstLoad, setFirstLoad] = useState(true);

  const [steps, setSteps] = useState<{ later: number; prev: number }>({ prev: 1, later: 1 });
  const { groupBy } = useDashboardFilters();

  useEffect(() => {
    if (!isOpportunityPanel || (!isNoStatusOppAccount && !isLoading)) {
      if (firstLoad) {
        setStartingStatus(
          statuses?.find(
            (st: { logicRole: string }) => st.logicRole === panelDefinition.funnelStartingStatus,
          )?.id,
        );
        setFirstLoad(false);
      }
    }
  }, [isLoading, isNoStatusOppAccount, statuses]);

  const handleChangeStatus = (value: string) => {
    setStartingStatus(value);
  };
  const { data, loading } = useFunnelData({
    entity: panelDefinition.report,
    startingStatus,
    steps,
    colorKeys: panelDefinition.keysColors,
    salesforceStage: !!isNoStatusOppAccount,
  });
  const { ref: dropdownRef, visible: dropdownVisible, setVisible } = useVisible(false);

  const handleStepsChange = (prev: number, later: number) => {
    setSteps({ prev, later });
    setVisible(false);
  };

  const handleClickNode = (node: { name: string; nodeDepth: number; valueId: string }) => {
    setIsFunnel(true);
    setOpenDrillDown(true);
    launchFunnelDrillDown({
      entity: panelDefinition.report,
      startingStatus,
      title: node.name,
      targetStatus: node.valueId,
      targetStatusDepth: node.nodeDepth,
      limit: 10,
      offset: 0,
      salesforceStage: !!isNoStatusOppAccount,
    });
  };

  const disclaimers = groupBy ? 'Chart cannot be grouped' : '';

  const isMeetingResultFunnel = panelDefinition.report === 'Activity';
  const meetingResultsDate = new Date('2022-011-22');

  const userSettings = useUserSettings();
  const showHint =
    userSettings?.account &&
    new Date(userSettings.account?.accountCreationDatetime) < meetingResultsDate &&
    !hasHelper(UserHelperKeys.DONT_SHOW_AGAIN_MEETING_FUNNEL_DATE_HINT);

  const hideHint = () => saveHelper(UserHelperKeys.DONT_SHOW_AGAIN_MEETING_FUNNEL_DATE_HINT);
  let statusTitle = 'Select starting prospecting status';
  if (panelDefinition.report === 'Activity') {
    statusTitle = 'Select starting result';
  }
  if (panelDefinition.report === 'Opportunity') {
    statusTitle = 'Select starting status';
    if (isNoStatusOppAccount) {
      statusTitle = 'Select starting stage';
    }
  }
  const isOpportunityPanel = panelDefinition.report === 'Opportunity';

  return (
    <div className={styles.funnelRoot}>
      {isMeetingResultFunnel && showHint && (
        <div className={styles.headerHint}>
          <div className={styles.headerHint_hint}>
            <Icon name="alertTriangle" color="banana" />
            <Text size="s">
              This chart will only display the evolution of data starting from{' '}
              {format(meetingResultsDate, 'yyyy-MM-dd')}.{' '}
              <Text size="s" weight="bold" inline>
                Unregistered data cannot be displayed.
              </Text>
            </Text>
          </div>
          <IconButton name="cross" color="peanut" onClick={hideHint} />
        </div>
      )}

      <div className={styles.header}>
        <div className={styles._chart_top_wrapper}>
          <div className={styles._chart_title_wrapper}>
            <Text
              size="m"
              weight="medium"
              color="softPeanut"
              className={styles._chart_title_wrapper}
            >
              {title}
            </Text>
            {panelInformation && (
              <div className={styles.tooltipWrapper}>
                <Tooltip title={panelInformation} position="top">
                  <Icon color="darkBloobirds" name="infoFilled" size={16} />
                </Tooltip>
              </div>
            )}
            {disclaimers && !loading && (
              <div id="warning" className={styles.tooltipWrapper}>
                <Tooltip title={disclaimers} position="top">
                  <Icon color="darkBloobirds" name="alertTriangle" size={16} />
                </Tooltip>
              </div>
            )}
          </div>
          <div className={styles.funnelPanelSelect}>
            <span className={styles.funnelPanelSelectLabel}>
              <Text size="xs" color="softPeanut">
                {statusTitle}
              </Text>
            </span>
            {isOpportunityPanel && isNoStatusOppAccount && (
              <SalesforceStageSelector onChangeStage={stage => setStartingStatus(stage)} />
            )}
            {(!isOpportunityPanel || !isNoStatusOppAccount) && (
              <Select
                size="small"
                borderless={false}
                value={startingStatus}
                onChange={handleChangeStatus}
                width="112px"
              >
                <Item key="No Value" value="No Value">
                  No Value
                </Item>
                <Section>Enabled</Section>
                {groupedStatuses?.enabled?.map(status => (
                  <Item key={status.id} value={status.id}>
                    {status.value}
                  </Item>
                ))}
                {groupedStatuses?.disabled.length > 0 && <Section>Disabled</Section>}
                {groupedStatuses?.disabled.map(status => (
                  <Item key={status.id} value={status.id}>
                    {status.value}
                  </Item>
                ))}
              </Select>
            )}
          </div>
          <div>
            <Dropdown
              ref={dropdownRef}
              visible={dropdownVisible}
              arrow
              anchor={<IconButton name="settings" onClick={() => setVisible(!dropdownVisible)} />}
            >
              <StepsSliders
                onAccept={handleStepsChange}
                onCancel={() => setVisible(false)}
                prevSteps={steps.prev}
                laterSteps={steps.later}
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={styles.funnelContent}>
        {loading && (
          <div className={styles.spinnerWrapper}>
            <Spinner name="loadingCircle" size={36} />
          </div>
        )}
        {!loading && data.total > 0 && (
          <SankeyChart
            data={{ nodes: [...data.nodes], links: [...data.links] }}
            total={data?.total}
            tooltipContent={buildSankeyTooltipForEntity(panelDefinition.report)}
            onClickNode={handleClickNode}
          />
        )}
        {!loading && data.total === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <Icon size={36} color="softPeanut" name="search" />
            </div>
            <Text size="xl" align="center" color="softPeanut">
              There are no results for the selected time range
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
