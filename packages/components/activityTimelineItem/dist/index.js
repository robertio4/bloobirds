import React, { useRef, useState, Fragment as Fragment$1, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useVisible, Dropdown, Tooltip, IconButton, Icon, Text, CardButton, TimelineItem, Checkbox, Button } from '@bloobirds-it/flamingo-ui';
import { useCadences, useIsB2CAccount, useActiveUserSettings, useAiAnalysisEnabled, useUserHelpers } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import { serialize } from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_TYPES_VALUES_LOGIC_ROLE, DIRECTION_VALUES_LOGIC_ROLE, ACTIVITY_DIRECTION, CADENCE_TYPES_VALUES_LOGIC_ROLE, BobjectTypes, ACTIVITY_FIELDS_LOGIC_ROLE, LEAD_FIELDS_LOGIC_ROLE, COMPANY_FIELDS_LOGIC_ROLE, BOUNCED_EMAIL_VALUES_LOGIC_ROLE, OPPORTUNITY_FIELDS_LOGIC_ROLE, MessagesEvents, MIXPANEL_EVENTS, CUSTOM_TASK_LOGIC_ROLE, ExtensionHelperKeys } from '@bloobirds-it/types';
import { removeHtmlTags, isDifferentYearThanCurrent, isToday, getUserTimeZone, toHoursAndMinutes, getTextFromLogicRole, formatDateAsText, getReferencedBobjectFromLogicRole, getFieldByLogicRole, getValueFromLogicRole, getRelatedBobjectTypeName, getReferencedBobject, convertHtmlToString, api, forgeIdFieldsFromIdValue as forgeIdFieldsFromIdValue$1, injectReferencesGetProcess, baseUrls } from '@bloobirds-it/utils';
import clsx from 'clsx';
import { parseISO } from 'date-fns';
import mixpanel from 'mixpanel-browser';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { LightAttachmentItem } from '@bloobirds-it/light-attachment-list';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { AssigneeComponent } from '@bloobirds-it/bobjects';

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function _typeof$6(obj) { "@babel/helpers - typeof"; return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$6(obj); }
var getCadenceActivityText = function getCadenceActivityText(cadenceValueLR, t) {
  switch (cadenceValueLR) {
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.STARTED:
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.CONFIGURE:
    default:
      return t('activityTimelineItem.item.startedCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.RESCHEDULE:
      return t('activityTimelineItem.item.rescheduledCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.STOPPED:
      return t('activityTimelineItem.item.stoppedCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED:
      return t('activityTimelineItem.item.endedCadence');
  }
};
function getSyncName(activityType) {
  switch (activityType) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return 'email';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return 'meeting';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return 'call';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return 'message';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return 'note';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return 'activity';
  }
}
function getActivityTypeColor(activityTypeLogicRole, activityDirection, customTaskIconColor) {
  var isOutgoing = activityDirection === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return isOutgoing ? 'lightestTangerine' : 'tangerine';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return 'lightestMeeting';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return activityDirection === DIRECTION_VALUES_LOGIC_ROLE.MISSED ? 'lightestMeeting' : 'lightestCall';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return 'verySoftBloobirds';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return 'banana';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return 'lightestBanana';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      return 'verySoftPurple';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM:
      return 'verySoftPurple';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return customTaskIconColor;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
      return 'lightPeanut';
  }
}
function getActivitySubject(activity, t, customTaskName) {
  var _activitySubject, _activity$direction;
  var activityTypeLogicRole = activity.activityType;
  var activitySubject = activity.subject;
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      if ((_activitySubject = activitySubject) !== null && _activitySubject !== void 0 && _activitySubject.includes('"type":"p"') && typeof activitySubject === 'string' && _typeof$6(JSON.parse(activitySubject)) === 'object') {
        activitySubject = removeHtmlTags(serialize(activitySubject));
      }
      return activitySubject || t('common.noSubject');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return activity.meetingTitle ? activity.meetingTitle : t('common.meetingArranged');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      //TODO meh
      return t('activityTimelineItem.item.' + ACTIVITY_DIRECTION[(_activity$direction = activity.direction) === null || _activity$direction === void 0 ? void 0 : _activity$direction.split('__').at(-1)] + 'Call');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return activity.body ? t('activityTimelineItem.item.linkedinConversation') : t('activityTimelineItem.item.manuallyLoggedActivity');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      {
        var activityTitle = activity.meetingTitle;
        var activityLeadName = activity.leadName;
        return typeof activityTitle === 'string' ? removeHtmlTags(activityTitle) : activityLeadName ? activityLeadName + ' ' + t('common.note').toLowerCase() : t('common.note');
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return t('activityTimelineItem.item.inboundActivity');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      {
        var activityCadenceStatus = getCadenceActivityText(activity.cadenceType, t);
        return activityCadenceStatus ? activityCadenceStatus : '';
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return customTaskName;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
      {
        var activityStatusUpdate = activity.statusTitle;
        return activityStatusUpdate ? activityStatusUpdate : t('common.statusUpdate');
      }
  }
}
var getBobjectNameProps = function getBobjectNameProps(activity) {
  var opportunityName = activity.opportunityName;
  var activityLeadName = activity.leadName;
  var activityCompanyName = activity.companyName;
  //leadInfo
  var activityEmailMetadata = activity.emailMetadata;
  var activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
  var activityLeadEmail = activity.leadEmail;
  var activityEmailLeads = [];
  if (activityEmailMetadata) {
    var _activityEmailInfo$to, _activityEmailInfo$cc;
    if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$to = activityEmailInfo.to) === null || _activityEmailInfo$to === void 0 ? void 0 : _activityEmailInfo$to.length) > 0) {
      activityEmailInfo.to.map(function (to) {
        if (to.name && to.name !== activityLeadName) activityEmailLeads.push(to.name);else if (to.email && to.email !== activityLeadEmail) activityEmailLeads.push(to.email.split('@')[0]);
      });
    }
    if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$cc = activityEmailInfo.cc) === null || _activityEmailInfo$cc === void 0 ? void 0 : _activityEmailInfo$cc.length) > 0) {
      activityEmailInfo.cc.map(function (cc) {
        if (cc.name && cc.name !== activityLeadName) activityEmailLeads.push(cc.name);else if (cc.email && cc.email !== activityLeadEmail) activityEmailLeads.push(cc.email.split('@')[0]);
      });
    }
  }
  var activityBobjectName = '';
  var activityBobjectType = BobjectTypes.Lead;
  if (activityLeadName) {
    activityBobjectName = activityLeadName;
    if ((activityEmailLeads === null || activityEmailLeads === void 0 ? void 0 : activityEmailLeads.length) > 0) {
      activityBobjectName += ', ' + activityEmailLeads.join(', ');
    }
  } else if ((activityEmailLeads === null || activityEmailLeads === void 0 ? void 0 : activityEmailLeads.length) > 0) {
    activityBobjectName += activityEmailLeads.join(', ');
  } else if (opportunityName) {
    activityBobjectName = opportunityName;
    activityBobjectType = BobjectTypes.Opportunity;
  } else if (activityCompanyName) {
    activityBobjectName = activityCompanyName;
    activityBobjectType = BobjectTypes.Company;
  }
  return {
    activityBobjectName: activityBobjectName,
    activityBobjectType: activityBobjectType
  };
};
function getTimeToShow(activityTime, trans) {
  var t = trans.t,
    i18n = trans.i18n;
  var isDifferentYear = isDifferentYearThanCurrent(activityTime);
  var isThisDay = isToday(activityTime, getUserTimeZone());
  return getI18nSpacetimeLng(i18n === null || i18n === void 0 ? void 0 : i18n.language, new Date(activityTime)).format(isDifferentYear ? t('dates.shortYear') : isThisDay ? '{time-24}' : t('dates.shortMonth'));
}
function forgeIdFieldsFromIdValue(idValue) {
  var _idValue$split = idValue.split('/'),
    _idValue$split2 = _slicedToArray$1(_idValue$split, 3),
    accountId = _idValue$split2[0],
    typeName = _idValue$split2[1],
    objectId = _idValue$split2[2];
  return {
    accountId: accountId,
    typeName: typeName,
    objectId: objectId,
    value: idValue
  };
}

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

