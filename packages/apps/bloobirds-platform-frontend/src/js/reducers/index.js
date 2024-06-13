import taskWorkspace from './taskWorkSpace';
import { combineReducers } from 'redux';
import components from './components';

const internalReducers = combineReducers({
  taskWorkspace,
  components,
});

export default (state, action) => internalReducers(state, action);
