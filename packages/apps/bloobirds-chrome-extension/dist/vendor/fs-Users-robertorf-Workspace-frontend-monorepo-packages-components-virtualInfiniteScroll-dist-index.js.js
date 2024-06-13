import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useEffect = __vite__cjsImport0_react["useEffect"];
import { Skeleton } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { removeScrollOfBox, recoverScrollOfBox } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import { useVirtualizer } from '/vendor/.vite-deps-@tanstack_react-virtual.js__v--f7d73fd2.js';
import { CSSTransition } from '/vendor/.vite-deps-react-transition-group.js__v--9d3bc9ff.js';
import { jsx } from '/vendor/id-__x00__react-jsx-runtime.js';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".transition-module__fade_enter__kSOKV {\n  opacity: 0;\n}\n.transition-module__fade_enter_active__TFJIc {\n  opacity: 1;\n  transition: opacity 300ms;\n}\n\n.transition-module__fade_exit__z35J- {\n  opacity: 1;\n}\n.transition-module__fade_exit_active__aP3Ol {\n  opacity: 0;\n  transition: opacity 300ms;\n}\n";
var styles = {"_fade_enter":"transition-module__fade_enter__kSOKV","_fade_enter_active":"transition-module__fade_enter_active__TFJIc","_fade_exit":"transition-module__fade_exit__z35J-","_fade_exit_active":"transition-module__fade_exit_active__aP3Ol"};
styleInject(css_248z);

