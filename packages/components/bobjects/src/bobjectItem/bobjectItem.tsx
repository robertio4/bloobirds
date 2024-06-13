import React, { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';

import { CommandBox, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useIsNoStatusPlanAccount } from "@bloobirds-it/hooks";
import {
  PluralBobjectTypes,
  SearchBobjectCompany,
  SearchBobjectType,
  TypeFilterType,
  StrDict,
  SearchActionType,
} from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from './bobjectItem.module.css';
import {
  SearchCardCenter,
  SearchCardLeft,
  SearchPreviewButton,
  SearchStatusLabel,
} from './components/bobjectCardComponents';
import { BobjectActions } from './utils/actionButtons';
import { getStage, getStatus } from './utils/searchBar.utils';

interface BobjectItemProps {
  bobject: SearchBobjectType;
  hits: StrDict;
  isSelected?: boolean;
  handleElementClicked: (
    bobject: SearchBobjectCompany,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  isWebapp?: boolean;
  actions?: {
    handleMainBobjectClick: (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      bobject: SearchBobjectType,
    ) => void;
    handleActionOnClick: (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      action: SearchActionType,
      bobject: SearchBobjectType,
    ) => void;
  };
}

/**
 * Base Bobject Item Card - For Displaying Results
 * WARNING: This component is missing actionButtons.tsx which is pending to be migrated
 * WARNING: This component is missing rightMenuContext which is pending to be migrated from frontend
 * @param bobject - GlobalSearchResponse
 * @param hits - hits in the search
 * @param isSelected - when selected with arrows
 * @param handleElementClicked - close the search bar at clicking any internal action or link
 * @constructor
 */
export function BobjectItem({
  bobject,
  hits,
  isSelected,
  handleElementClicked,
  isWebapp = false,
  actions,
}: BobjectItemProps) {
  const dataModel = useDataModel();

  const type = bobject?.bobjectType;
  const stage = getStage(bobject);
  const status = getStatus(type, stage, bobject, dataModel);

  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  const classNames = clsx(styles.bobjectItem, {
    [styles.bobjectItem_selected]: isSelected,
    [styles.bobjectItem_prospecting]: stage === 'prospecting',
    [styles.bobjectItem_sales]: stage === 'sales',
    [styles.bobjectItem_border]: isNoStatusPlanAccount,
    [styles.bobjectItem_webapp]: isWebapp,
  });

  const classNamesRight = clsx(styles.bobjectItemRight, {
    [styles.bobjectItemRightOTO]: !isWebapp,
  });

  return (
    <div className={classNames}>
      <SearchCardLeft bobject={bobject} hits={hits} handleCompanyClicked={handleElementClicked} />
      {isSelected && isWebapp && (
        <SearchPreviewButton
          isSelected={isSelected}
          bobject={bobject}
          handleClick={actions?.handleMainBobjectClick}
        />
      )}
      <SearchCardCenter bobject={bobject} isWebapp={isWebapp} />
      <div className={classNamesRight}>
        {!isSelected ? (
          isWebapp ? (
            <SearchStatusLabel status={status} />
          ) : null
        ) : (
          <BobjectActions
            bobject={bobject}
            closeModal={() => handleElementClicked(undefined, undefined)}
            handleActionOnClick={actions?.handleActionOnClick}
            isWebapp={isWebapp}
          />
        )}
      </div>
    </div>
  );
}

interface BobjectTypeMatchProps {
  bobjectType: TypeFilterType;
  applyFilter?: (bobjectType: TypeFilterType) => void;
  isSelected?: boolean;
}

/**
 * Bobject Type Match - Displays the Bobject Type that matches the search (Company, Lead, Opportunity) for organic search results
 * This is displayed as the first element on the list and sets the type filter when pressed.
 *
 * It is forward ref because we need to be able to control the search input from the outside (general component), and
 * it can only be done from a child component. This was, we allow calls to the deleteInput() function
 */
export const BobjectTypeMatch = forwardRef(
  ({ bobjectType, applyFilter, isSelected }: BobjectTypeMatchProps, ref) => {
    const store = CommandBox.useCommandBoxStore();
    const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectItem' });
    useImperativeHandle(ref, () => ({
      deleteInput() {
        store.setState('search', '');
      },
    }));

    function handleClick(bobjectType: TypeFilterType) {
      store.setState('search', '');
      applyFilter(bobjectType);
    }

    const classNames = clsx(styles.bobjectItem, styles.bobjectItemType, {
      [styles.bobjectItem_selected]: isSelected,
    });

    return (
      <div className={classNames} onClick={() => handleClick(bobjectType)}>
        <div className={styles.circleIcon}>
          <Icon name={'filter'} size={20} color="bloobirds" />
        </div>
        <div className={styles.bobjectItemContent}>
          <Text size="s" color="bloobirds">
            {bobjectType === 'All' ? t('all') : PluralBobjectTypes[bobjectType]}
          </Text>
        </div>
      </div>
    );
  },
);
