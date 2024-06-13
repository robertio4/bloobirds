import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Item, Input, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useDebounce } from '@bloobirds-it/hooks';
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole, api } from '@bloobirds-it/utils';

import styles from './autoCompleteSearchCompanies.module.css';

type CompanyOptionsType = {
  id: string;
  name: string;
  targetMarket?: string;
  website?: string;
  country?: string;
  bobject: Bobject;
};

export const AutoCompleteSearchCompanies = ({
  onCompanyIdChange,
  onChange,
  value,
  disabled = false,
  name = 'company',
  width = '200px',
  accountId,
  size = 'medium',
}: {
  onCompanyIdChange: any;
  onChange: any;
  value: string;
  disabled?: any;
  name: string;
  width: string;
  accountId: string;
  size?: 'medium' | 'small' | 'labeled';
}) => {
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState<CompanyOptionsType[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>(value);
  const [selectedValue, setSelectedValue] = useState<string | undefined>('');
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const query = {};
    if (debounceSearchValue) {
      query[COMPANY_FIELDS_LOGIC_ROLE.NAME] = [debounceSearchValue];
    }

    api
      .post(`/bobjects/${accountId}/Company/search`, {
        injectReferences: false,
        query,
        formFields: true,
        pageSize: 50,
      })
      .then((data: any) => {
        const contents = data?.data?.contents;
        const newOptions: CompanyOptionsType[] = contents.map((company: Bobject) => ({
          id: company?.id.value,
          name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          targetMarket: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
          website: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
          country: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.COUNTRY, true),
          bobject: company,
        }));
        setOptions(newOptions);
      });
  }, [debounceSearchValue]);

  useEffect(() => {
    setVisible((options.length > 0 && searchValue !== selectedValue) || focused);
  }, [options.length, selectedValue, searchValue, focused]);

  const handleSelect = (bobjectId: string | null) => {
    if (!bobjectId) {
      if (onChange && typeof onChange === 'function') {
        onChange(null);
      }
    } else {
      const company = options.find(option => option.id === bobjectId);
      if (onCompanyIdChange && typeof onCompanyIdChange === 'function') {
        onCompanyIdChange(bobjectId);
      }
      if (onChange && typeof onChange === 'function') {
        onChange(company?.bobject);
      }
      setSearchValue(company?.name);
      setSelectedValue(company?.name);
    }
  };

  const onClose = () => {
    if ((!searchValue || searchValue === '') && (value !== '' || value)) {
      handleSelect(null);
    }
  };

  return (
    <div ref={ref}>
      <Dropdown
        width="100%"
        visible={visible}
        onClose={onClose}
        arrow={false}
        anchor={
          <Input
            width="100%"
            placeholder={
              searchValue
                ? `${t('common.company_other')} *`
                : `${t('common.search')} ${t('common.company_other').toLowerCase()} *`
            }
            value={searchValue}
            onChange={setSearchValue}
            disabled={disabled}
            size={size}
            name={name}
            onFocus={onFocus}
            onBlur={onBlur}
            icon="search"
          />
        }
      >
        <div
          className={styles._item_wrapper}
          style={{
            width: width,
          }}
        >
          {options?.length > 0 ? (
            <>
              {options.map(option => {
                return (
                  <Item
                    onMouseDown={() => handleSelect(option.id)}
                    key={option.id}
                    value={option.id}
                  >
                    <div className={styles._company__info}>
                      <Text color="peanut" size="s" weight="medium" ellipsis={30}>
                        {option?.name}
                      </Text>
                      <Text color="softPeanut" size="s" inline className={styles._company__website}>
                        {option?.website && (
                          <>
                            <Icon
                              size={16}
                              name="timezones"
                              color="softPeanut"
                              className={styles._company__icon}
                            />
                            {option?.website}
                          </>
                        )}
                        {option.website && option?.country && ' | '}
                        {option?.country || ''}
                      </Text>
                    </div>
                  </Item>
                );
              })}
            </>
          ) : (
            <div className={styles.noResults}>
              <Text color="softPeanut" size="s">
                {t('common.noResultsFound')}
              </Text>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
