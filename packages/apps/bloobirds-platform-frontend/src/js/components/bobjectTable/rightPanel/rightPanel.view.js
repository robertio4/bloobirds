import React, { useState } from 'react';

import { IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';

import { useMediaQuery } from '../../../hooks';
import { ListParamsTooltip } from '../../discoveryTooltips/listParamsTooltip';
import WithTooltip from '../../withTooltip/withTooltip';
import { useBobjectTable } from '../useBobjectTable';
import ViewEditionModal from '../viewEditionModal';
import { ViewEditionContextProvider } from '../viewEditionModal/viewEdition.context';
import AddButton from './addButton';
import ImportButton from './importButton';
import styles from './rightPanel.module.css';
import SearchFilter from './searchFilter';

const BOBJECT_WITH_IMPORT = ['Lead', 'Company', 'Activity', 'Opportunity'];
const BOBJECT_WITH_SEARCH = ['Lead', 'Company', 'Opportunity'];
const BOBJECT_WITH_ADD = ['Lead', 'Company'];

const RightPanelView = ({ bobjectType, showRightPanelActions = true }) => {
  const [showViewEditionModal, openViewEditionModal] = useState(false);
  const [modalType, setModalType] = useState();
  const { isDesktop } = useMediaQuery();
  const bobjectTypeName = bobjectType?.name;
  const { query, setQuery, columns, setColumns } = useBobjectTable();
  const isOTOAccount = useIsOTOAccount();

  return (
    <React.Fragment>
      <div className={styles._container}>
        <WithTooltip isDisabled={!isDesktop} title={'Columns'}>
          <IconButton
            name="columns"
            color="softPeanut"
            dataTest="columnButton"
            onClick={() => {
              openViewEditionModal(true);
              setModalType('column');
            }}
            size={16}
          >
            {isDesktop && (
              <Text size="s" color="peanut">
                Columns
              </Text>
            )}
          </IconButton>
        </WithTooltip>
        <div className={styles._import_button_container}>
          <WithTooltip isDisabled={!isDesktop} title={'Filters'}>
            <IconButton
              name="filter"
              color="softPeanut"
              dataTest="filterButton"
              onClick={() => {
                setModalType('filter');
                openViewEditionModal(true);
              }}
              size={16}
            >
              {isDesktop && (
                <Text size="s" color="peanut">
                  Filters
                </Text>
              )}
            </IconButton>
          </WithTooltip>
        </div>
        <ListParamsTooltip defaultTooltipVisible />
        {BOBJECT_WITH_SEARCH.includes(bobjectTypeName) && (
          <SearchFilter bobjectType={bobjectType} />
        )}
        {showRightPanelActions && BOBJECT_WITH_IMPORT.includes(bobjectTypeName) && <ImportButton />}
        {showRightPanelActions && BOBJECT_WITH_ADD.includes(bobjectTypeName) && !isOTOAccount && (
          <AddButton bobjectType={bobjectType} />
        )}
      </div>

      {showViewEditionModal && (
        <ViewEditionContextProvider
          query={query}
          setQuery={setQuery}
          columns={columns}
          setColumns={setColumns}
          bobjectType={bobjectTypeName}
        >
          <ViewEditionModal
            modalType={modalType}
            handleCloseModal={() => openViewEditionModal(false)}
          />
        </ViewEditionContextProvider>
      )}
    </React.Fragment>
  );
};

export default RightPanelView;
