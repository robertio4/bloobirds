import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { BobjectItem, BobjectTypeMatch } from '@bloobirds-it/bobjects';
import { CommandBox, Item, Select, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useActiveAccountSettings,
  useConfetti,
  useGeneralSearchVisibility,
  useUserHelpers,
  useIsB2CAccount,
} from '@bloobirds-it/hooks';
import {
  BobjectType,
  BobjectTypes,
  bobjectUrl,
  ExtensionHelperKeys,
  GlobalSearchResponse,
  MIXPANEL_EVENTS,
  SearchActionType,
  SearchBarActionsType,
  SearchBobjectCompany,
  SearchBobjectType,
  SearchContextType,
  typeFilterConstants,
  TypeFilterType,
} from '@bloobirds-it/types';
import { api, keepPreviousResponse, toSentenceCase, isWhatsAppPage } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import EmptyList from './displays/emptyList';
import styles from './generalSearchBar.module.css';
import { searchBobjectTypeName } from './utils/searchBar.utils';

function getBobjectTypes(bobjectType: TypeFilterType, isB2CAccount: boolean): BobjectType[] {
  if (bobjectType === 'All') {
    return [
      ...(isB2CAccount ? [] : [BobjectTypes.Company]),
      BobjectTypes.Lead,
      BobjectTypes.Opportunity,
    ];
  } else return [bobjectType];
}

const SearchContext = React.createContext<SearchContextType>(undefined);

export const useGeneralSearch = () => useContext(SearchContext);

const PAGE_SIZE = 10;

