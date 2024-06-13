import React, { useContext, useEffect, createContext, useState, Children, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { MultiSelect, CheckItem, Select, Item, Chip, Icon, RelativeDatePicker, useVisible, Dropdown, Text, useHover, Skeleton } from '@bloobirds-it/flamingo-ui';
import { useSessionStorage, useActiveUserId, useMediaQuery, useDebounce, useActiveUserSettings, useUserTeams } from '@bloobirds-it/hooks';
import { getBobjectFromLogicRole, isObject, isEmptyObject, mergeTwoObjects, isEqual } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';
import { RelativesDate, SearchMode, SearchType, FIELDS_LOGIC_ROLE, MatchRows, BobjectTypes, FilterType, UserRole } from '@bloobirds-it/types';
import isEmpty from 'lodash/isEmpty';
import isObject$1 from 'lodash/isObject';
import spacetimeClass from 'spacetime';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var START_OF_TIME = 43200;
var parseRelativeDates = function parseRelativeDates(relativeDate) {
  var spacetime = spacetimeClass();
  switch (relativeDate) {
    case RelativesDate.ALL_TIME:
      return {
        gte: spacetimeClass(START_OF_TIME).format('iso'),
        lte: spacetimeClass.now().add(5, 'year').format('iso')
      };
    case RelativesDate.LAST_MONTH:
    case RelativesDate.LAST_QUARTER:
    case RelativesDate.LAST_YEAR:
    case RelativesDate.LAST_WEEK:
      {
        var lastTimeKey = relativeDate.split('_')[1];
        return {
          gte: spacetime.subtract(1, lastTimeKey).startOf(lastTimeKey).format('iso'),
          lte: spacetime.subtract(1, lastTimeKey).endOf(lastTimeKey).format('iso')
        };
      }
    case RelativesDate.THIS_MONTH:
    case RelativesDate.THIS_QUARTER:
    case RelativesDate.THIS_WEEK:
    case RelativesDate.THIS_YEAR:
      {
        var thisTimeKey = relativeDate.split('_')[1];
        return {
          gte: spacetime.startOf(thisTimeKey).format('iso'),
          lte: spacetime.endOf(thisTimeKey).format('iso')
        };
      }
    case RelativesDate.TODAY:
      return {
        gte: spacetime.startOf('day').format('iso'),
        lte: spacetime.endOf('day').format('iso')
      };
    case RelativesDate.YESTERDAY:
      return {
        gte: spacetime.subtract(1, 'day').startOf('day').format('iso'),
        lte: spacetime.subtract(1, 'day').endOf('day').format('iso')
      };
    case RelativesDate.NEXT_7_DAYS:
      return {
        lte: spacetime.add(7, 'day').endOf('day').format('iso'),
        gte: spacetimeClass.now().startOf('day').format('iso')
      };
    case RelativesDate.NEXT_30_DAYS:
      return {
        lte: spacetime.add(30, 'day').endOf('day').format('iso'),
        gte: spacetimeClass.now().startOf('day').format('iso')
      };
    case RelativesDate.SINCE_TODAY:
      return {
        lte: spacetimeClass.now().add(5, 'year').format('iso'),
        gte: spacetime.startOf('day').format('iso')
      };
    case RelativesDate.MORE_THAN_6_MONTHS:
      return {
        lte: spacetimeClass.now().subtract(6, 'month').format('iso')
      };
    case RelativesDate.NEXT_6_MONTHS:
      return {
        lte: spacetimeClass.now().add(6, 'month').format('iso'),
        gte: spacetime.startOf('day').format('iso')
      };
    case RelativesDate.UNTIL_NOW:
      return {
        lte: spacetime.endOf('day').format('iso'),
        gte: spacetimeClass.now().subtract(5, 'year').format('iso')
      };
    default:
      return {};
  }
};
var parseFilterRangeValue = function parseFilterRangeValue(data) {
  if (!data) return '';
  var type = data.type;
  switch (type) {
    case FilterType.RANGE_BETWEEN:
      return {
        query: {
          gte: data.value.start,
          lte: data.value.end
        },
        searchMode: SearchMode.RANGE
      };
    case FilterType.RANGE_LT:
      return {
        query: {
          lt: data.value
        },
        searchMode: SearchMode.RANGE
      };
    case FilterType.RANGE_LTE:
      return {
        query: {
          lte: data.value
        },
        searchMode: SearchMode.RANGE
      };
    case FilterType.RANGE_GT:
      return {
        query: {
          gt: data.value
        },
        searchMode: SearchMode.RANGE
      };
    case FilterType.RANGE_GTE:
      return {
        query: {
          gte: data.value
        },
        searchMode: SearchMode.RANGE
      };
    case FilterType.EXACT:
      return {
        searchMode: SearchMode.EXACT,
        query: data.value
      };
    case FilterType.NOT_EMPTY:
    case MatchRows.FULL:
      return [MatchRows.FULL];
    case FilterType.EMPTY:
    case MatchRows.EMPTY:
      return [MatchRows.EMPTY];
    default:
      return '';
  }
};
var parseFilterRelativeDateValue = function parseFilterRelativeDateValue(data) {
  if (!data) return '';
  return {
    query: {
      gte: spacetimeClass(data === null || data === void 0 ? void 0 : data.start).format('iso'),
      lte: spacetimeClass(data === null || data === void 0 ? void 0 : data.end).format('iso')
    },
    searchMode: SearchMode.RANGE
  };
};
var parseFilterRangeValueToFilter = function parseFilterRangeValueToFilter(data) {
  var _Object$keys2;
  if (!data) return '';
  var query = data.query;
  if (!query) return '';
  var numOfKeys = (_Object$keys2 = Object.keys(query)) === null || _Object$keys2 === void 0 ? void 0 : _Object$keys2.length;
  if (numOfKeys === 1) {
    if (query !== null && query !== void 0 && query.gte) {
      return {
        type: FilterType.RANGE_GTE,
        value: query === null || query === void 0 ? void 0 : query.gte
      };
    }
    if (query !== null && query !== void 0 && query.lte) {
      return {
        type: FilterType.RANGE_LTE,
        value: query === null || query === void 0 ? void 0 : query.lte
      };
    }
    if (query !== null && query !== void 0 && query.gt) {
      return {
        type: FilterType.RANGE_GT,
        value: query === null || query === void 0 ? void 0 : query.gt
      };
    }
    if (query !== null && query !== void 0 && query.lt) {
      return {
        type: FilterType.RANGE_LT,
        value: query === null || query === void 0 ? void 0 : query.lt
      };
    }
  } else if (numOfKeys === 2) {
    return {
      type: FilterType.RANGE_BETWEEN,
      value: {
        start: query === null || query === void 0 ? void 0 : query.gte,
        end: query === null || query === void 0 ? void 0 : query.lte
      }
    };
  }
};
var parseFilterExactValueToFilter = function parseFilterExactValueToFilter(data) {
  if (!data) return '';
  return {
    type: FilterType.EXACT,
    value: data === null || data === void 0 ? void 0 : data.query
  };
};
var parseQuickFilterValue = function parseQuickFilterValue(value) {
  if (!value) return '';
  var searchType = value.searchType;
  switch (searchType) {
    case SearchType.RANGE_BETWEEN_DATES:
      {
        var _value$bobjectPicklis;
        if (value !== null && value !== void 0 && value.query) {
          return value;
        }
        if (Object.values(RelativesDate).includes(value === null || value === void 0 ? void 0 : value.bobjectPicklistValue)) {
          return {
            query: parseRelativeDates(value === null || value === void 0 ? void 0 : value.bobjectPicklistValue),
            searchMode: SearchMode.RANGE
          };
        }
        var _ref = (value === null || value === void 0 ? void 0 : (_value$bobjectPicklis = value.bobjectPicklistValue) === null || _value$bobjectPicklis === void 0 ? void 0 : _value$bobjectPicklis.split(',')) || [],
          _ref2 = _slicedToArray$4(_ref, 2),
          dateA = _ref2[0],
          dateB = _ref2[1];
        return {
          query: {
            lte: dateA > dateB ? dateA : dateB,
            gte: dateA > dateB ? dateB : dateA
          },
          searchMode: SearchMode.RANGE
        };
      }
    case SearchType.RANGE_GT:
      return {
        query: {
          gt: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue
        },
        searchMode: SearchMode.RANGE
      };
    case SearchType.RANGE_GTE:
      return {
        query: {
          gte: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue
        },
        searchMode: SearchMode.RANGE
      };
    case SearchType.RANGE_LT:
      return {
        query: {
          lt: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue
        },
        searchMode: SearchMode.RANGE
      };
    case SearchType.RANGE_LTE:
      return {
        query: {
          lte: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue
        },
        searchMode: SearchMode.RANGE
      };
    case SearchType.RANGE_BETWEEN:
      {
        var _value$bobjectPicklis2;
        var _ref3 = (value === null || value === void 0 ? void 0 : (_value$bobjectPicklis2 = value.bobjectPicklistValue) === null || _value$bobjectPicklis2 === void 0 ? void 0 : _value$bobjectPicklis2.split(',')) || [],
          _ref4 = _slicedToArray$4(_ref3, 2),
          _dateA = _ref4[0],
          _dateB = _ref4[1];
        return {
          query: {
            lte: _dateA > _dateB ? _dateA : _dateB,
            gte: _dateA > _dateB ? _dateB : _dateA
          },
          searchMode: SearchMode.RANGE
        };
      }
    case SearchType.EXACT:
      {
        if ((value === null || value === void 0 ? void 0 : value.bobjectPicklistValue) === MatchRows.FULL) return MatchRows.FULL;
        if ((value === null || value === void 0 ? void 0 : value.bobjectPicklistValue) === MatchRows.EMPTY) return MatchRows.EMPTY;
        return (value === null || value === void 0 ? void 0 : value.bobjectPicklistValue) || {
          query: value === null || value === void 0 ? void 0 : value.textValue,
          searchMode: SearchMode.EXACT
        };
      }
    case SearchType.NOT:
      return {
        query: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue,
        searchMode: SearchMode.NOT
      };
    case SearchType.AUTOCOMPLETE:
      return {
        query: value === null || value === void 0 ? void 0 : value.bobjectPicklistValue,
        searchMode: SearchMode.AUTOCOMPLETE
      };
  }
};
var parseSubqueriesValues = function parseSubqueriesValues(subqueriesValues) {
  var _Object$keys3;
  return (_Object$keys3 = Object.keys(subqueriesValues)) === null || _Object$keys3 === void 0 ? void 0 : _Object$keys3.reduce(function (parsedValues, filterKey) {
    var filterValue = subqueriesValues[filterKey];
    var value = filterValue !== null && filterValue !== void 0 && filterValue.query ? filterValue : {
      query: filterValue
    };
    return _objectSpread$5(_objectSpread$5({}, parsedValues), {}, _defineProperty$6({}, filterKey, value));
  }, {});
};
var replaceConditionalFields = function replaceConditionalFields(filters) {
  var _Object$keys4;
  return (_Object$keys4 = Object.keys(filters)) === null || _Object$keys4 === void 0 ? void 0 : _Object$keys4.reduce(function (newFilters, filterId) {
    var value = filters[filterId];
    newFilters = _objectSpread$5(_objectSpread$5({}, newFilters), {}, _defineProperty$6({}, filterId, value));
    return newFilters;
  }, {});
};
var removeFiltersById = function removeFiltersById(filters, filtersIds) {
  var _Object$keys5;
  return (_Object$keys5 = Object.keys(filters)) === null || _Object$keys5 === void 0 ? void 0 : _Object$keys5.reduce(function (newFilters, bobjectType) {
    var filtersByBobjectType = filters[bobjectType];
    if (filtersByBobjectType && Object.keys(filtersByBobjectType).length) {
      Object.keys(filtersByBobjectType).forEach(function (fieldId) {
        if (filtersIds.includes(fieldId)) {
          var _filtersByBobjectType = _objectSpread$5({}, newFilters[bobjectType]);
          delete _filtersByBobjectType[fieldId];
          newFilters = _objectSpread$5(_objectSpread$5({}, newFilters), {}, _defineProperty$6({}, bobjectType, _objectSpread$5({}, _filtersByBobjectType)));
        } else {
          newFilters = _objectSpread$5(_objectSpread$5({}, newFilters), {}, _defineProperty$6({}, bobjectType, _objectSpread$5(_objectSpread$5({}, newFilters[bobjectType]), {}, _defineProperty$6({}, fieldId, filtersByBobjectType[fieldId]))));
        }
      });
    } else {
      newFilters = _objectSpread$5(_objectSpread$5({}, newFilters), {}, _defineProperty$6({}, bobjectType, {}));
    }
    return _objectSpread$5({}, newFilters);
  }, {});
};
var transformFiltersToFiltersState = function transformFiltersToFiltersState(filterValue) {
  var value;
  var isInputPickerValue = filterValue && isObject(filterValue) && (!!(filterValue !== null && filterValue !== void 0 && filterValue.value) || [MatchRows.EMPTY, MatchRows.FULL].includes(filterValue === null || filterValue === void 0 ? void 0 : filterValue.type));
  var isRelativeDatePickerValue = filterValue && isObject(filterValue) && !!(filterValue !== null && filterValue !== void 0 && filterValue.start);
  if (isInputPickerValue) {
    value = parseFilterRangeValue(filterValue);
  } else if (isRelativeDatePickerValue) {
    value = parseFilterRelativeDateValue(filterValue);
  } else {
    value = filterValue;
  }
  //removes undefined values in case necessary
  if (Array.isArray(value) && value.includes(undefined)) {
    value = value.filter(function (item) {
      return item !== undefined;
    });
  }
  return value;
};
var transformFilterStateToFilter = function transformFilterStateToFilter(filter) {
  if (!filter) return undefined;
  var searchMode = filter.searchMode;
  if (searchMode === SearchMode.RANGE) {
    // refactor for date relative filters
    // const relativeDate = parsedDateValueToRelativeDates(filter?.value);

    return parseFilterRangeValueToFilter(filter);
  }
  if (searchMode === SearchMode.EXACT) {
    return parseFilterExactValueToFilter(filter);
  }
  return filter;
};
var transformQuickFiltersToFilters = function transformQuickFiltersToFilters(filters, bobjectFields) {
  return filters === null || filters === void 0 ? void 0 : filters.reduce(function (query, filter) {
    var filterValue = filter.values;
    var fieldObject = bobjectFields === null || bobjectFields === void 0 ? void 0 : bobjectFields.findFieldById(filter.bobjectFieldId);
    var bobjectType = getBobjectFromLogicRole(fieldObject === null || fieldObject === void 0 ? void 0 : fieldObject.logicRole);
    var parsedValues = filterValue.map(function (value) {
      return parseQuickFilterValue(value);
    });
    return _objectSpread$5(_objectSpread$5({}, query), {}, _defineProperty$6({}, bobjectType, _objectSpread$5(_objectSpread$5({}, query[bobjectType]), {}, _defineProperty$6({}, filter.bobjectFieldId, Array.isArray(parsedValues) && (parsedValues === null || parsedValues === void 0 ? void 0 : parsedValues.length) === 1 ? parsedValues[0] : parsedValues))));
  }, {});
};
var transformMoreFiltersToFilters = function transformMoreFiltersToFilters(filters, bobjectFields) {
  var fieldsIds = Object.keys(filters);
  return fieldsIds === null || fieldsIds === void 0 ? void 0 : fieldsIds.reduce(function (query, fieldId) {
    var filterValue = filters[fieldId];
    var fieldObject = bobjectFields === null || bobjectFields === void 0 ? void 0 : bobjectFields.findFieldById(fieldId);
    var bobjectType = getBobjectFromLogicRole(fieldObject === null || fieldObject === void 0 ? void 0 : fieldObject.logicRole);
    var isRangeValue = filterValue && isObject(filterValue);
    var isArrayValue = Array.isArray(filterValue);
    var isExactValue = filterValue.searchMode === SearchMode.EXACT;
    var parsedValue;
    if (isRangeValue && !isExactValue) {
      parsedValue = filterValue !== null && filterValue !== void 0 && filterValue.searchType ? {
        query: filterValue === null || filterValue === void 0 ? void 0 : filterValue.query,
        searchMode: filterValue === null || filterValue === void 0 ? void 0 : filterValue.searchMode,
        searchType: filterValue === null || filterValue === void 0 ? void 0 : filterValue.searchType,
        type: filterValue === null || filterValue === void 0 ? void 0 : filterValue.type
      } : {
        query: filterValue === null || filterValue === void 0 ? void 0 : filterValue.query,
        searchMode: filterValue === null || filterValue === void 0 ? void 0 : filterValue.searchMode
      };
    } else if (isExactValue) {
      parsedValue = filterValue.query;
    } else if (isArrayValue) {
      var firstValue = filterValue[0];
      var firstValueIsRangeValue = firstValue && isObject(firstValue);
      if (firstValueIsRangeValue) {
        parsedValue = firstValue;
      } else {
        var _filterValue$;
        parsedValue = isObject(firstValue) ? (_filterValue$ = filterValue[0]) === null || _filterValue$ === void 0 ? void 0 : _filterValue$.query : filterValue;
      }
    } else {
      parsedValue = filterValue;
    }
    return _objectSpread$5(_objectSpread$5({}, query), {}, _defineProperty$6({}, bobjectType, _objectSpread$5(_objectSpread$5({}, query[bobjectType]), {}, _defineProperty$6({}, fieldId, parsedValue))));
  }, {});
};
var transformFiltersToQuery = function transformFiltersToQuery(filters, mainBobject, bobjectFields) {
  return Object.keys(filters).reduce(function (query, bobjectType) {
    var bobjectTypeFilters = replaceConditionalFields(filters[bobjectType]);
    var parsedFilters = Object.keys(bobjectTypeFilters).reduce(function (parsedFilters, fieldId) {
      var fieldValue = bobjectTypeFilters[fieldId];
      var isRelativeDateValue = fieldValue && Object.values(RelativesDate).includes(fieldValue);
      var isRangeValue = fieldValue && isObject(fieldValue);
      var isDateRange = fieldValue && ((fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.lte) || (fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.gt));
      if (!isRelativeDateValue && !isRangeValue) {
        return _objectSpread$5(_objectSpread$5({}, parsedFilters), {}, _defineProperty$6({}, fieldId, fieldValue));
      } else if (!isRelativeDateValue && isRangeValue) {
        var value = !isObject(fieldValue) ? {
          query: fieldValue
        } : fieldValue;
        if (isDateRange) {
          value = {
            query: fieldValue,
            searchMode: SearchMode.RANGE
          };
        }
        return _objectSpread$5(_objectSpread$5({}, parsedFilters), {}, _defineProperty$6({}, fieldId, value || (fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.value)));
      } else {
        var _value = {
          query: parseRelativeDates(fieldValue),
          searchMode: SearchMode.RANGE,
          searchType: SearchType.RANGE_BETWEEN,
          type: SearchType.RANGE_BETWEEN
        };
        return _objectSpread$5(_objectSpread$5({}, parsedFilters), {}, _defineProperty$6({}, fieldId, _value));
      }
    }, {});
    if (bobjectType === mainBobject) {
      query = _objectSpread$5(_objectSpread$5({}, query), parsedFilters);
    } else {
      var referencedFieldLogicRole = FIELDS_LOGIC_ROLE[mainBobject][bobjectType.toUpperCase()];
      var referencedField = bobjectFields === null || bobjectFields === void 0 ? void 0 : bobjectFields.findFieldByLogicRole(referencedFieldLogicRole);
      query = _objectSpread$5(_objectSpread$5({}, query), !isEmptyObject(parsedFilters) && referencedField ? _defineProperty$6({}, referencedField === null || referencedField === void 0 ? void 0 : referencedField.id, {
        query: _objectSpread$5({}, parseSubqueriesValues(parsedFilters)),
        searchMode: 'SUBQUERY__SEARCH'
      }) : {});
    }
    return query;
  }, {});
};
var resetFiltersByBobjectType = function resetFiltersByBobjectType() {
  var bobjectTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filters = arguments.length > 1 ? arguments[1] : undefined;
  var availableBobjectTypes = [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity];
  var includedBobjectTypes = availableBobjectTypes.filter(function (bobjectType) {
    return bobjectTypes.includes(bobjectType);
  });
  var bobjectFilters = {};
  includedBobjectTypes.forEach(function (bobjectType) {
    return bobjectFilters[bobjectType] = {};
  });
  bobjectFilters.conditions = {
    relatedBobjectType: bobjectTypes
  };
  return _objectSpread$5(_objectSpread$5({}, filters), bobjectFilters);
};
var transformFilterBobjectTypeToORsState = function transformFilterBobjectTypeToORsState(bobjectType) {
  if (!Array.isArray(bobjectType)) {
    if (['Task', 'Activity'].includes(bobjectType) || !bobjectType) return [];
    return [bobjectType];
  } else {
    return bobjectType.filter(function (type) {
      return ['Task', 'Activity'].includes(type);
    });
  }
};

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
var _excluded = ["hasLoadedStorage"];
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var FiltersContext = /*#__PURE__*/createContext(null);
var defaultStructure = function defaultStructure() {
  return {
    Company: {},
    Lead: {},
    Opportunity: {},
    Task: {},
    Activity: {},
    conditions: {},
    hasLoadedStorage: false
  };
};
var FiltersProvider = function FiltersProvider(_ref) {
  var setSubqueryBobjectType = _ref.setSubqueryBobjectType,
    children = _ref.children,
    bobjectFields = _ref.bobjectFields,
    defaultQuickFilters = _ref.defaultQuickFilters;
  var _useState = useState(false),
    _useState2 = _slicedToArray$3(_useState, 2),
    haveFiltersBeenChanged = _useState2[0],
    setHaveFiltersBeenChanged = _useState2[1];
  var _useState3 = useState(BobjectTypes.Company),
    _useState4 = _slicedToArray$3(_useState3, 2),
    bobjectType = _useState4[0],
    setBobjectType = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray$3(_useState5, 2),
    key = _useState6[0],
    setKey = _useState6[1];
  var _useSessionStorage = useSessionStorage(),
    get = _useSessionStorage.get,
    set = _useSessionStorage.set,
    remove = _useSessionStorage.remove;
  var _useState7 = useState(defaultStructure()),
    _useState8 = _slicedToArray$3(_useState7, 2),
    defaultFilters = _useState8[0],
    setDefaultFilters = _useState8[1];
  var _useState9 = useState(defaultStructure()),
    _useState10 = _slicedToArray$3(_useState9, 2),
    filters = _useState10[0],
    setFilters = _useState10[1];
  var _useState11 = useState(),
    _useState12 = _slicedToArray$3(_useState11, 2),
    selectedQuickFilter = _useState12[0],
    setSelectedQuickFilter = _useState12[1];

  //adds Quickfilters to filters
  useEffect(function () {
    if (selectedQuickFilter !== null && selectedQuickFilter !== void 0 && selectedQuickFilter.filters) {
      setQuickFilter(selectedQuickFilter);
    }
  }, [selectedQuickFilter]);

  //save in session storage
  useEffect(function () {
    if (key) {
      var storedFilters = get(key);
      set(key, _objectSpread$4(_objectSpread$4({}, storedFilters), {}, {
        quickFilter: selectedQuickFilter
      }));
    }
  }, [selectedQuickFilter]);

  //load filters from session storage
  useEffect(function () {
    if (key) {
      var sessionFilters = get(key);
      var savedFilters = sessionFilters === null || sessionFilters === void 0 ? void 0 : sessionFilters.filters;
      var savedQuickFilter = sessionFilters === null || sessionFilters === void 0 ? void 0 : sessionFilters.quickFilter;
      if (savedQuickFilter) {
        setSelectedQuickFilter(savedQuickFilter);
      }
      var parsedQuickFilters = savedQuickFilter && transformQuickFiltersToFilters((savedQuickFilter === null || savedQuickFilter === void 0 ? void 0 : savedQuickFilter.filters) || [], bobjectFields);
      var aggregatedSessionStorageFilters = mergeTwoObjects(savedFilters, parsedQuickFilters);
      setHaveFiltersBeenChanged(savedFilters && !isEqual(savedFilters, defaultFilters) || savedQuickFilter);

      // Fields are overwritten in webapp
      var mergedFilters;
      if (savedQuickFilter) {
        if (savedQuickFilter.type === 'ORs') {
          mergedFilters = _objectSpread$4(_objectSpread$4({}, filters), {}, {
            ORs: parsedQuickFilters
          });
        } else {
          mergedFilters = mergeTwoObjects(defaultFilters, aggregatedSessionStorageFilters);
        }
      } else {
        mergedFilters = _objectSpread$4(_objectSpread$4({}, defaultFilters), aggregatedSessionStorageFilters);
      }
      setFilters(_objectSpread$4(_objectSpread$4({}, mergedFilters), {
        hasLoadedStorage: true
      }));
    }
  }, [key]);
  var findFilterById = function findFilterById(filterId) {
    var _filter, _filter2;
    var filter;
    Object.keys(filters).forEach(function (bobjectType) {
      if (filters[bobjectType][filterId]) {
        filter = filters[bobjectType][filterId];
      }
    });

    // @ts-ignore
    if (isObject$1(filter) && Array.isArray((_filter = filter) === null || _filter === void 0 ? void 0 : _filter.query)) filter = (_filter2 = filter) === null || _filter2 === void 0 ? void 0 : _filter2.query;
    return filter;
  };
  var getFilterValue = function getFilterValue(filterLR) {
    if (filters) {
      var _bobjectFields$findFi;
      var filterId = (_bobjectFields$findFi = bobjectFields.findFieldByLogicRole(filterLR)) === null || _bobjectFields$findFi === void 0 ? void 0 : _bobjectFields$findFi.id;
      var filterValue = findFilterById(filterId);
      return transformFilterStateToFilter(filterValue);
    }
    return '';
  };
  var removeSelectedQuickFilter = function removeSelectedQuickFilter(quickFilter) {
    var _quickFilter$filters;
    var fieldIdsToRemove = quickFilter === null || quickFilter === void 0 ? void 0 : (_quickFilter$filters = quickFilter.filters) === null || _quickFilter$filters === void 0 ? void 0 : _quickFilter$filters.map(function (filter) {
      return filter === null || filter === void 0 ? void 0 : filter.bobjectFieldId;
    });
    //@ts-ignore
    if (quickFilter.type === 'ORs') {
      fieldIdsToRemove = [Object.keys(filters['ORs'])[0]];
    }
    var cleanedFilters = removeFiltersById(filters, fieldIdsToRemove);
    var mergedFilters = mergeTwoObjects(defaultFilters, cleanedFilters);
    setFilters(mergedFilters);
    setSelectedQuickFilter(undefined);
  };
  var removeFilter = function removeFilter(fieldId) {
    var cleanedFilters = removeFiltersById(filters, [fieldId]);
    setFilters(cleanedFilters);
    var storedFilters = get(key);
    set(key, _objectSpread$4(_objectSpread$4({}, storedFilters), {}, {
      filters: cleanedFilters
    }));
    if (isEqual(cleanedFilters, defaultFilters) || selectedQuickFilter) setHaveFiltersBeenChanged(false);
  };
  var setFilter = function setFilter(filterBobjectType, fieldLR, filterValues) {
    var _bobjectFields$findFi2;
    var autoChanged = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    setHaveFiltersBeenChanged(autoChanged);
    var fieldId = bobjectFields === null || bobjectFields === void 0 ? void 0 : (_bobjectFields$findFi2 = bobjectFields.findFieldByLogicRole(fieldLR)) === null || _bobjectFields$findFi2 === void 0 ? void 0 : _bobjectFields$findFi2.id;
    var isRemoveAction = !filterValues || Array.isArray(filterValues) && (filterValues === null || filterValues === void 0 ? void 0 : filterValues.length) === 0;
    if (isRemoveAction) {
      removeFilter(fieldId);
    } else {
      var transformedValue = transformFiltersToFiltersState(filterValues);
      if (transformedValue) {
        var aggregatedFilters = _objectSpread$4(_objectSpread$4({}, filters), {}, _defineProperty$5({}, filterBobjectType, _objectSpread$4(_objectSpread$4({}, filters[filterBobjectType]), {}, _defineProperty$5({}, fieldId, transformedValue))));
        var oRsBobjectType = transformFilterBobjectTypeToORsState(filterBobjectType);
        if (typeof setSubqueryBobjectType === 'function') setSubqueryBobjectType(oRsBobjectType);
        setFilters(aggregatedFilters);
        aggregatedFilters.hasLoadedStorage;
          var filtersForStorage = _objectWithoutProperties(aggregatedFilters, _excluded);
        var storedFilters = get(key);
        set(key, _objectSpread$4(_objectSpread$4({}, storedFilters), {}, {
          filters: filtersForStorage
        }));
      }
    }
  };
  var setORsFilters = function setORsFilters(id, value, filterBobjectType, filtersValues) {
    setHaveFiltersBeenChanged(true);
    var aggregatedFilters = _objectSpread$4({}, filters);
    var _iterator = _createForOfIteratorHelper(filtersValues),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _bobjectFields$findFi3;
        var _step$value = _step.value,
          _fieldLR = _step$value.fieldLR,
          filterValues = _step$value.filterValues;
        var _fieldId = bobjectFields === null || bobjectFields === void 0 ? void 0 : (_bobjectFields$findFi3 = bobjectFields.findFieldByLogicRole(_fieldLR)) === null || _bobjectFields$findFi3 === void 0 ? void 0 : _bobjectFields$findFi3.id;
        var isRemoveAction = !filterValues || Array.isArray(filterValues) && (filterValues === null || filterValues === void 0 ? void 0 : filterValues.length) === 0;
        if (isRemoveAction) {
          aggregatedFilters = removeFiltersById(aggregatedFilters, [_fieldId]);
        } else {
          var transformedValue = transformFiltersToFiltersState(filterValues);
          if (transformedValue) {
            aggregatedFilters['ORs'] = _defineProperty$5({}, filterBobjectType, _objectSpread$4(_objectSpread$4({}, aggregatedFilters['ORs'][filterBobjectType]), {}, _defineProperty$5({}, _fieldId, transformedValue)));
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    setFilters(aggregatedFilters);
  };
  var setFilterConditions = function setFilterConditions(key, value) {
    if (key === 'relatedBobjectType') resetFilters(value);
  };
  var setDefaultFiltersValues = function setDefaultFiltersValues(fields) {
    var tempFilters = {};
    var _iterator2 = _createForOfIteratorHelper(fields),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _bobjectFields$findFi4;
        var _step2$value = _step2.value,
          _fieldLR2 = _step2$value.fieldLR,
          defaultValue = _step2$value.defaultValue;
        var _bobjectType = getBobjectFromLogicRole(_fieldLR2);
        //const fieldId = getFieldIdByLogicRole(bobjectFields, fieldLR);
        var _fieldId2 = bobjectFields === null || bobjectFields === void 0 ? void 0 : (_bobjectFields$findFi4 = bobjectFields.findFieldByLogicRole(_fieldLR2)) === null || _bobjectFields$findFi4 === void 0 ? void 0 : _bobjectFields$findFi4.id;
        var parsedDefaultValue = defaultValue !== null && defaultValue !== void 0 && defaultValue.start ? parseFilterRelativeDateValue(defaultValue) : defaultValue;
        tempFilters[_bobjectType] = _objectSpread$4(_objectSpread$4({}, tempFilters[_bobjectType]), {}, _defineProperty$5({}, _fieldId2, parsedDefaultValue));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var newDefaultFilters = _objectSpread$4(_objectSpread$4({}, defaultStructure()), tempFilters);
    setDefaultFilters(newDefaultFilters);
    setFilters(newDefaultFilters);
  };
  var setMoreFilters = function setMoreFilters(moreFilters) {
    var parsedMoreFilters = transformMoreFiltersToFilters(moreFilters, bobjectFields);
    var mergedFilters = mergeTwoObjects(defaultFilters, parsedMoreFilters);
    setFilters(_objectSpread$4(_objectSpread$4({}, isEmpty(parsedMoreFilters) ? defaultFilters : mergedFilters), {}, {
      hasLoadedStorage: true
    }));
  };
  var setQuickFilter = function setQuickFilter(quickFilter) {
    var parsedQuickFilters = transformQuickFiltersToFilters((quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.filters) || [], bobjectFields);
    var mergedFilters;
    // @ts-ignore
    if (quickFilter.type === 'ORs') {
      mergedFilters = _objectSpread$4(_objectSpread$4({}, filters), {}, _defineProperty$5({}, 'ORs', parsedQuickFilters));
    } else {
      mergedFilters = mergeTwoObjects(filters, parsedQuickFilters);
    }
    setHaveFiltersBeenChanged(true);
    setFilters(mergedFilters);
    //setSelectedQuickFilter(quickFilter);
  };

  var resetFilters = function resetFilters(bobjectType) {
    setHaveFiltersBeenChanged(false);
    setSelectedQuickFilter(null);
    if (typeof setSubqueryBobjectType === 'function') setSubqueryBobjectType([]);
    if (bobjectType) {
      var filtersToSet = resetFiltersByBobjectType(bobjectType, filters);
      setFilters(filtersToSet);
    } else {
      setFilters(_objectSpread$4(_objectSpread$4({}, defaultFilters), {
        hasLoadedStorage: true
      }));
    }
    remove(key);
  };
  return /*#__PURE__*/jsx(FiltersContext.Provider, {
    value: {
      bobjectType: bobjectType,
      filters: filters,
      defaultFilters: defaultFilters,
      haveFiltersBeenChanged: haveFiltersBeenChanged,
      key: key,
      selectedQuickFilter: selectedQuickFilter,
      getFilterValue: getFilterValue,
      removeFilter: removeFilter,
      removeSelectedQuickFilter: removeSelectedQuickFilter,
      resetFilters: resetFilters,
      setBobjectType: setBobjectType,
      setFilter: setFilter,
      setORsFilters: setORsFilters,
      setFilters: setFilters,
      setHaveFiltersBeenChanged: setHaveFiltersBeenChanged,
      setKey: setKey,
      setMoreFilters: setMoreFilters,
      setQuickFilter: setQuickFilter,
      setSelectedQuickFilter: setSelectedQuickFilter,
      setFilterConditions: setFilterConditions,
      setDefaultFiltersValues: setDefaultFiltersValues,
      setSubqueryBobjectType: setSubqueryBobjectType,
      defaultQuickFilters: defaultQuickFilters
    },
    children: children
  });
};
var useFilters = function useFilters(bobjectType, key) {
  var context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  useEffect(function () {
    if (context && bobjectType) {
      context.setBobjectType(bobjectType);
    }
  }, [context]);
  useEffect(function () {
    if (context && key) {
      context.setKey(key);
    }
  }, [key]);
  return context;
};

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

var css_248z$6 = ".filter-module_container__JDuqD {\n  display: flex;\n  flex-direction: column;\n  /* margin-top: 16px; */\n  flex-wrap: wrap;\n}\n\n.filter-module_actionButtons__WxjRY {\n  display: flex;\n}\n\n.filter-module_actionButtons__WxjRY > button {\n  padding-bottom: 0;\n  padding-top: 0;\n}\n\n.filter-module_filter_wrapper__BIQvx > div > div > input {\n  box-shadow: none !important;\n}\n";
var styles$5 = {"container":"filter-module_container__JDuqD","actionButtons":"filter-module_actionButtons__WxjRY","filter_wrapper":"filter-module_filter_wrapper__BIQvx"};
styleInject(css_248z$6);

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getItemProps = function getItemProps(fieldLR, value, isMultiselect, isAssignedTo, t) {
  var _value, _value2;
  var placeholder;
  if (Array.isArray(value) && isMultiselect) {
    value = value.filter(function (item) {
      return item !== undefined;
    });
  }
  var userId = useActiveUserId();
  if (isAssignedTo && (!value || value === userId || ((_value = value) === null || _value === void 0 ? void 0 : _value[0]) === userId)) {
    placeholder = t('leftBar.filters.me');
    value = [];
  }
  return _objectSpread$3(_objectSpread$3({}, placeholder ? {
    placeholder: placeholder
  } : {}), {}, {
    value: (_value2 = value) !== null && _value2 !== void 0 ? _value2 : isMultiselect ? [] : ''
  });
};
var checkDisplayConditions = function checkDisplayConditions(showByDefault, conditions, strictConditions, filterConditions) {
  var _Object$entries$ = _slicedToArray$2(Object.entries(filterConditions)[0], 2),
    field = _Object$entries$[0],
    value = _Object$entries$[1];
  if (showByDefault && !conditions[field]) return true;
  if (strictConditions) {
    var selectedConditions = conditions[field];
    // @ts-ignore
    return (selectedConditions === null || selectedConditions === void 0 ? void 0 : selectedConditions.length) === 1 ? selectedConditions[0] === value : false;
  } else {
    var _conditions$field;
    // @ts-ignore
    return conditions[field] === value || ((_conditions$field = conditions[field]) === null || _conditions$field === void 0 ? void 0 : _conditions$field.includes(value));
  }
};

/**
 * NewFilter Component: renders select / multiselect with the values passed, and
 * sets the filter depending on the passed field logic role.
 *
 * param **fieldLR** <br>
 * param **placeholder** <br>
 * param **values** <br>
 * param **conditions**: only necessary if this depends on another filter <br>
 * param **isCondition**: true if other fields should display depending on this value <br>
 * param **isMultiselect**: if missing, component will be a select <br>
 * param **showByDefault**: only necessary if it is conditioned field
 */
var Filter = function Filter(_ref) {
  var _sortBy, _getItems;
  var fieldLR = _ref.fieldLR,
    placeholder = _ref.placeholder,
    values = _ref.values,
    filterConditions = _ref.conditions,
    _ref$strictConditions = _ref.strictConditions,
    strictConditions = _ref$strictConditions === void 0 ? false : _ref$strictConditions,
    _ref$isMultiselect = _ref.isMultiselect,
    isMultiselect = _ref$isMultiselect === void 0 ? false : _ref$isMultiselect,
    _ref$showByDefault = _ref.showByDefault,
    showByDefault = _ref$showByDefault === void 0 ? false : _ref$showByDefault,
    options = _ref.options,
    _ref$fieldBySort = _ref.fieldBySort,
    fieldBySort = _ref$fieldBySort === void 0 ? 'value' : _ref$fieldBySort,
    _ref$sortDisabled = _ref.sortDisabled,
    sortDisabled = _ref$sortDisabled === void 0 ? false : _ref$sortDisabled;
  var _useFilters = useFilters(),
    setFilter = _useFilters.setFilter,
    getFilterValue = _useFilters.getFilterValue,
    conditions = _useFilters.filters.conditions;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var bobjectType = getBobjectFromLogicRole(fieldLR);
  var value = getFilterValue(fieldLR);
  var isAssignedTo = fieldLR.includes('ASSIGNED') || fieldLR.includes('USER');
  var itemComponentsCreated = /*#__PURE__*/React.isValidElement(Array.isArray(values) && values[0]);
  var shouldBeDisplayed = !filterConditions || conditions && checkDisplayConditions(showByDefault, conditions, strictConditions, filterConditions);
  var itemProps = getItemProps(fieldLR, value, isMultiselect, isAssignedTo, t);
  var handleOnChange = function handleOnChange(value) {
    setFilter(bobjectType, fieldLR, value);
  };
  var getItems = function getItems() {
    if (sortDisabled) {
      return values;
    }
    return sortBy(values, fieldBySort);
  };
  return /*#__PURE__*/jsx("div", {
    className: styles$5.filter_wrapper,
    children: shouldBeDisplayed ? isMultiselect ? /*#__PURE__*/jsx(MultiSelect, _objectSpread$3(_objectSpread$3(_objectSpread$3({
      placeholder: placeholder,
      value: value !== null && value !== void 0 ? value : [],
      onChange: handleOnChange,
      size: "small",
      variant: "filters",
      selectAllOption: true,
      allOptionLabel: t('common.all'),
      autocomplete: (values === null || values === void 0 ? void 0 : values.length) > 8
    }, itemProps), options), {}, {
      children: itemComponentsCreated ? values : (_sortBy = sortBy(values, fieldBySort)) === null || _sortBy === void 0 ? void 0 : _sortBy.map(function (item) {
        return /*#__PURE__*/jsx(CheckItem, {
          value: item.id,
          children: item !== null && item !== void 0 && item.name ? item === null || item === void 0 ? void 0 : item.name : item === null || item === void 0 ? void 0 : item.value
        }, item.id);
      })
    })) : /*#__PURE__*/jsx(Select, _objectSpread$3(_objectSpread$3({
      size: "small",
      variant: "filters",
      placeholder: placeholder,
      value: value !== null && value !== void 0 ? value : '',
      onChange: handleOnChange,
      autocomplete: (values === null || values === void 0 ? void 0 : values.length) > 8
    }, options), {}, {
      children: itemComponentsCreated ? values : (_getItems = getItems()) === null || _getItems === void 0 ? void 0 : _getItems.map(function (item) {
        return /*#__PURE__*/jsx(Item, {
          value: item.id,
          children: item.value || (item === null || item === void 0 ? void 0 : item.name)
        }, item.id);
      })
    })) : /*#__PURE__*/jsx(Fragment, {})
  });
};

var css_248z$5 = ".filterGroup-module_groupContainer__vqgYx {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  gap: 8px;\n}\n\n.filterGroup-module_groupContainer__vqgYx:not(:last-child) {\n  padding-right: 6px;\n}\n\n.filterGroup-module_groupContainer__vqgYx:last-child {\n  margin-bottom: 16px;\n}\n\n.filterGroup-module_groupContainer__vqgYx:not(:first-child) {\n  padding-left: 0px;\n}\n\n/* .groupContainer > div:not(:last-child) {\n  margin-right: 8px;\n} */\n\n/* .groupContainer > div,\n.groupContainer > p {\n  margin-bottom: 8px;\n} */\n\n.filterGroup-module_groupContainer__vqgYx > p {\n  margin-right: 8px;\n}\n\n.filterGroup-module_groupContainer__vqgYx div[role='listbox'] {\n  margin-bottom: 0;\n}\n\n@media (max-width: 1279px) {\n  .filterGroup-module_groupContainer__vqgYx:not(:first-child) {\n    padding-left: 0;\n  }\n  .filterGroup-module_groupContainer__vqgYx:not(:last-child) {\n    margin-bottom: 0;\n  }\n  .filterGroup-module_groupContainer__vqgYx:last-child {\n    margin-top: 8px;\n  }\n}\n";
var styles$4 = {"groupContainer":"filterGroup-module_groupContainer__vqgYx"};
styleInject(css_248z$5);

var FilterGroup = function FilterGroup(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/jsx("div", {
    className: styles$4.groupContainer,
    children: children
  });
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var withProvider = function withProvider(Component) {
  return function (_ref) {
    var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
    return /*#__PURE__*/jsx(FiltersProvider, {
      setSubqueryBobjectType: props.setOrsBobjectType,
      bobjectFields: props.bobjectFields,
      defaultSort: props.defaultSort,
      defaultQuickFilters: props.defaultQuickFilters,
      children: /*#__PURE__*/jsx(Component, _objectSpread$2({}, props))
    });
  };
};
var Filters = function Filters(_ref2) {
  var bobjectType = _ref2.bobjectType,
    children = _ref2.children,
    _ref2$defaultFilters = _ref2.defaultFilters,
    defaultFilters = _ref2$defaultFilters === void 0 ? [] : _ref2$defaultFilters,
    tabName = _ref2.tabName,
    onQueryChange = _ref2.onQueryChange,
    bobjectFields = _ref2.bobjectFields,
    onHaveFiltersBeenChanged = _ref2.onHaveFiltersBeenChanged;
  var _useFilters = useFilters(bobjectType, tabName),
    filters = _useFilters.filters,
    setDefaultFiltersValues = _useFilters.setDefaultFiltersValues,
    haveFiltersBeenChanged = _useFilters.haveFiltersBeenChanged;
  var hasDefaultFilters = _typeof$3(defaultFilters) === 'object';
  useEffect(function () {
    if (typeof onHaveFiltersBeenChanged === 'function') onHaveFiltersBeenChanged(haveFiltersBeenChanged);
  }, [haveFiltersBeenChanged]);
  useEffect(function () {
    if (defaultFilters) setDefaultFiltersValues(defaultFilters);
  }, [hasDefaultFilters, tabName]);
  useEffect(function () {
    if (!filters.hasLoadedStorage) return;
    var queryFromFilters = transformFiltersToQuery(filters, bobjectType, bobjectFields);
    var subqueryFromFilters;
    if (Object.prototype.hasOwnProperty.call(filters, 'ORs')) {
      subqueryFromFilters = transformFiltersToQuery(filters['ORs'], bobjectType, bobjectFields);
    }
    onQueryChange({
      query: queryFromFilters,
      subquery: subqueryFromFilters
    });
  }, [filters]);
  return /*#__PURE__*/jsx("div", {
    className: styles$5.container,
    children: Children.map(children, function (child, index) {
      return /*#__PURE__*/React.cloneElement(child);
    })
  });
};
var filters = withProvider(Filters);

var css_248z$4 = ".quickFilter-module_wrapper__Mnw7Z {\n  display: flex;\n  align-content: space-between;\n}\n\n.quickFilter-module_chip__AMHej > div {\n  background-color: var(--lightestBloobirds);\n}\n\n.quickFilter-module_chip__AMHej > div:hover {\n  background-color: var(--verySoftPeanut);\n}\n\n.quickFilter-module_chipSelected__la8Bb > div,\n.quickFilter-module_chipSelected__la8Bb > div:focus,\n.quickFilter-module_chipSelected__la8Bb > div:hover {\n  background-color: var(--softPeanut);\n}\n\n.quickFilter-module_dropdownMenu__ngx7n {\n  width: 23px;\n  height: 23px;\n  border-radius: 16px;\n  margin-left: -23px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.quickFilter-module_icon__qyV6j {\n  margin-left: -5px;\n  margin-right: 3px;\n}\n";
var styles$3 = {"wrapper":"quickFilter-module_wrapper__Mnw7Z","chip":"quickFilter-module_chip__AMHej","chipSelected":"quickFilter-module_chipSelected__la8Bb","dropdownMenu":"quickFilter-module_dropdownMenu__ngx7n","icon":"quickFilter-module_icon__qyV6j"};
styleInject(css_248z$4);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CustomQuickFilter = function CustomQuickFilter(_ref) {
  var _quickFilter$filters;
  var onApply = _ref.onApply,
    blackListedField = _ref.blackListedField,
    isSelected = _ref.isSelected,
    quickFilter = _ref.quickFilter;
  var hasBlackListedField = blackListedField && (quickFilter === null || quickFilter === void 0 ? void 0 : (_quickFilter$filters = quickFilter.filters) === null || _quickFilter$filters === void 0 ? void 0 : _quickFilter$filters.some(function (filter) {
    return (filter === null || filter === void 0 ? void 0 : filter.bobjectFieldId) === (blackListedField === null || blackListedField === void 0 ? void 0 : blackListedField.id);
  }));
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$3.wrapper, _defineProperty$2(_defineProperty$2({}, styles$3.chip, !isSelected), styles$3.chipSelected, isSelected)),
    children: /*#__PURE__*/jsxs(Chip, {
      size: "small",
      selected: isSelected,
      disabled: !(quickFilter !== null && quickFilter !== void 0 && quickFilter.defaultGroup) && hasBlackListedField,
      onClick: function onClick(status) {
        if (!hasBlackListedField) {
          mixpanel.track("QUICKFILTER_CLICKED_".concat(quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.id.toUpperCase()));
          onApply(quickFilter, status);
        }
      },
      children: [(quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.iconName) && /*#__PURE__*/jsx(Icon, {
        name: quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.iconName,
        color: isSelected ? 'white' : quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.iconColor,
        size: 16,
        className: styles$3.icon
      }), quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.name]
    })
  });
};

var QuickFilters$1 = function QuickFilters(_ref) {
  var onToggleSelected = _ref.onToggleSelected;
  var _useFilters = useFilters(),
    key = _useFilters.key,
    selectedQuickFilter = _useFilters.selectedQuickFilter,
    removeSelectedQuickFilter = _useFilters.removeSelectedQuickFilter,
    setSelectedQuickFilter = _useFilters.setSelectedQuickFilter,
    defaultQuickFilters = _useFilters.defaultQuickFilters;
  var quickFilters = defaultQuickFilters;
  var _useSessionStorage = useSessionStorage(),
    stored = _useSessionStorage.stored;
  var applyQuickFilter = function applyQuickFilter(quickFilter, status) {
    if (status) {
      setSelectedQuickFilter(quickFilter);
    } else {
      removeSelectedQuickFilter(quickFilter);
    }
  };
  useEffect(function () {
    if (quickFilters && !selectedQuickFilter && stored && !stored[key] && key) {
      var defaultQuickFilter = quickFilters.find(function (filter) {
        return filter === null || filter === void 0 ? void 0 : filter.defaultGroup;
      });
      setSelectedQuickFilter(defaultQuickFilter);
    } else {
      setSelectedQuickFilter(undefined);
    }
  }, [key]);
  useEffect(function () {
    onToggleSelected === null || onToggleSelected === void 0 ? void 0 : onToggleSelected(selectedQuickFilter);
  }, [selectedQuickFilter]);
  return /*#__PURE__*/jsx(Fragment, {
    children: quickFilters !== null && quickFilters !== void 0 && quickFilters.length ? /*#__PURE__*/jsx(Fragment, {
      children: quickFilters.map(function (quickFilter) {
        return /*#__PURE__*/jsx(CustomQuickFilter, {
          quickFilter: quickFilter,
          onApply: applyQuickFilter,
          isSelected: (selectedQuickFilter === null || selectedQuickFilter === void 0 ? void 0 : selectedQuickFilter.id) === (quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.id)
        }, "quick-filter-".concat(quickFilter === null || quickFilter === void 0 ? void 0 : quickFilter.id));
      })
    }) : null
  });
};

var css_248z$3 = ".relativeDateFilter-module_filter_relative_date__0cBZx div[role='listbox'] {\n  background-color: var(--softPeanut);\n  max-width: 210px;\n  width: auto;\n  padding: 4px 6px;\n  max-height: none;\n  border: 0;\n  box-sizing: border-box;\n  height: 24px;\n}\n\n.relativeDateFilter-module_filter_relative_date__0cBZx div[role='listbox'] > button {\n  background-color: var(--softPeanut);\n  color: white;\n}\n\n.relativeDateFilter-module_filter_relative_date__0cBZx div[role='listbox'] > button > span {\n  color: white !important;\n}\n\n.relativeDateFilter-module_filter_relative_date__0cBZx div[role='listbox'] svg > path {\n  fill: var(--white);\n}\n\n.relativeDateFilter-module_filter_relative_date__0cBZx div[role='listbox'] > div:first-child > svg {\n  margin-bottom: 3px;\n}\n";
var styles$2 = {"filter_relative_date":"relativeDateFilter-module_filter_relative_date__0cBZx"};
styleInject(css_248z$3);

var RelativeDateFilter = function RelativeDateFilter(_ref) {
  var fieldLR = _ref.fieldLR;
  var _useFilters = useFilters(),
    getFilterValue = _useFilters.getFilterValue,
    setFilter = _useFilters.setFilter;
  var _useMediaQuery = useMediaQuery(),
    isSmallDesktop = _useMediaQuery.isSmallDesktop;
  var _useTranslation = useTranslation(),
    _t = _useTranslation.t;
  var handleOnChange = function handleOnChange(value) {
    setFilter(getBobjectFromLogicRole(fieldLR), fieldLR, value);
  };
  var filterValue = getFilterValue(fieldLR);
  var parsedFilterValue;
  if (isObject(filterValue)) {
    var _filterValue$value, _filterValue$value2;
    parsedFilterValue = {
      type: 'custom',
      start: new Date(filterValue === null || filterValue === void 0 ? void 0 : (_filterValue$value = filterValue.value) === null || _filterValue$value === void 0 ? void 0 : _filterValue$value.start),
      end: new Date(filterValue === null || filterValue === void 0 ? void 0 : (_filterValue$value2 = filterValue.value) === null || _filterValue$value2 === void 0 ? void 0 : _filterValue$value2.end)
    };
  }
  return /*#__PURE__*/jsx("div", {
    className: styles$2.filter_relative_date,
    children: /*#__PURE__*/jsx(RelativeDatePicker, {
      width: isSmallDesktop ? '80' : '150',
      value: parsedFilterValue,
      onChange: handleOnChange,
      placeholder: _t('common.creationDate'),
      size: "small",
      t: function t(key) {
        return _t("leftBar.dateFilter.".concat(key));
      }
    })
  });
};

var css_248z$2 = "#bloobirds-range-slider {\n  background: var(--lightBloobirds);\n}\n\n#bloobirds-range-slider .range-slider__range {\n  background: var(--darkBloobirds);\n  transition: height 0.3s;\n}\n\n#bloobirds-range-slider .range-slider__thumb {\n  background: var(--darkBloobirds);\n  transition: transform 0.3s;\n  height: 16px;\n  width: 16px;\n}\n\n#bloobirds-range-slider .range-slider__thumb[data-active] {\n  transform: translate(-50%, -50%) scale(1.25);\n}\n\n#bloobirds-range-slider .range-slider__range[data-active] {\n  height: 16px;\n}\n";
styleInject(css_248z$2);

var css_248z$1 = ".timezoneRangeFilter-module_contentWrapper__ZemDw {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 24px;\n  padding: 16px 32px;\n}\n\n.timezoneRangeFilter-module_header__455MD {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 18px;\n}\n\n.timezoneRangeFilter-module_quickFiltersWrapper__aqisA {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  margin-top: 8px;\n}\n\n.timezoneRangeFilter-module_quickFilter__gv41G {\n  background-color: var(--veryLightBloobirds);\n  border-radius: 4px;\n  padding: 4px 8px;\n}\n\n.timezoneRangeFilter-module_quickFilter__gv41G:hover, .timezoneRangeFilter-module_quickFilterSelected__6TdC9 {\n  cursor: pointer;\n  background-color: var(--darkBloobirds);\n}\n\n.timezoneRangeFilter-module_infoWrapper__YH-qs {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n  height: 24px;\n}\n\n.timezoneRangeFilter-module_filter__8hUjl, .timezoneRangeFilter-module_filter__8hUjl div[class*='SmallSelect-module_filterVariant'] {\n  max-width: 348px;\n  margin-bottom: 8px;\n}\n\n.timezoneRangeFilter-module_filter__8hUjl button > span {\n  font-weight: 500 !important;\n}\n\n.timezoneRangeFilter-module_filter__8hUjl button > span {\n  color: var(--darkBloobirds) !important;\n}\n\n\n\n\n";
var styles$1 = {"contentWrapper":"timezoneRangeFilter-module_contentWrapper__ZemDw","header":"timezoneRangeFilter-module_header__455MD","quickFiltersWrapper":"timezoneRangeFilter-module_quickFiltersWrapper__aqisA","quickFilter":"timezoneRangeFilter-module_quickFilter__gv41G","quickFilterSelected":"timezoneRangeFilter-module_quickFilterSelected__6TdC9","infoWrapper":"timezoneRangeFilter-module_infoWrapper__YH-qs","filter":"timezoneRangeFilter-module_filter__8hUjl"};
styleInject(css_248z$1);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var DEFAULT_VALUE = [0, 1439];
var QuickFilters = [{
  i18key: 'allDay',
  value: DEFAULT_VALUE
}, {
  i18key: 'labourHours',
  value: [540, 1080]
}, {
  i18key: 'mornings',
  value: [540, 720]
}, {
  i18key: 'afternoons',
  value: [720, 1080]
}];
var transformNumberToDateRange = function transformNumberToDateRange(value) {
  return {
    start: spacetimeClass()["goto"]('UTC').startOf('day').add(value === null || value === void 0 ? void 0 : value[0], 'minutes').toNativeDate(),
    end: spacetimeClass()["goto"]('UTC').startOf('day').add(value === null || value === void 0 ? void 0 : value[1], 'minutes').toNativeDate()
  };
};
var parseValue = function parseValue(value) {
  var _value$start, _value$start2, _value$end, _value$end2;
  if (!value) {
    return DEFAULT_VALUE;
  }
  return [((_value$start = value.start) === null || _value$start === void 0 ? void 0 : _value$start.getMinutes()) + ((_value$start2 = value.start) === null || _value$start2 === void 0 ? void 0 : _value$start2.getHours()) * 60, ((_value$end = value.end) === null || _value$end === void 0 ? void 0 : _value$end.getMinutes()) + ((_value$end2 = value.end) === null || _value$end2 === void 0 ? void 0 : _value$end2.getHours()) * 60];
};
var TimezoneRangeFilter = function TimezoneRangeFilter(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange;
  var _useVisible = useVisible(),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'leftBar.filters.timezoneRange'
    }),
    t = _useTranslation.t;
  var parsedDefaultValue = parseValue(value);
  var _useState = useState(parsedDefaultValue),
    _useState2 = _slicedToArray$1(_useState, 2),
    internalValue = _useState2[0],
    setInternalValue = _useState2[1];
  var debouncedInternalValue = useDebounce(internalValue, 1000);
  var realValues = transformNumberToDateRange(internalValue);
  var toggleDropdownVisibility = function toggleDropdownVisibility() {
    return setVisible(!visible);
  };
  var isAllTime = (internalValue === null || internalValue === void 0 ? void 0 : internalValue[0]) === (DEFAULT_VALUE === null || DEFAULT_VALUE === void 0 ? void 0 : DEFAULT_VALUE[0]) && (internalValue === null || internalValue === void 0 ? void 0 : internalValue[1]) === (DEFAULT_VALUE === null || DEFAULT_VALUE === void 0 ? void 0 : DEFAULT_VALUE[1]);
  var parseValueToString = function parseValueToString(value) {
    var _spacetime, _spacetime2, _spacetime2$goto;
    if (!value) {
      return undefined;
    }
    return t('displayValue', {
      start: (_spacetime = spacetimeClass(value.start)) === null || _spacetime === void 0 ? void 0 : _spacetime["goto"]('UTC').format('{time-24}'),
      end: (_spacetime2 = spacetimeClass(value.end)) === null || _spacetime2 === void 0 ? void 0 : (_spacetime2$goto = _spacetime2["goto"]('UTC')) === null || _spacetime2$goto === void 0 ? void 0 : _spacetime2$goto.format('{time-24}')
    });
  };
  useEffect(function () {
    if (!value) setInternalValue(DEFAULT_VALUE);
  }, [value]);
  useEffect(function () {
    onChange(realValues);
  }, [debouncedInternalValue]);
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    width: "100%",
    visible: visible,
    position: "bottom-start",
    arrow: false,
    anchor: /*#__PURE__*/jsx("div", {
      className: styles$1.filter,
      children: /*#__PURE__*/jsx(Select, {
        size: "small",
        variant: "filters",
        width: "348px",
        placeholder: value && !isAllTime ? parseValueToString(value) : t('placeholder'),
        onClick: toggleDropdownVisibility,
        removePlaceholder: !!value,
        dropdownProps: {
          style: {
            display: 'none'
          }
        },
        adornment: /*#__PURE__*/jsx(Icon, {
          name: "clock",
          color: "darkBloobirds",
          size: 14
        }),
        children: ''
      })
    }),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$1.contentWrapper,
      children: [/*#__PURE__*/jsx("div", {
        className: styles$1.header,
        children: /*#__PURE__*/jsx(Text, {
          size: "s",
          color: "softPeanut",
          children: /*#__PURE__*/jsx(Trans, {
            i18nKey: "leftBar.filters.timezoneRange.title"
          })
        })
      }), /*#__PURE__*/jsx("div", {
        className: styles$1.quickFiltersWrapper,
        children: QuickFilters.map(function (props) {
          return /*#__PURE__*/jsx(QuickFilterButton, _objectSpread$1({
            setValue: setInternalValue,
            selected: (internalValue === null || internalValue === void 0 ? void 0 : internalValue[0]) === (props === null || props === void 0 ? void 0 : props.value[0]) && (internalValue === null || internalValue === void 0 ? void 0 : internalValue[1]) === (props === null || props === void 0 ? void 0 : props.value[1])
          }, props), props.i18key);
        })
      }), /*#__PURE__*/jsx(RangeSlider, {
        id: "bloobirds-range-slider",
        value: internalValue,
        onInput: setInternalValue,
        min: 0,
        max: 1440,
        step: 60
      }), /*#__PURE__*/jsxs("div", {
        className: styles$1.infoWrapper,
        children: [/*#__PURE__*/jsx(Text, {
          size: "s",
          weight: "bold",
          color: "darkBloobirds",
          align: "left",
          children: t('from', {
            hour: spacetimeClass(realValues === null || realValues === void 0 ? void 0 : realValues.start)["goto"]('UTC').format('{time-24}')
          })
        }), /*#__PURE__*/jsx(Text, {
          size: "s",
          weight: "bold",
          color: "darkBloobirds",
          align: "right",
          children: t('to', {
            hour: spacetimeClass(realValues === null || realValues === void 0 ? void 0 : realValues.end)["goto"]('UTC').format('{time-24}')
          })
        })]
      })]
    })
  });
};
var QuickFilterButton = function QuickFilterButton(_ref2) {
  var i18key = _ref2.i18key,
    value = _ref2.value,
    setValue = _ref2.setValue,
    selected = _ref2.selected;
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$1(_useHover, 2),
    ref = _useHover2[0],
    isHover = _useHover2[1];
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'leftBar.filters.timezoneRange.quickFilters'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$1.quickFilter, _defineProperty$1({}, styles$1.quickFilterSelected, selected)),
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      setValue(value);
    },
    ref: ref,
    children: /*#__PURE__*/jsx(Text, {
      size: "xs",
      align: "center",
      color: isHover || selected ? 'white' : 'darkBloobirds',
      children: t(i18key)
    })
  });
};

