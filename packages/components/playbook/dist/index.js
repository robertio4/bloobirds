import React, { useState, useContext, useEffect, useLayoutEffect, createContext, useMemo, useCallback, memo, useRef, Fragment as Fragment$1 } from 'react';
import { useFormContext, useController, useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal, ModalContent, Text, Icon, ModalFooter, Button, ModalHeader, ModalTitle, ModalCloseIcon, Select, Item, Switch, MultiSelect, CheckItem, Tooltip, useHover, useVisible, Label, Dropdown, createToast, Input, Checkbox, DiscoveryTooltip, Skeleton, IconButton, Spinner, CircularBadge } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, usePlaybookSegmentation, useActiveUserSettings, useUserSearch, useMessagingTemplate, useQualifyingQuestions, useUserHelpers, useMessagingTemplates, useBaseSetEmailVariablesValues, useMinimizableModals, useSuggestedTemplates, useSnippetsEnabled, useWhatsappEnabled, usePlaybook } from '@bloobirds-it/hooks';
import { AttachmentList, useAttachedFiles, NoResultsPage, useAttachedLinks } from '@bloobirds-it/misc';
import { TemplateStage, TEMPLATE_TYPES, templateTypes, PlaybookTab, UserRole, MIXPANEL_EVENTS, QQ_TYPES, ExtensionHelperKeys, UserHelperTooltipsKeys, BobjectTypes, MessagesEvents } from '@bloobirds-it/types';
import { resetEditorChildren, insertElements, focusEditor } from '@udecode/plate';
import { Editor } from 'slate';
import useSWR from 'swr';
import { api, getUserTimeZone, createParagraph, removeHtmlTags, getDifferenceInHours, removeScrollOfBox, recoverScrollOfBox, partition, getLinkedInURL, getTemplateTypeButtons, EMAIL_MODE, baseUrls, addHttpIfNeeded, isHtml, stringToHTML } from '@bloobirds-it/utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useFullSalesEnabled } from 'bloobirds-platform-frontend/src/js/hooks/useFeatureFlags';
import clsx from 'clsx';
import { useRichTextEditorPlugins, RichTextEditor, EditorToolbar, EditorToolbarControlsSection, EditorToolbarFontStylesSection, EditorToolbarTextMarksSection, EditorToolbarListsSection, EditorToolbarSection, EditorToolbarMeetingLink, TemplateEditorToolbarFileAttachment, TemplateEditorToolbarImage, EditorToolbarTemplateVariable, FloatingTemplateVariable, deserialize, TemplateEditorToolbarMeetingLink, EditorToolbarFileAttachment, EditorToolbarImage } from '@bloobirds-it/rich-text-editor';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import mixpanel from 'mixpanel-browser';
import { SnippetsTooltip } from '@bloobirds-it/discovery-tooltips';
import { motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import { CSSTransition } from 'react-transition-group';
import { useVirtualizer } from '@tanstack/react-virtual';
import { range } from 'lodash';
import { IllustrationGroup } from '@bloobirds-it/assets';
import ReactShadowRoot from 'react-shadow-root';

var useCadencesUsingTemplate = function useCadencesUsingTemplate(templateId) {
  var _cadences$data;
  var _useSWR = useSWR(templateId ? "/messaging/messagingTemplates/".concat(templateId, "/cadences") : null, function (url) {
      return api.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      });
    }),
    cadences = _useSWR.data,
    isValidating = _useSWR.isValidating;
  var cadencesUsingTemplate = cadences === null || cadences === void 0 ? void 0 : (_cadences$data = cadences.data) === null || _cadences$data === void 0 ? void 0 : _cadences$data.cadences;
  return {
    cadencesUsingTemplate: cadencesUsingTemplate,
    isValidating: isValidating
  };
};

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

var css_248z$d = ".playbookConfirmationModal-module_modal_header__avSw0 {\n  background: var(--verySoftPurple) !important;\n  align-items: center;\n  height: 60px;\n}\n\n.playbookConfirmationModal-module_modal_title__6nzNB {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.playbookConfirmationModal-module_modal_text__tf253 {\n  line-height: 24px;\n  margin-bottom: 12px;\n}\n\n.playbookConfirmationModal-module_modal_text_delete__3N-3f {\n  line-height: 24px;\n  margin-bottom: 12px;\n  text-align: center;\n}\n\n.playbookConfirmationModal-module_cadences__WmlCb {\n  margin-top: 8px;\n}\n\n.playbookConfirmationModal-module_cadence__XYsJQ {\n  padding-left: 60px;\n  margin-bottom: 4px;\n  gap: 8px;\n  display: flex;\n  align-items: center;\n}\n\n.playbookConfirmationModal-module_buttons__P-TrU {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-between;\n  padding: 8px 28px 0;\n}\n\n.playbookConfirmationModal-module_button_end__rew5g {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: flex-end;\n  padding: 8px 28px 0;\n}\n\n.playbookConfirmationModal-module_buttons_right__vI4R9 {\n  display: flex;\n  gap: 16px;\n}\n";
var styles$c = {"modal_header":"playbookConfirmationModal-module_modal_header__avSw0","modal_title":"playbookConfirmationModal-module_modal_title__6nzNB","modal_text":"playbookConfirmationModal-module_modal_text__tf253","modal_text_delete":"playbookConfirmationModal-module_modal_text_delete__3N-3f","cadences":"playbookConfirmationModal-module_cadences__WmlCb","cadence":"playbookConfirmationModal-module_cadence__XYsJQ","buttons":"playbookConfirmationModal-module_buttons__P-TrU","button_end":"playbookConfirmationModal-module_button_end__rew5g","buttons_right":"playbookConfirmationModal-module_buttons_right__vI4R9"};
styleInject(css_248z$d);

function ConfirmationModalHeader(_ref) {
  var icon = _ref.icon,
    text = _ref.text,
    onClose = _ref.onClose;
  return /*#__PURE__*/jsxs(ModalHeader, {
    variant: "gradient",
    color: "purple",
    className: styles$c.modal_header,
    children: [/*#__PURE__*/jsx(ModalTitle, {
      variant: "gradient",
      children: /*#__PURE__*/jsxs("div", {
        className: styles$c.modal_title,
        children: [/*#__PURE__*/jsx(Icon, {
          color: "purple",
          name: icon,
          size: 24
        }), /*#__PURE__*/jsx(Text, {
          color: "purple",
          size: "m",
          children: text
        })]
      })
    }), /*#__PURE__*/jsx(ModalCloseIcon, {
      size: "small",
      onClick: onClose,
      color: "purple"
    })]
  });
}
function EditTemplateConfirmationModal(props) {
  var openMode = props.openMode,
    onClose = props.onClose,
    onAccept = props.onAccept,
    cadencesUsingTemplate = props.cadencesUsingTemplate;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  if (!cadencesUsingTemplate || (cadencesUsingTemplate === null || cadencesUsingTemplate === void 0 ? void 0 : cadencesUsingTemplate.length) === 0) {
    onAccept();
    return null;
  } else {
    var _cadencesUsingTemplat;
    return /*#__PURE__*/jsxs(Modal, {
      open: !!openMode,
      onClose: onClose,
      width: 640,
      children: [/*#__PURE__*/jsx(ConfirmationModalHeader, {
        icon: "autoMail",
        text: t('playbook.handleTemplate.confirmation.saveExisting'),
        onClose: onClose
      }), /*#__PURE__*/jsxs(ModalContent, {
        children: [/*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: "s",
          className: styles$c.modal_text,
          children: t('playbook.handleTemplate.edit.text', {
            count: (_cadencesUsingTemplat = cadencesUsingTemplate === null || cadencesUsingTemplate === void 0 ? void 0 : cadencesUsingTemplate.length) !== null && _cadencesUsingTemplat !== void 0 ? _cadencesUsingTemplat : 0
          })
        }), cadencesUsingTemplate && /*#__PURE__*/jsx("div", {
          className: styles$c.cadences,
          children: cadencesUsingTemplate === null || cadencesUsingTemplate === void 0 ? void 0 : cadencesUsingTemplate.map(function (cadence) {
            return 'name' in cadence && /*#__PURE__*/jsxs("div", {
              className: styles$c.cadence,
              children: [/*#__PURE__*/jsx(Icon, {
                name: 'circle',
                color: "lightPurple"
              }), /*#__PURE__*/jsx(Text, {
                color: "softPeanut",
                size: "s",
                children: cadence.name
              })]
            }, cadence.id);
          })
        })]
      }), /*#__PURE__*/jsx(ModalFooter, {
        children: /*#__PURE__*/jsxs("div", {
          className: styles$c.buttons,
          children: [/*#__PURE__*/jsx(Button, {
            variant: "clear",
            color: "purple",
            onClick: onClose,
            children: t('playbook.handleTemplate.cancel')
          }), /*#__PURE__*/jsx("div", {
            className: styles$c.buttons_right,
            children: /*#__PURE__*/jsx(Button, {
              variant: "primary",
              color: "purple",
              onClick: onAccept,
              children: t('playbook.handleTemplate.accept')
            })
          })]
        })
      })]
    });
  }
}
function DeleteConfirmationModal(props) {
  var openMode = props.openMode,
    outsideCadences = props.cadencesUsingTemplate,
    templateId = props.templateId,
    onClose = props.onClose,
    onAccept = props.onAccept;
  var _useCadencesUsingTemp = useCadencesUsingTemplate(templateId),
    cadences = _useCadencesUsingTemp.cadencesUsingTemplate,
    isValidating = _useCadencesUsingTemp.isValidating;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var cadencesUsingTemplate = outsideCadences || cadences;
  if (isValidating) {
    return null;
  } else if (cadencesUsingTemplate && cadencesUsingTemplate.length) {
    var _cadencesUsingTemplat2;
    return /*#__PURE__*/jsxs(Modal, {
      open: !!openMode,
      onClose: onClose,
      width: 640,
      children: [/*#__PURE__*/jsx(ConfirmationModalHeader, {
        icon: "trashFull",
        text: "Delete template",
        onClose: onClose
      }), /*#__PURE__*/jsxs(ModalContent, {
        children: [/*#__PURE__*/jsx(Text, {
          color: "softPeanut",
          size: "s",
          className: styles$c.modal_text,
          children: t('playbook.handleTemplate.delete.text', {
            count: (_cadencesUsingTemplat2 = cadencesUsingTemplate === null || cadencesUsingTemplate === void 0 ? void 0 : cadencesUsingTemplate.length) !== null && _cadencesUsingTemplat2 !== void 0 ? _cadencesUsingTemplat2 : 0
          })
        }), cadencesUsingTemplate && /*#__PURE__*/jsx("div", {
          className: styles$c.cadences,
          children: cadencesUsingTemplate === null || cadencesUsingTemplate === void 0 ? void 0 : cadencesUsingTemplate.map(function (cadence) {
            return 'name' in cadence && /*#__PURE__*/jsxs("div", {
              className: styles$c.cadence,
              children: [/*#__PURE__*/jsx(Icon, {
                name: 'circle',
                color: "lightPurple"
              }), /*#__PURE__*/jsx(Text, {
                color: "softPeanut",
                size: "s",
                children: cadence.name
              })]
            }, cadence.id);
          })
        })]
      }), /*#__PURE__*/jsx(ModalFooter, {
        children: /*#__PURE__*/jsx("div", {
          className: styles$c.button_end,
          children: /*#__PURE__*/jsx(Button, {
            variant: "primary",
            color: "purple",
            onClick: onClose,
            children: t('playbook.handleTemplate.close')
          })
        })
      })]
    });
  } else {
    return /*#__PURE__*/jsx(DiscardConfirmationModal, {
      openMode: openMode,
      templateId: templateId,
      onClose: onClose,
      onAccept: onAccept
    });
  }
}
function DiscardConfirmationModal(props) {
  var openMode = props.openMode,
    templateId = props.templateId,
    onClose = props.onClose,
    onAccept = props.onAccept;
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'playbook.handleTemplate'
    }),
    t = _useTranslation3.t;
  return /*#__PURE__*/jsxs(Modal, {
    open: !!openMode,
    onClose: onClose,
    width: 500,
    children: [/*#__PURE__*/jsx(ConfirmationModalHeader, {
      icon: "cross",
      text: t("".concat(openMode === null || openMode === void 0 ? void 0 : openMode.toLowerCase(), ".titleWithValue"), {
        value: templateId ? 'template' : 'changes'
      }),
      onClose: onClose
    }), /*#__PURE__*/jsx(ModalContent, {
      children: /*#__PURE__*/jsxs(Text, {
        size: "s",
        className: styles$c.modal_text_delete,
        children: [openMode === 'Discard' ? t('discard.changesNotSaved') : t('discard.aboutToDelete'), /*#__PURE__*/jsx(Text, {
          htmlTag: "span",
          size: "s",
          weight: "bold",
          children: t('discard.noUndone')
        }), ' ', t('discard.sure')]
      })
    }), /*#__PURE__*/jsx(ModalFooter, {
      children: /*#__PURE__*/jsxs("div", {
        className: styles$c.buttons,
        children: [/*#__PURE__*/jsx(Button, {
          variant: "clear",
          color: "purple",
          onClick: onClose,
          children: t('cancel')
        }), /*#__PURE__*/jsx(Button, {
          variant: "primary",
          color: "tomato",
          onClick: onAccept,
          children: t("".concat(openMode === null || openMode === void 0 ? void 0 : openMode.toLowerCase(), ".title"))
        })]
      })
    })]
  });
}
function PlaybookConfirmationModal(_ref2) {
  var _ref2$openMode = _ref2.openMode,
    openMode = _ref2$openMode === void 0 ? '' : _ref2$openMode,
    _ref2$cadencesUsingTe = _ref2.cadencesUsingTemplate,
    cadencesUsingTemplate = _ref2$cadencesUsingTe === void 0 ? [] : _ref2$cadencesUsingTe,
    _ref2$templateId = _ref2.templateId,
    templateId = _ref2$templateId === void 0 ? '' : _ref2$templateId,
    _ref2$onAccept = _ref2.onAccept,
    onAccept = _ref2$onAccept === void 0 ? function () {} : _ref2$onAccept,
    _ref2$onClose = _ref2.onClose,
    onClose = _ref2$onClose === void 0 ? function () {} : _ref2$onClose;
  switch (openMode) {
    case 'Save':
      return /*#__PURE__*/jsx(EditTemplateConfirmationModal, {
        openMode: openMode,
        cadencesUsingTemplate: cadencesUsingTemplate,
        onAccept: onAccept,
        onClose: onClose
      });
    case 'Delete':
      return /*#__PURE__*/jsx(DeleteConfirmationModal, {
        openMode: openMode,
        cadencesUsingTemplate: cadencesUsingTemplate,
        templateId: templateId,
        onAccept: onAccept,
        onClose: onClose
      });
    case 'Discard':
      return /*#__PURE__*/jsx(DiscardConfirmationModal, {
        openMode: openMode,
        templateId: templateId,
        onAccept: onAccept,
        onClose: onClose
      });
    default:
      return null;
  }
}

var css_248z$c = ".handleTemplate-module_container__BB7uT {\n  height: 100%;\n  width: 100%;\n  padding: 24px 24px 0 24px;\n  display: flex;\n  flex-direction: column;\n}\n\n.handleTemplate-module_header__VXLpc {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin-bottom: 10px;\n}\n\n.handleTemplate-module_content__nJALI {\n  width: 100%;\n  height: -webkit-fill-available;\n}\n\n.handleTemplate-module_formHeader__zX7lx{\n  display: flex;\n  justify-content: space-between;\n  height: 24px;\n}\n\n.handleTemplate-module_headerText__IbAuH{\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.handleTemplate-module_noPadding__hQaZ5 {\n  padding: 0;\n}\n\n.handleTemplate-module_templateNameContainer__vWfPq {\n  display: flex;\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n  padding: 8px 0;\n  box-sizing: border-box;\n  flex-shrink: 0;\n  transition: height 200ms;\n  gap: 4px;\n}\n\n.handleTemplate-module_input__I-rl3 {\n  position: relative;\n  width: 100%;\n}\n\n.handleTemplate-module_input__I-rl3 > input {\n  font-family: var(--fontFamily);\n  font-size: 12.5px;\n  line-height: normal;\n  padding: 0;\n}\n\n.handleTemplate-module_placeholder__8myEA {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  color: #c8c8c8;\n  font-family: var(--fontFamily);\n  font-size: 12.5px;\n  font-weight: 400;\n  line-height: normal;\n  padding: 2px 0;\n  opacity: 1;\n  pointer-events: none;\n}\n\n.handleTemplate-module_nameEditor__q-nYu {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 12px;\n  border-bottom: 1px solid var(--lightestPurple);\n}\n\n.handleTemplate-module_withPadding__gr6Ht {\n  padding-left: 20px;\n}\n\n.handleTemplate-module_subjectContainer__DAVSQ {\n  flex: 1;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n  padding: 8px 0 7px;\n  height: 40px;\n  box-sizing: border-box;\n  flex-shrink: 0;\n}\n\n.handleTemplate-module_subjectFloatingTemplateVariableContainer__nQj7Z {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  align-items: center;\n}\n\n.handleTemplate-module_subjectFloatingTemplateVariableContainer__nQj7Z svg {\n  max-width: 16px;\n}\n\n.handleTemplate-module_subjectFloatingTemplateVariableContainer__nQj7Z svg > path {\n  fill: var(--purple);\n}\n\n.handleTemplate-module_bodyContainer__GAUqH {\n  display: flex;\n  position: relative;\n  min-height: 0;\n  flex: 1;\n  flex-direction: column-reverse;\n  box-sizing: border-box;\n}\n\n.handleTemplate-module_bodyContainer__GAUqH > div:last-child, .handleTemplate-module_bodyContainer__GAUqH > div:last-child > div, .handleTemplate-module_bodyContainer__GAUqH > div:last-child > div > div:first-child {\n  margin: 2px 0 4px;\n}\n\n.handleTemplate-module_bodyContainer__GAUqH > div {\n  border-bottom: 0;\n}\n\n.handleTemplate-module__error_text__UlMHF {\n  position: absolute;\n  right: 12px;\n  margin-top: 2px;\n}\n\n.handleTemplate-module__editor__container_ast__NV6PY {\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n  height: 100%;\n  max-height: 90%;\n}\n\n.handleTemplate-module_separator__qR1-W {\n  width: 1px;\n  height: 24px;\n  background-color: var(--verySoftPurple);\n}\n\n.handleTemplate-module__lock__icon__qv1yi {\n  margin-right: 4px;\n}\n\n.handleTemplate-module_templateInfoWrapper__fGxSm {\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n  gap: 8px;\n}\n\n.handleTemplate-module_visibilityLabel__U46iv {\n  display: flex;\n}\n\n.handleTemplate-module_templateInfoEditingContainer__YNCMf {\n  border-bottom: 1px solid var(--lightestBloobirds);\n}\n\n.handleTemplate-module_dropdownWrapper__WUf7y {\n  margin: 0 16px -6px;\n}\n\n.handleTemplate-module_dropdownAnchorWrapper__wcGQf {\n  margin-top: -1px;\n}\n\n.handleTemplate-module_templateInfoEditing__xoZ7H {\n  display: flex;\n  flex-direction: column;\n  padding: 6px 0 12px;\n  gap: 4px;\n}\n\n.handleTemplate-module_dateInformation__ij576 {\n  display: flex;\n  flex-direction: row;\n  gap: 4px;\n  align-items: center;\n  max-width: 100%;\n}\n\n.handleTemplate-module_dateInformation__ij576 > svg {\n  min-width: 18px;\n}\n\n.handleTemplate-module_dateInformation__ij576 > p {\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n}\n\n.handleTemplate-module_dateContent__hTQ6F {\n  max-width: 100%;\n  overflow: hidden;\n}\n\n.handleTemplate-module_dateContent__hTQ6F > p {\n  max-width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.handleTemplate-module_editorToolbarSection__5tpmH {\n  border-right: var(--verySoftPurple) 1px solid;\n}\n\n.handleTemplate-module_editorToolbarSection__5tpmH svg {\n  max-width: 16px;\n}\n\n.handleTemplate-module_editorToolbarSection__5tpmH > section {\n  gap: 2px;\n}\n\n.handleTemplate-module_editorToolbarLastSection__Pw95s svg {\n  max-width: 16px;\n}\n\n.handleTemplate-module_editorToolbarLastSection__Pw95s svg > path {\n  fill: var(--peanut);\n}\n";
var styles$b = {"container":"handleTemplate-module_container__BB7uT","header":"handleTemplate-module_header__VXLpc","content":"handleTemplate-module_content__nJALI","formHeader":"handleTemplate-module_formHeader__zX7lx","headerText":"handleTemplate-module_headerText__IbAuH","noPadding":"handleTemplate-module_noPadding__hQaZ5","templateNameContainer":"handleTemplate-module_templateNameContainer__vWfPq","input":"handleTemplate-module_input__I-rl3","placeholder":"handleTemplate-module_placeholder__8myEA","nameEditor":"handleTemplate-module_nameEditor__q-nYu","withPadding":"handleTemplate-module_withPadding__gr6Ht","subjectContainer":"handleTemplate-module_subjectContainer__DAVSQ","subjectFloatingTemplateVariableContainer":"handleTemplate-module_subjectFloatingTemplateVariableContainer__nQj7Z","bodyContainer":"handleTemplate-module_bodyContainer__GAUqH","_error_text":"handleTemplate-module__error_text__UlMHF","_editor__container_ast":"handleTemplate-module__editor__container_ast__NV6PY","separator":"handleTemplate-module_separator__qR1-W","_lock__icon":"handleTemplate-module__lock__icon__qv1yi","templateInfoWrapper":"handleTemplate-module_templateInfoWrapper__fGxSm","visibilityLabel":"handleTemplate-module_visibilityLabel__U46iv","templateInfoEditingContainer":"handleTemplate-module_templateInfoEditingContainer__YNCMf","dropdownWrapper":"handleTemplate-module_dropdownWrapper__WUf7y","dropdownAnchorWrapper":"handleTemplate-module_dropdownAnchorWrapper__wcGQf","templateInfoEditing":"handleTemplate-module_templateInfoEditing__xoZ7H","dateInformation":"handleTemplate-module_dateInformation__ij576","dateContent":"handleTemplate-module_dateContent__hTQ6F","editorToolbarSection":"handleTemplate-module_editorToolbarSection__5tpmH","editorToolbarLastSection":"handleTemplate-module_editorToolbarLastSection__Pw95s"};
styleInject(css_248z$c);

function _slicedToArray$h(arr, i) { return _arrayWithHoles$h(arr) || _iterableToArrayLimit$h(arr, i) || _unsupportedIterableToArray$h(arr, i) || _nonIterableRest$h(); }
function _nonIterableRest$h() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$h(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$h(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$h(o, minLen); }
function _arrayLikeToArray$h(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$h(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$h(arr) { if (Array.isArray(arr)) return arr; }
var HandleTemplateHeader = function HandleTemplateHeader(_ref) {
  var onBack = _ref.onBack,
    handleSave = _ref.handleSave,
    viewSegmentation = _ref.viewSegmentation,
    switchView = _ref.switchView,
    isEditing = _ref.isEditing,
    isSnippet = _ref.isSnippet;
  var _useState = useState(false),
    _useState2 = _slicedToArray$h(_useState, 2),
    discardModalOpen = _useState2[0],
    setDiscardModalOpen = _useState2[1];
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.templateFormHeader'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$b.header,
      children: [/*#__PURE__*/jsx("div", {
        className: styles$b.formHeader,
        children: !viewSegmentation ? /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(Button, {
            iconLeft: "cross",
            size: "small",
            color: "tomato",
            onClick: function onClick() {
              return setDiscardModalOpen(true);
            },
            variant: "clear",
            uppercase: false,
            className: styles$b.noPadding,
            children: isEditing ? t('discardChanges') : t('discardTemplate')
          }), /*#__PURE__*/jsx(Button, {
            iconLeft: "save",
            size: "small",
            color: "purple",
            onClick: handleSave,
            uppercase: false,
            children: t('save')
          })]
        }) : /*#__PURE__*/jsx(Button, {
          iconLeft: "arrowLeft",
          size: "small",
          color: "purple",
          onClick: switchView,
          variant: "clear",
          uppercase: false,
          className: styles$b.noPadding,
          children: t('goBack')
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$b.headerText,
        children: [/*#__PURE__*/jsx(Text, {
          size: "m",
          weight: "bold",
          children: isEditing ? t('editTitle', {
            type: isSnippet ? 'snippet' : 'template'
          }) : t('saveNewTitle', {
            type: isSnippet ? 'snippet' : 'template'
          })
        }), !viewSegmentation && /*#__PURE__*/jsx(Button, {
          variant: "clear",
          size: "small",
          uppercase: false,
          iconLeft: viewSegmentation ? 'noteAction' : 'sliders',
          onClick: switchView,
          color: "purple",
          className: styles$b.noPadding,
          children: t('changeSegmentation')
        })]
      })]
    }), /*#__PURE__*/jsx(PlaybookConfirmationModal, {
      openMode: discardModalOpen && 'Discard',
      templateId: isEditing && 'templateId',
      onClose: function onClose() {
        return setDiscardModalOpen(false);
      },
      onAccept: onBack
    })]
  });
};

var css_248z$b = ".segmentationForm-module_container__SzetF {\n  width: calc(100% + 10px);\n  padding-right: 10px;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n}\n\n.segmentationForm-module_container__SzetF::-webkit-scrollbar {\n  margin-left: 8px;\n  color: black;\n}\n\n.segmentationForm-module_section__FoN-g {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: 8px;\n  margin: 8px 0 16px;\n}\n\n.segmentationForm-module_title__PnT0n {\n  width: 100%;\n}\n\n.segmentationForm-module_sectionContent__cplBT {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 0 4px;\n  gap: 8px;\n}\n\n.segmentationForm-module_withoutTitle__BOt41 {\n  padding: 0;\n}\n\n.segmentationForm-module_row__-IGky {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  gap: 8px;\n  align-items: center;\n}\n";
var styles$a = {"container":"segmentationForm-module_container__SzetF","section":"segmentationForm-module_section__FoN-g","title":"segmentationForm-module_title__PnT0n","sectionContent":"segmentationForm-module_sectionContent__cplBT","withoutTitle":"segmentationForm-module_withoutTitle__BOt41","row":"segmentationForm-module_row__-IGky"};
styleInject(css_248z$b);

var _excluded$3 = ["stage"],
  _excluded2 = ["ref"];
