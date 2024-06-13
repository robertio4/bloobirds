import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { Bobject } from '@bloobirds-it/types';

const selectedItemsAtom = atom({
  key: 'selectedItemsAtom',
  default: [],
});

const checkSelectedAllAtom = atom({
  key: 'checkSelectedAllAtom',
  default: false,
});

const initialItemsAtom = atom({
  key: 'initialSelectedItems',
  default: [],
});

export const useSelectAll = () => {
  const [selectedItems, setSelectedItems] = useRecoilState<Bobject[]>(selectedItemsAtom);
  const [checkSelectedAll, setCheckSelectedAll] = useRecoilState(checkSelectedAllAtom);
  const [initialItems, setInitialItems] = useRecoilState(initialItemsAtom);
  const resetSelectedItems = useResetRecoilState(selectedItemsAtom);
  const resetCheckSelectedAll = useResetRecoilState(checkSelectedAllAtom);
  const resetIntialItems = useResetRecoilState(initialItemsAtom);

  const selectOneItem = (item: Bobject) => {
    const exists = selectedItems.some(
      selectedItem => selectedItem?.id.objectId === item?.id.objectId,
    );
    let newSelectedItems = [...selectedItems];

    if (exists) {
      newSelectedItems = newSelectedItems.filter(
        selectedItem => selectedItem?.id.objectId !== item?.id.objectId,
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
    resetIntialItems,
  };
};