var css_248z = ".userTeamsFilter-module_itemWrapper__SisOT {\n  color: var(--softPeanut);\n  font-weight: 600;\n  padding: 4px 0 4px 8px;\n  margin: 4px 8px;\n  background: var(--lightestBloobirds);\n  border-radius: 8px;\n}\n\n.userTeamsFilter-module_itemChecked__rYsw8 {\n  color: var(--bloobirds);\n  font-weight: 700;\n  background: var(--veryLightBloobirds);\n\n}\n";
var styles = {"itemWrapper":"userTeamsFilter-module_itemWrapper__SisOT","itemChecked":"userTeamsFilter-module_itemChecked__rYsw8"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
var IdFilterTypes;
(function (IdFilterTypes) {
  IdFilterTypes["Team"] = "TEAM";
  IdFilterTypes["User"] = "USER";
})(IdFilterTypes || (IdFilterTypes = {}));
var FilterActions;
(function (FilterActions) {
  FilterActions["Select"] = "SELECT";
  FilterActions["Unselect"] = "UNSELECT";
})(FilterActions || (FilterActions = {}));
var UserFilterByTeams = function UserFilterByTeams(_ref) {
  var _settings$user, _selectProps$width;
  var value = _ref.value,
    onChange = _ref.onChange,
    selectProps = _ref.selectProps;
  var activeUserId = useActiveUserId();
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useUserTeams = useUserTeams(),
    teams = _useUserTeams.teams,
    isLoadingTeams = _useUserTeams.isLoadingTeams,
    getTeamsByManagerId = _useUserTeams.getTeamsByManagerId,
    isManagerById = _useUserTeams.isManagerById,
    teamUsersAggregation = _useUserTeams.teamUsersAggregation;
  var teamIds = teams === null || teams === void 0 ? void 0 : teams.map(function (t) {
    return t === null || t === void 0 ? void 0 : t.id;
  });
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'leftBar.userTeamsFilter'
    }),
    t = _useTranslation.t;
  var userRoles = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.roles;
  var isAdminUser = (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.GLOBAL_ADMIN)) || (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.ACCOUNT_ADMIN));
  var isManager = isManagerById === null || isManagerById === void 0 ? void 0 : isManagerById(activeUserId);
  var managerTeams = getTeamsByManagerId === null || getTeamsByManagerId === void 0 ? void 0 : getTeamsByManagerId(activeUserId);
  var teamsToDisplay = isAdminUser ? teams : isManager ? managerTeams : undefined;
  var lastFilterValue = useRef(value !== null && value !== void 0 ? value : []);
  var handleValueChange = function handleValueChange(value) {
    var _value, _value2;
    if (((_value = value) === null || _value === void 0 ? void 0 : _value.length) === teamUsersAggregation || ((_value2 = value) === null || _value2 === void 0 ? void 0 : _value2.length) === 0) {
      lastFilterValue.current = value;
      onChange(value);
    } else {
      var change;
      value.forEach(function (v) {
        if (lastFilterValue !== null && lastFilterValue !== void 0 && lastFilterValue.current && !lastFilterValue.current.includes(v)) {
          var idType = teamIds !== null && teamIds !== void 0 && teamIds.includes(v) ? IdFilterTypes.Team : IdFilterTypes.User;
          change = {
            action: FilterActions.Select,
            id: v,
            type: idType
          };
        }
      });
      lastFilterValue.current.forEach(function (v) {
        var _value3;
        if (!((_value3 = value) !== null && _value3 !== void 0 && _value3.includes(v))) {
          var idType = teamIds !== null && teamIds !== void 0 && teamIds.includes(v) ? IdFilterTypes.Team : IdFilterTypes.User;
          change = {
            action: FilterActions.Unselect,
            id: v,
            type: idType
          };
        }
      });
      if (change) {
        if (change.type === IdFilterTypes.User) {
          if (change.action === FilterActions.Select) {
            var teamsMatching = teams.filter(function (team) {
              return team.teamUsers.every(function (user) {
                var _value4;
                return (_value4 = value) === null || _value4 === void 0 ? void 0 : _value4.includes(user.userId);
              });
            });
            teamsMatching.forEach(function (teamId) {
              var _value5;
              if (teamId && !((_value5 = value) !== null && _value5 !== void 0 && _value5.includes(teamId === null || teamId === void 0 ? void 0 : teamId.id))) {
                value.push(teamId === null || teamId === void 0 ? void 0 : teamId.id);
              }
            });
          }
          if (change.action === FilterActions.Unselect) {
            var _teamsMatching = teams.filter(function (team) {
              return team.teamUsers.some(function (user) {
                return user.userId === change.id;
              });
            });
            _teamsMatching.forEach(function (teamId) {
              if (teamId) {
                var _value7;
                var allSelected = teamId.teamUsers.every(function (user) {
                  var _value6;
                  return (_value6 = value) === null || _value6 === void 0 ? void 0 : _value6.includes(user.userId);
                });
                if (!allSelected && (_value7 = value) !== null && _value7 !== void 0 && _value7.includes(teamId.id)) {
                  value = value.filter(function (id) {
                    return id !== teamId.id;
                  });
                }
              }
            });
          }
        } else if (change.type === IdFilterTypes.Team) {
          if (change.action === FilterActions.Select) {
            var _teamsMatching2 = teams.filter(function (team) {
              return team.id === change.id;
            });
            _teamsMatching2.forEach(function (team) {
              if (team) {
                var _value8;
                (_value8 = value).push.apply(_value8, _toConsumableArray(team.teamUsers.map(function (user) {
                  return user.userId;
                })).concat([change.id]));
              }
            });
          }
          if (change.action === FilterActions.Unselect) {
            var _teamsMatching3 = teams.filter(function (team) {
              return team.id === change.id;
            });
            _teamsMatching3.forEach(function (team) {
              if (team) {
                value = value.filter(function (id) {
                  return !team.teamUsers.some(function (user) {
                    return user.userId === id;
                  });
                });
                value = value.filter(function (id) {
                  return id !== change.id;
                });
              }
            });
          }
        }
      }
      var cleanedUserIds = _toConsumableArray(new Set(value));
      lastFilterValue.current = cleanedUserIds;
      onChange(cleanedUserIds);
    }
  };
  var displayedUserIds = new Set();
  if (!isAdminUser && !managerTeams) {
    return null;
  }
  return isLoadingTeams ? /*#__PURE__*/jsx(Skeleton, {
    variant: "rect",
    height: 24,
    width: (_selectProps$width = selectProps === null || selectProps === void 0 ? void 0 : selectProps.width) !== null && _selectProps$width !== void 0 ? _selectProps$width : '100%'
  }) : /*#__PURE__*/jsx(MultiSelect, _objectSpread(_objectSpread({
    size: "small",
    variant: "filters",
    width: "100%",
    placeholder: t('userTeamsFilterPlaceholder'),
    value: value,
    onChange: function onChange(value) {
      return handleValueChange(value);
    },
    onSearch: function onSearch(value) {
      return setSearchValue(value);
    },
    onClose: (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) > 0 ? function () {
      return setSearchValue('');
    } : undefined,
    onBlur: (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) > 0 ? function () {
      return setSearchValue('');
    } : undefined,
    onFocus: (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) > 0 ? function () {
      return setSearchValue('');
    } : undefined,
    selectAllOption: true,
    allOptionLabel: t('allTeams'),
    autocomplete: true,
    sortByChecked: false,
    renderDisplayValue: function renderDisplayValue(value) {
      var _value$filter;
      if ((value === null || value === void 0 ? void 0 : value.length) === teamUsersAggregation) return t('allTeams');
      if ((value === null || value === void 0 ? void 0 : value.length) === 1 && value[0] === activeUserId) return t('me');
      var selectedUsers = value === null || value === void 0 ? void 0 : (_value$filter = value.filter(function (v) {
        return !(teamIds !== null && teamIds !== void 0 && teamIds.includes(v));
      })) === null || _value$filter === void 0 ? void 0 : _value$filter.length;
      if (selectedUsers > 0) return t('teamsSelected', {
        count: selectedUsers
      });
      return '';
    }
  }, selectProps), {}, {
    children: teamsToDisplay === null || teamsToDisplay === void 0 ? void 0 : teamsToDisplay.map(function (team) {
      var _team$teamUsers;
      var teamChecked = value === null || value === void 0 ? void 0 : value.includes(team === null || team === void 0 ? void 0 : team.id); //?.teamUsers?.every(u => value?.includes(u?.userId));
      return [/*#__PURE__*/jsx(CheckItem, {
        value: team === null || team === void 0 ? void 0 : team.id,
        label: team === null || team === void 0 ? void 0 : team.name,
        icon: team.icon,
        iconColor: teamChecked ? 'bloobirds' : 'softPeanut',
        className: clsx(styles.itemWrapper, _defineProperty({}, styles.itemChecked, teamChecked)),
        children: team === null || team === void 0 ? void 0 : team.name
      }, team === null || team === void 0 ? void 0 : team.id), team === null || team === void 0 ? void 0 : (_team$teamUsers = team.teamUsers) === null || _team$teamUsers === void 0 ? void 0 : _team$teamUsers.map(function (user) {
        if ((searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) > 0) {
          if (displayedUserIds.has(user.userId)) {
            return null;
          }
          displayedUserIds.add(user.userId);
        }
        return /*#__PURE__*/jsx(CheckItem, {
          value: user === null || user === void 0 ? void 0 : user.userId,
          label: user === null || user === void 0 ? void 0 : user.userName,
          section: team === null || team === void 0 ? void 0 : team.name,
          children: user.userName
        }, (team === null || team === void 0 ? void 0 : team.id) + '-' + (user === null || user === void 0 ? void 0 : user.userId));
      })];
    })
  }));
};

export { Filter, FilterGroup, filters as Filters, QuickFilters$1 as QuickFilters, RelativeDateFilter, TimezoneRangeFilter, UserFilterByTeams, useFilters };
//# sourceMappingURL=index.js.map
