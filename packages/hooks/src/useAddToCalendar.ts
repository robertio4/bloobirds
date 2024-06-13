import { BobjectTypes } from '@bloobirds-it/types';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

const addToCalendarOpenAtom = atom({
  key: 'addToCalendarOpen',
  default: false,
});

const addToCalendarAtom = atom<{
  isOpen?: boolean;
  leadId?: string;
  opportunityId?: string;
  dateTime: Date | number;
  title: string;
  companyId?: string;
  guests?: any;
  bobjectType?: BobjectTypes;
  accountExecutiveId?: string;
  note?: string;
  duration?: number;
  successCallback?: () => void;
}>({
  key: 'addToCalendar',
  default: {
    isOpen: false,
    leadId: null,
    opportunityId: null,
    dateTime: null,
    title: null,
    companyId: null,
    guests: null,
    bobjectType: null,
    accountExecutiveId: null,
    note: null,
    duration: null,
    successCallback: () => {},
  },
});

export const useAddToCalendarVisibility = () => {
  const [addToCalendarOpen, setAddToCalendarOpen] = useRecoilState(addToCalendarOpenAtom);
  const { successCallback } = useRecoilValue(addToCalendarAtom);

  const openAddToCalendarModal = () => {
    setAddToCalendarOpen(true);
  };

  const closeAddToCalendarModal = () => {
    setAddToCalendarOpen(false);
    if (successCallback) {
      successCallback();
    }
  };

  return {
    isOpen: addToCalendarOpen,
    openAddToCalendarModal,
    closeAddToCalendarModal,
  };
};

export const useAddToCalendar = () => {
  const [addToCalendarState, setAddToCalendarState] = useRecoilState(addToCalendarAtom);
  const { closeAddToCalendarModal, openAddToCalendarModal, isOpen } = useAddToCalendarVisibility();

  return {
    addToCalendarState,
    isOpen,
    closeAddToCalendarModal,
    openAddToCalendarModal,
    setAddToCalendarState,
  };
};
