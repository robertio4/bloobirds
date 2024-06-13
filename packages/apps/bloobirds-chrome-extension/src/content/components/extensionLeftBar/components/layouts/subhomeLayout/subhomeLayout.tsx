import React, { useEffect, useMemo, useState } from 'react';

import {
  Bobject,
  FIELDS_LOGIC_ROLE,
  PluralBobjectTypes,
  QuickFilter,
  SalesforceTabs,
  SingularFromPluralBobjectTypes,
  UseEveryBobjectType,
  MessagesEvents,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { tabBobjectType } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../../../../context';
import { Stages } from '../../views/view.utils';
import { ModalProps, SubhomeContextProps } from './subhomeLayout.typings';

const SubhomeContext = React.createContext<SubhomeContextProps>(null);

export const useSubhomeContext = () => {
  const context = React.useContext(SubhomeContext);
  if (!context) {
    throw new Error('useSubhome must be used within a Subhome');
  }

  return context;
};

interface SubhomeProps {
  defaultTab: SalesforceTabs;
  defaultSubhomeTab?: string;
  children: React.ReactNode;
}

const modalInfoDefaultState = {
  openedModal: undefined,
  bobject: undefined,
  referencedBobject: undefined,
};

const TaskTypeTabs = [SalesforceTabs.TASKS, SalesforceTabs.NURTURING, SalesforceTabs.OUTBOX];
const ActivityTypeTabs = [SalesforceTabs.INBOX, SalesforceTabs.MEETINGS];

const SubhomeLayout = ({
  children,
  defaultTab,
  defaultSubhomeTab = PluralBobjectTypes.Company,
}: SubhomeProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [selectedSubhomeTab, setSelectedSubhomeTab] = useState(defaultSubhomeTab);
  const [showStats, setShowStats] = useState(true);
  const [sort, setSort] = useState<string>();
  const [query, setQuery] = useState<{ [x: string]: any }>({});
  const [subquery, setSubquery] = useState<{ [x: string]: any }>();
  const [openedModalInfo, setOpenedModalInfo] = useState<ModalProps>(modalInfoDefaultState);
  const [stage, setStage] = useState<Stages>('ALL');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<QuickFilter>();
  const [haveFiltersBeenChanged, setHaveFiltersBeenChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Bobject[]>([]);
  const [isSelectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [useEveryBobject, setUseEveryBobject] = useState<UseEveryBobjectType>({
    isActive: false,
    total: 0,
    query,
  });
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const userId = settings?.user?.id;

  const defaultQuery = useMemo(() => {
    const bobjectType = SingularFromPluralBobjectTypes[selectedSubhomeTab];

    const assignedToField = dataModel.findFieldByLogicRole(
      FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO,
    );
    const activityAssignedToField = dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
    const taskAssignedToField = dataModel.findFieldByLogicRole(TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO);

    if (TaskTypeTabs.includes(selectedTab)) {
      return { [taskAssignedToField?.id]: [userId] };
    } else if (ActivityTypeTabs.includes(selectedTab)) {
      return { [activityAssignedToField?.id]: [userId] };
    } else {
      return {
        [assignedToField?.id]: [userId],
      };
    }
  }, [selectedSubhomeTab]);

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
    setUseEveryBobject({ isActive: false });
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
    setUseEveryBobject({ isActive: false });
  };

  const handleModalSave = () => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
        detail: { type: selectedItems[0]?.id?.typeName },
      }),
    );
    resetSelectedItems();
  };

  const handleModalClose = () => {
    setOpenedModalInfo(modalInfoDefaultState);
    resetSelectedItems();
  };

  useEffect(() => {
    setSelectedSubhomeTab(defaultSubhomeTab);
  }, [defaultSubhomeTab]);

  useEffect(() => {
    setSelectedItems([]);
    setUseEveryBobject({ isActive: false });
  }, [selectedSubhomeTab]);

  return (
    <SubhomeContext.Provider
      value={{
        openedModalInfo,
        setOpenedModalInfo,
        resetOpenedModalInfo: () => setOpenedModalInfo(modalInfoDefaultState),
        selectedTab,
        setSelectedTab,
        selectedSubhomeTab,
        setSelectedSubhomeTab,
        showStats,
        toggleStats: () => setShowStats(!showStats),
        selectedItems,
        setSelectedItems,
        isSelectAllChecked,
        setSelectAllChecked,
        toggleSelectAll: value => {
          setSelectAllChecked(value);
        },
        selectOneItem,
        useEveryBobject,
        setUseEveryBobject,
        sort,
        setSort,
        query,
        setQuery: (value: { [id: string]: any }) => {
          mixpanel.track(
            `CLICKED_FILTER_IN_TAB_${selectedTab?.toUpperCase()}` +
              (selectedTab === SalesforceTabs.PIPELINE
                ? `_AND_SUBTAB_${selectedSubhomeTab?.toUpperCase()}`
                : ''),
          );
          setQuery({ ...defaultQuery, ...value });
          setUseEveryBobject({ ...useEveryBobject, ...{ query: { ...defaultQuery, ...value } } });
        },
        subquery,
        setSubquery,
        stage,
        setStage,
        tabBobject: tabBobjectType(selectedSubhomeTab),
        selectedQuickFilter,
        setSelectedQuickFilter: qf => {
          setSelectedQuickFilter(qf);
          setHaveFiltersBeenChanged(true);
        },
        haveFiltersBeenChanged,
        setHaveFiltersBeenChanged,
        isLoading,
        setIsLoading,
        handleModalClose,
        handleModalSave,
      }}
    >
      <div style={{ width: '100%' }}>{children}</div>
    </SubhomeContext.Provider>
  );
};

export default SubhomeLayout;
