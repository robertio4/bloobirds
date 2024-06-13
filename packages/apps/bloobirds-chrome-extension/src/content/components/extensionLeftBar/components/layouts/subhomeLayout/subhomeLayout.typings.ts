import React, { Dispatch } from 'react';

import {
  Bobject,
  BobjectTypes,
  ExtensionBobject,
  PluralBobjectTypes,
  QuickFilter,
  SalesforceTabs,
  UseEveryBobjectType,
} from '@bloobirds-it/types';

import { Stages } from '../../views/view.utils';

export type ModalProps = {
  openedModal: string;
  bobject?: Bobject;
  data?: any;
  referencedBobject?: Bobject | ExtensionBobject;
};

export interface SubhomeContextProps {
  selectedTab: SalesforceTabs;
  setSelectedTab: (tab: SalesforceTabs) => void;
  selectedSubhomeTab: string;
  setSelectedSubhomeTab: (tab: PluralBobjectTypes) => void;
  showStats: boolean;
  toggleStats: () => void;
  selectedItems: Bobject[];
  setSelectedItems: (selectedItems: Bobject[]) => void;
  isSelectAllChecked: boolean;
  setSelectAllChecked: (state: boolean) => void;
  toggleSelectAll: (state: boolean) => void;
  selectOneItem: (item: Bobject) => void;
  useEveryBobject: UseEveryBobjectType;
  setUseEveryBobject: (state: UseEveryBobjectType) => void;
  sort: string;
  setSort: (sort: string) => void;
  query: { [x: string]: any };
  setQuery: (query: { [x: string]: any }) => void;
  subquery: { [x: string]: any };
  setSubquery: (query: { [x: string]: any }) => void;
  openedModalInfo: ModalProps;
  setOpenedModalInfo: Dispatch<React.SetStateAction<ModalProps>>;
  resetOpenedModalInfo: () => void;
  stage: Stages;
  setStage: (stage: Stages) => void;
  tabBobject: BobjectTypes;
  selectedQuickFilter: QuickFilter;
  setSelectedQuickFilter: Dispatch<React.SetStateAction<QuickFilter>>;
  haveFiltersBeenChanged: boolean;
  setHaveFiltersBeenChanged: Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: () => void;
  handleModalSave: () => void;
}
