import { ALLOCATE_QC_TASK_FILTERS_CLEAN } from '../../actions/dictionary';

const initialState = {
  filtersDisplayed: false,
  query: undefined,
  sort: undefined,
  bobjectType: undefined,
  requestedBobjectType: undefined,
  requestedQuery: undefined,
  delegateActionOnAccept: undefined,
  ownFiltersCount: 0,
};

const mergeQuery = (stateQuery, requestedQuery, filters = []) => {
  const q = Object.assign({}, stateQuery);
  filters.forEach(f => {
    if (q[f.name] !== undefined) {
      delete q[f.name];
    }
    if (requestedQuery[f.name] !== undefined && requestedQuery[f.name] !== null) {
      q[f.name] = requestedQuery[f.name];
    }
  });
  return q;
};

const countOwnFilters = (query = {}, filters = []) =>
  filters.filter(f => query[f.name] !== undefined).length;

export default (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === ALLOCATE_QC_TASK_FILTERS_CLEAN) {
    newState.query = mergeQuery(newState.query, {}, newState.filters);
    newState.ownFiltersCount = countOwnFilters(newState.query, newState.filters);
  }
  return newState;
};
