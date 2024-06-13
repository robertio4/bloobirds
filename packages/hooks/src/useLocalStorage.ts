export const useLocalStorage = () => {
  const get = (key: string) => JSON.parse(localStorage.getItem(key));

  const set = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

  const remove = (key: string, subKey?: string) => {
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

  const removeRegexKeys = (regex: any) => {
    for (const key in localStorage) {
      if (regex.test(key)) {
        localStorage.removeItem(key);
      }
    }
  };

  return { stored: localStorage, get, set, remove, removeRegexKeys };
};
