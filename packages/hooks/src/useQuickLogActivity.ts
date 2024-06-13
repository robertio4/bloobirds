import { useTranslation } from 'react-i18next';

import { createToast } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectId,
  BobjectTypes,
  CustomTask,
  DataModelResponse,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  MessagesEvents,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';

import { useActiveUserId } from './useActiveUser';
import { fetchLeadsByRelatedBobject } from './useBobjects';
import { useDataModel } from './useDataModel';

const quickLogModalVisibilityAtom = atom({
  key: 'quickLogModalVisibilityAtom',
  default: false,
});

const modalDataAtom = atom<QuickLogModalData>({
  key: 'modalDataAtom',
  default: null,
});

export interface QuickLogModalData {
  customTask: CustomTask;
  company?: Bobject<BobjectTypes.Company>;
  leads: Bobject<BobjectTypes.Lead>[];
  selectedBobject: Bobject | ExtensionBobject;
  companyId: BobjectId<BobjectTypes.Company>['value'];
  onSubmit?: () => void;
  onClose?: () => void;
  isEdition?: boolean;
  activity?: Bobject;
}

export const createCustomActivity = ({
  accountId,
  contents,
  callback,
}: {
  accountId: string;
  contents: unknown;
  callback: () => void;
}) =>
  api
    .post(`/bobjects/${accountId}/Activity`, {
      contents,
      params: {},
    })
    .then(callback);

export const updateCustomActivity = ({
  activity,
  contents,
  callback,
}: {
  activity: Bobject;
  contents: unknown;
  callback: () => void;
}) => api.patch(`/bobjects/${activity?.id?.value}/raw`, { contents, params: {} }).then(callback);

const prepareRequestBody = (
  dataModel: DataModelResponse,
  modalData: QuickLogModalData,
  formValues: any,
  userId: string,
) => {
  const { customTask, selectedBobject } = modalData;
  const bobjectType = selectedBobject?.id?.typeName;
  const rawBobject = 'raw' in selectedBobject ? selectedBobject?.raw : selectedBobject?.rawBobject;
  const customTaskField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const companyIdField = dataModel?.findFieldByLogicRole(
    bobjectType === BobjectTypes.Lead
      ? LEAD_FIELDS_LOGIC_ROLE.COMPANY
      : OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
  )?.id;

  return {
    ...(formValues ? formValues : {}),
    ...(selectedBobject?.id?.typeName === BobjectTypes.Company && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: selectedBobject?.id?.value,
    }),
    ...(selectedBobject?.id?.typeName === BobjectTypes.Opportunity && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: selectedBobject?.id?.value,
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: rawBobject?.[companyIdField],
    }),
    ...(selectedBobject?.id?.typeName === BobjectTypes.Lead && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: selectedBobject?.id?.value,
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: rawBobject?.[companyIdField],
    }),
    [customTaskField.id]: customTask?.id,
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
    [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: userId,
  };
};

export const useQuickLogActivity = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'quickLogModal.toasts' });
  const dataModel = useDataModel();
  const accountId = dataModel?.getAccountId();
  const userId = useActiveUserId();
  const [modalData, setModalData] = useRecoilState(modalDataAtom);
  const [isOpen, setIsOpen] = useRecoilState(quickLogModalVisibilityAtom);

  const checkForMandatoryFields = (customTask: CustomTask) => {
    const fields = customTask?.fields.filter(f => f.required);
    return fields?.length > 0;
  };

  const fillWithLeads = (modalData: {
    companyId: BobjectId<BobjectTypes.Company>['value'];
    leads: Bobject<BobjectTypes.Lead>[];
  }) => {
    if (modalData?.companyId && modalData?.leads?.length === 0) {
      return fetchLeadsByRelatedBobject(
        BobjectTypes.Company,
        modalData.companyId,
        modalData.companyId.split('/')[0],
      );
    } else {
      return Promise.resolve(modalData?.leads);
    }
  };

  const logCustomActivity = (
    modalData: QuickLogModalData,
    formValues?: any,
    callback?: () => void,
    forceLogRequest = false,
  ) => {
    const hasMandatoryFields = checkForMandatoryFields(modalData.customTask);
    const { customTask, onSubmit } = modalData;
    if (hasMandatoryFields && !forceLogRequest) {
      openQuickLogModal(modalData);
    } else {
      const contents = prepareRequestBody(dataModel, modalData, formValues, userId);
      createCustomActivity({
        accountId,
        contents,
        callback: () => {
          createToast({
            message: t('successLog', { name: customTask?.name ? customTask?.name : '' }),
            type: 'info',
          });
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: { type: BobjectTypes.Activity },
            }),
          );
          callback?.();
          onSubmit?.();
          closeQuickLogModal();
        },
      });
    }
  };

  const editCustomActivity = (
    activity: Bobject,
    modalData: QuickLogModalData,
    formValues?: any,
    callback?: () => void,
  ) => {
    const { customTask, onSubmit } = modalData;
    const contents = prepareRequestBody(dataModel, modalData, formValues, userId);
    updateCustomActivity({
      activity,
      contents,
      callback: () => {
        createToast({
          message: t('successUpdate', { name: customTask?.name ? customTask?.name : '' }),
          type: 'info',
        });
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
        onSubmit?.();
        callback?.();
      },
    });
  };

  const openQuickLogModal = (modalData: QuickLogModalData) => {
    fillWithLeads(modalData).then((res: any) => {
      setModalData({ ...modalData, leads: res?.data?.contents ? res.data.contents : res });
    });
    setIsOpen(true);
  };

  const closeQuickLogModal = () => {
    modalData?.onClose?.();
    setModalData(null);
    setIsOpen(false);
  };

  return {
    modalData,
    isOpen,
    logCustomActivity,
    editCustomActivity,
    openQuickLogModal,
    closeQuickLogModal,
    dataModel,
  };
};
