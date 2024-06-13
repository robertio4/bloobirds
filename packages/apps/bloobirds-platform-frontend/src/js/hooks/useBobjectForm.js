import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useAddToCalendar } from '@bloobirds-it/hooks';
import { UserHelperKeys, BOBJECT_TYPES } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';
import { atom, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

import { companyIdUrl } from '../app/_constants/routes';
import { BobjectApi } from '../misc/api/bobject';
import { getCompanyIdFromBobject } from '../utils/bobjects.utils';
import { mutateMany } from '../utils/swr.utils';
import { useBobjectDetailsVisibility } from './useBobjectDetails';
import { useBobjectFieldGroups } from './useBobjectFieldGroups';
import { useDialerVisibility } from './useDialer';
import useDuplicateValidationModal from './useDuplicateValidationModal';
import useManageProducts from './useManageProducts';
import { useRouter } from './useRouter';
import { useUserHelpers } from './useUserHelpers';

const visibilityAtom = atom({
  key: 'bobjectFormVisibility',
  default: false,
});

const bobjectInfoAtom = atom({
  key: 'bobjectFormInfo',
  default: {
    bobject: null,
    bobjectType: null,
    mode: 'EDIT',
    additionalValues: {},
    defaultValues: {},
    onSuccess: () => {},
  },
});

export const useBobjectForm = ({ generateSections = true } = {}) => {
  const { history } = useRouter();
  const { createToast } = useToasts();
  const { setAddToCalendarState, openAddToCalendarModal } = useAddToCalendar();
  const { openDuplicateValidationModal } = useDuplicateValidationModal();
  const { cache } = useSWRConfig();

  const [bobjectInfo, setBobjectInfo] = useRecoilState(bobjectInfoAtom);
  const resetBobjectInfo = useResetRecoilState(bobjectInfoAtom);
  const {
    defaultValues,
    additionalValues,
    bobjectType,
    mode,
    bobject,
    onSuccess,
    leadToAssign,
    demoMode,
  } = bobjectInfo;
  const setIsOpen = useSetRecoilState(visibilityAtom);
  const companyBobjectId =
    bobject && bobjectType !== 'Product' ? getCompanyIdFromBobject(bobject) : null;
  const { openProductsModal } = useManageProducts();
  const helpers = useUserHelpers();

  const { loading, sections } = useBobjectFieldGroups({
    bobject,
    bobjectType,
    companyBobjectId,
    generateSections,
    modalId: undefined,
  });

  const openCalendarModal = (values, saveBobjectType) => {
    if (saveBobjectType === BOBJECT_TYPES.TASK) {
      setAddToCalendarState({
        dateTime: values.TASK__SCHEDULED_DATETIME || new Date(),
        title: values.TASK__TITLE,
        leadId: values.TASK__LEAD,
        companyId: values.TASK__COMPANY,
        bobjectType: saveBobjectType,
        successCallback: onSuccess,
      });
      openAddToCalendarModal();
    }
  };

  const shouldOpenCalendar = (values, saveMode, saveBobjectType) => {
    if (saveMode !== 'CREATE') {
      return false;
    }
    return saveBobjectType === BOBJECT_TYPES.TASK;
  };

  const basicSaveBobject = async (
    values,
    saveAdditionalValues,
    saveMode,
    saveBobjectType,
    saveOptions = {},
  ) => {
    const params = { duplicateValidation: true };
    const rawContents = { ...saveAdditionalValues, ...values };
    const contents = Object.keys(rawContents)
      .filter(field => !field.includes('_FROM_COMPANY'))
      .filter(field => (bobjectType === 'Product' ? rawContents[field] !== 'create-new' : true))
      .reduce((obj, key) => {
        obj[key] = rawContents[key];
        return obj;
      }, {});
    const data = { contents, params };
    const bobjectApi = BobjectApi.request().bobjectType(saveBobjectType);
    let response;
    if (saveMode === 'EDIT') {
      response = await bobjectApi.partialSet({ bobjectId: bobject?.id.objectId, data });
    } else if (saveMode === 'CREATE') {
      response = await bobjectApi.create(data);
    }

    if (saveOptions?.type === 'Meeting') {
      setTimeout(() => {
        const companyFields = saveOptions?.company
          ? Object.keys(rawContents).filter(field => field.includes('_FROM_COMPANY'))
          : undefined;
        if (companyFields?.length > 0) {
          const companyContents = companyFields.reduce((obj, key) => {
            obj[key.replace('_FROM_COMPANY', '')] = rawContents[key];
            return obj;
          }, {});
          const companyData = { contents: companyContents, params };
          BobjectApi.request().Company().partialSet({
            bobjectId: saveOptions?.company.data.id.objectId,
            data: companyData,
          });
        }
      }, 4000);
    }

    if (saveOptions?.closeAfter) {
      setIsOpen(false);
    }

    if (response?.errorType === 'BobjectFieldDuplicatedException') {
      setBobjectInfo({ ...bobjectInfo, defaultValues: values });
      mixpanel.track(`${bobjectType}_${mode}_duplicate_detected`, {
        duplicates_found: response.duplicates,
        ...contents,
      });
      await openDuplicateValidationModal({
        currentBobjectId: bobject?.id?.value,
        duplicates: response.duplicates,
        bobjectType: saveBobjectType,
      });
      return;
    }

    mixpanel.track(`${bobjectType}_${mode}`, {
      ...contents,
    });

    if (saveOptions?.leadToAssign) {
      await BobjectApi.request()
        .Lead()
        .partialSet({
          bobjectId: saveOptions.leadToAssign,
          data: {
            LEAD__COMPANY: response?.value,
          },
        })
        .then(() => {
          createToast({ type: 'success', message: 'Lead added to new Qualified Company' });
          history.push(companyIdUrl(response?.value));
        });
      mixpanel.track(`${bobjectType}_${mode}_lead_added_to_qc`, {
        lead_id: saveOptions.leadToAssign,
        company_id: response?.value,
      });
    }

    if (shouldOpenCalendar(values, saveMode, saveBobjectType)) {
      openCalendarModal(values, saveBobjectType);
    } else if (onSuccess) {
      let config = {};

      if (response) {
        config = { response };
      } else {
        config = { bobjectToSet: bobject };
      }
      if (saveOptions?.manageProducts) {
        openProductsModal(response?.value || bobject?.id.value);
      } else {
        onSuccess(config);
      }
    }
    const isEdit = saveMode === 'EDIT';
    const message = `${saveBobjectType} ${isEdit ? 'updated' : 'created'}!`;
    createToast({ message, type: 'success' });
    if (!isEdit) {
      if (saveBobjectType === 'Company') {
        helpers.save(UserHelperKeys.CREATE_FIRST_COMPANY);
      } else if (saveBobjectType === 'Lead') {
        helpers.save(UserHelperKeys.CREATE_FIRST_LEAD);
      }
    }

    resetBobjectInfo();
  };

  const saveBobject = async (values, options = {}) => {
    await basicSaveBobject(values, additionalValues, mode, bobjectType, {
      leadToAssign,
      closeAfter: true,
      ...options,
    }).then(() => {
      mutateMany(/^.*bobjectField\/list*/, cache);
    });
  };

  return {
    defaultValues,
    sections,
    bobject,
    bobjectType,
    saveBobject,
    basicSaveBobject,
    mode,
    loading,
    bobjectInfo,
    setBobjectInfo,
    demoMode,
  };
};

export const useBobjectFormVisibility = () => {
  const { tryToCloseDialer } = useDialerVisibility();
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const [isOpen, setIsOpen] = useRecoilState(visibilityAtom);
  const setBobjectInfo = useSetRecoilState(bobjectInfoAtom);
  const resetBobjectInfo = useResetRecoilState(bobjectInfoAtom);

  const openCreateModal = ({
    bobject,
    bobjectType,
    additionalValues = {},
    defaultValues = {},
    onSuccess = () => {},
    leadToAssign,
  }) => {
    closeBobjectDetailsModal();
    setBobjectInfo({
      onSuccess,
      bobjectType,
      additionalValues,
      defaultValues,
      mode: 'CREATE',
      leadToAssign,
      bobject,
    });
    setIsOpen(true);
    tryToCloseDialer();
  };

  const openEditModal = ({ bobject, onSuccess = () => {} }) => {
    const defaultValues = bobject.fields.reduce((acc, { type, name, logicRole, value }) => {
      if (type === 'DATETIME' || type === 'DATE') {
        acc[logicRole || name] = value ? new Date(value) : null;
      } else {
        acc[logicRole || name] = value;
      }
      return acc;
    }, {});
    closeBobjectDetailsModal();
    setBobjectInfo({
      onSuccess,
      defaultValues,
      bobject,
      bobjectType: bobject.id.typeName,
      mode: 'EDIT',
    });
    setIsOpen(true);
    tryToCloseDialer();
  };

  const openWithCurrentState = () => {
    setIsOpen(true);
  };

  const openDemoMode = ({ bobjectType }) => {
    closeBobjectDetailsModal();
    setBobjectInfo({
      bobjectType,
      mode: 'CREATE',
      bobject: null,
      demoMode: true,
    });
    setIsOpen(true);
    tryToCloseDialer();
  };

  const closeBobjectForm = () => {
    setIsOpen(false);
    resetBobjectInfo();
  };

  return {
    isOpen,
    openCreateModal,
    openEditModal,
    openWithCurrentState,
    closeBobjectForm,
    openDemoMode,
  };
};