function _typeof$q(obj) { "@babel/helpers - typeof"; return _typeof$q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$q(obj); }
function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys$k(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$k(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$k(Object(source), !0).forEach(function (key) { _defineProperty$q(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$q(obj, key, value) { key = _toPropertyKey$q(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$q(arg) { var key = _toPrimitive$q(arg, "string"); return _typeof$q(key) === "symbol" ? key : String(key); }
function _toPrimitive$q(input, hint) { if (_typeof$q(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$q(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Title = function Title(_ref) {
  var title = _ref.title;
  return /*#__PURE__*/jsx(Text, {
    weight: "bold",
    size: "s",
    children: title
  });
};
var SubTitle = function SubTitle(_ref2) {
  var text = _ref2.text;
  return /*#__PURE__*/jsx(Text, {
    color: "softPeanut",
    size: "xs",
    children: text
  });
};
var SwitchRow = function SwitchRow(_ref3) {
  var text = _ref3.text,
    field = _ref3.field,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled;
  return /*#__PURE__*/jsxs("div", {
    className: styles$a.row,
    children: [/*#__PURE__*/jsx(Switch, {
      color: "purple",
      checked: field.value,
      onChange: function onChange(bool) {
        return field.onChange(bool);
      },
      disabled: disabled
    }), /*#__PURE__*/jsx(Text, {
      size: "s",
      weight: "medium",
      children: text
    })]
  });
};
var SegmentationFieldsByStage = function SegmentationFieldsByStage(_ref4) {
  var _segmentationFields$s;
  var segmentationFields = _ref4.segmentationFields,
    _ref4$segmentationFie = _ref4.segmentationField,
    selectedSegmentation = _ref4$segmentationFie.value,
    setSelectedSegmentation = _ref4$segmentationFie.onChange,
    stage = _ref4.stage,
    _ref4$withTitle = _ref4.withTitle,
    withTitle = _ref4$withTitle === void 0 ? false : _ref4$withTitle;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  if (!segmentationFields[stage] || segmentationFields[stage].length === 0) {
    return null;
  }
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$a.sectionContent, _defineProperty$q({}, styles$a.withoutTitle, !withTitle)),
    children: [withTitle && /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "softPeanut",
      children: t("playbook.segmentationFilter.".concat(stage.toLowerCase()))
    }), (_segmentationFields$s = segmentationFields[stage]) === null || _segmentationFields$s === void 0 ? void 0 : _segmentationFields$s.map(function (segmentation) {
      var _selectedSegmentation, _segmentation$values;
      var selectedValues = (_selectedSegmentation = selectedSegmentation[stage]) === null || _selectedSegmentation === void 0 ? void 0 : _selectedSegmentation[segmentation.id];
      var onChange = function onChange(values) {
        setSelectedSegmentation(_objectSpread$k(_objectSpread$k({}, selectedSegmentation), {}, _defineProperty$q({}, stage, _objectSpread$k(_objectSpread$k({}, selectedSegmentation[stage]), values.length && _defineProperty$q({}, segmentation.id, values)))));
      };
      var renderValue = function renderValue(values) {
        if (values && values.length) {
          var selectedNames = values.map(function (id) {
            return segmentation.values.find(function (v) {
              return v.id === id;
            }).name;
          });
          if (selectedNames.length === segmentation.values.length) {
            return t('common.allValuesSelected');
          } else if (selectedNames.length === 1) {
            return selectedNames[0];
          } else {
            var _t;
            return selectedNames.length + ((_t = t('common.selected')) === null || _t === void 0 ? void 0 : _t.toLowerCase()) + ': ' + (selectedNames === null || selectedNames === void 0 ? void 0 : selectedNames.join(', '));
          }
        } else {
          return t('common.select') + ' ' + segmentation.name;
        }
      };
      return /*#__PURE__*/jsx(MultiSelect, {
        size: "small",
        value: selectedValues ? selectedValues : [],
        width: "100%",
        placeholder: t('common.select') + ' ' + segmentation.name,
        renderDisplayValue: renderValue,
        onChange: onChange,
        selectAllOption: true,
        autocomplete: true,
        children: (_segmentation$values = segmentation.values) === null || _segmentation$values === void 0 ? void 0 : _segmentation$values.map(function (value) {
          return /*#__PURE__*/jsx(CheckItem, {
            value: value.id,
            label: value.name,
            checked: selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.includes(value.id),
            children: value.name
          }, value.id);
        })
      }, segmentation.id);
    })]
  });
};
var SegmentationFields = function SegmentationFields(_ref6) {
  var stage = _ref6.stage,
    props = _objectWithoutProperties$3(_ref6, _excluded$3);
  var stages = stage === TemplateStage.All ? [TemplateStage.Prospecting, TemplateStage.Sales] : [stage];
  var isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  return /*#__PURE__*/jsx(Fragment, {
    children: stages.map(function (s) {
      return /*#__PURE__*/jsx(SegmentationFieldsByStage, _objectSpread$k({
        stage: s,
        withTitle: stage === TemplateStage.All && !isNoStatusPlanAccount
      }, props), 'SegmentationFieldsByStage' + s);
    })
  });
};
var SegmentationForm = function SegmentationForm(_ref7) {
  var _settings$user, _segmentationFields$T, _segmentationFields$T2, _segmentationFields$s2;
  var canBeBattlecard = _ref7.canBeBattlecard;
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var isFullSalesEnabled = useFullSalesEnabled();
  var isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  var _useController = useController({
      control: control,
      name: 'stage',
      defaultValue: isNoStatusPlanAccount ? TemplateStage.All : isFullSalesEnabled ? TemplateStage.Sales : TemplateStage.Prospecting
    }),
    _useController$field = _useController.field;
    _useController$field.ref;
    var stageField = _objectWithoutProperties$3(_useController$field, _excluded2);
  var _usePlaybookSegmentat = usePlaybookSegmentation(stageField.value),
    segmentationFields = _usePlaybookSegmentat.segmentationFields;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'playbook.segmentationFilter'
    }),
    t = _useTranslation2.t;
  var isAdmin = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.accountAdmin;
  var _useController2 = useController({
      control: control,
      name: 'visibility'
    }),
    visibleField = _useController2.field;
  var _useController3 = useController({
      control: control,
      name: 'isOfficial'
    }),
    officialField = _useController3.field;
  var _useController4 = useController({
      control: control,
      name: 'isBattlecard'
    }),
    battlecardField = _useController4.field;
  var _useController5 = useController({
      control: control,
      name: 'segmentationValues'
    }),
    segmentationField = _useController5.field;
  var visibleFieldFunctions = {
    value: visibleField.value === 'PUBLIC',
    onChange: function onChange(b) {
      return visibleField.onChange(b ? 'PUBLIC' : 'PRIVATE');
    }
  };
  var renderStage = function renderStage(stage) {
    switch (stage) {
      case TemplateStage.All:
        return t('prospectAndSalesStages');
      case TemplateStage.Prospecting:
        return t('prospectStage');
      case TemplateStage.Sales:
        return t('salesStage');
    }
  };
  var showSegmentation = segmentationFields && (stageField.value === TemplateStage.All && (((_segmentationFields$T = segmentationFields[TemplateStage.Prospecting]) === null || _segmentationFields$T === void 0 ? void 0 : _segmentationFields$T.length) > 0 || ((_segmentationFields$T2 = segmentationFields[TemplateStage.Sales]) === null || _segmentationFields$T2 === void 0 ? void 0 : _segmentationFields$T2.length) > 0) || stageField.value !== TemplateStage.All && ((_segmentationFields$s2 = segmentationFields[stageField.value]) === null || _segmentationFields$s2 === void 0 ? void 0 : _segmentationFields$s2.length) > 0);
  return /*#__PURE__*/jsxs("div", {
    className: styles$a.container,
    children: [(!isNoStatusPlanAccount || !isFullSalesEnabled) && /*#__PURE__*/jsxs("div", {
      className: styles$a.section,
      children: [/*#__PURE__*/jsx(Title, {
        title: t('stage')
      }), /*#__PURE__*/jsxs(Select, _objectSpread$k(_objectSpread$k({
        size: "small",
        placeholder: t('stage')
      }, stageField), {}, {
        width: '100%',
        borderless: false,
        renderDisplayValue: renderStage,
        children: [/*#__PURE__*/jsx(Item, {
          value: TemplateStage.All,
          children: t('all')
        }), /*#__PURE__*/jsx(Item, {
          value: TemplateStage.Prospecting,
          children: t('prospectStage')
        }), /*#__PURE__*/jsx(Item, {
          value: TemplateStage.Sales,
          children: t('salesStage')
        })]
      }))]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$a.section,
      children: [/*#__PURE__*/jsx(Title, {
        title: t('options')
      }), /*#__PURE__*/jsx(SubTitle, {
        text: t('canChooseMoreThanOne')
      }), /*#__PURE__*/jsxs("div", {
        className: styles$a.sectionContent,
        children: [/*#__PURE__*/jsx(SwitchRow, {
          text: t('visibleToAllMembers'),
          field: visibleFieldFunctions
        }), /*#__PURE__*/jsx(SwitchRow, {
          text: t('officialPlaybook'),
          field: officialField,
          disabled: !isAdmin
        }), canBeBattlecard && /*#__PURE__*/jsx(SwitchRow, {
          text: t('playbookBattlecard'),
          field: battlecardField
        })]
      })]
    }), showSegmentation && /*#__PURE__*/jsxs("div", {
      className: styles$a.section,
      children: [/*#__PURE__*/jsx(Title, {
        title: t('categorization')
      }), stageField.value !== TemplateStage.All && /*#__PURE__*/jsx(SubTitle, {
        text: t('categorizationText')
      }), segmentationFields && /*#__PURE__*/jsx(SegmentationFields, {
        segmentationFields: segmentationFields,
        segmentationField: segmentationField,
        stage: stageField.value
      })]
    })]
  });
};

function _typeof$p(obj) { "@babel/helpers - typeof"; return _typeof$p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$p(obj); }
function ownKeys$j(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$j(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$j(Object(source), !0).forEach(function (key) { _defineProperty$p(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$p(obj, key, value) { key = _toPropertyKey$p(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$p(arg) { var key = _toPrimitive$p(arg, "string"); return _typeof$p(key) === "symbol" ? key : String(key); }
function _toPrimitive$p(input, hint) { if (_typeof$p(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$p(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$g(arr, i) { return _arrayWithHoles$g(arr) || _iterableToArrayLimit$g(arr, i) || _unsupportedIterableToArray$g(arr, i) || _nonIterableRest$g(); }
function _nonIterableRest$g() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$g(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$g(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$g(o, minLen); }
function _arrayLikeToArray$g(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$g(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$g(arr) { if (Array.isArray(arr)) return arr; }
var MainContentFormEditor = function MainContentFormEditor(_ref) {
  var attachedFiles = _ref.attachedFiles,
    removeAttachedFile = _ref.removeAttachedFile,
    uploadAttachedFile = _ref.uploadAttachedFile;
  var _useState = useState(null),
    _useState2 = _slicedToArray$g(_useState, 2),
    editor = _useState2[0],
    _setEditor = _useState2[1];
  var _useContext = useContext(TemplateFormContext),
    focusedRef = _useContext.focusedRef,
    storeEditorRef = _useContext.storeEditorRef,
    template = _useContext.template,
    setElements = _useContext.setElements;
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  //WARNING: the field is named content not body
  var _useController = useController({
      control: control,
      name: 'content'
    }),
    field = _useController.field;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.templateForm'
    }),
    t = _useTranslation.t;
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    rawHTMLBlock: true
  });
  useEffect(function () {
    setElements(field.value, template.content, editor);
  }, [template, editor]);
  var showAttachmentSection = (template === null || template === void 0 ? void 0 : template.type) !== TEMPLATE_TYPES.SNIPPET;
  return /*#__PURE__*/jsx("div", {
    className: styles$b.bodyContainer,
    onClick: function onClick() {
      return focusedRef.current = 4;
    },
    children: /*#__PURE__*/jsx(RichTextEditor, _objectSpread$j(_objectSpread$j({
      id: "templateEditorBody",
      placeholder: t('bodyPlaceholder'),
      plugins: bodyPlugins,
      setEditor: function setEditor(value) {
        _setEditor(value);
        storeEditorRef(value);
      },
      style: {
        width: '100%',
        padding: 0
      }
    }, field), {}, {
      children: function children(editor) {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [(attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0 && /*#__PURE__*/jsx(AttachmentList, {
            files: attachedFiles,
            onDelete: removeAttachedFile
          }), /*#__PURE__*/jsx("div", {
            className: styles$b._editor__container_ast,
            children: editor
          }), /*#__PURE__*/jsxs(EditorToolbar, {
            backgroundColor: "white",
            children: [/*#__PURE__*/jsx("div", {
              className: styles$b.editorToolbarSection,
              children: /*#__PURE__*/jsx(EditorToolbarControlsSection, {
                color: "peanut"
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles$b.editorToolbarSection,
              children: /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                color: "peanut"
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles$b.editorToolbarSection,
              children: /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                color: "peanut"
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles$b.editorToolbarSection,
              children: /*#__PURE__*/jsx(EditorToolbarListsSection, {
                color: "peanut"
              })
            }), showAttachmentSection && /*#__PURE__*/jsx("div", {
              className: styles$b.editorToolbarLastSection,
              children: /*#__PURE__*/jsxs(EditorToolbarSection, {
                children: [/*#__PURE__*/jsx(EditorToolbarMeetingLink, {
                  color: "peanut"
                }), /*#__PURE__*/jsx(TemplateEditorToolbarFileAttachment, {
                  onAttachment: uploadAttachedFile,
                  color: "peanut"
                }), /*#__PURE__*/jsx(TemplateEditorToolbarImage, {
                  color: "peanut"
                }), /*#__PURE__*/jsx(EditorToolbarTemplateVariable, {})]
              })
            })]
          })]
        });
      }
    }))
  });
};

function _typeof$o(obj) { "@babel/helpers - typeof"; return _typeof$o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$o(obj); }
function ownKeys$i(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$i(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) { _defineProperty$o(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$o(obj, key, value) { key = _toPropertyKey$o(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$o(arg) { var key = _toPrimitive$o(arg, "string"); return _typeof$o(key) === "symbol" ? key : String(key); }
function _toPrimitive$o(input, hint) { if (_typeof$o(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$o(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$f(arr, i) { return _arrayWithHoles$f(arr) || _iterableToArrayLimit$f(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$f(); }
function _nonIterableRest$f() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$f(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$f(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen); }
function _arrayLikeToArray$f(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$f(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$f(arr) { if (Array.isArray(arr)) return arr; }
var NameFormEditor = function NameFormEditor(_ref) {
  var _errors$name;
  var _ref$isTemplateModal = _ref.isTemplateModal,
    isTemplateModal = _ref$isTemplateModal === void 0 ? false : _ref$isTemplateModal;
  var _useState = useState(null),
    _useState2 = _slicedToArray$f(_useState, 2),
    editor = _useState2[0],
    _setEditor = _useState2[1];
  var _useContext = useContext(TemplateFormContext),
    template = _useContext.template,
    setElements = _useContext.setElements,
    plugins = _useContext.plugins,
    storeEditorRef = _useContext.storeEditorRef,
    focusedRef = _useContext.focusedRef;
  var _useFormContext = useFormContext(),
    control = _useFormContext.control,
    errors = _useFormContext.formState.errors;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.nameFormEditor'
    }),
    t = _useTranslation.t;
  var _useController = useController({
      control: control,
      name: 'name',
      rules: {
        validate: function validate(fieldValue) {
          // @ts-ignore
          var value = fieldValue && (fieldValue[0].children ? fieldValue[0].children[0].text : fieldValue[0].text);
          if (value === undefined || value === '') return t('requiredText');else return undefined;
        }
      }
    }),
    field = _useController.field;
  useEffect(function () {
    setElements(field.value, template.name, editor, true);
  }, [template, editor]);
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$b.nameEditor, _defineProperty$o({}, styles$b.withPadding, isTemplateModal)),
    onClick: function onClick() {
      return focusedRef.current = isTemplateModal ? 0 : 2;
    },
    children: [/*#__PURE__*/jsxs(Text, {
      size: "s",
      color: "verySoftPeanut",
      children: [t('title'), ":"]
    }), /*#__PURE__*/jsxs("div", {
      className: styles$b.templateNameContainer,
      children: [/*#__PURE__*/jsx(RichTextEditor, _objectSpread$i({
        id: "templateNameEditor",
        placeholder: t('placeholder'),
        plugins: plugins,
        setEditor: function setEditor(value) {
          _setEditor(value);
          storeEditorRef === null || storeEditorRef === void 0 ? void 0 : storeEditorRef(value);
        },
        style: {
          width: '100%',
          padding: 0
        }
      }, field)), /*#__PURE__*/jsx(Text, {
        size: "xxs",
        color: "tomato",
        className: styles$b._error_text,
        children: errors === null || errors === void 0 ? void 0 : (_errors$name = errors.name) === null || _errors$name === void 0 ? void 0 : _errors$name.message
      })]
    })]
  });
};

function _typeof$n(obj) { "@babel/helpers - typeof"; return _typeof$n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$n(obj); }
function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty$n(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$n(obj, key, value) { key = _toPropertyKey$n(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$n(arg) { var key = _toPrimitive$n(arg, "string"); return _typeof$n(key) === "symbol" ? key : String(key); }
function _toPrimitive$n(input, hint) { if (_typeof$n(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$n(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$e(arr, i) { return _arrayWithHoles$e(arr) || _iterableToArrayLimit$e(arr, i) || _unsupportedIterableToArray$e(arr, i) || _nonIterableRest$e(); }
function _nonIterableRest$e() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$e(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$e(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen); }
function _arrayLikeToArray$e(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$e(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$e(arr) { if (Array.isArray(arr)) return arr; }
var FieldInput = function FieldInput(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder;
  var _useContext = useContext(TemplateFormContext),
    storeEditorRef = _useContext.storeEditorRef;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.templateForm'
    }),
    t = _useTranslation.t;
  useLayoutEffect(function () {
    setTimeout(function () {
      return storeEditorRef({
        id: 'shortcutInput'
      });
    }, 100);
  }, []);
  return /*#__PURE__*/jsxs("div", {
    className: styles$b.input,
    children: [/*#__PURE__*/jsx("input", {
      id: "shortcutInput",
      type: "text",
      placeholder: t('shortcutNamePlaceholder'),
      value: value,
      onChange: onChange
    }), !value && /*#__PURE__*/jsx("span", {
      className: styles$b.placeholder,
      children: placeholder
    })]
  });
};
var SubjectFormEditor = function SubjectFormEditor(_ref2) {
  var isTemplateModal = _ref2.isTemplateModal;
  var _useState = useState(null),
    _useState2 = _slicedToArray$e(_useState, 2),
    subjectEditor = _useState2[0],
    setSubjectEditor = _useState2[1];
  var _useContext2 = useContext(TemplateFormContext),
    template = _useContext2.template,
    setElements = _useContext2.setElements,
    plugins = _useContext2.plugins,
    storeEditorRef = _useContext2.storeEditorRef,
    focusedRef = _useContext2.focusedRef;
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useController = useController({
      control: control,
      name: 'subject'
    }),
    field = _useController.field;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'playbook.templateForm'
    }),
    t = _useTranslation2.t;
  useEffect(function () {
    setElements(field.value, template.subject, subjectEditor);
  }, [template === null || template === void 0 ? void 0 : template.subject, subjectEditor]);
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$b.nameEditor, _defineProperty$n({}, styles$b.withPadding, isTemplateModal)),
    onClick: function onClick() {
      return focusedRef.current = isTemplateModal ? 1 : 3;
    },
    children: /*#__PURE__*/jsx("div", {
      className: styles$b.subjectContainer,
      children: /*#__PURE__*/jsx(RichTextEditor, _objectSpread$h(_objectSpread$h({
        id: "templateSubjectEditor",
        placeholder: t('subjectPlaceholder'),
        plugins: plugins,
        setEditor: function setEditor(value) {
          setSubjectEditor(value);
          storeEditorRef === null || storeEditorRef === void 0 ? void 0 : storeEditorRef(value);
        },
        style: {
          width: '100%',
          padding: 0
        }
      }, field), {}, {
        children: function children(editor) {
          return /*#__PURE__*/jsxs("div", {
            className: styles$b.subjectFloatingTemplateVariableContainer,
            children: [editor, subjectEditor && /*#__PURE__*/jsx(FloatingTemplateVariable, {
              editor: subjectEditor
            })]
          });
        }
      }))
    })
  });
};
var ShortCutFormEditor = function ShortCutFormEditor(_ref3) {
  var isTemplateModal = _ref3.isTemplateModal;
  var _useFormContext2 = useFormContext(),
    control = _useFormContext2.control;
  var _useController2 = useController({
      control: control,
      name: 'shortcut'
    }),
    field = _useController2.field;
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'playbook.templateForm'
    }),
    t = _useTranslation3.t;
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$b.nameEditor, _defineProperty$n({}, styles$b.withPadding, isTemplateModal)),
    children: /*#__PURE__*/jsxs("div", {
      className: styles$b.templateNameContainer,
      children: [/*#__PURE__*/jsx(Tooltip, {
        title: t('shortcutTooltip'),
        position: "top",
        children: /*#__PURE__*/jsx(Icon, {
          name: "infoFilled",
          color: "darkBloobirds",
          size: 16
        })
      }), /*#__PURE__*/jsx(FieldInput, {
        value: field.value ? '/' + field.value : '',
        onChange: function onChange(value) {
          var cleanValue = value.target.value.replace(/\s|\//g, '');
          var parsedValue = cleanValue.length > 49 ? cleanValue.slice(0, 49) : cleanValue;
          field.onChange(parsedValue);
        },
        placeholder: t('shortcutPlaceholder')
      })]
    })
  });
};
var TemplateFormFieldsByType = function TemplateFormFieldsByType(_ref4) {
  var _ref4$isTemplateModal = _ref4.isTemplateModal,
    isTemplateModal = _ref4$isTemplateModal === void 0 ? false : _ref4$isTemplateModal;
  var _useContext3 = useContext(TemplateFormContext),
    template = _useContext3.template;
  switch (template === null || template === void 0 ? void 0 : template.type) {
    case TEMPLATE_TYPES.EMAIL:
      return /*#__PURE__*/jsx(SubjectFormEditor, {
        isTemplateModal: isTemplateModal
      });
    case TEMPLATE_TYPES.SNIPPET:
      return /*#__PURE__*/jsx(ShortCutFormEditor, {
        isTemplateModal: isTemplateModal
      });
    default:
      return null;
  }
};

function _typeof$m(obj) { "@babel/helpers - typeof"; return _typeof$m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$m(obj); }
function _slicedToArray$d(arr, i) { return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$d(); }
function _nonIterableRest$d() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$d(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$d(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen); }
function _arrayLikeToArray$d(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$d(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$d(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty$m(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$m(obj, key, value) { key = _toPropertyKey$m(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$m(arg) { var key = _toPrimitive$m(arg, "string"); return _typeof$m(key) === "symbol" ? key : String(key); }
function _toPrimitive$m(input, hint) { if (_typeof$m(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$m(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var labelProps = {
  uppercase: false,
  overrideStyle: {
    fontSize: '12px',
    padding: '2px 4px',
    height: '20px',
    fontWeight: 'var(--regular)'
  }
};
var StageLabel = function StageLabel(_ref) {
  var stage = _ref.stage;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.templateFormHeader'
    }),
    t = _useTranslation.t;
  switch (stage) {
    case TemplateStage.Prospecting:
      return /*#__PURE__*/jsx(Label, _objectSpread$g(_objectSpread$g({
        color: "lightestCall",
        textColor: "extraCall"
      }, labelProps), {}, {
        children: t('prospecting')
      }));
    case TemplateStage.Sales:
      return /*#__PURE__*/jsx(Label, _objectSpread$g(_objectSpread$g({
        color: "lightPeanut",
        textColor: "peanut"
      }, labelProps), {}, {
        children: t('sales')
      }));
    case TemplateStage.All:
      return /*#__PURE__*/jsx(Label, _objectSpread$g(_objectSpread$g({
        color: "lightBloobirds",
        textColor: "bloobirds"
      }, labelProps), {}, {
        children: t('prospectingAndSales')
      }));
    default:
      return /*#__PURE__*/jsx(Label, _objectSpread$g(_objectSpread$g({
        color: "lightTomato",
        textColor: "tomato"
      }, labelProps), {}, {
        children: t('noStage')
      }));
  }
};
var DateInformation = function DateInformation(_ref2) {
  var _ref2$data = _ref2.data,
    title = _ref2$data.title,
    user = _ref2$data.user,
    date = _ref2$data.date,
    icon = _ref2$data.icon,
    t = _ref2.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$b.dateInformation,
    children: [/*#__PURE__*/jsx(Icon, {
      name: icon,
      size: 18,
      color: "lightPurple"
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      weight: "bold",
      children: title
    }), /*#__PURE__*/jsx("div", {
      className: styles$b.dateContent,
      children: /*#__PURE__*/jsx(Text, {
        size: "xs",
        weight: "medium",
        children: t('userOnDate', {
          user: user,
          date: date
        })
      })
    })]
  });
};
function formatDatetime(value, pattern) {
  var date = useGetI18nSpacetime(value, getUserTimeZone()).unixFmt(pattern);
  if (!value) return 'Undefined date';
  return date;
}
var TemplateInformation = function TemplateInformation(_ref3) {
  var _users$find;
  var template = _ref3.template;
  var _ref4 = useUserSearch() || {},
    users = _ref4.users;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'playbook.templateFormHeader'
    }),
    t = _useTranslation2.t,
    i18n = _useTranslation2.i18n;
  var pattern = i18n.language === 'es' ? 'dd MM yyyy h:mm a' : 'yyyy MM dd h:mm a';
  var creationInfo = {
    title: t('createdBy'),
    user: users === null || users === void 0 ? void 0 : (_users$find = users.find(function (user) {
      return user.id === template.createdBy;
    })) === null || _users$find === void 0 ? void 0 : _users$find.name,
    date: formatDatetime(template.creationDatetime, pattern),
    icon: 'calendar'
  };
  var lastUpdatedInfo = {
    title: t('lastUpdatedBy'),
    user: template.updatedBy,
    date: formatDatetime(template.updateDatetime, pattern),
    icon: 'refresh'
  };
  return /*#__PURE__*/jsxs("div", {
    className: styles$b.templateInfoEditing,
    children: [/*#__PURE__*/jsx(DateInformation, {
      data: creationInfo,
      t: t
    }), /*#__PURE__*/jsx(DateInformation, {
      data: lastUpdatedInfo,
      t: t
    })]
  });
};
var TemplateHeader$1 = function TemplateHeader() {
  var _useFormContext = useFormContext(),
    watch = _useFormContext.watch;
  var stage = watch('stage');
  var visible = watch('visibility');
  var official = watch('isOfficial');
  var battlecard = watch('isBattlecard');
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$d(_useHover, 2),
    anchorRef = _useHover2[0],
    isHovering = _useHover2[1];
  var _useVisible = useVisible(false, anchorRef),
    ref = _useVisible.ref,
    infoVisible = _useVisible.visible,
    setInfoVisible = _useVisible.setVisible;
  var _useTranslation3 = useTranslation('translation', {
      keyPrefix: 'playbook.templateFormHeader'
    }),
    t = _useTranslation3.t;
  useEffect(function () {
    setInfoVisible(isHovering);
  }, [isHovering]);
  var _useContext = useContext(TemplateFormContext),
    template = _useContext.template;
  var isEditing = !!template.id;
  var isSnippet = (template === null || template === void 0 ? void 0 : template.type) === TEMPLATE_TYPES.SNIPPET;
  return /*#__PURE__*/jsxs("div", {
    className: styles$b.templateInfoWrapper,
    children: [/*#__PURE__*/jsx(StageLabel, {
      stage: stage
    }), /*#__PURE__*/jsx("div", {
      className: styles$b.separator
    }), /*#__PURE__*/jsx(Label, {
      textColor: "purple",
      color: "verySoftPurple",
      uppercase: false,
      overrideStyle: {
        fontSize: '12px',
        padding: '2px 4px',
        height: '20px',
        fontWeight: 'var(--regular)'
      },
      children: /*#__PURE__*/jsxs("div", {
        className: styles$b.visibilityLabel,
        children: [/*#__PURE__*/jsx(Icon, {
          name: visible === 'PUBLIC' ? 'unlock' : 'lock',
          color: "lightPurple",
          size: 14,
          className: styles$b._lock__icon
        }), visible === 'PUBLIC' ? t('public') : t('private')]
      })
    }), official && /*#__PURE__*/jsx(Tooltip, {
      title: t('official'),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: "bookmark",
        color: "purple"
      })
    }), isSnippet && battlecard && /*#__PURE__*/jsx(Tooltip, {
      title: t('battlecard'),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: "battlecards",
        color: "purple"
      })
    }), isEditing && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        className: styles$b.separator
      }), /*#__PURE__*/jsx(Dropdown, {
        anchor: /*#__PURE__*/jsx("div", {
          ref: anchorRef,
          className: styles$b.dropdownAnchorWrapper,
          children: /*#__PURE__*/jsx(Icon, {
            name: "infoFilled",
            color: "darkBloobirds",
            size: 20
          })
        }),
        visible: infoVisible,
        ref: ref,
        children: /*#__PURE__*/jsx("div", {
          className: styles$b.dropdownWrapper,
          children: /*#__PURE__*/jsx(TemplateInformation, {
            template: template
          })
        })
      })]
    })]
  });
};

function _typeof$l(obj) { "@babel/helpers - typeof"; return _typeof$l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$l(obj); }
var _excluded$2 = ["template", "contextProps"];
function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty$l(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$l(obj, key, value) { key = _toPropertyKey$l(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$l(arg) { var key = _toPrimitive$l(arg, "string"); return _typeof$l(key) === "symbol" ? key : String(key); }
function _toPrimitive$l(input, hint) { if (_typeof$l(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$l(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var TemplateFormContext = /*#__PURE__*/createContext(null);
var TemplateForm = function TemplateForm(_ref) {
  var template = _ref.template,
    contextProps = _ref.contextProps,
    attachedFilesFunctions = _objectWithoutProperties$2(_ref, _excluded$2);
  var _useFormContext = useFormContext(),
    isDirty = _useFormContext.formState.isDirty;
  var singleLinePlugins = useRichTextEditorPlugins({
    templateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  var setElements = function setElements(templateFieldValue, templateValue, editor) {
    var paragraph = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (editor && !!(isDirty && templateFieldValue ? templateFieldValue : templateValue)) {
      var toJson = function toJson(e) {
        return typeof e === 'string' ? JSON.parse(removeHtmlTags(e)) : e;
      };
      var parseValue = function parseValue(e) {
        return paragraph ? createParagraph(e) : toJson(e);
      };
      var value = isDirty && templateFieldValue ? templateFieldValue : parseValue(templateValue);
      resetEditorChildren(editor);
      insertElements(editor, value, {
        at: [0]
      });
    }
  };
  return /*#__PURE__*/jsxs(TemplateFormContext.Provider, {
    value: _objectSpread$f(_objectSpread$f({}, contextProps), {}, {
      template: template,
      setElements: setElements,
      plugins: singleLinePlugins
    }),
    children: [/*#__PURE__*/jsx(TemplateHeader$1, {}), /*#__PURE__*/jsx(NameFormEditor, {}), /*#__PURE__*/jsx(TemplateFormFieldsByType, {}), /*#__PURE__*/jsx(MainContentFormEditor, _objectSpread$f({}, attachedFilesFunctions))]
  });
};

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty$k(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _slicedToArray$c(arr, i) { return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$c(arr, i) || _nonIterableRest$c(); }
function _nonIterableRest$c() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }
function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$c(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$c(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty$k(obj, key, value) { key = _toPropertyKey$k(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$k(arg) { var key = _toPrimitive$k(arg, "string"); return _typeof$k(key) === "symbol" ? key : String(key); }
function _toPrimitive$k(input, hint) { if (_typeof$k(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$k(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof$k(obj) { "@babel/helpers - typeof"; return _typeof$k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$k(obj); }
function isSegmentationValues(values) {
  return !!values && (!!values[TemplateStage.Prospecting] && _typeof$k(values[TemplateStage.Prospecting]) === 'object' || !!values[TemplateStage.Sales] && _typeof$k(values[TemplateStage.Sales]) === 'object');
}
var defaultTemplate = {
  segmentationValues: _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, {}), TemplateStage.Sales, {}),
  stage: TemplateStage.All,
  visibility: 'PRIVATE',
  isOfficial: false,
  isBattlecard: false
};
var getSegmentationValuesToSendToDB = function getSegmentationValuesToSendToDB(segmentationValues, stage) {
  var newValues = {};
  if (stage === TemplateStage.All) {
    newValues = _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, {}), TemplateStage.Sales, {});
    Object.entries(segmentationValues[TemplateStage.Prospecting]).forEach(function (_ref) {
      var _ref2 = _slicedToArray$c(_ref, 2),
        fieldId = _ref2[0],
        values = _ref2[1];
      if (values && values.length) {
        newValues[TemplateStage.Prospecting] = _objectSpread$e(_objectSpread$e({}, newValues[TemplateStage.Prospecting] || {}), {}, _defineProperty$k({}, fieldId, values));
      }
    });
    Object.entries(segmentationValues[TemplateStage.Sales]).forEach(function (_ref3) {
      var _ref4 = _slicedToArray$c(_ref3, 2),
        fieldId = _ref4[0],
        values = _ref4[1];
      if (values && values.length) {
        newValues[TemplateStage.Sales] = _objectSpread$e(_objectSpread$e({}, newValues[TemplateStage.Sales] || {}), {}, _defineProperty$k({}, fieldId, values));
      }
    });
  } else {
    newValues = _defineProperty$k({}, stage, {});
    Object.entries(segmentationValues[stage]).forEach(function (_ref5) {
      var _ref6 = _slicedToArray$c(_ref5, 2),
        fieldId = _ref6[0],
        values = _ref6[1];
      if (values && values.length) {
        newValues[stage] = _objectSpread$e(_objectSpread$e({}, newValues[stage]), {}, _defineProperty$k({}, fieldId, values));
      }
    });
  }
  return newValues;
};
var parseSegmentationValues = function parseSegmentationValues(values, stage) {
  if (isSegmentationValues(values)) {
    return _objectSpread$e(_objectSpread$e({}, defaultTemplate.segmentationValues), values);
  }
  if (!!values && _typeof$k(values) === 'object') {
    switch (stage) {
      case TemplateStage.Prospecting:
        return _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, values), TemplateStage.Sales, {});
      case TemplateStage.Sales:
        return _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, {}), TemplateStage.Sales, values);
      case TemplateStage.All:
      default:
        return _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, {}), TemplateStage.Sales, {});
    }
  } else {
    return _defineProperty$k(_defineProperty$k({}, TemplateStage.Prospecting, {}), TemplateStage.Sales, {});
  }
};

function _typeof$j(obj) { "@babel/helpers - typeof"; return _typeof$j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$j(obj); }
function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof$j(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray$b(arr, i) { return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$b(); }
function _nonIterableRest$b() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$b(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$b(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen); }
function _arrayLikeToArray$b(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$b(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$b(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty$j(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$j(obj, key, value) { key = _toPropertyKey$j(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$j(arg) { var key = _toPrimitive$j(arg, "string"); return _typeof$j(key) === "symbol" ? key : String(key); }
function _toPrimitive$j(input, hint) { if (_typeof$j(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$j(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getFocusPoint(focusedEditor, currentSelectedIndex) {
  return currentSelectedIndex !== 1 ? Editor.end(focusedEditor, []) : focusedEditor.selection;
}
var HandleTemplate = function HandleTemplate(_ref) {
  _ref.accountId;
    var onBack = _ref.onBack,
    template = _ref.template,
    contextValues = _ref.contextValues,
    mutateSnippets = _ref.mutateSnippets,
    contextProps = _ref.contextProps;
  var editorsRef = contextProps.editorsRef,
    editorsStored = contextProps.editorsStored,
    focusedRef = contextProps.focusedRef,
    updateFocusedIndex = contextProps.updateFocusedIndex;
  var isEditing = !!(template !== null && template !== void 0 && template.id);
  var isSnippet = (template === null || template === void 0 ? void 0 : template.type) === TEMPLATE_TYPES.SNIPPET;
  var defaultStage = useMemo(function () {
    if (isEditing) {
      return contextValues.stage === 'PROSPECTING' ? {
        stage: TemplateStage.Prospecting
      } : contextValues;
    } else {
      return {
        stage: TemplateStage.All
      };
    }
  }, [template === null || template === void 0 ? void 0 : template.id, contextValues === null || contextValues === void 0 ? void 0 : contextValues.stage]);
  var defaultValues = _objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d({}, defaultTemplate), defaultStage), template), {}, {
    segmentationValues: parseSegmentationValues(template.segmentationValues, template.stage)
  });
  var formMethods = useForm({
    defaultValues: defaultValues
  });
  var handleSubmit = formMethods.handleSubmit,
    setError = formMethods.setError,
    reset = formMethods.reset;
  var _useMessagingTemplate = useMessagingTemplate(template === null || template === void 0 ? void 0 : template.id),
    saveMessagingTemplate = _useMessagingTemplate.saveMessagingTemplate;
  var _useState = useState(false),
    _useState2 = _slicedToArray$b(_useState, 2),
    viewSegmentation = _useState2[0],
    setViewSegmentation = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$b(_useState3, 2),
    isOpenModal = _useState4[0],
    setIsOpenModal = _useState4[1];
  var attachedFilesFunctions = useAttachedFiles();
  var attachedFiles = attachedFilesFunctions.attachedFiles,
    syncAttachments = attachedFilesFunctions.syncAttachments;
  var _useCadencesUsingTemp = useCadencesUsingTemplate(template === null || template === void 0 ? void 0 : template.id),
    cadencesUsingTemplate = _useCadencesUsingTemp.cadencesUsingTemplate;
  // eslint-disable-next-line prettier/prettier
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.handleTemplate'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    var _template$mediaFiles;
    reset(defaultValues);
    // sync attachments from minimized template
    if ((template === null || template === void 0 ? void 0 : (_template$mediaFiles = template.mediaFiles) === null || _template$mediaFiles === void 0 ? void 0 : _template$mediaFiles.length) > 0) {
      syncAttachments(template.mediaFiles);
    }
  }, [template]);
  function switchView() {
    setViewSegmentation(!viewSegmentation);
  }
  var onSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee(data) {
      var isNameEmpty, _data$name$0$children, _template$type, newMessagingTemplate, res;
      return _regeneratorRuntime$1().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            isNameEmpty = !data || !data.name || !data.name[0].children || data.name[0].children[0].text === '';
            if (!isNameEmpty) {
              _context.next = 6;
              break;
            }
            switchView();
            setError('name', {
              type: 'required',
              message: t('toasts.nameRequired')
            });
            _context.next = 11;
            break;
          case 6:
            newMessagingTemplate = _objectSpread$d(_objectSpread$d(_objectSpread$d(_objectSpread$d({}, data), template !== null && template !== void 0 && template.id ? {
              id: template === null || template === void 0 ? void 0 : template.id
            } : {}), {}, {
              name: (_data$name$0$children = data.name[0].children) === null || _data$name$0$children === void 0 ? void 0 : _data$name$0$children[0].text,
              subject: data.subject ? JSON.stringify(data.subject) : ''
            }, data.shortcut ? {
              shortcut: data.shortcut
            } : {}), {}, {
              content: data.content ? JSON.stringify(data.content) : '',
              segmentationValues: getSegmentationValuesToSendToDB(data.segmentationValues, data.stage),
              visibility: data.visibility,
              type: (_template$type = template === null || template === void 0 ? void 0 : template.type) !== null && _template$type !== void 0 ? _template$type : TEMPLATE_TYPES.EMAIL,
              format: 'AST',
              mediaFileIds: (attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0 ? attachedFiles.map(function (file) {
                return file.id;
              }) : []
            });
            _context.next = 9;
            return saveMessagingTemplate(newMessagingTemplate);
          case 9:
            res = _context.sent;
            if (res === 409) {
              createToast({
                type: 'error',
                message: t('toasts.nameAlreadyExists')
              });
            } else {
              createToast({
                type: 'success',
                message: t('toasts.success')
              });
              onBack();
              window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
              mutateSnippets();
            }
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  function handleConfirm() {
    handleSubmit(function (data) {
      return onSubmit(data);
    }, function (err) {
      return console.log('error', err);
    })();
  }
  function handleSave() {
    if (isEditing && cadencesUsingTemplate && cadencesUsingTemplate !== null && cadencesUsingTemplate !== void 0 && cadencesUsingTemplate.length) {
      setIsOpenModal(true);
    } else {
      handleConfirm();
    }
  }
  function handleEvent(e) {
    if (e.key === 'Tab') {
      updateFocusedIndex();
      e.stopPropagation();
      var focusedEditor = editorsRef.current[focusedRef.current];
      if ((focusedEditor === null || focusedEditor === void 0 ? void 0 : focusedEditor.id) === 'shortcutInput') {
        var shortcutInput = document.getElementById('shortcutInput');
        setTimeout(function () {
          var _shortcutInput$value, _shortcutInput$value2;
          shortcutInput === null || shortcutInput === void 0 ? void 0 : shortcutInput.focus();
          shortcutInput === null || shortcutInput === void 0 ? void 0 : shortcutInput.setSelectionRange(shortcutInput === null || shortcutInput === void 0 ? void 0 : (_shortcutInput$value = shortcutInput.value) === null || _shortcutInput$value === void 0 ? void 0 : _shortcutInput$value.length, shortcutInput === null || shortcutInput === void 0 ? void 0 : (_shortcutInput$value2 = shortcutInput.value) === null || _shortcutInput$value2 === void 0 ? void 0 : _shortcutInput$value2.length);
        });
      } else {
        var focusPoint = getFocusPoint(focusedEditor, focusedRef.current);
        setTimeout(function () {
          return focusEditor(focusedEditor, focusPoint);
        }, 0);
      }
    }
  }
  var memoedFunction = useCallback(handleEvent, [editorsStored]);
  useEffect(function () {
    if (editorsStored) {
      window.addEventListener('keydown', memoedFunction, true);
      return function () {
        window.removeEventListener('keydown', memoedFunction, true);
      };
    }
  }, [editorsStored]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$b.container,
    children: [/*#__PURE__*/jsxs(FormProvider, _objectSpread$d(_objectSpread$d({}, formMethods), {}, {
      children: [/*#__PURE__*/jsx(HandleTemplateHeader, {
        onBack: onBack,
        handleSave: handleSave,
        viewSegmentation: viewSegmentation,
        switchView: switchView,
        isEditing: isEditing,
        isSnippet: isSnippet
      }), viewSegmentation ? /*#__PURE__*/jsx(SegmentationForm, {
        canBeBattlecard: isSnippet
      }) : /*#__PURE__*/jsx(TemplateForm, _objectSpread$d({
        template: template,
        contextProps: contextProps
      }, attachedFilesFunctions))]
    })), /*#__PURE__*/jsx(PlaybookConfirmationModal, {
      openMode: isOpenModal && t('save'),
      onAccept: handleConfirm,
      onClose: function onClose() {
        return setIsOpenModal(false);
      },
      cadencesUsingTemplate: cadencesUsingTemplate
    })]
  });
};

var Environment;
(function (Environment) {
  Environment[Environment["SMART_EMAIL"] = 0] = "SMART_EMAIL";
  Environment[Environment["EXTENSION"] = 1] = "EXTENSION";
  Environment[Environment["DIALER"] = 2] = "DIALER";
  Environment[Environment["LINKEDIN_TEMPLATE_SELECTOR"] = 3] = "LINKEDIN_TEMPLATE_SELECTOR";
  Environment[Environment["WHATSAPP_TEMPLATE_SELECTOR"] = 4] = "WHATSAPP_TEMPLATE_SELECTOR";
})(Environment || (Environment = {}));

var css_248z$a = ".playbookFeed-module_container__KPrQw {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n/* Linkedin overrides */\n.playbookFeed-module_container__KPrQw input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: auto !important;\n  border: none !important;\n  width: 100%;\n}\n\n.playbookFeed-module_header_container__41WXx {\n  background-color: var(--verySoftPurple);\n  padding: 16px;\n  margin-bottom: 6px;\n}\n\n.playbookFeed-module_noBorder__xqQwA > input {\n  box-shadow: none;\n}\n\n.playbookFeed-module_cards_container__0IAxb {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  overscroll-behavior-y: contain;\n}\n.playbookFeed-module_cards_container_contact__hGnzh {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  overscroll-behavior-y: contain;\n}\n.playbookFeed-module_cards_spinner__F4n96 {\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}\n\n.playbookFeed-module_title_container__MCIFJ {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n}\n\n.playbookFeed-module_title_container__MCIFJ > p {\n  font-size: 18px;\n}\n\n.playbookFeed-module_tabs_container__oryzS {\n  display: flex;\n  justify-content: center;\n  margin-top: 6px;\n}\n\n.playbookFeed-module_see_tabs_container__jsfm1 {\n  display: flex;\n  justify-content: space-evenly;\n  margin-top: 6px;\n}\n\n.playbookFeed-module_see_tabs_item__AScHL {\n  display: flex;\n  width: 160px;\n  padding: 12px 0;\n  justify-content: center;\n  gap: 3px;\n  border-top: 1px solid transparent;\n  align-items: center;\n  cursor: pointer;\n}\n\n.playbookFeed-module_see_tabs_item__AScHL > p {\n  font-size: 13px;\n}\n\n.playbookFeed-module_tab_container__HjPn5 {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 8px;\n  cursor: pointer;\n  border-top: 1px solid transparent;\n}\n\n.playbookFeed-module_templateCardButtons__90TOf {\n  background-color: var(--white);\n  display: flex;\n  flex-direction: row;\n  align-self: end;\n  position: absolute;\n  top: 10px;\n  right: 8px;\n  padding: 4px;\n}\n\n.playbookFeed-module_qqHoverButtons__v44SN {\n  position: absolute;\n  top: 10px;\n  right: 8px;\n  padding: 4px;\n}\n\n.playbookFeed-module_headerTitle__R69um {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.playbookFeed-module_templateSection__R7kPw {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 12px 8px 0;\n}\n\n.playbookFeed-module_templateSectionSidePeek__sW0iM {\n  padding: 12px 24px 8px;\n}\n\n.playbookFeed-module_smartTemplateSection__pPDZ7 {\n  padding: 16px 24px 0;\n}\n\n.playbookFeed-module_templateAddButton__wOswy {\n  flex: 1;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n  margin-right: 8px;\n}\n\n.playbookFeed-module_templateAddButton__wOswy:hover {\n  cursor: pointer;\n}\n\n.playbookFeed-module_headerTitle__R69um > div[class^='SmallInput'] {\n  width: 124px !important;\n  border: 0;\n}\n\n.playbookFeed-module_headerTitle__R69um > div[class^='SmallInput'] > div > input {\n  color: var(--purple);\n  background-color: transparent;\n}\n\n.playbookFeed-module_headerTitle__R69um > div[class^='SmallInput'] > div {\n  border: 1px solid var(--lightPurple);\n  background-color: var(--white);\n}\n\n.playbookFeed-module_spinner__IiMCP {\n  width: 100%;\n  height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.playbookFeed-module_segmentedFor__qnFyW {\n  flex-shrink: 0;\n  flex-grow: 0;\n  margin-right: 4px;\n}\n\n.playbookFeed-module_selectedValuesNames__-yTyf {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.playbookFeed-module_buttonText__pJ4t8 {\n  display: flex;\n  overflow: hidden;\n}\n\n.playbookFeed-module_buttonContent__qeSCf {\n  display: flex;\n  justify-content: space-between;\n  overflow: hidden;\n}\n\n.playbookFeed-module_sectionName__gF9D9 {\n  padding-left: 12px;\n}\n\n.playbookFeed-module_selectorWrapper__sX8qP {\n  display: flex;\n  justify-content: center;\n}\n\n.playbookFeed-module_contentWrapper__FgkhZ {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.playbookFeed-module_contentWrapper__FgkhZ > Button {\n  padding: 4px 6px;\n}\n\n.playbookFeed-module_contentWrapper__FgkhZ svg {\n  flex-shrink: 0;\n}\n.playbookFeed-module_buttonButtons__oLaRn {\n  display: flex;\n}\n\n.playbookFeed-module_buttonButtons__oLaRn > button {\n  margin-top: -1px;\n}\n\n.playbookFeed-module_title_sidePeek__1ddco {\n  font-size: 13px;\n}\n\n.playbookFeed-module_invisibleFooter__nLIBJ {\n  height: 20px;\n  margin-top: 8px;\n  position: relative;\n  border: 2px solid transparent;\n}\n\n.playbookFeed-module_suggestionsButton__8YBGL {\n  background: var(--lightBloobirds) !important;\n  border: 1px solid var(--softBloobirds) !important;\n  border-radius: 4px;\n  padding: 2px 6px !important;\n  margin-left: 4px !important;\n}\n";
var styles$9 = {"container":"playbookFeed-module_container__KPrQw","header_container":"playbookFeed-module_header_container__41WXx","noBorder":"playbookFeed-module_noBorder__xqQwA","cards_container":"playbookFeed-module_cards_container__0IAxb","cards_container_contact":"playbookFeed-module_cards_container_contact__hGnzh","cards_spinner":"playbookFeed-module_cards_spinner__F4n96","title_container":"playbookFeed-module_title_container__MCIFJ","tabs_container":"playbookFeed-module_tabs_container__oryzS","see_tabs_container":"playbookFeed-module_see_tabs_container__jsfm1","see_tabs_item":"playbookFeed-module_see_tabs_item__AScHL","tab_container":"playbookFeed-module_tab_container__HjPn5","templateCardButtons":"playbookFeed-module_templateCardButtons__90TOf","qqHoverButtons":"playbookFeed-module_qqHoverButtons__v44SN","headerTitle":"playbookFeed-module_headerTitle__R69um","templateSection":"playbookFeed-module_templateSection__R7kPw","templateSectionSidePeek":"playbookFeed-module_templateSectionSidePeek__sW0iM","smartTemplateSection":"playbookFeed-module_smartTemplateSection__pPDZ7","templateAddButton":"playbookFeed-module_templateAddButton__wOswy","spinner":"playbookFeed-module_spinner__IiMCP","segmentedFor":"playbookFeed-module_segmentedFor__qnFyW","selectedValuesNames":"playbookFeed-module_selectedValuesNames__-yTyf","buttonText":"playbookFeed-module_buttonText__pJ4t8","buttonContent":"playbookFeed-module_buttonContent__qeSCf","sectionName":"playbookFeed-module_sectionName__gF9D9","selectorWrapper":"playbookFeed-module_selectorWrapper__sX8qP","contentWrapper":"playbookFeed-module_contentWrapper__FgkhZ","buttonButtons":"playbookFeed-module_buttonButtons__oLaRn","title_sidePeek":"playbookFeed-module_title_sidePeek__1ddco","invisibleFooter":"playbookFeed-module_invisibleFooter__nLIBJ","suggestionsButton":"playbookFeed-module_suggestionsButton__8YBGL"};
styleInject(css_248z$a);

function _typeof$i(obj) { "@babel/helpers - typeof"; return _typeof$i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$i(obj); }
function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty$i(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$i(obj, key, value) { key = _toPropertyKey$i(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$i(arg) { var key = _toPrimitive$i(arg, "string"); return _typeof$i(key) === "symbol" ? key : String(key); }
function _toPrimitive$i(input, hint) { if (_typeof$i(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$i(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PlaybookTabElement = function PlaybookTabElement(props) {
  var name = props.name,
    icon = props.icon,
    _onClick = props.onClick,
    selected = props.selected,
    sidePeekEnabled = props.sidePeekEnabled,
    className = props.className,
    dataTest = props.dataTest,
    isSmartEmail = props.isSmartEmail;
  var isSelected = selected === name;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var isSmallScreen = window.innerWidth < 1440;
  var largeView = useMemo(function () {
    return sidePeekEnabled && !isSmallScreen;
  }, [sidePeekEnabled, isSmallScreen]);
  var TooltipWrapper = function TooltipWrapper(_ref) {
    var children = _ref.children;
    return largeView || isSmartEmail ? /*#__PURE__*/jsxs(Fragment, {
      children: [" ", children, " "]
    }) : /*#__PURE__*/jsx(Tooltip, {
      title: t("playbook.".concat(name.toLowerCase())),
      position: "bottom",
      children: children
    });
  };
  var AnimationWrapper = function AnimationWrapper(_ref2) {
    var children = _ref2.children;
    return largeView || isSmartEmail ? /*#__PURE__*/jsx(Fragment, {
      children: children
    }) : isSelected && /*#__PURE__*/jsx(motion.div, {
      initial: {
        opacity: 0,
        y: -10
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        type: 'flex'
      },
      children: children
    }, name);
  };
  return /*#__PURE__*/jsx(TooltipWrapper, {
    children: /*#__PURE__*/jsxs("div", _objectSpread$c(_objectSpread$c({
      style: {
        width: largeView ? 74 : undefined
      },
      className: clsx(className || styles$9.tab_container),
      onClick: function onClick() {
        if (_onClick) {
          _onClick(name);
          mixpanel.track("CLICK_ON_".concat(templateTypes[name], "_SECTION_FROM_PLAYBOOK_OTO"));
        }
      }
    }, dataTest ? {
      'data-test': dataTest
    } : {}), {}, {
      children: [/*#__PURE__*/jsx(Icon, {
        name: icon,
        color: isSelected ? 'purple' : 'softPeanut',
        size: largeView ? 24 : 20
      }), /*#__PURE__*/jsx(AnimationWrapper, {
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: isSelected ? 'purple' : 'softPeanut',
          weight: isSelected ? 'bold' : 'regular',
          className: styles$9.title_sidePeek,
          children: t("playbook.".concat(name.toLowerCase()))
        })
      })]
    }))
  });
};

function _typeof$h(obj) { "@babel/helpers - typeof"; return _typeof$h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$h(obj); }
function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty$h(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$h(obj, key, value) { key = _toPropertyKey$h(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$h(arg) { var key = _toPrimitive$h(arg, "string"); return _typeof$h(key) === "symbol" ? key : String(key); }
function _toPrimitive$h(input, hint) { if (_typeof$h(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$h(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PlaybookTabs = /*#__PURE__*/memo(function (_ref) {
  var environment = _ref.environment,
    hasSnippetsEnabled = _ref.hasSnippetsEnabled,
    hasWhatsappEnabled = _ref.hasWhatsappEnabled,
    tabSelected = _ref.tabSelected,
    handleChangeTab = _ref.handleChangeTab,
    sidePeekEnabled = _ref.sidePeekEnabled;
  var props = {
    onClick: handleChangeTab,
    selected: tabSelected,
    sidePeekEnabled: sidePeekEnabled,
    isSmartEmail: environment === Environment.SMART_EMAIL
  };
  switch (environment) {
    case Environment.SMART_EMAIL:
      return hasSnippetsEnabled ? /*#__PURE__*/jsxs("div", {
        className: styles$9.tabs_container,
        children: [/*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.EMAILS,
          icon: "mail",
          className: styles$9.see_tabs_item,
          dataTest: "playbook-tab-emails-SEE"
        }, props)), /*#__PURE__*/jsxs("div", {
          style: {
            position: 'relative',
            display: 'flex'
          },
          children: [/*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
            name: PlaybookTab.SNIPPETS,
            icon: "snippet",
            className: styles$9.see_tabs_item,
            dataTest: "playbook-tab-snippets-SEE"
          }, props)), /*#__PURE__*/jsx(SnippetsTooltip, {})]
        })]
      }) : null;
    case Environment.EXTENSION:
      return /*#__PURE__*/jsxs("div", {
        className: styles$9.tabs_container,
        children: [/*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.PITCHES,
          icon: "chat"
        }, props)), hasSnippetsEnabled && /*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.SNIPPETS,
          icon: "snippet"
        }, props)), /*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.EMAILS,
          icon: "mail"
        }, props)), /*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.LINKEDIN,
          icon: "linkedin"
        }, props)), hasWhatsappEnabled && /*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.WHATSAPP,
          icon: "whatsapp"
        }, props)), /*#__PURE__*/jsx(PlaybookTabElement, _objectSpread$b({
          name: PlaybookTab.QQS,
          icon: "chatSupport"
        }, props))]
      });
    case Environment.DIALER:
    case Environment.LINKEDIN_TEMPLATE_SELECTOR:
    case Environment.WHATSAPP_TEMPLATE_SELECTOR:
      return /*#__PURE__*/jsx(Fragment, {});
  }
}, function (prevProps, nextProps) {
  return prevProps.tabSelected === nextProps.tabSelected;
});

function _typeof$g(obj) { "@babel/helpers - typeof"; return _typeof$g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$g(obj); }
function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty$g(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$g(obj, key, value) { key = _toPropertyKey$g(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$g(arg) { var key = _toPrimitive$g(arg, "string"); return _typeof$g(key) === "symbol" ? key : String(key); }
function _toPrimitive$g(input, hint) { if (_typeof$g(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$g(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$a(arr, i) { return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a(); }
function _nonIterableRest$a() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }
function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$a(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$a(arr) { if (Array.isArray(arr)) return arr; }
var PlaybookFeedContext = /*#__PURE__*/React.createContext(null);
var PlaybookFeedProvider = function PlaybookFeedProvider(_ref) {
  var _props$activeBobject, _props$activeBobject$;
  var props = _ref.props,
    children = _ref.children;
  var QQsHandling = useQualifyingQuestions({
    enabled: true,
    stage: props.stage,
    segmentationValues: props.segmentationValues,
    bobjectType: (_props$activeBobject = props.activeBobject) === null || _props$activeBobject === void 0 ? void 0 : (_props$activeBobject$ = _props$activeBobject.id) === null || _props$activeBobject$ === void 0 ? void 0 : _props$activeBobject$.typeName
  });
  var _useState = useState(),
    _useState2 = _slicedToArray$a(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  return /*#__PURE__*/jsx(PlaybookFeedContext.Provider, {
    value: _objectSpread$a(_objectSpread$a({
      searchValue: searchValue,
      setSearchValue: setSearchValue
    }, QQsHandling), props),
    children: children
  });
};
var usePlaybookFeed = function usePlaybookFeed() {
  var context = React.useContext(PlaybookFeedContext);
  if (context === undefined) {
    throw new Error('useSubhomeFilters must be used within a SubhomeFiltersProvider');
  }
  return context;
};

var useIsTemplateOwner = function useIsTemplateOwner(template) {
  var _settings$user, _settings$user$roles, _settings$user2, _settings$user2$roles, _settings$user3;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var isAdmin = (settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : (_settings$user$roles = _settings$user.roles) === null || _settings$user$roles === void 0 ? void 0 : _settings$user$roles.includes(UserRole.GLOBAL_ADMIN)) || (settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : (_settings$user2$roles = _settings$user2.roles) === null || _settings$user2$roles === void 0 ? void 0 : _settings$user2$roles.includes(UserRole.ACCOUNT_ADMIN));
  return (settings === null || settings === void 0 ? void 0 : (_settings$user3 = settings.user) === null || _settings$user3 === void 0 ? void 0 : _settings$user3.id) === (template === null || template === void 0 ? void 0 : template.createdBy) || !(template !== null && template !== void 0 && template.createdBy) || isAdmin;
};

var css_248z$9 = ".playbookCard-module_container__LsClD {\n  border: 1px solid var(--veryLightBloobirds);\n  display: flex;\n  flex-direction: column;\n  margin: 8px 8px 0 8px;\n  background-color: white;\n  transition: background-color 0.3s;\n  cursor: pointer;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.0843);\n  border-radius: 4px;\n}\n.playbookCard-module_container__LsClD:hover {\n  transition: background-color 0.3s;\n  background-color: var(--verySoftPurple);\n}\n\n.playbookCard-module_containerSmartEmail__Vr5lM {\n  margin: 8px 24px 0 24px;\n}\n\n.playbookCard-module_containerSidePeek__YSrd- {\n  margin: 8px 24px;\n}\n\n.playbookCard-module_qq_container__3w-Wb {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  margin: 0 16px;\n}\n\n.playbookCard-module_container__LsClD:last-child {\n  margin-bottom: 16px;\n}\n\n.playbookCard-module_cardText__ztERv {\n  display: flex;\n  position: relative;\n  padding: 16px 16px 8px 8px;\n  white-space: break-spaces;\n  font-weight: bold;\n}\n\n.playbookCard-module_cardTextSidePeek__HE2Qf {\n  padding: 16px 16px 8px 16px;\n}\n\n.playbookCard-module_qq_cardText__Ylr8d {\n  display: flex;\n  overflow: hidden;\n  white-space: break-spaces;\n  font-weight: bold;\n  gap: 10px;\n}\n\n.playbookCard-module_cardText__ztERv > p,\n.playbookCard-module_qq_cardText__Ylr8d > p {\n  width: 100%;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n}\n\n.playbookCard-module_templateTextWrapper__A8ghg {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 90%;\n}\n\n.playbookCard-module_templateText__Uq2yu {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.playbookCard-module_templateText__Uq2yu * {\n  line-height: 20px;\n}\n\n.playbookCard-module_templateText__Uq2yu > p:first-child {\n  font-size: 14px;\n}\n\n.playbookCard-module_shortcutContainer__3ZN3X {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex: 1;\n}\n\n.playbookCard-module_shortcut__cNDCz {\n  background-color: var(--veryLightBloobirds);\n  padding: 2px 4px;\n  border-radius: 4px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.playbookCard-module_cardText__ztERv {\n  max-width: 100%;\n}\n\n.playbookCard-module_cardText__ztERv > svg {\n  margin-right: 10px;\n}\n\n.playbookCard-module_qq_cardContent__jRBry {\n  margin: 16px 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.playbookCard-module_templateBody__DN6yN {\n  font-weight: normal;\n  word-wrap: break-word;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.playbookCard-module_templateBody__DN6yN > div {\n  display: inline-block;\n}\n\n.playbookCard-module_templateBody__DN6yN > * > strong {\n  font-weight: normal;\n}\n\n.playbookCard-module_templateBody__DN6yN > br {\n  display: none;\n}\n\n.playbookCard-module_buttonsContainer__oQpCL {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n  gap: 8px;\n  height: 24px;\n}\n\n.playbookCard-module_smartButtonsContainer__v-YsD {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n  gap: 6px;\n  transition: gap 0.1s;\n}\n\n.playbookCard-module_container__LsClD:hover > .playbookCard-module_smartButtonsContainer__v-YsD {\n  gap: 3px;\n  transition: gap 0.1s;\n}\n\n.playbookCard-module_buttonContainer__6xxfQ {\n  display: flex;\n}\n\n.playbookCard-module_container__LsClD > .playbookCard-module_buttonsContainer__oQpCL button {\n  padding-left: 3px;\n  padding-right: 0;\n  width: 24px;\n  transition: width 0.1s;\n}\n\n.playbookCard-module_container__LsClD:hover > .playbookCard-module_buttonsContainer__oQpCL button {\n  transition: width 0.1s;\n  padding-left: 12px;\n  width: auto;\n  padding-right: 12px;\n}\n\n.playbookCard-module_container__LsClD > .playbookCard-module_smartButtonsContainer__v-YsD button {\n  padding-left: 3px;\n  padding-right: 0;\n  width: 24px;\n  transition: width 0.1s;\n}\n\n.playbookCard-module_container__LsClD:hover > .playbookCard-module_smartButtonsContainer__v-YsD button {\n  transition: width 0.1s;\n  padding-left: 8px;\n  width: auto;\n  padding-right: 12px;\n}\n\n.playbookCard-module_container__LsClD:hover > .playbookCard-module_smartButtonsContainer__v-YsD > button:first-child {\n  padding-left: 14px;\n}\n\n.playbookCard-module_container__LsClD:hover > .playbookCard-module_smartButtonsContainer__v-YsD > button:last-child {\n  padding-left: 4px;\n}\n\n.playbookCard-module_official_banner__BPuI5 {\n  position: absolute;\n  top: -4px;\n  left: 10px;\n}\n\n.playbookCard-module_leftIcons_container__vr0LP {\n  display: flex;\n  flex-direction: column;\n  margin-right: 6px;\n}\n\n.playbookCard-module_step_banner__NvOrh {\n  margin-left: 4px;\n  padding-bottom: 4px;\n}\n\n.playbookCard-module_template_name__ClCgM {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.playbookCard-module_template_text__4owp- {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n";
var styles$8 = {"container":"playbookCard-module_container__LsClD","containerSmartEmail":"playbookCard-module_containerSmartEmail__Vr5lM","containerSidePeek":"playbookCard-module_containerSidePeek__YSrd-","qq_container":"playbookCard-module_qq_container__3w-Wb","cardText":"playbookCard-module_cardText__ztERv","cardTextSidePeek":"playbookCard-module_cardTextSidePeek__HE2Qf","qq_cardText":"playbookCard-module_qq_cardText__Ylr8d","templateTextWrapper":"playbookCard-module_templateTextWrapper__A8ghg","templateText":"playbookCard-module_templateText__Uq2yu","shortcutContainer":"playbookCard-module_shortcutContainer__3ZN3X","shortcut":"playbookCard-module_shortcut__cNDCz","qq_cardContent":"playbookCard-module_qq_cardContent__jRBry","templateBody":"playbookCard-module_templateBody__DN6yN","buttonsContainer":"playbookCard-module_buttonsContainer__oQpCL","smartButtonsContainer":"playbookCard-module_smartButtonsContainer__v-YsD","buttonContainer":"playbookCard-module_buttonContainer__6xxfQ","official_banner":"playbookCard-module_official_banner__BPuI5","leftIcons_container":"playbookCard-module_leftIcons_container__vr0LP","step_banner":"playbookCard-module_step_banner__NvOrh","template_name":"playbookCard-module_template_name__ClCgM","template_text":"playbookCard-module_template_text__4owp-"};
styleInject(css_248z$9);

function getTabIcon(tabSelected) {
  switch (tabSelected) {
    case PlaybookTab.SNIPPETS:
      return 'snippet';
    case PlaybookTab.PITCHES:
      return 'chat';
    case PlaybookTab.EMAILS:
      return 'mail';
    case PlaybookTab.LINKEDIN:
      return 'linkedin';
    case PlaybookTab.WHATSAPP:
      return 'whatsapp';
    case PlaybookTab.QQS:
      return 'chatSupport';
    default:
      return 'questionCircle';
  }
}
var getButtonProps = function getButtonProps(tabSelected, disabled) {
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return {
        iconLeft: 'eye',
        onClick: function onClick() {
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_VIEW_PITCH_ON_PLAYBOOK);
        },
        text: t('playbook.card.view')
      };
    case PlaybookTab.EMAILS:
      return {
        iconLeft: 'send',
        onClick: function onClick() {},
        text: t('playbook.card.send'),
        disabled: disabled
      };
    case PlaybookTab.SNIPPETS:
      return {
        iconLeft: 'fileInsert',
        onClick: function onClick() {},
        text: t('playbook.card.insert'),
        disabled: disabled
      };
    case PlaybookTab.LINKEDIN:
      return {
        iconLeft: 'linkedin',
        onClick: function onClick() {},
        text: t('playbook.card.send'),
        disabled: disabled
      };
    case PlaybookTab.WHATSAPP:
      return {
        iconLeft: 'whatsapp',
        onClick: function onClick() {},
        text: t('playbook.card.send'),
        disabled: disabled
      };
  }
};

function _typeof$f(obj) { "@babel/helpers - typeof"; return _typeof$f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$f(obj); }
function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty$f(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$f(obj, key, value) { key = _toPropertyKey$f(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$f(arg) { var key = _toPrimitive$f(arg, "string"); return _typeof$f(key) === "symbol" ? key : String(key); }
function _toPrimitive$f(input, hint) { if (_typeof$f(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$f(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$9(arr, i) { return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9(); }
function _nonIterableRest$9() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }
function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$9(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$9(arr) { if (Array.isArray(arr)) return arr; }
var standardButtonProps = {
  size: 'small',
  uppercase: false,
  variant: 'secondary',
  color: 'purple'
};
var MessagingCard = function MessagingCard(_ref) {
  var _buttonProps$, _buttonProps$2, _buttonProps$3, _buttonProps$4;
  var template = _ref.template,
    _onClick = _ref.onClick,
    tabSelected = _ref.tabSelected,
    isSmartEmail = _ref.isSmartEmail,
    buttonProps = _ref.buttonProps,
    templateFunctions = _ref.templateFunctions,
    actionsDisabled = _ref.actionsDisabled,
    sidePeekEnabled = _ref.sidePeekEnabled;
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$9(_useHover, 2),
    ref = _useHover2[0],
    isHovering = _useHover2[1];
  var tabIcon = tabSelected && getTabIcon(tabSelected);
  var lastButtonProps = getButtonProps(tabSelected, actionsDisabled);
  var isPitches = tabSelected === PlaybookTab.PITCHES;
  var isSnippet = tabSelected === PlaybookTab.SNIPPETS;
  var isEmails = tabSelected === PlaybookTab.EMAILS;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var isOwner = useIsTemplateOwner(template);
  var containerClasses = clsx(styles$8.container, _defineProperty$f(_defineProperty$f({}, styles$8.containerSidePeek, sidePeekEnabled), styles$8.containerSmartEmail, isSmartEmail));
  var cardClasses = clsx(styles$8.cardText, _defineProperty$f({}, styles$8.cardTextSidePeek, sidePeekEnabled));
  return /*#__PURE__*/jsxs("div", {
    ref: ref,
    className: containerClasses,
    onClick: function onClick() {
      return _onClick(template);
    },
    children: [/*#__PURE__*/jsxs("div", {
      className: cardClasses,
      children: [!(template !== null && template !== void 0 && template.taskTitle) && (template === null || template === void 0 ? void 0 : template.isOfficial) && /*#__PURE__*/jsx("div", {
        className: styles$8.official_banner,
        children: /*#__PURE__*/jsx(Tooltip, {
          title: t('playbook.card.officialTemplate'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            name: "bookmark_big",
            color: "purple",
            size: 20
          })
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$8.leftIcons_container,
        children: [tabIcon && /*#__PURE__*/jsx(Icon, {
          name: tabIcon,
          color: "lightPurple",
          size: 24
        }), (isPitches || isSnippet) && (template === null || template === void 0 ? void 0 : template.isBattlecard) && /*#__PURE__*/jsx(Tooltip, {
          title: t('playbook.card.battlecard'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            name: "battlecards",
            color: "purple"
          })
        }), isEmails && (template === null || template === void 0 ? void 0 : template.format) === 'HTML' && /*#__PURE__*/jsx(Tooltip, {
          title: t('playbook.card.html'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            name: "coding",
            color: "softPurple",
            size: 16
          })
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$8.templateTextWrapper,
        children: [sidePeekEnabled ? /*#__PURE__*/jsxs("div", {
          className: styles$8.templateText,
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            children: template === null || template === void 0 ? void 0 : template.name
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: /*#__PURE__*/jsx("span", {
              className: styles$8.templateBody,
              children: removeHtmlTags(template === null || template === void 0 ? void 0 : template.previewContent)
            })
          })]
        }) : /*#__PURE__*/jsxs(Text, {
          size: "xs",
          weight: "bold",
          children: [/*#__PURE__*/jsxs("span", {
            className: styles$8.template_name,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$8.template_text,
              children: template === null || template === void 0 ? void 0 : template.name
            }), isEmails && !!(template !== null && template !== void 0 && template.taskTitle) && /*#__PURE__*/jsx("div", {
              className: styles$8.step_banner,
              children: /*#__PURE__*/jsx(Tooltip, {
                title: template === null || template === void 0 ? void 0 : template.taskTitle,
                position: "top",
                children: /*#__PURE__*/jsx(Label, {
                  size: 'small',
                  uppercase: false,
                  color: 'verySoftTangerine',
                  textColor: "tangerine",
                  overrideStyle: _objectSpread$9({}, {
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    paddingTop: '0px',
                    paddingBottom: '0px'
                  }),
                  children: template.taskTitle
                })
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: styles$8.templateBody,
            children: removeHtmlTags(template === null || template === void 0 ? void 0 : template.previewContent)
          })]
        }), isSnippet && (template === null || template === void 0 ? void 0 : template.shortcut) && /*#__PURE__*/jsxs("div", {
          className: styles$8.shortcutContainer,
          children: [/*#__PURE__*/jsx(Text, {
            size: sidePeekEnabled ? 's' : 'xs',
            weight: "bold",
            children: t('playbook.card.shortcut')
          }), /*#__PURE__*/jsxs(Text, {
            size: sidePeekEnabled ? 's' : 'xs',
            color: "darkBloobirds",
            className: styles$8.shortcut,
            children: ["/", template === null || template === void 0 ? void 0 : template.shortcut]
          })]
        })]
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: isSmartEmail ? styles$8.smartButtonsContainer : styles$8.buttonsContainer,
      children: [(template === null || template === void 0 ? void 0 : template.format) === 'AST' && /*#__PURE__*/jsx(Tooltip, {
        title: !isOwner && t('playbook.onlyOwner'),
        position: 'top',
        children: /*#__PURE__*/jsx("div", {
          className: styles$8.buttonContainer,
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          children: /*#__PURE__*/jsx(Button, _objectSpread$9(_objectSpread$9({
            iconLeft: "edit"
          }, isOwner ? standardButtonProps : _objectSpread$9(_objectSpread$9({}, standardButtonProps), {}, {
            color: 'softPeanut'
          })), {}, {
            onClick: (_buttonProps$ = buttonProps[0]) === null || _buttonProps$ === void 0 ? void 0 : _buttonProps$.onClick,
            disabled: !isOwner,
            children: isHovering && t('playbook.card.edit')
          }))
        })
      }), /*#__PURE__*/jsx(Button, _objectSpread$9(_objectSpread$9(_objectSpread$9({
        iconLeft: "eye"
      }, standardButtonProps), isPitches && {
        variant: 'primary'
      }), {}, {
        children: isHovering && t('playbook.card.view')
      })), !isPitches && !isSmartEmail && /*#__PURE__*/jsx(Tooltip, {
        title: actionsDisabled && t('playbook.permissions') || tabSelected === PlaybookTab.WHATSAPP && ((_buttonProps$2 = buttonProps[1]) === null || _buttonProps$2 === void 0 ? void 0 : _buttonProps$2.disabled) && t('playbook.noPhoneNumber'),
        position: "top",
        children: /*#__PURE__*/jsx(Button, _objectSpread$9(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, standardButtonProps), {}, {
          variant: "primary"
        }, lastButtonProps), {}, {
          onClick: (_buttonProps$3 = buttonProps[1]) === null || _buttonProps$3 === void 0 ? void 0 : _buttonProps$3.onClick,
          color: actionsDisabled ? undefined : 'purple'
        }, tabSelected === PlaybookTab.WHATSAPP && {
          disabled: actionsDisabled || ((_buttonProps$4 = buttonProps[1]) === null || _buttonProps$4 === void 0 ? void 0 : _buttonProps$4.disabled)
        }), {}, {
          children: isHovering && lastButtonProps.text
        }))
      }), isSmartEmail && /*#__PURE__*/jsxs(Fragment, {
        children: [isSnippet && /*#__PURE__*/jsx(Button, _objectSpread$9(_objectSpread$9({}, standardButtonProps), {}, {
          iconLeft: "fileInsert",
          variant: isSnippet ? 'primary' : 'secondary',
          onClick: function onClick(e) {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_SNIPPET_ON_EMAIL_MODAL);
            templateFunctions.insertTemplate(template);
          },
          children: isHovering && 'Insert'
        })), !isSnippet && /*#__PURE__*/jsx(Button, _objectSpread$9(_objectSpread$9({}, standardButtonProps), {}, {
          /* @ts-ignore */
          iconLeft: "sendEmailInvitation",
          variant: "primary",
          onClick: function onClick(e) {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_TEMPLATE_ON_EMAIL_MODAL);
            templateFunctions.replaceTemplate(template);
          },
          children: isHovering && t('playbook.card.use')
        }))]
      })]
    })]
  });
};

function _typeof$e(obj) { "@babel/helpers - typeof"; return _typeof$e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$e(obj); }
function _defineProperty$e(obj, key, value) { key = _toPropertyKey$e(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$e(arg) { var key = _toPrimitive$e(arg, "string"); return _typeof$e(key) === "symbol" ? key : String(key); }
function _toPrimitive$e(input, hint) { if (_typeof$e(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$e(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var QQsCard = function QQsCard(_ref) {
  var qq = _ref.template,
    tabSelected = _ref.tabSelected,
    onUpdateQQ = _ref.onUpdateQQ,
    QQValue = _ref.QQValue,
    refreshActiveBobject = _ref.refreshActiveBobject,
    actionsDisabled = _ref.actionsDisabled;
  var tabIcon = tabSelected && getTabIcon(tabSelected);
  //@ts-ignore
  var type = qq.type,
    disabled = qq.disabled,
    question = qq.question,
    answers = qq.answers;
  var isGlobalPicklist = (type === null || type === void 0 ? void 0 : type.toString()) === QQ_TYPES.GLOBAL_PICKLIST;
  var isMultiGlobalPicklist = (type === null || type === void 0 ? void 0 : type.toString()) === QQ_TYPES.MULTI_GLOBAL_PICKLIST;
  var isText = (type === null || type === void 0 ? void 0 : type.toString()) === QQ_TYPES.TEXT;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var qqHasChanged = useRef(null);
  function handleChange(value) {
    var newQQData = _defineProperty$e({}, qq.id, value);
    onUpdateQQ(newQQData);
    refreshActiveBobject === null || refreshActiveBobject === void 0 ? void 0 : refreshActiveBobject();
    qqHasChanged.current = false;
  }
  return /*#__PURE__*/jsx("div", {
    className: styles$8.qq_container,
    children: /*#__PURE__*/jsxs("div", {
      className: styles$8.qq_cardContent,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$8.qq_cardText,
        children: [tabIcon && /*#__PURE__*/jsx(Icon, {
          name: tabIcon,
          color: "softPeanut",
          size: 24
        }), /*#__PURE__*/jsx(Text, {
          size: "s",
          weight: "bold",
          children: question
        })]
      }), isText && /*#__PURE__*/jsx(Input, {
        onBlur: function onBlur(e) {
          var _e$target;
          handleChange(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
        },
        disabled: disabled || actionsDisabled,
        defaultValue: QQValue,
        width: "100%",
        size: "small",
        borderless: false,
        placeholder: t('playbook.qualifyingQuestions.nonePlaceholder')
      }), isGlobalPicklist && /*#__PURE__*/jsxs(Select, {
        placeholder: t('playbook.qualifyingQuestions.picklistSelect'),
        disabled: disabled || actionsDisabled,
        borderless: false,
        width: "100%",
        size: "small",
        defaultValue: QQValue,
        onChange: function onChange(newValue) {
          handleChange(newValue);
        },
        autocomplete: answers.length > 6,
        children: [/*#__PURE__*/jsx(Item, {
          value: "none",
          children: t('playbook.qualifyingQuestions.nonePlaceholder')
        }), answers.map(function (answer) {
          return /*#__PURE__*/jsx(Item, {
            hidden: !answer.enabled,
            value: answer.id,
            label: answer.value,
            children: answer.value
          }, answer.id);
        })]
      }), isMultiGlobalPicklist && /*#__PURE__*/jsxs(MultiSelect, {
        autocomplete: answers.length > 6,
        size: "small",
        defaultValue: (QQValue === null || QQValue === void 0 ? void 0 : QQValue.includes("\x1E")) && (QQValue === null || QQValue === void 0 ? void 0 : QQValue.split("\x1E")),
        onChange: function onChange() {
          qqHasChanged.current = true;
        },
        onClose: function onClose(value) {
          if ((qqHasChanged === null || qqHasChanged === void 0 ? void 0 : qqHasChanged.current) === true) handleChange(value);
        },
        width: "100%",
        borderless: false,
        selectAllOption: true,
        placeholder: t('playbook.qualifyingQuestions.picklistSelect'),
        disabled: disabled || actionsDisabled,
        children: [/*#__PURE__*/jsx(CheckItem, {
          value: "",
          children: "None"
        }), answers.map(function (answer) {
          return /*#__PURE__*/jsx(CheckItem, {
            dataTest: answer.value,
            value: answer.id,
            label: answer.value,
            children: answer.value
          }, answer.value);
        })]
      })]
    })
  });
};

var css_248z$8 = ".snippetsTooltipBlock-module_container__nadP1 {\n  border: 1px solid var(--softPurple);\n  display: flex;\n  flex-direction: column;\n  margin: 8px 24px 24px 24px;\n  background-color: var(--verySoftPurple);;\n  transition: background-color 0.3s;\n  cursor: pointer;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.0843);\n  border-radius: 4px;\n}\n\n.snippetsTooltipBlock-module_containerSeen__RZdz2 {\n  margin: 24px;\n}\n\n.snippetsTooltipBlock-module_leftIcons_container__AoQ9I {\n  display: flex;\n  flex-direction: column;\n  margin-right: 6px;\n}\n\n.snippetsTooltipBlock-module_cardText__MJ8hl {\n  display: flex;\n  position: relative;\n  padding: 16px 16px 8px 8px;\n  white-space: break-spaces;\n  font-weight: bold;\n  max-width: 100%;\n}\n\n.snippetsTooltipBlock-module_cardText__MJ8hl > svg {\n  margin-right: 10px;\n}\n\n.snippetsTooltipBlock-module_cardText__MJ8hl > p {\n  width: 100%;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n}\n\n.snippetsTooltipBlock-module_templateTextWrapper__RmMHR {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  max-width: 90%;\n}\n\n.snippetsTooltipBlock-module_shortcutContainer__RGCpl {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex: 1;\n}\n\n.snippetsTooltipBlock-module_shortcut__XEdU1 {\n  background: var(--lightestPurple);\n  color: var(--purple);\n  border: 1px solid var(--lightPurple);\n  padding: 2px 4px;\n  border-radius: 4px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.snippetsTooltipBlock-module__footer_section__oR9nD {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n";
var styles$7 = {"container":"snippetsTooltipBlock-module_container__nadP1","containerSeen":"snippetsTooltipBlock-module_containerSeen__RZdz2","leftIcons_container":"snippetsTooltipBlock-module_leftIcons_container__AoQ9I","cardText":"snippetsTooltipBlock-module_cardText__MJ8hl","templateTextWrapper":"snippetsTooltipBlock-module_templateTextWrapper__RmMHR","shortcutContainer":"snippetsTooltipBlock-module_shortcutContainer__RGCpl","shortcut":"snippetsTooltipBlock-module_shortcut__XEdU1","_footer_section":"snippetsTooltipBlock-module__footer_section__oR9nD"};
styleInject(css_248z$8);

function _typeof$d(obj) { "@babel/helpers - typeof"; return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$d(obj); }
function _defineProperty$d(obj, key, value) { key = _toPropertyKey$d(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$d(arg) { var key = _toPrimitive$d(arg, "string"); return _typeof$d(key) === "symbol" ? key : String(key); }
function _toPrimitive$d(input, hint) { if (_typeof$d(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$d(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SnippetsTooltipBlock = function SnippetsTooltipBlock(_ref) {
  var hasBeenSeen = _ref.hasBeenSeen;
  var containerClasses = clsx(styles$7.container, _defineProperty$d({}, styles$7.containerSeen, hasBeenSeen));
  var _useUserHelpers = useUserHelpers(),
    save = _useUserHelpers.save,
    has = _useUserHelpers.has;
  var banishTooltip = function banishTooltip() {
    save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
    mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_TOOLTIP_BLOCK_MARKED_AS_HIDDEN);
  };
  return !has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN) ? /*#__PURE__*/jsx("div", {
    className: containerClasses,
    onClick: function onClick() {
      return window.open('https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time', '_blank');
    },
    children: /*#__PURE__*/jsxs("div", {
      className: styles$7.cardText,
      children: [/*#__PURE__*/jsx("div", {
        className: styles$7.leftIcons_container,
        children: /*#__PURE__*/jsx(Icon, {
          name: "snippet",
          color: "lightPurple",
          size: 24
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$7.templateTextWrapper,
        children: [/*#__PURE__*/jsx(Text, {
          size: "xs",
          children: /*#__PURE__*/jsxs("div", {
            children: [/*#__PURE__*/jsx("b", {
              children: "Always write better and faster"
            }), " Snippets are a great ally for professionals generating a great deal of content and who can reuse pieces of it to deliver quality texts faster."]
          })
        }), /*#__PURE__*/jsxs("div", {
          className: styles$7.shortcutContainer,
          children: [/*#__PURE__*/jsx(Text, {
            size: "xs",
            weight: "bold",
            children: "Shortcut"
          }), /*#__PURE__*/jsx("div", {
            onClick: function onClick() {
              return window.open('https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time', '_blank');
            },
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              color: "purple",
              className: styles$7.shortcut,
              children: "/why-snippets-are-the-best"
            })
          })]
        }), /*#__PURE__*/jsxs("div", {
          className: styles$7._footer_section,
          onClick: function onClick(e) {
            e.preventDefault();
            e.stopPropagation();
          },
          children: [/*#__PURE__*/jsx(Checkbox, {
            onClick: function onClick(value) {
              if (value) banishTooltip();
            },
            size: "small",
            color: "purple"
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            children: "Do not show this again"
          })]
        })]
      })]
    })
  }) : /*#__PURE__*/jsx(Fragment, {});
};

function _typeof$c(obj) { "@babel/helpers - typeof"; return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$c(obj); }
function _defineProperty$c(obj, key, value) { key = _toPropertyKey$c(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$c(arg) { var key = _toPrimitive$c(arg, "string"); return _typeof$c(key) === "symbol" ? key : String(key); }
function _toPrimitive$c(input, hint) { if (_typeof$c(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$c(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var noResultsContent = function noResultsContent(_ref) {
  var tabSelected = _ref.tabSelected,
    callback = _ref.callback,
    t = _ref.t;
  var content = _defineProperty$c(_defineProperty$c(_defineProperty$c(_defineProperty$c(_defineProperty$c(_defineProperty$c({}, PlaybookTab.SNIPPETS, {
    title: t('playbook.tabContent.noTemplates', {
      type: 'snippet',
      icon: '💬'
    }),
    description: t('playbook.tabContent.noTemplatesMessage', {
      type: 'snippets'
    }),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: callback,
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewTemplate')
    })
  }), PlaybookTab.PITCHES, {
    title: t('playbook.tabContent.noTemplates', {
      type: 'pitch',
      icon: '💬'
    }),
    description: t('playbook.tabContent.noTemplatesMessage', {
      type: 'pitches'
    }),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: callback,
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewTemplate')
    })
  }), PlaybookTab.EMAILS, {
    title: t('playbook.tabContent.noTemplates', {
      type: 'email',
      icon: '✉️'
    }),
    description: t('playbook.tabContent.noTemplatesMessage', {
      type: 'templates'
    }),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: callback,
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewTemplate')
    })
  }), PlaybookTab.LINKEDIN, {
    title: t('playbook.tabContent.noTemplates', {
      type: 'LinkedIn',
      icon: '📄️'
    }),
    description: t('playbook.tabContent.noTemplatesMessage', {
      type: 'templates'
    }),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: callback,
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewTemplate')
    })
  }), PlaybookTab.WHATSAPP, {
    title: t('playbook.tabContent.noTemplates', {
      type: 'Whatsapp',
      icon: '📄️'
    }),
    description: t('playbook.tabContent.noTemplatesMessage', {
      type: 'templates'
    }),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: callback,
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewTemplate')
    })
  }), PlaybookTab.QQS, {
    title: t('playbook.tabContent.noQQs'),
    description: t('playbook.tabContent.noQQsMessage'),
    actionButton: /*#__PURE__*/jsx(Button, {
      size: "small",
      onClick: function onClick() {
        return window.open('https://app.bloobirds.com/app/playbook/messaging/qq');
      },
      iconLeft: "plus",
      color: "lightPurple",
      children: t('playbook.addNewQQ')
    })
  });
  return content[tabSelected];
};

var css_248z$7 = ".blankPageTooltip-module__home_filters_button__RTe-A{\n  border-color: white;\n}\n\n.blankPageTooltip-module__home_filters_button__RTe-A > svg > path{\n  fill: var(--purple);\n}\n";
var styles$6 = {"_home_filters_button":"blankPageTooltip-module__home_filters_button__RTe-A"};
styleInject(css_248z$7);

var BlankPageTooltip = function BlankPageTooltip() {
  var _useUserHelpers = useUserHelpers(),
    saveCustom = _useUserHelpers.saveCustom,
    get = _useUserHelpers.get;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'tooltips'
    }),
    t = _useTranslation.t;
  var shouldBeDisplayed = getDifferenceInHours({
    startDate: new Date(get(ExtensionHelperKeys.SEE_GENERAL_TOOLTIP) || ''),
    endDate: new Date()
  }) > 120;
  return shouldBeDisplayed ? /*#__PURE__*/jsxs(DiscoveryTooltip, {
    title: t('blankPageTooltip.title'),
    isPersistent: true,
    visible: true,
    position: "bottom",
    height: "318px",
    children: [/*#__PURE__*/jsx(DiscoveryTooltip.TooltipImage, {
      className: styles$6._home_filters_image,
      children: /*#__PURE__*/jsx("img", {
        src: IllustrationGroup,
        width: 180,
        alt: 'calendar'
      })
    }), /*#__PURE__*/jsxs(DiscoveryTooltip.TooltipFooter, {
      description: t('blankPageTooltip.description'),
      children: [/*#__PURE__*/jsx(DiscoveryTooltip.TooltipButton, {
        variant: "clear",
        color: "white",
        uppercase: false,
        className: styles$6._home_filters_button,
        onClick: function onClick() {
          saveCustom({
            key: UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP,
            data: new Date().toISOString()
          });
        },
        children: /*#__PURE__*/jsxs(Fragment, {
          children: [t('ok'), "!"]
        })
      }), /*#__PURE__*/jsx(DiscoveryTooltip.TooltipButton, {
        uppercase: false,
        isMainButton: true,
        className: styles$6._home_filters_button,
        onClick: function onClick() {
          window.open('https://youtu.be/62LcjNaitGQ', '_blank');
        },
        iconLeft: "play",
        children: t('watchNow')
      })]
    })]
  }) : /*#__PURE__*/jsx(Fragment, {});
};

var _excluded$1 = ["firstOfEach"];
function _typeof$b(obj) { "@babel/helpers - typeof"; return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$b(obj); }
function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty$b(obj, key, value) { key = _toPropertyKey$b(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$b(arg) { var key = _toPrimitive$b(arg, "string"); return _typeof$b(key) === "symbol" ? key : String(key); }
function _toPrimitive$b(input, hint) { if (_typeof$b(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$b(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ActivityCardSkeleton = function ActivityCardSkeleton() {
  return /*#__PURE__*/jsxs("div", {
    children: [/*#__PURE__*/jsx(Skeleton, {
      variant: "text",
      width: "50%",
      height: 24
    }), /*#__PURE__*/jsx(Skeleton, {
      variant: "text",
      width: "50%",
      height: 24
    })]
  });
};
var ActivityFeedSkeleton = function ActivityFeedSkeleton() {
  return /*#__PURE__*/jsx(Fragment, {
    children: range(8).map(function (number) {
      return /*#__PURE__*/jsx(Fragment$1, {
        children: /*#__PURE__*/jsx(ActivityCardSkeleton, {})
      }, number);
    })
  });
};
var AddNewButton = function AddNewButton(_ref) {
  var handleClick = _ref.handleClick;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$9.templateAddButton,
    onClick: handleClick,
    children: [/*#__PURE__*/jsx(Icon, {
      color: "purple",
      name: "plus",
      size: 18
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "purple",
      weight: "bold",
      children: t('playbook.addNew')
    })]
  });
};
function TemplateListDisplay(_ref2) {
  var shouldShowTooltip = _ref2.shouldShowTooltip,
    sidePeekEnabled = _ref2.sidePeekEnabled,
    displayedTemplates = _ref2.displayedTemplates,
    handleAddTemplateClick = _ref2.handleAddTemplateClick,
    _ref2$isTeamTemplates = _ref2.isTeamTemplates,
    isTeamTemplates = _ref2$isTeamTemplates === void 0 ? false : _ref2$isTeamTemplates,
    renderTemplate = _ref2.renderTemplate,
    isSmartEmail = _ref2.isSmartEmail,
    parentRef = _ref2.parentRef;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(VirtualInfiniteScroll, {
      templatesInfo: displayedTemplates,
      parentRef: parentRef,
      enableSelectedBackground: true,
      enabledArrowNavigation: true,
      hasNextPage: false,
      isFetchingData: false,
      contentSkeleton: function contentSkeleton() {
        return /*#__PURE__*/jsx("div", {
          className: styles$9.skeleton,
          children: /*#__PURE__*/jsx(ActivityFeedSkeleton, {})
        });
      },
      loaderSkeleton: function loaderSkeleton() {
        return /*#__PURE__*/jsx("div", {
          className: styles$9.skeleton,
          children: /*#__PURE__*/jsx(ActivityFeedSkeleton, {})
        });
      },
      estimateSize: 45,
      estimatedSkeletonHeight: 130,
      children: function children(data, hasNext, isFirst) {
        var _playbookSections$isF, _playbookSections$isF2;
        return /*#__PURE__*/jsxs(Fragment, {
          children: [isFirst && /*#__PURE__*/jsxs("div", {
            className: clsx(styles$9.templateSection, _defineProperty$b(_defineProperty$b({}, styles$9.smartTemplateSection, isSmartEmail), styles$9.templateSectionSidePeek, sidePeekEnabled)),
            children: [/*#__PURE__*/jsx(Icon, {
              color: "softPeanut",
              name: (_playbookSections$isF = playbookSections[isFirst]) === null || _playbookSections$isF === void 0 ? void 0 : _playbookSections$isF.icon,
              size: 20
            }), /*#__PURE__*/jsx(Text, {
              size: 'xs',
              color: "softPeanut",
              weight: "bold",
              children: t((_playbookSections$isF2 = playbookSections[isFirst]) === null || _playbookSections$isF2 === void 0 ? void 0 : _playbookSections$isF2.titleKey)
            }), shouldShowTooltip && /*#__PURE__*/jsx(BlankPageTooltip, {}), /*#__PURE__*/jsx(AddNewButton, {
              handleClick: handleAddTemplateClick
            })]
          }), renderTemplate(data, !hasNext && !isTeamTemplates)]
        });
      }
    })
  });
}
var Transition = function Transition(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/jsx(CSSTransition, {
    appear: true,
    "in": true,
    unmountOnExit: true,
    timeout: 300,
    classNames: {
      appear: styles$9._fade_enter,
      appearActive: styles$9._fade_enter_active,
      enter: styles$9._fade_enter,
      enterActive: styles$9._fade_enter_active,
      exit: styles$9._fade_exit,
      exitActive: styles$9._fade_exit_active
    },
    children: children
  });
};
var playbookSections = {
  suggestedTemplates: {
    icon: 'suggestions',
    titleKey: 'playbook.tabContent.suggestedTemplates'
  },
  myTemplates: {
    icon: 'person',
    titleKey: 'playbook.tabContent.myTemplates'
  },
  mySnippets: {
    icon: 'person',
    titleKey: 'playbook.tabContent.mySnippets'
  },
  teamTemplates: {
    icon: 'company',
    titleKey: 'playbook.tabContent.teamTemplates'
  }
};
var VirtualInfiniteScroll = function VirtualInfiniteScroll(_ref4) {
  var _rowsLength, _parentRef$current;
  var hasNextPage = _ref4.hasNextPage,
    templatesInfo = _ref4.templatesInfo,
    isFetchingData = _ref4.isFetchingData,
    children = _ref4.children,
    hasNextItem = _ref4.hasNextItem,
    parentRef = _ref4.parentRef,
    footer = _ref4.footer,
    contentSkeleton = _ref4.contentSkeleton,
    _ref4$loaderSkeleton = _ref4.loaderSkeleton,
    loaderSkeleton = _ref4$loaderSkeleton === void 0 ? function () {
      return /*#__PURE__*/jsx(Skeleton, {
        variant: "rect",
        width: "100%",
        height: "40px"
      }, 'skeletonItem');
    } : _ref4$loaderSkeleton,
    _ref4$estimateSize = _ref4.estimateSize,
    _estimateSize = _ref4$estimateSize === void 0 ? 40 : _ref4$estimateSize,
    _ref4$estimatedSkelet = _ref4.estimatedSkeletonHeight,
    estimatedSkeletonHeight = _ref4$estimatedSkelet === void 0 ? 40 : _ref4$estimatedSkelet,
    _ref4$fixedHeight = _ref4.fixedHeight,
    fixedHeight = _ref4$fixedHeight === void 0 ? false : _ref4$fixedHeight,
    rowsLength = _ref4.rowsLength;
  var firstOfEach = templatesInfo.firstOfEach,
    templates = _objectWithoutProperties$1(templatesInfo, _excluded$1);
  var rows = templates && Object.values(templates).flat();
  rowsLength = (_rowsLength = rowsLength) !== null && _rowsLength !== void 0 ? _rowsLength : rows === null || rows === void 0 ? void 0 : rows.length;
  var dataCount = hasNextPage ? rowsLength + 1 : rowsLength;
  var rowVirtualizer = useVirtualizer({
    count: dataCount,
    getScrollElement: function getScrollElement() {
      return parentRef === null || parentRef === void 0 ? void 0 : parentRef.current;
    },
    estimateSize: function estimateSize() {
      return _estimateSize;
    },
    overscan: 1
  });
  var scrollHeight = parentRef === null || parentRef === void 0 ? void 0 : (_parentRef$current = parentRef.current) === null || _parentRef$current === void 0 ? void 0 : _parentRef$current.scrollHeight;
  if (contentSkeleton && (isFetchingData && !rows || scrollHeight === undefined || scrollHeight === 0)) {
    return /*#__PURE__*/jsx(Transition, {
      children: contentSkeleton()
    });
  }
  return /*#__PURE__*/jsx("div", {
    style: {
      height: rowVirtualizer.getTotalSize() + (isFetchingData ? estimatedSkeletonHeight || 100 : 0),
      width: '100%',
      position: 'relative'
    },
    onMouseEnter: removeScrollOfBox,
    onMouseLeave: recoverScrollOfBox,
    children: rowVirtualizer.getVirtualItems().map(function (virtualItem) {
      var _ref5;
      var isLoaderRow = virtualItem.index > (rows === null || rows === void 0 ? void 0 : rows.length) - 1;
      var data = rows[virtualItem.index];
      var showNext = (_ref5 = hasNextItem && hasNextItem(virtualItem.index)) !== null && _ref5 !== void 0 ? _ref5 : !!rows[virtualItem.index + 1];
      return /*#__PURE__*/jsx("div", {
        "data-index": virtualItem.index,
        ref: fixedHeight ? undefined : rowVirtualizer.measureElement,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: fixedHeight ? "".concat(virtualItem.size, "px") : undefined,
          transform: "translateY(".concat(virtualItem.start, "px)"),
          background: 'transparent'
        },
        children: isLoaderRow ? hasNextPage ? /*#__PURE__*/jsx("div", {
          style: {
            height: "".concat(_estimateSize, "px")
          },
          children: /*#__PURE__*/jsx(Transition, {
            children: loaderSkeleton()
          })
        }) : footer && /*#__PURE__*/jsx("div", {
          style: {
            height: "".concat(_estimateSize, "px")
          },
          children: footer(function () {
            return rowVirtualizer.scrollToIndex(0);
          })
        }) : children(data, showNext, firstOfEach[data === null || data === void 0 ? void 0 : data.id])
      }, virtualItem.key);
    })
  });
};

function _typeof$a(obj) { "@babel/helpers - typeof"; return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$a(obj); }
function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty$a(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$a(obj, key, value) { key = _toPropertyKey$a(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$a(arg) { var key = _toPrimitive$a(arg, "string"); return _typeof$a(key) === "symbol" ? key : String(key); }
function _toPrimitive$a(input, hint) { if (_typeof$a(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$a(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$8(arr, i) { return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8(); }
function _nonIterableRest$8() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }
function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$8(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$8(arr) { if (Array.isArray(arr)) return arr; }
var MessagingContent = function MessagingContent(_ref) {
  var _settings$user, _settings$user2, _suggestedTemplates$, _myTemplates$, _teamTemplates$;
  var parentRef = _ref.parentRef;
  var _usePlaybookFeed = usePlaybookFeed(),
    tabSelected = _usePlaybookFeed.selectedTab,
    templateFunctions = _usePlaybookFeed.templateFunctions,
    isSmartEmail = _usePlaybookFeed.isSmartEmail,
    onCardClicked = _usePlaybookFeed.onCardClicked,
    activeBobject = _usePlaybookFeed.activeBobject,
    segmentationValues = _usePlaybookFeed.segmentationValues,
    visibilityFilters = _usePlaybookFeed.visibilityFilters,
    searchValue = _usePlaybookFeed.searchValue,
    stage = _usePlaybookFeed.stage,
    actionsDisabled = _usePlaybookFeed.actionsDisabled,
    company = _usePlaybookFeed.company,
    leads = _usePlaybookFeed.leads,
    sidePeekEnabled = _usePlaybookFeed.sidePeekEnabled,
    whatsappData = _usePlaybookFeed.whatsappData,
    environment = _usePlaybookFeed.environment;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useDebounce = useDebounce(searchValue, 300),
    _useDebounce2 = _slicedToArray$8(_useDebounce, 1),
    debounceSearchValue = _useDebounce2[0];
  var _useMessagingTemplate = useMessagingTemplates({
      stage: stage,
      type: templateTypes[tabSelected],
      name: debounceSearchValue ? debounceSearchValue : null,
      size: 200,
      page: 0,
      visibility: visibilityFilters !== null && visibilityFilters !== void 0 && visibilityFilters.onlyPrivate ? 'PRIVATE' : null,
      onlyMine: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyMine,
      onlyOfficials: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyOfficial,
      onlyBattlecards: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyBattlecards,
      segmentationValues: segmentationValues
    }),
    messagingTemplates = _useMessagingTemplate.messagingTemplates,
    isLoading = _useMessagingTemplate.isLoading;
  var isSnippets = tabSelected === PlaybookTab.SNIPPETS;
  var setEmailVariablesValues = useBaseSetEmailVariablesValues();
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has,
    save = _useUserHelpers.save;
  var shouldShowEmailTooltip = tabSelected === PlaybookTab.EMAILS && !has(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP) && isSmartEmail;
  var _useMinimizableModals = useMinimizableModals(),
    openMinimizableModal = _useMinimizableModals.openMinimizableModal;
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var userId = settings === null || settings === void 0 ? void 0 : (_settings$user = settings.user) === null || _settings$user === void 0 ? void 0 : _settings$user.id;
  var userRoles = settings === null || settings === void 0 ? void 0 : (_settings$user2 = settings.user) === null || _settings$user2 === void 0 ? void 0 : _settings$user2.roles;
  var isAdminUser = (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.GLOBAL_ADMIN)) || (userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(UserRole.ACCOUNT_ADMIN));
  var snippetsTooltipBlockSeen = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
  var snippetsTooltipBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
  var suggestedTemplates = useSuggestedTemplates(activeBobject, {
    company: company,
    leads: leads
  }, tabSelected);
  var handleEmailModal = function handleEmailModal(template) {
    var _activeBobject$id, _leads$;
    var activeBobjectType = activeBobject === null || activeBobject === void 0 ? void 0 : (_activeBobject$id = activeBobject.id) === null || _activeBobject$id === void 0 ? void 0 : _activeBobject$id.typeName;
    setEmailVariablesValues({
      company: company === null || company === void 0 ? void 0 : company.rawBobject,
      lead: activeBobjectType === BobjectTypes.Lead ? activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.rawBobject : leads && ((_leads$ = leads[0]) === null || _leads$ === void 0 ? void 0 : _leads$.rawBobject),
      opportunity: undefined
    });
    openMinimizableModal({
      type: 'email',
      title: t('smartEmailModal.newEmail'),
      data: {
        template: {
          content: template === null || template === void 0 ? void 0 : template.content,
          subject: (template === null || template === void 0 ? void 0 : template.subject) || '',
          id: template === null || template === void 0 ? void 0 : template.id,
          format: template === null || template === void 0 ? void 0 : template.format,
          mediaFiles: template === null || template === void 0 ? void 0 : template.mediaFiles,
          name: (template === null || template === void 0 ? void 0 : template.name) || t('playbook.untitledTemplate')
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: false,
        company: activeBobjectType === BobjectTypes.Company ? activeBobject : company,
        leads: leads,
        lead: activeBobjectType === BobjectTypes.Lead ? activeBobject : leads === null || leads === void 0 ? void 0 : leads[0],
        pageBobjectType: activeBobject.id.typeName
      },
      onSave: function onSave() {
        window.dispatchEvent(new CustomEvent('ACTIVE_BOBJECT_UPDATED', {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      }
    });
  };
  function handleOnClick(template) {
    onCardClicked(template, tabSelected, handleEmailModal);
    mixpanel.track("CLICK_ON_".concat(templateTypes[tabSelected], "_CARD_FROM_PLAYBOOK_OTO"));
  }
  var handleAddTemplateClick = function handleAddTemplateClick() {
    templateFunctions === null || templateFunctions === void 0 ? void 0 : templateFunctions.editTemplate({
      type: templateTypes[tabSelected],
      edit: true
    });
    mixpanel.track("CLICK_ON_".concat(templateTypes[tabSelected], "_ADD_TEMPLATE_FROM_PLAYBOOK_OTO"));
  };
  useEffect(function () {
    return function () {
      if (!noTemplates && !noResults && isSnippets) {
        save(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_SEEN_ONE_TIME);
      }
    };
  }, [messagingTemplates, isSnippets]);
  var _partition = partition(messagingTemplates, function (template) {
      return (template === null || template === void 0 ? void 0 : template.createdBy) === userId;
    }),
    _partition2 = _slicedToArray$8(_partition, 2),
    myTemplates = _partition2[0],
    teamTemplates = _partition2[1];
  var areThereSegmentationFiltersApplied = segmentationValues && Object.keys(segmentationValues).length !== 0;
  var areThereVisibilityFiltersApplied = visibilityFilters && Object.values(visibilityFilters).some(function (v) {
    return !!v;
  });
  var noResults = (messagingTemplates === null || messagingTemplates === void 0 ? void 0 : messagingTemplates.length) === 0 && ((searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) > 0 || areThereSegmentationFiltersApplied || areThereVisibilityFiltersApplied);
  var noTemplates = (messagingTemplates === null || messagingTemplates === void 0 ? void 0 : messagingTemplates.length) === 0 && !areThereSegmentationFiltersApplied && !areThereVisibilityFiltersApplied && (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) === 0;
  var renderTemplate = function renderTemplate(template, showTooltip) {
    var shouldShowSnippetsTooltip = isSmartEmail && isSnippets && snippetsTooltipBlockSeen && !snippetsTooltipBlockHidden && showTooltip;
    if (shouldShowSnippetsTooltip) {
      return /*#__PURE__*/jsx(SnippetsTooltipBlock, {
        hasBeenSeen: true
      });
    }
    var userIsOwner = userId === (template === null || template === void 0 ? void 0 : template.createdBy);
    var userCanEdit = userIsOwner || isAdminUser;
    var linkedInURL = getLinkedInURL(template === null || template === void 0 ? void 0 : template.id, company, leads, activeBobject);
    var buttonProps = getTemplateTypeButtons({
      template: template,
      tabSelected: tabSelected,
      linkedInURL: linkedInURL,
      handleEmailModal: handleEmailModal,
      isSEE: isSmartEmail,
      userCanEdit: userCanEdit,
      environment: environment,
      templateFunctions: templateFunctions,
      t: t,
      whatsappData: whatsappData
    });
    return /*#__PURE__*/jsx(MessagingCard, {
      template: template,
      onClick: handleOnClick,
      tabSelected: tabSelected,
      buttonProps: buttonProps,
      isSmartEmail: isSmartEmail,
      templateFunctions: templateFunctions,
      actionsDisabled: actionsDisabled,
      sidePeekEnabled: sidePeekEnabled
    }, template === null || template === void 0 ? void 0 : template.id);
  };
  var _noResultsContent = noResultsContent({
      tabSelected: tabSelected,
      callback: handleAddTemplateClick,
      t: t
    }),
    actionButton = _noResultsContent.actionButton,
    description = _noResultsContent.description,
    title = _noResultsContent.title;
  var templateListDisplayVariables = {
    sidePeekEnabled: sidePeekEnabled,
    renderTemplate: renderTemplate,
    handleAddTemplateClick: handleAddTemplateClick,
    isSmartEmail: isSmartEmail
  };
  if (!messagingTemplates) return null;
  var templatesAggregate = {
    suggestedTemplates: suggestedTemplates,
    myTemplates: myTemplates,
    teamTemplates: teamTemplates,
    firstOfEach: _defineProperty$a(_defineProperty$a(_defineProperty$a({}, suggestedTemplates === null || suggestedTemplates === void 0 ? void 0 : (_suggestedTemplates$ = suggestedTemplates[0]) === null || _suggestedTemplates$ === void 0 ? void 0 : _suggestedTemplates$.id, 'suggestedTemplates'), myTemplates === null || myTemplates === void 0 ? void 0 : (_myTemplates$ = myTemplates[0]) === null || _myTemplates$ === void 0 ? void 0 : _myTemplates$.id, 'myTemplates'), teamTemplates === null || teamTemplates === void 0 ? void 0 : (_teamTemplates$ = teamTemplates[0]) === null || _teamTemplates$ === void 0 ? void 0 : _teamTemplates$.id, 'teamTemplates')
  };
  return /*#__PURE__*/jsxs(Fragment, {
    children: [isSmartEmail && isSnippets && !snippetsTooltipBlockSeen && !snippetsTooltipBlockHidden && !noTemplates && !noResults && /*#__PURE__*/jsx(SnippetsTooltipBlock, {}), /*#__PURE__*/jsx(TemplateListDisplay, _objectSpread$8({
      parentRef: parentRef,
      displayedTemplates: templatesAggregate,
      shouldShowTooltip: (suggestedTemplates === null || suggestedTemplates === void 0 ? void 0 : suggestedTemplates.length) === 0 && shouldShowEmailTooltip
    }, templateListDisplayVariables)), noResults && !isLoading && /*#__PURE__*/jsx(NoResultsPage, {
      title: t('playbook.tabContent.noResults'),
      description: t('playbook.tabContent.noResultsHint'),
      actionButton: actionButton
    }), noTemplates && !isLoading && /*#__PURE__*/jsx(NoResultsPage, {
      title: title,
      description: description,
      actionButton: actionButton
    }), /*#__PURE__*/jsx("div", {
      className: styles$9.invisibleFooter
    })]
  });
};

var QQsContent = function QQsContent() {
  var _usePlaybookFeed = usePlaybookFeed(),
    activeBobject = _usePlaybookFeed.activeBobject,
    refreshMainBobject = _usePlaybookFeed.refreshMainBobject,
    segmentationValues = _usePlaybookFeed.segmentationValues,
    actionsDisabled = _usePlaybookFeed.actionsDisabled,
    qualifyingQuestions = _usePlaybookFeed.qualifyingQuestions,
    isLoading = _usePlaybookFeed.isLoading,
    updateQualifyingQuestionsValue = _usePlaybookFeed.updateQualifyingQuestionsValue;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var noResults = (qualifyingQuestions === null || qualifyingQuestions === void 0 ? void 0 : qualifyingQuestions.length) === 0 && Object.keys(segmentationValues).length !== 0;
  var noQQs = (qualifyingQuestions === null || qualifyingQuestions === void 0 ? void 0 : qualifyingQuestions.length) === 0 && Object.keys(segmentationValues).length === 0;
  var _noResultsContent = noResultsContent({
      tabSelected: PlaybookTab.QQS,
      t: t
    }),
    actionButton = _noResultsContent.actionButton,
    description = _noResultsContent.description,
    title = _noResultsContent.title;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [(qualifyingQuestions === null || qualifyingQuestions === void 0 ? void 0 : qualifyingQuestions.length) > 0 && (qualifyingQuestions === null || qualifyingQuestions === void 0 ? void 0 : qualifyingQuestions.map(function (qq) {
      return /*#__PURE__*/jsx(QQsCard, {
        template: qq,
        QQValue: activeBobject !== null && activeBobject !== void 0 && activeBobject.rawBobject ? activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.rawBobject[qq === null || qq === void 0 ? void 0 : qq.id] : //@ts-ignore
        activeBobject === null || activeBobject === void 0 ? void 0 : activeBobject.raw[qq === null || qq === void 0 ? void 0 : qq.id],
        tabSelected: PlaybookTab.QQS,
        onUpdateQQ: function onUpdateQQ(value) {
          return updateQualifyingQuestionsValue(activeBobject, value);
        },
        refreshActiveBobject: refreshMainBobject,
        actionsDisabled: actionsDisabled
      }, qq === null || qq === void 0 ? void 0 : qq.id);
    })), noResults && !isLoading && /*#__PURE__*/jsx(NoResultsPage, {
      title: t('playbook.tabContent.noResults'),
      description: t('playbook.tabContent.noResultsHint'),
      actionButton: actionButton
    }), noQQs && !isLoading && /*#__PURE__*/jsx(NoResultsPage, {
      title: title,
      description: description,
      actionButton: actionButton
    })]
  });
};

function _typeof$9(obj) { "@babel/helpers - typeof"; return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$9(obj); }
function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty$9(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$9(obj, key, value) { key = _toPropertyKey$9(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$9(arg) { var key = _toPrimitive$9(arg, "string"); return _typeof$9(key) === "symbol" ? key : String(key); }
function _toPrimitive$9(input, hint) { if (_typeof$9(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$9(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TabContent = function TabContent() {
  var _usePlaybookFeed = usePlaybookFeed(),
    selectedTab = _usePlaybookFeed.selectedTab;
  var ref = useRef(null);
  var isQQs = selectedTab === PlaybookTab.QQS;
  return /*#__PURE__*/jsx("div", _objectSpread$7(_objectSpread$7({
    ref: ref
  }, !isQQs && {
    className: styles$9.cards_container
  }), {}, {
    children: !isQQs ? /*#__PURE__*/jsx(MessagingContent, {
      parentRef: ref
    }) : /*#__PURE__*/jsx(QQsContent, {})
  }));
};

function _typeof$8(obj) { "@babel/helpers - typeof"; return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$8(obj); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$7(arr); }
function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty$8(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$8(obj, key, value) { key = _toPropertyKey$8(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$8(arg) { var key = _toPrimitive$8(arg, "string"); return _typeof$8(key) === "symbol" ? key : String(key); }
function _toPrimitive$8(input, hint) { if (_typeof$8(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$8(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7(); }
function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }
function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$7(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }
var TemplateSearch = function TemplateSearch(_ref) {
  var setSearchValue = _ref.setSearchValue,
    defaultOpen = _ref.defaultOpen;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(defaultOpen),
    _useState2 = _slicedToArray$7(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  return isOpen ? /*#__PURE__*/jsx(Input, {
    icon: "search",
    size: "small",
    onChange: setSearchValue,
    color: "verySoftPurple",
    placeholder: t('playbook.searchTemplates'),
    className: styles$9.noBorder
  }) : /*#__PURE__*/jsx(IconButton, {
    color: "purple",
    onClick: function onClick() {
      return setIsOpen(true);
    },
    name: "search",
    size: 20
  });
};
var withProvider$1 = function withProvider(Component) {
  return function (props) {
    return /*#__PURE__*/jsx(PlaybookFeedProvider, {
      props: _objectSpread$6({
        isSmartEmail: props.environment === Environment.SMART_EMAIL
      }, props),
      children: /*#__PURE__*/jsx(Component, {})
    });
  };
};
var PlaybookFeedComponent = function PlaybookFeedComponent() {
  var _usePlaybookFeed = usePlaybookFeed(),
    accountId = _usePlaybookFeed.accountId,
    activeBobject = _usePlaybookFeed.activeBobject,
    isMainBobjectSalesStage = _usePlaybookFeed.isMainBobjectSalesStage,
    company = _usePlaybookFeed.company,
    environment = _usePlaybookFeed.environment,
    _usePlaybookFeed$sele = _usePlaybookFeed.selectedTab,
    selectedTab = _usePlaybookFeed$sele === void 0 ? PlaybookTab.PITCHES : _usePlaybookFeed$sele,
    _usePlaybookFeed$setS = _usePlaybookFeed.setSelectedTab,
    setSelectedTab = _usePlaybookFeed$setS === void 0 ? function () {} : _usePlaybookFeed$setS,
    isFilterViewOpen = _usePlaybookFeed.isFilterViewOpen,
    toggleFilterView = _usePlaybookFeed.toggleFilterView,
    stage = _usePlaybookFeed.stage,
    segmentationFields = _usePlaybookFeed.segmentationFields,
    segmentationValues = _usePlaybookFeed.segmentationValues,
    visibilityFilters = _usePlaybookFeed.visibilityFilters,
    setFiltersContext = _usePlaybookFeed.setFiltersContext,
    _usePlaybookFeed$side = _usePlaybookFeed.sidePeekEnabled,
    sidePeekEnabled = _usePlaybookFeed$side === void 0 ? false : _usePlaybookFeed$side,
    setSearchValue = _usePlaybookFeed.setSearchValue,
    headerComponent = _usePlaybookFeed.headerComponent;
  var hasSnippetsEnabled = useSnippetsEnabled(accountId);
  var hasWhatsappEnabled = useWhatsappEnabled(accountId);
  var isSmartEmail = environment === Environment.SMART_EMAIL;
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var snippetsBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
  var handleChangeTab = function handleChangeTab(tab) {
    setSelectedTab(tab);
    setFiltersContext({
      segmentationData: segmentationValues || activeBobjectSegmentationValues,
      stage: stage,
      isFilterViewOpen: isFilterViewOpen,
      visibilityFilters: visibilityFilters,
      shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(tab),
      shouldShowVisibilityFilters: tab !== PlaybookTab.QQS
    });
  };
  var getPlaybookStage = function getPlaybookStage() {
    if (stage) {
      return stage;
    } else {
      return isMainBobjectSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
    }
  };
  var _usePlaybook = usePlaybook({
      stage: getPlaybookStage(),
      bobjectData: {
        company: company,
        activeBobject: activeBobject
      }
    }),
    activeBobjectSegmentationValues = _usePlaybook.activeBobjectSegmentationValues;
  var haveDefaultSegmentationLoaded = activeBobjectSegmentationValues && Object.keys(activeBobjectSegmentationValues).length > 0;
  var headerText = !isSmartEmail ? t('playbook.playbook') : hasSnippetsEnabled ? t('playbook.templatesAndSnippets') : t('playbook.playbookTemplates');
  useEffect(function () {
    if (haveDefaultSegmentationLoaded && isMainBobjectSalesStage === [TemplateStage.Sales, TemplateStage.All].includes(stage) && !segmentationValues) {
      setFiltersContext({
        segmentationData: activeBobjectSegmentationValues,
        stage: stage,
        isFilterViewOpen: isFilterViewOpen,
        visibilityFilters: visibilityFilters,
        shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(selectedTab),
        shouldShowVisibilityFilters: selectedTab !== PlaybookTab.QQS
      });
    }
  }, [haveDefaultSegmentationLoaded]);
  var selectedValuesNames = useMemo(function () {
    if (!segmentationValues) {
      return [];
    }
    return Object.entries(segmentationValues).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray$7(_ref2, 2),
        fieldId = _ref3[0],
        itemValues = _ref3[1];
      // @ts-ignore
      if ((itemValues === null || itemValues === void 0 ? void 0 : itemValues.length) === 0) return acc;
      var segmentationFieldsToSearch = stage === TemplateStage.All ? [].concat(_toConsumableArray$1(segmentationFields[TemplateStage.Prospecting]), _toConsumableArray$1(segmentationFields[TemplateStage.Sales])) : segmentationFields === null || segmentationFields === void 0 ? void 0 : segmentationFields[stage];
      var segmentationField = segmentationFieldsToSearch === null || segmentationFieldsToSearch === void 0 ? void 0 : segmentationFieldsToSearch.find(function (segmentation) {
        return segmentation.id === fieldId;
      });
      if (!itemValues) return [].concat(_toConsumableArray$1(acc), [t('playbook.allAssets', {
        segmentationName: segmentationField === null || segmentationField === void 0 ? void 0 : segmentationField.name
      })]);
      // @ts-ignore
      var valuesNames = itemValues === null || itemValues === void 0 ? void 0 : itemValues.reduce(function (accField, itemValue) {
        var _segmentationField$va;
        var field = segmentationField === null || segmentationField === void 0 ? void 0 : (_segmentationField$va = segmentationField.values) === null || _segmentationField$va === void 0 ? void 0 : _segmentationField$va.find(function (segValue) {
          return segValue.id === itemValue;
        });
        if (field) return [].concat(_toConsumableArray$1(accField), [field === null || field === void 0 ? void 0 : field.name]);
        return accField;
      }, []);
      return [].concat(_toConsumableArray$1(acc), _toConsumableArray$1(valuesNames));
    }, []);
  }, [segmentationValues]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$9.container,
    children: [headerComponent, /*#__PURE__*/jsxs("div", {
      className: styles$9.header_container,
      children: [/*#__PURE__*/jsxs("div", {
        className: styles$9.headerTitle,
        style: isSmartEmail ? {
          marginBottom: '24px'
        } : undefined,
        children: [/*#__PURE__*/jsxs("span", {
          className: styles$9.title_container,
          children: [/*#__PURE__*/jsx(Icon, {
            name: "magic",
            size: 24,
            color: "purple"
          }), /*#__PURE__*/jsx(Text, {
            color: "purple",
            weight: "bold",
            children: headerText
          })]
        }), selectedTab !== PlaybookTab.QQS && /*#__PURE__*/jsx(TemplateSearch, {
          setSearchValue: setSearchValue,
          defaultOpen: isSmartEmail || sidePeekEnabled
        }), snippetsBlockHidden && selectedTab === PlaybookTab.SNIPPETS && isSmartEmail && /*#__PURE__*/jsx(IconButton, {
          onClick: function onClick() {
            mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_BUTTON_TIP_CLICKED);
            window.open('https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time', '_blank');
          },
          size: 18,
          className: styles$9.suggestionsButton,
          name: "suggestions",
          color: "bloobirds"
        })]
      }), /*#__PURE__*/jsx("div", {
        className: styles$9.contentWrapper,
        children: /*#__PURE__*/jsx(Button, {
          size: "small",
          color: isFilterViewOpen ? 'purple' : 'lightPurple',
          uppercase: false,
          onClick: function onClick() {
            toggleFilterView(!isFilterViewOpen, selectedTab);
          },
          children: /*#__PURE__*/jsxs("div", {
            className: styles$9.buttonContent,
            children: [/*#__PURE__*/jsx("div", {
              className: styles$9.buttonText,
              children: (selectedValuesNames === null || selectedValuesNames === void 0 ? void 0 : selectedValuesNames.length) !== 0 ? /*#__PURE__*/jsxs(Fragment, {
                children: [/*#__PURE__*/jsxs(Text, {
                  size: "xs",
                  color: "white",
                  weight: "bold",
                  className: styles$9.segmentedFor,
                  children: [t('playbook.selectedFilters', {
                    count: (selectedValuesNames === null || selectedValuesNames === void 0 ? void 0 : selectedValuesNames.length) || 0
                  }), ' ']
                }), /*#__PURE__*/jsx(Text, {
                  size: "xs",
                  color: "white",
                  className: styles$9.selectedValuesNames,
                  children: selectedValuesNames === null || selectedValuesNames === void 0 ? void 0 : selectedValuesNames.join(', ')
                })]
              }) : /*#__PURE__*/jsx(Text, {
                size: "xs",
                color: "white",
                weight: "bold",
                className: styles$9.segmentedFor,
                children: t('playbook.selectSegmentationCriteria')
              })
            }), /*#__PURE__*/jsxs("div", {
              className: styles$9.buttonButtons,
              children: [/*#__PURE__*/jsx(Icon, {
                name: "sliders",
                color: "white",
                size: 16
              }), /*#__PURE__*/jsx(IconButton, {
                name: "cross",
                color: "white",
                size: 16,
                onClick: function onClick(e) {
                  e.stopPropagation();
                  setFiltersContext({
                    segmentationData: undefined,
                    isFilterViewOpen: isFilterViewOpen,
                    stage: stage
                  });
                }
              })]
            })]
          })
        })
      }), /*#__PURE__*/jsx(PlaybookTabs, {
        environment: environment,
        hasSnippetsEnabled: hasSnippetsEnabled,
        hasWhatsappEnabled: hasWhatsappEnabled,
        tabSelected: selectedTab,
        handleChangeTab: handleChangeTab,
        sidePeekEnabled: sidePeekEnabled
      })]
    }), segmentationFields ? /*#__PURE__*/jsx(TabContent, {}) : /*#__PURE__*/jsx("div", {
      className: styles$9.spinner,
      children: /*#__PURE__*/jsx(Spinner, {
        name: "loadingCircle",
        color: "purple"
      })
    })]
  });
};
var PlaybookFeed = withProvider$1(PlaybookFeedComponent);

var css_248z$6 = ".resetSalesforceCSSs-module_salesforceReset__OJ9R2 {\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 table {\n    width: inherit;\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 td,\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 th {\n    text-align: revert-layer;\n    padding: unset;\n}\n\n.resetSalesforceCSSs-module_salesforceReset__OJ9R2 img {\n    height: unset;\n    max-width: unset;\n    vertical-align: unset;\n}\n";
var resetSalesforceStyles = {"salesforceReset":"resetSalesforceCSSs-module_salesforceReset__OJ9R2"};
styleInject(css_248z$6);

var css_248z$5 = ".metric-module__statistics_item__cOVpO {\n  display: flex;\n}\n\n.metric-module__statistics_item__cOVpO > p {\n  cursor: default;\n  margin-left: 4px;\n  margin-right: 12px;\n}\n";
var styles$5 = {"_statistics_item":"metric-module__statistics_item__cOVpO"};
styleInject(css_248z$5);

var METRIC_INFO = {
  OPENED_RATE: {
    icon: 'eye',
    key: 'metrics.openRate'
  },
  CLICKED_RATE: {
    icon: 'cursorClickOutline',
    key: 'metrics.clickRate'
  },
  REPLIED_RATE: {
    icon: 'reply',
    key: 'metrics.replyRate'
  },
  USED_COUNT: {
    icon: 'mailCompleted',
    key: 'metrics.timesDelivered'
  }
};
var Metric = function Metric(_ref) {
  var name = _ref.name,
    value = _ref.value;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'extendedScreen.templateDetail'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Tooltip, {
    title: t(METRIC_INFO[name].key),
    position: "bottom",
    children: /*#__PURE__*/jsxs("div", {
      className: styles$5._statistics_item,
      children: [/*#__PURE__*/jsx(Icon, {
        name: METRIC_INFO[name].icon,
        size: 18,
        color: "purple"
      }), /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "purple",
        children: name.includes('RATE') ? Math.min(parseInt((value * 10).toString(), 10), 100) + '%' : value
      })]
    })
  });
};

var css_248z$4 = ".templateDetail-module_separator__H0gUE {\n  margin: 8px 32px 12px 16px;\n  display: flex;\n  align-self: center;\n  width: 286px;\n  height: 1px;\n  background-color: var(--verySoftPeanut);\n}\n\n.templateDetail-module_container__NOMB9 {\n  padding: 0 24px;\n  height: 100%\n}\n\n.templateDetail-module_contentGeneralWrapper__GPPW7 {\n  display: flex;\n  flex-direction: column;\n  max-height: 88%;\n  overflow-y: scroll;\n}\n\n.templateDetail-module_header__YWhZ7 {\n  display: flex;\n  flex-direction: column;\n}\n\n.templateDetail-module_header__YWhZ7 > * {\n  margin-bottom: 12px;\n}\n\n.templateDetail-module_visibilityLabel__W53Hh {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.templateDetail-module_headerIcons__ftXpH {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n\n.templateDetail-module_templateBody__eV4Sx {\n  overflow-y: scroll;\n  flex: 1;\n}\n\n.templateDetail-module_templateBody__eV4Sx ul, .templateDetail-module_templateBody__eV4Sx ol {\n  padding-left: 40px;\n}\n\n.templateDetail-module_templateBody__eV4Sx > ul * {\n  list-style: initial;\n}\n\n.templateDetail-module_templateBody__eV4Sx > ol * {\n  list-style: auto;\n}\n\n.templateDetail-module__assigned_to__tE0-q {\n  margin-top: -4px;\n}\n\n\n.templateDetail-module_dropdownAnchorWrapper__aBFlb {\n  margin-left: -2px;\n}\n\n.templateDetail-module_dropdownWrapper__fNlNb {\n  margin: 0 16px -6px;\n}\n\n.templateDetail-module__statistics_container__Qj3Ro {\n  padding: 4px 8px;\n}\n\n.templateDetail-module_statistics__nMdhH {\n  display: flex;\n  margin-top: 12px;\n}\n\n.templateDetail-module_loading__2d72W {\n  display: flex;\n  justify-content: center;\n  margin-top: 18px;\n}\n\n.templateDetail-module__lock__icon__CO3g3 {\n  margin-right: 4px;\n}\n\n.templateDetail-module_buttons__1Itkq{\n  display: flex;\n  padding-top: 24px;\n  padding-bottom: 10px;\n  box-sizing: border-box;\n  justify-content: space-between;\n  margin-left: -10px;\n}\n\n.templateDetail-module_dialerButtons__gXVqD {\n  display: flex;\n  padding-top: 9px;\n  padding-bottom: 10px;\n  box-sizing: border-box;\n  justify-content: space-between;\n  margin-left: -15px;\n  margin-right: -15px;\n}\n\n.templateDetail-module_buttons_right__xsMDh{\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n}\n";
var styles$4 = {"separator":"templateDetail-module_separator__H0gUE","container":"templateDetail-module_container__NOMB9","contentGeneralWrapper":"templateDetail-module_contentGeneralWrapper__GPPW7","header":"templateDetail-module_header__YWhZ7","visibilityLabel":"templateDetail-module_visibilityLabel__W53Hh","headerIcons":"templateDetail-module_headerIcons__ftXpH","templateBody":"templateDetail-module_templateBody__eV4Sx","_assigned_to":"templateDetail-module__assigned_to__tE0-q","dropdownAnchorWrapper":"templateDetail-module_dropdownAnchorWrapper__aBFlb","dropdownWrapper":"templateDetail-module_dropdownWrapper__fNlNb","_statistics_container":"templateDetail-module__statistics_container__Qj3Ro","statistics":"templateDetail-module_statistics__nMdhH","loading":"templateDetail-module_loading__2d72W","_lock__icon":"templateDetail-module__lock__icon__CO3g3","buttons":"templateDetail-module_buttons__1Itkq","dialerButtons":"templateDetail-module_dialerButtons__gXVqD","buttons_right":"templateDetail-module_buttons_right__xsMDh"};
styleInject(css_248z$4);

function _typeof$7(obj) { "@babel/helpers - typeof"; return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$7(obj); }
var _excluded = ["name", "isBattlecard", "isOfficial", "visibility", "createdBy", "type", "cadenceUsages", "templateStatistics"];
function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty$7(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$7(obj, key, value) { key = _toPropertyKey$7(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$7(arg) { var key = _toPrimitive$7(arg, "string"); return _typeof$7(key) === "symbol" ? key : String(key); }
function _toPrimitive$7(input, hint) { if (_typeof$7(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$7(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6(); }
function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }
function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$6(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var TemplateHeader = function TemplateHeader(_ref) {
  var name = _ref.name,
    isBattlecard = _ref.isBattlecard,
    isOfficial = _ref.isOfficial,
    visibility = _ref.visibility,
    createdBy = _ref.createdBy,
    type = _ref.type,
    cadenceUsages = _ref.cadenceUsages,
    templateStatistics = _ref.templateStatistics,
    template = _objectWithoutProperties(_ref, _excluded);
  var _ref2 = useUserSearch() || {},
    users = _ref2.users;
  var author = users === null || users === void 0 ? void 0 : users.find(function (user) {
    return user.id === createdBy;
  });
  var isEmail = type === TEMPLATE_TYPES.EMAIL;
  var _useHover = useHover(),
    _useHover2 = _slicedToArray$6(_useHover, 2),
    anchorRef = _useHover2[0],
    isHovering = _useHover2[1];
  var _useVisible = useVisible(false, anchorRef),
    ref = _useVisible.ref,
    infoVisible = _useVisible.visible,
    setInfoVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'extendedScreen.templateDetail'
    }),
    t = _useTranslation.t;
  useEffect(function () {
    setInfoVisible(isHovering);
  }, [isHovering]);
  return /*#__PURE__*/jsxs("div", {
    className: styles$4.header,
    children: [/*#__PURE__*/jsx(Text, {
      size: "m",
      weight: "bold",
      children: name
    }), /*#__PURE__*/jsxs("div", {
      className: styles$4.headerIcons,
      children: [isEmail && cadenceUsages > 0 && /*#__PURE__*/jsx(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: '142px',
          letterSpacing: 0.5
        },
        children: t('usedInXCadences', {
          count: cadenceUsages || 0
        })
      }), visibility && /*#__PURE__*/jsx(Label, {
        size: "small",
        color: "verySoftPurple",
        textColor: "purple",
        uppercase: false,
        overrideStyle: {
          maxWidth: '77px'
        },
        children: /*#__PURE__*/jsxs("span", {
          className: styles$4.visibilityLabel,
          children: [/*#__PURE__*/jsx(Icon, {
            name: visibility === 'PUBLIC' ? 'unlock' : 'lock',
            color: "purple",
            size: 16
          }), visibility === 'PUBLIC' ? t('public') : t('private')]
        })
      }), isBattlecard && /*#__PURE__*/jsx(Tooltip, {
        title: t('battleCard'),
        position: "top",
        children: /*#__PURE__*/jsx(Icon, {
          name: "battlecards",
          color: "purple"
        })
      }), isOfficial && /*#__PURE__*/jsx(Tooltip, {
        title: t('official'),
        position: "top",
        children: /*#__PURE__*/jsx(Icon, {
          name: "bookmark",
          color: "purple"
        })
      }), (template === null || template === void 0 ? void 0 : template.format) === 'HTML' && /*#__PURE__*/jsx(Tooltip, {
        title: t('html'),
        position: "top",
        children: /*#__PURE__*/jsx(Icon, {
          name: "coding",
          color: "purple"
        })
      }), /*#__PURE__*/jsx(Dropdown, {
        anchor: /*#__PURE__*/jsx("div", {
          ref: anchorRef,
          className: styles$4.dropdownAnchorWrapper,
          children: /*#__PURE__*/jsx(Icon, {
            name: "infoFilled",
            color: "darkBloobirds",
            size: 20
          })
        }),
        visible: infoVisible,
        ref: ref,
        zIndex: 20001,
        children: /*#__PURE__*/jsx("div", {
          className: styles$4.dropdownWrapper,
          children: /*#__PURE__*/jsx(TemplateInformation, {
            template: _objectSpread$5({
              createdBy: createdBy
            }, template)
          })
        })
      }), author && /*#__PURE__*/jsx("div", {
        className: styles$4._assigned_to,
        children: /*#__PURE__*/jsx(Tooltip, {
          title: "".concat(t('author'), ": ").concat(author === null || author === void 0 ? void 0 : author.name),
          position: "top",
          children: /*#__PURE__*/jsx(CircularBadge, {
            size: "s",
            color: "lightPeanut",
            style: {
              color: 'var(--white)',
              fontSize: '9px'
            },
            backgroundColor: (author === null || author === void 0 ? void 0 : author.color) || 'lightPeanut',
            children: (author === null || author === void 0 ? void 0 : author.shortname) || 'U'
          })
        })
      }), !!(template !== null && template !== void 0 && template.taskTitle) && /*#__PURE__*/jsx("div", {
        className: styles$4.step_banner,
        children: /*#__PURE__*/jsx(Tooltip, {
          title: template === null || template === void 0 ? void 0 : template.taskTitle,
          position: "top",
          children: /*#__PURE__*/jsx(Label, {
            size: 'small',
            uppercase: false,
            color: 'verySoftTangerine',
            textColor: "tangerine",
            overrideStyle: {
              height: '22px',
              display: 'flex',
              padding: '4px'
            },
            children: template.taskTitle
          })
        })
      })]
    }), isEmail && templateStatistics && Object.keys(templateStatistics).length !== 0 && /*#__PURE__*/jsxs("div", {
      className: styles$4.statistics,
      children: [/*#__PURE__*/jsx(Metric, {
        name: "USED_COUNT",
        value: templateStatistics.USED_COUNT
      }), /*#__PURE__*/jsx(Metric, {
        name: "OPENED_RATE",
        value: templateStatistics.OPENED_RATE
      }), /*#__PURE__*/jsx(Metric, {
        name: "CLICKED_RATE",
        value: templateStatistics.CLICKED_RATE
      }), /*#__PURE__*/jsx(Metric, {
        name: "REPLIED_RATE",
        value: templateStatistics.REPLIED_RATE
      })]
    })]
  });
};
var TemplateDetail = function TemplateDetail(_ref3) {
  var template = _ref3.template,
    extended = _ref3.extended,
    backButtonAction = _ref3.backButtonAction,
    dialerButtons = _ref3.dialerButtons,
    _ref3$insertButtonAct = _ref3.insertButtonAction,
    insertButtonAction = _ref3$insertButtonAct === void 0 ? function () {} : _ref3$insertButtonAct,
    _ref3$replaceButtonAc = _ref3.replaceButtonAction,
    replaceButtonAction = _ref3$replaceButtonAc === void 0 ? function () {} : _ref3$replaceButtonAc,
    setSelectedTemplate = _ref3.setSelectedTemplate,
    _ref3$onlyReadable = _ref3.onlyReadable,
    onlyReadable = _ref3$onlyReadable === void 0 ? false : _ref3$onlyReadable;
  var _useState = useState(false),
    _useState2 = _slicedToArray$6(_useState, 2),
    isModalOpen = _useState2[0],
    setIsModalOpen = _useState2[1];
  var ref = useRef();
  var isSnippet = template.type === TEMPLATE_TYPES.SNIPPET;
  var _useMessagingTemplate = useMessagingTemplate(template === null || template === void 0 ? void 0 : template.id),
    deleteMessagingTemplate = _useMessagingTemplate.deleteMessagingTemplate;
  var isOwner = useIsTemplateOwner(template);
  var handleDelete = function handleDelete() {
    deleteMessagingTemplate(template === null || template === void 0 ? void 0 : template.id).then(function (res) {
      // @ts-ignore
      if (res.error) {
        console.error(res);
      } else {
        createToast({
          type: 'success',
          message: 'Template deleted successfully'
        });
      }
      setIsModalOpen(false);
      backButtonAction();
      window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
    });
  };
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'smartEmailModal.playbookTab.header'
    }),
    t = _useTranslation2.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$4.container,
    children: !template ? /*#__PURE__*/jsx("div", {
      className: styles$4.loading,
      children: /*#__PURE__*/jsx(Spinner, {
        name: "loadingCircle"
      })
    }) : /*#__PURE__*/jsxs(Fragment, {
      children: [extended && /*#__PURE__*/jsxs("div", {
        className: clsx(_defineProperty$7(_defineProperty$7({}, styles$4.buttons, !dialerButtons), styles$4.dialerButtons, !!dialerButtons)),
        children: [/*#__PURE__*/jsx(Button, {
          iconLeft: "arrowLeft",
          size: "small",
          color: "purple",
          onClick: backButtonAction,
          variant: "clear",
          uppercase: false,
          children: t('back')
        }), !dialerButtons ? /*#__PURE__*/jsxs("div", {
          className: styles$4.buttons_right,
          children: [!onlyReadable && /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx(Tooltip, {
              title: isOwner ? t('deleteTemplate') : t('userCantEdit'),
              position: "top",
              children: /*#__PURE__*/jsx(Button, {
                iconLeft: "trashFull",
                size: "small",
                color: isOwner ? 'tomato' : 'softPeanut',
                variant: "secondary",
                onClick: function onClick() {
                  return setIsModalOpen(true);
                },
                disabled: !isOwner
              })
            }), /*#__PURE__*/jsx(Tooltip, {
              title: isOwner ? t('editTemplate') : t('userCantEdit'),
              position: "top",
              children: (template === null || template === void 0 ? void 0 : template.format) === 'AST' && /*#__PURE__*/jsx(Button, {
                iconLeft: "edit",
                size: "small",
                color: isOwner ? 'purple' : 'softPeanut',
                variant: "secondary",
                onClick: function onClick() {
                  return setSelectedTemplate(_objectSpread$5(_objectSpread$5({}, template), {}, {
                    edit: true
                  }));
                },
                disabled: !isOwner
              })
            }), !isSnippet && (template === null || template === void 0 ? void 0 : template.format) !== 'HTML' && /*#__PURE__*/jsx(Tooltip, {
              title: t('insertTemplate'),
              position: "top",
              children: /*#__PURE__*/jsx(Button, {
                iconLeft: "fileInsert",
                size: "small",
                color: "purple",
                variant: "secondary",
                onClick: function onClick() {
                  return insertButtonAction(template);
                }
              })
            })]
          }), /*#__PURE__*/jsx(Button, {
            iconLeft: isSnippet ? 'fileInsert' : 'sendEmailInvitation',
            size: "small",
            color: "purple",
            onClick: function onClick() {
              return isSnippet ? insertButtonAction(template) : replaceButtonAction(template);
            },
            variant: "primary",
            uppercase: false,
            children: isSnippet ? t('insert') : t('use')
          })]
        }) : /*#__PURE__*/jsx("div", {
          className: styles$4.buttons_right,
          children: dialerButtons
        })]
      }), /*#__PURE__*/jsxs("div", {
        className: styles$4.contentGeneralWrapper,
        children: [/*#__PURE__*/jsx(TemplateHeader, _objectSpread$5({}, template)), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx(ReactShadowRoot, {
            children: /*#__PURE__*/jsx("div", {
              ref: ref,
              className: clsx(styles$4.templateBody, resetSalesforceStyles.salesforceReset),
              style: {
                overflow: 'auto'
              },
              dangerouslySetInnerHTML: {
                __html: (template === null || template === void 0 ? void 0 : template.format) === 'HTML' ? template === null || template === void 0 ? void 0 : template.content : template === null || template === void 0 ? void 0 : template.previewContent
              }
            })
          })
        })]
      }), /*#__PURE__*/jsx(PlaybookConfirmationModal, {
        openMode: isModalOpen && 'Delete',
        templateId: template === null || template === void 0 ? void 0 : template.id,
        onClose: function onClose() {
          return setIsModalOpen(false);
        },
        onAccept: handleDelete
      })]
    })
  });
};

var css_248z$3 = ".segmentationFilter-module_wrapper__MQwut {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.segmentationFilter-module_header__rZ7KM {\n  width: 100%;\n  padding: 8px 16px 8px 16px;\n}\n\n.segmentationFilter-module_smartHeader__9y8R3 {\n  padding: 0;\n}\n\n.segmentationFilter-module_segmentationHeader__wCrsN {\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 16px 8px 16px;\n}\n\n.segmentationFilter-module_segmentationTitle__eOeLw {\n  margin-bottom: -12px;\n}\n\n.segmentationFilter-module_smartSegmentationHeader__vzv65 {\n  padding: 0;\n  margin-bottom: 4px;\n}\n\n.segmentationFilter-module_smartSegmentationHeader__vzv65 {\n  padding: 0;\n  margin-bottom: 20px;\n}\n\n.segmentationFilter-module_filterGroup__N5BID {\n  display: flex;\n  width: 100%;\n  gap: 4px;\n  flex-wrap: wrap;\n  padding: 8px 16px 16px 16px;\n}\n\n.segmentationFilter-module_smartFilterGroup__zaJ-l {\n  padding: 16px 0;\n}\n\n.segmentationFilter-module_filterGroup__N5BID > div {\n  width: 48%;\n  margin-bottom: 4px;\n  font-size: 12px;\n}\n\n.segmentationFilter-module_stageSelector__810l7 {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 100%;\n  padding: 0 16px 16px 16px;\n}\n\n.segmentationFilter-module_smartStageSelector__CBvQS {\n  width: 100%;\n  padding: 8px 0 16px 0;\n}\n\n.segmentationFilter-module_label__ECsZh {\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  width: 151px;\n  display: flex;\n  color: var(--purple);\n  border-radius: 0 3px 3px 0;\n}\n\n.segmentationFilter-module_smartLabel__6Hxt9{\n  width: 50%;\n  height: 24px;\n}\n\n.segmentationFilter-module_label__ECsZh:not(:last-child) {\n  align-items: center;\n  cursor: pointer;\n  width: 50%;\n  color: var(--purple);\n  border-right: 1px var(--purple) solid;\n  border-radius: 3px 0 0 3px;\n}\n\n.segmentationFilter-module_selectedLabel__6jehk {\n  background-color: var(--purple);\n  color: var(--white);\n}\n\n.segmentationFilter-module_selectorsWrapper__bhLjE {\n  margin-top: 8px;\n  margin-bottom: 8px;\n  display: flex;\n  padding: 0 24px;\n  flex-direction: column;\n  gap: 20px;\n  width: 100%;\n}\n\n.segmentationFilter-module_smartSelectorsWrapper__ggJMf{\n  padding: 0 8px;\n  width: 100%;\n}\n\n.segmentationFilter-module_categoryBlock__hTpPz{\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.segmentationFilter-module_blockHeader__upw3G {\n  display: flex;\n  justify-content: space-between;\n}\n\n.segmentationFilter-module_clearLabel__vk-cq {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n\n.segmentationFilter-module_clearLabel__vk-cq > p {\n  line-height: 14px;\n}\n\n.segmentationFilter-module_selectorMultiselect__jAtYV {\n  width: 100%;\n}\n\n.segmentationFilter-module_selectorMultiselect__jAtYV > div > div {\n  border: 1px solid var(--verySoftPeanut);\n  margin-bottom: 12px;\n}\n\n.segmentationFilter-module_selectorMultiselect__jAtYV > div > div > button > span {\n  color: var(--softPeanut) !important;\n}\n\n.segmentationFilter-module_activeFilterLabelWrapper__gD2IL {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n\n.segmentationFilter-module_activeFilterLabelWrapperMask__9md4W{\n  overflow: hidden;\n}\n\n.segmentationFilter-module_filterLabel__glG2-{\n  max-width: 288px;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.segmentationFilter-module_filterLabel__glG2- > div{\n  display: flex;\n}\n\n.segmentationFilter-module_filterLabelText__73MY2{\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n";
var styles$3 = {"wrapper":"segmentationFilter-module_wrapper__MQwut","header":"segmentationFilter-module_header__rZ7KM","smartHeader":"segmentationFilter-module_smartHeader__9y8R3","segmentationHeader":"segmentationFilter-module_segmentationHeader__wCrsN","segmentationTitle":"segmentationFilter-module_segmentationTitle__eOeLw","smartSegmentationHeader":"segmentationFilter-module_smartSegmentationHeader__vzv65","filterGroup":"segmentationFilter-module_filterGroup__N5BID","smartFilterGroup":"segmentationFilter-module_smartFilterGroup__zaJ-l","stageSelector":"segmentationFilter-module_stageSelector__810l7","smartStageSelector":"segmentationFilter-module_smartStageSelector__CBvQS","label":"segmentationFilter-module_label__ECsZh","smartLabel":"segmentationFilter-module_smartLabel__6Hxt9","selectedLabel":"segmentationFilter-module_selectedLabel__6jehk","selectorsWrapper":"segmentationFilter-module_selectorsWrapper__bhLjE","smartSelectorsWrapper":"segmentationFilter-module_smartSelectorsWrapper__ggJMf","categoryBlock":"segmentationFilter-module_categoryBlock__hTpPz","blockHeader":"segmentationFilter-module_blockHeader__upw3G","clearLabel":"segmentationFilter-module_clearLabel__vk-cq","selectorMultiselect":"segmentationFilter-module_selectorMultiselect__jAtYV","activeFilterLabelWrapper":"segmentationFilter-module_activeFilterLabelWrapper__gD2IL","activeFilterLabelWrapperMask":"segmentationFilter-module_activeFilterLabelWrapperMask__9md4W","filterLabel":"segmentationFilter-module_filterLabel__glG2-","filterLabelText":"segmentationFilter-module_filterLabelText__73MY2"};
styleInject(css_248z$3);

function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty$6(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$6(obj, key, value) { key = _toPropertyKey$6(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$6(arg) { var key = _toPrimitive$6(arg, "string"); return _typeof$6(key) === "symbol" ? key : String(key); }
function _toPrimitive$6(input, hint) { if (_typeof$6(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$6(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SegmentationFilterContext = /*#__PURE__*/createContext(null);
var SegmentationFilterProvider = function SegmentationFilterProvider(_ref) {
  var children = _ref.children,
    filterValues = _ref.filterValues,
    shouldShowBattlecards = _ref.shouldShowBattlecards,
    shouldShowVisibilityFilters = _ref.shouldShowVisibilityFilters,
    stage = _ref.stage,
    defaultStage = _ref.defaultStage,
    setFiltersContext = _ref.setFiltersContext,
    visibilityFilters = _ref.visibilityFilters,
    isSmartEmail = _ref.isSmartEmail;
  function removeLabelValue(valueToRemove, segmentationField) {
    var filteredValues = filterValues[segmentationField.id].filter(function (value) {
      return value !== valueToRemove;
    });
    var newSegmentation = filteredValues && Object.keys(filterValues).reduce(function (acc, key) {
      var isFilteredKeyEmpty = key === segmentationField.id && filteredValues.length === 0;
      return _objectSpread$4(_objectSpread$4({}, acc), isFilteredKeyEmpty ? {} : _defineProperty$6({}, key, key === segmentationField.id ? filteredValues : filterValues[key]));
    }, {});
    setFiltersContext({
      segmentationData: newSegmentation,
      stage: stage,
      visibilityFilters: visibilityFilters,
      shouldShowBattlecards: shouldShowBattlecards,
      shouldShowVisibilityFilters: shouldShowVisibilityFilters
    });
  }
  function clearBlock(blockId) {
    var newValue = filterValues && Object.keys(filterValues).reduce(function (acc, key) {
      if (blockId !== key) {
        acc[key] = filterValues[key];
      }
      return acc;
    }, {});
    setFiltersContext({
      segmentationData: newValue,
      stage: stage,
      visibilityFilters: visibilityFilters,
      shouldShowBattlecards: shouldShowBattlecards,
      shouldShowVisibilityFilters: shouldShowVisibilityFilters
    });
  }
  return /*#__PURE__*/jsx(SegmentationFilterContext.Provider, {
    value: {
      stageSelector: [stage, function (value) {
        setFiltersContext({
          segmentationData: filterValues,
          stage: value,
          visibilityFilters: visibilityFilters,
          shouldShowBattlecards: shouldShowBattlecards,
          shouldShowVisibilityFilters: shouldShowVisibilityFilters
        });
      }],
      selectedSegmentation: filterValues,
      setSelectedSegmentation: function setSelectedSegmentation(value) {
        setFiltersContext({
          stage: stage,
          segmentationData: value,
          shouldShowBattlecards: shouldShowBattlecards,
          visibilityFilters: visibilityFilters,
          shouldShowVisibilityFilters: shouldShowVisibilityFilters
        });
      },
      visibilityFilters: visibilityFilters,
      setVisibilityFilters: function setVisibilityFilters(value) {
        setFiltersContext({
          stage: stage,
          segmentationData: filterValues,
          shouldShowBattlecards: shouldShowBattlecards,
          shouldShowVisibilityFilters: shouldShowVisibilityFilters,
          visibilityFilters: _objectSpread$4(_objectSpread$4({}, visibilityFilters), value)
        });
      },
      removeLabelValue: removeLabelValue,
      clearBlock: clearBlock,
      isSmartEmail: isSmartEmail,
      shouldShowBattlecards: shouldShowBattlecards,
      shouldShowVisibilityFilters: shouldShowVisibilityFilters,
      defaultStage: defaultStage
    },
    children: children
  });
};
var useSegmentationFilter = function useSegmentationFilter() {
  var context = useContext(SegmentationFilterContext);
  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }
  return context;
};

function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5(); }
function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }
function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$5(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }
var ActiveFilterLabel = function ActiveFilterLabel(_ref) {
  var removeLabel = _ref.removeLabel,
    _ref$selectedValue = _ref.selectedValue,
    id = _ref$selectedValue.id,
    name = _ref$selectedValue.name;
  return /*#__PURE__*/jsx("div", {
    className: styles$3.filterLabel,
    children: /*#__PURE__*/jsxs(Label, {
      value: id,
      color: "verySoftPurple",
      uppercase: false,
      size: "small",
      children: [/*#__PURE__*/jsx(Text, {
        color: "purple",
        size: "xs",
        weight: "medium",
        className: styles$3.filterLabelText,
        children: name
      }), /*#__PURE__*/jsx(IconButton, {
        color: "peanut",
        name: "cross",
        onClick: removeLabel
      })]
    }, id)
  });
};
var ActiveFiltersLabelBlock = function ActiveFiltersLabelBlock(_ref2) {
  var segmentationField = _ref2.segmentationField,
    sectionValues = _ref2.sectionValues,
    selectedValues = _ref2.selectedValues;
  var _useState = useState(false),
    _useState2 = _slicedToArray$5(_useState, 2),
    showMore = _useState2[0],
    setShowMore = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray$5(_useState3, 2),
    elementHeight = _useState4[0],
    setElementHeight = _useState4[1];
  var _useSegmentationFilte = useSegmentationFilter(),
    removeLabelValue = _useSegmentationFilte.removeLabelValue;
  var getElementHeight = function getElementHeight() {
    var _document$getElementB;
    return (_document$getElementB = document.getElementById("filterBlockWapper".concat(segmentationField.id))) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.offsetHeight;
  };
  useEffect(function () {
    setElementHeight(getElementHeight());
  }, [selectedValues.length]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("div", {
      className: styles$3.activeFilterLabelWrapperMask,
      style: {
        maxHeight: !showMore && '112px'
      },
      children: /*#__PURE__*/jsx("div", {
        className: styles$3.activeFilterLabelWrapper,
        id: "filterBlockWapper".concat(segmentationField.id),
        children: selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.map(function (selectedValue) {
          var _ref3 = sectionValues.find(function (value) {
              return value.id === selectedValue;
            }) || {},
            id = _ref3.id,
            name = _ref3.name;
          return /*#__PURE__*/jsx(ActiveFilterLabel, {
            selectedValue: {
              id: id,
              name: name
            },
            removeLabel: function removeLabel() {
              return removeLabelValue(id, segmentationField);
            }
          }, id);
        })
      })
    }), !showMore && elementHeight > 112 && /*#__PURE__*/jsx(IconButton, {
      name: "more",
      color: "purple",
      onClick: function onClick() {
        setShowMore(!showMore);
      }
    })]
  });
};

var CategoryBlock = function CategoryBlock(_ref) {
  var _ref$segmentationFiel = _ref.segmentationField,
    sectionId = _ref$segmentationFiel.id,
    sectionName = _ref$segmentationFiel.name,
    sectionValues = _ref$segmentationFiel.values,
    selectedValues = _ref.selectedValues,
    segmentationField = _ref.segmentationField,
    onChange = _ref.onChange;
  var _useSegmentationFilte = useSegmentationFilter(),
    clearBlock = _useSegmentationFilte.clearBlock,
    isSmartEmail = _useSegmentationFilte.isSmartEmail;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.segmentationFilter'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: styles$3.categoryBlock,
    children: [/*#__PURE__*/jsxs("div", {
      className: styles$3.blockHeader,
      children: [/*#__PURE__*/jsx(Text, {
        size: "xs",
        children: sectionName
      }), (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.length) > 0 && /*#__PURE__*/jsxs("div", {
        className: styles$3.clearLabel,
        onClick: function onClick() {
          clearBlock(sectionId);
        },
        children: [/*#__PURE__*/jsx(IconButton, {
          name: "cross",
          size: 14,
          color: "purple"
        }), /*#__PURE__*/jsx(Text, {
          size: "xxs",
          color: "purple",
          children: t('clearButton')
        })]
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles$3.selectorMultiselect,
      children: /*#__PURE__*/jsx(MultiSelect, {
        dropdownProps: {
          zIndex: 20000
        },
        size: "small",
        value: selectedValues ? selectedValues : [],
        width: isSmartEmail ? '356px' : '100%',
        renderDisplayValue: function renderDisplayValue() {
          var _selectedValues$lengt;
          return (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.length) === 0 || !selectedValues ? t('selectedValue', {
            sectionName: sectionName
          }) : t('multipleSelectedValues', {
            count: (_selectedValues$lengt = selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.length) !== null && _selectedValues$lengt !== void 0 ? _selectedValues$lengt : 0
          });
        },
        onChange: onChange,
        selectAllOption: true,
        autocomplete: true,
        children: sectionValues.map(function (value) {
          return /*#__PURE__*/React.cloneElement( /*#__PURE__*/jsx(CheckItem, {
            value: value.id,
            label: value.name,
            children: value.name
          }, value.id), {
            checked: (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.includes(value.id)) && false
          });
        })
      })
    }), (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.length) > 0 && /*#__PURE__*/jsx(ActiveFiltersLabelBlock, {
      segmentationField: segmentationField,
      selectedValues: selectedValues,
      sectionValues: sectionValues
    })]
  });
};

function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4(); }
function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$4(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
var StageSelector = function StageSelector() {
  var _useSegmentationFilte = useSegmentationFilter(),
    _useSegmentationFilte2 = _slicedToArray$4(_useSegmentationFilte.stageSelector, 2),
    stage = _useSegmentationFilte2[0],
    setSelectedStage = _useSegmentationFilte2[1],
    isSmartEmail = _useSegmentationFilte.isSmartEmail,
    defaultStage = _useSegmentationFilte.defaultStage;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.segmentationFilter'
    }),
    t = _useTranslation.t;
  var updateStage = function updateStage(stage) {
    setSelectedStage(stage);
    window.dispatchEvent(new CustomEvent(MessagesEvents.PlaybookFeed));
  };
  var renderStage = function renderStage(stage) {
    switch (stage) {
      case TemplateStage.All:
        return t('prospectAndSalesStages');
      case TemplateStage.Prospecting:
        return t('prospectStage');
      case TemplateStage.Sales:
        return t('salesStage');
    }
  };
  return /*#__PURE__*/jsx("div", {
    className: clsx(styles$3.stageSelector, _defineProperty$5({}, styles$3.smartStageSelector, isSmartEmail)),
    children: /*#__PURE__*/jsxs(Select, {
      size: "small",
      placeholder: t('stage'),
      width: "100%",
      borderless: false,
      renderDisplayValue: renderStage,
      onChange: updateStage,
      value: stage ? stage : defaultStage,
      children: [/*#__PURE__*/jsx(Item, {
        value: TemplateStage.All,
        children: t('all')
      }), /*#__PURE__*/jsx(Item, {
        value: TemplateStage.Prospecting,
        children: t('prospectStage')
      }), /*#__PURE__*/jsx(Item, {
        value: TemplateStage.Sales,
        children: t('salesStage')
      })]
    })
  });
};

function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var VisibilityFiltersGroup = function VisibilityFiltersGroup() {
  var _useSegmentationFilte = useSegmentationFilter(),
    visibilityFilters = _useSegmentationFilte.visibilityFilters,
    setVisibilityFilters = _useSegmentationFilte.setVisibilityFilters,
    isSmartEmail = _useSegmentationFilte.isSmartEmail,
    shouldShowBattlecards = _useSegmentationFilte.shouldShowBattlecards;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    className: clsx(styles$3.filterGroup, _defineProperty$4({}, styles$3.smartFilterGroup, isSmartEmail)),
    children: [/*#__PURE__*/jsx(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyMine,
      onClick: function onClick(value) {
        return setVisibilityFilters(_objectSpread$3(_objectSpread$3({}, visibilityFilters), {}, {
          onlyMine: value
        }));
      },
      children: t('playbook.segmentationFilter.onlyMine')
    }), /*#__PURE__*/jsx(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyPrivate,
      onClick: function onClick(value) {
        return setVisibilityFilters(_objectSpread$3(_objectSpread$3({}, visibilityFilters), {}, {
          onlyPrivate: value
        }));
      },
      children: t('playbook.segmentationFilter.onlyPrivate')
    }), /*#__PURE__*/jsx(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyOfficial,
      onClick: function onClick(value) {
        return setVisibilityFilters(_objectSpread$3(_objectSpread$3({}, visibilityFilters), {}, {
          onlyOfficial: value
        }));
      },
      children: t('playbook.segmentationFilter.onlyOfficial')
    }), shouldShowBattlecards && /*#__PURE__*/jsx(Checkbox, {
      size: "small",
      color: "purple",
      checked: visibilityFilters === null || visibilityFilters === void 0 ? void 0 : visibilityFilters.onlyBattlecards,
      onClick: function onClick(value) {
        return setVisibilityFilters(_objectSpread$3(_objectSpread$3({}, visibilityFilters), {}, {
          onlyBattlecards: value
        }));
      },
      children: t('playbook.segmentationFilter.onlyBattlecards')
    })]
  });
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var withProvider = function withProvider(Component) {
  return function (_ref) {
    var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
    return /*#__PURE__*/jsx(SegmentationFilterProvider, _objectSpread$2(_objectSpread$2({}, props), {}, {
      children: /*#__PURE__*/jsx(Component, _objectSpread$2({}, props))
    }));
  };
};
var SegmentationFiltersView = function SegmentationFiltersView(_ref2) {
  var segmentationFields = _ref2.segmentationFields,
    isSalesEnabled = _ref2.isSalesEnabled;
  var _useSegmentationFilte = useSegmentationFilter(),
    selectedSegmentation = _useSegmentationFilte.selectedSegmentation,
    setSelectedSegmentation = _useSegmentationFilte.setSelectedSegmentation,
    isSmartEmail = _useSegmentationFilte.isSmartEmail,
    shouldShowVisibilityFilters = _useSegmentationFilte.shouldShowVisibilityFilters;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  return /*#__PURE__*/jsxs("div", {
    className: styles$3.wrapper,
    children: [shouldShowVisibilityFilters && /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx("div", {
        className: clsx(styles$3.header, _defineProperty$3({}, styles$3.smartHeader, isSmartEmail)),
        children: /*#__PURE__*/jsx(Text, {
          weight: "bold",
          children: t('playbook.segmentationFilter.segmentationAndFilters')
        })
      }), /*#__PURE__*/jsx(VisibilityFiltersGroup, {})]
    }), /*#__PURE__*/jsxs("div", {
      className: clsx(styles$3.segmentationHeader, _defineProperty$3({}, styles$3.smartSegmentationHeader, isSmartEmail)),
      children: [/*#__PURE__*/jsx(Text, {
        weight: "bold",
        size: shouldShowVisibilityFilters ? 's' : 'l',
        children: t('playbook.segmentationFilter.segmentation')
      }), /*#__PURE__*/jsx(IconButton, {
        name: "settings",
        color: "purple",
        onClick: function onClick() {
          return window.open("".concat(baseUrls["development"], "/app/playbook/messaging-segmentation"), '_blank');
        }
      })]
    }), isSalesEnabled && !isNoStatusPlanAccount && /*#__PURE__*/jsx(StageSelector, {}), [{
      stage: TemplateStage.Prospecting,
      key: 'playbook.segmentationFilter.prospect'
    }, {
      stage: TemplateStage.Sales,
      key: 'playbook.segmentationFilter.sales'
    }].map(function (_ref3) {
      var _segmentationFields$s, _segmentationFields$s2;
      var stage = _ref3.stage,
        key = _ref3.key;
      return (segmentationFields === null || segmentationFields === void 0 ? void 0 : (_segmentationFields$s = segmentationFields[stage]) === null || _segmentationFields$s === void 0 ? void 0 : _segmentationFields$s.length) > 0 && /*#__PURE__*/jsxs("div", {
        className: clsx(styles$3.selectorsWrapper, _defineProperty$3({}, styles$3.smartSelectorsWrapper, isSmartEmail)),
        children: [!isNoStatusPlanAccount && /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "purple",
          weight: "bold",
          className: styles$3.segmentationTitle,
          children: t(key)
        }), segmentationFields === null || segmentationFields === void 0 ? void 0 : (_segmentationFields$s2 = segmentationFields[stage]) === null || _segmentationFields$s2 === void 0 ? void 0 : _segmentationFields$s2.map(function (segmentation) {
          return /*#__PURE__*/jsx(CategoryBlock, {
            segmentationField: segmentation,
            selectedValues: selectedSegmentation === null || selectedSegmentation === void 0 ? void 0 : selectedSegmentation[segmentation.id],
            onChange: function onChange(value) {
              return setSelectedSegmentation(_objectSpread$2(_objectSpread$2({}, selectedSegmentation), (value === null || value === void 0 ? void 0 : value.length) > 0 ? _defineProperty$3({}, segmentation.id, value) : {}));
            }
          }, segmentation.id);
        })]
      }, stage);
    })]
  });
};
var SegmentationFilter = withProvider(SegmentationFiltersView);

function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }
function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$3(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
var useSnippets = function useSnippets(bodyPlugins) {
  var _useSWR = useSWR('/messaging/messagingTemplates/snippets', function (url) {
      return api.get(url).then(function (_ref) {
        var data = _ref.data;
        return parseSnippets(data);
      });
    }, {
      revalidateOnFocus: true
    }),
    snippets = _useSWR.data,
    mutate = _useSWR.mutate;
  function parseSnippets(snippets) {
    if (!snippets) return [];
    return Object.entries(snippets).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray$3(_ref2, 2);
        _ref3[0];
        var _ref3$ = _ref3[1],
        id = _ref3$.id,
        content = _ref3$.content,
        shortcut = _ref3$.shortcut,
        format = _ref3$.format;
      acc.push({
        key: id,
        text: shortcut,
        data: JSON.parse(JSON.stringify(deserialize(content, {
          format: format,
          plugins: bodyPlugins
        })))
      });
      return acc;
    }, []);
  }
  return {
    snippets: snippets,
    mutate: mutate
  };
};

var css_248z$2 = "::-webkit-scrollbar-thumb {\n  outline: 1px solid var(--verySoftPeanut);\n  border-radius: 3px;\n  background-color: var(--verySoftPeanut);\n}\n\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n  cursor: pointer !important;\n}\n\n.handleTemplateModal-module__container__Sn2OF {\n  background-color: white;\n  overflow-y: auto;\n  padding: 24px 64px;\n}\n\n.handleTemplateModal-module__modal_body_container__02PPI {\n  display: flex;\n  flex: 1;\n  background-color: white;\n  max-height: calc(64vh + 90px);\n  min-height: calc(64vh + 90px);\n}\n\n.handleTemplateModal-module__form_container__w-p9E {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.handleTemplateModal-module__editor__container__zNpgf {\n  background-color: white;\n  border-radius: 4px;\n}\n\n.handleTemplateModal-module__editor__container__zNpgf > div > section {\n  align-items: center;\n}\n\n.handleTemplateModal-module__editor__container_ast__JTLMq {\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n}\n\n.handleTemplateModal-module__subject__container__vg3xe {\n  margin: 6px 0;\n}\n\n.handleTemplateModal-module__subject__container_ast__JIRYc {\n  display: flex;\n  margin: 16px 0 8px 0;\n  background: white;\n  border: 1px solid #94a5b4;\n  border-radius: 4px;\n}\n\n.handleTemplateModal-module__to__container__GxuzN {\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.handleTemplateModal-module__to__input__container__4OEBn {\n  width: 100%;\n  margin-left: 16px;\n}\n\n.handleTemplateModal-module__tag__ggoos {\n  width: 44px;\n}\n\n.handleTemplateModal-module__actions__container__kkJBQ {\n  width: calc(100% - 24px);\n  border-top: 1px solid var(--lightestBloobirds);\n  height: 40px;\n  display: flex;\n  padding: 0 12px;\n}\n\n.handleTemplateModal-module__attachments__container__8-5rU {\n  display: flex;\n  margin: 2px 16px 0;\n  padding: 8px 0;\n  border-top: 1px solid var(--lightestBloobirds);\n}\n\n.handleTemplateModal-module__errors_container__mtUP8 {\n  width: 100%;\n  margin: 8px 20px;\n}\n\n.handleTemplateModal-module__header__container__sG2ky {\n  width: 100%;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  padding: 0 24px;\n  box-sizing: border-box;\n  /*background-color: var(--veryLightBloobirds);*/\n  background-color: var(--verySoftPurple);\n}\n\n.handleTemplateModal-module__header__info__ZPFJB {\n  display: flex;\n  align-items: center;\n  flex-grow: 1;\n}\n\n.handleTemplateModal-module__header__info__ZPFJB button {\n  margin-right: 8px;\n}\n\n.handleTemplateModal-module__header_companyName__iRaFg {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding-right: 12px;\n  margin-right: 12px;\n  height: 24px;\n  /*border-right: 1px solid var(--verySoftBloobirds);*/\n}\n\n.handleTemplateModal-module__footer__6r-bB {\n  background-color: var(--white);\n}\n\n.handleTemplateModal-module_footerActions__VhH-V {\n  background-color: var(--white);\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  padding: 0 16px;\n  height: 90px;\n}\n\n.handleTemplateModal-module_footerButtons__i-Vvh {\n  display: flex;\n  gap: 16px;\n}\n\n.handleTemplateModal-module_inputControls__twtXS {\n  margin-left: auto;\n}\n\n.handleTemplateModal-module_emailSelector__Ya4AT {\n  max-width: 85%;\n}\n\n.handleTemplateModal-module_emailSelector__Ya4AT input {\n  box-shadow: none;\n  border: none;\n}\n\n.handleTemplateModal-module_disabledOverlay__nTpQi {\n  position: absolute;\n  background-color: white;\n  opacity: 0.35;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 {\n  display: flex;\n  width: 100%;\n  --artdeco-reset-forms-input-padding: initial;\n  --artdeco-reset-form-position-relative: initial;\n  --artdeco-reset-form-vertical-align-middle: initial;\n  --artdeco-reset-form-display-block: initial;\n  --artdeco-reset-form-black-90: initial;\n  --artdeco-reset-form-label-margin: initial;\n  --artdeco-reset-form-label-opacity: initial;\n  --artdeco-reset-form-webkit-appearance-textfield: initial;\n  --artdeco-reset-form-webkit-appearance-none: initial;\n  --artdeco-reset-form-height-auto: initial;\n  --artdeco-reset-form-padding-top-point-seven-rem: initial;\n  --artdeco-reset-form-rc-pointer-events: initial;\n  --artdeco-reset-form-rc-opacity: initial;\n  --artdeco-reset-form-rc-margin: initial;\n  --artdeco-reset-form-rc-position: initial;\n  --artdeco-reset-form-rc-before-after-content: initial;\n  --artdeco-reset-checkbox-rc-after-content: initial;\n  --artdeco-reset-form-rc-label-display-block: initial;\n  --artdeco-reset-form-rc-label-line-height-2-rem: initial;\n  --artdeco-reset-form-rc-label-margin-bottom-zero: initial;\n  --artdeco-reset-form-rc-label-padding-zero: initial;\n  --artdeco-reset-form-rc-label-position-relative: initial;\n  --artdeco-reset-form-rc-label-padding-left-2point8-rem: initial;\n  --artdeco-reset-forms-input-transition-duration: initial;\n  --artdeco-reset-forms-input-transition-property: initial;\n  --artdeco-reset-forms-input-box-shadow: initial;\n  --artdeco-reset-forms-input-border-radius: 4px;\n  --artdeco-reset-forms-input-border: initial;\n  --artdeco-reset-forms-input-width: initial;\n  --artdeco-reset-forms-input-height: initial;\n  --artdeco-reset-forms-input-box-sizing: border-box;\n  --artdeco-reset-forms-input-background-color: initial;\n  --artdeco-reset-forms-input-color: initial;\n  --artdeco-reset-forms-input-placeholder-color: var(--softPeanut);\n  --artdeco-reset-forms-input-blue: initial;\n  --artdeco-reset-forms-input-focus-box-shadow: initial;\n  --artdeco-reset-forms-input-disabled-hover-border-color: initial;\n  --artdeco-reset-forms-input-disabled-opacity: initial;\n  --artdeco-reset-forms-input-error: initial;\n  --artdeco-reset-forms-font-weight: initial;\n  --artdeco-reset-forms-font-size: initial;\n  --artdeco-reset-forms-line-height: initial;\n  --artdeco-reset-forms-select-appearance-none: initial;\n  --artdeco-reset-forms-select-box-shadow-none: initial;\n  --artdeco-reset-forms-select-outline-zero: initial;\n  --artdeco-reset-forms-select-height-3point2-rem: initial;\n  --artdeco-reset-forms-select-background-transparent: initial;\n  --artdeco-reset-forms-select-position-relative: initial;\n  --artdeco-reset-forms-select-zindex-two: initial;\n  --artdeco-reset-forms-select-background-image: initial;\n  --artdeco-reset-forms-select-border-box: initial;\n  --artdeco-reset-forms-select-border-zero: initial;\n  --artdeco-reset-forms-select-width-100-percent: initial;\n  --artdeco-reset-forms-select-border-radius-point2rem: initial;\n  --artdeco-reset-forms-select-border: initial;\n  --artdeco-reset-forms-select-padding: initial;\n  --artdeco-reset-forms-select-transition: initial;\n  --artdeco-reset-forms-select-disabled-opacity: initial;\n  --artdeco-reset-forms-select-hover-border-color: initial;\n  --artdeco-reset-forms-select-focus-border-color: initial;\n  --artdeco-reset-forms-select-focus-box-shadow: initial;\n  --artdeco-reset-base-margin-zero: initial;\n  --artdeco-reset-base-padding-zero: initial;\n  --artdeco-reset-base-border-zero: initial;\n  --artdeco-reset-base-font-size-hundred-percent: initial;\n  --artdeco-reset-base-font-weight-bold: initial;\n  --artdeco-reset-base-font-style-italic: initial;\n  --artdeco-reset-base-outline-zero: initial;\n  --artdeco-reset-base-outline-none: initial;\n  --artdeco-reset-base-line-height-one: initial;\n  --artdeco-reset-base-display-block: initial;\n  --artdeco-reset-base-list-style-none: initial;\n  --artdeco-reset-base-quotes-none: initial;\n  --artdeco-reset-base-vertical-align-baseline: initial;\n  --artdeco-reset-base-vertical-align-middle: initial;\n  --artdeco-reset-base-background-transparent: initial;\n  --artdeco-reset-base-opacity-zero: initial;\n  --artdeco-reset-base-top-zero: initial;\n  --artdeco-reset-base-position-absolute: initial;\n  --artdeco-reset-base-text-decoration-none: initial;\n  --artdeco-reset-base-text-decoration-line-through: initial;\n  --artdeco-reset-base-border-collapse-collapse: initial;\n  --artdeco-reset-base-get-color-black: initial;\n  --artdeco-reset-base-background-color-ff9: initial;\n  --artdeco-reset-base-border-spacing-zero: initial;\n  --artdeco-reset-base-cursor-help: initial;\n  --artdeco-reset-base-content-none: initial;\n  --artdeco-reset-base-left-minus-hundred-px: initial;\n  --artdeco-reset-base-border-thickness-1-px: initial;\n  --artdeco-reset-base-border-style-dotted: initial;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 * {\n  box-sizing: border-box;\n}\n\n/* Linkedin overrides */\n.handleTemplateModal-module_modal_email_container__xcoV1 input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  border: none !important;\n  width: 100%;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 input::-moz-placeholder {\n  color: transparent !important;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 input::placeholder {\n  color: transparent !important;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 input:focus {\n  outline: none !important;\n  background-color: transparent;\n}\n\n.handleTemplateModal-module_modal_email_container__xcoV1 label {\n  margin: 0 !important;\n}\n\n.handleTemplateModal-module_show_preview_wrapper__OOZ1B {\n  width: 100%;\n  height: inherit;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding-right: 24px;\n}\n\n.handleTemplateModal-module__header_icons__rryrI {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.handleTemplateModal-module__header_callout_preview__A0tND {\n  height: 40px;\n}\n\n.handleTemplateModal-module_container_email__Epp4O {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.handleTemplateModal-module_formRow__CiauS {\n  display: flex;\n  position: relative;\n  align-items: center;\n  padding: 10px 21px;\n  min-height: 44px;\n  box-sizing: border-box;\n  border-bottom: 1px solid var(--lightestBloobirds);\n}\n\n.handleTemplateModal-module_formRow__CiauS > *:first-child {\n  width: 56px;\n  margin-right: 12px;\n}\n\n.handleTemplateModal-module__annex_wrapper__MuxJF {\n  box-sizing: border-box;\n  background-color: white;\n  border-left: 1px solid var(--lightestBloobirds);\n  width: 424px;\n  display: flex;\n  flex-direction: column;\n  padding: 24px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n";
var styles$2 = {"_container":"handleTemplateModal-module__container__Sn2OF","_modal_body_container":"handleTemplateModal-module__modal_body_container__02PPI","_form_container":"handleTemplateModal-module__form_container__w-p9E","_editor__container":"handleTemplateModal-module__editor__container__zNpgf","_editor__container_ast":"handleTemplateModal-module__editor__container_ast__JTLMq","_subject__container":"handleTemplateModal-module__subject__container__vg3xe","_subject__container_ast":"handleTemplateModal-module__subject__container_ast__JIRYc","_to__container":"handleTemplateModal-module__to__container__GxuzN","_to__input__container":"handleTemplateModal-module__to__input__container__4OEBn","_tag":"handleTemplateModal-module__tag__ggoos","_actions__container":"handleTemplateModal-module__actions__container__kkJBQ","_attachments__container":"handleTemplateModal-module__attachments__container__8-5rU","_errors_container":"handleTemplateModal-module__errors_container__mtUP8","_header__container":"handleTemplateModal-module__header__container__sG2ky","_header__info":"handleTemplateModal-module__header__info__ZPFJB","_header_companyName":"handleTemplateModal-module__header_companyName__iRaFg","_footer":"handleTemplateModal-module__footer__6r-bB","footerActions":"handleTemplateModal-module_footerActions__VhH-V","footerButtons":"handleTemplateModal-module_footerButtons__i-Vvh","inputControls":"handleTemplateModal-module_inputControls__twtXS","emailSelector":"handleTemplateModal-module_emailSelector__Ya4AT","disabledOverlay":"handleTemplateModal-module_disabledOverlay__nTpQi","modal_email_container":"handleTemplateModal-module_modal_email_container__xcoV1","show_preview_wrapper":"handleTemplateModal-module_show_preview_wrapper__OOZ1B","_header_icons":"handleTemplateModal-module__header_icons__rryrI","_header_callout_preview":"handleTemplateModal-module__header_callout_preview__A0tND","container_email":"handleTemplateModal-module_container_email__Epp4O","formRow":"handleTemplateModal-module_formRow__CiauS","_annex_wrapper":"handleTemplateModal-module__annex_wrapper__MuxJF"};
styleInject(css_248z$2);

var css_248z$1 = ".attachment-module_list__-tqCk {\n  display: -webkit-inline-box;\n  padding: 7px;\n  gap: 12px;\n  border-top: 1px solid var(--lightestBloobirds);\n  border-bottom: 1px solid var(--lightestBloobirds);\n  min-width: 0;\n  overflow: scroll;\n  max-width: 690px;\n  width: 100%;\n}\n";
var styles$1 = {"list":"attachment-module_list__-tqCk"};
styleInject(css_248z$1);

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$2(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
var AttachmentLink = function AttachmentLink(_ref2) {
  var file = _ref2.file,
    onDelete = _ref2.onDelete;
  var link = file.link,
    title = file.title;
    file.type;
  var _useState = useState(false),
    _useState2 = _slicedToArray$2(_useState, 2),
    isHover = _useState2[0],
    setIsHover = _useState2[1];
  return /*#__PURE__*/jsx(Tooltip, {
    title: link,
    position: "top",
    children: /*#__PURE__*/jsxs("div", {
      className: styles$1._attachment_box,
      onMouseEnter: function onMouseEnter() {
        return setIsHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHover(false);
      },
      children: [/*#__PURE__*/jsx(Icon, {
        name: 'link',
        size: 18,
        color: isHover ? 'bloobirds' : 'softPeanut'
      }), /*#__PURE__*/jsx("div", {
        onClick: function onClick() {
          return window.open(addHttpIfNeeded(link), '_blank');
        },
        children: /*#__PURE__*/jsx(Text, {
          color: isHover ? 'bloobirds' : 'softPeanut',
          decoration: isHover ? 'underline' : 'none',
          ellipsis: 20,
          size: "xs",
          children: title
        })
      }), /*#__PURE__*/jsx(IconButton, {
        name: "cross",
        onClick: onDelete,
        size: 18,
        color: isHover ? 'softTomato' : 'lightestGray'
      })]
    })
  });
};
function AttachmentLinkList(_ref4) {
  var files = _ref4.files,
    onDelete = _ref4.onDelete;
  var listClasses = clsx(styles$1.list, _defineProperty$2({}, styles$1.wrappedList, (files === null || files === void 0 ? void 0 : files.length) > 5));
  return /*#__PURE__*/jsx("div", {
    className: listClasses,
    role: "list",
    children: files.map(function (file) {
      return /*#__PURE__*/jsx(AttachmentLink, {
        file: file,
        onDelete: typeof onDelete === 'function' ? function () {
          return onDelete(file);
        } : null
      }, file.title);
    })
  });
}

var HandleTemplateModalFooter = function HandleTemplateModalFooter(_ref) {
  var attachedFiles = _ref.attachedFiles,
    removeAttachedFile = _ref.removeAttachedFile,
    attachedLinks = _ref.attachedLinks,
    removeAttachedLink = _ref.removeAttachedLink,
    isSubmitting = _ref.isSubmitting,
    isEditing = _ref.isEditing,
    openConfirmationModal = _ref.openConfirmationModal;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.handleTemplate'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsxs("div", {
    children: [(attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0 && /*#__PURE__*/jsx(AttachmentList, {
      files: attachedFiles,
      onDelete: removeAttachedFile
    }), (attachedLinks === null || attachedLinks === void 0 ? void 0 : attachedLinks.length) > 0 && /*#__PURE__*/jsx(AttachmentLinkList, {
      files: attachedLinks,
      onDelete: removeAttachedLink
    }), /*#__PURE__*/jsxs("div", {
      className: styles$2.footerActions,
      children: [/*#__PURE__*/jsx("span", {
        "data-intercom": "send-email-modal-action-cancel",
        children: /*#__PURE__*/jsx(Button, {
          variant: "clear",
          color: isSubmitting ? undefined : 'tomato',
          onClick: function onClick() {
            return openConfirmationModal(isEditing ? 'Delete' : 'Discard');
          },
          disabled: isSubmitting,
          children: isEditing ? t('deleteTemplate') : t('discardTemplate')
        })
      }), /*#__PURE__*/jsxs("div", {
        className: styles$2.footerButtons,
        children: [isEditing && /*#__PURE__*/jsx(Button, {
          variant: "secondary",
          iconLeft: "clock",
          onClick: function onClick() {
            return openConfirmationModal('Discard');
          },
          color: "purple",
          children: t('discardChanges')
        }), /*#__PURE__*/jsx(Button, {
          onClick: function onClick() {
            return openConfirmationModal('Save');
          },
          variant: "primary",
          iconLeft: 'save',
          color: "purple",
          children: t('saveTemplate')
        })]
      })]
    })]
  });
};

var css_248z = ".templateModalForm-module_form__ea6rV {\n}\n\n.templateModalForm-module_bodyContainer__Y403A {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  align-items: center;\n  min-height: 0;\n  flex: 1;\n  box-sizing: border-box;\n}\n\n.templateModalForm-module_bodyContainer__Y403A > div:first-child {\n  border-top: var(--verySoftPurple) 1px solid;\n}\n\n.templateModalForm-module_bodyContainer__Y403A > div {\n  border-bottom: 0;\n}\n\n.templateModalForm-module_editorToolbar__o7CjY {\n  width: 100%;\n  background-color: #0c1ba4aa;\n  margin-top: -1px;\n  z-index: 99999;\n}\n\n.templateModalForm-module_toolbarRight__kvI1P {\n  width: 100%;\n  height: inherit;\n}\n\n.templateModalForm-module__editor__container_ast__O6MuS {\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n  height: 100%;\n}\n";
var styles = {"form":"templateModalForm-module_form__ea6rV","bodyContainer":"templateModalForm-module_bodyContainer__Y403A","editorToolbar":"templateModalForm-module_editorToolbar__o7CjY","toolbarRight":"templateModalForm-module_toolbarRight__kvI1P","_editor__container_ast":"templateModalForm-module__editor__container_ast__O6MuS"};
styleInject(css_248z);

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function updateEditor(editor, value, plugins) {
  if (editor) {
    resetEditorChildren(editor);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        console.log('❌ Error parsing value', e);
        if (isHtml(value)) {
          var parsedNodes = deserialize(stringToHTML(value), {
            format: 'HTML',
            plugins: plugins
          });
          value = parsedNodes.map(function (node) {
            return {
              type: 'p',
              children: [node]
            };
          });
        } else {
          value = [{
            type: 'p',
            children: [{
              text: value
            }]
          }];
        }
      }

      // @ts-ignore
      insertElements(editor, value, {
        at: [0]
      });
    }
  }
}
function TemplateModalForm(_ref) {
  var _editorsRef$current3;
  var template = _ref.template,
    uploadAttachedFile = _ref.uploadAttachedFile;
  var _useFormContext = useFormContext(),
    control = _useFormContext.control;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook.templateForm'
    }),
    t = _useTranslation.t;
  var _useState = useState(null),
    _useState2 = _slicedToArray$1(_useState, 2),
    contentEditor = _useState2[0],
    setContentEditor = _useState2[1];
  var _useController = useController({
      name: 'content',
      control: control
    }),
    contentField = _useController.field;
  var bodyPlugins = useRichTextEditorPlugins({
    templateVariables: true,
    rawHTMLBlock: true
  });
  useEffect(function () {
    updateEditor(contentEditor, contentField.value || template.content, bodyPlugins);
  }, [template.content, contentEditor]);
  var showAttachmentSection = template.type !== TEMPLATE_TYPES.SNIPPET;
  var showMeetingLinksAndAttachments = template.type === TEMPLATE_TYPES.EMAIL;
  var showImages = [TEMPLATE_TYPES.EMAIL, TEMPLATE_TYPES.PITCH].includes(template.type);
  var showVariables = [TEMPLATE_TYPES.EMAIL, TEMPLATE_TYPES.LINKEDIN, TEMPLATE_TYPES.WHATSAPP].includes(template.type);
  var _useFormContext2 = useFormContext(),
    isDirty = _useFormContext2.formState.isDirty;
  var singleLinePlugins = useRichTextEditorPlugins({
    templateVariables: true,
    marks: false,
    elements: false,
    images: false,
    autoReplace: false,
    singleLine: true,
    replaceParagraphs: true
  });
  var _useState3 = useState(false),
    _useState4 = _slicedToArray$1(_useState3, 2),
    haveEditorsBeenStored = _useState4[0],
    setHaveEditorsBeenStored = _useState4[1];
  var editorsRef = useRef();
  var focusedEditorRef = useRef(0);
  function updateIndex(count, length) {
    return count === length - 1 ? 0 : count + 1;
  }
  function storeEditorRef(editor) {
    var _editorsRef$current;
    //editor has already been stored to Ref
    if (haveEditorsBeenStored || editorsRef !== null && editorsRef !== void 0 && (_editorsRef$current = editorsRef.current) !== null && _editorsRef$current !== void 0 && _editorsRef$current.some(function (storedEditor) {
      return (storedEditor === null || storedEditor === void 0 ? void 0 : storedEditor.id) === editor.id;
    })) return;

    // fix to insert the input identifier in the correct position
    if (editor.id === 'shortcutInput') {
      var newArray = _toConsumableArray(editorsRef.current || []);
      newArray.splice(1, 0, editor);
      editorsRef.current = newArray;
      return;
    }
    editorsRef.current = [].concat(_toConsumableArray(editorsRef.current || []), [editor]);
  }
  useEffect(function () {
    var _editorsRef$current2;
    if ((editorsRef === null || editorsRef === void 0 ? void 0 : (_editorsRef$current2 = editorsRef.current) === null || _editorsRef$current2 === void 0 ? void 0 : _editorsRef$current2.length) === ([TEMPLATE_TYPES.EMAIL, TEMPLATE_TYPES.SNIPPET].includes(template.type) ? 3 : 2)) {
      setHaveEditorsBeenStored(true);
    }
  }, [editorsRef === null || editorsRef === void 0 ? void 0 : (_editorsRef$current3 = editorsRef.current) === null || _editorsRef$current3 === void 0 ? void 0 : _editorsRef$current3.length]);
  var updateFocusedIndex = function updateFocusedIndex() {
    var _editorsRef$current4;
    focusedEditorRef.current = updateIndex(focusedEditorRef.current, editorsRef === null || editorsRef === void 0 ? void 0 : (_editorsRef$current4 = editorsRef.current) === null || _editorsRef$current4 === void 0 ? void 0 : _editorsRef$current4.length);
  };
  function handleEvent(e) {
    if (e.key === 'Tab') {
      updateFocusedIndex();
      e.stopPropagation();
      var focusedEditor = editorsRef.current[focusedEditorRef.current];
      if ((focusedEditor === null || focusedEditor === void 0 ? void 0 : focusedEditor.id) === 'shortcutInput') {
        var shortcutInput = document.getElementById('shortcutInput');
        setTimeout(function () {
          var _shortcutInput$value, _shortcutInput$value2;
          shortcutInput === null || shortcutInput === void 0 ? void 0 : shortcutInput.focus();
          shortcutInput === null || shortcutInput === void 0 ? void 0 : shortcutInput.setSelectionRange(shortcutInput === null || shortcutInput === void 0 ? void 0 : (_shortcutInput$value = shortcutInput.value) === null || _shortcutInput$value === void 0 ? void 0 : _shortcutInput$value.length, shortcutInput === null || shortcutInput === void 0 ? void 0 : (_shortcutInput$value2 = shortcutInput.value) === null || _shortcutInput$value2 === void 0 ? void 0 : _shortcutInput$value2.length);
        }, 20);
      } else {
        var focusPoint = Editor.end(focusedEditor, []);
        setTimeout(function () {
          return focusEditor(focusedEditor, focusPoint);
        }, 0);
      }
    }
  }
  var memoedFunction = useCallback(handleEvent, [haveEditorsBeenStored]);
  useEffect(function () {
    if (!haveEditorsBeenStored) return;
    window.addEventListener('keydown', memoedFunction);
    return function () {
      window.removeEventListener('keydown', memoedFunction);
    };
  }, [haveEditorsBeenStored]);
  var setElements = function setElements(templateFieldValue, templateValue, editor) {
    var paragraph = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (editor && !!(isDirty && templateFieldValue ? templateFieldValue : templateValue)) {
      var toJson = function toJson(e) {
        return typeof e === 'string' ? JSON.parse(e) : e;
      };
      var parseValue = function parseValue(e) {
        return paragraph ? createParagraph(e) : toJson(e);
      };
      var value = isDirty && templateFieldValue ? templateFieldValue : parseValue(templateValue);
      resetEditorChildren(editor);
      insertElements(editor, value, {
        at: [0]
      });
    }
  };
  return /*#__PURE__*/jsxs(TemplateFormContext.Provider, {
    value: {
      template: template,
      setElements: setElements,
      plugins: singleLinePlugins,
      storeEditorRef: storeEditorRef,
      focusedRef: focusedEditorRef
    },
    children: [/*#__PURE__*/jsxs("div", {
      className: styles.form,
      children: [/*#__PURE__*/jsx(NameFormEditor, {
        isTemplateModal: true
      }), /*#__PURE__*/jsx(TemplateFormFieldsByType, {
        isTemplateModal: true
      })]
    }), /*#__PURE__*/jsx("div", {
      className: styles.bodyContainer,
      "data-intercom": "send-email-modal-body",
      onClick: function onClick() {
        return focusedEditorRef.current = 2;
      },
      children: /*#__PURE__*/jsx(RichTextEditor, _objectSpread$1(_objectSpread$1({
        id: "bodyEditor",
        placeholder: t('enterBodyPlaceholder'),
        plugins: bodyPlugins,
        style: {
          padding: '16px 21px'
        },
        setEditor: function setEditor(editor) {
          storeEditorRef(editor);
          setContentEditor(editor);
        }
        /* snippets={hasSnippetsEnabled && snippets}*/
      }, contentField), {}, {
        children: function children(editor) {
          return /*#__PURE__*/jsxs(Fragment, {
            children: [/*#__PURE__*/jsx("div", {
              className: styles.editorToolbar,
              children: /*#__PURE__*/jsxs(EditorToolbar, {
                backgroundColor: "transparent",
                children: [/*#__PURE__*/jsx(EditorToolbarControlsSection, {}), /*#__PURE__*/jsx(EditorToolbarFontStylesSection, {
                  enableChangeSize: true
                }), /*#__PURE__*/jsx(EditorToolbarTextMarksSection, {
                  color: "white",
                  enableChangeColor: true
                }), /*#__PURE__*/jsx(EditorToolbarListsSection, {}), showAttachmentSection && /*#__PURE__*/jsxs(EditorToolbarSection, {
                  children: [showMeetingLinksAndAttachments && /*#__PURE__*/jsxs(Fragment, {
                    children: [/*#__PURE__*/jsx(TemplateEditorToolbarMeetingLink, {}), /*#__PURE__*/jsx(EditorToolbarFileAttachment, {
                      onAttachment: uploadAttachedFile
                    })]
                  }), showImages && /*#__PURE__*/jsx(EditorToolbarImage, {}), showVariables && /*#__PURE__*/jsx(EditorToolbarTemplateVariable, {})]
                })]
              })
            }), /*#__PURE__*/jsx("div", {
              className: styles._editor__container_ast,
              children: editor
            })]
          });
        }
      }))
    })]
  });
}

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TemplateDisplayInfo = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, TEMPLATE_TYPES.EMAIL, {
  key: 'emailTemplate',
  icon: 'mail',
  hasBattleCard: false
}), TEMPLATE_TYPES.PITCH, {
  key: 'pitchTemplate',
  icon: 'chat',
  hasBattleCard: true
}), TEMPLATE_TYPES.SNIPPET, {
  key: 'snippetTemplate',
  icon: 'snippet',
  hasBattleCard: true
}), TEMPLATE_TYPES.LINKEDIN, {
  key: 'linkedinTemplate',
  icon: 'linkedin',
  hasBattleCard: false
}), TEMPLATE_TYPES.WHATSAPP, {
  key: 'whatsappTemplate',
  icon: 'whatsapp',
  hasBattleCard: false
});
var HandleTemplateModal = function HandleTemplateModal(_ref) {
  var _t;
  var handleClose = _ref.handleClose,
    template = _ref.template,
    contextValues = _ref.contextValues;
  var isEditing = !!(template !== null && template !== void 0 && template.id);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSubmitting = _useState2[0],
    setIsSubmitting = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    openConfirmModalMode = _useState4[0],
    setOpenConfirmModalMode = _useState4[1];
  var _useCadencesUsingTemp = useCadencesUsingTemplate(template === null || template === void 0 ? void 0 : template.id),
    cadencesUsingTemplate = _useCadencesUsingTemp.cadencesUsingTemplate;
  var defaultStage = useMemo(function () {
    if (isEditing) {
      return contextValues.stage === 'PROSPECTING' ? {
        stage: TemplateStage.Prospecting
      } : contextValues;
    } else {
      return {
        stage: TemplateStage.All
      };
    }
  }, [template === null || template === void 0 ? void 0 : template.id, contextValues === null || contextValues === void 0 ? void 0 : contextValues.stage]);
  var defaultValues = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultTemplate), defaultStage), template), {}, {
    segmentationValues: parseSegmentationValues(template === null || template === void 0 ? void 0 : template.segmentationValues, template === null || template === void 0 ? void 0 : template.stage)
  });
  var _useAttachedFiles = useAttachedFiles(),
    attachedFiles = _useAttachedFiles.attachedFiles,
    removeAttachedFile = _useAttachedFiles.removeAttachedFile,
    uploadAttachedFile = _useAttachedFiles.uploadAttachedFile;
  var _useAttachedLinks = useAttachedLinks(),
    attachedLinks = _useAttachedLinks.attachedLinks,
    removeAttachedLink = _useAttachedLinks.removeAttachedLink;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'playbook'
    }),
    t = _useTranslation.t;
  var modalInfo = TemplateDisplayInfo[template === null || template === void 0 ? void 0 : template.type];
  var formMethods = useForm({
    defaultValues: defaultValues
  });
  var handleSubmit = formMethods.handleSubmit,
    isDirty = formMethods.formState.isDirty;
  var _useSnippets = useSnippets(),
    mutateSnippets = _useSnippets.mutate;
  var _useMessagingTemplate = useMessagingTemplate(template === null || template === void 0 ? void 0 : template.id),
    deleteMessagingTemplate = _useMessagingTemplate.deleteMessagingTemplate,
    saveMessagingTemplate = _useMessagingTemplate.saveMessagingTemplate;
  var _useUserHelpers = useUserHelpers(),
    has = _useUserHelpers.has,
    save = _useUserHelpers.save,
    saveCustom = _useUserHelpers.saveCustom;
  var saveHelpers = function saveHelpers(type) {
    if (type === TEMPLATE_TYPES.SNIPPET && !has(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP)) {
      save(ExtensionHelperKeys.PLAYBOOK_SNIPPETS_TOOLTIP);
    }
    if (!has(UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP)) {
      saveCustom({
        key: UserHelperTooltipsKeys.BLANK_EMAIL_TOOLTIP,
        data: new Date().toISOString()
      });
    }
  };
  function onSubmit(_x2) {
    return _onSubmit.apply(this, arguments);
  }
  function _onSubmit() {
    _onSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      var _data$name$0$children, _template$type;
      var newMessagingTemplate, _template$type2, res, _contextValues$onSave;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSubmitting(true);
            newMessagingTemplate = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, data), isEditing ? {
              id: template === null || template === void 0 ? void 0 : template.id
            } : {}), {}, {
              name: (_data$name$0$children = data.name[0].children) === null || _data$name$0$children === void 0 ? void 0 : _data$name$0$children[0].text,
              subject: data.subject ? JSON.stringify(data.subject) : ''
            }, data.shortcut ? {
              shortcut: data.shortcut
            } : {}), {}, {
              content: data.content ? JSON.stringify(data.content) : '',
              segmentationValues: getSegmentationValuesToSendToDB(data.segmentationValues, data.stage),
              visibility: data.visibility,
              type: (_template$type = template === null || template === void 0 ? void 0 : template.type) !== null && _template$type !== void 0 ? _template$type : TEMPLATE_TYPES.EMAIL,
              format: 'AST',
              mediaFileIds: (attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) > 0 ? attachedFiles.map(function (file) {
                return file.id;
              }) : []
            });
            if (!isEditing) {
              saveHelpers((_template$type2 = template === null || template === void 0 ? void 0 : template.type) !== null && _template$type2 !== void 0 ? _template$type2 : TEMPLATE_TYPES.EMAIL);
            }
            _context.next = 5;
            return saveMessagingTemplate(newMessagingTemplate);
          case 5:
            res = _context.sent;
            setIsSubmitting(false);
            if (res === 409) {
              createToast({
                type: 'error',
                message: t('handleTemplate.toasts.nameAlreadyExists')
              });
            } else {
              createToast({
                type: 'success',
                message: t('handleTemplate.toasts.success')
              });
              window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
              if ((template === null || template === void 0 ? void 0 : template.type) === TEMPLATE_TYPES.SNIPPET) {
                mutateSnippets();
              }
              contextValues === null || contextValues === void 0 ? void 0 : (_contextValues$onSave = contextValues.onSaveCallback) === null || _contextValues$onSave === void 0 ? void 0 : _contextValues$onSave.call(contextValues);
              handleClose();
            }
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _onSubmit.apply(this, arguments);
  }
  var handleDelete = function handleDelete() {
    deleteMessagingTemplate(template === null || template === void 0 ? void 0 : template.id).then(function (res) {
      var _contextValues$onDele;
      if (res.status === 200) {
        createToast({
          type: 'success',
          message: t('handleTemplate.toasts.deleteSuccess')
        });
        if ((template === null || template === void 0 ? void 0 : template.type) === TEMPLATE_TYPES.SNIPPET) mutateSnippets();
      } else {
        console.error(res);
      }
      window.dispatchEvent(new CustomEvent('PLAYBOOK_FEED'));
      contextValues === null || contextValues === void 0 ? void 0 : (_contextValues$onDele = contextValues.onDeleteCallback) === null || _contextValues$onDele === void 0 ? void 0 : _contextValues$onDele.call(contextValues);
    });
  };
  var handleConfirm = function handleConfirm() {
    switch (openConfirmModalMode) {
      case 'Save':
        handleSubmit(function (data) {
          return onSubmit(data);
        }, function (err) {
          return console.log('error', err);
        })();
        break;
      case 'Discard':
        handleClose();
        break;
      case 'Delete':
        handleClose();
        handleDelete();
    }
    setOpenConfirmModalMode('');
  };
  var handleCloseModal = function handleCloseModal() {
    if (isDirty) {
      setOpenConfirmModalMode('Discard');
    } else {
      handleClose();
    }
  };
  return /*#__PURE__*/jsxs(Modal, {
    open: true,
    onClose: handleCloseModal,
    width: 1106,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$2.modal_email_container,
      onMouseEnter: removeScrollOfBox,
      onMouseLeave: recoverScrollOfBox,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$2.container_email,
        children: [/*#__PURE__*/jsxs("div", {
          className: styles$2._header__container,
          children: [/*#__PURE__*/jsx("div", {
            className: styles$2._header__info,
            children: /*#__PURE__*/jsxs("div", {
              className: styles$2._header_companyName,
              children: [/*#__PURE__*/jsx(IconButton, {
                name: modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.icon,
                size: 24,
                color: "purple"
              }), /*#__PURE__*/jsxs(Text, {
                size: "m",
                weight: "regular",
                color: "purple",
                children: [isEditing ? t('templateForm.edit') : t('templateForm.create'), ' ', (_t = t(modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.key)) === null || _t === void 0 ? void 0 : _t.toLowerCase()]
              })]
            })
          }), /*#__PURE__*/jsx("div", {
            className: styles$2._header_icons,
            children: /*#__PURE__*/jsx(IconButton, {
              name: "cross",
              size: 24,
              onClick: handleCloseModal,
              color: "purple"
            })
          })]
        }), /*#__PURE__*/jsx("div", {
          className: styles$2._modal_body_container,
          children: /*#__PURE__*/jsxs(FormProvider, _objectSpread(_objectSpread({}, formMethods), {}, {
            children: [/*#__PURE__*/jsxs("div", {
              className: styles$2._form_container,
              children: [/*#__PURE__*/jsx(TemplateModalForm, {
                template: template,
                uploadAttachedFile: uploadAttachedFile
              }), /*#__PURE__*/jsx("div", {
                className: styles$2._footer,
                children: /*#__PURE__*/jsx(HandleTemplateModalFooter, {
                  attachedFiles: attachedFiles,
                  removeAttachedFile: removeAttachedFile,
                  attachedLinks: attachedLinks,
                  removeAttachedLink: removeAttachedLink,
                  isSubmitting: isSubmitting,
                  isEditing: isEditing,
                  openConfirmationModal: function openConfirmationModal(action) {
                    if (isDirty || action === 'Delete') {
                      setOpenConfirmModalMode(action);
                    } else {
                      handleClose();
                    }
                  }
                })
              })]
            }), /*#__PURE__*/jsxs("div", {
              className: styles$2._annex_wrapper,
              children: [isEditing && /*#__PURE__*/jsxs(Fragment, {
                children: [/*#__PURE__*/jsx(Text, {
                  size: "m",
                  weight: "bold",
                  children: t('templateForm.templateInformation')
                }), /*#__PURE__*/jsx(TemplateInformation, {
                  template: template
                })]
              }), /*#__PURE__*/jsx(Text, {
                size: "m",
                weight: "bold",
                children: t('segmentationFilter.segmentation')
              }), /*#__PURE__*/jsx(SegmentationForm, {
                canBeBattlecard: modalInfo === null || modalInfo === void 0 ? void 0 : modalInfo.hasBattleCard
              })]
            })]
          }))
        })]
      })
    }), /*#__PURE__*/jsx(PlaybookConfirmationModal, {
      openMode: openConfirmModalMode,
      onAccept: handleConfirm,
      onClose: function onClose() {
        return setOpenConfirmModalMode('');
      },
      cadencesUsingTemplate: cadencesUsingTemplate
    })]
  });
};

export { DateInformation, HandleTemplate, HandleTemplateModal, PlaybookConfirmationModal, PlaybookFeed, PlaybookFeedComponent, SegmentationFilter, TemplateDetail, TemplateHeader$1 as TemplateHeader, TemplateInformation, useSnippets };
//# sourceMappingURL=index.js.map
