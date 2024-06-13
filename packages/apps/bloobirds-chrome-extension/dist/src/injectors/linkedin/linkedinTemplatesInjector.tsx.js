var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/injectors/linkedin/linkedinTemplatesInjector.tsx";
import __vite__cjsImport0_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport0_reactDom;
import { isElementLoaded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { TemplateSelectorApp } from "/src/content/components/templateSelectorApp.tsx.js";
import { TemplateSelectorPlaces } from "/src/types/messagingTemplates.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const selector = '*[id^="msg-form-ember"] > footer > div.msg-form__left-actions.display-flex';
const premiumSelector = "footer.msg-form__footer > div.msg-form__left-actions.display-flex";
const ourTemplateSelector = '*[id="bb-template-selector"]';
const renderElementOnPremiumTab = () => {
  isElementLoaded(premiumSelector).then(() => {
    const elements = document.querySelectorAll(premiumSelector);
    elements.forEach((element) => {
      const alreadyRenderedButton = element.querySelector(ourTemplateSelector);
      if (!alreadyRenderedButton) {
        const root = document.createElement("div");
        root.style.display = "flex";
        root.style.alignItems = "center";
        root.id = "bb-template-selector";
        element.insertBefore(root, element.lastChild);
        const parentForm = element?.parentElement.closest("form");
        const bubbleContext = element?.parentElement.closest("#msg-overlay .msg-overlay-conversation-bubble:not(.msg-overlay-conversation-bubble--is-minimized)");
        ReactDOM.render(/* @__PURE__ */ _jsxDEV(TemplateSelectorApp, {
          place: !bubbleContext ? TemplateSelectorPlaces.Linkedin : TemplateSelectorPlaces.LinkedinChat,
          parentForm,
          bubbleContext
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 11
        }, void 0), root);
      }
    });
  });
};
const renderElement = () => {
  isElementLoaded(selector).then(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const alreadyRenderedButton = element.querySelector(ourTemplateSelector);
      if (!alreadyRenderedButton) {
        const root = document.createElement("div");
        root.style.display = "flex";
        root.style.alignItems = "center";
        root.id = "bb-template-selector";
        element.insertBefore(root, element.lastChild);
        const parentForm = element?.parentElement.closest("form");
        const bubbleContext = element?.parentElement.closest("#msg-overlay .msg-overlay-conversation-bubble:not(.msg-overlay-conversation-bubble--is-minimized)");
        ReactDOM.render(/* @__PURE__ */ _jsxDEV(TemplateSelectorApp, {
          place: !bubbleContext ? TemplateSelectorPlaces.Linkedin : TemplateSelectorPlaces.LinkedinChat,
          parentForm,
          bubbleContext
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 11
        }, void 0), root);
      }
    });
  });
};
export function injectLinkedInTemplateSelector() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");
  renderElement();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        renderElement();
      }
      const node = mutation.addedNodes.item(0);
      if (node?.className?.includes) {
        const isMiniWindow = node?.className?.includes("msg-overlay-conversation-bubble msg-overlay-conversation-bubble--default-inactive") || node?.className?.includes("profile-card-one-to-one__profile-link");
        if (isMiniWindow) {
          setTimeout(async () => {
            renderElement();
            renderElementOnPremiumTab();
          }, 1e3);
        }
      }
    });
  });
  const config = {
    childList: true,
    subtree: true
  };
  if (bodyList) {
    observer.observe(bodyList, config);
  }
}
