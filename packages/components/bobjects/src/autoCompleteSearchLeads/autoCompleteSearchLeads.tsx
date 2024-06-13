import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Item, SearchInput, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useDebounce } from '@bloobirds-it/hooks';
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, getFieldByLogicRole, getValueFromLogicRole } from '@bloobirds-it/utils';

import styles from './autoCompleteSearchLeads.module.css';

type LeadOptionsType = {
  id: string;
  name: string;
  companyName?: string | null;
  buyerPersona?: string;
  jobTitle?: string;
  bobject: Bobject;
};

export const AutoCompleteSearchLeads = ({
  onLeadIdChange,
  onChange,
  searchQuery = {},
  value,
  companyId,
  disabled = false,
  name = 'lead',
  injectReferences = false,
  width = '200px',
  inputSize = 'small',
  accountId,
}: {
  onLeadIdChange: any;
  onChange: any;
  searchQuery: any;
  value: string;
  companyId: string;
  disabled?: boolean;
  name: string;
  injectReferences: boolean;
  width: string;
  inputSize: 'small' | 'medium';
  accountId: string;
}) => {
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState<LeadOptionsType[]>([]);
  const [searchValue, setSearchValue] = useState<string | null | undefined>(value);
  const [selectedValue, setSelectedValue] = useState<string | null | undefined>('');
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { t } = useTranslation('translation', { keyPrefix: 'bobjects.autoCompleteSearchLeads' });

  useEffect(() => {
    if (value) {
      setSearchValue(value);
      setSelectedValue(value);
    } else {
      setSearchValue(null);
      setSelectedValue(null);
    }
  }, [value]);

  useEffect(() => {
    const query = {
      ...searchQuery,
    };
    if (debounceSearchValue) {
      query[LEAD_FIELDS_LOGIC_ROLE.FULL_NAME] = {
        query: [debounceSearchValue],
        searchMode: 'AUTOCOMPLETE__SEARCH',
      };
    }

    if (companyId) {
      query[LEAD_FIELDS_LOGIC_ROLE.COMPANY] = companyId;
    }

    api
      .post(`/bobjects/${accountId}/Lead/search`, {
        injectReferences: injectReferences,
        query,
        columns: [
          LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
          LEAD_FIELDS_LOGIC_ROLE.COMPANY,
          LEAD_FIELDS_LOGIC_ROLE.ICP,
          LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE,
          LEAD_FIELDS_LOGIC_ROLE.EMAIL,
        ],
        formFields: true,
        pageSize: 50,
      })
      .then(data => {
        const contents = data?.data?.contents;
        const newOptions: LeadOptionsType[] = contents.map((lead: Bobject) => {
          const company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
            .referencedBobject;
          return {
            id: lead?.id.value,
            name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            companyName: company
              ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
              : null,
            buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
            jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
            bobject: lead,
          };
        });
        setOptions(newOptions);
      });
  }, [debounceSearchValue, focused]);

  useEffect(() => {
    setVisible((options.length > 0 && searchValue !== selectedValue) || focused);
  }, [options.length, focused]);

  const handleSelect = (bobjectId: string) => {
    if (!bobjectId) {
      onChange(null);
    } else {
      const lead = options.find(option => option.id === bobjectId);
      const urlLead = bobjectId.split('/');
      const leadId = urlLead[urlLead.length - 1];
      if (onLeadIdChange && typeof onLeadIdChange === 'function') {
        onLeadIdChange(leadId);
      }
      if (onChange && typeof onChange === 'function') {
        onChange(lead?.bobject);
      }
      setSearchValue(lead?.name);
      setSelectedValue(lead?.name);
      setVisible(false);
    }
  };

  return (
    <div ref={ref}>
      <Dropdown
        width="100%"
        visible={visible}
        fallbackPositions={['bottom-start', 'bottom-end', 'top-end']}
        arrow={false}
        anchor={
          <div>
            <SearchInput
              width="100%"
              placeholder={t('placeholder')}
              value={searchValue}
              onChange={setSearchValue}
              disabled={disabled}
              size={inputSize}
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
          {options?.length === 0 ? (
            <Text className={styles._no_results} size="s" color="verySoftPeanut">
              {t('noResults')}
            </Text>
          ) : (
            <>
              {options.map(option => {
                return (
                  <Item
                    onMouseDown={() => {
                      handleSelect(option.id);
                    }}
                    key={option.id}
                    value={option.id}
                  >
                    <>
                      <div className={styles._lead__info}>
                        <Text color="peanut" size="s" weight="medium" ellipsis={30}>
                          {option?.name}
                        </Text>
                        <Text color="softPeanut" size="xs" inline className={styles._lead__company}>
                          {option?.companyName && (
                            <>
                              <Icon
                                size={16}
                                name="company"
                                color="softPeanut"
                                className={styles._company__icon}
                              />
                              {option?.companyName}
                            </>
                          )}
                          {option.companyName && option.jobTitle && ' | '}
                          {option.jobTitle || ''}
                        </Text>
                      </div>
                    </>
                  </Item>
                );
              })}
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
