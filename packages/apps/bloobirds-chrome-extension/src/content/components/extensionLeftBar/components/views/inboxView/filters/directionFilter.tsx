import { useEffect } from 'react';

import { Filter, useFilters } from '@bloobirds-it/filters';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  BobjectTypes,
  DIRECTION_VALUES_LOGIC_ROLE,
} from '@bloobirds-it/types';

export const DirectionFilter = ({ dataModel, selectedQuickFilter, values }) => {
  const { setFilter } = useFilters();
  const shouldBeDisplayed = selectedQuickFilter?.id !== ACTIVITY_TYPES.LINKEDIN;

  const directionField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const incomingField = directionField.values.find(
    a => a.logicRole === DIRECTION_VALUES_LOGIC_ROLE.INCOMING,
  );

  useEffect(() => {
    if (selectedQuickFilter) {
      setFilter(
        BobjectTypes.Activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
        selectedQuickFilter.defaultFilterDirection,
        false,
      );
    } else {
      setFilter(
        BobjectTypes.Activity,
        ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION,
        [incomingField.id],
        false,
      );
    }
  }, [selectedQuickFilter]);

  if (!shouldBeDisplayed) {
    return null;
  }

  return <Filter placeholder="Direction" fieldLR={ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION} values={values} isMultiselect />;
};

export default DirectionFilter;
