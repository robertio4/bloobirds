import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-CenterContent.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/CenterContent.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/cadence/src/components/cadenceTable/timeTable/components/CenterContent.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useCallback = __vite__cjsImport2_react["useCallback"]; const useContext = __vite__cjsImport2_react["useContext"]; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import { defaultRangeExtractor, useVirtual } from "/vendor/.vite-deps-react-virtual.js__v--222284ba.js";
import { usePausePeriods } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { CadenceTableContext, CadenceTableImmutableContext } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-CadenceTable.tsx.js";
import { cadenceResponseDefault, TIME_WINDOW } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-cadenceTable.type.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-timeTable.module.css.js";
import { getCenterFromFirstDate, getDateIndex, getDateList } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-centerContent.utils.ts.js";
import { Column } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-components-cadenceTable-timeTable-components-column-Column.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const NUM_OF_RENDERED_COLUMNS = 7;
export const CenterContent = ({
  response,
  bobject
}) => {
  _s();
  const {
    setIsFullFunctional
  } = useContext(CadenceTableImmutableContext);
  const [columnSize, setColumnSize] = useState();
  const [firstScroll, setFirstScroll] = useState(false);
  const parentRef = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  if (parentRef && parentRef.current && parentRef.current.clientWidth && !columnSize) {
    setColumnSize((columnSize2) => columnSize2 ? columnSize2 : Math.floor(parentRef.current.clientWidth / NUM_OF_RENDERED_COLUMNS) + 1);
  }
  const setFullContent = () => {
    if (firstScroll) {
      setIsFullFunctional((isFunctional) => isFunctional ? isFunctional : true);
    } else {
      setFirstScroll(true);
    }
  };
  const startDragging = (e) => {
    if (parentRef && parentRef.current) {
      setMouseDown(true);
      parentRef.current.startX = e.pageX - parentRef.current.offsetLeft;
      parentRef.current.currentScrollLeft = parentRef.current.scrollLeft;
    }
  };
  const dragging = (e) => {
    e.preventDefault();
    if (parentRef && parentRef.current) {
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - parentRef.current.offsetLeft;
      const scroll = x - parentRef.current.startX;
      parentRef.current.scrollLeft = parentRef.current.currentScrollLeft - scroll;
    }
  };
  const stopDragging = () => {
    if (parentRef && parentRef.current) {
      setMouseDown(false);
    }
  };
  const {
    periods
  } = usePausePeriods({
    userId: bobject.assignedTo
  });
  const pausedCadenceDays = periods?.uniqueDates;
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.center_container,
    ref: parentRef,
    onScroll: setFullContent,
    onMouseDown: startDragging,
    onMouseLeave: stopDragging,
    onMouseUp: stopDragging,
    onMouseMove: dragging,
    children: columnSize && /* @__PURE__ */ _jsxDEV(Columns, {
      response,
      pausedCadenceDays,
      parentRef,
      columnSize
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 86,
    columnNumber: 5
  }, void 0);
};
_s(CenterContent, "xejsol4U/E8WklVxrPtGOAeNDHI=", false, function() {
  return [usePausePeriods];
});
_c = CenterContent;
const Columns = (props) => {
  _s2();
  const {
    response,
    pausedCadenceDays,
    parentRef,
    columnSize
  } = props;
  const {
    tasks,
    firstTaskDate,
    firstActivityDate,
    lastTaskDate,
    lastActivityDate
  } = response ?? cadenceResponseDefault;
  const {
    timeWindow,
    scrollTo
  } = useContext(CadenceTableContext);
  const {
    setTimeWindow,
    setScrollTo,
    isLeftPageDisabled,
    isRightPageDisabled
  } = useContext(CadenceTableImmutableContext);
  const [currentDate, setCurrentDate] = useState();
  const [dateList, setDateList] = useState();
  const rangeRef = useRef(null);
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: dateList?.length || 0,
    parentRef,
    estimateSize: useCallback(
      () => 110,
      []
    ),
    rangeExtractor: useCallback((range) => {
      rangeRef.current = range;
      return defaultRangeExtractor(range);
    }, []),
    overscan: 2
  });
  useEffect(() => {
    setDateList(getDateList(timeWindow));
  }, [timeWindow, currentDate]);
  useEffect(() => {
    scrollToDate(currentDate);
  }, [dateList]);
  const setTimeWindowWithDate = (timeWindow2, date) => {
    if (timeWindow2 === TIME_WINDOW.WEEKLY) {
      setCurrentDate(getCenterFromFirstDate(date));
    } else {
      setCurrentDate(date);
    }
    setTimeWindow(timeWindow2);
  };
  const scrollToDate = (date) => {
    if (dateList) {
      const dateToScrollTo = getDateIndex(timeWindow, date ? new Date(date) : new Date());
      const dateIndex = dateList.findIndex((item) => item === dateToScrollTo);
      if (dateIndex !== -1) {
        columnVirtualizer.scrollToIndex(dateIndex, {
          align: "center"
        });
      }
    }
  };
  useEffect(() => {
    switch (scrollTo) {
      case "today":
        scrollToDate();
        break;
      case "pageBack": {
        const {
          start
        } = rangeRef.current;
        const isFirstPage = start - 2 <= 0;
        scrollToDate(dateList[isFirstPage ? 0 : start - 2]);
        if (isRightPageDisabled.current === true) {
          isRightPageDisabled.current = false;
        }
        if (isLeftPageDisabled.current === false) {
          isLeftPageDisabled.current = isFirstPage;
        }
        break;
      }
      case "pageForward": {
        const {
          end
        } = rangeRef.current;
        const isLastPage = end + 1 > dateList?.length - 1;
        scrollToDate(dateList[isLastPage ? dateList?.length - 1 : end + 1]);
        if (isLeftPageDisabled.current === true) {
          isLeftPageDisabled.current = false;
        }
        if (isRightPageDisabled.current === false) {
          isRightPageDisabled.current = isLastPage;
        }
        break;
      }
      case "firstTask": {
        scrollToDate(firstTaskDate);
        break;
      }
      case "lastTask": {
        scrollToDate(lastTaskDate);
        break;
      }
      case "firstActivity": {
        scrollToDate(firstActivityDate);
        break;
      }
      case "lastActivity": {
        scrollToDate(lastActivityDate);
        break;
      }
    }
    if (scrollTo) {
      setScrollTo("");
    }
  }, [scrollTo]);
  return /* @__PURE__ */ _jsxDEV("div", {
    style: {
      width: `${columnVirtualizer.totalSize}px`,
      position: "relative"
    },
    children: columnVirtualizer.virtualItems.map((virtualColumn) => {
      const date = dateList[virtualColumn.index];
      return /* @__PURE__ */ _jsxDEV(Column, {
        dayTasks: tasks && tasks[date],
        timeWindow,
        virtualColumn,
        date,
        setTimeWindowWithDate,
        isPausedDay: pausedCadenceDays?.has(date)
      }, virtualColumn.index, false, {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 11
      }, void 0);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 225,
    columnNumber: 5
  }, void 0);
};
_s2(Columns, "5M0vaT/I8RsZLljsyYSN8kwTZ3A=", false, function() {
  return [useVirtual];
});
_c2 = Columns;
var _c, _c2;
$RefreshReg$(_c, "CenterContent");
$RefreshReg$(_c2, "Columns");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
    if (isReactRefreshBoundary(mod)) {
      if (!window.__vite_plugin_react_timeout) {
        window.__vite_plugin_react_timeout = setTimeout(() => {
          window.__vite_plugin_react_timeout = 0;
          RefreshRuntime.performReactRefresh();
        }, 30);
      }
    } else {
      import.meta.hot.invalidate();
    }
  });
}