var css_248z$2 = ".activityTimelineItem-module_activityHeader__JGdnN {\n  display: flex;\n  gap: 4px;\n}\n\n.activityTimelineItem-module_activityHeader__JGdnN > div {\n  display: flex;\n  max-width: 100%;\n}\n\n.activityTimelineItem-module_activityHeaderTitleWrapper__JQs7I {\n  overflow: hidden;\n}\n\n.activityTimelineItem-module_activityHeaderTitleWrapper__JQs7I > div {\n  max-width: 100%;\n}\n\n.activityTimelineItem-module_activityHeaderTitle__-Xqpw {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex-shrink: 0;\n}\n\n.activityTimelineItem-module_activityHeaderTitleEllipsis__XfMz8 {\n  flex-shrink: 1;\n}\n\n.activityTimelineItem-module_activityHeaderTitleSidePeek__-1CXX {\n  font-size: 14px;\n  padding-bottom: 4px;\n}\n\n.activityTimelineItem-module_activityHeaderSubtitle__GCqka {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-left: 4px;\n  flex-shrink: 1;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper__uj6-F {\n  transition: all 0.5s ease-out;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper__uj6-F > li {\n  padding-left: 14px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper__uj6-F > li > div:first-child > div:nth-child(2) > div {\n  width: 20px;\n  height: 20px;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad > li {\n  padding: 3px 16px;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad > li > div:nth-child(2) > div:first-child > div * {\n  font-size: 13px;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad > li > div:nth-child(2) > div:first-child > div > div:last-child {\n  margin-left: 8px !important;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad > li > div:first-child > div:nth-child(2) > div {\n  width: 24px;\n  height: 24px;\n}\n\n.activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad > li > div:first-child > div:nth-child(2) > div > svg {\n  width: 18px;\n  height: 18px;\n}\n\n.activityTimelineItem-module_attachmentDropdown__lH67r {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 2px;\n  padding: 4px 10px;\n}\n\n.activityTimelineItem-module_attachmentDropdown__lH67r > div {\n  width: 100%;\n}\n\n.activityTimelineItem-module_attachmentClip__kIIem {\n  position: relative;\n  top: -2px;\n}\n\n.activityTimelineItem-module_meetingDurationInfo__OPNXe {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  margin-left: 4px;\n}\n\n.activityTimelineItem-module_leadName__czXG5 {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n}\n\n.activityTimelineItem-module_leadName__czXG5 > svg {\n  min-width: 12px;\n}\n\n.activityTimelineItem-module_ellipsis__Ae8wN {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.activityTimelineItem-module_rightIconsContainer__JDFE1 {\n  display: flex;\n  gap: 2px;\n}\n\n.activityTimelineItem-module_rightIconsContainer__JDFE1 > div > button {\n  padding: 2px 3px;\n}\n\n.activityTimelineItem-module_descriptionContainer__ozqwf {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n\n.activityTimelineItem-module_descriptionContainer__ozqwf > div:last-child {\n  /* display: flex; */\n  gap: 4px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.activityTimelineItem-module_descriptionContainer__ozqwf > div:last-child > span {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  padding-right: 22px;\n  display: contents;\n}\n\n.activityTimelineItem-module_bouncedEmail__xM6nP {\n  margin-right: 4px;\n  max-height: 10px;\n}\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  padding-right: 22px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.activityTimelineItem-module_descriptionContainer__ozqwf b {\n  margin-right: 4px;\n}\n\n/* .descriptionContainerSidePeek p,\n.descriptionContainerSidePeek b,\n.descriptionContainerSidePeek div {\n  display: inline-block;\n  margin-right: 5px;\n} */\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u::first-line {\n  padding-bottom: 2px;\n}\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u * {\n  font-size: 13px;\n}\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u > div:last-child {\n  display: block;\n  overflow: initial;\n}\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u > div:first-child {\n  float: left;\n  margin-right: 4px;\n  display: flex;\n}\n\n.activityTimelineItem-module_descriptionContainerSidePeek__14R-u > div:last-child > span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  padding-right: 22px;\n  white-space: normal;\n}\n\n.activityTimelineItem-module_descriptionContainer__ozqwf > span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.activityTimelineItem-module_callIcon__v4dbl svg {\n  height: 20px !important;\n  width: 20px !important;\n}\n\n.activityTimelineItem-module_rightIcons__c-Dgx {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.activityTimelineItem-module_emailIconSize__qjivw svg {\n  height: 18px !important;\n  width: 18px !important;\n}\n\n.activityTimelineItem-module_rightIcon__wVTwE svg {\n  height: 16px !important;\n  width: 16px !important;\n}\n\n.activityTimelineItem-module_meetingDuration__Yj3DD > div > p {\n  white-space: nowrap;\n}\n\n.activityTimelineItem-module_caseIcon__PBMEo > p {\n  display: inline-block;\n}\n\n.activityTimelineItem-module_caseIconMargin__kQqYG {\n  margin-bottom: -9px;\n  margin-right: -8px;\n}\n\n.activityTimelineItem-module_caseItem__-H0sL {\n  display: flex;\n  padding: 2px 8px;\n  cursor: pointer;\n}\n\n.activityTimelineItem-module_aiAnalysisIcon__VCzjB {\n  display: flex;\n}\n";
var styles$2 = {"activityHeader":"activityTimelineItem-module_activityHeader__JGdnN","activityHeaderTitleWrapper":"activityTimelineItem-module_activityHeaderTitleWrapper__JQs7I","activityHeaderTitle":"activityTimelineItem-module_activityHeaderTitle__-Xqpw","activityHeaderTitleEllipsis":"activityTimelineItem-module_activityHeaderTitleEllipsis__XfMz8","activityHeaderTitleSidePeek":"activityTimelineItem-module_activityHeaderTitleSidePeek__-1CXX","activityHeaderSubtitle":"activityTimelineItem-module_activityHeaderSubtitle__GCqka","timeline_item_wrapper":"activityTimelineItem-module_timeline_item_wrapper__uj6-F","timeline_item_wrapper_sidePeek":"activityTimelineItem-module_timeline_item_wrapper_sidePeek__g-9Ad","attachmentDropdown":"activityTimelineItem-module_attachmentDropdown__lH67r","attachmentClip":"activityTimelineItem-module_attachmentClip__kIIem","meetingDurationInfo":"activityTimelineItem-module_meetingDurationInfo__OPNXe","leadName":"activityTimelineItem-module_leadName__czXG5","ellipsis":"activityTimelineItem-module_ellipsis__Ae8wN","rightIconsContainer":"activityTimelineItem-module_rightIconsContainer__JDFE1","descriptionContainer":"activityTimelineItem-module_descriptionContainer__ozqwf","bouncedEmail":"activityTimelineItem-module_bouncedEmail__xM6nP","descriptionContainerSidePeek":"activityTimelineItem-module_descriptionContainerSidePeek__14R-u","callIcon":"activityTimelineItem-module_callIcon__v4dbl","rightIcons":"activityTimelineItem-module_rightIcons__c-Dgx","emailIconSize":"activityTimelineItem-module_emailIconSize__qjivw","rightIcon":"activityTimelineItem-module_rightIcon__wVTwE","meetingDuration":"activityTimelineItem-module_meetingDuration__Yj3DD","caseIcon":"activityTimelineItem-module_caseIcon__PBMEo","caseIconMargin":"activityTimelineItem-module_caseIconMargin__kQqYG","caseItem":"activityTimelineItem-module_caseItem__-H0sL","aiAnalysisIcon":"activityTimelineItem-module_aiAnalysisIcon__VCzjB"};
styleInject(css_248z$2);

var AttachmentsDropdown = /*#__PURE__*/React.forwardRef(function (_ref) {
  var attachedFiles = _ref.attachedFiles,
    betterAttachments = _ref.betterAttachments;
  var anchorRef = useRef();
  var _useVisible = useVisible(false, anchorRef),
    ref = _useVisible.ref,
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  function toggleVisible(event) {
    event.stopPropagation();
    event.preventDefault();
    setVisible(!visible);
  }
  var hasBetterAttachments = betterAttachments && (betterAttachments === null || betterAttachments === void 0 ? void 0 : betterAttachments.length) > 0;
  return /*#__PURE__*/jsx(Dropdown, {
    ref: ref,
    visible: visible,
    anchor: /*#__PURE__*/jsx(Tooltip, {
      title: t('activityTimelineItem.attachmentsDropdown.tooltip'),
      position: "top",
      children: /*#__PURE__*/jsx(IconButton, {
        name: "paperclip"
        /*@ts-ignore*/,
        ref: anchorRef,
        size: 12,
        color: "bloobirds",
        onClick: function onClick(event) {
          return toggleVisible(event);
        },
        className: styles$2.attachmentClip
      })
    }),
    width: 214,
    children: /*#__PURE__*/jsx("div", {
      className: styles$2.attachmentDropdown,
      children: hasBetterAttachments ? betterAttachments.map(function (file) {
        return !!file && /*#__PURE__*/jsx(LightAttachmentItem, {
          name: file.name,
          url: file.url,
          id: file.id
        }, file.id);
      }) : attachedFiles.map(function (attachment) {
        return !!attachment && /*#__PURE__*/jsx(LightAttachmentItem, {
          name: attachment
        }, attachment);
      })
    })
  });
});
var MeetingDurationInfo = function MeetingDurationInfo(_ref2) {
  var meetingDuration = _ref2.meetingDuration;
  return /*#__PURE__*/jsxs("div", {
    className: styles$2.meetingDurationInfo,
    children: [/*#__PURE__*/jsx(Icon, {
      name: "clock",
      color: "bloobirds",
      size: 12
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "bloobirds",
      children: meetingDuration && toHoursAndMinutes(meetingDuration)
    })]
  });
};
var BobjectName = function BobjectName(_ref3) {
  var activityBobjectName = _ref3.activityBobjectName,
    _ref3$activityBobject = _ref3.activityBobjectType,
    activityBobjectType = _ref3$activityBobject === void 0 ? BobjectTypes.Lead : _ref3$activityBobject,
    _ref3$ellipsis = _ref3.ellipsis,
    ellipsis = _ref3$ellipsis === void 0 ? undefined : _ref3$ellipsis;
  return activityBobjectName ? /*#__PURE__*/jsxs("div", {
    className: styles$2.leadName,
    style: {
      maxWidth: ellipsis
    },
    children: [/*#__PURE__*/jsx(Icon, {
      name: activityBobjectType === BobjectTypes.Opportunity ? 'fileOpportunity' : activityBobjectType === BobjectTypes.Company ? 'company' : 'person',
      color: "bloobirds",
      size: 12
    }), /*#__PURE__*/jsx(Text, {
      size: "xxs",
      color: "bloobirds",
      className: styles$2.ellipsis,
      children: activityBobjectName
    })]
  }) : /*#__PURE__*/jsx(Fragment, {});
};
var EmailIcons = function EmailIcons(_ref4) {
  var activity = _ref4.activity;
  var _useTranslation2 = useTranslation(),
    t = _useTranslation2.t;
  var openedTimes = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_OPENED);
  var clickedTimes = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_CLICKED);
  var replyTimes = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_TIMES_REPLIED);
  var hasBeenOpened = +openedTimes > 0;
  var hasBeenClicked = +clickedTimes > 0;
  var hasBeenReplied = +replyTimes > 0;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [hasBeenOpened && /*#__PURE__*/jsx(Tooltip, {
      title: t('activityTimelineItem.emailIcons.tooltip', {
        openedTimes: openedTimes,
        clickedTimes: clickedTimes
      }),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: hasBeenClicked ? 'checkDouble' : 'check',
        color: "bloobirds",
        size: 12
      })
    }), hasBeenReplied && /*#__PURE__*/jsx(Tooltip, {
      title: t('activityTimelineItem.emailIcons.hasBeenReplied'),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: "reply",
        color: "bloobirds",
        size: 12
      })
    })]
  });
};
var NewEmailIcons = function NewEmailIcons(_ref5) {
  var activity = _ref5.activity;
  var _useTranslation3 = useTranslation(),
    t = _useTranslation3.t;
  var openedTimes = activity.emailTimesOpen;
  var clickedTimes = activity.emailTimesClick;
  var replyTimes = activity.emailTimesReply;
  var hasBeenOpened = +openedTimes > 0;
  var hasBeenClicked = +clickedTimes > 0;
  var hasBeenReplied = +replyTimes > 0;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [hasBeenOpened && /*#__PURE__*/jsx(Tooltip, {
      title: t('activityTimelineItem.emailIcons.tooltip', {
        openedTimes: openedTimes,
        clickedTimes: clickedTimes
      }),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: hasBeenClicked ? 'checkDouble' : 'check',
        color: "bloobirds",
        size: 12
      })
    }), hasBeenReplied && /*#__PURE__*/jsx(Tooltip, {
      title: t('activityTimelineItem.emailIcons.hasBeenReplied'),
      position: "top",
      children: /*#__PURE__*/jsx(Icon, {
        name: "reply",
        color: "bloobirds",
        size: 12
      })
    })]
  });
};
var ReportedIconButton = function ReportedIconButton(_ref6) {
  var isReported = _ref6.isReported,
    actionsDisabled = _ref6.actionsDisabled,
    disableReport = _ref6.disableReport,
    onClick = _ref6.onClick;
  var _useTranslation4 = useTranslation('translation', {
      keyPrefix: 'activityTimelineItem'
    }),
    t = _useTranslation4.t;
  return /*#__PURE__*/jsx("div", {
    className: styles$2.rightIconsContainer,
    onClick: !actionsDisabled && !disableReport && onClick,
    children: /*#__PURE__*/jsx(Tooltip, {
      title: actionsDisabled ? t('reportedIconButton.tooltipNoPermissions') : isReported ? t('reportedIconButton.tooltipReported') : t('reportedIconButton.tooltipNotReported'),
      position: "top",
      children: /*#__PURE__*/jsx(CardButton, {
        size: "small",
        color: isReported ? 'verySoftMelon' : 'transparent',
        variant: isReported ? 'primary' : 'clear',
        children: /*#__PURE__*/jsx(Icon, {
          size: 12,
          color: isReported ? 'extraCall' : 'softPeanut',
          name: "thumbsUp"
        })
      })
    })
  });
};

var css_248z$1 = ".emailDetailsDropdown-module_column__d48kB {\n  width: 400px;\n  padding: 8px 20px 16px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.emailDetailsDropdown-module_row__Hkny9 {\n  display: grid;\n  grid-template-columns: 20% 78%;\n  align-items: start;\n  justify-content: space-between;\n}\n\n.emailDetailsDropdown-module_label__EKQjB {\n  font-family: var(--fontPrimary);\n  margin: 0;\n  grid-auto-flow: column;\n  align-items: center;\n  display: flex;\n  justify-content: flex-end;\n  grid-column-gap: 4px;\n}\n\n.emailDetailsDropdown-module_value__OILYu {\n  font-family: var(--fontPrimary);\n  margin: 0;\n  grid-auto-flow: column;\n  align-items: center;\n  justify-content: flex-start;\n  grid-column-gap: 4px;\n}\n";
var styles$1 = {"column":"emailDetailsDropdown-module_column__d48kB","row":"emailDetailsDropdown-module_row__Hkny9","label":"emailDetailsDropdown-module_label__EKQjB","value":"emailDetailsDropdown-module_value__OILYu"};
styleInject(css_248z$1);

