import { Text, Icon } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import { getLeadName } from '../activitySection/activityItem/activityItem.utils';
import { useBobjectDetails } from '../../hooks';
import { getReferencedBobjectFromLogicRole } from '../../utils/bobjects.utils';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../constants/activity';
import styles from '../activitySection/activityItem/activityHeader/activityHeader.module.css';
import { Bobject } from '../../typings/bobjects';

export const LeadNameLink = ({
  bobject,
  prefix,
  className,
}: {
  bobject: Bobject;
  prefix?: string;
  className?: string;
}) => {
  const leadName = getLeadName(bobject);
  const { openBobjectDetails } = useBobjectDetails();

  const handleLeadClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const activityLead = getReferencedBobjectFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
    );
    openBobjectDetails({
      id: activityLead?.id?.value,
      showContactButton: true,
    });
  };
  return leadName ? (
    <>
      {prefix && (
        <span className={styles._prefix_wrapper}>
          <Text size="s" htmlTag="span">
            {prefix}
          </Text>
        </span>
      )}
      <span className={styles._link_wrapper_ml} onClick={handleLeadClick}>
        <span>
          <Icon name="person" color="bloobirds" className={styles._lead_icon} />
        </span>
        <Text size="s" htmlTag="span" color="bloobirds" className={className}>
          {leadName}
        </Text>
      </span>
    </>
  ) : null;
};
