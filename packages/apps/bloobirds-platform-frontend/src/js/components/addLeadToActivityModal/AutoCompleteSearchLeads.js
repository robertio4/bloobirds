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
import { injectReferencesSearchProcess } from '@bloobirds-it/utils';

import styles from '../../app/main/board/task/taskBoard/workspace/addQcTask/addQcTask.module.css';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { useEntity } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import { BobjectApi } from '../../misc/api/bobject';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../utils/bobjects.utils';

const AutoCompleteSearchLeads = ({ onLeadIdChange }) => {
  const { ref, visible, setVisible } = useVisible(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const debounceSearchValue = useDebounce(searchValue, 200);
  const buyerPersonas = useEntity('idealCustomerProfiles');

  useEffect(() => {
    if (debounceSearchValue) {
      BobjectApi.request()
        .Lead()
        .search({
          injectReferences: true,
          query: {
            [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME]: [debounceSearchValue],
          },
          columns: [
            LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
            LEAD_FIELDS_LOGIC_ROLE.COMPANY,
            LEAD_FIELDS_LOGIC_ROLE.ICP,
            LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE,
          ],
          referencedColumns: [COMPANY_FIELDS_LOGIC_ROLE.NAME],
          formFields: true,
          pageSize: 1000,
        })
        .then(payload => {
          // Fetch all leads and bring the company to print the name
          const payloadWithReferences = injectReferencesSearchProcess(payload);
          const newOptions = payloadWithReferences.contents.map(lead => {
            const company = getFieldByLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
              .referencedBobject;
            return {
              id: lead.id.value,
              name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
              companyName: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
              buyerPersona: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ICP),
              jobTitle: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE),
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
    const name = options.find(option => option.id === value).name;
    const urlLead = value.split('/');
    const leadId = urlLead[urlLead.length - 1];
    onLeadIdChange(leadId);
    setSearchValue(name);
    setSelectedValue(name);
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
            width="100%"
            placeholder="Search leads"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      }
    >
      <div className={styles._search_container}>
        {options.map(option => {
          const icp = buyerPersonas?.get(option?.buyerPersona);
          return (
            <Item className={styles.item} onClick={handleSelect} key={option.id} value={option.id}>
              <>
                {icp ? (
                  <Tooltip title={icp?.name} trigger="hover" position="top">
                    <CircularBadge
                      size="medium"
                      style={{
                        backgroundColor: icp?.color || 'var(--verySoftPeanut)',
                        color: 'white',
                      }}
                    >
                      {icp?.shortname || ''}
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
                    {option?.name}
                  </Text>
                  <Text color="softPeanut" size="s" inline className={styles._lead__company}>
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
      </div>
    </Dropdown>
  );
};

export default AutoCompleteSearchLeads;
