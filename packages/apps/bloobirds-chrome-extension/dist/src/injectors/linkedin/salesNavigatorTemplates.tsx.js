var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/injectors/linkedin/salesNavigatorTemplates.tsx";
import __vite__cjsImport0_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport0_reactDom;
import { isElementLoaded } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { TemplateSelectorApp } from "/src/content/components/templateSelectorApp.tsx.js";
import { TemplateSelectorPlaces } from "/src/types/messagingTemplates.ts.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const selector = "#content-main article section.thread-container form > section";
const miniWindowSelector = "#message-overlay > section section[class*=_actions-container]";
const ourTemplateSelector = '*[id="bb-template-selector"]';
const miniwindowRoot = document.createElement("div");
const messagingRoot = document.createElement("div");
const renderElement = () => {
  isElementLoaded(selector).then(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.insertBefore(messagingRoot, element.firstChild);
      const parentForm = element?.parentElement.closest("form");
      ReactDOM.render(/* @__PURE__ */ _jsxDEV(TemplateSelectorApp, {
        place: TemplateSelectorPlaces.SalesNavigator,
        parentForm
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, void 0), messagingRoot);
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
        const parentForm = element?.parentElement.closest("form");
        ReactDOM.render(/* @__PURE__ */ _jsxDEV(TemplateSelectorApp, {
          place: TemplateSelectorPlaces.SalesNavigatorChat,
          parentForm
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, void 0), miniwindowRoot);
      }
    }
  });
};
export function injectSalesNavigatorTemplateSelector() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");
  renderElement();
  renderMiniWindowElement();
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        renderElement();
        renderMiniWindowElement();
      }
      const node = mutation.addedNodes.item(0);
      if (node?.className?.includes) {
        const isMiniWindow = node?.className?.includes("message-overlay") && node.nodeName === "SECTION";
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
    characterData: true
  };
  if (bodyList) {
    observer.observe(bodyList, config);
  }
}
