var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/linkedInScreens/leadPage.tsx", _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Text, Button, CircularBadge, Icon, Tooltip, Label } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useUserSearch, useFullSalesEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { format } from "/vendor/.vite-deps-date-fns.js__v--58ff5c6e.js";
import { LEAD_FIELDS_LOGIC_ROLE, LEAD_OPT_OUT_LOGIC_ROLE, LEAD_STAGE_LOGIC_ROLE } from "/src/constants/fields.ts.js";
import { useBuyerPersonas } from "/src/hooks/useBuyerPersonas.ts.js";
import { createBloobirdsUrl } from "/src/utils/url.ts.js";
import { BubbleWindow, BubbleWindowContent, BubbleWindowFooter, BubbleWindowHeaderCircularBadge } from "/src/content/components/bubbleWindow/bubbleWindow.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { StatusLabel } from "/src/content/components/statusLabel/statusLabel.tsx.js";
import styles from "/src/content/components/linkedInScreens/styles.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export default _s((props) => {
  _s();
  const {
    lead
  } = props;
  const {
    id,
    leadIcp,
    assignedTo,
    otherFields,
    optedOut,
    mrRating,
    highPriority,
    stage,
    prospectingStatus,
    salesStatus
  } = lead;
  const {
    t
  } = useTranslation("translation", {
    keyPrefix: "sidePeek.leadPage"
  });
  const leadUrl = createBloobirdsUrl(id);
  const hasSalesEnabled = useFullSalesEnabled(id?.accountId);
  const {
    useGetDataModel: useGetDataModel2
  } = useExtensionContext();
  const dataModel = useGetDataModel2();
  const prospectingStatusText = dataModel?.findValueById(prospectingStatus);
  const isSalesStage = dataModel?.findValueById(stage)?.logicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  const salesStatusText = dataModel?.findValueById(salesStatus);
  const status = isSalesStage ? salesStatusText : prospectingStatusText;
  const buyerPersonas = useBuyerPersonas();
  const users = useUserSearch();
  const leadUserAssignedTo = users?.users?.find((user) => user?.id === assignedTo);
  const icp = buyerPersonas?.find((bp) => bp?.id === leadIcp);
  const isOptOut = dataModel?.findValueById(optedOut)?.logicRole === LEAD_OPT_OUT_LOGIC_ROLE.YES;
  const mrRatingValue = dataModel?.findValueById(mrRating);
  const optOutTooltipText = t("optedOut");
  const onClick = () => {
    window.open(leadUrl, "_blank");
  };
  return /* @__PURE__ */ _jsxDEV(BubbleWindow, {
    children: [/* @__PURE__ */ _jsxDEV(BubbleWindowHeaderCircularBadge, {
      title: icp?.shortName || "?",
      backgroundColor: icp?.color || "var(--verySoftPeanut)",
      color: "verySoftBloobirds",
      titleColor: icp?.color ? "white" : "darkBloobirds",
      borderColor: "white"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowContent, {
      className: styles._textWrapperLeadPage,
      children: [/* @__PURE__ */ _jsxDEV("div", {
        className: styles._extraInfoContainer,
        children: [highPriority && /* @__PURE__ */ _jsxDEV(Icon, {
          size: 20,
          name: "zap",
          color: "banana"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 28
        }, void 0), mrRatingValue && /* @__PURE__ */ _jsxDEV("div", {
          className: styles._mr_rating__container,
          children: /* @__PURE__ */ _jsxDEV(Label, {
            overrideStyle: {
              backgroundColor: mrRatingValue?.backgroundColor,
              color: mrRatingValue?.textColor,
              borderColor: mrRatingValue?.outlineColor
            },
            children: mrRatingValue?.name
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._bobjectName,
        onClick,
        children: [/* @__PURE__ */ _jsxDEV(Tooltip, {
          title: optOutTooltipText,
          position: "top",
          children: /* @__PURE__ */ _jsxDEV("span", {
            className: styles._opt_out_sign,
            children: isOptOut && /* @__PURE__ */ _jsxDEV(Icon, {
              name: "slash",
              color: "tomato"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 101,
              columnNumber: 28
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "xl",
          color: "bloobirds",
          align: "center",
          dataTest: `lead-CardName`,
          children: lead?.fullName ? lead?.fullName : `${lead?.name} ${lead?.surname}`
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._statusLabel,
        children: [hasSalesEnabled ? /* @__PURE__ */ _jsxDEV(Tooltip, {
          title: isSalesStage ? t("stageSales") : t("stageProspecting"),
          position: "top",
          children: /* @__PURE__ */ _jsxDEV(Label, {
            size: "small",
            uppercase: false,
            color: isSalesStage ? "peanut" : "verySoftGrape",
            textColor: isSalesStage ? "white" : "peanut",
            overrideStyle: {
              ...{
                paddingLeft: "3px",
                paddingRight: "3px",
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0
              }
            },
            children: isSalesStage ? "Sa" : "Pr"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 111,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 110,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), /* @__PURE__ */ _jsxDEV(StatusLabel, {
          backgroundColor: status?.backgroundColor,
          color: status?.textColor,
          borderColor: status?.outlineColor,
          text: status?.name || ""
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 9
      }, void 0), leadUserAssignedTo ? /* @__PURE__ */ _jsxDEV("div", {
        className: styles._assignedToWrapper,
        children: [/* @__PURE__ */ _jsxDEV(CircularBadge, {
          size: "small",
          backgroundColor: leadUserAssignedTo?.color || "softPeanut",
          style: {
            color: "var(--white)",
            fontSize: "9px"
          },
          children: leadUserAssignedTo?.shortname || "U"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 140,
          columnNumber: 13
        }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
          size: "s",
          children: leadUserAssignedTo?.name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 11
      }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), /* @__PURE__ */ _jsxDEV("div", {
        className: styles._otherFieldsWrapper,
        children: otherFields && Object.keys(otherFields)?.length > 0 ? Object.keys(otherFields)?.map((extraField) => {
          if (!otherFields[extraField]) {
            return null;
          }
          const fieldValue = dataModel?.findValueById(otherFields[extraField])?.name;
          let value = fieldValue ? fieldValue : otherFields[extraField];
          const field = dataModel?.findFieldById(extraField);
          if (field?.logicRole === LEAD_FIELDS_LOGIC_ROLE.COMPANY) {
            value = lead?.companyName;
          }
          const fieldIcon = field?.layoutIcon;
          const fieldName = field?.name;
          const isDate = field?.fieldType === "DATE" || field?.fieldType === "DATETIME";
          return /* @__PURE__ */ _jsxDEV("div", {
            className: styles._otherFieldWrapper,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: `${fieldName}: ${value}`,
              position: "top",
              children: [fieldIcon ? /* @__PURE__ */ _jsxDEV(Icon, {
                name: fieldIcon,
                size: 16,
                color: "softPeanut"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 171,
                columnNumber: 23
              }, void 0) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false), /* @__PURE__ */ _jsxDEV(Text, {
                size: "s",
                color: "peanut",
                className: styles._otherFieldText,
                ellipsis: 30,
                children: isDate ? format(new Date(value), "PPP") : value
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 175,
                columnNumber: 21
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 169,
              columnNumber: 19
            }, void 0)
          }, extraField, false, {
            fileName: _jsxFileName,
            lineNumber: 168,
            columnNumber: 17
          }, void 0);
        }) : /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(BubbleWindowFooter, {
      children: /* @__PURE__ */ _jsxDEV(Button, {
        onClick,
        expand: true,
        children: t("viewLeadInBB")
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 188,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, void 0);
}, "iO92ImcnMdQBiHwdq1KIMCxNfI8=", false, function() {
  return [useTranslation, useFullSalesEnabled, useExtensionContext, useGetDataModel, useBuyerPersonas, useUserSearch];
});
