var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/captureLinkFailed.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s((props) => {
  _s();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.captureLinkFailed"
  });
  const {
    onRefresh
  } = props;
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      name: "alertTriangle",
      color: "banana",
      backgroundColor: "verySoftBanana"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        className: styles.title,
        children: t("title")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        color: "gray",
        size: "m",
        children: t("errorDescription")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick: onRefresh,
        expand: true,
        children: t("retryAutomatically")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, void 0);
}, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