var EmailDetailsDropdown = function EmailDetailsDropdown(props) {
  var metadata = props.metadata,
    date = props.date,
    subject = props.subject;
  var anchorRef = useRef();
  var _useVisible = useVisible(false, anchorRef),
    visible = _useVisible.visible,
    setVisible = _useVisible.setVisible,
    ref = _useVisible.ref;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var formattedDate = formatDateAsText({
    text: date,
    patternFormat: '{date} {month-short} {year}, {time}',
    t: t
  });
  return /*#__PURE__*/jsx(Dropdown, {
    anchor: /*#__PURE__*/jsx("div", {
      onClick: function onClick(e) {
        setVisible(function (visible) {
          return !visible;
        });
        e.stopPropagation();
      },
      ref: anchorRef,
      children: /*#__PURE__*/jsx(Icon, {
        name: "chevronDown",
        size: 12
      })
    }),
    visible: visible,
    ref: ref,
    arrow: false,
    children: /*#__PURE__*/jsx("div", {
      className: styles$1.column,
      children: metadata && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Row, {
          label: "".concat(t('common.from').toLowerCase(), ":"),
          values: metadata.from
        }), /*#__PURE__*/jsx(Row, {
          label: t('common.to').toLowerCase(),
          values: metadata.to
        }), metadata.cc && metadata.cc.length > 0 && /*#__PURE__*/jsx(Row, {
          label: "cc:",
          values: metadata.cc
        }), metadata.bcc && metadata.bcc.length > 0 && /*#__PURE__*/jsx(Row, {
          label: "bcc:",
          values: metadata.bcc
        }), /*#__PURE__*/jsx(Row, {
          label: t('common.date').toLowerCase(),
          values: formattedDate
        }), /*#__PURE__*/jsx(Row, {
          label: t('common.subject').toLowerCase(),
          values: subject
        })]
      })
    })
  });
};
var Row = function Row(props) {
  var label = props.label,
    values = props.values;
  return /*#__PURE__*/jsxs("div", {
    className: styles$1.row,
    children: [/*#__PURE__*/jsx("div", {
      className: styles$1.label,
      children: /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "softPeanut",
        children: label
      })
    }), /*#__PURE__*/jsx("div", {
      className: styles$1.value,
      children: typeof values === 'string' ? /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "peanut",
        children: values || '-'
      }) : values && values.length > 0 ? values.map(function (value) {
        return /*#__PURE__*/jsx(Text, {
          size: "s",
          color: "peanut",
          children: value.name ? "".concat(value.name, " <").concat(value.email, ">") : value.email
        }, "email-info-".concat(label, "-").concat(value));
      }) : /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "peanut",
        children: "-"
      })
    })]
  });
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty$5(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof$5(obj) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$5(obj); }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(arg) { var key = _toPrimitive$5(arg, "string"); return _typeof$5(key) === "symbol" ? key : String(key); }
function _toPrimitive$5(input, hint) { if (_typeof$5(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$5(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ActivityTimelineItem = function ActivityTimelineItem(_ref) {
  var activity = _ref.activity,
    onClick = _ref.onClick,
    startDisplayDivider = _ref.startDisplayDivider,
    endDisplayDivider = _ref.endDisplayDivider,
    _ref$activeHover = _ref.activeHover,
    activeHover = _ref$activeHover === void 0 ? true : _ref$activeHover,
    extended = _ref.extended,
    _ref$alternativeDescr = _ref.alternativeDescription,
    alternativeDescription = _ref$alternativeDescr === void 0 ? false : _ref$alternativeDescr,
    dataModel = _ref.dataModel,
    userId = _ref.userId,
    actionsDisabled = _ref.actionsDisabled,
    sidePeekEnabled = _ref.sidePeekEnabled,
    disableButtons = _ref.disableButtons,
    hovering = _ref.hovering,
    openContactFlow = _ref.openContactFlow,
    openMeetingResult = _ref.openMeetingResult,
    openQuickLogModal = _ref.openQuickLogModal,
    customTasks = _ref.customTasks,
    syncStatus = _ref.syncStatus;
  if (!(activity !== null && activity !== void 0 && activity.raw)) {
    return null;
  }
  var activityTypeField = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) || {
    id: ''
  };
  var activityType = activity.raw.contents[activityTypeField === null || activityTypeField === void 0 ? void 0 : activityTypeField.id];
  if (!activityType) {
    return null;
  }
  return /*#__PURE__*/jsx(ActivityTimelineItemWrapped, {
    activity: activity,
    onClick: onClick,
    startDisplayDivider: startDisplayDivider,
    endDisplayDivider: endDisplayDivider,
    activeHover: activeHover,
    extended: extended,
    alternativeDescription: alternativeDescription,
    dataModel: dataModel,
    userId: userId,
    actionsDisabled: actionsDisabled,
    sidePeekEnabled: sidePeekEnabled,
    disableButtons: disableButtons,
    hovering: hovering,
    openContactFlow: openContactFlow,
    openMeetingResult: openMeetingResult,
    openQuickLogModal: openQuickLogModal,
    customTasks: customTasks,
    syncStatus: syncStatus
  });
};

/**
 * This component must be used inside a <Timeline> Parent to be shown properly.
 * On Click has a default action that is meant to be on the main feed to open extended content
 * @param activity
 * @param onClick
 * @param startDisplayDivider
 * @param endDisplayDivider
 * @param activeHover
 * @param extended
 * @param alternativeDescription
 * @param dataModel
 * @param userId
 * @param actionsDisabled
 * @param sidePeekEnabled
 * @param disableReport
 * @param hovering
 * @param openContactFlow
 * @param openMeetingResult
 * @param openQuickLogModal
 * @param customTasks
 * @param syncStatus
 * @constructor
 */
var ActivityTimelineItemWrapped = function ActivityTimelineItemWrapped(_ref2) {
  var _dataModel$findValueB, _dataModel$findValueB2, _parsedAttachedFiles$, _getFieldByLogicRole, _getFieldByLogicRole2, _activity$id, _cadences$find, _getFieldByLogicRole3, _getFieldByLogicRole4, _getFieldByLogicRole5, _ref$current, _ref$current$firstChi, _ref$current$firstChi2, _ref$current2, _ref$current2$firstCh, _ref$current2$firstCh2;
  var activity = _ref2.activity,
    onClick = _ref2.onClick,
    startDisplayDivider = _ref2.startDisplayDivider,
    endDisplayDivider = _ref2.endDisplayDivider,
    _ref2$activeHover = _ref2.activeHover,
    activeHover = _ref2$activeHover === void 0 ? true : _ref2$activeHover,
    extended = _ref2.extended,
    _ref2$alternativeDesc = _ref2.alternativeDescription,
    alternativeDescription = _ref2$alternativeDesc === void 0 ? false : _ref2$alternativeDesc,
    dataModel = _ref2.dataModel,
    userId = _ref2.userId,
    actionsDisabled = _ref2.actionsDisabled,
    sidePeekEnabled = _ref2.sidePeekEnabled,
    disableButtons = _ref2.disableButtons,
    hovering = _ref2.hovering,
    openContactFlow = _ref2.openContactFlow,
    openMeetingResult = _ref2.openMeetingResult,
    openQuickLogModal = _ref2.openQuickLogModal,
    customTasks = _ref2.customTasks,
    syncStatus = _ref2.syncStatus;
  var trans = useTranslation();
  var t = trans.t;
  var activityTypeField = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)) || {
    id: ''
  };
  var activitySubjectFields = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT)) || {
    id: ''
  };
  var activityFromNameFields = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.INBOUND_FORM_NAME)) || {
    id: ''
  };
  var activityBodyFields = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY)) || {
    id: ''
  };
  var activityDirectionFields = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION)) || {
    id: ''
  };
  var activityNoteField = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE)) || {
    id: ''
  };
  var activityTimeField = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TIME)) || {
    id: ''
  };
  var activityTitleField = (dataModel === null || dataModel === void 0 ? void 0 : dataModel.findFieldByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TITLE)) || {
    id: ''
  };
  var activityType = activity.raw.contents[activityTypeField === null || activityTypeField === void 0 ? void 0 : activityTypeField.id];
  var activitySubject = activity.raw.contents[activitySubjectFields === null || activitySubjectFields === void 0 ? void 0 : activitySubjectFields.id];
  var activityDirection = activity.raw.contents[activityDirectionFields === null || activityDirectionFields === void 0 ? void 0 : activityDirectionFields.id];
  var activityBody = activity.raw.contents[activityBodyFields === null || activityBodyFields === void 0 ? void 0 : activityBodyFields.id];
  var activityNote = activity.raw.contents[activityNoteField === null || activityNoteField === void 0 ? void 0 : activityNoteField.id];
  var activityFormName = activity.raw.contents[activityFromNameFields === null || activityFromNameFields === void 0 ? void 0 : activityFromNameFields.id];
  var activityTime = activity.raw.contents[activityTimeField === null || activityTimeField === void 0 ? void 0 : activityTimeField.id];
  var timeToShow = getTimeToShow(activityTime, trans);
  var activityTitle = activity.raw.contents[activityTitleField === null || activityTitleField === void 0 ? void 0 : activityTitleField.id];
  var activityTypeLogicRole = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findValueB = dataModel.findValueById(activityType)) === null || _dataModel$findValueB === void 0 ? void 0 : _dataModel$findValueB.logicRole;
  var activityDirectionValue = dataModel === null || dataModel === void 0 ? void 0 : (_dataModel$findValueB2 = dataModel.findValueById(activityDirection)) === null || _dataModel$findValueB2 === void 0 ? void 0 : _dataModel$findValueB2.name;
  var activityLead = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  var activityLeadName = getTextFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
  var activityCompany = getReferencedBobjectFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  var activityCompanyName = getTextFromLogicRole(activityCompany, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  var activityIsReported = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED) === 'Yes';

  // Email
  var activityAttachedFiles = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES);
  var parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  var activityLeadEmail = getTextFromLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  var activityAttachments = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS);
  var parsedAttachments = activityAttachments && JSON.parse(activityAttachments);
  var hasAttachedFiles = activityAttachedFiles && (parsedAttachedFiles === null || parsedAttachedFiles === void 0 ? void 0 : (_parsedAttachedFiles$ = parsedAttachedFiles.filter(function (att) {
    return !!att;
  })) === null || _parsedAttachedFiles$ === void 0 ? void 0 : _parsedAttachedFiles$.length) !== 0;
  var isBouncedEmail = ((_getFieldByLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)) === null || _getFieldByLogicRole === void 0 ? void 0 : _getFieldByLogicRole.valueLogicRole) === BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  var activityEmailMetadata = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_METADATA);
  var activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
  var activityEmailLeads = [];
  if (activityEmailMetadata) {
    var _activityEmailInfo$to, _activityEmailInfo$cc;
    if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$to = activityEmailInfo.to) === null || _activityEmailInfo$to === void 0 ? void 0 : _activityEmailInfo$to.length) > 0) {
      activityEmailInfo.to.map(function (to) {
        if (to.name && to.name !== activityLeadName) activityEmailLeads.push(to.name);else if (to.email && to.email !== activityLeadEmail) activityEmailLeads.push(to.email.split('@')[0]);
      });
    }
    if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$cc = activityEmailInfo.cc) === null || _activityEmailInfo$cc === void 0 ? void 0 : _activityEmailInfo$cc.length) > 0) {
      activityEmailInfo.cc.map(function (cc) {
        if (cc.name && cc.name !== activityLeadName) activityEmailLeads.push(cc.name);else if (cc.email && cc.email !== activityLeadEmail) activityEmailLeads.push(cc.email.split('@')[0]);
      });
    }
  }

  // Meeting
  var meetingDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION);
  var meetingTitle = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  var meetingResult = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);

  // Call
  var callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  var hasAudioRecording = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  var callResult = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT);

  // Cadence
  var CADENCE_ACTIVITY_TEXT = _defineProperty$5(_defineProperty$5(_defineProperty$5(_defineProperty$5(_defineProperty$5({}, CADENCE_TYPES_VALUES_LOGIC_ROLE.RESCHEDULE, t('activityTimelineItem.item.rescheduledCadence')), CADENCE_TYPES_VALUES_LOGIC_ROLE.STARTED, t('activityTimelineItem.item.startedCadence')), CADENCE_TYPES_VALUES_LOGIC_ROLE.CONFIGURE, t('activityTimelineItem.item.startedCadence')), CADENCE_TYPES_VALUES_LOGIC_ROLE.STOPPED, t('activityTimelineItem.item.stoppedCadence')), CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED, t('activityTimelineItem.item.endedCadence'));
  var referenceBobjectType = getRelatedBobjectTypeName(activity);
  var cadenceId = (_getFieldByLogicRole2 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE)) === null || _getFieldByLogicRole2 === void 0 ? void 0 : _getFieldByLogicRole2.value;
  var _useCadences = useCadences(referenceBobjectType, activity === null || activity === void 0 ? void 0 : (_activity$id = activity.id) === null || _activity$id === void 0 ? void 0 : _activity$id.accountId, undefined, undefined, undefined, true),
    cadences = _useCadences.cadences;
  var activityCadence = cadences === null || cadences === void 0 ? void 0 : (_cadences$find = cadences.find(function (cadence) {
    return (cadence === null || cadence === void 0 ? void 0 : cadence.id) === cadenceId;
  })) === null || _cadences$find === void 0 ? void 0 : _cadences$find.name;
  var activityCadenceStatusLR = (_getFieldByLogicRole3 = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TYPE)) === null || _getFieldByLogicRole3 === void 0 ? void 0 : _getFieldByLogicRole3.valueLogicRole;
  var activityCadenceStatus = CADENCE_ACTIVITY_TEXT[activityCadenceStatusLR];

  // Status
  var activityStatusUpdate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.STATUS_TITLE);
  var activityStatus = getTextFromLogicRole(activity, ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS);
  var isLeadStatusUpdate = (activityStatus === null || activityStatus === void 0 ? void 0 : activityStatus.includes('lead')) || (activityStatus === null || activityStatus === void 0 ? void 0 : activityStatus.includes('Lead'));
  var isOpportunityStatusUpdate = (activityStatus === null || activityStatus === void 0 ? void 0 : activityStatus.includes('opportunity')) || (activityStatus === null || activityStatus === void 0 ? void 0 : activityStatus.includes('Opportunity'));
  var opportunityField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  var opportunity = opportunityField === null || opportunityField === void 0 ? void 0 : opportunityField.referencedBobject;
  var opportunityName = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);
  var opportunityStage = getTextFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  var leadAssignee = ((_getFieldByLogicRole4 = getFieldByLogicRole(activityLead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)) === null || _getFieldByLogicRole4 === void 0 ? void 0 : _getFieldByLogicRole4.value) || ( // @ts-ignore
  activityLead === null || activityLead === void 0 ? void 0 : activityLead.assignedTo);
  var oppAssignee = ((_getFieldByLogicRole5 = getFieldByLogicRole(opportunity, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO)) === null || _getFieldByLogicRole5 === void 0 ? void 0 : _getFieldByLogicRole5.value) || ( // @ts-ignore
  opportunity === null || opportunity === void 0 ? void 0 : opportunity.assignedTo);
  var assignedToActiveUser = leadAssignee === userId || oppAssignee === userId;
  var descriptionClass = clsx(styles$2.descriptionContainer, _defineProperty$5({}, styles$2.descriptionContainerSidePeek, sidePeekEnabled));
  var rightIconEmailClass = clsx(styles$2.rightIcons, _defineProperty$5({}, styles$2.emailIconSize, sidePeekEnabled));
  var rightIconMeetingClass = clsx(styles$2.rightIcons, _defineProperty$5({}, styles$2.rightIcon, sidePeekEnabled));
  var getBobjectNameProps = function getBobjectNameProps() {
    var activityBobjectName = '';
    var activityBobjectType = BobjectTypes.Lead;
    if (activityLeadName) {
      activityBobjectName = activityLeadName;
      if ((activityEmailLeads === null || activityEmailLeads === void 0 ? void 0 : activityEmailLeads.length) > 0) {
        activityBobjectName += ', ' + activityEmailLeads.join(', ');
      }
    } else if ((activityEmailLeads === null || activityEmailLeads === void 0 ? void 0 : activityEmailLeads.length) > 0) {
      activityBobjectName += activityEmailLeads.join(', ');
    } else if (opportunityName) {
      activityBobjectName = opportunityName;
      activityBobjectType = BobjectTypes.Opportunity;
    } else if (activityCompanyName) {
      activityBobjectName = activityCompanyName;
      activityBobjectType = BobjectTypes.Company;
    }
    return {
      activityBobjectName: activityBobjectName,
      activityBobjectType: activityBobjectType
    };
  };
  var customTask = customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  });
  var activityFields = function activityFields(activityTypeLogicRole) {
    var _activitySubject, _activityBody, _activityBody2;
    var showStatusWarning = extended && syncStatus !== undefined && !syncStatus;
    switch (activityTypeLogicRole) {
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
        if ((_activitySubject = activitySubject) !== null && _activitySubject !== void 0 && _activitySubject.includes('"type":"p"') && typeof activitySubject === 'string' && _typeof$5(JSON.parse(activitySubject)) === 'object') {
          activitySubject = removeHtmlTags(serialize(activitySubject));
        }
        if ((_activityBody = activityBody) !== null && _activityBody !== void 0 && _activityBody.includes('"type":"p"') && typeof activityBody === 'string' && _typeof$5(JSON.parse(activityBody)) === 'object') {
          activityBody = serialize(activityBody);
        }
        return {
          icon: /*#__PURE__*/jsx("div", {
            className: sidePeekEnabled && styles$2.emailIcon,
            children: /*#__PURE__*/jsx(Icon, {
              name: activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING ? 'emailOutgoingAlter' : 'emailIncomingAlter',
              color: activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING ? 'tangerine' : 'lightestTangerine',
              size: 20
            })
          }),
          color: activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING ? 'lightestTangerine' : 'tangerine',
          subject: activitySubject || t('common.noSubject'),
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [/*#__PURE__*/jsx(BobjectName, _objectSpread$3(_objectSpread$3({}, getBobjectNameProps()), {}, {
              ellipsis: "80%"
            })), /*#__PURE__*/jsx(EmailDetailsDropdown, {
              metadata: activityEmailInfo,
              date: activityTime,
              subject: activitySubject
            }), activityBody && (activityEmailLeads.length === 0 || sidePeekEnabled) && /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("span", {
                children: activityBody ? convertHtmlToString((_activityBody2 = activityBody) === null || _activityBody2 === void 0 ? void 0 : _activityBody2.replace(/<head>[\s\S]*?<\/head>/g, '')) : null
              })
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsxs("div", {
            className: rightIconEmailClass,
            children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: 'email',
              id: activity === null || activity === void 0 ? void 0 : activity.id
            }), isBouncedEmail && /*#__PURE__*/jsx(Tooltip, {
              title: t('activityTimelineItem.item.bounced'),
              position: "top",
              children: /*#__PURE__*/jsx(Icon, {
                className: styles$2.bouncedEmail,
                name: "statusCircle",
                size: 6,
                color: "extraMeeting"
              })
            }), hasAttachedFiles && /*#__PURE__*/jsx(AttachmentsDropdown, {
              attachedFiles: parsedAttachedFiles,
              betterAttachments: parsedAttachments
            }), /*#__PURE__*/jsx(EmailIcons, {
              activity: activity
            })]
          }),
          syncName: 'email'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
        return {
          icon: 'calendar',
          color: 'lightestMeeting',
          iconColor: 'extraMeeting',
          subject: meetingTitle ? meetingTitle : t('common.meetingArranged'),
          extraSubtitle: meetingDuration && !alternativeDescription && /*#__PURE__*/jsx("div", {
            className: styles$2.meetingDuration,
            children: /*#__PURE__*/jsx(MeetingDurationInfo, {
              meetingDuration: +meetingDuration
            })
          }),
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: activityLeadName
            }), /*#__PURE__*/jsxs("div", {
              children: [meetingResult && /*#__PURE__*/jsx("b", {
                children: meetingResult
              }), activityNote && /*#__PURE__*/jsxs("span", {
                children: [/*#__PURE__*/jsxs("b", {
                  children: [t('common.note'), ": "]
                }), " ", convertHtmlToString(activityNote)]
              })]
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsxs("div", {
            className: rightIconMeetingClass,
            children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: 'meeting',
              id: activity === null || activity === void 0 ? void 0 : activity.id
            }), /*#__PURE__*/jsx(ReportedIconButton, {
              isReported: activityIsReported,
              actionsDisabled: actionsDisabled && !assignedToActiveUser,
              disableReport: disableButtons,
              onClick: openMeetingResult
            })]
          }),
          syncName: 'meeting'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
        return {
          icon: /*#__PURE__*/jsx("div", {
            className: sidePeekEnabled && styles$2.callIcon,
            children: /*#__PURE__*/jsx(Icon, {
              name: activityDirectionValue === ACTIVITY_DIRECTION.OUTGOING ? 'callOutgoing' : 'callIncoming',
              color: activityDirectionValue === ACTIVITY_DIRECTION.MISSED ? 'extraMeeting' : 'extraCall',
              size: 16
            })
          }),
          color: activityDirectionValue === ACTIVITY_DIRECTION.MISSED ? 'lightestMeeting' : 'lightestCall',
          iconColor: 'extraCall',
          subject: t('activityTimelineItem.item.' + activityDirectionValue + 'Call'),
          date: timeToShow,
          description: alternativeDescription ? /*#__PURE__*/jsx(Text, {
            size: "xxs",
            color: "softPeanut",
            children: t('common.callWith') + ' ' + activityLeadName + ' ' + (activityCompanyName ? t('common.from') + ' ' + activityCompanyName : '')
          }) : /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: activityLeadName
            }), callResult && /*#__PURE__*/jsx("b", {
              children: callResult
            }), activityNote && /*#__PURE__*/jsxs("span", {
              children: [/*#__PURE__*/jsxs("b", {
                children: [t('common.note'), ":"]
              }), convertHtmlToString(activityNote)]
            }), !callResult && !activityNote && /*#__PURE__*/jsx("div", {})]
          }),
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsxs("div", {
            className: clsx(styles$2.descriptionContainer, _defineProperty$5({}, styles$2.rightIcon, sidePeekEnabled)),
            children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: 'call',
              id: activity === null || activity === void 0 ? void 0 : activity.id
            }), /*#__PURE__*/jsx(ReportedIconButton, {
              isReported: activityIsReported,
              actionsDisabled: actionsDisabled && !assignedToActiveUser,
              disableReport: disableButtons,
              onClick: openContactFlow
            }), hasAudioRecording && /*#__PURE__*/jsx(Tooltip, {
              title: t('common.recording'),
              position: "top",
              children: /*#__PURE__*/jsx(Icon, {
                name: "voicemail",
                color: "bloobirds",
                size: 12
              })
            }), callDuration && /*#__PURE__*/jsx(Text, {
              size: "xxs",
              color: "softPeanut",
              children: new Date(callDuration * 1000).toISOString().substring(14, 19)
            })]
          }),
          syncName: 'call'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
        return {
          icon: 'linkedin',
          color: 'verySoftBloobirds',
          iconColor: 'darkBloobirds',
          subject: activityBody ? t('activityTimelineItem.item.linkedinConversation') : t('activityTimelineItem.item.manuallyLoggedActivity'),
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: activityLeadName
            }), /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("span", {
                children: alternativeDescription ? '' : activityBody ? activityBody : activityNote ? activityNote : null
              })
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsx(Fragment, {
            children: showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: 'message',
              id: activity === null || activity === void 0 ? void 0 : activity.id
            })
          }),
          syncName: 'message'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
        return {
          icon: 'noteAction',
          color: 'banana',
          iconColor: 'peanut',
          subject: typeof activityTitle === 'string' ? removeHtmlTags(activityTitle) : activityLeadName ? activityLeadName + ' ' + t('common.note').toLowerCase() : t('common.note'),
          subtitle: activityNote && !sidePeekEnabled ? removeHtmlTags(activityNote) : null,
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: activityLeadName
            }), activityCompany && !activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectType: BobjectTypes.Company,
              activityBobjectName: activityCompanyName
            }), sidePeekEnabled && activityNote && /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("span", {
                children: removeHtmlTags(activityNote)
              })
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsx(Fragment, {
            children: showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: "note",
              id: activity === null || activity === void 0 ? void 0 : activity.id
            })
          }),
          syncName: 'note'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
        return {
          icon: 'download',
          color: 'lightestBanana',
          iconColor: 'banana',
          subject: t('activityTimelineItem.item.inboundActivity'),
          subtitle: activityFormName ? "\"".concat(activityFormName, "\"") : '',
          description: activityLead && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: activityLeadName
          }),
          date: formatDateAsText({
            text: parseISO(activityTime),
            patternFormat: 'dd MMM',
            t: t
          }),
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds',
          rightIcon: /*#__PURE__*/jsx(Fragment, {
            children: showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
              type: 'activity',
              id: activity === null || activity === void 0 ? void 0 : activity.id
            })
          }),
          syncName: 'activity'
        };
      case 'ACTIVITY__TYPE__CADENCE':
        return {
          icon: 'cadence',
          color: 'verySoftPurple',
          iconColor: 'lightPurple',
          subject: activityCadenceStatusLR ? activityCadenceStatus : '',
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [activityLead && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: activityLeadName
            }), /*#__PURE__*/jsx("div", {
              children: /*#__PURE__*/jsx("span", {
                children: activityCadence ? "\"".concat(activityCadence, "\"") : ''
              })
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds'
        };
      case 'ACTIVITY__TYPE__STATUS':
        return {
          icon: isLeadStatusUpdate ? 'person' : isOpportunityStatusUpdate ? 'fileOpportunity' : 'company',
          color: 'lightPeanut',
          iconColor: 'softPeanut',
          subject: activityStatusUpdate ? activityStatusUpdate : t('common.statusUpdate'),
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [(activityLead || opportunity) && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: opportunity ? opportunityName : activityLeadName,
              activityBobjectType: opportunity ? BobjectTypes.Opportunity : BobjectTypes.Lead
            }), /*#__PURE__*/jsx("div", {
              children: opportunityStage && /*#__PURE__*/jsx("b", {
                children: opportunityStage
              })
            })]
          }),
          date: timeToShow,
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds'
        };
      case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
        return {
          icon: /*#__PURE__*/jsx(Icon, {
            name: customTask === null || customTask === void 0 ? void 0 : customTask.icon,
            color: 'white',
            size: 14
          }),
          color: customTask === null || customTask === void 0 ? void 0 : customTask.iconColor,
          subject: customTask === null || customTask === void 0 ? void 0 : customTask.name,
          description: /*#__PURE__*/jsxs("div", {
            className: descriptionClass,
            children: [(activityLead || opportunity) && /*#__PURE__*/jsx(BobjectName, {
              activityBobjectName: opportunity ? opportunityName : activityLeadName,
              activityBobjectType: opportunity ? BobjectTypes.Opportunity : BobjectTypes.Lead
            }), /*#__PURE__*/jsxs("div", {
              children: [activityNote && /*#__PURE__*/jsxs("span", {
                children: [/*#__PURE__*/jsx("b", {
                  children: t('common.note') + ': '
                }), " ", activityNote]
              }), activityBody && /*#__PURE__*/jsx("span", {
                children: activityBody
              })]
            })]
          }),
          date: timeToShow,
          rightIcon: !disableButtons && /*#__PURE__*/jsx(IconButton, {
            name: "edit",
            size: 16,
            onClick: function onClick() {
              openQuickLogModal({
                customTask: customTask,
                leads: [],
                selectedBobject: getReferencedBobject(activity),
                companyId: activityCompany === null || activityCompany === void 0 ? void 0 : activityCompany.id.value,
                onSubmit: function onSubmit() {
                  window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                    detail: {
                      type: BobjectTypes.Activity
                    }
                  }));
                },
                isEdition: true,
                activity: activity
              });
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_EDIT_CUSTOM_ACTIVITY);
            }
          }),
          backgroundColor: extended ? 'lightestBloobirds' : 'lightestBloobirds'
        };
    }
  };

  // @ts-ignore
  var activityData = activityTypeLogicRole ? activityFields(activityTypeLogicRole) : undefined;
  var ref = useRef();
  var showTooltip =
  // @ts-ignore
  (ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$firstChi = _ref$current.firstChild) === null || _ref$current$firstChi === void 0 ? void 0 : (_ref$current$firstChi2 = _ref$current$firstChi.firstChild) === null || _ref$current$firstChi2 === void 0 ? void 0 : _ref$current$firstChi2.offsetWidth) < ( // @ts-ignore
  ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$firstCh = _ref$current2.firstChild) === null || _ref$current2$firstCh === void 0 ? void 0 : (_ref$current2$firstCh2 = _ref$current2$firstCh.firstChild) === null || _ref$current2$firstCh2 === void 0 ? void 0 : _ref$current2$firstCh2.scrollWidth);
  var handleClick = function handleClick() {
    var _activity$id2;
    api.get('/bobjects/' + (activity === null || activity === void 0 ? void 0 : (_activity$id2 = activity.id) === null || _activity$id2 === void 0 ? void 0 : _activity$id2.value) + '/form?injectReferences=true').then(function (_ref3) {
      var filledActivity = _ref3.data;
      onClick(filledActivity);
    });
  };
  var timelineItemWrapperClasses = clsx(styles$2.timeline_item_wrapper, _defineProperty$5({}, styles$2.timeline_item_wrapper_sidePeek, sidePeekEnabled));
  return /*#__PURE__*/jsx("div", {
    className: timelineItemWrapperClasses,
    children: /*#__PURE__*/jsx(TimelineItem, {
      size: "small"
      // @ts-ignore
      ,
      data: activityData,
      startDisplayDivider: startDisplayDivider,
      endDisplayDivider: endDisplayDivider,
      onClick: onClick ? function () {
        return handleClick();
      } : undefined,
      backgroundColor: activityData === null || activityData === void 0 ? void 0 : activityData.backgroundColor,
      activeHover: activeHover,
      isHovering: hovering,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$2.activityHeader,
        ref: ref,
        children: [!extended && (activityData === null || activityData === void 0 ? void 0 : activityData.syncName) && syncStatus !== undefined && !syncStatus && /*#__PURE__*/jsx(InfoWarningSync, {
          type: activityData === null || activityData === void 0 ? void 0 : activityData.syncName,
          id: activity === null || activity === void 0 ? void 0 : activity.id
        }), /*#__PURE__*/jsx("div", {
          className: styles$2.activityHeaderTitleWrapper,
          children: /*#__PURE__*/jsx(Tooltip, {
            title: showTooltip && (activityData === null || activityData === void 0 ? void 0 : activityData.subject),
            position: "top",
            delay: 200,
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              weight: "bold",
              className: clsx(styles$2.activityHeaderTitle, _defineProperty$5(_defineProperty$5({}, styles$2.activityHeaderTitleEllipsis, !(activityData !== null && activityData !== void 0 && activityData.subtitle)), styles$2.activityHeaderTitleSidePeek, sidePeekEnabled)),
              children: activityData === null || activityData === void 0 ? void 0 : activityData.subject
            })
          })
        }), (activityData === null || activityData === void 0 ? void 0 : activityData.subtitle) && /*#__PURE__*/jsx(Text, {
          size: "xs",
          className: styles$2.activityHeaderSubtitle,
          children: activityData === null || activityData === void 0 ? void 0 : activityData.subtitle
        }), extended && (activityData === null || activityData === void 0 ? void 0 : activityData.extraSubtitle)]
      })
    })
  });
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty$4(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof$4(obj) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$4(obj); }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(arg) { var key = _toPrimitive$4(arg, "string"); return _typeof$4(key) === "symbol" ? key : String(key); }
function _toPrimitive$4(input, hint) { if (_typeof$4(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$4(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DescriptionComponent = function DescriptionComponent(_ref) {
  var _getBobjectNameProps, _forgeIdFieldsFromIdV;
  var activity = _ref.activity,
    sidePeekEnabled = _ref.sidePeekEnabled,
    alternativeDescription = _ref.alternativeDescription;
  var isB2CAccount = useIsB2CAccount();
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useCadences = useCadences((_getBobjectNameProps = getBobjectNameProps(activity)) === null || _getBobjectNameProps === void 0 ? void 0 : _getBobjectNameProps.activityBobjectType, (_forgeIdFieldsFromIdV = forgeIdFieldsFromIdValue(activity === null || activity === void 0 ? void 0 : activity.bobjectId)) === null || _forgeIdFieldsFromIdV === void 0 ? void 0 : _forgeIdFieldsFromIdV.accountId, undefined, undefined, undefined, true),
    cadences = _useCadences.cadences;
  var activityTypeLogicRole = activity.activityType;
  var descriptionClass = clsx(styles$2.descriptionContainer, _defineProperty$4({}, styles$2.descriptionContainerSidePeek, sidePeekEnabled));
  var activityLeadName = activity.leadName;
  var activityNote = activity.note;
  var activityBody = activity.body;
  var opportunityName = activity.opportunityName;
  var opportunityStage = activity.opportunityStage;
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      {
        var _activityBody, _activityBody2, _activitySubject;
        if ((_activityBody = activityBody) !== null && _activityBody !== void 0 && _activityBody.includes('"type":"p"') && typeof activityBody === 'string' && _typeof$4(JSON.parse(activityBody)) === 'object') {
          activityBody = serialize(activityBody);
        }
        var cleanedBody = convertHtmlToString((_activityBody2 = activityBody) === null || _activityBody2 === void 0 ? void 0 : _activityBody2.replace(/<head>[\s\S]*?<\/head>/g, ''));
        var activitySubject = activity.subject;
        if ((_activitySubject = activitySubject) !== null && _activitySubject !== void 0 && _activitySubject.includes('"type":"p"') && typeof activitySubject === 'string' && _typeof$4(JSON.parse(activitySubject)) === 'object') {
          activitySubject = removeHtmlTags(serialize(activitySubject));
        }
        var activityEmailMetadata = activity.emailMetadata;
        var activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
        var activityTime = activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : activityEmailInfo.date;
        var activityLeadEmail = activity.leadEmail;
        var activityEmailLeads = [];
        if (activityEmailMetadata) {
          var _activityEmailInfo$to, _activityEmailInfo$cc;
          if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$to = activityEmailInfo.to) === null || _activityEmailInfo$to === void 0 ? void 0 : _activityEmailInfo$to.length) > 0) {
            activityEmailInfo.to.map(function (to) {
              if (to.name && to.name !== activityLeadName) activityEmailLeads.push(to.name);else if (to.email && to.email !== activityLeadEmail) activityEmailLeads.push(to.email.split('@')[0]);
            });
          }
          if ((activityEmailInfo === null || activityEmailInfo === void 0 ? void 0 : (_activityEmailInfo$cc = activityEmailInfo.cc) === null || _activityEmailInfo$cc === void 0 ? void 0 : _activityEmailInfo$cc.length) > 0) {
            activityEmailInfo.cc.map(function (cc) {
              if (cc.name && cc.name !== activityLeadName) activityEmailLeads.push(cc.name);else if (cc.email && cc.email !== activityLeadEmail) activityEmailLeads.push(cc.email.split('@')[0]);
            });
          }
        }
        return /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [/*#__PURE__*/jsx(BobjectName, _objectSpread$2(_objectSpread$2({}, getBobjectNameProps(activity)), {}, {
            ellipsis: "80%"
          })), /*#__PURE__*/jsx(EmailDetailsDropdown, {
            metadata: activityEmailInfo,
            date: activityTime,
            subject: activitySubject
          }), activityBody && (activityEmailLeads.length === 0 || sidePeekEnabled) && /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("span", {
              children: activityBody ? cleanedBody : null
            })
          })]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      {
        var meetingResult = activity.meetingResult;
        return /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [activityLeadName ? /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: activityLeadName
          }) : /*#__PURE__*/jsx("div", {}), /*#__PURE__*/jsxs("div", {
            children: [meetingResult && /*#__PURE__*/jsx("b", {
              children: meetingResult
            }), activityNote && /*#__PURE__*/jsxs("span", {
              children: [/*#__PURE__*/jsxs("b", {
                children: [t('common.note'), ": "]
              }), " ", convertHtmlToString(activityNote)]
            })]
          })]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      {
        var activityCompanyName = activity.companyName;
        var callResult = activity.callResult;
        return alternativeDescription ? /*#__PURE__*/jsx(Text, {
          size: "xxs",
          color: "softPeanut",
          children: t('common.callWith') + ' ' + activityLeadName + ' ' + (activityCompanyName ? t('common.from') + ' ' + activityCompanyName : '')
        }) : /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [activityLeadName && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: activityLeadName
          }), callResult && /*#__PURE__*/jsx("b", {
            children: callResult
          }), activityNote && !!convertHtmlToString(activityNote) && /*#__PURE__*/jsxs("span", {
            children: [/*#__PURE__*/jsxs("b", {
              children: [t('common.note'), ":"]
            }), convertHtmlToString(activityNote)]
          }), !callResult && !activityNote && /*#__PURE__*/jsx("div", {})]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return /*#__PURE__*/jsxs("div", {
        className: descriptionClass,
        children: [activityLeadName && /*#__PURE__*/jsx(BobjectName, {
          activityBobjectName: activityLeadName
        }), /*#__PURE__*/jsx("div", {
          children: /*#__PURE__*/jsx("span", {
            children: alternativeDescription ? '' : activityBody ? activityBody === 'undefined' ? t('linkedInDetail.messageNotAvailable') : activityBody : activityNote ? activityNote : null
          })
        })]
      });
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      {
        var _activityCompanyName = activity.companyName;
        return /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [activityLeadName && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: activityLeadName
          }), !isB2CAccount && _activityCompanyName && !activityLeadName && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectType: BobjectTypes.Company,
            activityBobjectName: _activityCompanyName
          }), sidePeekEnabled && activityNote && /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("span", {
              children: removeHtmlTags(activityNote)
            })
          })]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      {
        return activityLeadName && /*#__PURE__*/jsx(BobjectName, {
          activityBobjectName: activityLeadName
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      {
        var _cadences$find;
        var activityCadence = activity.cadence;
        var activityCadenceName = cadences === null || cadences === void 0 ? void 0 : (_cadences$find = cadences.find(function (cadence) {
          return cadence.id === activityCadence;
        })) === null || _cadences$find === void 0 ? void 0 : _cadences$find.name;
        return /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [activityLeadName && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: activityLeadName
          }), /*#__PURE__*/jsx("div", {
            children: /*#__PURE__*/jsx("span", {
              children: activityCadenceName ? "\"".concat(activityCadenceName, "\"") : ''
            })
          })]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
      {
        return /*#__PURE__*/jsxs("div", {
          className: descriptionClass,
          children: [(activityLeadName || opportunityName) && /*#__PURE__*/jsx(BobjectName, {
            activityBobjectName: opportunityName ? opportunityName : activityLeadName,
            activityBobjectType: opportunityName ? BobjectTypes.Opportunity : BobjectTypes.Lead
          }), /*#__PURE__*/jsx("div", {
            children: opportunityStage && /*#__PURE__*/jsx("b", {
              children: opportunityStage
            })
          })]
        });
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return /*#__PURE__*/jsxs("div", {
        className: descriptionClass,
        children: [(activityLeadName || opportunityName) && /*#__PURE__*/jsx(BobjectName, {
          activityBobjectName: opportunityName ? opportunityName : activityLeadName,
          activityBobjectType: opportunityName ? BobjectTypes.Opportunity : BobjectTypes.Lead
        }), /*#__PURE__*/jsxs("div", {
          children: [activityNote && /*#__PURE__*/jsxs("span", {
            children: [/*#__PURE__*/jsx("b", {
              children: t('common.note') + ': '
            }), " ", activityNote]
          }), activityBody && /*#__PURE__*/jsx("span", {
            children: activityBody
          })]
        })]
      });
    default:
      return /*#__PURE__*/jsx(Fragment, {});
  }
};

function _typeof$3(obj) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$3(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$3(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(arg) { var key = _toPrimitive$3(arg, "string"); return _typeof$3(key) === "symbol" ? key : String(key); }
function _toPrimitive$3(input, hint) { if (_typeof$3(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$3(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getIconProps(activity) {
  var isOutgoing = activity.direction === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  switch (activity.activityType) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return {
        name: isOutgoing ? 'emailOutgoingAlter' : 'emailIncomingAlter',
        color: isOutgoing ? 'tangerine' : 'lightestTangerine',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return {
        name: 'calendar',
        color: 'extraMeeting',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return {
        name: isOutgoing ? 'callOutgoing' : 'callIncoming',
        color: activity.direction === DIRECTION_VALUES_LOGIC_ROLE.MISSED ? 'extraMeeting' : 'extraCall',
        size: 16
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return {
        name: 'linkedin',
        color: 'darkBloobirds',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return {
        name: 'noteAction',
        color: 'peanut',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return {
        name: 'download',
        color: 'banana',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      return {
        name: 'cadence',
        color: 'lightPurple',
        size: 20
      };
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
      {
        var activityStatusUpdate = activity.statusTitle;
        var isLeadStatusUpdate = activityStatusUpdate === null || activityStatusUpdate === void 0 ? void 0 : activityStatusUpdate.toLowerCase().includes('lead');
        var isOpportunityStatusUpdate = activityStatusUpdate === null || activityStatusUpdate === void 0 ? void 0 : activityStatusUpdate.toLowerCase().includes('opportunity');
        return {
          name: isLeadStatusUpdate ? 'person' : isOpportunityStatusUpdate ? 'fileOpportunity' : 'company',
          color: 'softPeanut',
          size: 20
        };
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      //TODO meh
      return activity.iconProps;
  }
}
var IconComponent = function IconComponent(_ref) {
  var sidePeekEnabled = _ref.sidePeekEnabled,
    activity = _ref.activity;
  var iconProps = getIconProps(activity);
  return /*#__PURE__*/jsx("div", {
    className: sidePeekEnabled && styles$2.emailIcon,
    children: /*#__PURE__*/jsx(Icon, _objectSpread$1({}, iconProps))
  });
};

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var RightIconComponent = function RightIconComponent(_ref) {
  var _parsedAttachedFiles$, _activity$casesLinked, _activity$casesLinked4, _activity$casesLinked5, _activity$casesLinked6, _activity$casesLinked7, _activity$casesLinked8, _settings$account2;
  var activity = _ref.activity,
    sidePeekEnabled = _ref.sidePeekEnabled,
    userId = _ref.userId,
    disableButtons = _ref.disableButtons,
    actionsDisabled = _ref.actionsDisabled,
    openContactFlow = _ref.openContactFlow,
    openMeetingResult = _ref.openMeetingResult,
    openQuickLogModal = _ref.openQuickLogModal,
    customTasks = _ref.customTasks,
    syncStatus = _ref.syncStatus,
    extended = _ref.extended;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    dropdownVisible = _useState2[0],
    setDropdownVisible = _useState2[1];
  var _useActiveUserSetting = useActiveUserSettings(),
    settings = _useActiveUserSetting.settings;
  var activityCompany = activity.companyId;
  var activityIsReported = activity.reported === 'Yes';
  var activityAttachedFiles = activity.attachedFiles;
  var forgedIdFields = forgeIdFieldsFromIdValue$1(activity.bobjectId);
  var parsedAttachedFiles = activityAttachedFiles && JSON.parse(activityAttachedFiles);
  var parsedAttachments = activity.attachments && JSON.parse(activity.attachments);
  var hasAttachedFiles = activityAttachedFiles && (parsedAttachedFiles === null || parsedAttachedFiles === void 0 ? void 0 : (_parsedAttachedFiles$ = parsedAttachedFiles.filter(function (att) {
    return !!att;
  })) === null || _parsedAttachedFiles$ === void 0 ? void 0 : _parsedAttachedFiles$.length) !== 0;
  var isBouncedEmail = activity.bouncedEmail;
  var leadAssignee = activity.leadAssignedTo;
  var oppAssignee = activity.opportunityAssignedTo;
  var callDuration = activity.callDuration;
  var hasAudioRecording = activity.callRecording;
  var assignedToActiveUser = leadAssignee === userId || oppAssignee === userId;
  var showStatusWarning = extended && syncStatus !== undefined && !syncStatus;
  var customTask = activity.customTaskId && (customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === activity.customTaskId;
  }));
  var emailClasses = clsx(styles$2.rightIcons, _defineProperty$2({}, styles$2.emailIconSize, sidePeekEnabled));
  var meetingClasses = clsx(styles$2.rightIcons, _defineProperty$2({}, styles$2.rightIcon, sidePeekEnabled));
  var callClasses = clsx(styles$2.descriptionContainer, _defineProperty$2({}, styles$2.rightIcon, sidePeekEnabled));
  var activityTypeLogicRole = activity.activityType;
  var activityUser = activity === null || activity === void 0 ? void 0 : activity.activityUser;
  var assigneeComponent = activityUser ? /*#__PURE__*/jsx(AssigneeComponent, {
    value: activity === null || activity === void 0 ? void 0 : activity.activityUser,
    size: sidePeekEnabled ? 's' : 'xs'
  }) : /*#__PURE__*/jsx(Fragment, {});
  var isWhatsAppBusiness = (activity === null || activity === void 0 ? void 0 : activity.customTaskName) === CUSTOM_TASK_LOGIC_ROLE.WHATSAPP_BUSINESS;
  var handleClickOnCase = function handleClickOnCase(caseId) {
    var _settings$account;
    window.open((settings === null || settings === void 0 ? void 0 : (_settings$account = settings.account) === null || _settings$account === void 0 ? void 0 : _settings$account.salesforceInstance) + '/' + caseId, '_blank');
  };
  var linkedCases = activity !== null && activity !== void 0 && activity.casesLinked && (activity === null || activity === void 0 ? void 0 : (_activity$casesLinked = activity.casesLinked) === null || _activity$casesLinked === void 0 ? void 0 : _activity$casesLinked.length) >= 1 ? /*#__PURE__*/jsxs("span", {
    onClick: function onClick(event) {
      var _activity$casesLinked2;
      event.preventDefault();
      event.stopPropagation();
      if ((activity === null || activity === void 0 ? void 0 : (_activity$casesLinked2 = activity.casesLinked) === null || _activity$casesLinked2 === void 0 ? void 0 : _activity$casesLinked2.length) > 1) {
        setDropdownVisible(!dropdownVisible);
      } else {
        var _activity$casesLinked3;
        handleClickOnCase(activity === null || activity === void 0 ? void 0 : (_activity$casesLinked3 = activity.casesLinked) === null || _activity$casesLinked3 === void 0 ? void 0 : _activity$casesLinked3[0].Id);
      }
    },
    className: styles$2.caseIcon,
    children: [/*#__PURE__*/jsx(Icon, {
      name: 'briefcase',
      size: 16
    }), /*#__PURE__*/jsx(Text, {
      size: "xs",
      color: "bloobirds",
      ellipsis: 40,
      children: (activity === null || activity === void 0 ? void 0 : (_activity$casesLinked4 = activity.casesLinked) === null || _activity$casesLinked4 === void 0 ? void 0 : _activity$casesLinked4.length) == 1 ? 'Nº ' + (activity === null || activity === void 0 ? void 0 : (_activity$casesLinked5 = activity.casesLinked) === null || _activity$casesLinked5 === void 0 ? void 0 : _activity$casesLinked5[0].CaseNumber) : (activity === null || activity === void 0 ? void 0 : (_activity$casesLinked6 = activity.casesLinked) === null || _activity$casesLinked6 === void 0 ? void 0 : _activity$casesLinked6.length) + ' Cases'
    }), (activity === null || activity === void 0 ? void 0 : (_activity$casesLinked7 = activity.casesLinked) === null || _activity$casesLinked7 === void 0 ? void 0 : _activity$casesLinked7.length) > 1 && /*#__PURE__*/jsx(Dropdown, {
      visible: dropdownVisible,
      anchor: /*#__PURE__*/jsx(Fragment, {}),
      children: activity === null || activity === void 0 ? void 0 : (_activity$casesLinked8 = activity.casesLinked) === null || _activity$casesLinked8 === void 0 ? void 0 : _activity$casesLinked8.map(function (caseItem, index) {
        return /*#__PURE__*/jsxs("div", {
          className: styles$2.caseItem,
          onClick: function onClick(event) {
            event.stopPropagation();
            event.preventDefault();
            handleClickOnCase(caseItem.Id);
          },
          children: [/*#__PURE__*/jsx(Icon, {
            name: 'briefcase',
            size: 16
          }), /*#__PURE__*/jsx(Text, {
            size: "xs",
            color: "bloobirds",
            children: 'Nº ' + caseItem.CaseNumber
          })]
        }, index);
      })
    })]
  }) : '';
  var aiAnalysisEnabled = useAiAnalysisEnabled(settings === null || settings === void 0 ? void 0 : (_settings$account2 = settings.account) === null || _settings$account2 === void 0 ? void 0 : _settings$account2.id);
  var canShowAnalysis = aiAnalysisEnabled && (activity === null || activity === void 0 ? void 0 : activity.hasCopilot);
  var openAIInNewTab = function openAIInNewTab(e, activityType) {
    e.stopPropagation();
    var activityId = forgedIdFields === null || forgedIdFields === void 0 ? void 0 : forgedIdFields.objectId;
    var url = "/app/ai-analysis/".concat(activityType, "/").concat(activityId);
    window.open(baseUrls["development"] + url, '_blank');
  };
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM:
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_TO:
      if (activity) {
        return assigneeComponent;
      } else {
        return /*#__PURE__*/jsx(Fragment, {});
      }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return /*#__PURE__*/jsxs("div", {
        className: emailClasses,
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'email',
          id: forgedIdFields
        }), isBouncedEmail && /*#__PURE__*/jsx(Tooltip, {
          title: t('activityTimelineItem.item.bounced'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            className: styles$2.bouncedEmail,
            name: "statusCircle",
            size: 6,
            color: "extraMeeting"
          })
        }), hasAttachedFiles && /*#__PURE__*/jsx(AttachmentsDropdown, {
          attachedFiles: parsedAttachedFiles,
          betterAttachments: parsedAttachments
        }), /*#__PURE__*/jsx(NewEmailIcons, {
          activity: activity
        }), assigneeComponent]
      }, "email-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return /*#__PURE__*/jsxs("div", {
        className: meetingClasses,
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'meeting',
          id: forgedIdFields
        }), canShowAnalysis && /*#__PURE__*/jsx(Tooltip, {
          title: t('common.openInNewTab'),
          position: "top",
          children: /*#__PURE__*/jsx(IconButton, {
            className: styles$2.aiAnalysisIcon,
            name: "magic",
            size: 14,
            color: "purple",
            onClick: function onClick(e) {
              return openAIInNewTab(e, 'meeting');
            }
          })
        }), /*#__PURE__*/jsx(ReportedIconButton, {
          isReported: activityIsReported,
          actionsDisabled: actionsDisabled && !assignedToActiveUser,
          disableReport: disableButtons,
          onClick: openMeetingResult
        }), assigneeComponent]
      }, "meeting-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return /*#__PURE__*/jsxs("div", {
        className: callClasses,
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'call',
          id: forgedIdFields
        }), canShowAnalysis && /*#__PURE__*/jsx(Tooltip, {
          title: t('common.openInNewTab'),
          position: "top",
          children: /*#__PURE__*/jsx(IconButton, {
            className: styles$2.aiAnalysisIcon,
            name: "magic",
            size: 14,
            color: "purple",
            onClick: function onClick(e) {
              return openAIInNewTab(e, 'call');
            }
          })
        }), /*#__PURE__*/jsx(ReportedIconButton, {
          isReported: activityIsReported,
          actionsDisabled: actionsDisabled && !assignedToActiveUser,
          disableReport: disableButtons,
          onClick: openContactFlow
        }), hasAudioRecording && /*#__PURE__*/jsx(Tooltip, {
          title: t('common.recording'),
          position: "top",
          children: /*#__PURE__*/jsx(Icon, {
            name: "voicemail",
            color: "bloobirds",
            size: 12
          })
        }), !!callDuration && /*#__PURE__*/jsx(Text, {
          size: "xxs",
          color: "softPeanut",
          children: new Date(callDuration * 1000).toISOString().substring(14, 19)
        }), assigneeComponent]
      }, "call-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return /*#__PURE__*/jsxs(Fragment$1, {
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'message',
          id: forgedIdFields
        }), assigneeComponent]
      }, "linkedIn-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return /*#__PURE__*/jsxs(Fragment$1, {
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'note',
          id: forgedIdFields
        }), assigneeComponent]
      }, "note-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return /*#__PURE__*/jsxs(Fragment$1, {
        children: [showStatusWarning && /*#__PURE__*/jsx(InfoWarningSync, {
          type: 'activity',
          id: forgedIdFields
        }), assigneeComponent]
      }, "inbound-rightIcon");
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return /*#__PURE__*/jsxs("div", {
        className: styles$2.rightIcons,
        children: [!disableButtons && /*#__PURE__*/jsx(IconButton, {
          name: "edit",
          size: 16,
          onClick: function onClick(e) {
            e.stopPropagation();
            api.get("/bobjects/".concat(activity === null || activity === void 0 ? void 0 : activity.bobjectId, "/form?injectReferences=true")).then(function (data) {
              var bobjectActivity = injectReferencesGetProcess(data === null || data === void 0 ? void 0 : data.data);
              openQuickLogModal({
                customTask: customTask,
                leads: [],
                selectedBobject: getReferencedBobject(bobjectActivity),
                companyId: activityCompany,
                onSubmit: function onSubmit() {
                  window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                    detail: {
                      type: BobjectTypes.Activity
                    }
                  }));
                },
                isEdition: true,
                activity: bobjectActivity
              });
              mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_EDIT_CUSTOM_ACTIVITY);
            });
          }
        }), isWhatsAppBusiness && linkedCases, assigneeComponent]
      }, "customTask-rightIcon");
    default:
      return /*#__PURE__*/jsx(Fragment, {});
  }
};

