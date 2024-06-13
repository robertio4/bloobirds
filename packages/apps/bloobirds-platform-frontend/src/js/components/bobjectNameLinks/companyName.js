import React from 'react';
import { useBobjectDetails } from '../../hooks';
import { getReferencedBobjectFromLogicRole } from '../../utils/bobjects.utils';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../constants/activity';
import { Text, Icon } from '@bloobirds-it/flamingo-ui';
import styles from '../activitySection/activityItem/activityHeader/activityHeader.module.css';
import { getCompanyName } from '../activitySection/activityItem/activityItem.utils';

export const CompanyNameLink = ({ bobject, prefix, className }) => {
  const companyName = getCompanyName(bobject);
  const { openBobjectDetails } = useBobjectDetails();

  const handleLeadClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const activityCompany = getReferencedBobjectFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
    );
    openBobjectDetails({
      id: activityCompany?.id?.value,
      showContactButton: true,
    });
  };
  return companyName ? (
    <>
      {prefix && (
        <Text size="s" htmlTag="span">
          {prefix}
        </Text>
      )}
      <span className={styles._link_wrapper_ml} onClick={handleLeadClick}>
        <Icon name="company" color="bloobirds" />
        <Text size="s" htmlTag="span" color="bloobirds" className={className}>
          {companyName}
        </Text>
      </span>
    </>
  ) : null;
};
