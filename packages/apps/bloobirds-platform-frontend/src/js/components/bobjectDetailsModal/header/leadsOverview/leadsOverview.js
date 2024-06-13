import React from 'react';

import { useAggregationSubscription } from '@bloobirds-it/plover';
import { BOBJECT_TYPES } from '@bloobirds-it/types';

import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useEntity } from '../../../../hooks';
import BusinessAssetBadge from '../../../bussinesAssetBadge/businessAssetBadge';
import styles from './leadsOverview.module.css';

export const LeadsOverview = ({ companyId }) => {
  const icps = useEntity('idealCustomerProfiles');
  const leadRequest = React.useMemo(
    () => ({
      query: {
        [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [companyId],
      },
      aggregations: [LEAD_FIELDS_LOGIC_ROLE.ICP],
      injectReferences: false,
      formFields: false,
      page: 0,
      pageSize: 5000,
    }),
    [companyId],
  );
  const { data } = useAggregationSubscription(leadRequest, BOBJECT_TYPES.LEAD);

  const leadCount = data?.data?.contents
    ?.map(x => ({ [x.fieldDataList[0].value]: x.value }))
    ?.reduce((a, b) => ({ ...a, ...b }), {});

  return (
    <div className={styles.LeadOverview_root}>
      {icps &&
        leadCount &&
        icps
          ?.all()
          .filter(lead => leadCount[lead.id] !== undefined)
          .map(lead => (
            <BusinessAssetBadge
              key={lead.id}
              size={32}
              entityType="idealCustomerProfiles"
              entityId={lead.id}
              counter={leadCount[lead.id]}
            />
          ))}
    </div>
  );
};
