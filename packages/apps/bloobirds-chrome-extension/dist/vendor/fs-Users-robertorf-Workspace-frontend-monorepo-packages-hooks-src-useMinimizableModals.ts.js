var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"];
import { useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { MINIMIZABLE_MODALS, MIXPANEL_EVENTS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, injectReferenceFields } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport4_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport4_mixpanelBrowser.__esModule ? __vite__cjsImport4_mixpanelBrowser.default : __vite__cjsImport4_mixpanelBrowser;
import { atom, useRecoilState, useRecoilValue } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import { v4 as uuid } from "/vendor/.vite-deps-uuid.js__v--488548d2.js";
import { useBaseSetEmailVariablesValues } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useEmailVariables.ts.js";
import { usePreventWindowUnload } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-usePreventWindowUnload.ts.js";
const isAPP = ["app.dev-bloobirds.com", "app.bloobirds.com", "localhost"].includes(window.location.hostname) || window.location.hostname.includes("bloobirds-platform-frontend.pages.dev");
const minimizableModalsAtom = atom({
  key: "minimizableModals-old",
  default: []
});
const confirmationModalAtom = atom({
  key: "confirmationMinimizableModal-A",
  default: {
    open: false,
    id: null
  }
});
const onCancelCloseAtom = atom({
  key: "onCancelCloseAtom",
  default: {
    fn: null
  }
});
const getActivityById = async (id) => {
  return await api.get(`/bobjects/${id}/form?injectReferences=true`).then((response) => {
    return injectReferenceFields(response?.data);
  });
};
const getContextBobject = async (id) => {
  const bobjectId = id;
  const bobjectType = bobjectId.split("/")?.[1];
  const objectId = bobjectId?.split("/")?.[2];
  return await api.get(`/linkedin/context/${bobjectType}/${objectId}`).then((response) => {
    return response?.data;
  });
};
const filterByPrefix = (items, prefix) => {
  const keys = Object.keys(items);
  const minimizableModalsKeys = keys.filter((key) => key.startsWith(prefix));
  return minimizableModalsKeys.map((key) => JSON.parse(items[key]));
};
const removeModalsOnlyInStorage = (modalsToSave, modalsInStorage, onRemove) => {
  modalsInStorage.forEach((modalInStorage) => {
    const modalFound = modalsToSave.find((modalToSave) => modalToSave.id === modalInStorage.id);
    if (!modalFound) {
      onRemove(`${MINIMIZABLE_MODALS}_${modalInStorage.id}`);
    }
  });
};
const saveMinimizableModals = (modals) => {
  const modalsClosed = modals.filter((modal) => !modal.open);
  const modalsToSave = [];
  modalsClosed.forEach((modal) => {
    modalsToSave.push({
      ...modal,
      bobject: {
        id: modal.bobject?.id
      },
      data: {
        ...modal.data,
        ...modal.data.company ? {
          company: {
            id: modal.data.company?.id
          }
        } : {},
        ...modal.data.lead ? {
          lead: {
            id: modal.data.lead?.id
          }
        } : {},
        ...modal.data.opportunity ? {
          opportunity: {
            id: modal.data.opportunity?.id
          }
        } : {},
        ...modal.data.leads ? {
          leads: {}
        } : {},
        ...modal.data.opportunities ? {
          opportunities: {}
        } : {},
        ...modal.data.companyContext ? {
          companyContext: {}
        } : {}
      }
    });
  });
  modalsToSave.forEach((modal) => {
    const key = `${MINIMIZABLE_MODALS}_${modal.id}`;
    const value = JSON.stringify(modal);
    if (isAPP) {
      localStorage.setItem(key, value);
    } else {
      if (chrome?.storage) {
        chrome.storage?.sync?.set({
          [key]: value
        });
      }
    }
  });
  if (isAPP) {
    const modalsInStorage = filterByPrefix(localStorage, MINIMIZABLE_MODALS);
    const onRemoveItem = (key) => {
      localStorage.removeItem(key);
    };
    removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
  } else {
    if (chrome?.storage) {
      chrome.storage?.sync?.get(null, (items) => {
        const modalsInStorage = filterByPrefix(items, MINIMIZABLE_MODALS);
        const onRemoveItem = (key) => {
          chrome.storage?.sync?.remove(key);
        };
        removeModalsOnlyInStorage(modalsToSave, modalsInStorage, onRemoveItem);
      });
    }
  }
};
const getFullMinimizableModal = async (modal) => {
  if (modal.bobject?.id) {
    modal.bobject = await getActivityById(modal.bobject.id.value);
  }
  if (modal.data?.opportunity?.id) {
    const context = await getContextBobject(modal.data.opportunity.id.value);
    modal.data.opportunity = context.opportunity;
    modal.data.company = context.company;
    if (modal.type === "email") {
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
    if (modal.type === "email") {
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
    if (modal.type === "email") {
      modal.data.leads = context.leads;
    }
    return modal;
  }
  return modal;
};
const loadFullModals = (items) => {
  const modals = filterByPrefix(items, MINIMIZABLE_MODALS);
  const minimizableModals = Promise.all(modals.map(async (modal) => {
    return await getFullMinimizableModal(modal);
  }));
  return minimizableModals;
};
const loadMinimizableModals = () => {
  if (isAPP) {
    return loadFullModals(localStorage);
  }
  if (!chrome.storage) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    chrome.storage?.sync?.get(null, async (items) => {
      resolve(loadFullModals(items));
    });
  });
};
const useMinimizableStore = () => {
  _s();
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);
  const updateMinimizableModals = (newValue, oldValue) => {
    if (newValue) {
      const newModal = JSON.parse(newValue);
      if (!minimizableModals.find((oldModal) => oldModal.id === newModal.id)) {
        setMinimizableModals([newModal, ...minimizableModals]);
      } else {
        setMinimizableModals(minimizableModals.map((oldModal) => {
          if (oldModal.id === newModal.id) {
            return newModal;
          }
          return oldModal;
        }));
      }
    } else {
      const oldModal = JSON.parse(oldValue);
      setMinimizableModals(minimizableModals.filter((modal) => modal.id !== oldModal.id));
    }
  };
  useEffect(() => {
    loadMinimizableModals().then((modals) => {
      setMinimizableModals(modals);
    });
  }, [setMinimizableModals]);
  useEffect(() => {
    const onChangeChromeStorage = (changes, area) => {
      const minizableModals = Object.keys(changes).filter((key) => key.startsWith(MINIMIZABLE_MODALS));
      if (area === "sync" && minizableModals?.length > 0) {
        const modals = minizableModals.map((key) => changes[key]);
        modals.forEach((modal) => {
          updateMinimizableModals(modal.newValue, modal.oldValue);
        });
      }
    };
    const onChangeLocalStorage = ({
      key,
      newValue,
      oldValue
    }) => {
      if (key?.startsWith(MINIMIZABLE_MODALS)) {
        updateMinimizableModals(newValue, oldValue);
      }
    };
    if (isAPP) {
      window.addEventListener("storage", onChangeLocalStorage);
    } else {
      if (chrome?.storage) {
        chrome.storage?.onChanged.addListener(onChangeChromeStorage);
      }
    }
    return () => {
      if (isAPP) {
        window.removeEventListener("storage", onChangeLocalStorage);
      } else {
        if (chrome?.storage) {
          chrome.storage?.onChanged.removeListener(onChangeChromeStorage);
        }
      }
    };
  }, [minimizableModals, setMinimizableModals]);
};
_s(useMinimizableStore, "FBunBJLpKEauTE6prsCba72lO4Y=", false, function() {
  return [useRecoilState];
});
const useMinimizableModals = () => {
  _s2();
  const confirmationModal = useRecoilValue(confirmationModalAtom);
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);
  usePreventWindowUnload(minimizableModals?.length > 0);
  const openMinimizableModal = ({
    data,
    title,
    type,
    bobject,
    onSave,
    onClose
  }) => {
    const modal = {
      id: uuid(),
      open: true,
      hasBeenMinimized: false,
      type,
      title,
      data,
      bobject,
      onSave,
      onClose
    };
    setMinimizableModals([modal, ...minimizableModals]);
  };
  function openMinimizableModalById(id) {
    const modal = minimizableModals.find((modal2) => modal2.id === id);
    if (modal) {
      setMinimizableModals([...minimizableModals.filter((modal2) => modal2.id !== id), {
        ...modal,
        open: true
      }]);
    }
  }
  return {
    minimizableModals,
    openMinimizableModal,
    confirmationModal,
    openMinimizableModalById
  };
};
_s2(useMinimizableModals, "qGIFA2PTjuR6gKHsIfm50Kr6huw=", false, function() {
  return [useRecoilValue, useRecoilState, usePreventWindowUnload];
});
const useMinimizableModal = (id) => {
  _s3();
  const [minimizableModals, setMinimizableModals] = useRecoilState(minimizableModalsAtom);
  const [confirmationModal, setConfirmationModal] = useRecoilState(confirmationModalAtom);
  const [onCancelCloseCallback, setOnCancelCloseCallback] = useRecoilState(onCancelCloseAtom);
  const {
    createToast
  } = useToasts();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const updateMinimizableModals = React.useCallback((modals) => {
    setMinimizableModals(modals);
    saveMinimizableModals(modals);
  }, [setMinimizableModals]);
  const minimizableModal = minimizableModals.find((modal) => modal.id === id);
  const openConfirmModal = () => {
    setConfirmationModal({
      open: true,
      id
    });
  };
  const cancelConfirmModal = () => {
    setConfirmationModal({
      open: false,
      id: null
    });
    if (onCancelCloseCallback) {
      onCancelCloseCallback.fn?.();
    }
  };
  return {
    ...minimizableModal,
    closeModal: () => {
      updateMinimizableModals(minimizableModals.filter((modal) => modal.id !== id));
    },
    maximize: () => {
      setMinimizableModals(minimizableModals.map((modal) => {
        if (modal.id === id) {
          setEmailVariablesValue({
            company: modal.data?.company?.rawBobject ? modal.data?.company?.rawBobject : modal.data?.company?.raw?.contents,
            lead: modal.data?.lead?.rawBobject ? modal.data?.lead?.rawBobject : modal.data?.lead?.raw?.contents,
            opportunity: modal.data?.opportunity?.rawBobject ? modal.data?.opportunity?.rawBobject : modal.data?.opportunity?.raw?.contents
          });
          return {
            ...modal,
            open: true
          };
        }
        return modal;
      }));
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MAXIMIZE_MODAL);
    },
    minimize: ({
      data,
      title,
      bobject
    }) => {
      if (minimizableModals.length >= 10) {
        createToast({
          message: "You cannot minimize more than 10 windows",
          type: "error"
        });
      } else {
        const modal = {
          id,
          type: minimizableModal.type,
          open: false,
          hasBeenMinimized: true,
          title: title || minimizableModal.title,
          bobject,
          data: {
            ...minimizableModal["data"],
            ...data
          }
        };
        updateMinimizableModals([modal, ...minimizableModals.filter((modal2) => modal2.id !== id)]);
      }
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MINIMIZE_MODAL);
    },
    confirmationModal,
    openConfirmModal: (onCancelClose) => {
      if (onCancelClose) {
        setOnCancelCloseCallback({
          fn: () => onCancelClose()
        });
      }
      openConfirmModal();
    },
    cancelConfirmModal
  };
};
_s3(useMinimizableModal, "13img5YYVX9faon/fcqLNA30c3g=", false, function() {
  return [useRecoilState, useRecoilState, useRecoilState, useToasts, useBaseSetEmailVariablesValues];
});
export { useMinimizableModals, useMinimizableModal, useMinimizableStore };
