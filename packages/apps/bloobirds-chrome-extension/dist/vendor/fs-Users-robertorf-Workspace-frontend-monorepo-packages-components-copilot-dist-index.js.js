import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"]; const useCallback = __vite__cjsImport0_react["useCallback"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useContext = __vite__cjsImport0_react["useContext"]; const createContext = __vite__cjsImport0_react["createContext"];
import { useTranslation } from '/vendor/.vite-deps-react-i18next.js__v--8418bf92.js';
import { Icon, Text, Tooltip, IconButton, Button, useToasts, Modal, ModalHeader, ModalTitle, ModalCloseIcon, ModalContent, ModalFooter, Tag, Select, Item } from '/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js';
import { useCopilotActivity, useSalesforceDataModel } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES_VALUES_LOGIC_ROLE, MIXPANEL_EVENTS, MessagesEvents, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js';
import { api, getFieldByLogicRole, getTextFromLogicRole, getReferencedBobjectFromLogicRole, getValueFromLogicRole } from '/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js';
import __vite__cjsImport6_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport6_mixpanelBrowser.__esModule ? __vite__cjsImport6_mixpanelBrowser.default : __vite__cjsImport6_mixpanelBrowser;
import useSWR, { useSWRConfig } from '/vendor/.vite-deps-swr.js__v--ed0a962e.js';
import { jsxs, jsx, Fragment } from '/vendor/id-__x00__react-jsx-runtime.js';
import clsx from '/vendor/.vite-deps-clsx.js__v--07c00239.js';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".insights-module_separator__pDNd8 {\n  margin: 8px 0 12px;\n  display: flex;\n  align-self: center;\n  width: 100%;\n  height: 1px;\n  background-color: var(--verySoftPeanut);\n}\n\n.insights-module_aiQuestions__qEieS {\n  display: flex;\n  flex-direction: column;\n  align-self: flex-start;\n  justify-content: center;\n  width: 100%;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\n.insights-module_aiQuestionsTitle__zBbwY {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px;\n  justify-content: space-between;\n}\n\n.insights-module_titleSection__dE3Lu {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.insights-module_copyToNoteButton__g8oUs{\n  gap: 4px;\n  display: flex;\n  justify-content: center;\n}\n\n.insights-module_aiQuestionsRight__3F8Ns {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  margin-left: auto;\n  gap: 8px;\n}\n\n.insights-module__showMore_button__-BeKI {\n  font-size: 10px;\n  padding-left: 0;\n}\n\n.insights-module__showMore_button__-BeKI > svg {\n  width: 12px;\n  height: 12px;\n}\n\n.insights-module_no_items__UVQJM {\n  height: 150px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.insights-module_bullet_list__-a7z1 {\n  margin-left: 12px;\n  margin-top: -4px;\n}\n\n.insights-module_content__5EpZl{\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  padding-bottom: 16px;\n  gap: 8px\n}\n\n.insights-module_point__n1VAU {\n  display: flex;\n}\n\n.insights-module_point_icon__xmt9U {\n  top: 2px;\n  position: relative;\n  display: flex;\n}\n\n.insights-module_tagGroup__s-E6Y{\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 12px 0 12px 12px;\n}\n\n.insights-module_tagContainer__pLDNH {\n\n}\n\n.insights-module_tag__KDDWl {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n\n  border-radius: 17px;\n\n  font-family: var(--fontFamily);\n  font-weight: 500;\n  font-size: 13px;\n  letter-spacing: 1px;\n  line-height: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  white-space: nowrap;\n  color: var(--peanut);\n  background-color: var(--veryLightBloobirds);\n  border: 1px solid var(--white);\n}\n\n\n.insights-module_increasedLineHeight__63Vll {\n  max-height: 56px;\n  overflow-y: scroll;\n  line-height: 18px;\n}\n";
var styles$1 = {"separator":"insights-module_separator__pDNd8","aiQuestions":"insights-module_aiQuestions__qEieS","aiQuestionsTitle":"insights-module_aiQuestionsTitle__zBbwY","titleSection":"insights-module_titleSection__dE3Lu","copyToNoteButton":"insights-module_copyToNoteButton__g8oUs","aiQuestionsRight":"insights-module_aiQuestionsRight__3F8Ns","_showMore_button":"insights-module__showMore_button__-BeKI","no_items":"insights-module_no_items__UVQJM","bullet_list":"insights-module_bullet_list__-a7z1","content":"insights-module_content__5EpZl","point":"insights-module_point__n1VAU","point_icon":"insights-module_point_icon__xmt9U","tagGroup":"insights-module_tagGroup__s-E6Y","tagContainer":"insights-module_tagContainer__pLDNH","tag":"insights-module_tag__KDDWl","increasedLineHeight":"insights-module_increasedLineHeight__63Vll"};
styleInject(css_248z$1);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var SectionTitle = function SectionTitle(_ref) {
  var activityId = _ref.activityId,
    title = _ref.title,
    copyValue = _ref.copyValue,
    _ref$buttonIcon = _ref.buttonIcon,
    buttonIcon = _ref$buttonIcon === void 0 ? 'noteAction' : _ref$buttonIcon,
    copyToNote = _ref.copyToNote;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(t('copyText.copyToClipboard')),
    _useState2 = _slicedToArray$2(_useState, 2),
    copyTooltip = _useState2[0],
    setCopyTooltip = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$2(_useState3, 2),
    copiedToNote = _useState4[0],
    setCopiedToNote = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray$2(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var onCopy = function onCopy() {
    navigator.clipboard.writeText(copyValue).then(function () {
      setCopyTooltip(t('copyText.copied'));
      setTimeout(function () {
        return setCopyTooltip(t('copyText.copyToClipboard'));
      }, 1000);
    });
  };
  var onCopyToNote = function onCopyToNote() {
    if (copyToNote) {
      setLoading(true);
      copyToNote(copyValue);
      setCopiedToNote(true);
      setLoading(false);
    } else {
      defaultCopyToNote();
    }
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_NOTE_TO_INSIGHTS);
  };
  var defaultCopyToNote = function defaultCopyToNote() {
    setLoading(true);
    api.get("/bobjects/".concat(activityId.value, "/form")).then(function (res) {
      var freshActivity = res.data;
      var currentNote = getTextFromLogicRole(freshActivity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
      var finalNote = currentNote ? currentNote + "\n\n ".concat(copyValue, " ") : copyValue;
      var activityData = _defineProperty$2({}, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE, finalNote);
      api.patch("/bobjects/".concat(activityId.value, "/raw"), activityData).then(function () {
        setLoading(false);
        setCopiedToNote(true);
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      });
    });
  };
  var tooltipText = !copiedToNote ? t('activityTimelineItem.item.copilotInsights.addToInternalNote') : t('activityTimelineItem.item.copilotInsights.addedToNote');
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.aiQuestionsTitle,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$1.titleSection,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "stars",
        color: "purple"
      }), /*#__PURE__*/jsx(Text, {
        size: "s",
        weight: "heavy",
        children: title
      })]
    }), copyValue && /*#__PURE__*/jsxs("div", {
      className: styles$1.titleSection,
      children: [/*#__PURE__*/jsx(Tooltip, {
        title: copyTooltip,
        position: "top",
        children: /*#__PURE__*/jsx(IconButton, {
          name: "copy",
          color: "purple",
          onClick: onCopy,
          size: 16
        })
      }), /*#__PURE__*/jsx(Tooltip, {
        title: tooltipText,
        position: "top",
        children: /*#__PURE__*/jsxs(Button, {
          size: "small",
          uppercase: false,
          variant: !copiedToNote ? 'IAGradient' : 'clear',
          color: !copiedToNote ? undefined : 'extraCall',
          onClick: onCopyToNote,
          disabled: loading,
          className: styles$1.copyToNoteButton,
          children: [/*#__PURE__*/jsx(Icon, {
            color: !copiedToNote ? 'purple' : 'extraCall',
            name: !copiedToNote ? buttonIcon : 'check',
            size: 16
          }), copiedToNote ? t('activityTimelineItem.item.copilotInsights.addedToNote') : t('activityTimelineItem.item.copilotInsights.addToNote')]
        })
      })]
    })]
  });
};
var CopilotSummary = function CopilotSummary(_ref2) {
  var activityId = _ref2.activityId,
    summary = _ref2.summary,
    copyToNote = _ref2.copyToNote,
    _ref2$buttonIcon = _ref2.buttonIcon,
    buttonIcon = _ref2$buttonIcon === void 0 ? 'noteAction' : _ref2$buttonIcon,
    isInPreview = _ref2.isInPreview;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var previewStyle = {
    padding: 16,
    border: '1px solid #E2E5FF',
    borderRadius: '8px'
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.aiQuestions,
    style: isInPreview ? previewStyle : undefined,
    children: [/*#__PURE__*/jsx(SectionTitle, {
      activityId: activityId,
      title: t('activityTimelineItem.item.copilotInsights.aiGeneratedNote'),
      copyValue: summary,
      copyToNote: copyToNote,
      buttonIcon: buttonIcon
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "peanut",
      className: isInPreview ? styles$1.increasedLineHeight : undefined,
      children: summary
    })]
  });
};
var TagGroup = function TagGroup(_ref3) {
  var _values$slice;
  var values = _ref3.values;
  var activeStyle = {
    backgroundColor: '#1126EA',
    color: '#FFFFFF'
  };
  var _useState7 = useState(3),
    _useState8 = _slicedToArray$2(_useState7, 2),
    showNumber = _useState8[0],
    setShowNumber = _useState8[1];
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'activityTimelineItem.item.copilotInsights'
    }),
    t = _useTranslation3.t;
  values === null || values === void 0 ? void 0 : values.sort(function (a, b) {
    if (a.active) {
      return -1;
    } else if (b.active) {
      return 1;
    } else {
      return a.text.localeCompare(b.text);
    }
  });
  var showFunction = useCallback(function () {
    if (showNumber < (values === null || values === void 0 ? void 0 : values.length)) {
      return function () {
        return setShowNumber(values === null || values === void 0 ? void 0 : values.length);
      };
    } else {
      return function () {
        return setShowNumber(3);
      };
    }
  }, [showNumber, values]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$1.tagGroup,
      children: values === null || values === void 0 ? void 0 : (_values$slice = values.slice(0, showNumber)) === null || _values$slice === void 0 ? void 0 : _values$slice.map(function (value) {
        return /*#__PURE__*/jsx("div", {
          className: styles$1.tagContainer,
          children: /*#__PURE__*/jsx("div", {
            className: styles$1.tag,
            style: value.active ? activeStyle : undefined,
            children: value.text
          })
        }, value.text);
      })
    }), values.length > 3 && /*#__PURE__*/jsx(Button, {
      className: styles$1._showMore_button,
      variant: "clear",
      size: "small",
      color: "purple",
      uppercase: false,
      iconRight: showNumber < (values === null || values === void 0 ? void 0 : values.length) ? 'chevronDown' : 'chevronUp',
      onClick: showFunction(),
      children: showNumber < (values === null || values === void 0 ? void 0 : values.length) ? t('showMore') : t('showLess')
    })]
  });
};
var DecisionInsight = function DecisionInsight(_ref4) {
  var activity = _ref4.activity,
    insight = _ref4.insight,
    insightDefinition = _ref4.insightDefinition;
  var _useSWR = useSWR("/utils/picklists/".concat(insightDefinition === null || insightDefinition === void 0 ? void 0 : insightDefinition.activityField, "/type"), function (key) {
      return api.get(key).then(function (res) {
        return res.data;
      });
    }),
    picklistField = _useSWR.data;
  var values = picklistField === null || picklistField === void 0 ? void 0 : picklistField.values.map(function (pv) {
    return {
      text: pv.value,
      active: insight === null || insight === void 0 ? void 0 : insight.choices.includes(pv.id)
    };
  });
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.aiQuestions,
    children: [/*#__PURE__*/jsx(SectionTitle, {
      title: insightDefinition === null || insightDefinition === void 0 ? void 0 : insightDefinition.title,
      activityId: activity.id
    }), values && /*#__PURE__*/jsx(TagGroup, {
      values: values
    })]
  });
};
var ExtractionInsight = function ExtractionInsight(_ref5) {
  var _insightDefinition$se;
  var activity = _ref5.activity,
    insight = _ref5.insight,
    insightDefinition = _ref5.insightDefinition;
  var values = insightDefinition === null || insightDefinition === void 0 ? void 0 : (_insightDefinition$se = insightDefinition.searchWords.split(',')) === null || _insightDefinition$se === void 0 ? void 0 : _insightDefinition$se.map(function (w) {
    return {
      text: w,
      active: insight === null || insight === void 0 ? void 0 : insight.extracted_values.includes(w)
    };
  });
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.aiQuestions,
    children: [/*#__PURE__*/jsx(SectionTitle, {
      title: insightDefinition === null || insightDefinition === void 0 ? void 0 : insightDefinition.title,
      activityId: activity.id
    }), values && /*#__PURE__*/jsx(TagGroup, {
      values: values
    })]
  });
};
var GenerationInsight = function GenerationInsight(_ref6) {
  var activity = _ref6.activity,
    insight = _ref6.insight,
    insightDefinition = _ref6.insightDefinition;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.aiQuestions,
    children: [/*#__PURE__*/jsx(SectionTitle, {
      title: insightDefinition === null || insightDefinition === void 0 ? void 0 : insightDefinition.title,
      activityId: activity.id
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "peanut",
      children: insight.generated_text
    })]
  });
};
var insightComponents = {
  DECISION: DecisionInsight,
  EXTRACTION: ExtractionInsight,
  GENERATION: GenerationInsight
};
var CopilotAnalysis = function CopilotAnalysis(_ref7) {
  var _getFieldByLogicRole, _insights$insights;
  var activity = _ref7.activity,
    onEdit = _ref7.onEdit;
  var _useCopilotActivity = useCopilotActivity(),
    insights = _useCopilotActivity.insights,
    setOverlay = _useCopilotActivity.setOverlay;
  var type = (_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole;
  var isCall = type === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL;
  var _useTranslation4 = useTranslation(),
    t = _useTranslation4.t;
  var activityType = isCall ? t('activityTimelineItem.item.call') : t('bobjectTypes.meeting');
  var goBack = function goBack() {
    setOverlay(undefined);
    if (onEdit) {
      onEdit();
    }
  };
  var _useSWR2 = useSWR('/utils/service/copilot-insights', function (key) {
      return api.get(key).then(function (res) {
        return res.data;
      });
    }),
    coreInsights = _useSWR2.data;
  return /*#__PURE__*/jsx(Fragment, {
    children: insights && /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsxs("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer'
        },
        onClick: goBack,
        children: [/*#__PURE__*/jsx(Icon, {
          name: "arrowLeft"
        }), /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "bloobirds",
          children: t('activityTimelineItem.item.copilotInsights.backTo', {
            type: activityType
          })
        })]
      }), /*#__PURE__*/jsx(CopilotSummary, {
        summary: insights === null || insights === void 0 ? void 0 : insights.summary,
        activityId: activity.id
      }), insights === null || insights === void 0 ? void 0 : (_insights$insights = insights.insights) === null || _insights$insights === void 0 ? void 0 : _insights$insights.map(function (i) {
        var Insight = insightComponents[i.insight_type];
        return /*#__PURE__*/jsx(Insight, {
          activity: activity,
          insight: i,
          insightDefinition: coreInsights === null || coreInsights === void 0 ? void 0 : coreInsights.find(function (ci) {
            return ci.versionIdentifier === i.insightId;
          })
        }, i.pk);
      })]
    })
  });
};

