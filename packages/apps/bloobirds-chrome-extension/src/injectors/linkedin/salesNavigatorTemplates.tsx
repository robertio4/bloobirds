import * as ReactDOM from 'react-dom';

import { isElementLoaded } from '@bloobirds-it/utils';

import { TemplateSelectorApp } from '../../content/components/templateSelectorApp';
import { TemplateSelectorPlaces } from '../../types/messagingTemplates';

const selector = '#content-main article section.thread-container form > section';
const miniWindowSelector =
  '#message-overlay > section > div.flex.full-height.overflow-hidden.relative > section > div.p0.flex.flex-column.flex-grow-1.flex-shrink-zero.overflow-hidden.container-with-shadow.mh4.mb4 > form.flex.flex-column.flex-grow-1.overflow-hidden > section';
const ourTemplateSelector = '*[id="bb-template-selector"]';
const miniwindowRoot = document.createElement('div');
const messagingRoot = document.createElement('div');

const renderElement = () => {
  isElementLoaded(selector).then(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.insertBefore(messagingRoot, element.firstChild);
      const parentForm = element?.parentElement.closest('form');
      ReactDOM.render(
        <TemplateSelectorApp
          place={TemplateSelectorPlaces.SalesNavigator}
          parentForm={parentForm}
        />,
        messagingRoot,
      );
    }
  });
};

const renderMiniWindowElement = () => {
  isElementLoaded(miniWindowSelector).then(() => {
    const element = document.querySelector(miniWindowSelector);
    if (element) {
      const alreadyRenderedButton = element.querySelector(ourTemplateSelector);
      if (!alreadyRenderedButton) {
        element.insertBefore(miniwindowRoot, element.firstChild);
        const parentForm = element?.parentElement.closest('form');
        ReactDOM.render(
          <TemplateSelectorApp
            place={TemplateSelectorPlaces.SalesNavigatorChat}
            parentForm={parentForm}
          />,
          miniwindowRoot,
        );
      }
    }
  });
};

export function injectSalesNavigatorTemplateSelector() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector('body');

  renderElement();
  renderMiniWindowElement();
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        renderElement();
        renderMiniWindowElement();
      }
      const node = mutation.addedNodes.item(0) as HTMLElement;
      if (node?.className?.includes) {
        const isMiniWindow =
          node?.className?.includes('message-overlay') && node.nodeName === 'SECTION';
        if (isMiniWindow) {
          renderMiniWindowElement();
        }
      }
    });
  });

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };

  if (bodyList) {
    observer.observe(bodyList, config);
  }
}
