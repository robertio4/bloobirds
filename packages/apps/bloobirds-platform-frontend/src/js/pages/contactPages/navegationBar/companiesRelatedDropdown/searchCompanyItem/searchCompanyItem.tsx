import React, { useMemo } from 'react';
import { CircularBadge, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../../utils/bobjects.utils';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import styles from './searchCompanyItem.css';
import { useEntity } from '../../../../../hooks';

const SearchCompanyItem = ({ company, handleDelete, handleOpenModal }: any) => {
  const parsedCompany = useMemo(
    () => ({
      name: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)?.text,
      website: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.WEBSITE),
      targetMarket: getFieldByLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET),
    }),
    [company],
  );
  const targetMarket = useEntity('targetMarkets')?.get(parsedCompany?.targetMarket?.value);
  return (
    <div className={styles._search_item_card}>
      <div className={styles._search_item_container} onClick={() => handleOpenModal()}>
        {targetMarket ? (
          <div className={styles._circular_badge_wrapper}>
            <Tooltip title={targetMarket?.name} trigger="hover" position="top">
              <CircularBadge
                size="medium"
                style={{
                  backgroundColor: targetMarket?.color || 'var(--verySoftPeanut)',
                  color: 'white',
                  height: '32px',
                  width: '32px',
                }}
              >
                {targetMarket?.shortname || ''}
              </CircularBadge>
            </Tooltip>
          </div>
        ) : (
          <div className={styles._circular_badge_wrapper}>
            <CircularBadge
              size="medium"
              style={{
                backgroundColor: 'var(--verySoftPeanut)',
                color: 'white',
                fontSize: 20,
                height: '32px',
                width: '32px',
              }}
            >
              ?
            </CircularBadge>
          </div>
        )}
        <div>
          <div className={styles._search_item_text}>
            <Text size="s">{parsedCompany.name}</Text>
            <Text size="xs" color="softPeanut">
              {parsedCompany.website}
            </Text>
          </div>
        </div>
      </div>
      {handleDelete && <IconButton name="cross" color="softPeanut" onClick={handleDelete} />}
    </div>
  );
};
export default SearchCompanyItem;
