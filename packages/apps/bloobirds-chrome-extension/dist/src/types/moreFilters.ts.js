export var SearchMode = /* @__PURE__ */ ((SearchMode2) => {
  SearchMode2["RANGE"] = "RANGE__SEARCH";
  SearchMode2["EXACT"] = "EXACT__SEARCH";
  SearchMode2["NOT"] = "NOT__SEARCH";
  SearchMode2["AUTOCOMPLETE"] = "AUTOCOMPLETE__SEARCH";
  return SearchMode2;
})(SearchMode || {});
export var SearchType = /* @__PURE__ */ ((SearchType2) => {
  SearchType2["RANGE_BETWEEN_DATES"] = "RANGE__SEARCH__BETWEEN__DATES";
  SearchType2["RANGE_BETWEEN"] = "RANGE__SEARCH__BETWEEN";
  SearchType2["RANGE_GT"] = "RANGE__SEARCH__GT";
  SearchType2["RANGE_GTE"] = "RANGE__SEARCH__GTE";
  SearchType2["RANGE_LT"] = "RANGE__SEARCH__LT";
  SearchType2["RANGE_LTE"] = "RANGE__SEARCH__LTE";
  return SearchType2;
})(SearchType || {});
export var FilterType = /* @__PURE__ */ ((FilterType2) => {
  FilterType2["CUSTOM"] = "custom";
  FilterType2["RANGE_BETWEEN"] = "RANGE__SEARCH__BETWEEN";
  FilterType2["RANGE_GT"] = "RANGE__SEARCH__GT";
  FilterType2["RANGE_GTE"] = "RANGE__SEARCH__GTE";
  FilterType2["RANGE_LT"] = "RANGE__SEARCH__LT";
  FilterType2["RANGE_LTE"] = "RANGE__SEARCH__LTE";
  FilterType2["TODAY"] = "today";
  FilterType2["THIS_WEEK"] = "this_week";
  FilterType2["THIS_MONTH"] = "this_month";
  FilterType2["THIS_QUARTER"] = "this_quarter";
  FilterType2["THIS_YEAR"] = "this_year";
  FilterType2["ALL_TIME"] = "all_time";
  FilterType2["YESTERDAY"] = "yesterday";
  FilterType2["LAST_WEEK"] = "last_week";
  FilterType2["LAST_MONTH"] = "last_month";
  FilterType2["LAST_QUARTER"] = "last_quarter";
  FilterType2["LAST_YEAR"] = "last_year";
  return FilterType2;
})(FilterType || {});
export var MatchRows = /* @__PURE__ */ ((MatchRows2) => {
  MatchRows2["FULL"] = "__MATCH_FULL_ROWS__";
  MatchRows2["EMPTY"] = "__MATCH_EMPTY_ROWS__";
  return MatchRows2;
})(MatchRows || {});