var classNames = {
  fade: {
    appear: styles._fade_enter,
    appearActive: styles._fade_enter_active,
    enter: styles._fade_enter,
    enterActive: styles._fade_enter_active,
    exit: styles._fade_exit,
    exitActive: styles._fade_exit_active
  }
};
var Transition = function Transition(_ref) {
  var children = _ref.children,
    visible = _ref.visible,
    type = _ref.type;
  return /*#__PURE__*/jsx(CSSTransition, {
    appear: true,
    "in": visible,
    unmountOnExit: true,
    timeout: 300,
    classNames: classNames[type],
    children: children
  });
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var VirtualInfiniteScroll = function VirtualInfiniteScroll(_ref) {
  var _rowsLength, _parentRef$current;
  var rows = _ref.rows,
    totalRows = _ref.totalRows,
    isFetchingData = _ref.isFetchingData,
    fetchNextPage = _ref.fetchNextPage,
    children = _ref.children,
    hasNextItem = _ref.hasNextItem,
    parentRef = _ref.parentRef,
    footer = _ref.footer,
    contentSkeleton = _ref.contentSkeleton,
    _ref$loaderSkeleton = _ref.loaderSkeleton,
    loaderSkeleton = _ref$loaderSkeleton === void 0 ? function () {
      return /*#__PURE__*/jsx(Skeleton, {
        variant: "rect",
        width: "100%",
        height: "40px"
      }, 'skeletonItem');
    } : _ref$loaderSkeleton,
    _ref$estimateSize = _ref.estimateSize,
    _estimateSize = _ref$estimateSize === void 0 ? 40 : _ref$estimateSize,
    _ref$estimatedSkeleto = _ref.estimatedSkeletonHeight,
    estimatedSkeletonHeight = _ref$estimatedSkeleto === void 0 ? 40 : _ref$estimatedSkeleto,
    _ref$fixedHeight = _ref.fixedHeight,
    fixedHeight = _ref$fixedHeight === void 0 ? false : _ref$fixedHeight,
    enabledArrowNavigation = _ref.enabledArrowNavigation,
    onNavigation = _ref.onNavigation,
    _ref$enableSelectedBa = _ref.enableSelectedBackground,
    enableSelectedBackground = _ref$enableSelectedBa === void 0 ? false : _ref$enableSelectedBa,
    rowsLength = _ref.rowsLength;
  var prevRows = useRef((rows === null || rows === void 0 ? void 0 : rows.length) || 0);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedItemIndex = _useState4[0],
    setSelectedItemIndex = _useState4[1];
  rowsLength = (_rowsLength = rowsLength) !== null && _rowsLength !== void 0 ? _rowsLength : rows === null || rows === void 0 ? void 0 : rows.length;
  var hasNextPage = useMemo(function () {
    return !(rowsLength === totalRows);
  }, [rowsLength, totalRows]);
  var dataCount = hasNextPage ? rowsLength + 1 : rowsLength;
  var rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: function getScrollElement() {
      return parentRef === null || parentRef === void 0 ? void 0 : parentRef.current;
    },
    estimateSize: function estimateSize() {
      return _estimateSize;
    },
    overscan: 3
  });
  function handleItemClick(index) {
    setSelectedItemIndex(index); // Actualiza el índice del elemento seleccionado
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        {
          var targetIndex = Math.max(0, selectedItemIndex - 1);
          rowVirtualizer === null || rowVirtualizer === void 0 ? void 0 : rowVirtualizer.scrollToIndex(targetIndex !== null && targetIndex !== void 0 ? targetIndex : 0);
          setSelectedItemIndex(targetIndex);
          onNavigation === null || onNavigation === void 0 ? void 0 : onNavigation(rows[targetIndex], false);
          break;
        }
      case 'ArrowDown':
        {
          // Determinar índice objetivo
          var virtualItems = rowVirtualizer.getVirtualItems();
          var currentIndex = virtualItems.findIndex(function (item) {
            return item.index === selectedItemIndex;
          });
          var _targetIndex = currentIndex < virtualItems.length - 1 ? virtualItems[currentIndex + 1].index : null;
          if (_targetIndex !== null && _targetIndex < dataCount) {
            rowVirtualizer.scrollToIndex((_targetIndex !== null && _targetIndex !== void 0 ? _targetIndex : 0) + 1);
            setSelectedItemIndex(_targetIndex);
            onNavigation === null || onNavigation === void 0 ? void 0 : onNavigation(rows[_targetIndex], false);
          }
          break;
        }
    }
  }
  useEffect(function () {
    if (enabledArrowNavigation && selectedItemIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      //removeScrollOfBox();
    }

    return function () {
      document.removeEventListener('keydown', handleKeyDown);
      //recoverScrollOfBox();
    };
  }, [enabledArrowNavigation, selectedItemIndex]); // Asegúrate de volver a suscribir el evento cuando cambie el índice del elemento seleccionado

  useEffect(function () {
    var _reverse = _toConsumableArray(rowVirtualizer.getVirtualItems()).reverse(),
      _reverse2 = _slicedToArray(_reverse, 1),
      lastItem = _reverse2[0];
    if (!lastItem) {
      return;
    }
    if (lastItem.index >= (rows === null || rows === void 0 ? void 0 : rows.length) - 1 && hasNextPage && !isFetchingData && !loading) {
      setLoading(true);
      fetchNextPage === null || fetchNextPage === void 0 ? void 0 : fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, rows === null || rows === void 0 ? void 0 : rows.length, isFetchingData, rowVirtualizer.getVirtualItems(), loading, totalRows]);
  useEffect(function () {
    if ((rows === null || rows === void 0 ? void 0 : rows.length) > (prevRows === null || prevRows === void 0 ? void 0 : prevRows.current)) {
      setLoading(false);
      prevRows.current = rows === null || rows === void 0 ? void 0 : rows.length;
    }
  }, [rows === null || rows === void 0 ? void 0 : rows.length]);
  var scrollHeight = parentRef === null || parentRef === void 0 ? void 0 : (_parentRef$current = parentRef.current) === null || _parentRef$current === void 0 ? void 0 : _parentRef$current.scrollHeight;
  if (contentSkeleton && (isFetchingData || scrollHeight === undefined || scrollHeight === 0)) {
    return /*#__PURE__*/jsx(Transition, {
      type: "fade",
      visible: true,
      children: contentSkeleton()
    });
  }
  return /*#__PURE__*/jsx("div", {
    style: {
      height: rowVirtualizer.getTotalSize() + (loading ? estimatedSkeletonHeight || 100 : 0),
      width: '100%',
      position: 'relative'
    },
    onMouseEnter: removeScrollOfBox,
    onMouseLeave: recoverScrollOfBox,
    children: rowVirtualizer.getVirtualItems().map(function (virtualItem) {
      var _ref2;
      var isLoaderRow = virtualItem.index > (rows === null || rows === void 0 ? void 0 : rows.length) - 1;
      var data = rows[virtualItem.index];
      var showNext = (_ref2 = hasNextItem && hasNextItem(virtualItem.index)) !== null && _ref2 !== void 0 ? _ref2 : !!rows[virtualItem.index + 1];
      return /*#__PURE__*/jsx("div", {
        "data-index": virtualItem.index,
        ref: fixedHeight ? undefined : rowVirtualizer.measureElement,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: fixedHeight ? "".concat(virtualItem.size, "px") : undefined,
          transform: "translateY(".concat(virtualItem.start, "px)"),
          background: virtualItem.index === selectedItemIndex && enableSelectedBackground ? 'var(--softGray)' : 'transparent'
        },
        onClick: function onClick() {
          return handleItemClick(virtualItem.index);
        },
        children: isLoaderRow ? hasNextPage ? /*#__PURE__*/jsx("div", {
          style: {
            height: "".concat(_estimateSize, "px")
          },
          children: /*#__PURE__*/jsx(Transition, {
            type: "fade",
            visible: true,
            children: loaderSkeleton()
          })
        }) : footer && /*#__PURE__*/jsx("div", {
          style: {
            height: "".concat(_estimateSize, "px")
          },
          children: footer(function () {
            return rowVirtualizer.scrollToIndex(0);
          })
        }) : children(data, showNext, virtualItem.index === 0, virtualItem.index === selectedItemIndex)
      }, virtualItem.key);
    })
  });
};

export { VirtualInfiniteScroll };
                                 
