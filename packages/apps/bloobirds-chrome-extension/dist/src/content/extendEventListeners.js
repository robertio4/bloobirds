document.globalStore = [];
const originalAddEventListener = window.addEventListener;
window.addEventListener = (type, listener, useCapture) => {
  if (type === 'keydown') {
    document.globalStore.push({ element: this, type, listener, useCapture });
    return () => {};
  }
  return originalAddEventListener.call(this, type, listener, useCapture);
};
