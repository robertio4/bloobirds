import { useEffect, useMemo, useState } from 'react';

import { ContactViewContext, ContactViewSubTab, ContactViewTab } from '@bloobirds-it/types';
import { api, searchCompaniesByQuery } from '@bloobirds-it/utils';

import { searchOppsByQuery } from '../../../utils/leads';
import { ContactView } from '../contactView/contactView';
import Loading from '../loadingIndicator/loadingIndicator';

const dynamicsObjectTools = {
  account: {
    search: searchCompaniesByQuery,
    tab: ContactViewTab.COMPANY,
    bobjectType: 'companies',
  },
  opportunity: {
    search: searchOppsByQuery,
    tab: ContactViewTab.OPPORTUNITY,
    bobjectType: 'opportunities',
  },
};

export const DynamicsPage = ({ info }) => {
  const { id: dynamicsId, entity } = info;
  const { search, tab, bobjectType } = dynamicsObjectTools[entity];
  const [dynamicsObject, setDynamicsObject] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      search({
        salesforceId: dynamicsId,
        autoMatching: false,
      }).then(data => {
        if (!data?.[bobjectType] || data?.[bobjectType]?.length === 0) {
          api.get(`/linkedin/${bobjectType}/dynamics/${dynamicsId}`).then(data2 => {
            setLoading(false);
            if (data2.data) {
              setDynamicsObject([data2.data]);
            }
          });
          return;
        } else if (data?.[bobjectType] && data?.[bobjectType]?.length > 0) {
          setLoading(false);
          setDynamicsObject(data?.[bobjectType]);
        } else if (data?.[bobjectType]) {
          setLoading(false);
          setDynamicsObject([data?.[bobjectType]]);
        }
      });
    } catch (error) {
      console.error('Error fetching dynamics account', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [dynamicsId]);

  const initialContext: ContactViewContext = useMemo(
    () => ({
      activeTab: tab,
      activeSubTab: ContactViewSubTab.OVERVIEW,
      activeBobject: dynamicsObject?.[0],
    }),
    [dynamicsObject],
  );

  return (
    <div>
      {loading ? <Loading /> : dynamicsObject && <ContactView defaultContext={initialContext} />}
    </div>
  );
};
