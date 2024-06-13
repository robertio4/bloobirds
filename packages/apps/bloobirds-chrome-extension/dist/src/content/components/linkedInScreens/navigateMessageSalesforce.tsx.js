var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/navigateMessageSalesforce.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "extension.salesforcePages.navigateMessageSalesforce"
  });
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      color: "bloobirds",
      backgroundColor: "lightBloobirds",
      name: "person"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        dataTest: "navigate-profile",
        className: styles.title,
        children: t("tryNavigating")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        color: "gray",
        size: "m",
        children: t("extraInfo")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, void 0);
}, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
