import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
const selectedItemsAtom = atom({
  key: "selectedItemsAtom",
  default: []
});
const checkSelectedAllAtom = atom({
  key: "checkSelectedAllAtom",
  default: false
});
const initialItemsAtom = atom({
  key: "initialSelectedItems",
  default: []
});
export const useSelectAll = () => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsAtom);
  const [checkSelectedAll, setCheckSelectedAll] = useRecoilState(checkSelectedAllAtom);
  const [initialItems, setInitialItems] = useRecoilState(initialItemsAtom);
  const resetSelectedItems = useResetRecoilState(selectedItemsAtom);
  const resetCheckSelectedAll = useResetRecoilState(checkSelectedAllAtom);
  const resetIntialItems = useResetRecoilState(initialItemsAtom);
  const selectOneItem = (item) => {
    const exists = selectedItems.some(
      (selectedItem) => selectedItem?.id.objectId === item?.id.objectId
    );
    let newSelectedItems = [...selectedItems];
    if (exists) {
      newSelectedItems = newSelectedItems.filter(
        (selectedItem) => selectedItem?.id.objectId !== item?.id.objectId
      );
    } else {
      newSelectedItems = [...newSelectedItems, item];
    }
    setSelectedItems(newSelectedItems);
  };
  return {
    selectedItems,
    selectAllItems: setSelectedItems,
    selectOneItem,
    isSelectedAll: checkSelectedAll,
    setIsSelectedAll: setCheckSelectedAll,
    resetSelectedItems,
    resetCheckSelectedAll,
    initialItems,
    setInitialItems,
    resetIntialItems
  };
};
