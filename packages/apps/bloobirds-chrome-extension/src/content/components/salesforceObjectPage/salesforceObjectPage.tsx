import { useEffect, useState } from 'react';

import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import {
  getSalesforceIdFromPathOtherObjects,
  getSalesforceSobjectFromPage,
} from '../../../utils/url';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import Loading from '../loadingIndicator/loadingIndicator';
import NoContextPage from '../noContextPage/noContextPage';

export const SalesforceObjectPage = ({ closeExtensionCallback, openExtensionCallback }) => {
  const { useGetCurrentPage, setActiveBobject } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedObject, setRelatedObject] = useState(null);
  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  const sobjectId = sobjectType && getSalesforceIdFromPathOtherObjects(currentPage, sobjectType);

  const { data } = useSWR(sobjectType && sobjectId && `/sobject/${sobjectId}`, () =>
    api
      .get(`/utils/service/salesforce/getBloobirdsRelatedObject/${sobjectType}/${sobjectId}`)
      .then(data => {
        return data;
      })
      .catch(() => {
        setIsLoading(false);
      }),
  );
  const refresh = (): void => {
    if (!currentPage && data) {
      setIsLoading(true);
    } else if (!sobjectId || !sobjectType) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      if (data) {
        const relatedObjectData = data?.data;
        if (relatedObjectData?.['id']) {
          setActiveBobject(relatedObjectData);
          setRelatedObject(relatedObjectData);
          openExtensionCallback?.();
        }
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage, data]);

  if (isLoading) {
    return <Loading />;
  } else if (relatedObject) {
    openExtensionCallback?.();
    return <ContactView />;
  } else {
    closeExtensionCallback?.();
    return <NoContextPage />;
  }
};
