import { atom, selector, useRecoilState, useRecoilValue } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const messagingStageFilter = atom({
  key: "activeMessagingStageFilter",
  default: "PROSPECT"
});
const messagingVisibilityFilter = atom({
  key: "activeMessagingVisibilityFilter",
  default: null
});
const messagingSegmentationValuesIds = atom({
  key: "activeMessagingSegmentationValuesIds",
  default: {}
});
const messagingNameFilter = atom({
  key: "activeMessagingNameFilter",
  default: null
});
const messagingMineFilter = atom({
  key: "activeMessagingMineFilterAtom",
  default: false
});
const messagingBattlecardsFilter = atom({
  key: "activeMessagingBattlecardsFilterAtom",
  default: false
});
const messagingOfficialFilter = atom({
  key: "activeMessagingOfficialFilterAtom",
  default: false
});
const messagingShowCadenceTemplatesFilter = atom({
  key: "activeMessagingShowCadenceTemplatesFilter",
  default: null
});
const messagingFilters = selector({
  key: "activeMessagingFilterAtom",
  get: ({ get }) => ({
    stage: get(messagingStageFilter),
    visibility: get(messagingVisibilityFilter),
    onlyMine: get(messagingMineFilter),
    onlyOfficials: get(messagingOfficialFilter),
    onlyBattlecards: get(messagingBattlecardsFilter),
    segmentationValues: get(messagingSegmentationValuesIds),
    name: get(messagingNameFilter),
    showCadencesTemplates: get(messagingShowCadenceTemplatesFilter)
  })
});
export const useActiveMessagingStageFilter = () => useRecoilState(messagingStageFilter);
export const useActiveMessagingNameFilter = () => useRecoilState(messagingNameFilter);
export const useActiveMessagingVisibilityFilter = () => useRecoilState(messagingVisibilityFilter);
export const useActiveMessagingMineFilter = () => useRecoilState(messagingMineFilter);
export const useActiveMessagingBattleCardsFilter = () => useRecoilState(messagingBattlecardsFilter);
export const useActiveMessagingOfficialFilter = () => useRecoilState(messagingOfficialFilter);
export const useActiveMessagingCadenceFilter = () => useRecoilState(messagingShowCadenceTemplatesFilter);
export const useActiveMessagingSegmentationValuesFilter = () => {
  const [segmentationValues, setAllSegmentationValues] = useRecoilState(
    messagingSegmentationValuesIds
  );
  const setOneSegmentationValue = (filterId, value) => {
    if (!value) {
      const newValue = { ...segmentationValues };
      delete newValue[filterId];
      setAllSegmentationValues(newValue);
    } else {
      setAllSegmentationValues({
        ...segmentationValues,
        [filterId]: [value]
      });
    }
  };
  const resetActiveMessagingFilters = () => setAllSegmentationValues({});
  return {
    segmentationValues,
    setOneSegmentationValue,
    setAllSegmentationValues,
    resetActiveMessagingFilters
  };
};
export const useActiveMessagingFilters = () => useRecoilValue(messagingFilters);
