import { flatMapByKey } from '../../utils';
import { ELEMENT_MISSING_VARIABLE } from '../defaults';

export const hasMissingVariables = root => {
  const nodes = flatMapByKey(root, 'children');
  return nodes.some(node => node?.type === ELEMENT_MISSING_VARIABLE);
};
