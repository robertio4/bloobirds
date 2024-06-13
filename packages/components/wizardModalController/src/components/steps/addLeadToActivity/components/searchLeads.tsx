import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, Item, SearchInput, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useDebounce } from '@bloobirds-it/hooks';
import { Bobject, COMPANY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  injectReferencesSearchProcess,
  api,
} from '@bloobirds-it/utils';

import styles from '../addLeadToActivity.module.css';

const SearchLeads = ({
  accountId,
  onLeadIdChange,
}: {
  accountId: string;
  onLeadIdChange: (selectedLead: Bobject) => void;
}) => {
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const debounceSearchValue = useDebounce(searchValue, 200);
  const { t } = useTranslation();

  useEffect(() => {
    if (debounceSearchValue) {
      api
        .post(`/bobjects/${accountId}/Lead/search`, {
          injectReferences: true,
          query: {
            [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME]: [debounceSearchValue],
          },
          formFields: true,
          pageSize: 1000,
        })
        .then(payload => {
          // Fetch all leads and bring the company to print the name
          const payloadWithReferences = injectReferencesSearchProcess(payload?.data);
          const newOptions = payloadWithReferences.contents.map(lead => {
            return {
              id: lead.id.value,
              name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
              email: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL),
              jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
              bobject: lead,
            };
          });
          setOptions(newOptions);
        });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    setVisible(options.length > 0 && selectedValue !== searchValue);
  }, [options.length, selectedValue, searchValue]);

  const handleSelect = value => {
    const selectedLead = options.find(option => option.id === value);
    onLeadIdChange(selectedLead?.bobject);
    setSearchValue(selectedLead?.name);
    setSelectedValue(selectedLead?.name);
  };

  return (
    <Dropdown
      ref={ref}
      width="100%"
      visible={visible}
      arrow={false}
      anchor={
        <div style={{ width: '100%' }}>
          <SearchInput
            color="bloobirds"
            size="small"
            width="100%"
            placeholder={t('common.searchLeads')}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      }
    >
      <div className={styles._search_container}>
        {options.map(option => {
          return (
            <Item
              onClick={handleSelect}
              className={styles.item}
              key={option.id}
              value={option.id}
              icon="person"
              iconColor="softPeanut"
            >
              <div className={styles._lead__info}>
                <Text color="peanut" size="m" weight="medium" ellipsis={30}>
                  {option?.name}
                </Text>
                <Text color="softPeanut" size="s" inline className={styles._lead__company}>
                  {option?.email}
                  {option?.email && option?.jobTitle && ' | '}
                  {option?.jobTitle || ''}
                </Text>
              </div>
            </Item>
          );
        })}
      </div>
    </Dropdown>
  );
};

export default SearchLeads;