var getSubtitle = function getSubtitle(activity, sidePeekEnabled) {
  if (activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE) {
    var activityNote = activity.note;
    return activityNote && !sidePeekEnabled ? removeHtmlTags(activityNote) : null;
  }
  if (activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND) {
    return activity.inboundFormName ? activity.inboundFormName : '';
  }
};
var SubtitleComponent = function SubtitleComponent(_ref) {
  var activity = _ref.activity,
    sidePeekEnabled = _ref.sidePeekEnabled,
    alternativeDescription = _ref.alternativeDescription;
  var subtitle = getSubtitle(activity, sidePeekEnabled);
  var meetingDuration = activity.meetingDuration;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [subtitle && /*#__PURE__*/jsx(Text, {
      size: "xs",
      className: styles$2.activityHeaderSubtitle,
      children: subtitle
    }), !!meetingDuration && !alternativeDescription && /*#__PURE__*/jsx("div", {
      className: styles$2.meetingDuration,
      children: /*#__PURE__*/jsx(MeetingDurationInfo, {
        meetingDuration: meetingDuration
      })
    })]
  });
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NewActivityTimelineItem = function NewActivityTimelineItem(_ref) {
  var _ref$current, _ref$current$firstChi, _ref$current$firstChi2, _ref$current2, _ref$current2$firstCh, _ref$current2$firstCh2;
  var activity = _ref.activity,
    onClick = _ref.onClick,
    startDisplayDivider = _ref.startDisplayDivider,
    endDisplayDivider = _ref.endDisplayDivider,
    _ref$activeHover = _ref.activeHover,
    activeHover = _ref$activeHover === void 0 ? true : _ref$activeHover,
    extended = _ref.extended,
    _ref$alternativeDescr = _ref.alternativeDescription,
    alternativeDescription = _ref$alternativeDescr === void 0 ? false : _ref$alternativeDescr,
    userId = _ref.userId,
    actionsDisabled = _ref.actionsDisabled,
    sidePeekEnabled = _ref.sidePeekEnabled,
    disableButtons = _ref.disableButtons,
    hovering = _ref.hovering,
    openContactFlow = _ref.openContactFlow,
    openMeetingResult = _ref.openMeetingResult,
    openQuickLogModal = _ref.openQuickLogModal,
    customTasks = _ref.customTasks,
    syncStatus = _ref.syncStatus;
  var trans = useTranslation();
  var t = trans.t;
  if (!activity) {
    return null;
  }
  var forgedIdFields = forgeIdFieldsFromIdValue(activity.bobjectId);
  var activityType = activity.activityType;
  var activityDirection = activity.direction;
  //TODO check this
  var activityTime = activity.activityTime;
  if (!activityType) {
    return null;
  }

  // @ts-ignore
  var ref = useRef();
  var showTooltip =
  // @ts-ignore
  (ref === null || ref === void 0 ? void 0 : (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$firstChi = _ref$current.firstChild) === null || _ref$current$firstChi === void 0 ? void 0 : (_ref$current$firstChi2 = _ref$current$firstChi.firstChild) === null || _ref$current$firstChi2 === void 0 ? void 0 : _ref$current$firstChi2.offsetWidth) < ( // @ts-ignore
  ref === null || ref === void 0 ? void 0 : (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$firstCh = _ref$current2.firstChild) === null || _ref$current2$firstCh === void 0 ? void 0 : (_ref$current2$firstCh2 = _ref$current2$firstCh.firstChild) === null || _ref$current2$firstCh2 === void 0 ? void 0 : _ref$current2$firstCh2.scrollWidth);
  var timelineItemWrapperClasses = clsx(styles$2.timeline_item_wrapper, _defineProperty$1({}, styles$2.timeline_item_wrapper_sidePeek, sidePeekEnabled));
  var customTask = activity.customTaskId && (customTasks === null || customTasks === void 0 ? void 0 : customTasks.find(function (ct) {
    return ct.id === activity.customTaskId;
  }));
  var activitySubject = getActivitySubject(activity, t, customTask === null || customTask === void 0 ? void 0 : customTask.name);
  var activityDataProps = useMemo(function () {
    return {
      date: getTimeToShow(activityTime, trans),
      description: /*#__PURE__*/jsx(DescriptionComponent, {
        activity: activity,
        sidePeekEnabled: sidePeekEnabled,
        alternativeDescription: alternativeDescription
      }),
      color: getActivityTypeColor(activity.activityType, activityDirection, customTask === null || customTask === void 0 ? void 0 : customTask.iconColor),
      icon: /*#__PURE__*/jsx(IconComponent, {
        activity: _objectSpread(_objectSpread({}, activity), customTask ? {
          iconProps: {
            name: customTask.icon,
            color: 'white',
            size: 14
          }
        } : {}),
        sidePeekEnabled: sidePeekEnabled
      }),
      rightIcon: /*#__PURE__*/jsx(RightIconComponent, {
        activity: activity,
        sidePeekEnabled: sidePeekEnabled,
        userId: userId,
        disableButtons: disableButtons,
        actionsDisabled: actionsDisabled,
        openContactFlow: openContactFlow,
        openMeetingResult: openMeetingResult,
        openQuickLogModal: openQuickLogModal,
        customTasks: customTasks,
        syncStatus: syncStatus,
        extended: extended
      })
    };
  }, [activityType]);
  var syncName = getSyncName(activity.activityType);
  var hasSubtitle = activity.activityType === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE && activity.note || ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND && activity.inboundFormName;
  return /*#__PURE__*/jsx("div", {
    className: timelineItemWrapperClasses,
    children: /*#__PURE__*/jsx(TimelineItem, {
      size: "small"
      //@ts-ignore we should update the description typing in flamingo
      ,
      data: activityDataProps,
      startDisplayDivider: startDisplayDivider,
      endDisplayDivider: endDisplayDivider,
      onClick: onClick ? function () {
        return onClick(activity);
      } : undefined,
      backgroundColor: "lightestBloobirds",
      activeHover: activeHover,
      isHovering: hovering,
      children: /*#__PURE__*/jsxs("div", {
        className: styles$2.activityHeader,
        ref: ref,
        children: [!extended && syncName && syncStatus !== undefined && !syncStatus && /*#__PURE__*/jsx(InfoWarningSync, {
          type: syncName,
          id: forgedIdFields
        }), /*#__PURE__*/jsx("div", {
          className: styles$2.activityHeaderTitleWrapper,
          children: /*#__PURE__*/jsx(Tooltip, {
            title: showTooltip && activitySubject,
            position: "top",
            delay: 200,
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              weight: "bold",
              className: clsx(styles$2.activityHeaderTitle, _defineProperty$1(_defineProperty$1({}, styles$2.activityHeaderTitleEllipsis, !hasSubtitle), styles$2.activityHeaderTitleSidePeek, sidePeekEnabled)),
              children: activitySubject
            })
          })
        }), hasSubtitle && /*#__PURE__*/jsx(SubtitleComponent, {
          activity: activity,
          sidePeekEnabled: sidePeekEnabled,
          alternativeDescription: alternativeDescription
        })]
      })
    })
  });
};

