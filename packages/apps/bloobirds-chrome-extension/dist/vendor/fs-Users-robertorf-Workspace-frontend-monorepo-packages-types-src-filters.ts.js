export var FilterType = /* @__PURE__ */ ((FilterType2) => {
  FilterType2["RANGE_BETWEEN"] = "RANGE__SEARCH__BETWEEN";
  FilterType2["EXACT"] = "EXACT__SEARCH";
  FilterType2["RANGE_GT"] = "RANGE__SEARCH__GT";
  FilterType2["RANGE_GTE"] = "RANGE__SEARCH__GTE";
  FilterType2["RANGE_LT"] = "RANGE__SEARCH__LT";
  FilterType2["RANGE_LTE"] = "RANGE__SEARCH__LTE";
  FilterType2["NOT_EMPTY"] = "IS__NOT__EMPTY";
  FilterType2["EMPTY"] = "IS__EMPTY";
  return FilterType2;
})(FilterType || {});
export var SearchType = /* @__PURE__ */ ((SearchType2) => {
  SearchType2["AUTOCOMPLETE"] = "AUTOCOMPLETE__SEARCH";
  SearchType2["EXACT"] = "EXACT__SEARCH";
  SearchType2["NOT"] = "NOT__SEARCH";
  SearchType2["RANGE_BETWEEN"] = "RANGE__SEARCH__BETWEEN";
  SearchType2["RANGE_BETWEEN_DATES"] = "RANGE__SEARCH__BETWEEN__DATES";
  SearchType2["RANGE_GT"] = "RANGE__SEARCH__GT";
  SearchType2["RANGE_GTE"] = "RANGE__SEARCH__GTE";
  SearchType2["RANGE_LT"] = "RANGE__SEARCH__LT";
  SearchType2["RANGE_LTE"] = "RANGE__SEARCH__LTE";
  SearchType2["CUSTOM"] = "custom";
  SearchType2["TODAY"] = "today";
  SearchType2["THIS_WEEK"] = "this_week";
  SearchType2["THIS_MONTH"] = "this_month";
  SearchType2["THIS_QUARTER"] = "this_quarter";
  SearchType2["THIS_YEAR"] = "this_year";
  SearchType2["ALL_TIME"] = "all_time";
  SearchType2["YESTERDAY"] = "yesterday";
  SearchType2["LAST_WEEK"] = "last_week";
  SearchType2["LAST_MONTH"] = "last_month";
  SearchType2["LAST_QUARTER"] = "last_quarter";
  SearchType2["LAST_YEAR"] = "last_year";
  return SearchType2;
})(SearchType || {});
export var RelativesDate = /* @__PURE__ */ ((RelativesDate2) => {
  RelativesDate2["ALL_TIME"] = "all_time";
  RelativesDate2["LAST_MONTH"] = "last_month";
  RelativesDate2["LAST_QUARTER"] = "last_quarter";
  RelativesDate2["LAST_WEEK"] = "last_week";
  RelativesDate2["LAST_YEAR"] = "last_year";
  RelativesDate2["NEXT_30_DAYS"] = "next_30_days";
  RelativesDate2["NEXT_7_DAYS"] = "next_7_days";
  RelativesDate2["SINCE_TODAY"] = "since_today";
  RelativesDate2["MORE_THAN_6_MONTHS"] = "more_than_6_month";
  RelativesDate2["NEXT_6_MONTHS"] = "next_6_months";
  RelativesDate2["THIS_MONTH"] = "this_month";
  RelativesDate2["THIS_QUARTER"] = "this_quarter";
  RelativesDate2["THIS_WEEK"] = "this_week";
  RelativesDate2["THIS_YEAR"] = "this_year";
  RelativesDate2["TODAY"] = "today";
  RelativesDate2["YESTERDAY"] = "yesterday";
  RelativesDate2["UNTIL_NOW"] = "until_now";
  return RelativesDate2;
})(RelativesDate || {});
export var SearchMode = /* @__PURE__ */ ((SearchMode2) => {
  SearchMode2["AUTOCOMPLETE"] = "AUTOCOMPLETE__SEARCH";
  SearchMode2["EXACT"] = "EXACT__SEARCH";
  SearchMode2["NOT"] = "NOT__SEARCH";
  SearchMode2["RANGE"] = "RANGE__SEARCH";
  SearchMode2["SUBQUERY"] = "SUBQUERY__SEARCH";
  return SearchMode2;
})(SearchMode || {});
export var MatchRows = /* @__PURE__ */ ((MatchRows2) => {
  MatchRows2["FULL"] = "__MATCH_FULL_ROWS__";
  MatchRows2["EMPTY"] = "__MATCH_EMPTY_ROWS__";
  return MatchRows2;
})(MatchRows || {});
export var SearchTypeByKey = /* @__PURE__ */ ((SearchTypeByKey2) => {
  SearchTypeByKey2["gt"] = "RANGE__SEARCH__GT" /* RANGE_GT */;
  SearchTypeByKey2["gte"] = "RANGE__SEARCH__GTE" /* RANGE_GTE */;
  SearchTypeByKey2["lt"] = "RANGE__SEARCH__LT" /* RANGE_LT */;
  SearchTypeByKey2["lte"] = "RANGE__SEARCH__LTE" /* RANGE_LTE */;
  return SearchTypeByKey2;
})(SearchTypeByKey || {});
export var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2["ASC"] = "ASC";
  Direction2["DESC"] = "DESC";
  return Direction2;
})(Direction || {});
export var ScheduleShortTimes = /* @__PURE__ */ ((ScheduleShortTimes2) => {
  ScheduleShortTimes2["tenMinutes"] = "in_10_minutes";
  ScheduleShortTimes2["thirtyMinutes"] = "in_30_minutes";
  ScheduleShortTimes2["oneHour"] = "in_1_hour";
  ScheduleShortTimes2["twoHours"] = "in_2_hours";
  ScheduleShortTimes2["fourHours"] = "in_4_hours";
  ScheduleShortTimes2["oneDay"] = "in_1_day";
  ScheduleShortTimes2["twoDays"] = "in_2_days";
  ScheduleShortTimes2["custom"] = "custom";
  return ScheduleShortTimes2;
})(ScheduleShortTimes || {});
export var Unit = /* @__PURE__ */ ((Unit2) => {
  Unit2["minutes"] = "minutes";
  Unit2["hours"] = "hours";
  Unit2["days"] = "days";
  return Unit2;
})(Unit || {});
export const ScheduleShortTimesValues = {
  in_10_minutes: { unit: "minutes", amount: 10 },
  in_30_minutes: { unit: "minutes", amount: 30 },
  in_1_hour: { unit: "hours", amount: 1 },
  in_2_hours: { unit: "hours", amount: 2 },
  in_4_hours: { unit: "hours", amount: 4 },
  in_1_day: { unit: "days", amount: 1 },
  in_2_days: { unit: "days", amount: 2 }
};
