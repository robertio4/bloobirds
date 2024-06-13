var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/navigateMessage.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { isSalesNavigatorPage } from "/src/utils/url.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeader } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s(() => {
  _s();
  const currentPage = window.location.href;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.navigateToProfileScreen"
  });
  const onClick = () => {
    if (isSalesNavigatorPage(currentPage)) {
      window.location.href = "https://www.linkedin.com/sales/people/ACoAAAAXlqkB5KpvOFPAIdD7o-AsA3KQzzACplU,name,Uqkq";
    } else {
      window.location.href = "https://linkedin.com/in/tonipereznavarro";
    }
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeader, {
      color: "bloobirds",
      backgroundColor: "lightBloobirds",
      name: "person"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapper,
      children: [/* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        dataTest: "navigate-profile",
        className: styles.title,
        children: ["\u{1F449} ", t("tryProfile")]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
        align: "center",
        color: "gray",
        size: "m",
        children: t("captureInfo")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick,
        expand: true,
        children: t("viewExample")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, void 0);
}, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
