import { isElementLoaded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export const moveMsgElement = (isSidePeekOpen) => {
  const msgElementLinkedin = document.querySelector("#msg-overlay");
  if (msgElementLinkedin) {
    msgElementLinkedin.style.marginRight = isSidePeekOpen ? "33%" : "0px";
    msgElementLinkedin.style.transition = "margin-right ease 1s";
  }
};
const isSFDCFullSize = (element) => element && element.clientWidth / document.body.clientWidth > 0.8;
export const moveSFDCButtonsElement = (isSidePeekOpen, syncBBButtonsRendered) => {
  let buttonStylingApplied = false;
  const addPaddingToElement = (selector, parentElement) => {
    isElementLoaded(selector).then(() => {
      if (parentElement) {
        const element = parentElement.querySelector(selector);
        if (element && element?.clientWidth > 1e3 && !buttonStylingApplied) {
          buttonStylingApplied = true;
          element.style.paddingRight = isSidePeekOpen ? "32.5vw" : "24px";
          element.style.transition = "padding-right ease 1s";
          element.style.flexWrap = "wrap";
          const parentContainer = element.querySelector("div:first-child");
          const buttonsContainer = parentContainer.querySelector(
            "ul.branding-actions"
          );
          const leftRegion = parentElement.querySelector("div.leftRegion");
          const syncBBButtonsWidth = syncBBButtonsRendered ? 246 : 0;
          if (parentContainer && buttonsContainer) {
            if (buttonsContainer?.clientWidth + syncBBButtonsWidth > (parentElement.clientWidth - (leftRegion ? leftRegion.clientWidth : 0)) * 0.6) {
              parentContainer.style.flexDirection = isSidePeekOpen ? "column" : "row";
              parentContainer.style.gap = isSidePeekOpen ? "8px" : "0px";
              buttonsContainer.style.flexWrap = isSidePeekOpen ? "wrap" : "nowrap";
            } else {
              parentContainer.style.flexDirection = "row";
              parentContainer.style.gap = "0px";
              buttonsContainer.style.flexWrap = "nowrap";
            }
          }
        }
      }
    });
  };
  const headerSectionSelector = " div.highlights > div";
  const headerSectionSelectorConsole = "section.active div.highlights > div";
  const secondaryListHeaderSectionSelector = " div.slds-page-header";
  const secondaryListHeaderSectionSelectorConsole = "section.active div.slds-page-header";
  const tasksHeaderSectionSelector = " div.forceHighlightsStencilDesktop > div";
  const listHeaderSectionSelector = " div.forceListViewManagerHeader";
  [
    headerSectionSelector,
    headerSectionSelectorConsole,
    secondaryListHeaderSectionSelector,
    secondaryListHeaderSectionSelectorConsole,
    tasksHeaderSectionSelector,
    listHeaderSectionSelector
  ].forEach(
    (selector) => addPaddingToElement(selector, document.querySelector("div.active"))
  );
  const salesforceInterface = document.querySelector(
    "div.active section.active div.active section.active div.recordHomeFlexipage2"
  );
  if (salesforceInterface) {
    [headerSectionSelectorConsole, secondaryListHeaderSectionSelector].forEach(
      (selector) => addPaddingToElement(selector, salesforceInterface)
    );
  }
  const minimizableSFDCModals = [
    ...Array.from(document.querySelectorAll("div.DOCKED")),
    ...Array.from(document.querySelectorAll("div.MINIMIZED"))
  ];
  if (minimizableSFDCModals?.length > 0) {
    minimizableSFDCModals.forEach((element) => {
      if (element?.getBoundingClientRect()?.left > 16) {
        element.style.marginRight = isSidePeekOpen ? "32.5vw" : "0";
        element.style.marginLeft = "58px";
      }
    });
  }
  const wrappedSFDCModalsContainer = document.querySelector(
    "div.oneUtilityBarContainer div.dockingPanelOverflow"
  );
  if (wrappedSFDCModalsContainer) {
    wrappedSFDCModalsContainer.style.transform = isSidePeekOpen ? "translateX(-32.5vw)" : "none";
    wrappedSFDCModalsContainer.style.transition = "transform ease 1s";
  }
  const statusBarContainer = document.querySelector(
    "div.active div.region-subheader article > div.slds-card__body"
  );
  if (statusBarContainer && isSFDCFullSize(statusBarContainer)) {
    statusBarContainer.style.paddingRight = isSidePeekOpen ? "32.5vw" : "16px";
    statusBarContainer.style.transition = "padding-right ease 1s";
  }
  const statusBarContainerConsole = document.querySelectorAll(
    "div.active section.active article > div.slds-card__body"
  );
  if (statusBarContainerConsole?.length > 0) {
    statusBarContainerConsole.forEach((element) => {
      const isStatusBar = element.querySelector("ul.slds-path__nav");
      if (isStatusBar && isSFDCFullSize(element)) {
        element.style.paddingRight = isSidePeekOpen ? "32.5vw" : "16px";
        element.style.transition = "padding-right ease 1s";
      }
    });
  }
};
