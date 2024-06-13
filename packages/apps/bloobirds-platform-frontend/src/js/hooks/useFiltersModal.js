import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';
import { formatDateAsText } from '@bloobirds-it/utils';
import { isPlainObject } from 'lodash';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../constants/activity';
import {
  DATES_FILTERS,
  FIELD_FILTERS,
  MULTIPICKLIST_FILTERS,
  NON_VALUE_FILTERS,
  NUMBER_FIELD_FILTERS,
  PICKLIST_FIELD_TYPES,
  RANGE_QUERY,
  RELATIVE_DATES_OPTIONS,
} from '../constants/filtersModal';
import { changeLogicRolesToIds } from '../utils/bobjects.utils';
import { getTextLabelFromPicklistValues } from '../utils/picklist.utils';
import { useEntity } from './entities/useEntity';
import { useBobjectFields } from './useBobjectFields';

const TYPE_VALUES = {
  equal: 'EXACT__SEARCH',
  between: 'RANGE__SEARCH__BETWEEN',
  notEqual: '',
  less: 'RANGE__SEARCH__LT',
  lessEqual: 'RANGE__SEARCH__LTE',
  greater: 'RANGE__SEARCH__GT',
  greaterEqual: 'RANGE__SEARCH__GTE',
};

const removeEmpty = obj => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

const getTextValue = (field, fieldTypes, values, picklistFieldValues) => {
  if (!field) {
    return values;
  }
  let textValue = values;
  const value = typeof values[0] === 'string' ? { value: values } : values[0];
  value.type = value?.type || value?.searchMode || null;
  value.value = value?.value || value?.query || value;

  if (Object.keys(FIELD_FILTERS).includes(value?.type)) {
    textValue = `${FIELD_FILTERS[value?.type]} ${value?.value}`;
    const isRelativeDateValue = RELATIVE_DATES_OPTIONS[value?.value] != null;
    if (isRelativeDateValue) {
      textValue = `${FIELD_FILTERS[value?.type]} ${RELATIVE_DATES_OPTIONS[value.value]}`;
    } else {
      textValue = `${FIELD_FILTERS[value?.type]} ${value?.value}`;
    }
  }

  if (
    Object.keys(MULTIPICKLIST_FILTERS).includes(value?.type) &&
    PICKLIST_FIELD_TYPES.includes(fieldTypes.get(field.fieldType).name)
  ) {
    textValue = `${MULTIPICKLIST_FILTERS[value?.type]} ${
      Array.isArray(value?.value)
        ? getTextLabelFromPicklistValues(value?.value, picklistFieldValues)
        : getTextLabelFromPicklistValues(value?.value, picklistFieldValues)
    }`;
  }

  if (value?.type === DATES_FILTERS) {
    if (value?.value?.type === 'custom') {
      if (value?.value?.start && value?.value?.end) {
        textValue = `From ${formatDateAsText({ text: value?.value?.start })} to ${formatDateAsText({
          text: value?.value?.end,
        })}`;
      } else if (value?.value?.start) {
        textValue = `From ${formatDateAsText({ text: value?.value?.start })}`;
      } else if (value?.value?.end) {
        textValue = `To ${formatDateAsText({ text: value?.value?.end })}`;
      }
    } else {
      textValue = RELATIVE_DATES_OPTIONS[value?.value?.type];
    }
  }

  if (value?.searchMode === RANGE_QUERY) {
    if (value?.type === 'custom') {
      if (value?.value?.gte && value?.value?.lte) {
        textValue = `From ${formatDateAsText({ text: value?.value?.gte })} to ${formatDateAsText({
          text: value?.value?.lte,
        })}`;
      } else if (value?.value?.gte) {
        textValue = `From ${formatDateAsText({ text: value?.value?.gte })}`;
      } else if (value?.value?.lte) {
        textValue = `To ${formatDateAsText({ text: value?.value?.lte })}`;
      }
    } else {
      textValue = RELATIVE_DATES_OPTIONS[value?.type];
    }
  }

  if (Object.keys(NUMBER_FIELD_FILTERS).includes(value?.type)) {
    if (value?.type === 'RANGE__SEARCH__BETWEEN') {
      if (Array.isArray(value)) {
        if (isPlainObject(value[0]?.value)) {
          textValue = `${NUMBER_FIELD_FILTERS[value[0]?.type]} ${value[0]?.value?.start} and ${
            value[0]?.value.end
          }`;
        } else {
          textValue = `${NUMBER_FIELD_FILTERS[value[0]?.type]} ${
            value[0]?.value?.split(',')[0]
          } and ${value[0]?.value?.split(',')[1]}`;
        }
      } else {
        textValue = `${NUMBER_FIELD_FILTERS[value?.type]} ${
          value.value.start || value.value.gte
        } and ${value.value.end || value.value.lte}`;
      }
    } else {
      textValue = `${NUMBER_FIELD_FILTERS[value[0]?.type] || NUMBER_FIELD_FILTERS[value?.type]} ${
        typeof value?.value === 'string'
          ? `${value.value}`
          : `${removeEmpty(value?.value)[Object.keys(removeEmpty(value?.value))[0]]}`
      }`;
    }
  }

  if (Object.keys(NON_VALUE_FILTERS).includes(value?.type)) {
    textValue = NON_VALUE_FILTERS[value?.type];
  }

  if (!value?.type) {
    textValue = getTextLabelFromPicklistValues(value?.value, picklistFieldValues);
  }

  return textValue;
};

