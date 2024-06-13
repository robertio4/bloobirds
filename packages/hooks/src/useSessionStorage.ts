export const useSessionStorage = () => {
  const get = (key: string) => JSON.parse(sessionStorage.getItem(key));

  const set = (key: string, value: any) => sessionStorage.setItem(key, JSON.stringify(value));

  const remove = (key: string, subKey?: string) => {
    if (!subKey) {
      sessionStorage.removeItem(key);
    } else {
      const keyStored = get(key);
      if (keyStored) {
        delete keyStored[subKey];
        set(key, keyStored);
      }
    }
  };

  const removeRegexKeys = (regex: any) => {
    for (const key in sessionStorage) {
      if (regex.test(key)) {
        sessionStorage.removeItem(key);
      }
    }
  };

  return { stored: sessionStorage, get, set, remove, removeRegexKeys };
};
