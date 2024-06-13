import { isElementLoaded } from '@bloobirds-it/utils';

import { removeQueryParam } from '../../utils/url';

const selector = '*[id$="-search-field"]';
const messageLinkedinSelector = 'a[class^="message-anywhere-button"]';
const profileActionMessageLinkedinSelector = 'div.pvs-profile-actions div.entry-point button';
const dropdownLinkedinSelector = 'div.pvs-profile-actions ul';
const sendMessageSvgSelector = "svg[data-test-icon*='send-privately']";
const dropdownItemDivSelector = 'div > div:last-child';
const layoutAsideSelector = 'aside[class^="scaffold-layout__aside"]';
const moreLinkedInButton = 'button[class*="pvs-compose-option-action__dropdown-item "]';
const messageSalesNavSelector = '[data-anchor-send-inmail]';

const injectFullName = (searchValue: string) => {
  isElementLoaded(selector).then(() => {
    const element: HTMLInputElement = document.querySelector(selector);
    if (element) {
      element.focus();
      element.value = searchValue;
      element.click();
    }
  });
};

export const clickMessageButton = () => {
  isElementLoaded(messageLinkedinSelector).then(() => {
    const aButton: HTMLAnchorElement = document.querySelector(messageLinkedinSelector);
    const hasAsideLayoutParent = aButton?.parentElement.closest(layoutAsideSelector);
    if (!hasAsideLayoutParent) {
      aButton?.click();
      removeQueryParam('bb-messaging-tab-open');
    }
  });
  isElementLoaded(profileActionMessageLinkedinSelector).then(() => {
    const aButton: HTMLAnchorElement = document.querySelector(messageLinkedinSelector);
    if (!aButton) {
      const secondaryMessageButton: HTMLAnchorElement = document.querySelector(
        profileActionMessageLinkedinSelector,
      );
      secondaryMessageButton?.click();
      removeQueryParam('bb-messaging-tab-open');
    }
  });
  isElementLoaded(dropdownLinkedinSelector).then(() => {
    const dropdown = document.querySelector(dropdownLinkedinSelector);
    if (dropdown) {
      Array.from(dropdown.children).forEach(child => {
        if (child.querySelector(sendMessageSvgSelector)) {
          (child.querySelector(dropdownItemDivSelector) as HTMLDivElement)?.click();
        }
      });
      removeQueryParam('bb-messaging-tab-open');
    }
  });
  isElementLoaded(moreLinkedInButton).then(() => {
    const aButton: HTMLAnchorElement = document.querySelector(moreLinkedInButton);
    aButton?.click();
    removeQueryParam('bb-messaging-tab-open');
  });
  isElementLoaded(messageSalesNavSelector).then(() => {
    const aButton: HTMLAnchorElement = document.querySelector(messageSalesNavSelector);
    aButton?.click();
    removeQueryParam('bb-messaging-tab-open');
  });
};

export function linkedinMessagesFromBBInjector() {
  if (window.location.host === 'www.linkedin.com') {
    const query = window.location.search.substring(1)?.split('&');
    const searchKey = query?.[0]?.split('=')?.[0];
    if (searchKey === 'bb-messaging-tab-open') {
      clickMessageButton();
    }
  }

  if (
    window.location.pathname === '/messaging/thread/new/' &&
    window.location.host === 'www.linkedin.com'
  ) {
    const query = window.location.search.substring(1)?.split('&');
    const searchKey = query?.[0]?.split('=')?.[0];

    if (searchKey === 'bbFullName') {
      const searchValue = decodeURIComponent(query[0]?.split('=')?.[1]);

      if (searchValue) {
        injectFullName(searchValue);
      }
    }
  }
}
