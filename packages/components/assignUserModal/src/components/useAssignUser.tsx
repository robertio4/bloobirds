import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useBobject, useSelectAll } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  BulkActions,
  ExtensionBobject,
  FIELDS_LOGIC_ROLE,
  IMPORT_THRESHOLD,
  MIXPANEL_EVENTS,
  SalesforceTabs,
  UseEveryBobjectType,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';

const useAssignUser = (bobject: Bobject | Bobject[] | ExtensionBobject, accountId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const { resetSelectedItems } = useSelectAll();
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName as BobjectTypes;
  const { patchBobject, bulkPatchBobjects } = useBobject(sampleBobject?.id?.typeName, accountId);
  const { t } = useTranslation();

  const updateSingleBobject = (singleBobjectId: string, body: any) => {
    return patchBobject(singleBobjectId, body);
  };

  const updateBulkObjects = (data: object) => {
    return bulkPatchBobjects(data);
  };

  const { createToast } = useToasts();

  const prepareDataForUpdate = ({
    bobject,
    updateData,
  }: {
    bobject: Bobject[];
    updateData: any;
  }) => {
    let bobjectsData = {};

    bobject
      .map(b => b?.id?.objectId)
      .forEach(id => {
        bobjectsData = { ...bobjectsData, [id]: updateData };
      });

    return bobjectsData;
  };

  const launchQueuedBulkAction = ({ action, query, total, bobjectType, bobjectIds, contents }) => {
    const isByQuery = !!query;

    const bobjectName = t(`common.${bobjectType.toLowerCase()}`, { count: total || 0 });

    return api.post(`/bobjects/bulkAction/${isByQuery ? 'createBulkByQuery' : 'createBulk'}`, {
      importName: t('assignUserModal.importName', { total, bobjectName }),
      actionType: action,
      bobjectType,
      bobjectIds,
      ...(isByQuery
        ? {
            query,
          }
        : {}),
      contents,
    });
  };

  const handleAssign = (
    userSelectedId: string,
    onClose: () => void,
    onSave: () => void,
    subhomeTab?: SalesforceTabs,
    useEveryBobject?: UseEveryBobjectType,
  ) => {
    setIsLoading(true);
    const { isActive, total, query } = useEveryBobject || {};

    const handleSuccess = () => {
      onClose?.();
      setIsLoading(false);
      createToast({
        message: t('assignUserModal.toast.success'),
        type: 'success',
      });
      resetSelectedItems();
      onSave?.();
    };

    if (bobject) {
      const updateData =
        bobjectType == BobjectTypes.Activity
          ? { [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: userSelectedId }
          : {
              [FIELDS_LOGIC_ROLE[
                bobjectType as BobjectTypes.Company | BobjectTypes.Lead | BobjectTypes.Opportunity
              ].ASSIGNED_TO]: userSelectedId,
            };

      if (isBulkAction) {
        // Queued bulk
        if ((isActive && total >= IMPORT_THRESHOLD) || bobject?.length >= IMPORT_THRESHOLD) {
          launchQueuedBulkAction({
            action: BulkActions.UPDATE,
            total: isActive ? total : bobject?.length,
            bobjectType,
            bobjectIds:
              bobject?.length >= IMPORT_THRESHOLD ? bobject.map(bob => bob.id.value) : undefined,
            contents: updateData,
            query: bobject?.length >= IMPORT_THRESHOLD ? undefined : query ?? {},
          }).then(handleSuccess);
          mixpanel.track(
            MIXPANEL_EVENTS.REASSIGN_IMPORT_BULK_ACTION_CLICKED_ON_ +
              bobjectType.toUpperCase() +
              '_ON' +
              subhomeTab.toUpperCase() +
              '_TAB',
          );
        } else {
          updateBulkObjects(prepareDataForUpdate({ bobject, updateData })).then(handleSuccess);
          mixpanel.track(
            MIXPANEL_EVENTS.REASSIGN_BASIC_BULK_ACTION_CLICKED_ON_ +
              bobjectType.toUpperCase() +
              '_ON' +
              subhomeTab.toUpperCase() +
              '_TAB',
          );
        }
      } else {
        updateSingleBobject(bobject.id.objectId, updateData).then(handleSuccess);
      }
    }
  };

  return {
    handleAssign,
    isLoading,
  };
};

export default useAssignUser;
