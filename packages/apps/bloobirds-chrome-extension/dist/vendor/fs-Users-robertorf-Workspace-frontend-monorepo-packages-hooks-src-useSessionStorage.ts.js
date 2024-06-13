export const useSessionStorage = () => {
  const get = (key) => JSON.parse(sessionStorage.getItem(key));
  const set = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
  const remove = (key, subKey) => {
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
  const removeRegexKeys = (regex) => {
    for (const key in sessionStorage) {
      if (regex.test(key)) {
        sessionStorage.removeItem(key);
      }
    }
  };
  return { stored: sessionStorage, get, set, remove, removeRegexKeys };
};
