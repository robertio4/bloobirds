import React, { useEffect, useRef, useState } from 'react';

import {
  CheckItem,
  DatePicker,
  Icon,
  IconButton,
  Item,
  Label,
  MultiSelect,
  Select,
  Spinner,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { format as formatDate } from 'date-fns';

import { ExtendedChartData, Panel, SubPanel } from '../../../../constants/newDashboards';
import { useEntity } from '../../../../hooks';
import useDashboardFilters from '../../../../hooks/useDashboardFilters';
import { useIsInViewport } from '../../../../hooks/useIsInViewPort';
import styles from '../../v1/dashboardPanel/dashboardPanel.module.css';
import { EmptyStatePanel } from '../../v1/panels/EmptyStatePanel';
import { useChartData } from '../../v1/panels/shared/useChartData';
import { BarChartPanel } from '../panels/BarChartPanel';
import { FunnelPanel } from '../panels/FunnelPanel';
import { LineChartPanel } from '../panels/LineChartPanel';
import { TableChartPanel } from '../panels/TableChartPanel';
import { ErrorPanel } from '../panels/errorPanel/errorPanel';

const renderPanel = (
  panel: Panel,
  chartData: ExtendedChartData,
  multiPanelIndex?: number,
  isEmpty?: boolean,
  visibleBars?: string[],
  allBars?: { label: string; logicRole: string; id: string }[],
  panels?: SubPanel[],
) => {
  const { type, report, title, timeColumnTitle, isTimeline, options = {} } = panel;

  if (isEmpty) {
    return <EmptyStatePanel />;
  }

  if (type === 'BarChartPanel') {
    return (
      <BarChartPanel
        report={report}
        title={title}
        options={options}
        isTimeline={isTimeline}
        keysColors={panel?.keysColors}
        hasSingleNumber={panel?.hasSingleNumber}
        visibleBars={visibleBars}
        allBars={allBars}
        chartData={chartData}
      />
    );
  }

  if (type === 'LineChartPanel') {
    return <LineChartPanel report={report} options={options} chartData={chartData} />;
  }

  if (type === 'FunnelPanel') {
    return <FunnelPanel chartData={chartData} />;
  }

  if (type === 'TableChartPanel') {
    return (
      <TableChartPanel report={report} timeColumnTitle={timeColumnTitle} chartData={chartData} />
    );
  }

  if (type === 'MultiPanel') {
    return <MultiPanel panels={panels} index={multiPanelIndex} chartData={chartData} />;
  }

  return (
    <pre
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Unknown panel <strong>{type}</strong>
    </pre>
  );
};

const MultiPanel = ({
  panels,
  index,
  chartData,
}: {
  panels: SubPanel[];
  index: number;
  chartData: ExtendedChartData;
}) => {
  const currentPanelDefinition = panels[index];

  return renderPanel(currentPanelDefinition, chartData, undefined, undefined, undefined, undefined);
};

const MultiPanelDropdown = ({
  value,
  onChange,
  panels,
}: {
  value: number;
  onChange: (value: any) => void;
  panels: SubPanel[];
}) => (
  <div className={styles.multiPanelDropdownWrapper}>
    <Text size="xs" color="softPeanut">
      Show:
    </Text>
    <Select size="small" borderless value={value} onChange={onChange}>
      {panels.map((panel: SubPanel, index: number) => (
        <Item key={`${panel.report}_${panel.dropdownTitle}`} value={index}>
          {panel.dropdownTitle}
        </Item>
      ))}
    </Select>
  </div>
);

const VisibleBarsDropdown = ({
  bars,
  visibleBars,
  onChange,
}: {
  bars: { logicRole: string; label: string }[];
  visibleBars: string[];
  onChange: (value: string[]) => void;
}) => {
  return (
    <div className={styles.multiPanelDropdownWrapper}>
      <Text size="xs" color="softPeanut">
        Status:
      </Text>
      <MultiSelect size="small" borderless selectAllOption value={visibleBars} onChange={onChange}>
        {bars.map(bar => (
          <CheckItem key={`visible-bars-${bar.logicRole}`} value={bar.logicRole}>
            {bar.label}
          </CheckItem>
        ))}
      </MultiSelect>
    </div>
  );
};

export const DashboardPanel = ({
  panelDefinition,
  parentMultiPanelIndex,
  setParentMultiPanelIndex,
  hasPriority,
}: {
  panelDefinition: Panel;
  parentMultiPanelIndex: number;
  setParentMultiPanelIndex: (n: number) => void;
  hasPriority: boolean;
}) => {
  const {
    title: panelTitle,
    information: panelInformation,
    disclaimer,
    report,
    type,
    isTimeline,
  } = panelDefinition;
  const isB2CAccount = useIsB2CAccount();
  let panels = panelDefinition.panels;
  if (isB2CAccount && panels?.map(panel => panel.dropdownTitle).includes('Companies')) {
    panels = panels.slice().reverse();
  }
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const [multiPanelIndex, setMultiPanelIndex] = useState(parentMultiPanelIndex);
  const isMultiPanel = type === 'MultiPanel';
  const isBarchartPanel =
    type === 'BarChartPanel' || (isMultiPanel && panels[multiPanelIndex].type === 'BarChartPanel');
  const reportName = isMultiPanel ? panels[multiPanelIndex].report : report;
  const timeline = isMultiPanel ? panels[multiPanelIndex].isTimeline : isTimeline;
  const historic = isMultiPanel ? panels[multiPanelIndex].isHistoric : panelDefinition.isHistoric;
  const [cohortDate, setCohortDate] = useState<Date>();
  const inViewPortRef = useRef();
  const isInViewPort = useIsInViewport(inViewPortRef);
  const { loading, error, data: chartData } = useChartData(
    reportName,
    timeline,
    historic,
    isInViewPort,
    cohortDate,
  );
  const { groupBy } = useDashboardFilters();

  const { result: data, hasGrouped } = chartData;

  const isEmpty = data && data.length === 0;

  const shouldNotHavePadding =
    panelDefinition.type === 'MultiPanel' && panels[multiPanelIndex].type === 'TableChartPanel';
  useEffect(() => {
    if (parentMultiPanelIndex !== multiPanelIndex) {
      setMultiPanelIndex(parentMultiPanelIndex);
    }
  }, [parentMultiPanelIndex]);
  const onMultiPanelChange = (value: number) => {
    if (hasPriority) {
      setParentMultiPanelIndex(value);
    } else {
      setMultiPanelIndex(value);
    }
  };

  const panelDisclaimer = () => {
    // @ts-ignore
    const groupByName =
      groupBy === 'HISTORIC_ASSIGNED_TO'
        ? 'Assigned to (historic)'
        : bobjectFields?.findBy('id')(groupBy)?.name;
    const groupText = groupBy && !hasGrouped ? `Chart cannot be grouped by ${groupByName}` : '';
    return disclaimer && groupText ? `${disclaimer}. ${groupText}` : disclaimer || groupText;
  };

  const [visibleBars, setVisibleBars] = useState<string[]>(panelDefinition.defaultVisibleBars);

  const bobjectField = bobjectFields?.findByLogicRole(chartData?.fieldLogicRole);

  let allBars: { logicRole: string; label: string; id: string }[] = [];
  if (bobjectField?.bobjectGlobalPicklist) {
    allBars = bobjectPicklistFieldValues
      // @ts-ignore
      ?.filterBy('bobjectGlobalPicklist')(bobjectField?.bobjectGlobalPicklist)
      ?.map((pick: any) => ({
        logicRole: pick.logicRole,
        label: pick.value,
        id: pick.id,
      }));
  } else {
    allBars = bobjectPicklistFieldValues
      // @ts-ignore
      ?.filterBy('bobjectField')(bobjectField?.id)
      ?.map((pick: any) => ({
        logicRole: pick.logicRole,
        label: pick.value,
        id: pick.id,
      }));
  }

  const disclaimers = panelDisclaimer();

  let content;
  let totalTasks = 0;

  if (loading) {
    content = (
      <div className={styles.spinnerWrapper}>
        <Spinner name="loadingCircle" />
      </div>
    );
  } else {
    if (error) {
      content = <ErrorPanel />;
    } else {
      content = renderPanel(
        panelDefinition,
        chartData,
        multiPanelIndex,
        isEmpty,
        visibleBars,
        allBars,
        panels,
      );
    }
  }

  const hasBarSelection =
    panelDefinition.defaultVisibleBars !== undefined &&
    panelDefinition.defaultVisibleBars.length > 0;

  if (data.length > 0 && isBarchartPanel) {
    data
      .filter(bar => {
        return (
          !hasBarSelection ||
          visibleBars?.includes(allBars.find(b => b.label === bar._label)?.logicRole)
        );
      })
      .forEach(d => (totalTasks += d.count));
  }

  const title = isMultiPanel ? panels[multiPanelIndex].title : panelTitle;
  const information = isMultiPanel ? panels[multiPanelIndex].information : panelInformation;
  const getDisplayName = (date: Date) => {
    return date && formatDate(date, 'dd MMM yy');
  };

  const { visible, setVisible, ref } = useVisible(false);
  return (
    <div className={styles.root} key={panelDefinition.title} ref={inViewPortRef}>
      <div className={styles.header}>
        <div className={styles._chart_top_wrapper}>
          <div className={styles._chart_title_wrapper}>
            <Text
              size="m"
              weight="medium"
              color="softPeanut"
              className={styles._chart_title_wrapper}
            >
              {title ? title : panelTitle}
            </Text>
            {(information || panelInformation) && (
              <div className={styles.tooltipWrapper}>
                <Tooltip title={information ? information : panelInformation} position="top">
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

          <div className={styles._chart_panel_top_left}>
            {isMultiPanel && !loading && (
              <MultiPanelDropdown
                value={multiPanelIndex}
                onChange={onMultiPanelChange}
                panels={panels}
              />
            )}

            {historic && (
              <div className={styles.multiPanelDropdownWrapper}>
                <Text size="xs" color="softPeanut">
                  {cohortDate ? getDisplayName(cohortDate) : ''}
                </Text>
                <DatePicker
                  withTimePicker={false}
                  value={cohortDate}
                  onChange={setCohortDate}
                  dropDownRef={ref}
                  visible={visible}
                  setVisible={setVisible}
                  openDefaultValue={new Date()}
                  dropdownProps={{
                    anchor: (
                      <IconButton name="historyNonFlipped" onClick={() => setVisible(true)} />
                    ),
                  }}
                />
              </div>
            )}
            {isBarchartPanel && hasBarSelection && !loading && (
              <VisibleBarsDropdown
                bars={allBars}
                visibleBars={visibleBars}
                onChange={newBars => setVisibleBars([...newBars])}
              />
            )}
          </div>
          {totalTasks !== 0 &&
            isBarchartPanel &&
            !panelDefinition?.hideTotal &&
            !panelDefinition?.options?.unit && (
              <div className={styles._chart_label}>
                <Label>{totalTasks}</Label>
              </div>
            )}
        </div>
      </div>
      <div className={styles.content}>
        {/**
         *
         * Recharts ResponsiveContainer is kinda weird. Using this workaround suggested here:
         *
         * https://github.com/recharts/recharts/issues/1767#issuecomment-598607012
         */}

        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              boxSizing: 'border-box',
              padding: shouldNotHavePadding ? 0 : 24,
            }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