const filtersModalOpenAtom = atom({
  key: 'filtersModalOpenAtom',
  default: false,
});

const filtersModalSettingsOpenAtom = atom({
  key: 'filtersModalSettingsOpenAtom',
  default: false,
});

const filtersModalBobjectTypesAtom = atom({
  key: 'filtersModalBobjectTypesAtom',
  default: [],
});

const filtersModalSelectedBobjectTypeAtom = atom({
  key: 'filtersModalSelectedBobjectTypeAtom',
  default: null,
});

const filtersAtom = atom({
  key: 'filtersModalFiltersAtom',
  default: null,
});

const fieldsAtom = atom({
  key: 'filtersModalFieldsAtom',
  default: null,
});

const bobjectPicklistFieldValuesAtom = atom({
  key: 'filtersModalBobjectPicklistFieldValuesAtom',
  default: null,
});

const picklistFieldValuesAtom = atom({
  key: 'filtersModalPicklistFieldValuesAtom',
  default: null,
});

const fieldTypesAtom = atom({
  key: 'filtersModalFieldTypesAtom',
  default: null,
});

const filtersSelector = selector({
  key: 'filtersModalFilters',
  get: ({ get }) => {
    const filters = get(filtersAtom);
    const fields = get(fieldsAtom);
    const bobjectPicklistFieldValues = get(bobjectPicklistFieldValuesAtom);
    const picklistFieldValues = get(picklistFieldValuesAtom);
    const fieldTypes = get(fieldTypesAtom);

    if (filters) {
      const filtersElements = changeLogicRolesToIds({
        query: filters,
        bobjectFields: fields,
        bobjectPicklistFieldValues,
      });

      const isTableViewItemField = field =>
        field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.TABLE_VIEW_ITEM;

      return (
        picklistFieldValues &&
        fieldTypes &&
        filtersElements &&
        Object.entries(filtersElements).map(([fieldId, values]) => {
          const field = fields?.get(fieldId);
          const parseValues = values.map(value => {
            if (isPlainObject(value)) {
              return { ...value, type: TYPE_VALUES[value.type] || value.type };
            }
            return value;
          });

          const textValue = getTextValue(field, fieldTypes, parseValues, picklistFieldValues);

          return field && !isTableViewItemField(field)
            ? {
                field,
                value: parseValues,
                textValue,
              }
            : null;
        })
      );
    }

    return {};
  },
});

export const useFiltersModalVisibility = () => {
  const [filtersModalOpen, setFiltersModalOpen] = useRecoilState(filtersModalOpenAtom);

  const openFiltersModal = () => {
    if (!filtersModalOpen) {
      setFiltersModalOpen(true);
    }
  };

  const closeFiltersModal = () => {
    if (filtersModalOpen) {
      setFiltersModalOpen(false);
    }
  };

  const toggleFiltersModal = () => {
    setFiltersModalOpen(!filtersModalOpen);
  };

  return {
    isOpen: filtersModalOpen,
    closeFiltersModal,
    openFiltersModal,
    toggleFiltersModal,
  };
};

export const useFiltersModalRealtionships = () => {
  const bobjectTypes = useRecoilValue(filtersModalBobjectTypesAtom);
  const fieldSectionsByBobjectType = Object.fromEntries(
    bobjectTypes.map(bobjectType => [bobjectType, useBobjectFields(bobjectType)?.sections || []]),
  );

  const relationships = bobjectTypes
    .flatMap(bobjectType => {
      const fieldSections = fieldSectionsByBobjectType[bobjectType];

      return fieldSections
        .flatMap(section => section.fields)
        .filter(field => field.type === 'Reference')
        .map(relationship => ({ fromBobjectType: bobjectType, relationship }));
    })
    ?.filter(relationField => {
      const relationLogicRole = relationField?.relationship?.logicRole;
      if (typeof relationLogicRole !== 'string') {
        return false;
      }
      return !relationLogicRole?.startsWith('OPPORTUNITY__LEAD');
    });

  return { relationships };
};

