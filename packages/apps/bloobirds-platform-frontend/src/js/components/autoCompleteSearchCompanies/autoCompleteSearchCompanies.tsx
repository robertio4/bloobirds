import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {
  CircularBadge,
  Dropdown,
  Icon,
  Item,
  SearchInput,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { useCompany, useEntity } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { isSizeNumber } from '../../utils/styles.utils';
import styles from './autoCompleteSearchCompanies.module.css';
import {Size} from "@material-ui/core";
import {Bobject, BobjectTypes, LogicRoleType} from "@bloobirds-it/types";
import {BadgeSize} from "@bloobirds-it/flamingo-ui/dist/components/CounterBadge/CounterBadge.type";

const AutoCompleteSearchCompanies = ({
  onCompanyIdChange,
  onChange,
  value,
  // eslint-disable-next-line prettier/prettier
  disabled = false,
  size = 16,
  name = 'company',
  width = '200px',
}:{
  onCompanyIdChange: Dispatch<SetStateAction<string>>;
  onChange:(value: string)=>void;
  value: string;
  disabled?: boolean;
  size: Size | number
  name?: string;
  width: `${number}px`;
}) => {
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(value);
  const [selectedValue, setSelectedValue] = useState('');
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { fetchCompanies } = useCompany('autocomplete-search');
  const targetMarkets = useEntity('targetMarkets');
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useEntity('bobjectTypes');
  const fieldTypes = useEntity('fieldTypes');
  const emailFieldType = fieldTypes?.all()?.find(type => type?.enumName === 'EMAIL');
  const companyBobjectType = bobjectTypes
    ?.all()
    ?.find(type => type?.name === BobjectTypes.Company);
  const emailFields = bobjectFields
    ?.all()
    ?.filter(
      field =>
        field?.bobjectType === companyBobjectType?.id && field?.fieldType === emailFieldType?.id,
    );
  const emailFieldIds = emailFields?.map(field => field.id);

  useEffect(() => {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    //TODO: Seems that we can retrieve only the columns that we need to use. Name, id, and the ones needed for the meeting modal
    const query = {} as Record<LogicRoleType<BobjectTypes.Company>, any>
    if (debounceSearchValue) {
      query[COMPANY_FIELDS_LOGIC_ROLE.NAME] = [debounceSearchValue];
    }

    fetchCompanies({
      injectReferences: false,
      query,
      columns: [
        COMPANY_FIELDS_LOGIC_ROLE.NAME,
        COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
        COMPANY_FIELDS_LOGIC_ROLE.WEBSITE,
        COMPANY_FIELDS_LOGIC_ROLE.COUNTRY,
        ...emailFieldIds,
      ],
      formFields: true,
      pageSize: 50,
    }).then(({ contents }:{ contents: Bobject<BobjectTypes.Company>[] }) => {
      const newOptions = contents.map(company => ({
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

  const handleSelect = (bobjectId: string) => {
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
        onChange(company.bobject);
      }
      setSearchValue(company.name);
      setSelectedValue(company.name);
    }
  };

  const onClose = () => {
    if ((!searchValue || searchValue === '') && (value !== '' || value)) {
      handleSelect(null);
    }
  };

  return (
    <div className={styles._dropdown_wrapper} ref={ref}>
      <Dropdown
        width="100%"
        visible={visible}
        onClose={onClose}
        arrow={false}
        anchor={
          <div className={styles._search_wrapper}>
            <SearchInput
              width="100%"
              placeholder="Search companies"
              value={searchValue}
              onChange={setSearchValue}
              disabled={disabled}
              size="medium"
              name={name}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
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
                const targetMarket = targetMarkets?.get(option?.targetMarket);
                return (
                  <Item
                    className={styles._item}
                    onMouseDown={() => handleSelect(option.id)}
                    key={option.id}
                    value={option.id}
                  >
                    {targetMarket ? (
                      <Tooltip title={targetMarket?.name} trigger="hover" position="top">
                        <CircularBadge
                          size={(!isSizeNumber(size) ? size : undefined) as BadgeSize}
                          style={{
                            backgroundColor: targetMarket?.color || 'var(--softPeanut)',
                            color: 'var(--white)',
                            borderColor: 'var(--white)',
                            flexShrink: 0,
                            ...(isSizeNumber(size)
                              ? {
                                  width: size,
                                  height: size,
                                  fontSize: size && `${(size as number) / 2} px`,
                                }
                              : {}),
                          }}
                        >
                          {targetMarket?.shortname || ''}
                        </CircularBadge>
                      </Tooltip>
                    ) : (
                      <CircularBadge
                        size={(!isSizeNumber(size) ? size : undefined ) as BadgeSize}
                        style={{
                          backgroundColor: 'var(--softPeanut)',
                          color: 'var(--white)',
                          borderColor: 'var(--white)',
                          flexShrink: 0,
                          ...(isSizeNumber(size)
                            ? {
                                width: size,
                                height: size,
                                fontSize: size && `${size as number / 2} px`,
                              }
                            : {}),
                        }}
                      >
                        ?
                      </CircularBadge>
                    )}
                    <div className={styles._company__info}>
                      <Text
                        color="peanut"
                        size={size === 'medium' ? 'm' : 's'}
                        weight="medium"
                        ellipsis={30}
                      >
                        {option?.name}
                      </Text>
                      <Text
                        color="softPeanut"
                        size={size === 'medium' ? 's' : 'xs'}
                        inline
                        className={styles._company__website}
                      >
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
                No results found
              </Text>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default AutoCompleteSearchCompanies;