var css_248z = ".activityTooltipBlock-module_timeline_item_wrapper__3-mvV {\n  transition: all 0.5s ease-out;\n}\n\n.activityTooltipBlock-module_timeline_item_wrapper__3-mvV > li {\n  padding-left: 14px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  background-color: var(--lightestPurple);\n}\n\n.activityTooltipBlock-module_sidePeek_timeline_item_wrapper__iHkrT > li {\n  padding-left: 18px;\n}\n\n.activityTooltipBlock-module_timeline_item_wrapper__3-mvV div[class*='TimelineItem-module_timeline_container'] > p {\n  white-space: normal !important;\n  overflow: visible !important;\n  text-overflow: unset !important;\n  display: flex !important;\n}\n\n.activityTooltipBlock-module_timeline_item_wrapper__3-mvV div[class*='TimelineItem-module_title_container'] > p {\n  width: 100%;\n}\n\n.activityTooltipBlock-module_timeline_item_wrapper__3-mvV > li > div:first-child > div:nth-child(2) > div {\n  width: 20px;\n  height: 20px;\n}\n\n.activityTooltipBlock-module_activityHeader__eU0pg {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  margin-bottom: 4px;\n  width: 100%;\n}\n\n.activityTooltipBlock-module_activityHeader__eU0pg > div {\n  display: flex;\n  max-width: 100%;\n}\n\n.activityTooltipBlock-module_activityHeaderTitleWrapper__kaRMv {\n  overflow: hidden;\n}\n\n.activityTooltipBlock-module_activityHeaderTitleWrapper__kaRMv > div {\n  max-width: 100%;\n}\n\n.activityTooltipBlock-module_activityHeaderTitle__O4GqX {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex-shrink: 0;\n}\n\n.activityTooltipBlock-module_learnMoreButton__Py4dm {\n  border: 1px solid var(--lightPurple) !important;\n  color: var(--purple) !important;\n  font-size: 11px !important;\n  padding: 2px !important;\n}\n\n.activityTooltipBlock-module_learnMoreButton__Py4dm svg > path {\n  fill: var(--purple);\n}\n\n.activityTooltipBlock-module_footer__6sFfF {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 8px 16px;\n  background: var(--lightestPurple);\n}\n";
var styles = {"timeline_item_wrapper":"activityTooltipBlock-module_timeline_item_wrapper__3-mvV","sidePeek_timeline_item_wrapper":"activityTooltipBlock-module_sidePeek_timeline_item_wrapper__iHkrT","activityHeader":"activityTooltipBlock-module_activityHeader__eU0pg","activityHeaderTitleWrapper":"activityTooltipBlock-module_activityHeaderTitleWrapper__kaRMv","activityHeaderTitle":"activityTooltipBlock-module_activityHeaderTitle__O4GqX","learnMoreButton":"activityTooltipBlock-module_learnMoreButton__Py4dm","footer":"activityTooltipBlock-module_footer__6sFfF"};
styleInject(css_248z);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var LearnMoreButton = function LearnMoreButton(_ref) {
  var url = _ref.url,
    mixpanelEvent = _ref.mixpanelEvent;
  var _useTranslation = useTranslation('translation', {
      keyPrefix: 'common'
    }),
    t = _useTranslation.t;
  return /*#__PURE__*/jsx(Button, {
    size: "small",
    color: "lightestPurple",
    variant: "primary",
    iconLeft: "book",
    uppercase: false,
    className: styles.learnMoreButton,
    onClick: function onClick() {
      window.open(url, '_blank');
      mixpanel.track(mixpanelEvent);
    },
    children: t('learnMore')
  });
};
var tooltipBlocks = function tooltipBlocks(t) {
  return [{
    id: 'EMAIL',
    title: t('emailTracking.title'),
    description: /*#__PURE__*/jsx(Text, {
      size: "xxs",
      color: "purple",
      children: /*#__PURE__*/jsx(Trans, {
        i18nKey: "activityTimelineItem.activityTooltip.emailTracking.description"
      })
    }),
    rightButton: /*#__PURE__*/jsx(LearnMoreButton, {
      url: "https://support.bloobirds.com/hc/en-us/articles/360016268860-Email-tracking",
      mixpanelEvent: MIXPANEL_EVENTS.ACTIVITY_EMAIL_TOOLTIP_BUTTON_CLICKED
    })
  }, {
    id: 'LINKEDIN',
    title: t('linkedinTracking.title'),
    description: /*#__PURE__*/jsx(Text, {
      size: "xxs",
      color: "purple",
      children: /*#__PURE__*/jsx(Trans, {
        i18nKey: "activityTimelineItem.activityTooltip.linkedinTracking.description"
      })
    }),
    rightButton: /*#__PURE__*/jsx(LearnMoreButton, {
      url: "https://support.bloobirds.com/hc/en-us/articles/360011435079-How-are-LinkedIn-messages-synchronised",
      mixpanelEvent: MIXPANEL_EVENTS.ACTIVITY_LINKEDIN_TOOLTIP_BUTTON_CLICKED
    })
  }];
};
var ActivityTooltipBlock = function ActivityTooltipBlock(_ref2) {
  var _ref2$sidePeekEnabled = _ref2.sidePeekEnabled,
    sidePeekEnabled = _ref2$sidePeekEnabled === void 0 ? false : _ref2$sidePeekEnabled;
  var _useUserHelpers = useUserHelpers(),
    save = _useUserHelpers.save,
    has = _useUserHelpers.has;
  var _useTranslation2 = useTranslation('translation', {
      keyPrefix: 'activityTimelineItem.activityTooltip'
    }),
    t = _useTranslation2.t;
  var banishTooltip = function banishTooltip() {
    mixpanel.track(MIXPANEL_EVENTS.ACTIVITY_TOOLTIP_BLOCK_MARKED_AS_HIDDEN);
    save(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK);
  };
  return !has(ExtensionHelperKeys.ACTIVITY_TIMELINE_TOOLTIP_BLOCK) ? /*#__PURE__*/jsxs("div", {
    className: clsx(styles.timeline_item_wrapper, _defineProperty({}, styles.sidePeek_timeline_item_wrapper, sidePeekEnabled)),
    children: [tooltipBlocks(t).map(function (tooltipBlock, index) {
      return /*#__PURE__*/jsx(TimelineItem, {
        size: "small"
        // @ts-ignore
        ,
        data: {
          icon: 'suggestions',
          color: 'verySoftPurple',
          iconColor: 'lightPurple',
          //@ts-ignore
          description: /*#__PURE__*/jsx("div", {
            children: tooltipBlock.description
          })
        },
        startDisplayDivider: true,
        endDisplayDivider: tooltipBlock.id !== 'LINKEDIN',
        backgroundColor: "purple",
        activeHover: false,
        children: /*#__PURE__*/jsxs("div", {
          className: styles.activityHeader,
          children: [/*#__PURE__*/jsx("div", {
            className: styles.activityHeaderTitleWrapper,
            children: /*#__PURE__*/jsx(Text, {
              size: "xs",
              weight: "bold",
              color: "purple",
              className: clsx(styles.activityHeaderTitle),
              children: tooltipBlock.title
            })
          }), tooltipBlock.rightButton]
        })
      }, index + tooltipBlock.id);
    }), /*#__PURE__*/jsxs("div", {
      className: styles.footer,
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
        size: "xxs",
        children: t('doNotShowThisAgain')
      })]
    })]
  }) : /*#__PURE__*/jsx(Fragment, {});
};

export { ActivityTimelineItem, ActivityTimelineItemWrapped, ActivityTooltipBlock, AttachmentsDropdown, BobjectName, MeetingDurationInfo, NewActivityTimelineItem };
//# sourceMappingURL=index.js.map
