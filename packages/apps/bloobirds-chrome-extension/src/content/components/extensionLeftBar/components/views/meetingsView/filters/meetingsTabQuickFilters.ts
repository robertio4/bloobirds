import { usePicklist } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, QuickFilter, SearchType } from '@bloobirds-it/types';

export const meetingsTabQuickFilters = (dataModel): QuickFilter[] => {
  const mainTypeField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  );
  const { data: meetingTypes } = usePicklist(mainTypeField?.id);
  const types = meetingTypes?.filter(i => i.enabled).sort((a, b) => a.ordering - b.ordering);

  if (!types) {
    return [];
  }

  return types?.map(type => ({
    id: type.id,
    name: type.value,
    color: type?.color || 'peanut',
    filters: [
      {
        bobjectFieldId: mainTypeField?.id,
        values: [
          {
            bobjectPicklistValue: type.id,
            textValue: null,
            searchType: SearchType.EXACT,
          },
        ],
      },
    ],
  }));
};