export function GeneralSearchBar({
  actions,
  isWebapp = false,
}: {
  actions: SearchBarActionsType;
  isWebapp?: boolean;
}) {
  const anchorRef = useRef();
  const {
    isOpen,
    setIsOpen,
    toggleVisibility,
    closeGeneralSearchBar,
  } = useGeneralSearchVisibility();
  const [bobjectTypeFilter, setBobjectTypeFilter] = React.useState<TypeFilterType>('All');
  const [bobjectTypeMatch, setBobjectTypeMatch] = React.useState<TypeFilterType | false>(false);
  const [lastVisited, setLastVisited] = React.useState<SearchBobjectType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const { isLoading } = useActiveAccountSettings();
  const accountId = useActiveAccountId();
  const isB2CAccount = useIsB2CAccount();
  const { t } = useTranslation('translation', { keyPrefix: 'generalSearchBar' });
  const { t: bobjectTypeT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });
  const { ref, visible, setVisible } = useVisible(isOpen, anchorRef);
  const childRef = useRef();
  const showBobjectTypeMatch = !!bobjectTypeMatch && bobjectTypeMatch !== bobjectTypeFilter;
  const { has, save } = useUserHelpers();
  const { throwConfetti } = useConfetti();
  const inputRef = useRef(null);

  const { data: response, mutate, isValidating } = useSWR(
    searchQuery !== '' ? ['generalSearchBar', searchQuery] : null,
    () => {
      return api.post(`/bobjects/${accountId}/global-search`, {
        query: searchQuery,
        bobjectTypes: getBobjectTypes(bobjectTypeFilter, isB2CAccount),
        numberOfResults: page * PAGE_SIZE,
      });
    },
    { use: [keepPreviousResponse] },
  );
  const results: GlobalSearchResponse[] = response?.data?.results;
  const showShowMore = results?.length > page * PAGE_SIZE;

  async function loadNextPage() {
    const shouldMutate = page === 1 || results?.length > page * PAGE_SIZE + 1;
    await setPage(page => page + 1);
    if (shouldMutate) {
      mutate();
    }
  }

  React.useEffect(() => {
    const whatsAppExtendedSearchWrapper = document.getElementsByClassName('app-wrapper-web')[0];
    const whatsAppExtendedSearch = whatsAppExtendedSearchWrapper?.querySelector(
      'div > span:not(:empty)',
    ) as HTMLSpanElement;

    if (inputRef?.current && isWhatsAppPage()) {
      if (whatsAppExtendedSearch) {
        whatsAppExtendedSearch.style.display = 'none';
      }

      setTimeout(() => {
        inputRef.current.querySelector('input').focus();
        inputRef.current.querySelector('input').select();
      }, 1000);
    }
  }, [inputRef.current]);

  // Toggle the menu when ctrl/⌘K is pressed and close it when esc
  React.useEffect(() => {
    const down = (e: any) => {
      if (
        !isLoading &&
        ((e?.key === 'k' && e?.metaKey) ||
          (navigator.appVersion.indexOf('Mac') == -1 && e?.key === 'k' && e?.ctrlKey))
      ) {
        e.stopPropagation();
        e.preventDefault();
        if (!isOpen) {
          setSearchQuery('');
          setPage(1);
        }
        toggleVisibility();
        mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_OPENED);
      } else if (e?.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        setSearchQuery('');
        setPage(1);
        closeGeneralSearchBar();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isLoading]);

  // Coordinate open/close from the hook controlling click outside and internal control of key down
  React.useEffect(() => {
    if (!visible) {
      setSearchQuery('');
    }
    setIsOpen(visible);
  }, [visible]);

  React.useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (!has(ExtensionHelperKeys.OPENED_GENERAL_SEARCH_BAR) && !isWebapp && visible) {
      throwConfetti({ bloobirdsShape: true });
      save(ExtensionHelperKeys.OPENED_GENERAL_SEARCH_BAR);
    }
  }, [visible]);

  // Update the search history when the search query changes
  React.useEffect(() => {
    addSearchToHistory(searchQuery);
  }, [searchQuery]);

  function addSearchToHistory(search: string) {
    if (search) {
      setSearchHistory(searchHistory => {
        // add to the beginning of the array
        if (!searchHistory.includes(search)) {
          searchHistory.unshift(search);
        } else {
          searchHistory.splice(searchHistory.indexOf(search), 1);
          searchHistory.unshift(search);
        }
        // History of max 10 searches
        if (searchHistory.length > 10) {
          searchHistory.pop();
        }
        return searchHistory;
      });
    }
  }

  // Update the last visited when a result item is clicked, avoiding repeated results
  function addVisitedToHistory(visited: SearchBobjectType) {
    if (visited) {
      setLastVisited(visitedHistory => {
        // add to the beginning of the array
        visitedHistory = visitedHistory.filter(v => v.rawBobject.id !== visited.rawBobject.id);
        visitedHistory.unshift(visited);
        // History of max 10 visited
        if (visitedHistory.length > 10) {
          visitedHistory.pop();
        }
        return visitedHistory;
      });
    }
  }

  const parsedActions = {
    handleMainBobjectClick: (
      event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
      bobject: SearchBobjectType,
    ) => {
      addVisitedToHistory(bobject);
      actions.handleMainBobjectClick(event, bobject);
    },
    handleActionOnClick: (
      event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
      action: SearchActionType,
      bobject: SearchBobjectType,
    ) => {
      addVisitedToHistory(bobject);
      actions.handleActionOnClick(event, action, bobject);
    },
  };

  /*** if bobject is undefined, only closes modal ***/
  function handleElementClicked(
    bobject: SearchBobjectCompany,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (bobject) {
      parsedActions.handleMainBobjectClick(event, bobject);
      mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_RESULT_CLICKED);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_QUICK_ACTION_CLICKED);
    }
    setSearchQuery('');
    setPage(1);
    setBobjectTypeMatch(false);
    closeGeneralSearchBar();
  }

  function handleClickedItem(bobject: SearchBobjectType, event: MouseEvent) {
    parsedActions.handleMainBobjectClick(event, bobject);
    setSearchQuery('');
    setPage(1);
    setBobjectTypeMatch(false);
    closeGeneralSearchBar();
    mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_RESULT_CLICKED);
  }

  async function handleBobjectTypeMatchClick(bobjectType: TypeFilterType) {
    await setBobjectTypeFilter(bobjectType);
    setBobjectTypeMatch(false);
    mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_CHANGED_TYPE_FILTER);
    mutate();
  }

  function handleSearch(query: string) {
    const typeMatch = searchBobjectTypeName(query);
    setBobjectTypeMatch(typeMatch);
    setPage(1);
    mixpanel.track(MIXPANEL_EVENTS.GLOBAL_SEARCH_BAR_SEARCHED);
    setSearchQuery(query);
  }

  const boxClassNames = clsx(styles.box, {
    [styles.boxNoMoreResults]: !showShowMore,
    [styles.boxWithMoreResults]: showShowMore,
  });

  return isOpen ? (
    <div>
      {/* @ts-ignore */}
      <CommandBox onSearch={handleSearch} className={boxClassNames} ref={ref}>
        <CommandBox.SearchBox>
          <Select
            value={bobjectTypeFilter}
            className={styles.bobjectTypeSelect}
            width="140px"
            onChange={async (value: TypeFilterType) => {
              await setPage(1);
              await setBobjectTypeFilter(value);
              mutate();
            }}
            /*@ts-ignore*/
            dropdownProps={{ ref: anchorRef }}
          >
            {typeFilterConstants
              ?.filter(type => (isB2CAccount ? type !== BobjectTypes.Company : true))
              ?.map(type => (
                <Item key={type} value={type}>
                  {toSentenceCase(bobjectTypeT(type.toLowerCase()))}
                </Item>
              ))}
          </Select>
          <div ref={inputRef} style={{ width: '100%' }}>
            <CommandBox.Input value={searchQuery} className={styles.searchInput} />
          </div>
        </CommandBox.SearchBox>
        {isValidating && <CommandBox.ProgressBar />}
        <SearchContext.Provider
          value={{
            searchQuery,
            lastVisited,
            searchHistory,
            actions: parsedActions,
            isWebapp,
          }}
        >
          <CommandBox.List className={styles.searchResultsList}>
            <div className={styles.searchResults}>
              {showBobjectTypeMatch && (
                <CommandBox.Item
                  action={() => {
                    // @ts-ignore
                    childRef.current?.deleteInput();
                    handleBobjectTypeMatchClick(bobjectTypeMatch);
                  }}
                  key={'typeMatch'}
                >
                  <BobjectTypeMatch
                    bobjectType={bobjectTypeMatch}
                    applyFilter={handleBobjectTypeMatchClick}
                    ref={childRef}
                  />
                </CommandBox.Item>
              )}
              {searchQuery &&
                results &&
                results
                  .slice(
                    0,
                    showBobjectTypeMatch && page === 1 ? page * PAGE_SIZE - 1 : page * PAGE_SIZE,
                  )
                  .map(item => {
                    const url = bobjectUrl({
                      id: {
                        typeName: item.rawBobject.id.split('/')[1] as BobjectTypes,
                        objectId: item.rawBobject.id.split('/')[2],
                      },
                    });
                    return (
                      <CommandBox.Item
                        // @ts-ignore
                        action={e => handleClickedItem({ ...item, url }, e)}
                        key={item.rawBobject?.id}
                      >
                        <BobjectItem
                          bobject={{ ...item, url }}
                          hits={item.highlights}
                          handleElementClicked={handleElementClicked}
                          isWebapp={isWebapp}
                          actions={parsedActions}
                        />
                      </CommandBox.Item>
                    );
                  })}
            </div>
            {searchQuery && showShowMore && (
              <div className={styles.bobjectItem_show_more} onClick={loadNextPage}>
                <Text size="xs" color="bloobirds">
                  {t('showMore')}
                </Text>
              </div>
            )}
          </CommandBox.List>
          <CommandBox.Empty>
            <EmptyList
              bobjectType={bobjectTypeFilter !== 'All' ? bobjectTypeFilter : undefined}
              handleBobjectCompressedClick={handleClickedItem}
              handleCompanyClicked={handleElementClicked}
            />
          </CommandBox.Empty>
        </SearchContext.Provider>
      </CommandBox>
    </div>
  ) : null;
}