export const useFiltersModalFilters = () => {
  const [filters, setFilters] = useRecoilState(filtersAtom);
  const parsedFilters = useRecoilValue(filtersSelector);
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const picklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const fieldTypes = useEntity('fieldTypes');
  const setFields = useSetRecoilState(fieldsAtom);
  const setBobjectPicklistFieldValues = useSetRecoilState(bobjectPicklistFieldValuesAtom);
  const setPicklistFieldValues = useSetRecoilState(picklistFieldValuesAtom);
  const setFieldTypes = useSetRecoilState(fieldTypesAtom);

  useEffect(() => {
    setFields(bobjectFields);
  }, [bobjectFields]);

  useEffect(() => {
    setBobjectPicklistFieldValues(bobjectPicklistFieldValues);
  }, [bobjectPicklistFieldValues]);

  useEffect(() => {
    setPicklistFieldValues(picklistFieldValues);
  }, [picklistFieldValues]);

  useEffect(() => {
    setFieldTypes(fieldTypes);
  }, [fieldTypes]);

  const removeFilter = id => {
    const currentFilters = {};

    Object.keys(filters).forEach(filterId => {
      if (filterId !== id) {
        currentFilters[filterId] = filters[filterId];
      }
    });

    setFilters(currentFilters);
  };

  const changeFilter = (fieldToChange, valueToSet) => {
    const filtersToSet = { ...filters, [fieldToChange.name]: valueToSet };
    if (!valueToSet || valueToSet.length === 0) {
      delete filtersToSet[fieldToChange.name];
    }

    setFilters(filtersToSet);
  };

  return {
    filters,
    parsedFilters,
    changeFilter,
    setFilters,
    removeFilter,
  };
};

const showDisabledValuesReportsAtom = atom({
  key: 'showDisabledValuesReportsAtom',
  default: false,
});

const showDisabledValuesDashboardsAtom = atom({
  key: 'showDisabledValuesDashboardsAtom',
  default: false,
});

export const useFiltersSettings = () => {
  const { save, has, deleteHelper, mutate } = useUserHelpers();

  const [showDisabledValuesReports, setShowDisabledValuesReports] = useRecoilState(
    showDisabledValuesReportsAtom,
  );
  const [showDisabledValuesDashboards, setShowDisabledValuesDashboards] = useRecoilState(
    showDisabledValuesDashboardsAtom,
  );

  useEffect(() => {
    setShowDisabledValuesDashboards(has(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_DASHBOARDS));
    setShowDisabledValuesReports(has(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_REPORTS));
  }, [has]);

  return {
    showHiddenValuesReports: showDisabledValuesReports,
    showHiddenValuesDashboards: showDisabledValuesDashboards,
    save: (showReports, showDashboards) => {
      if (showReports) {
        save(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_REPORTS);
        setShowDisabledValuesReports(true);
      } else {
        deleteHelper(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_REPORTS).then(() => {
          mutate();
          setShowDisabledValuesReports(false);
        });
      }

      if (showDashboards) {
        save(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_DASHBOARDS);
        setShowDisabledValuesDashboards(true);
      } else {
        deleteHelper(UserHelperKeys.SHOW_DISABLED_VALUES_FILTERS_DASHBOARDS).then(() => {
          mutate();
          setShowDisabledValuesDashboards(false);
        });
      }
    },
  };
};

export const useFiltersModal = () => {
  const {
    isOpen,
    closeFiltersModal,
    openFiltersModal,
    toggleFiltersModal,
  } = useFiltersModalVisibility();
  const [bobjectTypes, setBobjectTypes] = useRecoilState(filtersModalBobjectTypesAtom);
  const [displaySettings, setDisplaySettings] = useRecoilState(filtersModalSettingsOpenAtom);
  const [selectedBobjectType, setSelectedBobjectType] = useRecoilState(
    filtersModalSelectedBobjectTypeAtom,
  );
  const resetFilters = useResetRecoilState(filtersAtom);
  const resetBobjectTypes = useResetRecoilState(filtersModalBobjectTypesAtom);

  const openAndSetFiltersModal = ({ bobjectTypesToSet }) => {
    if (bobjectTypesToSet) {
      setBobjectTypes(bobjectTypesToSet);
    }

    openFiltersModal();
  };

  const closeModal = () => {
    resetFilters();
    closeFiltersModal();
    setDisplaySettings(false);
  };

  useEffect(() => {
    if (!isOpen) resetFilters();
  }, [isOpen]);

  return {
    bobjectTypes,
    isOpen,
    selectedBobjectType,
    closeFiltersModal: closeModal,
    openFiltersModal: openAndSetFiltersModal,
    resetBobjectTypes,
    setBobjectTypes,
    setSelectedBobjectType,
    toggleFiltersModal,
    displaySettings,
    openSettings: () => setDisplaySettings(true),
    closeSettings: () => setDisplaySettings(false),
  };
};
