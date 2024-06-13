import { combineReducers } from 'redux';
import entityTabs from './entityTabs';
import filter from './filter';
import importHistory from './import';

export default combineReducers({
  entityTabs,
  importHistory,
  filter,
});
