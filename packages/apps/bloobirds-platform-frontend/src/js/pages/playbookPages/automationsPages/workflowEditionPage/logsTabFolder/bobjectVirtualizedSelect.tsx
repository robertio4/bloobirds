import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

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

import { BOBJECT_TYPES, FIELDS_LOGIC_ROLE, BobjectType } from '@bloobirds-it/types';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { useEntity } from '../../../../../hooks';
import useDebounce from '../../../../../hooks/useDebounce';
import { BobjectApi } from '../../../../../misc/api/bobject';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import styles from './logsTab.module.css';

export const BobjectVirtualizedSelect = ({
  bobjectType,
  updateBobjectId,
  placeholder,
}: {
  bobjectType: BobjectType;
  placeholder: string;
  updateBobjectId: (bobjectId: string) => void;
}) => {
  const parentRef = useRef();
  const targetMarkets = useEntity('targetMarkets');
  const icps = useEntity('idealCustomerProfiles');
  const [searchValue, setSearchValue] = useState('');
  const [searchedOptions, setSearchedOptions] = useState();
  const [defaultOptions, setDefaultOptions] = useState();
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { ref, visible, setVisible } = useVisible(false);

  useEffect(() => {
    if (debounceSearchValue) {
      BobjectApi.request()
        .bobjectType(bobjectType)
        .search({
          injectReferences: true,
          query: {
            [bobjectType === BOBJECT_TYPES?.LEAD
              ? `${bobjectType.toLocaleUpperCase()}__FULL_NAME`
              : `${bobjectType.toLocaleUpperCase()}__NAME`]: [debounceSearchValue],
          },
          formFields: true,
          pageSize: 50,
        })
        .then(payload => {
          const newOptions = payload.contents.map(bobject => {
            const company = getFieldByLogicRole(bobject, 'LEAD__COMPANY')?.referencedBobject;
            const companyName = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)?.text;

            return {
              id: bobject.id.value,
              name: getValueFromLogicRole(
                bobject,
                [FIELDS_LOGIC_ROLE[bobjectType]][0].FULL_NAME ||
                  [FIELDS_LOGIC_ROLE[bobjectType]][0].NAME,
              ),
              icp: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].ICP),
              targetMarket: getValueFromLogicRole(
                bobject,
                [FIELDS_LOGIC_ROLE[bobjectType]][0].TARGET_MARKET,
              ),
              ...(bobjectType === BOBJECT_TYPES.LEAD ? { company: companyName } : {}),
              email: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].EMAIL),
              website: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].WEBSITE),
              amount: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].AMOUNT),
            };
          });
          setSearchedOptions(newOptions);
        });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    BobjectApi.request()
      .bobjectType(bobjectType)
      .search({
        injectReferences: true,
        formFields: true,
        pageSize: 20,
      })
      .then(payload => {
        const newOptions = payload.contents.map(bobject => {
          const company = getFieldByLogicRole(bobject, 'LEAD__COMPANY')?.referencedBobject;
          const companyName = getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)?.text;

          return {
            id: bobject.id.value,
            name: getValueFromLogicRole(
              bobject,
              [FIELDS_LOGIC_ROLE[bobjectType]][0].FULL_NAME ||
                [FIELDS_LOGIC_ROLE[bobjectType]][0].NAME,
            ),
            icp: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].ICP),
            targetMarket: getValueFromLogicRole(
              bobject,
              [FIELDS_LOGIC_ROLE[bobjectType]][0].TARGET_MARKET,
            ),
            ...(bobjectType === BOBJECT_TYPES.LEAD ? { company: companyName } : {}),
            email: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].EMAIL),
            website: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].WEBSITE),
            amount: getValueFromLogicRole(bobject, [FIELDS_LOGIC_ROLE[bobjectType]][0].AMOUNT),
          };
        });
        setDefaultOptions(newOptions);
      });
  }, []);

  useEffect(() => {
    if (!searchValue) updateBobjectId(undefined);
  }, [searchValue]);

  const options = debounceSearchValue ? searchedOptions : defaultOptions;

  const handleSelect = value => {
    updateBobjectId(value);
    const bobjectName = options?.find(option => option.id === value).name;
    setSearchValue(bobjectName);
  };

  const rowVirtualizer = useVirtual({
    size: options?.length,
    parentRef,
    estimateSize: useCallback(() => 56, []),
    overscan: 3,
  });

  const getCardItems = options => {
    const badge = targetMarkets?.get(options?.targetMarket);
    const icp = icps?.get(options?.icp);
    switch (bobjectType) {
      case BOBJECT_TYPES.COMPANY:
        return { title: options?.name, subtitle: options?.website, badge };
      case BOBJECT_TYPES.LEAD:
        return {
          title: options?.name,
          subtitle: `${options?.company} ${icp ? `| ${icp?.name}` : ''}`,
          badge: icp,
        };
      case BOBJECT_TYPES.OPPORTUNITY:
        return {
          title: options?.name,
          subtitle: `$ ${options?.amount}`,
          badge: { color: '#1126ea', shortname: 'OPP' },
        };
    }
  };

  return (
    <div className={styles._filters_container}>
      <div key={`${bobjectType}-related-filter`} className={styles._filter__input}>
        <Dropdown
          ref={ref}
          width="100%"
          visible={visible}
          arrow={false}
          anchor={
            <SearchInput
              size="small"
              width="150px"
              placeholder={placeholder}
              value={searchValue}
              onChange={setSearchValue}
              onClick={() => options && setVisible(true)}
            />
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
                const { title, subtitle, badge } = getCardItems(options[virtualRow?.index]);
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
                        <Tooltip title={badge?.name} trigger="hover" position="top">
                          <CircularBadge
                            size="medium"
                            style={{
                              backgroundColor: badge?.color || 'var(--verySoftPeanut)',
                              color: 'white',
                            }}
                          >
                            {badge?.shortname || '?'}
                          </CircularBadge>
                        </Tooltip>
                        <div className={styles._lead__info}>
                          <Text color="peanut" size="m" weight="medium" ellipsis={30}>
                            {title}
                          </Text>
                          <div className={styles._lead_subtitle}>
                            {bobjectType === BOBJECT_TYPES.LEAD && (
                              <Icon name="company" color="softPeanut" />
                            )}
                            <Text
                              color="softPeanut"
                              size="s"
                              inline
                              className={styles._lead__company}
                            >
                              {subtitle}
                            </Text>
                          </div>
                        </div>
                      </>
                    </Item>
                  </div>
                );
              })}
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
