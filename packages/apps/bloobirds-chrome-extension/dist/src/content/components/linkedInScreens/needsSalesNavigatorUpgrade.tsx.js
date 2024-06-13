var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/needsSalesNavigatorUpgrade.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.salesNavUpgrade"
  });
  const openSalesNavigatorAccountUpgrade = () => {
    window.open("https://www.linkedin.com/premium/switcher/sales/", "_blank");
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      name: "alertTriangle",
      color: "banana",
      backgroundColor: "verySoftBanana"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        className: styles.title,
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        color: "gray",
        size: "m",
        children: t("needToUpgrade")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick: openSalesNavigatorAccountUpgrade,
        expand: true,
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 20,
    columnNumber: 5
  }, void 0);
}, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
