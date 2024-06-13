var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/multipleCompaniesPage/multipleCompaniesPage.tsx", _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCreationForm } from "/src/hooks/useCreationForm.ts.js";
import { MultipleBobjectsLayout } from "/src/content/components/linkedInScreens/multipleBobjectsLayout.tsx.js";
import { CreateItHereCallToAction } from "/src/content/components/linkedInScreens/multipleLeadsPage.tsx.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s((props) => {
  _s();
  const {
    companies,
    setCurrentCompany,
    setExactMatch,
    dataToUpdate
  } = props;
  const {
    setCreateLead
  } = useCreationForm();
  const searchValueController = useState();
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.multipleCompaniesPage"
  });
  return /* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout, {
    children: [/* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout.Header, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout.List, {
      bobjects: companies || [],
      itemExtraProps: {
        setCurrentBobject: (bobject) => setCurrentCompany(bobject),
        setExactMatch,
        dataToUpdate
      },
      searchValueController
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(MultipleBobjectsLayout.Footer, {
      children: /* @__PURE__ */ _jsxDEV(_Fragment, {
        children: [/* @__PURE__ */ _jsxDEV(CreateItHereCallToAction, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
          expand: true,
          onClick: () => setCreateLead(true),
          children: t("footerButtonText")
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 11
        }, void 0)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
}, "eK7HSkViclKHY/TLXt6nsBlrryY=", false, function() {
  return [useCreationForm, useTranslation];
});
