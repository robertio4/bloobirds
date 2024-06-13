export function removeScrollOfBox() {
  const salesforceBox = document.querySelector('.viewport');
  const linkedInBox = document.querySelector('.ember-application');

  const scrollableBox = salesforceBox || linkedInBox;

  if (scrollableBox) {
    const hasScroll = scrollableBox.scrollHeight > window.innerHeight;
    const header = document.querySelector('#oneHeader');
    if (hasScroll) {
      if (header) {
        header.setAttribute('style', `padding-right: 6px; background-color: white;`);
      }
      scrollableBox.setAttribute('style', `overflow: hidden; margin-right: 6px;`);
    }

    const messageOverlay = document.querySelector('#msg-overlay') as HTMLElement;
    if (messageOverlay) {
      messageOverlay.style.right = '6px';
    }
  }
}

export function recoverScrollOfBox() {
  const salesforceBox = document.querySelector('.viewport');
  const linkedInBox = document.querySelector('.ember-application');

  const scrollableBox = salesforceBox || linkedInBox;

  if (scrollableBox) {
    const header = document.querySelector('#oneHeader');
    if (header) {
      header.removeAttribute('style');
    }
    scrollableBox.removeAttribute('style');
    const messageOverlay = document.querySelector('#msg-overlay') as HTMLElement;
    if (messageOverlay) {
      messageOverlay.style.right = '0px';
    }
  }
}
