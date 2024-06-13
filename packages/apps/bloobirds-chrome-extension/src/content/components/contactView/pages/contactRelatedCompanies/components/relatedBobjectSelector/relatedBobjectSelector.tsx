import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Item, SearchInput, useVisible } from '@bloobirds-it/flamingo-ui';
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { useTargetMarkets } from '../../../../../../../hooks/useTargetMarkets';
import { api } from '../../../../../../../utils/api';
import {
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../../../../utils/bobjects.utils';
import { keepPreviousResponse } from '../../../../../../../utils/swr';
import styles from '../../contactRelatedCompanies.module.css';
import { SearchItem } from '../searchItem/searchItem';

const companyColumns = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
];

const getCompaniesQuery = searchValue => ({
  query:
    searchValue !== ''
      ? {
          [COMPANY_FIELDS_LOGIC_ROLE.NAME]: {
            query: searchValue,
            searchMode: 'AUTOCOMPLETE__SEARCH',
          },
        }
      : {},
  columns: companyColumns,
  formFields: true,
  pageSize: 15,
  searchMode: 'AUTOCOMPLETE__SEARCH',
});

interface RelatedBobjectSelectorProps {
  company: Bobject;
  data: { parentCompany: Bobject; childCompanies: Bobject[]; siblingCompanies: Bobject[] };
  handleOnClick: (bobject: Bobject) => void;
}

export const RelatedBobjectSelector = ({
  company,
  data,
  handleOnClick,
}: RelatedBobjectSelectorProps) => {
  const { siblingCompanies, parentCompany, childCompanies } = data;
  const [searchValue, setSearchValue] = useState('');
  const { ref, visible, setVisible } = useVisible(false);
  const [debounceSearchValue] = useDebounce(searchValue, 300);
  const targetMarkets = useTargetMarkets();
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const { data: companies } = useSWR(
    company && [`/bobjects/${company?.id.accountId}/Company/search`, debounceSearchValue],
    ([url, debounceSearchValue]) => api.post(url, getCompaniesQuery(debounceSearchValue)),
    {
      use: [keepPreviousResponse],
    },
  );

  const parsedCompanies = useMemo(
    () =>
      companies?.data?.contents?.reduce((acc, resCompany) => {
        //filter already related companies
        if (
          siblingCompanies?.some(({ id }) => id.value === resCompany.id.value) ||
          company?.id.value === resCompany.id.value ||
          parentCompany?.id.objectId === resCompany.id.objectId ||
          childCompanies?.find(child => child.id.objectId === resCompany.id.objectId)
        ) {
          return acc;
        }
        //reduce the rest into the needed format
        const resCompanyFields = {
          id: resCompany.id,
          name: getTextFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          website: getTextFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
        };
        //could be checked only if we have TM
        const { name, color, shortName } =
          targetMarkets.find(
            ({ id }) =>
              id === getValueFromLogicRole(resCompany, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
          ) || {};
        const parsedCompany = {
          ...resCompanyFields,
          targetMarket: { name, color, shortName },
        };
        return [...acc, parsedCompany];
      }, []),
    [companies],
  );

  useEffect(() => {
    if (!parsedCompanies?.length) setVisible(false);
  }, [parsedCompanies]);

  return (
    <Dropdown
      ref={ref}
      width="376px"
      visible={visible}
      arrow={false}
      position="bottom-start"
      anchor={
        <SearchInput
          width="376px"
          placeholder={t('search') + ' ...'}
          value={searchValue}
          onChange={value => {
            setSearchValue(value);
            setVisible(true);
          }}
        />
      }
    >
      {parsedCompanies && (
        <div className={styles._drop_down_container}>
          {parsedCompanies.map((company: any) => (
            <Item key={company.id.value} value={company.id.value}>
              <SearchItem
                company={company}
                handleOnClick={() => {
                  handleOnClick(company);
                  setVisible(false);
                }}
              />
            </Item>
          ))}
        </div>
      )}
    </Dropdown>
  );
};
