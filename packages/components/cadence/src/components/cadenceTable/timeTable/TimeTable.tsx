import React, { useContext, useEffect } from 'react';

import { useEventSubscription } from '@bloobirds-it/plover';
import { api, keepPreviousResponse } from '@bloobirds-it/utils';
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import useSWR from 'swr';

import { CadenceTableContext } from '../CadenceTable';
import { CadenceBobject, CadenceResponse } from '../cadenceTable.type';
import { CenterContent } from './components/CenterContent';
import { FirstColumn, LeftArrowAndFlag, RightArrowAndFlag } from './components/components';
import styles from './timeTable.module.css';

export const TimeTable = ({ bobject }: { bobject: CadenceBobject }) => {
  const { timeWindow, isFullFunctional, leadFilter, kindFilter } = useContext(CadenceTableContext);

  const { data, mutate } = useSWR(
    bobject && [
      `/bobjects/${bobject?.id?.objectId}/cadence`,
      timeWindow,
      isFullFunctional,
      kindFilter,
      leadFilter,
    ],
    () => {
      return api.post(`/bobjects/${bobject?.id?.accountId}/cadence`, {
        bobjectType: bobject?.id?.typeName,
        bobjectId: bobject?.id?.value,
        timeWindow: timeWindow,
        activityKind: kindFilter,
        startDate: isFullFunctional
          ? null
          : format(new Date().setDate(new Date().getDate() - 10), 'yyyy-MM-dd'),
        endDate: isFullFunctional
          ? null
          : format(new Date().setDate(new Date().getDate() + 10), 'yyyy-MM-dd'),
        leadIds: leadFilter,
      });
    },
    { use: [keepPreviousResponse] },
  );

  function wsCallback(wsMessage) {
    // Check if the message relatedCompany, relatedLead or relatedOpportunity is the same as the bobject or some of the relatedBobjects
    // If it is, then mutate the data
    if (!wsMessage || !bobject) return;
    if (wsMessage.operation === 'UPDATE' && Object.keys(wsMessage.changes).length === 0) {
      return;
    }

    if (
      wsMessage?.relatedLead === bobject?.id?.value ||
      wsMessage?.relatedCompany === bobject?.id?.value ||
      wsMessage?.relatedOpportunity === bobject?.id?.value
    ) {
      mutate();
    }

    if (
      bobject?.relatedBobjectIds?.some(
        relatedBobjectId =>
          relatedBobjectId === wsMessage?.relatedLead ||
          relatedBobjectId === wsMessage?.relatedCompany ||
          relatedBobjectId === wsMessage?.relatedOpportunity,
      )
    ) {
      mutate();
    }
  }

  const debouncedCallback = React.useRef(debounce(wsCallback, 1000, { leading: true })).current;

  // Generate the subscription to refresh the cadence
  useEventSubscription('data-Task', debouncedCallback);
  useEventSubscription('data-Activity', debouncedCallback);

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  const response: CadenceResponse = data?.data;

  return (
    //response?.tasks ? (
    <div className={styles.container} data-test="Timetable-Container">
      <FirstColumn />
      <div className={styles.table_content}>
        <LeftArrowAndFlag />
        <CenterContent response={response} bobject={bobject} />
        <RightArrowAndFlag />
      </div>
    </div>
    //) : (
    //<Skeleton width="100%" height={296} variant="rect" />
  );
};
