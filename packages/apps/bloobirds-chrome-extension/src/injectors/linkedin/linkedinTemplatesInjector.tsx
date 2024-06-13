import * as ReactDOM from 'react-dom';

import { isElementLoaded } from '@bloobirds-it/utils';

import { TemplateSelectorApp } from '../../content/components/templateSelectorApp';
import { TemplateSelectorPlaces } from '../../types/messagingTemplates';

const selector = '*[id^="msg-form-ember"] > footer > div.msg-form__left-actions.display-flex';
const premiumSelector = 'footer.msg-form__footer > div.msg-form__left-actions.display-flex';
const ourTemplateSelector = '*[id="bb-template-selector"]';

const renderElementOnPremiumTab = () => {
  isElementLoaded(premiumSelector).then(() => {
    const elements = document.querySelectorAll(premiumSelector);
    elements.forEach(element => {
      const alreadyRenderedButton = element.querySelector(ourTemplateSelector);
      if (!alreadyRenderedButton) {
        const root = document.createElement('div');
        root.style.display = 'flex';
        root.style.alignItems = 'center';
        root.id = 'bb-template-selector';
        element.insertBefore(root, element.lastChild);
        const parentForm = element?.parentElement.closest('form');
        const bubbleContext: HTMLDivElement = element?.parentElement.closest(
          '#msg-overlay .msg-overlay-conversation-bubble:not(.msg-overlay-conversation-bubble--is-minimized)',
        );

        ReactDOM.render(
          <TemplateSelectorApp
            place={
              !bubbleContext ? TemplateSelectorPlaces.Linkedin : TemplateSelectorPlaces.LinkedinChat
            }
            parentForm={parentForm}
            bubbleContext={bubbleContext}
          />,
          root,
        );
      }
    });
  });
};

const renderElement = () => {
  isElementLoaded(selector).then(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const alreadyRenderedButton = element.querySelector(ourTemplateSelector);
      if (!alreadyRenderedButton) {
        const root = document.createElement('div');
        root.style.display = 'flex';
        root.style.alignItems = 'center';
        root.id = 'bb-template-selector';
        element.insertBefore(root, element.lastChild);
        const parentForm = element?.parentElement.closest('form');
        const bubbleContext: HTMLDivElement = element?.parentElement.closest(
          '#msg-overlay .msg-overlay-conversation-bubble:not(.msg-overlay-conversation-bubble--is-minimized)',
        );
        ReactDOM.render(
          <TemplateSelectorApp
            place={
              !bubbleContext ? TemplateSelectorPlaces.Linkedin : TemplateSelectorPlaces.LinkedinChat
            }
            parentForm={parentForm}
            bubbleContext={bubbleContext}
          />,
          root,
        );
      }
    });
  });
};

export function injectLinkedInTemplateSelector() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector('body');

  renderElement();
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        renderElement();
      }
      const node = mutation.addedNodes.item(0) as HTMLElement;
      if (node?.className?.includes) {
        const isMiniWindow =
          node?.className?.includes(
            'msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive',
          ) || node?.className?.includes('profile-card-one-to-one__profile-link');
        if (isMiniWindow) {
          setTimeout(async () => {
            renderElement();
            renderElementOnPremiumTab();
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
