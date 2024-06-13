import React, { createContext, useMemo, useRef, useState } from 'react';

import { Bobject } from '@bloobirds-it/types';

import { CadenceHeader } from './cadenceHeader/CadenceHeader';
import {
  CadenceBobject,
  CadenceLead,
  CadenceTableGettersInterface,
  CadenceTableImmutableInterface,
  KindFilterType,
  LeadFilterType,
  ScrollToWhereType,
  TIME_WINDOW,
} from './cadenceTable.type';
import { TimeTable } from './timeTable/TimeTable';

export type { CadenceBobject } from './cadenceTable.type';

export interface CadenceTableProps {
  activeUserId: string;
  bobject: CadenceBobject;
  leads?: CadenceLead[];
  openCadenceControl?: (params: any) => void;
  withoutHeader?: boolean;
  hideActivityHover?: boolean;
  onClickActivityEdit?: (activity: Bobject) => void;
  onClickActivityExternal?: (activity: Bobject) => void;
  onClickActivityView?: (activity: Bobject, timeWindow: string) => void;
}

const defaultProps: CadenceTableProps = {
  activeUserId: '',
  bobject: {
    id: null,
    assignedTo: null,
    cadenceId: null,
    companyId: null,
    targetMarket: null,
    relatedBobjectIds: [],
  },
  leads: [],
  openCadenceControl: () => {},
  withoutHeader: false,
  hideActivityHover: false,
  onClickActivityEdit: undefined,
  onClickActivityView: undefined,
  onClickActivityExternal: undefined,
};

const INIT_TIME_WINDOW = TIME_WINDOW.DAILY;

export const CadenceTableContext = createContext<CadenceTableGettersInterface | null>(null);
export const CadenceTableImmutableContext = createContext<CadenceTableImmutableInterface | null>(
  null,
);

export function CadenceTable(props: CadenceTableProps) {
  const cadenceProps = { ...defaultProps, ...props };
  const [timeWindow, setTimeWindow] = useState<TIME_WINDOW>(INIT_TIME_WINDOW);
  const [scrollTo, setScrollTo] = useState<ScrollToWhereType>();
  const isLeftPageDisabled = useRef(false);
  const isRightPageDisabled = useRef(false);
  const [isFullFunctional, setIsFullFunctional] = useState(false);
  const [kindFilter, setKindFilter] = useState<KindFilterType>();
  const [leadFilter, setLeadFilter] = useState<LeadFilterType>([]);

  const getters: CadenceTableGettersInterface = useMemo(() => {
    return {
      timeWindow,
      scrollTo,
      isFullFunctional,
      kindFilter,
      leadFilter,
    };
  }, [timeWindow, scrollTo, isFullFunctional, kindFilter, leadFilter]);
  const immutableValues: CadenceTableImmutableInterface = useMemo(() => {
    return {
      setTimeWindow,
      setScrollTo,
      setIsFullFunctional,
      setKindFilter,
      setLeadFilter,
      isLeftPageDisabled,
      isRightPageDisabled,
      hideActivityHover: cadenceProps.hideActivityHover,
      onClickActivityEdit: cadenceProps.onClickActivityEdit,
      onClickActivityView: cadenceProps.onClickActivityView,
      onClickActivityExternal: cadenceProps.onClickActivityExternal,
    };
  }, []);

  return (
    <div onClick={() => setIsFullFunctional(true)}>
      <CadenceTableImmutableContext.Provider value={immutableValues}>
        <CadenceTableContext.Provider value={getters}>
          {!cadenceProps?.withoutHeader && <CadenceHeader {...cadenceProps} />}
          <TimeTable bobject={cadenceProps.bobject} key={cadenceProps.bobject.id.value} />
        </CadenceTableContext.Provider>
      </CadenceTableImmutableContext.Provider>
    </div>
  );
}
