export const useLocalStorage = () => {
  const get = (key) => JSON.parse(localStorage.getItem(key));
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const remove = (key, subKey) => {
    if (!subKey) {
      localStorage.removeItem(key);
    } else {
      const keyStored = get(key);
      if (keyStored) {
        delete keyStored[subKey];
        set(key, keyStored);
      }
    }
  };
  const removeRegexKeys = (regex) => {
    for (const key in localStorage) {
      if (regex.test(key)) {
        localStorage.removeItem(key);
      }
    }
  };
  return { stored: localStorage, get, set, remove, removeRegexKeys };
};
