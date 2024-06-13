export const isElementLoaded = async selector => {
  let counter = 0;
  while (document.querySelector(selector) === null && counter <= 200) {
    await new Promise(resolve => {
      requestAnimationFrame(resolve);
    });
    counter = counter + 1;
  }
  return document.querySelector(selector);
};
