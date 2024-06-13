import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { createToast } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  MessagesEvents
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { useActiveUserId } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useActiveUser.ts.js";
import { fetchLeadsByRelatedBobject } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useBobjects.ts.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useDataModel.ts.js";
const quickLogModalVisibilityAtom = atom({
  key: "quickLogModalVisibilityAtom",
  default: false
});
const modalDataAtom = atom({
  key: "modalDataAtom",
  default: null
});
export const createCustomActivity = ({
  accountId,
  contents,
  callback
}) => api.post(`/bobjects/${accountId}/Activity`, {
  contents,
  params: {}
}).then(callback);
export const updateCustomActivity = ({
  activity,
  contents,
  callback
}) => api.patch(`/bobjects/${activity?.id?.value}/raw`, { contents, params: {} }).then(callback);
const prepareRequestBody = (dataModel, modalData, formValues, userId) => {
  const { customTask, selectedBobject } = modalData;
  const bobjectType = selectedBobject?.id?.typeName;
  const rawBobject = "raw" in selectedBobject ? selectedBobject?.raw : selectedBobject?.rawBobject;
  const customTaskField = dataModel?.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const companyIdField = dataModel?.findFieldByLogicRole(
    bobjectType === BobjectTypes.Lead ? LEAD_FIELDS_LOGIC_ROLE.COMPANY : OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY
  )?.id;
  return {
    ...formValues ? formValues : {},
    ...selectedBobject?.id?.typeName === BobjectTypes.Company && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: selectedBobject?.id?.value
    },
    ...selectedBobject?.id?.typeName === BobjectTypes.Opportunity && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: selectedBobject?.id?.value,
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: rawBobject?.[companyIdField]
    },
    ...selectedBobject?.id?.typeName === BobjectTypes.Lead && {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: selectedBobject?.id?.value,
      [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: rawBobject?.[companyIdField]
    },
    [customTaskField.id]: customTask?.id,
    [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK,
    [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: userId
  };
};
export const useQuickLogActivity = () => {
  const { t } = useTranslation("translation", { keyPrefix: "quickLogModal.toasts" });
  const dataModel = useDataModel();
  const accountId = dataModel?.getAccountId();
  const userId = useActiveUserId();
  const [modalData, setModalData] = useRecoilState(modalDataAtom);
  const [isOpen, setIsOpen] = useRecoilState(quickLogModalVisibilityAtom);
  const checkForMandatoryFields = (customTask) => {
    const fields = customTask?.fields.filter((f) => f.required);
    return fields?.length > 0;
  };
  const fillWithLeads = (modalData2) => {
    if (modalData2?.companyId && modalData2?.leads?.length === 0) {
      return fetchLeadsByRelatedBobject(
        BobjectTypes.Company,
        modalData2.companyId,
        modalData2.companyId.split("/")[0]
      );
    } else {
      return Promise.resolve(modalData2?.leads);
    }
  };
  const logCustomActivity = (modalData2, formValues, callback, forceLogRequest = false) => {
    const hasMandatoryFields = checkForMandatoryFields(modalData2.customTask);
    const { customTask, onSubmit } = modalData2;
    if (hasMandatoryFields && !forceLogRequest) {
      openQuickLogModal(modalData2);
    } else {
      const contents = prepareRequestBody(dataModel, modalData2, formValues, userId);
      createCustomActivity({
        accountId,
        contents,
        callback: () => {
          createToast({
            message: t("successLog", { name: customTask?.name ? customTask?.name : "" }),
            type: "info"
          });
          window.dispatchEvent(
            new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
              detail: { type: BobjectTypes.Activity }
            })
          );
          callback?.();
          onSubmit?.();
          closeQuickLogModal();
        }
      });
    }
  };
  const editCustomActivity = (activity, modalData2, formValues, callback) => {
    const { customTask, onSubmit } = modalData2;
    const contents = prepareRequestBody(dataModel, modalData2, formValues, userId);
    updateCustomActivity({
      activity,
      contents,
      callback: () => {
        createToast({
          message: t("successUpdate", { name: customTask?.name ? customTask?.name : "" }),
          type: "info"
        });
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity }
          })
        );
        onSubmit?.();
        callback?.();
      }
    });
  };
  const openQuickLogModal = (modalData2) => {
    fillWithLeads(modalData2).then((res) => {
      setModalData({ ...modalData2, leads: res?.data?.contents ? res.data.contents : res });
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
    dataModel
  };
};
