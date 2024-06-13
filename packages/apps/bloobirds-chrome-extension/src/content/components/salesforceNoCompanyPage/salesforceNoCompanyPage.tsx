import {
  ContactViewTab,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import useSWR from 'swr';

import { api } from '../../../utils/api';
import { BubbleWindow } from '../bubbleWindow/bubbleWindow';
import CaptureSalesforceForm from '../captureLeadSalesforceForm/captureSalesforceForm';
import NoBobjectsPage from '../contactView/pages/noBobjectsPage/noBobjectsPage';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import Loading from '../loadingIndicator/loadingIndicator';

/**
 * This component is used when we have a Contact or Opportunity whose Account is not synced in BB.
 * In this case, we will look for these objects on SFDC, grave the AccountId and show the capture form.
 * @constructor
 */
export const SalesforceNoCompanyPage = () => {
  const { useGetActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const { getOnRefresh } = useFloatingMenuContext();
  const onRefresh = getOnRefresh();
  const isOpportunity = activeBobject?.id?.typeName === 'Opportunity';
  const { data: sobject, error } = useSWR(
    activeBobject?.salesforceId && `/sobject/${activeBobject?.salesforceId}`,
    () =>
      api
        .get(
          `/utils/service/salesforce/sobject/${isOpportunity ? 'Opportunity' : 'Contact'}/${
            activeBobject?.salesforceId
          }`,
        )
        .then(data => data?.data),
  );

  const accountId = sobject?.['AccountId'];

  const afterSyncing = bobject => {
    const logicRole = isOpportunity
      ? OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY
      : LEAD_FIELDS_LOGIC_ROLE.COMPANY;
    api
      .patch(`/bobjects/${activeBobject?.id?.value}/raw`, {
        contents: {
          [logicRole]: bobject?.id?.value,
        },
        params: {},
      })
      .then(() => {
        onRefresh();
      });
  };

  if (!activeBobject?.salesforceId) {
    return (
      <BubbleWindow>
        <NoBobjectsPage contactPage={ContactViewTab.COMPANY} />
      </BubbleWindow>
    );
  }

  if (!sobject && !error) {
    return <Loading />;
  }

  return (
    <>
      {accountId ? (
        <CaptureSalesforceForm
          defaultSobjectType="Account"
          sobjectId={accountId}
          afterSyncing={afterSyncing}
        />
      ) : (
        <BubbleWindow>
          <NoBobjectsPage contactPage={ContactViewTab.COMPANY} />
        </BubbleWindow>
      )}
    </>
  );
};
