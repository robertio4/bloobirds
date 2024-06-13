import { useEffect } from 'react';
import { atomFamily, useRecoilState } from 'recoil';
import { ServiceApi } from '../misc/api/service';

const leadReasonsAtom = atomFamily({
  key: 'leadReasonsAtom',
  default: {
    data: {
      resource: [],
      resourceSales: [],
      list: [],
    },
    isLoaded: false,
    isFetching: false,
  },
});

const fetchLeadReasonsList = (sales: boolean) =>
  ServiceApi.request({
    url: `/service/view/field/statusReasons/Lead${sales ? '?stage=SALES' : ''}`,
    method: 'GET',
  });

export const useLeadReasons = (family: string) => {
  const [leadReasons, setLeadReasons] = useRecoilState(leadReasonsAtom(family));

  useEffect(() => {
    if (!leadReasons.isLoaded) {
      setLeadReasons({ ...leadReasons, isFetching: true });
      fetchLeadReasonsList(false).then(p_response => {
        fetchLeadReasonsList(true).then(s_response => {
          setLeadReasons({
            data: { ...leadReasons.data, resource: p_response, resourceSales: s_response },
            isLoaded: true,
            isFetching: false,
          });
        });
      });
    }
  }, [leadReasons.isLoaded]);

  const resetLeadReasonList = () =>
    setLeadReasons({
      ...leadReasons,
      ...{ data: { ...leadReasons.data, list: [] } },
    });

  const updateLeadReasons = (statusName: string, sales: boolean) => {
    const reasonsField = leadReasons.data[sales ? 'resourceSales' : 'resource'].find(
      f => f.logicRole === `LEAD__${sales ? 'SALES_' : ''}${statusName?.toUpperCase()}_REASONS`,
    );
    if (reasonsField) {
      setLeadReasons({
        ...leadReasons,
        ...{
          data: { ...leadReasons.data, list: reasonsField.fieldValues },
        },
      });
    }
  };

  return {
    leadReasons: leadReasons.data,
    resetLeadReasonList,
    updateLeadReasons,
    isLoaded: leadReasons.isLoaded,
  };
};
