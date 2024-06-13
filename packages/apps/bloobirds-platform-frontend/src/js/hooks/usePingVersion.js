import { atom, useRecoilState } from 'recoil';

const pingDataAtom = atom({
  key: 'pingDataAtom',
  default: {
    version: Math.floor(Date.now() / 1000),
    isOutdated: false,
  },
});

export const usePingVersion = () => {
  const [pingData, setPingData] = useRecoilState(pingDataAtom);
  const { version, isOutdated } = pingData;

  const setPingVersion = newVersion => {
    if (version !== newVersion) {
      setPingData({
        version: newVersion,
        isOutdated: newVersion && newVersion > version,
      });
    }
  };

  return {
    version,
    isOutdated,
    setPingVersion,
  };
};
