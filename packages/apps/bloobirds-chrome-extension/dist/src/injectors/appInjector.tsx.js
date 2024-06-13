var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/injectors/appInjector.tsx";
import __vite__cjsImport0_reactDom from "/vendor/.vite-deps-react-dom.js__v--47a99a8e.js"; const ReactDOM = __vite__cjsImport0_reactDom;
import App from "/src/content/components/app.tsx.js";
import { isLinkedinOrSalesNav } from "/src/utils/url.ts.js";
import { linkedinMessagesFromBBInjector } from "/src/injectors/linkedin/linkedinMessagesFromBBInjector.tsx.js";
import { injectLinkedInTemplateSelector } from "/src/injectors/linkedin/linkedinTemplatesInjector.tsx.js";
import { injectSalesNavigatorTemplateSelector } from "/src/injectors/linkedin/salesNavigatorTemplates.tsx.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
function injectApp() {
  if (window.location.hostname === "localhost") {
    if (window.location.port === "3000") {
      return;
    }
  }
  const root = document.createElement("div");
  root.setAttribute("id", "bb-root");
  document.querySelector("body").appendChild(root);
  ReactDOM.render(/* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 19
  }, this), root);
}
export function inject() {
  injectApp();
  if (isLinkedinOrSalesNav(window.location.hostname)) {
    injectLinkedInTemplateSelector();
    injectSalesNavigatorTemplateSelector();
    linkedinMessagesFromBBInjector();
  }
}