function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var buildSobjectUpdates = function buildSobjectUpdates(sobjectCurrentData, sfdcDataModel, crmUpdates, entity) {
  return crmUpdates === null || crmUpdates === void 0 ? void 0 : crmUpdates.reduce(function (finalUpdates, proposedUpdate) {
    var sobjectField = sfdcDataModel === null || sfdcDataModel === void 0 ? void 0 : sfdcDataModel.fields.find(function (field) {
      return field.name === proposedUpdate.name;
    });
    var currentValue = sobjectCurrentData ? sobjectCurrentData[proposedUpdate.name] : undefined;
    if (currentValue !== proposedUpdate.value) {
      finalUpdates.push({
        status: 'base',
        suggestedValue: proposedUpdate.value,
        name: proposedUpdate.name,
        label: sobjectField === null || sobjectField === void 0 ? void 0 : sobjectField.label,
        currentValue: currentValue,
        acceptedValue: undefined,
        values: sobjectField === null || sobjectField === void 0 ? void 0 : sobjectField.picklistValues.map(function (value) {
          return {
            name: value.value,
            label: value.label
          };
        }),
        objectId: sobjectCurrentData['Id'],
        entity: entity
      });
    }
    return finalUpdates;
  }, []);
};
var buildSobjectListUpdates = function buildSobjectListUpdates(sobjectCurrentData, sfdcDataModel, crmUpdates, objectMap, entity) {
  var _sobjectCurrentData$r;
  return (_sobjectCurrentData$r = sobjectCurrentData === null || sobjectCurrentData === void 0 ? void 0 : sobjectCurrentData.reduce(function (finalUpdates, sfdcObject) {
    var _objectMap$sfdcObject;
    finalUpdates[sfdcObject['Id']] = {
      updates: buildSobjectUpdates(sfdcObject, sfdcDataModel, crmUpdates, entity),
      name: (_objectMap$sfdcObject = objectMap[sfdcObject['Id']]) === null || _objectMap$sfdcObject === void 0 ? void 0 : _objectMap$sfdcObject.name,
      objectId: sfdcObject['Id']
    };
    return finalUpdates;
  }, {})) !== null && _sobjectCurrentData$r !== void 0 ? _sobjectCurrentData$r : {};
};
var sobjectArrayQuery = function sobjectArrayQuery(sobjectSuggestedFields, sobjectType, sobjectIds) {
  var _sobjectSuggestedFiel, _ref;
  var fieldNames = (_sobjectSuggestedFiel = sobjectSuggestedFields === null || sobjectSuggestedFields === void 0 ? void 0 : sobjectSuggestedFields.map(function (field) {
    return field.name;
  })) !== null && _sobjectSuggestedFiel !== void 0 ? _sobjectSuggestedFiel : [];
  return "SELECT ".concat((_ref = ['Id'].concat(_toConsumableArray$1(fieldNames))) === null || _ref === void 0 ? void 0 : _ref.join(','), " FROM ").concat(sobjectType, " WHERE Id in (").concat(sobjectIds.map(function (id) {
    return "'".concat(id, "'");
  }).join(','), ")");
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var CrmUpdatesContext = /*#__PURE__*/createContext(null);
var useBuildCRMUpdates = function useBuildCRMUpdates(activity, onUpdatesLoaded) {
  var _crmUpdates$updates, _crmUpdates$updates2, _crmUpdates$updates3, _Object$keys;
  var _useSWR = useSWR("/copilot/transcript/crm-updates/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId), function () {
      return api.get("/copilot/transcript/crm-updates/".concat(activity === null || activity === void 0 ? void 0 : activity.id.objectId)).then(function (response) {
        return response.data;
      });
    }),
    crmUpdates = _useSWR.data;
  var company = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  var lead = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  var oppIdsFieldValue = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES);
  var _useState = useState([]),
    _useState2 = _slicedToArray$1(_useState, 2),
    opportunities = _useState2[0],
    setOpportunities = _useState2[1];
  useEffect(function () {
    if ((oppIdsFieldValue === null || oppIdsFieldValue === void 0 ? void 0 : oppIdsFieldValue.length) > 0) {
      Promise.all(Array.isArray(oppIdsFieldValue) ? oppIdsFieldValue.map(function (oppId) {
        return api.get("/bobjects/".concat(oppId, "/form")).then(function (res) {
          return res.data;
        });
      }) : [api.get("/bobjects/".concat(oppIdsFieldValue, "/form")).then(function (res) {
        return res.data;
      })]).then(function (opps) {
        return setOpportunities(opps);
      });
    }
  }, [oppIdsFieldValue]);
  var accountSuggestedUpdatesFields = crmUpdates === null || crmUpdates === void 0 ? void 0 : (_crmUpdates$updates = crmUpdates.updates) === null || _crmUpdates$updates === void 0 ? void 0 : _crmUpdates$updates.filter(function (update) {
    return update.entity === 'Account';
  });
  var contactSuggestedUpdatesFields = crmUpdates === null || crmUpdates === void 0 ? void 0 : (_crmUpdates$updates2 = crmUpdates.updates) === null || _crmUpdates$updates2 === void 0 ? void 0 : _crmUpdates$updates2.filter(function (update) {
    return update.entity === 'Contact';
  });
  var opportunitySuggestedUpdatesFields = crmUpdates === null || crmUpdates === void 0 ? void 0 : (_crmUpdates$updates3 = crmUpdates.updates) === null || _crmUpdates$updates3 === void 0 ? void 0 : _crmUpdates$updates3.filter(function (update) {
    return update.entity === 'Opportunity';
  });
  var accountSfdcId = getTextFromLogicRole(company,
  // @ts-ignore
  COMPANY_FIELDS_LOGIC_ROLE.SALESFORCE_ACCOUNT_ID);
  // @ts-ignore
  var contactSfdcId = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.SALESFORCE_CONTACT_ID);
  var companyMap = accountSfdcId ? _defineProperty$1({}, accountSfdcId, {
    name: getTextFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
  }) : {};
  var leadMap = contactSfdcId ? _defineProperty$1({}, contactSfdcId, {
    name: getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)
  }) : {};
  var opportunityMap = opportunities.reduce(function (acc, opportunity) {
    var sfdcId = getTextFromLogicRole(opportunity,
    // @ts-ignore
    OPPORTUNITY_FIELDS_LOGIC_ROLE.SALESFORCE_OPPORTUNITY_ID);
    if (sfdcId) {
      acc[sfdcId] = {
        name: getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME)
      };
    }
    return acc;
  }, {});
  var _useSWR2 = useSWR(crmUpdates && accountSfdcId && "/utils/service/salesforce/query?=".concat(sobjectArrayQuery(accountSuggestedUpdatesFields, 'Account', Object.keys(companyMap))), /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", api.post(key, {
                query: sobjectArrayQuery(accountSuggestedUpdatesFields, 'Account', Object.keys(companyMap))
              }).then(function (response) {
                return response.data;
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }()),
    accountData = _useSWR2.data;
  var _useSWR3 = useSWR(crmUpdates && contactSfdcId && "/utils/service/salesforce/query?=".concat(sobjectArrayQuery(contactSuggestedUpdatesFields, 'Contact', Object.keys(leadMap))), /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(key) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", api.post(key, {
                query: sobjectArrayQuery(contactSuggestedUpdatesFields, 'Contact', Object.keys(leadMap))
              }).then(function (response) {
                return response.data;
              }));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }()),
    contactData = _useSWR3.data;
  var _useSWR4 = useSWR(crmUpdates && ((_Object$keys = Object.keys(opportunityMap || {})) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0 && "/utils/service/salesforce/query?=".concat(sobjectArrayQuery(opportunitySuggestedUpdatesFields, 'Opportunity', Object.keys(opportunityMap))), /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(key) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", api.post(key, {
                query: sobjectArrayQuery(opportunitySuggestedUpdatesFields, 'Opportunity', Object.keys(opportunityMap))
              }).then(function (response) {
                return response.data;
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }()),
    opportunitiesData = _useSWR4.data;
  var salesforceDataModel = useSalesforceDataModel();
  var _useState3 = useState({
      Account: {
        objects: {},
        loaded: false
      },
      Contact: {
        objects: {},
        loaded: false
      },
      Opportunity: {
        objects: {},
        loaded: false
      }
    }),
    _useState4 = _slicedToArray$1(_useState3, 2),
    updates = _useState4[0],
    setUpdates = _useState4[1];
  useEffect(function () {
    if (accountData && salesforceDataModel && accountSuggestedUpdatesFields && companyMap) {
      var _updates$Account;
      if (!(updates !== null && updates !== void 0 && (_updates$Account = updates.Account) !== null && _updates$Account !== void 0 && _updates$Account.loaded)) {
        var _salesforceDataModel$;
        setUpdates(_objectSpread$1(_objectSpread$1({}, updates), {}, {
          Account: {
            objects: buildSobjectListUpdates(accountData, salesforceDataModel === null || salesforceDataModel === void 0 ? void 0 : (_salesforceDataModel$ = salesforceDataModel.types) === null || _salesforceDataModel$ === void 0 ? void 0 : _salesforceDataModel$.account, accountSuggestedUpdatesFields, companyMap, 'Account'),
            loaded: true
          }
        }));
      }
    }
  }, [accountData, salesforceDataModel, accountSuggestedUpdatesFields, companyMap]);
  useEffect(function () {
    if (contactData && salesforceDataModel && contactSuggestedUpdatesFields && leadMap) {
      var _updates$Contact;
      if (!(updates !== null && updates !== void 0 && (_updates$Contact = updates.Contact) !== null && _updates$Contact !== void 0 && _updates$Contact.loaded)) {
        var _salesforceDataModel$2;
        setUpdates(_objectSpread$1(_objectSpread$1({}, updates), {}, {
          Contact: {
            objects: buildSobjectListUpdates(contactData, salesforceDataModel === null || salesforceDataModel === void 0 ? void 0 : (_salesforceDataModel$2 = salesforceDataModel.types) === null || _salesforceDataModel$2 === void 0 ? void 0 : _salesforceDataModel$2.contact, contactSuggestedUpdatesFields, leadMap, 'Contact'),
            loaded: true
          }
        }));
      }
    }
  }, [contactData, salesforceDataModel, contactSuggestedUpdatesFields, leadMap]);
  useEffect(function () {
    if (opportunitiesData && salesforceDataModel && opportunitySuggestedUpdatesFields && opportunityMap) {
      var _updates$Opportunity;
      if (!(updates !== null && updates !== void 0 && (_updates$Opportunity = updates.Opportunity) !== null && _updates$Opportunity !== void 0 && _updates$Opportunity.loaded)) {
        var _salesforceDataModel$3;
        setUpdates(_objectSpread$1(_objectSpread$1({}, updates), {}, {
          Opportunity: {
            objects: buildSobjectListUpdates(opportunitiesData, salesforceDataModel === null || salesforceDataModel === void 0 ? void 0 : (_salesforceDataModel$3 = salesforceDataModel.types) === null || _salesforceDataModel$3 === void 0 ? void 0 : _salesforceDataModel$3.opportunity, opportunitySuggestedUpdatesFields, opportunityMap, 'Opportunity'),
            loaded: true
          }
        }));
      }
    }
  }, [opportunitiesData, salesforceDataModel, opportunitySuggestedUpdatesFields, opportunityMap]);
  var totalUpdates = useMemo(function () {
    return Object.values(updates).filter(function (entity) {
      return entity.loaded;
    }).reduce(function (acc, entity) {
      return acc + Object.values(entity.objects).reduce(function (ac, object) {
        return ac + object.updates.length;
      }, 0);
    }, 0);
  }, [updates]);
  useEffect(function () {
    if (totalUpdates > 0 && onUpdatesLoaded) {
      onUpdatesLoaded(totalUpdates > 0);
    }
  }, [totalUpdates]);
  return {
    updates: updates,
    setUpdates: setUpdates,
    totalUpdates: totalUpdates,
    hasUpdates: totalUpdates > 0
  };
};
var CRMUpdatesProvider = function CRMUpdatesProvider(_ref6) {
  var activity = _ref6.activity,
    children = _ref6.children,
    onUpdatesChange = _ref6.onUpdatesChange;
  var _useBuildCRMUpdates = useBuildCRMUpdates(activity),
    updates = _useBuildCRMUpdates.updates,
    setUpdates = _useBuildCRMUpdates.setUpdates;
  useEffect(function () {
    if (onUpdatesChange) {
      onUpdatesChange(updates);
    }
  }, [updates]);
  var acceptSuggestion = function acceptSuggestion(_ref7) {
    var entity = _ref7.entity,
      objectId = _ref7.objectId,
      fieldName = _ref7.fieldName,
      value = _ref7.value;
    var field = updates[entity].objects[objectId].updates.find(function (f) {
      return f.name === fieldName;
    });
    field.status = 'accepted';
    field.acceptedValue = value;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  var discardSuggestion = function discardSuggestion(_ref8) {
    var entity = _ref8.entity,
      objectId = _ref8.objectId,
      fieldName = _ref8.fieldName;
    var field = updates[entity].objects[objectId].updates.find(function (f) {
      return f.name === fieldName;
    });
    field.status = 'discarded';
    field.acceptedValue = undefined;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  var resetSuggestion = function resetSuggestion(_ref9) {
    var entity = _ref9.entity,
      objectId = _ref9.objectId,
      fieldName = _ref9.fieldName;
    var field = updates[entity].objects[objectId].updates.find(function (f) {
      return f.name === fieldName;
    });
    field.status = 'base';
    field.acceptedValue = undefined;
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  //TODO extract and refactor when theres time
  var acceptAllSuggestions = function acceptAllSuggestions(entity) {
    if (entity) {
      var _updates$entity;
      Object.values((_updates$entity = updates[entity]) === null || _updates$entity === void 0 ? void 0 : _updates$entity.objects).forEach(function (object) {
        var _object$updates;
        return (_object$updates = object.updates) === null || _object$updates === void 0 ? void 0 : _object$updates.forEach(function (field) {
          field.status = 'accepted';
          field.acceptedValue = field.suggestedValue;
        });
      });
    } else {
      Object.values(updates).forEach(function (entityUpdates) {
        return Object.values(entityUpdates.objects).forEach(function (object) {
          var _object$updates2;
          return (_object$updates2 = object.updates) === null || _object$updates2 === void 0 ? void 0 : _object$updates2.forEach(function (field) {
            field.status = 'accepted';
            field.acceptedValue = field.suggestedValue;
          });
        });
      });
    }
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  var discardAllSuggestions = function discardAllSuggestions(entity) {
    if (entity) {
      var _updates$entity2;
      Object.values((_updates$entity2 = updates[entity]) === null || _updates$entity2 === void 0 ? void 0 : _updates$entity2.objects).forEach(function (object) {
        var _object$updates3;
        return (_object$updates3 = object.updates) === null || _object$updates3 === void 0 ? void 0 : _object$updates3.forEach(function (field) {
          field.status = 'discarded';
          field.acceptedValue = undefined;
        });
      });
    } else {
      Object.values(updates).forEach(function (entityUpdates) {
        return Object.values(entityUpdates.objects).forEach(function (object) {
          var _object$updates4;
          return (_object$updates4 = object.updates) === null || _object$updates4 === void 0 ? void 0 : _object$updates4.forEach(function (field) {
            field.status = 'discarded';
            field.acceptedValue = undefined;
          });
        });
      });
    }
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  var resetAllSuggestions = function resetAllSuggestions(entity) {
    if (entity) {
      var _updates$entity3;
      Object.values((_updates$entity3 = updates[entity]) === null || _updates$entity3 === void 0 ? void 0 : _updates$entity3.objects).forEach(function (object) {
        var _object$updates5;
        return (_object$updates5 = object.updates) === null || _object$updates5 === void 0 ? void 0 : _object$updates5.forEach(function (field) {
          field.status = 'base';
          field.acceptedValue = undefined;
        });
      });
    } else {
      Object.values(updates).forEach(function (entityUpdates) {
        return Object.values(entityUpdates.objects).forEach(function (object) {
          var _object$updates6;
          return (_object$updates6 = object.updates) === null || _object$updates6 === void 0 ? void 0 : _object$updates6.forEach(function (field) {
            field.status = 'base';
            field.acceptedValue = undefined;
          });
        });
      });
    }
    setUpdates(JSON.parse(JSON.stringify(updates)));
  };
  var value = {
    updates: updates,
    acceptSuggestion: acceptSuggestion,
    acceptAllSuggestions: acceptAllSuggestions,
    discardAllSuggestions: discardAllSuggestions,
    discardSuggestion: discardSuggestion,
    resetAllSuggestions: resetAllSuggestions,
    resetSuggestion: resetSuggestion
  };
  return /*#__PURE__*/jsx(CrmUpdatesContext.Provider, {
    value: value,
    children: children
  });
};
var useCrmUpdatesModal = function useCrmUpdatesModal() {
  var context = useContext(CrmUpdatesContext);
  if (!context) {
    throw new Error('useCrmUpdatesModal must be used within a CRMUpdatesModalProvider');
  }
  return context;
};
var withCRMUpdatesProvider = function withCRMUpdatesProvider(Component) {
  return function (_ref10) {
    var activity = _ref10.activity,
      isBubble = _ref10.isBubble;
    return /*#__PURE__*/jsx(CRMUpdatesProvider, {
      activity: activity,
      children: /*#__PURE__*/jsx(Component, {
        isBubble: isBubble
      })
    });
  };
};

var css_248z = "\n\n.crmUpdateModal-module_contentRoot__81Srs {\n  gap: 16px;\n  height: 334px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n}\n\n\n.crmUpdateModal-module_filters__TbhxI {\n  padding: 0 70px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.crmUpdateModal-module_tags__jicPe {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.crmUpdateModal-module_meetingDuration__Asgl5 > div > p {\n  white-space: nowrap;\n}\n\n.crmUpdateModal-module_descriptionContainer__2Y3bQ {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.crmUpdateModal-module_activityHeaderTitle__8whit {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex-shrink: 0;\n}\n\n.crmUpdateModal-module_footer__jCvRw{\n  padding: 24px;\n}\n\n.crmUpdateModal-module_content__M-MES{\n  padding: 24px 24px 0 24px;\n  display: flex;\n  flex-direction: column;\n}\n\n.crmUpdateModal-module_content__M-MES > div {\n  gap: 24px;\n}\n\n.crmUpdateModal-module_contentHeader__OH-lZ > li {\n  align-items: center;\n  padding: 0;\n  gap: 4px;\n  display: flex;\n  justify-content: center;\n}\n.crmUpdateModal-module_contentHeader__OH-lZ > li > div {\n  margin: 0 !important;\n  flex-direction: row !important;\n}\n\n.crmUpdateModal-module_contentLeft__96TF5{\n  display: flex;\n  flex-direction: column;\n}\n\n.crmUpdateModal-module_entitySelector__1fI5e{\n  display: flex;\n  height: 32px;\n  padding: 10px 8px;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n\n.crmUpdateModal-module_entitySelectorOpen__u-BRw {\n  border-bottom: 1px solid #1126EA;\n  border-bottom-left-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n\n\n.crmUpdateModal-module_entitySelectorNoUpdates__t8kyK > p {\n  color: var(--main-peanut-soft, #94A5B4) !important;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n\n.crmUpdateModal-module_entityTooltip__oQQCd {\n  display: block;\n}\n\n.crmUpdateModal-module_collapsibleInner__Ogsmi {\n  background: var(--extra-purple-very-soft, #E2E5FF);\n  overflow: hidden;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n\n.crmUpdateModal-module_objectSelector__6IDk0{\n  display: flex;\n  height: 24px;\n  padding: 4px 8px;\n  align-items: center;\n  gap: 10px;\n  align-self: stretch;\n  cursor: pointer;\n  background: var(--extra-purple-very-soft, #E2E5FF);\n}\n\n.crmUpdateModal-module_objectSelectorActive__F1pGh{\n  background: rgba(17, 38, 234, 0.25);\n}\n\n\n.crmUpdateModal-module_objectSelector__6IDk0:last-child{\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n\n.crmUpdateModal-module_objectSelector__6IDk0 > p {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--extra-purple, #1126EA) !important;\n  text-overflow: ellipsis;\n}\n\n.crmUpdateModal-module_objectSelectorHover__TiXHr{\n  background: rgba(17, 38, 234, 0.10);\n\n}\n\n.crmUpdateModal-module_objectSelectorHover__TiXHr > p {\n  color: var(--main-peanut-soft, #94A5B4) !important;\n}\n\n\n.crmUpdateModal-module_entitySelector__1fI5e > p {\n  font-size: 11px;\n  font-weight: 500;\n  width: 100%;\n\n}\n\n.crmUpdateModal-module_entityCounter__U2DAD{\n  display: flex;\n  width: 16px;\n  height: 16px;\n  flex-direction: column;\n  justify-content: center;\n  flex-shrink: 0;\n  color: var(--main-peanut-soft, #94A5B4);\n  background-color: #E5ECF5 ;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 8px;\n  font-weight: 700;\n  line-height: 16px; /* 200% */\n}\n\n.crmUpdateModal-module_entityCounterActive__iJKkc{\n  color: var(--extra-purple, #1126EA);\n  background-color: var(--extra-purple-light, #9AA4FF);;\n}\n\n.crmUpdateModal-module_entitySelectorActive__RWWNi{\n  border-radius: 4px;\n  background: var(--extra-purple-very-soft, #E2E5FF);\n}\n.crmUpdateModal-module_entitySelectorHover__so60r{\n  border-radius: 4px;\n  background: #E2E5FF50;\n}\n\n.crmUpdateModal-module_contentRight__BFhkX{\n  width: 100%;\n}\n\n.crmUpdateModal-module_updatesRoot__HV1h6 {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 0 80px;\n}\n\n.crmUpdateModal-module_updatesHeader__DmU95{\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n\n.crmUpdateModal-module_updatesHeaderActions__nHVMn{\n  display: flex;\n  width: 120px;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n}\n.crmUpdateModal-module_updatesHeaderText__t0UHv{\n  flex: 2;\n}\n\n.crmUpdateModal-module_suggestedUpdate__5eqyt {\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n}\n.crmUpdateModal-module_valueSelector__75vG9 {\n  display: flex;\n  flex: 1;\n}\n.crmUpdateModal-module_valueSelector__75vG9 > div{\n  flex: 1;\n}\n\n.crmUpdateModal-module_suggestedUpdateFieldName__KX26u {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.crmUpdateModal-module_suggestedUpdateRow__s3uLv {\n  display: flex;\n  align-items: center;\n  gap: 8px\n}\n\n.crmUpdateModal-module_suggestedUpdateRowSelected__Uwu1e input {\n  color: var(--extra-purple, #1126EA) !important;\n}\n.crmUpdateModal-module_suggestedUpdateRowLeft__LXPn4{\n  font-weight: 300;\n  min-width: 60px;\n  font-size: 11px;\n  text-align: end;\n}\n\n.crmUpdateModal-module_suggestedUpdateRowActions__KRkEX{\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.crmUpdateModal-module_currentValue__k3zvP {\n  width: 100%;\n  flex: 1;\n}\n\n\n.crmUpdateModal-module_updates__E115A {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 290px;\n  overflow-y: scroll;\n}\n\n.crmUpdateModal-module_updates__E115A::-webkit-scrollbar {\n  width: 0;\n}\n\n.crmUpdateModal-module_item__cj-wT{\n  display: flex;\n  gap: 4px;\n}\n\n.crmUpdateModal-module_suggestedItem__pb0H0 {\n  color: var(--extra-purple, #1126EA) !important;\n\n}\n\ninput {\n  box-shadow: none !important;\n}\n\n.crmUpdateModal-module_confirmedUpdatesList__s-Wv0 {\n  padding-bottom: 24px;\n  padding-top: 24px;\n  text-align: center;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.crmUpdateModal-module_confirmedUpdate__2MIai {\n  display: flex;\n  text-align: center;\n  font-size: 16px !important;\n  align-items: center;\n}\n\n";
var styles = {"contentRoot":"crmUpdateModal-module_contentRoot__81Srs","filters":"crmUpdateModal-module_filters__TbhxI","tags":"crmUpdateModal-module_tags__jicPe","meetingDuration":"crmUpdateModal-module_meetingDuration__Asgl5","descriptionContainer":"crmUpdateModal-module_descriptionContainer__2Y3bQ","activityHeaderTitle":"crmUpdateModal-module_activityHeaderTitle__8whit","footer":"crmUpdateModal-module_footer__jCvRw","content":"crmUpdateModal-module_content__M-MES","contentHeader":"crmUpdateModal-module_contentHeader__OH-lZ","contentLeft":"crmUpdateModal-module_contentLeft__96TF5","entitySelector":"crmUpdateModal-module_entitySelector__1fI5e","entitySelectorOpen":"crmUpdateModal-module_entitySelectorOpen__u-BRw","entitySelectorNoUpdates":"crmUpdateModal-module_entitySelectorNoUpdates__t8kyK","entityTooltip":"crmUpdateModal-module_entityTooltip__oQQCd","collapsibleInner":"crmUpdateModal-module_collapsibleInner__Ogsmi","objectSelector":"crmUpdateModal-module_objectSelector__6IDk0","objectSelectorActive":"crmUpdateModal-module_objectSelectorActive__F1pGh","objectSelectorHover":"crmUpdateModal-module_objectSelectorHover__TiXHr","entityCounter":"crmUpdateModal-module_entityCounter__U2DAD","entityCounterActive":"crmUpdateModal-module_entityCounterActive__iJKkc","entitySelectorActive":"crmUpdateModal-module_entitySelectorActive__RWWNi","entitySelectorHover":"crmUpdateModal-module_entitySelectorHover__so60r","contentRight":"crmUpdateModal-module_contentRight__BFhkX","updatesRoot":"crmUpdateModal-module_updatesRoot__HV1h6","updatesHeader":"crmUpdateModal-module_updatesHeader__DmU95","updatesHeaderActions":"crmUpdateModal-module_updatesHeaderActions__nHVMn","updatesHeaderText":"crmUpdateModal-module_updatesHeaderText__t0UHv","suggestedUpdate":"crmUpdateModal-module_suggestedUpdate__5eqyt","valueSelector":"crmUpdateModal-module_valueSelector__75vG9","suggestedUpdateFieldName":"crmUpdateModal-module_suggestedUpdateFieldName__KX26u","suggestedUpdateRow":"crmUpdateModal-module_suggestedUpdateRow__s3uLv","suggestedUpdateRowSelected":"crmUpdateModal-module_suggestedUpdateRowSelected__Uwu1e","suggestedUpdateRowLeft":"crmUpdateModal-module_suggestedUpdateRowLeft__LXPn4","suggestedUpdateRowActions":"crmUpdateModal-module_suggestedUpdateRowActions__KRkEX","currentValue":"crmUpdateModal-module_currentValue__k3zvP","updates":"crmUpdateModal-module_updates__E115A","item":"crmUpdateModal-module_item__cj-wT","suggestedItem":"crmUpdateModal-module_suggestedItem__pb0H0","confirmedUpdatesList":"crmUpdateModal-module_confirmedUpdatesList__s-Wv0","confirmedUpdate":"crmUpdateModal-module_confirmedUpdate__2MIai"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var defaultAnimationValues = {
  duration: 0.2,
  ease: 'ease-in-out'
};
var Collapsible = function Collapsible(_ref) {
  var children = _ref.children,
    open = _ref.open,
    _ref$animation = _ref.animation,
    animation = _ref$animation === void 0 ? defaultAnimationValues : _ref$animation;
  var collapsibleStyle = {
    display: 'grid',
    gridTemplateRows: open ? '1fr' : '0fr',
    opacity: open ? 1 : 0,
    transition: "all ".concat(animation.duration, "s ").concat(animation.ease)
  };
  return /*#__PURE__*/jsx("div", {
    style: collapsibleStyle,
    children: /*#__PURE__*/jsx("div", {
      style: {
        overflow: 'hidden'
      },
      children: children
    })
  });
};
var SuggestedUpdate = function SuggestedUpdate(_ref2) {
  var _values$find;
  var currentValue = _ref2.currentValue,
    suggestedValue = _ref2.suggestedValue,
    values = _ref2.values,
    name = _ref2.name,
    label = _ref2.label,
    onAccept = _ref2.onAccept,
    onDiscard = _ref2.onDiscard,
    onReset = _ref2.onReset,
    status = _ref2.status,
    entity = _ref2.entity,
    objectName = _ref2.objectName;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(suggestedValue),
    _useState2 = _slicedToArray(_useState, 2),
    selectedValue = _useState2[0],
    setSelectedValue = _useState2[1];
  var icons = {
    Account: 'company',
    Contact: 'sfdcContacts',
    Opportunity: 'sfdcOpp'
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles.suggestedUpdate,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles.suggestedUpdateFieldName,
      children: [/*#__PURE__*/jsx(Icon, {
        name: icons[entity],
        size: 16,
        color: "softPeanut"
      }), /*#__PURE__*/jsxs(Text, {
        size: "xs",
        children: [label, ' ', /*#__PURE__*/jsx(Text, {
          size: "xxs",
          inline: true,
          color: "softPeanut",
          children: "|"
        }), ' ', objectName]
      })]
    }), status !== 'accepted' && /*#__PURE__*/jsxs("div", {
      className: styles.suggestedUpdateRow,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        className: styles.suggestedUpdateRowLeft,
        children: t('crmUpdatesModal.current')
      }), /*#__PURE__*/jsx(Text, {
        size: "xs",
        className: styles.currentValue,
        children: currentValue ? values === null || values === void 0 ? void 0 : (_values$find = values.find(function (value) {
          return value.name === currentValue;
        })) === null || _values$find === void 0 ? void 0 : _values$find.label : '--None--'
      }), /*#__PURE__*/jsx("div", {
        className: styles.suggestedUpdateRowActions,
        children: status === 'discarded' && /*#__PURE__*/jsx(Tooltip, {
          title: t('crmUpdatesModal.reset'),
          position: "top",
          children: /*#__PURE__*/jsx(IconButton, {
            name: "stars",
            color: "purple",
            size: 16,
            onClick: function onClick() {
              return onReset(name);
            }
          })
        })
      })]
    }), status !== 'discarded' && /*#__PURE__*/jsxs("div", {
      className: clsx(styles.suggestedUpdateRow, _defineProperty({}, styles.suggestedUpdateRowSelected, selectedValue === suggestedValue)),
      children: [/*#__PURE__*/jsx(Text, {
        size: "xs",
        color: "softPeanut",
        className: styles.suggestedUpdateRowLeft,
        children: t('crmUpdatesModal.new')
      }), /*#__PURE__*/jsx("div", {
        className: styles.valueSelector,
        children: /*#__PURE__*/jsx(Select, {
          value: selectedValue,
          onChange: setSelectedValue,
          width: "100%",
          size: "labeled",
          renderDisplayValue: function renderDisplayValue(value) {
            var _values$find2;
            return values === null || values === void 0 ? void 0 : (_values$find2 = values.find(function (v) {
              return v.name === value;
            })) === null || _values$find2 === void 0 ? void 0 : _values$find2.label;
          }
          //@ts-ignore
          ,
          adornmentLeft: selectedValue === suggestedValue && /*#__PURE__*/jsx(Icon, {
            name: "stars",
            size: 12,
            color: "purple"
          }),
          children: values === null || values === void 0 ? void 0 : values.map(function (value) {
            return /*#__PURE__*/jsxs(Item, {
              value: value.name,
              className: clsx(styles.item, _defineProperty({}, styles.suggestedItem, suggestedValue === value.name)),
              children: [value.name === suggestedValue && /*#__PURE__*/jsx(IconButton, {
                name: "stars",
                size: 12,
                color: "purple",
                onClick: function onClick() {
                  return onReset(name);
                }
              }), value.label]
            }, value.name);
          })
        })
      }), status === 'accepted' && /*#__PURE__*/jsx(Tooltip, {
        title: t('crmUpdatesModal.reset'),
        position: "top",
        children: /*#__PURE__*/jsx(IconButton, {
          name: "refresh",
          color: "bloobirds",
          size: 18,
          onClick: function onClick() {
            return onReset(name);
          }
        })
      }), status === 'base' && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Tooltip, {
          title: t('crmUpdatesModal.acceptSuggestion'),
          position: "top",
          children: /*#__PURE__*/jsx(IconButton, {
            name: "check",
            color: "melon",
            size: 16,
            onClick: function onClick() {
              return onAccept(name, selectedValue);
            }
          })
        }), /*#__PURE__*/jsx(Tooltip, {
          title: t('crmUpdatesModal.discardSuggestion'),
          position: "bottom",
          children: /*#__PURE__*/jsx(IconButton, {
            name: "cross",
            color: "extraMeeting",
            onClick: function onClick() {
              return onDiscard(name);
            },
            size: 18
          })
        })]
      })]
    })]
  });
};
var ObjectSelector = function ObjectSelector(_ref3) {
  var entity = _ref3.entity,
    currentObj = _ref3.currentObj,
    onChange = _ref3.onChange;
  var _useCrmUpdatesModal = useCrmUpdatesModal(),
    updates = _useCrmUpdatesModal.updates;
  var objects = updates[entity].objects;
  return /*#__PURE__*/jsx(Select, {
    defaultValue: currentObj,
    value: currentObj,
    onChange: onChange,
    size: "labeled",
    width: "200px",
    children: Object.values(objects).map(function (obj) {
      return /*#__PURE__*/jsx(Item, {
        value: obj.objectId,
        children: obj.name
      }, obj.objectId);
    })
  });
};
var UpdatesProposed = function UpdatesProposed(_ref4) {
  var entity = _ref4.entity;
  var _useCrmUpdatesModal2 = useCrmUpdatesModal(),
    acceptSuggestion = _useCrmUpdatesModal2.acceptSuggestion,
    discardSuggestion = _useCrmUpdatesModal2.discardSuggestion,
    resetSuggestion = _useCrmUpdatesModal2.resetSuggestion,
    updates = _useCrmUpdatesModal2.updates;
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    updatesMap = _useState4[0],
    setUpdatesMap = _useState4[1];
  useEffect(function () {
    if (entity !== undefined) {
      var _updates$entity;
      var firstObjectWithUpdates = updates[entity] && updates[entity].objects ? Object.keys(updates[entity].objects).find(function (objectId) {
        var _updates$entity$objec;
        return ((_updates$entity$objec = updates[entity].objects[objectId].updates) === null || _updates$entity$objec === void 0 ? void 0 : _updates$entity$objec.length) > 0;
      }) : undefined;
      var activeObject = (_updates$entity = updates[entity]) === null || _updates$entity === void 0 ? void 0 : _updates$entity.objects[firstObjectWithUpdates];
      setUpdatesMap(_defineProperty({}, entity, activeObject));
    } else {
      setUpdatesMap(_objectSpread({}, Object.entries(updates).reduce(function (acc, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          entityName = _ref6[0],
          entityUpdates = _ref6[1];
        var firstObject = Object.values(entityUpdates.objects).find(function (object) {
          var _object$updates;
          return ((_object$updates = object.updates) === null || _object$updates === void 0 ? void 0 : _object$updates.length) > 0;
        });
        if (firstObject) {
          acc[entityName] = firstObject;
        }
        return acc;
      }, {})));
    }
  }, [entity, updates]);
  var onChangeEntityObject = function onChangeEntityObject(entity, objectId) {
    var _updates$entity2;
    var activeObject = (_updates$entity2 = updates[entity]) === null || _updates$entity2 === void 0 ? void 0 : _updates$entity2.objects[objectId];
    setUpdatesMap(_objectSpread(_objectSpread({}, updatesMap), {}, _defineProperty({}, entity, activeObject)));
  };
  return /*#__PURE__*/jsx("div", {
    className: styles.updatesRoot,
    children: /*#__PURE__*/jsx("div", {
      className: styles.updates,
      children: Object.entries(updatesMap).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          entity = _ref8[0],
          object = _ref8[1];
        return /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsxs("div", {
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '8px'
            },
            children: [/*#__PURE__*/jsxs(Text, {
              size: "m",
              weight: "bold",
              children: [entity, " updates"]
            }), entity === 'Opportunity' && /*#__PURE__*/jsx(ObjectSelector, {
              currentObj: object.objectId,
              entity: entity,
              onChange: function onChange(newObjectId) {
                return onChangeEntityObject(entity, newObjectId);
              }
            })]
          }), object.updates.map(function (suggestion) {
            return /*#__PURE__*/jsx(SuggestedUpdate, {
              objectName: object.name,
              name: suggestion.name,
              label: suggestion.label,
              entity: suggestion.entity,
              currentValue: suggestion.currentValue,
              suggestedValue: suggestion.suggestedValue,
              values: suggestion.values,
              onAccept: function onAccept(fieldName, value) {
                return acceptSuggestion({
                  entity: suggestion.entity,
                  fieldName: fieldName,
                  value: value,
                  objectId: suggestion.objectId
                });
              },
              onDiscard: function onDiscard(fieldName) {
                return discardSuggestion({
                  entity: suggestion.entity,
                  fieldName: fieldName,
                  objectId: suggestion.objectId
                });
              },
              onReset: function onReset(fieldName) {
                return resetSuggestion({
                  entity: suggestion.entity,
                  fieldName: fieldName,
                  objectId: suggestion.objectId
                });
              },
              status: suggestion.status
            }, suggestion.name);
          })]
        });
      })
    })
  });
};
var ObjectFilers = function ObjectFilers(_ref9) {
  var onChangeEntity = _ref9.onChangeEntity,
    entity = _ref9.entity;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var _useCrmUpdatesModal3 = useCrmUpdatesModal(),
    updates = _useCrmUpdatesModal3.updates;
  var counters = {
    Account: Object.keys(updates['Account'].objects).filter(function (id) {
      return updates['Account'].objects[id].updates.length > 0;
    }).length,
    Contact: Object.keys(updates['Contact'].objects).filter(function (id) {
      return updates['Contact'].objects[id].updates.length > 0;
    }).length,
    Opportunity: Object.keys(updates['Opportunity'].objects).filter(function (id) {
      return updates['Opportunity'].objects[id].updates.length > 0;
    }).length
  };
  var _useCrmUpdatesModal4 = useCrmUpdatesModal(),
    acceptAllSuggestions = _useCrmUpdatesModal4.acceptAllSuggestions,
    resetAllSuggestions = _useCrmUpdatesModal4.resetAllSuggestions,
    discardAllSuggestions = _useCrmUpdatesModal4.discardAllSuggestions;
  return /*#__PURE__*/jsxs("div", {
    className: styles.filters,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles.tags,
      children: [/*#__PURE__*/jsx(Tag, {
        active: !entity,
        value: undefined,
        onClick: function onClick() {
          return onChangeEntity(undefined);
        },
        uppercase: false,
        variant: "primary",
        children: "All"
      }), counters.Contact > 0 && /*#__PURE__*/jsx(Tag, {
        active: entity === 'Contact',
        value: "Contact",
        onClick: function onClick() {
          return onChangeEntity('Contact');
        },
        uppercase: false,
        variant: "primary",
        children: "Lead"
      }), counters.Account > 0 && /*#__PURE__*/jsx(Tag, {
        active: entity === 'Account',
        value: "Account",
        onClick: function onClick() {
          return onChangeEntity('Account');
        },
        uppercase: false,
        variant: "primary",
        children: "Company"
      }), counters.Opportunity > 0 && /*#__PURE__*/jsx(Tag, {
        active: entity === 'Opportunity',
        value: "Opportunity",
        onClick: function onClick() {
          return onChangeEntity('Opportunity');
        },
        uppercase: false,
        variant: "primary",
        children: "Opportunity"
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: styles.updatesHeaderActions,
      children: [/*#__PURE__*/jsx(Tooltip, {
        title: t('crmUpdatesModal.suggestAllAgain'),
        position: "top",
        children: /*#__PURE__*/jsx(IconButton, {
          name: "stars",
          color: "purple",
          size: 24,
          onClick: function onClick() {
            return resetAllSuggestions(entity);
          }
        })
      }), /*#__PURE__*/jsx(Tooltip, {
        title: t('crmUpdatesModal.acceptAllSuggestions'),
        position: "top",
        children: /*#__PURE__*/jsx(IconButton, {
          name: "check",
          color: "melon",
          size: 24,
          onClick: function onClick() {
            return acceptAllSuggestions(entity);
          }
        })
      }), /*#__PURE__*/jsx(Tooltip, {
        title: t('crmUpdatesModal.discardAllSuggestions'),
        position: "bottom",
        children: /*#__PURE__*/jsx(IconButton, {
          name: "cross",
          color: "extraMeeting",
          size: 24,
          onClick: function onClick() {
            return discardAllSuggestions(entity);
          }
        })
      })]
    })]
  });
};
var CrmUpdatesModal = function CrmUpdatesModal(_ref10) {
  var activity = _ref10.activity,
    open = _ref10.open,
    onClose = _ref10.onClose;
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  var _useSWRConfig = useSWRConfig(),
    cache = _useSWRConfig.cache;
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    updates = _useState6[0],
    setUpdates = _useState6[1];
  var _useToasts = useToasts(),
    createToast = _useToasts.createToast;
  var acceptedObjects = useMemo(function () {
    return Object.entries(updates).reduce(function (acc, _ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
        entity = _ref12[0],
        entityUpdates = _ref12[1];
      var aObj = Object.values(entityUpdates).filter(function (obj) {
        return obj.updates.filter(function (upd) {
          return upd.status === 'accepted';
        }).length > 0;
      }).map(function (obj) {
        return {
          entityName: entity,
          fields: obj.updates.filter(function (upd) {
            return upd.status === 'accepted';
          }),
          objectName: obj.name,
          objectId: obj.objectId
        };
      });
      return [].concat(_toConsumableArray(acc), _toConsumableArray(aObj));
    }, []);
  }, [updates]);
  var updateObjects = useCallback(function () {
    if (acceptedObjects.length > 0) {
      return Promise.all(acceptedObjects.map(function (objectUpdate) {
        return api.patch("/utils/service/salesforce/sobject/".concat(objectUpdate.entityName, "/").concat(objectUpdate.objectId), objectUpdate.fields.reduce(function (acc, field) {
          acc[field.name] = field.acceptedValue;
          return acc;
        }, {}));
      })).then(function () {
        var pattern = new RegExp("/utils/service/salesforce/query");
        var keys = Array.from(cache.keys());
        keys.filter(function (key) {
          return pattern.test(key);
        }).forEach(function (key) {
          return cache["delete"](key);
        });
        createToast({
          type: 'success',
          message: 'Objects in Salesforce updated successfully'
        });
      });
    } else {
      return Promise.resolve();
    }
  }, [acceptedObjects]);
  var handleAccept = function handleAccept() {
    updateObjects().then(onClose);
  };
  return /*#__PURE__*/jsxs(Modal, {
    open: open,
    onClose: onClose,
    children: [/*#__PURE__*/jsxs(ModalHeader, {
      size: "small",
      color: "verySoftPurple",
      children: [/*#__PURE__*/jsx(ModalTitle, {
        variant: "primary",
        size: "small",
        icon: "salesforce",
        className: styles.title,
        children: t('crmUpdatesModal.title')
      }), /*#__PURE__*/jsx(ModalCloseIcon, {
        onClick: onClose,
        color: "purple",
        size: "small"
      })]
    }), /*#__PURE__*/jsx(ModalContent, {
      className: styles.content,
      children: /*#__PURE__*/jsx(CrmUpdatesContent, {
        activity: activity,
        onUpdatesChange: setUpdates
      })
    }), /*#__PURE__*/jsxs(ModalFooter, {
      className: styles.footer,
      children: [/*#__PURE__*/jsx(Button, {
        variant: "clear",
        onClick: onClose,
        color: "extraMeeting",
        uppercase: false,
        size: "small",
        children: t('crmUpdatesModal.cancel')
      }), /*#__PURE__*/jsx(Button, {
        className: styles.accpetButton,
        onClick: handleAccept,
        uppercase: false,
        variant: "primary",
        size: "small",
        disabled: acceptedObjects.length === 0,
        children: t('crmUpdatesModal.accept')
      })]
    })]
  });
};
var CrmUpdatesContent = function CrmUpdatesContent(_ref13) {
  var activity = _ref13.activity,
    onUpdatesChange = _ref13.onUpdatesChange;
  var _useState7 = useState(undefined),
    _useState8 = _slicedToArray(_useState7, 2),
    activeEntity = _useState8[0],
    setActiveEntity = _useState8[1];
  return /*#__PURE__*/jsx(CRMUpdatesProvider, {
    activity: activity,
    onUpdatesChange: onUpdatesChange,
    children: /*#__PURE__*/jsxs("div", {
      className: styles.contentRoot,
      children: [/*#__PURE__*/jsx(ObjectFilers, {
        onChangeEntity: function onChangeEntity(entity) {
          return setActiveEntity(entity);
        },
        entity: activeEntity
      }), /*#__PURE__*/jsx(UpdatesProposed, {
        entity: activeEntity
      })]
    })
  });
};

export { CRMUpdatesProvider, Collapsible, CopilotAnalysis, CopilotSummary, CrmUpdatesContent, CrmUpdatesModal, DecisionInsight, ExtractionInsight, GenerationInsight, SectionTitle, TagGroup, buildSobjectListUpdates, buildSobjectUpdates, sobjectArrayQuery, useBuildCRMUpdates, useCrmUpdatesModal, withCRMUpdatesProvider };
                                 
