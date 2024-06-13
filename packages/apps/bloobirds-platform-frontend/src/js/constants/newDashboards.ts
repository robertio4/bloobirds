export type PanelType =
  | 'BarChartPanel'
  | 'LineChartPanel'
  | 'FunnelPanel'
  | 'SankeyPanel'
  | 'MultiPanel'
  | 'TableChartPanel';

export interface SubPanel extends Panel {
  report: string;
  dropdownTitle?: string;
}

export interface PanelOptions {
  sortByValue?: boolean;
  sortDirection?: 'DESC' | 'ASC';
  unit?: '%' | '€' | 'd' | 'days';
  hideAmount?: boolean;
}
export interface Panel {
  type: PanelType;
  title?: string;
  information?: string;
  report?: string;
  options?: PanelOptions;
  disclaimer?: string;
  panels?: SubPanel[];
  isTimeline?: boolean;
  hideTotal?: boolean;
  timeColumnTitle?: string;
  keysColors?: { [key: string]: string };
  hasSingleNumber?: boolean;
  defaultVisibleBars?: string[];
  isFunnel?: boolean;
  funnelStartingStatus?: string;
  funnelField?: string;
  isHistoric?: boolean;
}
export interface StatsPanelDefinition {
  report: string;
  stats: Array<{
    name: string;
    isPercentage: boolean;
    isTotal: boolean;
  }>;
}

export interface DashboardSection {
  title: string;
  panels: Panel[];
  statsPanel?: StatsPanelDefinition;
  funnel?: boolean;
  new?: boolean;
  beta?: boolean;
}

export interface DashboardPage {
  title: string;
  sections: DashboardSection[];
}

export interface ReportFilters {
  rangeStart?: string;
  rangeEnd?: string;
  timeWindow?: string;
  newGroupBy?: GroupByField;
  newMoreFilters: {
    [key: string]: AttributeFilter;
  };
}

export interface DrillDownRequest {
  filters: ReportFilters;
  report: string;
  limit: number;
  offset: number;
  hideValues: string[] | undefined;
}

export interface GroupByField {
  entity: string;
  fieldId: string;
}

export interface ValuesInformation {
  [key: string]: { valueId: string; fieldId: string; color: string; logicRole?: string };
}

export interface AttributeFilter {
  entity: string;
  operator: Operator;
  params: string[];
}

export interface ChartGroupResponse {
  results: {
    [key: string]: ChartData;
  };
  timeline: boolean;
}

export interface PerformanceGroupResponse {
  results: {
    [key: string]: PerformanceData;
  };
}

export interface SyncStatusResponse {
  tenantID: string;
  resyncStarted: string;
  lastResyncEnded: string;
  status: string;
}

export interface DashboardData {
  timeline: {
    [key: string]: ChartData;
  };
  regular: {
    [key: string]: ChartData;
  };
  performance: {
    [key: string]: PerformanceData;
  };
}

export interface ChartData {
  report: string;
  result: Point[];
  hasGrouped: boolean;
  canDrillDown: boolean;
  fieldLogicRole?: string;
  groupById?: string;
}

export interface FunnelDrillDownRequest {
  entity: string;
  startingStatus: string;
  targetStatus: string;
  targetStatusDepth: number;
  salesforceStage?: boolean;
  limit: number;
  offset: number;
}

export interface PerformanceData {
  report: string;
  currentMetrics: { [key: string]: number };
  previousMetrics: { [key: string]: number };
}

export interface FunnelNode {
  name: string;
  nodeDepth: number;
}

export interface ExtendedFunnelNode extends FunnelNode {
  color?: string;
  isCreationNode?: boolean;
  customName?: string;
  valueId?: string;
}

export interface FunnelLink {
  source: number;
  target: number;
  value: number;
  days?: number;
}
export interface FunnelDataResponse {
  entity: string;
  data: FunnelData;
}

export interface FunnelData {
  total: number;
  nodes: FunnelNode[];
  links: FunnelLink[];
}

export interface ExtendedChartData extends ChartData {
  valuesInformation: ValuesInformation;
  stackValuesInformation: ValuesInformation;
}

export interface DrillDownData {
  report: string;
  result: Array<Array<DrillDownField>>;
  totalMatching: number;
}

export interface DrillDownField {
  logicRole: string;
  value: any;
}

export interface Point {
  _label: string;
  _label_group?: string;
  __timestamp: number;
  count: any;
}

export type Operator =
  | 'STRING_CONTAINS'
  | 'STRING_EQUAL'
  | 'STRING_NOT_EMPTY'
  | 'STRING_EMPTY'
  | 'STRING_IN'
  | 'STRING_NOT_EQUAL'
  | 'DATE_BETWEEN'
  | 'NUMBER_GREATER_THAN'
  | 'NUMBER_LESS_THAN'
  | 'NUMBER_GREAT_EQUAL_THAN'
  | 'NUMBER_LESS_EQUAL_THAN'
  | 'NUMBER_BETWEEN';

export type Pages =
  | 'overview'
  | 'activityPerformance'
  | 'conversionRates'
  | 'historicConversionRates'
  | 'dataQuality'
  | 'funnel';
export interface Dashboards {
  prospecting: { [key in Pages]: DashboardPage };
  sales: { [key in Pages]?: DashboardPage };
}
