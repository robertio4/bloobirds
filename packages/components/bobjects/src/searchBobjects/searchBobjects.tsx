import { useEffect, useState } from 'react';

import { Dropdown, useVisible } from '@bloobirds-it/flamingo-ui';
import { useSearchBobjects, useIsB2CAccount } from '@bloobirds-it/hooks';
import { BobjectTypes, GlobalSearchResponse, SearchBobjectType } from '@bloobirds-it/types';

import { BobjectItemCompressed } from '../bobjectItemCompressed/bobjectItemCompressed';
import { NoResultsFound } from '../bobjectSelector/components/noResultsFound/noResultsFound';
import { NoSearchYetMessage } from '../bobjectSelector/components/noSearchYetMessage/noSearchYetMessage';
import styles from './searchBobjects.module.css';

export const SearchBobjects = ({
  accountId,
  onChange,
  anchorElement,
  children,
  hiddenDropdown = false,
  customStyles,
  isBubbleHomePage = false,
  search,
  forceOpen = false,
  setForceOpen,
  numberOfResults = 1000,
}: {
  accountId: string;
  onChange: (bobject: SearchBobjectType) => void;
  anchorElement: (setSearchValue: (value: string) => void, searchValue: string) => JSX.Element;
  children?: (results: GlobalSearchResponse[], totalMatching: number) => JSX.Element;
  hiddenDropdown?: boolean;
  customStyles?: React.CSSProperties;
  isBubbleHomePage?: boolean;
  search?: string;
  forceOpen?: boolean;
  setForceOpen?: (value: boolean) => void;
  numberOfResults?: number;
}) => {
  const [searchValue, setSearchValue] = useState<string>();
  const { visible, setVisible, ref } = useVisible();
  const isB2CAccount = useIsB2CAccount();

  useEffect(() => {
    if (search) {
      setSearchValue(search);
    }
  }, [search]);

  useEffect(() => {
    if (forceOpen) setVisible(true);
  }, [forceOpen]);

  useEffect(() => {
    if (!visible) setForceOpen?.(false);
  }, [visible]);

  const handleChange = (bobject: SearchBobjectType) => {
    onChange(bobject);
    setVisible(false);
  };

  const { results, totalMatching } = useSearchBobjects({
    searchValue,
    accountId,
    callback: () => setVisible(true),
    numberOfResults,
    bobjectTypes: isB2CAccount
      ? [BobjectTypes.Lead, BobjectTypes.Opportunity]
      : [BobjectTypes.Company, BobjectTypes.Lead, BobjectTypes.Opportunity],
  });

  return (
    <Dropdown
      width="100%"
      arrow={false}
      ref={ref}
      visible={visible && !hiddenDropdown}
      zIndex={20000}
      anchor={anchorElement(setSearchValue, searchValue)}
      customStyles={customStyles}
    >
      {children ? (
        children(results, totalMatching)
      ) : (
        <div className={styles.content}>
          <div className={styles.results}>
            {results ? (
              results?.length > 0 ? (
                <>
                  {results?.map(result => (
                    <BobjectItemCompressed
                      bobject={{ ...result, url: null }}
                      handleCompanyClicked={() => {}}
                      handleClick={bobject => {
                        handleChange(bobject);
                      }}
                      key={result?.rawBobject?.id}
                    />
                  ))}
                </>
              ) : (
                <NoResultsFound searchTerm={searchValue} />
              )
            ) : (
              <NoSearchYetMessage />
            )}
          </div>
        </div>
      )}
    </Dropdown>
  );
};
