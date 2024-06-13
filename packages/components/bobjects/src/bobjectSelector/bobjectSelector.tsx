import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Input, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes, GlobalSearchResponse, SearchBobjectType } from '@bloobirds-it/types';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { BobjectItemCompressed } from '../bobjectItemCompressed/bobjectItemCompressed';
import styles from './bobjectSelector.module.css';
import { NoResultsFound } from './components/noResultsFound/noResultsFound';
import { NoSearchYetMessage } from './components/noSearchYetMessage/noSearchYetMessage';

export const BobjectSelector = ({
  accountId,
  onBobjectChange,
  selected,
  id,
  iconSize = 12,
  size = 'medium',
  bobjectType,
}: {
  accountId: string;
  onBobjectChange: (bobject: SearchBobjectType) => void;
  selected: string;
  id: string;
  iconSize?: number;
  bobjectType?: string;
  size?: 'small' | 'medium';
}) => {
  const { visible, ref, setVisible } = useVisible(false);
  const [searchValue, setSearchValue] = useState<string>();
  const { data: response } = useSWR(
    searchValue && searchValue !== '' && visible ? [id || 'bobjectSelector', searchValue] : null,
    () => {
      return api.post(`/bobjects/${accountId}/global-search`, {
        query: searchValue,
        bobjectTypes: ['Company', 'Lead', 'Opportunity'],
        numberOfResults: 20,
      });
    },
    { use: [keepPreviousResponse] },
  );
  const results: GlobalSearchResponse[] = response?.data?.results;
  const isSmall = size === 'small';
  const iconMap = {
    [BobjectTypes.Company]: 'company',
    [BobjectTypes.Lead]: 'person',
    [BobjectTypes.Opportunity]: 'fileOpportunity',
  };

  const icon = iconMap[bobjectType];

  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.bobjectSelector' });

  return (
    <Dropdown
      width={323}
      ref={ref}
      visible={visible}
      zIndex={20000}
      anchor={
        <div onClick={() => setVisible(!visible)} className={styles.link_button}>
          <Icon name={icon ?? 'link'} color="bloobirds" size={iconSize} />
          <Text size={isSmall ? 'xs' : 's'} color="bloobirds">
            {selected || t('link')}
          </Text>
        </div>
      }
    >
      <div className={styles.content}>
        <Input
          autoFocus
          width="100%"
          placeholder={t('search')}
          onChange={setSearchValue}
          value={searchValue}
          className={styles.input}
        />
        <div className={styles.results}>
          {results ? (
            results?.length > 0 ? (
              <>
                {results?.map(result => (
                  <BobjectItemCompressed
                    bobject={{ ...result, url: null }}
                    handleCompanyClicked={() => {}}
                    handleClick={bobject => {
                      onBobjectChange(bobject);
                      setVisible(false);
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
    </Dropdown>
  );
};
