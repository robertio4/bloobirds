import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import { useDebounce } from '@bloobirds-it/hooks';
import {
  BuyerPersona,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getFieldByLogicRole,
  getValueFromLogicRole,
  injectReferencesSearchProcess,
  api,
} from '@bloobirds-it/utils';

import styles from './addLeadToActivityModal.module.css';

const AutoCompleteSearchLeads = ({
  accountId,
  buyerPersonas,
  onLeadIdChange,
}: {
  accountId: string;
  buyerPersonas?: BuyerPersona[];
  onLeadIdChange: (leadId: string) => void;
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
          const payloadWithReferences = injectReferencesSearchProcess(payload?.data);
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
            placeholder={t('common.searchLeads')}
            value={searchValue}
            onChange={setSearchValue}
            color="bloobirds"
          />
        </div>
      }
    >
      <div className={styles._search_container}>
        {options.map(option => {
          // @ts-ignore
          const icp = buyerPersonas?.find(person => person.id === option.buyerPersona);
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
                      {icp?.shortName || ''}
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
