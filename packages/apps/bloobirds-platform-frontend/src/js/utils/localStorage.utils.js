export const cleanLocalStorageCache = () => {
  Object.keys(window.localStorage).forEach(key => {
    if (key.startsWith('bb-')) {
      localStorage.removeItem(key);
    }
    if (key === 'recoil-persist') {
      localStorage.removeItem(key);
    }
  });
};
