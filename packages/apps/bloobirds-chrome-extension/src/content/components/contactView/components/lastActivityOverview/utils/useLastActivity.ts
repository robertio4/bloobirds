import { useTranslation } from 'react-i18next';

import { useCustomTasks, useDebouncedCallback } from '@bloobirds-it/hooks';
import {ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectId,
  BobjectTypes,
  ContactViewSubTab,
  MainBobjectTypes,
  TypeSearch,
} from '@bloobirds-it/types';
import { api, injectReferencesSearchProcess } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { ExtendedContext } from '../../../../../../types/extendedContext';
import { useExtensionContext } from '../../../../context';
import { useContactViewContext } from '../../../context/contactViewContext';
import { useSubscribeListeners } from '../../../hooks/useSubscribeListeners';
import { getQuery, parseLastActivity } from './lastActivity.utils';

type LeadIdsArray = BobjectId<BobjectTypes.Lead>['value'][];

const LAST_ACTIVITY_COLUMNS = [
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK,
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
];

const fetchLastActivity = async (
  bobjectIdFields: BobjectId<MainBobjectTypes>,
  leadsIds: LeadIdsArray,
  companyId?: BobjectId<BobjectTypes.Company>['value'],
  time,
) => {
  const { data } = await api.post(
    `/bobjects/${bobjectIdFields.accountId}/Activity/${TypeSearch.SEARCH}`,
    {
      ...getQuery(bobjectIdFields, leadsIds, companyId, time),
      formFields: true,
      page: 0,
      pageSize: 1,
      columns: LAST_ACTIVITY_COLUMNS,
      sort: [
        {
          field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
          direction: 'DESC',
        },
      ],
    },
  );
  return data;
};

export const useLastActivity = <T extends MainBobjectTypes>(
  bobjectId: BobjectId<T>,
  leadsIds: LeadIdsArray,
  companyId?: BobjectId<BobjectTypes.Company>['value'],
) => {
  const { setExtendedContext } = useExtensionContext();
  const { setActiveSubTab } = useContactViewContext();
  const tHook = useTranslation();
  const { data, mutate } = useSWR(
    `lastActivity/${bobjectId.value}`,
    () => {
      const time = new Date();
      return fetchLastActivity(bobjectId, leadsIds, companyId, time);
    },
    {
      revalidateOnFocus: true,
    },
  );
  const { getCustomTaskLogicRole } = useCustomTasks();

  const debouncedMutate = useDebouncedCallback(mutate, 1000, [mutate]);
  useSubscribeListeners(BobjectTypes.Activity, debouncedMutate);

  const { contents: lastActivity } = injectReferencesSearchProcess(data);
  if (!lastActivity) return null;

  const { onClick, ...parsedActivity } = parseLastActivity(
    lastActivity ?? [],
    tHook,
    getCustomTaskLogicRole,
    (extendedContext: ExtendedContext) => {
      setActiveSubTab(ContactViewSubTab.ACTIVITIES);
      setExtendedContext(extendedContext);
    },
  );

  return {
    ...parsedActivity,
    onClick,
    hasNoActivity: lastActivity?.length === 0,
  };
};
