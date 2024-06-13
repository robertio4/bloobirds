import React, { useEffect } from 'react';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import {
  Bobject,
  MinimizableModal,
  MINIMIZABLE_MODALS,
  MinimizableModalType,
  MIXPANEL_EVENTS,
} from '@bloobirds-it/types';
import { api, injectReferenceFields } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import { useBaseSetEmailVariablesValues } from './useEmailVariables';
import { usePreventWindowUnload } from './usePreventWindowUnload';

const isAPP =
  ['app.dev-bloobirds.com', 'app.bloobirds.com', 'localhost'].includes(window.location.hostname) ||
  window.location.hostname.includes('bloobirds-platform-frontend.pages.dev');

const minimizableModalsAtom = atom({
  key: 'minimizableModals-old',
  default: [],
});

const confirmationModalAtom = atom({
  key: 'confirmationMinimizableModal-A',
  default: {
    open: false,
    id: null,
  },
});

const onCancelCloseAtom = atom({
  key: 'onCancelCloseAtom',
  default: { fn: null },
});

const getActivityById = async (id: string) => {
  return await api.get(`/bobjects/${id}/form?injectReferences=true`).then(response => {
    return injectReferenceFields(response?.data);
  });
};

const getContextBobject = async (id: string) => {
  const bobjectId = id;
  const bobjectType = bobjectId.split('/')?.[1];
  const objectId = bobjectId?.split('/')?.[2];
  return await api.get(`/linkedin/context/${bobjectType}/${objectId}`).then(response => {
    return response?.data;
  });
};

const filterByPrefix = (items, prefix) => {
  const keys = Object.keys(items);
  const minimizableModalsKeys = keys.filter(key => key.startsWith(prefix));

  return minimizableModalsKeys.map(key => JSON.parse(items[key]));
};

const removeModalsOnlyInStorage = (modalsToSave, modalsInStorage, onRemove) => {
  modalsInStorage.forEach(modalInStorage => {
    const modalFound = modalsToSave.find(modalToSave => modalToSave.id === modalInStorage.id);
    if (!modalFound) {
      onRemove(`${MINIMIZABLE_MODALS}_${modalInStorage.id}`);
    }
  });
};

const saveMinimizableModals = (modals: MinimizableModal<any>[]) => {
  const modalsClosed = modals.filter(modal => !modal.open);

  const modalsToSave = [];
  modalsClosed.forEach(modal => {
    modalsToSave.push({
      ...modal,
      bobject: { id: modal.bobject?.id },
      data: {
        // Only save the id of the bobject because if not we exceed the storage limit per item
        ...modal.data,
        ...(modal.data.company ? { company: { id: modal.data.company?.id } } : {}),
        ...(modal.data.lead ? { lead: { id: modal.data.lead?.id } } : {}),
        ...(modal.data.opportunity ? { opportunity: { id: modal.data.opportunity?.id } } : {}),
        ...(modal.data.leads ? { leads: {} } : {}),
        ...(modal.data.opportunities ? { opportunities: {} } : {}),
        ...(modal.data.companyContext ? { companyContext: {} } : {}),
      },
    });
  });

  modalsToSave.forEach(modal => {
    const key = `${MINIMIZABLE_MODALS}_${modal.id}`;
    const value = JSON.stringify(modal);
    if (isAPP) {
      localStorage.setItem(key, value);
    } else {
      if (chrome?.storage) {
        chrome.storage?.sync?.set({
          [key]: value,
        });
      }
    }
  });

  if (isAPP) {
    const modalsInStorage = filterByPrefix(localStorage, MINIMIZABLE_MODALS);

    const onRemoveItem = (key: string) => {
      localStorage.removeItem(key);
    };

    removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
  } else {
    if (chrome?.storage) {
      chrome.storage?.sync?.get(null, items => {
        const modalsInStorage = filterByPrefix(items, MINIMIZABLE_MODALS);

        const onRemoveItem = (key: string) => {
          chrome.storage?.sync?.remove(key);
        };

        removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
      });
    }
  }
};

