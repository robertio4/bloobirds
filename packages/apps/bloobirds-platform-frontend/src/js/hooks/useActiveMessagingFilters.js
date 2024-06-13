import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const messagingStageFilter = atom({
  key: 'messagingStageFilter',
  default: 'PROSPECT',
});

const messagingVisibilityFilter = atom({
  key: 'messagingVisibilityFilter',
  default: null,
});

const messagingSegmentationValuesIds = atom({
  key: 'messagingSegmentationValuesIds',
  default: {},
});

const messagingNameFilter = atom({
  key: 'messagingNameFilterAtom',
  default: null,
});

const messagingMineFilter = atom({
  key: 'messagingMineFilterAtom',
  default: false,
});

const messagingBattlecardsFilter = atom({
  key: 'messagingBattlecardsFilterAtom',
  default: false,
});

const messagingOfficialFilter = atom({
  key: 'messagingOfficialFilterAtom',
  default: false,
});

const messagingShowCadenceTemplatesFilter = atom({
  key: 'messagingShowCadenceTemplatesFilter',
  default: null,
});

const messagingFilters = selector({
  key: 'messagingFilterAtom',
  get: ({ get }) => ({
    stage: get(messagingStageFilter),
    visibility: get(messagingVisibilityFilter),
    onlyMine: get(messagingMineFilter),
    onlyOfficials: get(messagingOfficialFilter),
    onlyBattlecards: get(messagingBattlecardsFilter),
    segmentationValues: get(messagingSegmentationValuesIds),
    name: get(messagingNameFilter),
    showCadencesTemplates: get(messagingShowCadenceTemplatesFilter),
  }),
});

export const useActiveMessagingStageFilter = () => useRecoilState(messagingStageFilter);

export const useActiveMessagingNameFilter = () => useRecoilState(messagingNameFilter);

export const useActiveMessagingVisibilityFilter = () => useRecoilState(messagingVisibilityFilter);

export const useActiveMessagingMineFilter = () => useRecoilState(messagingMineFilter);

export const useActiveMessagingBattleCardsFilter = () => useRecoilState(messagingBattlecardsFilter);

export const useActiveMessagingOfficialFilter = () => useRecoilState(messagingOfficialFilter);

export const useActiveMessagingCadenceFilter = () =>
  useRecoilState(messagingShowCadenceTemplatesFilter);

export const useActiveMessagingSegmentationValuesFilter = () => {
  const [segmentationValues, setAllSegmentationValues] = useRecoilState(
    messagingSegmentationValuesIds,
  );

  const setOneSegmentationValue = (filterId, value) => {
    if (!value) {
      const newValue = { ...segmentationValues };
      delete newValue[filterId];
      setAllSegmentationValues(newValue);
    } else {
      setAllSegmentationValues({
        ...segmentationValues,
        [filterId]: [value],
      });
    }
  };

  const resetActiveMessagingFilters = () => setAllSegmentationValues({});

  return {
    segmentationValues,
    setOneSegmentationValue,
    setAllSegmentationValues,
    resetActiveMessagingFilters,
  };
};

// TODO: Move to useState when refactor
const useActiveMessagingFilters = () => useRecoilValue(messagingFilters);

export default useActiveMessagingFilters;
