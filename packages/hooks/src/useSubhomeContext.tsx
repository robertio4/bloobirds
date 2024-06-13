import React, { Dispatch, SetStateAction, useState } from 'react';
import { Bobject } from '@bloobirds-it/types';

export interface ContextValues<T extends Bobject> {
  haveFiltersBeenChanged: boolean;
  setHaveFiltersBeenChanged: Dispatch<SetStateAction<boolean>>;
  selectOneItem: (item: T) => void;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  isSelectAllChecked: boolean;
  toggleSelectAll: Dispatch<SetStateAction<boolean>>;
  parentRef: React.RefObject<HTMLDivElement>;
}

const SubhomeContext = React.createContext<ContextValues<any>>(null);

function SubhomePageProvider<T extends Bobject>({
  children,
  parentRef,
}: {
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState<boolean>(false);
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
    } else {
      newSelectedItems = [...newSelectedItems, item];
    }
    setSelectedItems(newSelectedItems);
  };

  return (
    <SubhomeContext.Provider
      value={{
        haveFiltersBeenChanged,
        setHaveFiltersBeenChanged,
        selectOneItem,
        selectedItems,
        setSelectedItems,
        isSelectAllChecked,
        toggleSelectAll: value => {
          setSelectAllCheckedState(value);
        },
        parentRef,
      }}
    >
      {children}
    </SubhomeContext.Provider>
  );
}
function useSubhomeContext<T extends Bobject>() {
  const context = React.useContext<ContextValues<T>>(
    SubhomeContext as React.Context<ContextValues<T>>,
  );
  if (context === undefined) {
    throw new Error('useSubhomeContext must be used within a SubhomeContextProvider');
  }
  return context;
}
export { SubhomePageProvider, useSubhomeContext };
