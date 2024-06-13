import { atom, useRecoilState } from 'recoil';

const justCallVisibleAtom = atom({
  key: 'justCallDialerVisible',
  default: false,
});

const justCallPhoneNumberAtom = atom({
  key: 'justCallNumber',
  default: null,
});

export const useJustCallVisibility = () => {
  const [justCallVisible, setJustCallVisible] = useRecoilState(justCallVisibleAtom);
  const [justCallNumber, setJustCallNumber] = useRecoilState(justCallPhoneNumberAtom);

  const toggleVisibility = () => {
    setJustCallVisible(!justCallVisible);
  };

  const openJustCallDialer = phoneNumber => {
    if (phoneNumber) {
      setJustCallNumber(phoneNumber);
    }
    if (!justCallVisible) {
      setJustCallVisible(true);
    }
  };

  return {
    justCallVisible,
    justCallNumber,
    setJustCallVisible,
    toggleVisibility,
    openJustCallDialer,
  };
};
