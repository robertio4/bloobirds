import React, { useState } from 'react';

import { IconButton, Label } from '@bloobirds-it/flamingo-ui';

import { useQueryStringState } from '../../hooks';
import { withWrappers } from '../../misc/utils';
import ViewEditionModal from '../bobjectTable/viewEditionModal';
import { ViewEditionContextProvider } from '../bobjectTable/viewEditionModal/viewEdition.context';

const FilterPanelSwitchButton = ({ query, bobjectType, delegateActionOnAccept }) => {
  const [showViewEditionModal, openViewEditionModal] = useState(false);
  const [stateQuery, setQuery] = useQueryStringState(
    'query',
    query,
    string => (string ? JSON.parse(decodeURI(string.replace(/&/g, '##AND##'))) : string),
    q => JSON.stringify(q),
  );

  const handleSetQuery = newQuery => {
    setQuery(newQuery);
    delegateActionOnAccept(newQuery);
  };

  return (
    <>
      <IconButton name="filter" onClick={() => openViewEditionModal(true)} color="softPeanut">
        <span style={{ marginRight: '5px' }}>Filters</span>
        <Label size="small" color="bloobirds">
          {Object.keys(stateQuery).length}
        </Label>
      </IconButton>
      {showViewEditionModal && (
        <ViewEditionContextProvider
          query={stateQuery}
          setQuery={handleSetQuery}
          bobjectType={bobjectType}
        >
          <ViewEditionModal
            modalType={'filter'}
            handleCloseModal={() => openViewEditionModal(false)}
          />
        </ViewEditionContextProvider>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  filtersDisplayed: state.components.filter.filtersDisplayed,
});

export default withWrappers({ mapStateToProps })(FilterPanelSwitchButton);
