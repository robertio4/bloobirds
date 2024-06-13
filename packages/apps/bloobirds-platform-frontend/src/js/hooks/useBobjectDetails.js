import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from './useRouter';
import { MIXPANEL_EVENTS } from '../constants/mixpanel';
import mixpanel from 'mixpanel-browser';
import { constructMixpanelCustomRoute } from '../utils/mixpanel.utils';

const bobjectDetailsOpenAtom = atom({
  key: 'bobjectDetailsOpenAtom',
  default: false,
});

const bobjectDetailsConfigAtom = atom({
  key: 'bobjectDetailsConfigAtom',
  default: {
    id: null,
    showContactButton: false,
  },
});

export const useBobjectDetailsVisibility = () => {
  const [bobjectDetailsOpen, setBobjectDetailsOpen] = useRecoilState(bobjectDetailsOpenAtom);

  const openBobjectDetailsModal = () => {
    if (!bobjectDetailsOpen) {
      setBobjectDetailsOpen(true);
    }
  };

  const closeBobjectDetailsModal = () => {
    if (bobjectDetailsOpen) {
      setBobjectDetailsOpen(false);
    }
  };

  return {
    isOpen: bobjectDetailsOpen,
    openBobjectDetailsModal,
    closeBobjectDetailsModal,
  };
};
export const useBobjectDetails = () => {
  const [bobjectDetailsConfig, setBobjectDetailsConfig] = useRecoilState(bobjectDetailsConfigAtom);
  const { pathname } = useRouter();
  const {
    isOpen,
    openBobjectDetailsModal,
    closeBobjectDetailsModal,
  } = useBobjectDetailsVisibility();
  const resetBobjectDetailsConfig = useResetRecoilState(bobjectDetailsConfigAtom);

  const openBobjectDetails = config => {
    const bobjectType = config?.id?.split('/')[1];
    const pathToUse = constructMixpanelCustomRoute(pathname);
    setBobjectDetailsConfig(config);
    mixpanel.track(MIXPANEL_EVENTS.BOBJECT_DETAILS_OPENED_FOR_ + bobjectType, {
      from: `${typeof pathToUse === 'string' ? pathToUse : pathToUse?.pathname}`,
    });
    openBobjectDetailsModal();
  };

  return {
    id: bobjectDetailsConfig?.id,
    config: {
      showContactButton: bobjectDetailsConfig?.showContactButton,
    },
    isOpen,
    closeBobjectDetails: closeBobjectDetailsModal,
    openBobjectDetails,
    resetBobjectDetailsConfig,
  };
};
