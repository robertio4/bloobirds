import * as ReactDOM from 'react-dom';

import { isElementLoaded, isLinkedInProfilePage } from '@bloobirds-it/utils';

import { BuyerPersonaAffinityWrapper } from '../../content/components/buyerPersonaAffinity/buyerPersonaAffinity';

const selector = '.scaffold-layout__main';
const affinitySelector = 'bb-buyer-persona-affinity';

const renderElement = () => {
  if (isLinkedInProfilePage(window.location.href)) {
    isElementLoaded(selector).then(() => {
      const alreadyRenderedAffinity = document.querySelector('#' + affinitySelector);
      if (alreadyRenderedAffinity === null) {
        const root = document.createElement('div');
        root.id = affinitySelector;
        const parent = document.querySelector(selector);
        const firstChild = parent?.firstElementChild;
        parent?.insertBefore(root, firstChild.nextElementSibling);
        ReactDOM.render(<BuyerPersonaAffinityWrapper />, root);
      }
    });
  }
};

export function injectBuyerPersonaAffinity() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector('body');

  renderElement();
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        renderElement();
      }
      const node = mutation.addedNodes.item(0) as HTMLElement;
      if (node?.className?.includes) {
        const isInProfilePage = document.querySelector(selector);
        if (isInProfilePage) {
          setTimeout(async () => {
            renderElement();
          }, 1000);
        }
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
  };
  if (bodyList) {
    observer.observe(bodyList, config);
  }
}
