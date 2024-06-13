import React, { useEffect, useState } from 'react';

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
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { useEntity, useLeads } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../utils/bobjects.utils';
import { isSizeNumber } from '../../utils/styles.utils';
import styles from './autoCompleteSearchLeads.module.css';

const AutoCompleteSearchLeads = ({
  onLeadIdChange,
  onChange,
  searchQuery = {},
  value,
  companyId,
  disabled = false,
  size = 16,
  name = 'lead',
  injectReferences = false,
  width = '200px',
  inputSize = 'small',
}) => {
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(value);
  const [selectedValue, setSelectedValue] = useState('');
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { searchLeads } = useLeads('autocomplete-search');
  const buyerPersonas = useEntity('idealCustomerProfiles');

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
    //TODO: Seems that we can retrieve only the columns that we need to use. Name, id, and the ones needed for the meeting modal
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

    searchLeads({
      injectReferences: injectReferences,
      query,
      columns: [
        LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
        LEAD_FIELDS_LOGIC_ROLE.COMPANY,
        LEAD_FIELDS_LOGIC_ROLE.ICP,
        LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE,
      ],
      formFields: true,
      pageSize: 50,
    }).then(({ contents }) => {
      const newOptions = contents.map(lead => {
        const company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY).referencedBobject;
        return {
          id: lead?.id.value,
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          companyName: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
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

  const handleSelect = bobjectId => {
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
        onChange(lead.bobject);
      }
      setSearchValue(lead.name);
      setSelectedValue(lead.name);
      setVisible(false);
    }
  };

  return (
    <div className={styles._dropdown_wrapper} ref={ref}>
      <Dropdown
        width="100%"
        visible={visible}
        fallbackPositions={['bottom-start', 'bottom-end', 'top-end']}
        arrow={false}
        anchor={
          <div className={styles._search_wrapper}>
            <SearchInput
              width="100%"
              placeholder="Search leads"
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
              No results found
            </Text>
          ) : (
            <>
              {options.map(option => {
                const icp = buyerPersonas?.get(option?.buyerPersona);
                return (
                  <Item
                    style={{
                      width: width,
                    }}
                    onMouseDown={() => {
                      handleSelect(option.id);
                    }}
                    key={option.id}
                    value={option.id}
                  >
                    <>
                      {icp ? (
                        <Tooltip title={icp?.name} trigger="hover" position="top">
                          <CircularBadge
                            size={!isSizeNumber(size) ? size : undefined}
                            style={{
                              backgroundColor: icp?.color || 'var(--softPeanut)',
                              color: 'var(--white)',
                              borderColor: 'var(--white)',
                              flexShrink: 0,
                              ...(isSizeNumber(size)
                                ? {
                                    width: isSizeNumber(size) && size,
                                    height: isSizeNumber(size) && size,
                                    fontSize: isSizeNumber(size) && size && `${size / 2} px`,
                                  }
                                : {}),
                            }}
                          >
                            {icp?.shortname || ''}
                          </CircularBadge>
                        </Tooltip>
                      ) : (
                        <CircularBadge
                          size={!isSizeNumber(size) ? size : undefined}
                          style={{
                            backgroundColor: 'var(--softPeanut)',
                            color: 'var(--white)',
                            borderColor: 'var(--white)',
                            flexShrink: 0,
                            ...(isSizeNumber(size)
                              ? {
                                  width: isSizeNumber(size) && size,
                                  height: isSizeNumber(size) && size,
                                  fontSize: isSizeNumber(size) && size && `${size / 2} px`,
                                }
                              : {}),
                          }}
                        >
                          ?
                        </CircularBadge>
                      )}
                      <div className={styles._lead__info}>
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
                          className={styles._lead__company}
                        >
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

export default AutoCompleteSearchLeads;
