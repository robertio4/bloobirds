import { useState } from 'react';

import { Bobject } from '@bloobirds-it/types';

export const useSelectBobjects = (totalItems = 50) => {
  const [selectedItems, setSelectedItems] = useState<Bobject[]>([]);
  const [isSelectAllChecked, setSelectAllCheckedState] = useState<boolean>(false);

  const selectOneItem = (item: Bobject) => {
    const exists = selectedItems.some(
      selectedItem => selectedItem?.id.objectId === item?.id.objectId,
    );
    let newSelectedItems = [...selectedItems];

    if (exists) {
      newSelectedItems = newSelectedItems.filter(
        selectedItem => selectedItem?.id.objectId !== item?.id.objectId,
      );
      if (isSelectAllChecked) setSelectAllCheckedState(false);
    } else {
      newSelectedItems = [...newSelectedItems, item];
      if (newSelectedItems?.length === totalItems) setSelectAllCheckedState(true);
    }
    setSelectedItems(newSelectedItems);
  };

  return {
    selectOneItem,
    selectedItems,
    setSelectedItems,
    isSelectAllChecked,
    setSelectAllCheckedState,
  };
};