const getFullMinimizableModal = async (modal: MinimizableModal<any>) => {
  if (modal.bobject?.id) {
    modal.bobject = await getActivityById(modal.bobject.id.value);
  }
  if (modal.data?.opportunity?.id) {
    const context = await getContextBobject(modal.data.opportunity.id.value);
    modal.data.opportunity = context.opportunity;
    modal.data.company = context.company;
    if (modal.type === 'email') {
      modal.data.leads = context.leads;
    }
    return modal;
  }
  if (modal.data?.lead?.id) {
    const context = await getContextBobject(modal.data.lead.id.value);
    modal.data.lead = context.lead;
    if (modal.data.companyContext) {
      modal.data.companyContext = context.company;
    } else {
      modal.data.company = context.company;
    }
    if (modal.type === 'email') {
      modal.data.leads = context.leads;
    }
    return modal;
  }
  if (modal.data?.company?.id) {
    const context = await getContextBobject(modal.data.company.id.value);
    modal.data.opportunity = context.opportunity;
    if (modal.data.companyContext) {
      modal.data.companyContext = context.company;
    } else {
      modal.data.company = context.company;
    }
    if (modal.type === 'email') {
      modal.data.leads = context.leads;
    }
    return modal;
  }
  return modal;
};

const loadFullModals = items => {
  const modals = filterByPrefix(items, MINIMIZABLE_MODALS);
  const minimizableModals = Promise.all(
    modals.map(async modal => {
      return await getFullMinimizableModal(modal);
    }),
  );
  return minimizableModals;
};

const loadMinimizableModals = () => {
  if (isAPP) {
    return loadFullModals(localStorage);
  }
  if (!chrome.storage) {
    return Promise.resolve([]);
  }
  return new Promise(resolve => {
    chrome.storage?.sync?.get(null, async items => {
      resolve(loadFullModals(items));
    });
  });
};

const useMinimizableStore = () => {
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);

  const updateMinimizableModals = (newValue, oldValue) => {
    if (newValue) {
      const newModal = JSON.parse(newValue);
      if (!minimizableModals.find(oldModal => oldModal.id === newModal.id)) {
        setMinimizableModals([newModal, ...minimizableModals]);
      } else {
        setMinimizableModals(
          minimizableModals.map(oldModal => {
            if (oldModal.id === newModal.id) {
              return newModal;
            }
            return oldModal;
          }),
        );
      }
    } else {
      const oldModal = JSON.parse(oldValue);
      setMinimizableModals(minimizableModals.filter(modal => modal.id !== oldModal.id));
    }
  };

  useEffect(() => {
    loadMinimizableModals().then(modals => {
      // @ts-ignore
      setMinimizableModals(modals);
    });
  }, [setMinimizableModals]);

  useEffect(() => {
    const onChangeChromeStorage = (changes, area) => {
      const minizableModals = Object.keys(changes).filter(key =>
        key.startsWith(MINIMIZABLE_MODALS),
      );
      if (area === 'sync' && minizableModals?.length > 0) {
        const modals = minizableModals.map(key => changes[key]);

        modals.forEach(modal => {
          updateMinimizableModals(modal.newValue, modal.oldValue);
        });
      }
    };

    const onChangeLocalStorage = ({ key, newValue, oldValue }) => {
      if (key?.startsWith(MINIMIZABLE_MODALS)) {
        updateMinimizableModals(newValue, oldValue);
      }
    };

    if (isAPP) {
      window.addEventListener('storage', onChangeLocalStorage);
    } else {
      if (chrome?.storage) {
        chrome.storage?.onChanged.addListener(onChangeChromeStorage);
      }
    }

    return () => {
      if (isAPP) {
        window.removeEventListener('storage', onChangeLocalStorage);
      } else {
        if (chrome?.storage) {
          chrome.storage?.onChanged.removeListener(onChangeChromeStorage);
        }
      }
    };
  }, [minimizableModals, setMinimizableModals]);
};

