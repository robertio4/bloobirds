import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Bobject } from '@bloobirds-it/types';

import { PROSPECTING_SLUGS } from './subhomes.constants';

interface ContextValues<T extends Bobject> {
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

function SubhomePageProvider({
  children,
  parentRef,
}: {
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Bobject[]>([]);
  const [isSelectAllChecked, setSelectAllCheckedState] = useState<boolean>(false);
  const {
    slug,
    section,
  }: { slug: PROSPECTING_SLUGS; section: 'leads' | 'companies' } = useParams();
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
  // really dislike this
  useEffect(() => {
    setSelectedItems([]);
    setSelectAllCheckedState(false);
  }, [slug, section]);
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
