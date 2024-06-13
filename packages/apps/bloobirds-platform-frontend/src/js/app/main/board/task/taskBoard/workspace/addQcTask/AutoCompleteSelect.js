import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

import {
  CircularBadge,
  Dropdown,
  Item,
  SearchInput,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../../../constants/company';
import { useEntity } from '../../../../../../../hooks';
import useDebounce from '../../../../../../../hooks/useDebounce';
import { BobjectApi } from '../../../../../../../misc/api/bobject';
import { getValueFromLogicRole } from '../../../../../../../utils/bobjects.utils';
import styles from './addQcTask.module.css';

const AutoCompleteSelect = ({ onCompanyIdChange }) => {
  const parentRef = useRef();
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const debounceSearchValue = useDebounce(searchValue, 200);
  const targetMarkets = useEntity('targetMarkets');

  useEffect(() => {
    if (debounceSearchValue) {
      BobjectApi.request()
        .Company()
        .search({
          injectReferences: false,
          query: {
            COMPANY__NAME: [debounceSearchValue],
          },
          formFields: true,
          pageSize: 50,
        })
        .then(payload => {
          const newOptions = payload.contents.map(company => ({
            id: company.id.value,
            name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
            targetMarket: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
            website: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
          }));
          setOptions(newOptions);
        });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    setVisible(options.length > 0 && selectedValue !== searchValue);
  }, [options.length, selectedValue, searchValue]);

  const handleSelect = value => {
    onCompanyIdChange(value);
    const name = options.find(option => option.id === value).name;
    setSearchValue(name);
    setSelectedValue(name);
  };

  const rowVirtualizer = useVirtual({
    size: options?.length,
    parentRef,
    estimateSize: useCallback(() => 56, []),
    overscan: 3,
  });
  return (
    <Dropdown
      ref={ref}
      width="100%"
      visible={visible}
      arrow={false}
      anchor={
        <div style={{ width: '100%' }}>
          <SearchInput
            width="100%"
            placeholder="Search companies"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      }
    >
      <div ref={parentRef} className={styles._modal_container}>
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
          }}
          className={styles._relative}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const targetMarket = targetMarkets?.get(options[virtualRow.index]?.targetMarket);
            return (
              <div
                key={virtualRow.index}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={styles._modal_item}
              >
                <Item
                  className={styles.item}
                  onClick={handleSelect}
                  key={virtualRow.index}
                  value={options[virtualRow.index].id}
                >
                  <>
                    {targetMarket ? (
                      <Tooltip title={targetMarket?.name} trigger="hover" position="top">
                        <CircularBadge
                          size="medium"
                          style={{
                            backgroundColor: targetMarket?.color || 'var(--verySoftPeanut)',
                            color: 'white',
                          }}
                        >
                          {targetMarket?.shortname || ''}
                        </CircularBadge>
                      </Tooltip>
                    ) : (
                      <CircularBadge
                        size="medium"
                        style={{
                          backgroundColor: 'var(--verySoftPeanut)',
                          color: 'white',
                          fontSize: 20,
                        }}
                      >
                        ?
                      </CircularBadge>
                    )}
                    <div className={styles._lead__info}>
                      <Text color="peanut" size="m" weight="medium" ellipsis={30}>
                        {options[virtualRow.index].name}
                      </Text>
                      <Text color="softPeanut" size="s" inline className={styles._lead__company}>
                        {options[virtualRow.index].website}
                      </Text>
                    </div>
                  </>
                </Item>
              </div>
            );
          })}
        </div>
      </div>
    </Dropdown>
  );
};

export default AutoCompleteSelect;