const useMinimizableModals = () => {
  const confirmationModal = useRecoilValue(confirmationModalAtom);
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);

  usePreventWindowUnload(minimizableModals?.length > 0);

  const openMinimizableModal = <T>({
    data,
    title,
    type,
    bobject,
    onSave,
    onClose,
  }: {
    data: T;
    title?: string;
    type: MinimizableModalType;
    bobject?: Bobject;
    onSave?: () => void;
    onClose?: () => void;
  }) => {
    const modal: MinimizableModal<T> = {
      id: uuid(),
      open: true,
      hasBeenMinimized: false,
      type,
      title,
      data,
      bobject,
      onSave,
      onClose,
    };
    setMinimizableModals([modal, ...minimizableModals]);
  };

  function openMinimizableModalById<T>(id: string) {
    const modal = minimizableModals.find(modal => modal.id === id);
    if (modal) {
      // Replace the modal with the same id but with open = true
      setMinimizableModals([
        ...minimizableModals.filter(modal => modal.id !== id),
        {
          ...modal,
          open: true,
        },
      ]);
    }
  }

  return {
    minimizableModals,
    openMinimizableModal,
    confirmationModal,
    openMinimizableModalById,
  };
};

const useMinimizableModal = <T extends object>(id: string) => {
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);
  const [confirmationModal, setConfirmationModal] = useRecoilState(confirmationModalAtom);
  const [onCancelCloseCallback, setOnCancelCloseCallback] = useRecoilState(onCancelCloseAtom);
  const { createToast } = useToasts();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();

  const updateMinimizableModals = React.useCallback(
    (modals: MinimizableModal<any>[]) => {
      setMinimizableModals(modals);
      saveMinimizableModals(modals);
    },
    [setMinimizableModals],
  );

  const minimizableModal: MinimizableModal<T> = minimizableModals.find(modal => modal.id === id);

  const openConfirmModal = () => {
    setConfirmationModal({
      open: true,
      id,
    });
  };

  const cancelConfirmModal = () => {
    setConfirmationModal({
      open: false,
      id: null,
    });
    if (onCancelCloseCallback) {
      onCancelCloseCallback.fn?.();
    }
  };

  return {
    ...minimizableModal,
    closeModal: () => {
      updateMinimizableModals(minimizableModals.filter(modal => modal.id !== id));
    },
    maximize: () => {
      setMinimizableModals(
        minimizableModals.map(modal => {
          if (modal.id === id) {
            setEmailVariablesValue({
              company: modal.data?.company?.rawBobject
                ? modal.data?.company?.rawBobject
                : modal.data?.company?.raw?.contents,
              lead: modal.data?.lead?.rawBobject
                ? modal.data?.lead?.rawBobject
                : modal.data?.lead?.raw?.contents,
              opportunity: modal.data?.opportunity?.rawBobject
                ? modal.data?.opportunity?.rawBobject
                : modal.data?.opportunity?.raw?.contents,
            });
            return {
              ...modal,
              open: true,
            };
          }
          return modal;
        }),
      );
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MAXIMIZE_MODAL);
    },
    minimize: <T>({ data, title, bobject }: { data?: T; title?: string; bobject?: Bobject }) => {
      if (minimizableModals.length >= 10) {
        createToast({
          message: 'You cannot minimize more than 10 windows',
          type: 'error',
        });
      } else {
        const modal: MinimizableModal<T> = {
          id,
          type: minimizableModal.type,
          open: false,
          hasBeenMinimized: true,
          title: title || minimizableModal.title,
          bobject: bobject,
          data: {
            ...minimizableModal['data'],
            ...data,
          },
        };
        updateMinimizableModals([modal, ...minimizableModals.filter(modal => modal.id !== id)]);
      }
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MINIMIZE_MODAL);
    },
    confirmationModal,
    openConfirmModal: (onCancelClose?: () => void) => {
      if (onCancelClose) {
        setOnCancelCloseCallback({ fn: () => onCancelClose() });
      }
      openConfirmModal();
    },
    cancelConfirmModal,
  };
};

export { useMinimizableModals, useMinimizableModal, useMinimizableStore };
