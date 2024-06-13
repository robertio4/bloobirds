import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/meetingCard/meetingCard.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/meetingCard/meetingCard.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/meetingCard/meetingCard.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport2_react["useState"];
import { useTranslation, Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { GoogleMeet, GoToMeeting, MicrosoftTeams, Webex, Zoom, Video } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-activityFeed-dist-index.js.js";
import { Card, CardBody, CardButton, CardContent, CardHeader, CircularBadge, Icon, Spinner, Text, Tooltip } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useCopilotEnabled, useIsB2CAccount, useMinimizableModals, useUserSearch, useUserSettings } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import { useGetI18nSpacetime } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-internationalization-src-index.tsx.js";
import { MeetingResultField, MeetingTypeField } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-index.tsx.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, BobjectTypes, COMPANY_FIELDS_LOGIC_ROLE, companyUrl, LEAD_FIELDS_LOGIC_ROLE, MessagesEvents, REPORTED_VALUES_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
import { api, getFieldByLogicRole, getRelatedBobject, getTextFromLogicRole, isHtml, leadUrl, isStringifiedJSON, toSentenceCase } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { useWizardContext, WIZARD_MODALS } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-wizardModalContext-dist-index.js.js";
import clsx from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { ExtendedContextTypes } from "/src/types/extendedContext.ts.js";
import { getReferencedBobject, getValueFromLogicRole } from "/src/utils/bobjects.utils.ts.js";
import { NameComponent } from "/src/content/components/card/fieldTypeComponent.tsx.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import { CopilotAnalysisIndicator } from "/src/content/components/extensionLeftBar/components/views/shared/CopilotAnalysisIndicator.tsx.js";
import styles from "/src/content/components/meetingCard/meetingCard.module.css.js";
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
const inviteeStatus = {
  yes: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "extension.card.inviteeStatus.yes"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 8
  }, void 0),
  no: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "extension.card.inviteeStatus.no"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 7
  }, void 0),
  maybe: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "extension.card.inviteeStatus.maybe"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 66,
    columnNumber: 10
  }, void 0),
  noreply: /* @__PURE__ */ _jsxDEV(Trans, {
    i18nKey: "extension.card.inviteeStatus.noReply"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 67,
    columnNumber: 12
  }, void 0)
};
function parseInviteesPerStatus(arr) {
  const statusCounts = {};
  for (const item of arr) {
    const status = item?.status;
    if (status) {
      if (statusCounts[status]) {
        statusCounts[status] += 1;
      } else {
        statusCounts[status] = 1;
      }
    } else {
      if (statusCounts["noreply"]) {
        statusCounts["noreply"] += 1;
      } else {
        statusCounts["noreply"] = 1;
      }
    }
  }
  return {
    yes: statusCounts?.yes || 0,
    no: statusCounts?.no || 0,
    maybe: statusCounts?.maybe || 0,
    noreply: statusCounts?.noreply || 0
  };
}
export const MeetingCard = ({
  activity,
  mutate
}) => {
  _s();
  const {
    setContactViewBobjectId,
    setExtendedContext,
    refreshExtendedScreenBobject
  } = useExtensionContext();
  const {
    openWizard
  } = useWizardContext();
  const {
    t
  } = useTranslation();
  const {
    openMinimizableModal
  } = useMinimizableModals();
  const [loading, setIsLoading] = useState(false);
  const [isReported, setIsReported] = useState(getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole === REPORTED_VALUES_LOGIC_ROLE.YES);
  const isB2CAccount = useIsB2CAccount();
  const meetingLead = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const meetingCompany = !isB2CAccount ? getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject : null;
  const activityTitle = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TITLE);
  const user = getValueFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const meetingInvitees = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES);
  const parsedInvitees = meetingInvitees ? JSON.parse(meetingInvitees) : null;
  const inviteesPerStatus = parsedInvitees ? parseInviteesPerStatus(parsedInvitees) : null;
  const note = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const meetingResultField = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT);
  const scheduledDate = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TIME);
  const scheduledDateTime = useGetI18nSpacetime(scheduledDate).unixFmt("E dd MMM yyyy \xB7 HH:mm");
  const conferencingJson = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CONFERENCING);
  const conferencingParsed = conferencingJson && isStringifiedJSON(conferencingJson) && JSON.parse(conferencingJson);
  const meetingResultLogicRole = meetingResultField?.valueLogicRole;
  const isCancelled = meetingResultLogicRole === "ACTIVITY__MEETING_RESULT__CANCELLED";
  const noteToShow = isHtml(note) ? /* @__PURE__ */ _jsxDEV("div", {
    className: styles.meeting_card_note,
    dangerouslySetInnerHTML: {
      __html: note
    },
    style: {
      fontSize: "8px !important"
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 141,
    columnNumber: 5
  }, void 0) : note;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find((u) => u?.id === user);
  const meetingType = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const meetingResultValue = meetingResultField?.text;
  const copilotAnalysis = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS);
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);
  function openMeetingModal() {
    const bobjectFieldsData = {};
    activity.fields.forEach((field) => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const company = getRelatedBobject(activity, "Company");
    const lead = getRelatedBobject(activity, "Lead");
    openMinimizableModal({
      type: "calendarMeeting",
      bobject: activity,
      data: {
        company: company ? {
          name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          url: companyUrl(company),
          data: company
        } : void 0,
        lead: lead && {
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(lead, null),
          data: lead
        },
        ...bobjectFieldsData
      },
      onSave: () => {
        if (mutate) {
          mutate();
        }
        window.dispatchEvent(new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
          detail: {
            type: BobjectTypes.Activity
          }
        }));
      },
      onClose: () => null
    });
  }
  const referencedBobject = getReferencedBobject(activity);
  const onCardClick = () => {
    setContactViewBobjectId(referencedBobject?.id?.value);
    setExtendedContext({
      type: ExtendedContextTypes.MEETING_DETAILS,
      bobject: activity
    });
  };
  const reportResult = () => {
    setIsLoading(true);
    const accountId = activity?.id?.accountId;
    const activityId = activity?.id?.objectId;
    const activityData = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED]: REPORTED_VALUES_LOGIC_ROLE.YES
    };
    api.patch(`/bobjects/${accountId}/Activity/${activityId}/raw`, activityData).then(() => {
      if (mutate) {
        mutate();
      }
      setIsReported(true);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent("ACTIVE_BOBJECT_UPDATED", {
        detail: {
          type: BobjectTypes.Activity
        }
      }));
    });
  };
  function getText() {
    if (isReported) {
      return /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "leftBar.filters.reported"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 234,
        columnNumber: 14
      }, this);
    } else if (isCancelled) {
      if (loading) {
        return /* @__PURE__ */ _jsxDEV(Spinner, {
          name: "loadingCircle",
          size: 12,
          color: "melon"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 16
        }, this);
      } else {
        return /* @__PURE__ */ _jsxDEV(Trans, {
          i18nKey: "extension.card.markAsReported"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 239,
          columnNumber: 16
        }, this);
      }
    } else {
      return /* @__PURE__ */ _jsxDEV(Trans, {
        i18nKey: "common.reportResult"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 242,
        columnNumber: 14
      }, this);
    }
  }
  function getColor(status) {
    if (status === "yes") {
      return "extraCall";
    } else if (status === "no") {
      return "tomato";
    } else {
      return "peanut";
    }
  }
  function getIcon(provider) {
    switch (provider) {
      case "Google Meet":
        return GoogleMeet;
      case "Zoom Meeting":
        return Zoom;
      case "Microsoft Teams":
        return MicrosoftTeams;
      case "WebEx":
        return Webex;
      case "GoToMeeting":
        return GoToMeeting;
      default:
        return Video;
    }
  }
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles._meeting_card,
    children: /* @__PURE__ */ _jsxDEV(Card, {
      size: "small",
      expand: true,
      onClick: onCardClick,
      children: [/* @__PURE__ */ _jsxDEV(CardHeader, {
        children: [/* @__PURE__ */ _jsxDEV(Icon, {
          name: "calendar",
          color: "tomato",
          size: 14,
          className: styles._meeting_icon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 277,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ _jsxDEV(CardBody, {
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles._meeting_title,
            children: /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: activityTitle || "Untitled meeting",
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(Text, {
                className: styles.activityTitle,
                size: "xs",
                weight: "bold",
                children: activityTitle || t("extension.card.bobjectNameUndefined", {
                  bobjectType: toSentenceCase(t("bobjectTypes.meeting"))
                })
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 281,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 280,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 279,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: styles._meeting_user,
            children: [isCopilotEnabled && copilotAnalysis && /* @__PURE__ */ _jsxDEV(CopilotAnalysisIndicator, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 290,
              columnNumber: 55
            }, void 0), assigneeUser && /* @__PURE__ */ _jsxDEV(Tooltip, {
              title: `User: ${assigneeUser?.name}`,
              position: "top",
              children: /* @__PURE__ */ _jsxDEV(CircularBadge, {
                style: {
                  fontSize: "8px"
                },
                backgroundColor: assigneeUser?.color || "lightPeanut",
                size: "s",
                className: styles.assign_badge,
                children: assigneeUser?.shortname || "U"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 293,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 292,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 289,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 278,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 276,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ _jsxDEV(CardContent, {
        children: /* @__PURE__ */ _jsxDEV("div", {
          className: styles.meeting_container,
          children: [/* @__PURE__ */ _jsxDEV("div", {
            className: styles.meeting_content,
            children: [/* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "bookmark",
                color: "verySoftBloobirds",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 310,
                columnNumber: 17
              }, void 0), meetingType && /* @__PURE__ */ _jsxDEV(MeetingTypeField, {
                activity,
                styles: {
                  padding: "0 4px",
                  marginLeft: "4px"
                },
                onUpdate: (cb) => {
                  mutate?.().then(() => {
                    cb();
                  });
                  refreshExtendedScreenBobject();
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 312,
                columnNumber: 19
              }, void 0), meetingResultField && meetingResultValue && /* @__PURE__ */ _jsxDEV(MeetingResultField, {
                activity,
                styles: {
                  padding: "0 4px",
                  marginLeft: "8px"
                },
                onUpdate: (cb) => {
                  mutate?.().then(() => {
                    cb();
                  });
                  refreshExtendedScreenBobject();
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 328,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 309,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              children: [meetingLead && /* @__PURE__ */ _jsxDEV("div", {
                className: styles._callCard_body__link,
                children: /* @__PURE__ */ _jsxDEV(NameComponent, {
                  bobject: meetingLead,
                  value: meetingLead,
                  showIcon: true
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 347,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 346,
                columnNumber: 19
              }, void 0), meetingCompany && /* @__PURE__ */ _jsxDEV("div", {
                className: styles._callCard_body__link,
                children: /* @__PURE__ */ _jsxDEV(NameComponent, {
                  bobject: meetingCompany,
                  value: meetingCompany,
                  showIcon: true
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 352,
                  columnNumber: 21
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 351,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 344,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "clock",
                color: "verySoftBloobirds",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 361,
                columnNumber: 17
              }, void 0), scheduledDateTime && /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: "peanut",
                className: styles.meeting_time_text,
                children: scheduledDateTime
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 363,
                columnNumber: 19
              }, void 0), conferencingParsed && /* @__PURE__ */ _jsxDEV("span", {
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (conferencingParsed?.details?.url) {
                    window.open(conferencingParsed?.details?.url, "_blank");
                  }
                },
                className: styles.conferencing,
                children: [/* @__PURE__ */ _jsxDEV("img", {
                  src: getIcon(conferencingParsed?.provider),
                  alt: "meet-icon",
                  className: styles.img
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 378,
                  columnNumber: 21
                }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                  size: "xs",
                  weight: "bold",
                  color: "bloobirds",
                  className: styles.conferencing_text,
                  ellipsis: 24,
                  children: t("extension.card.join", {
                    value: conferencingParsed?.provider
                  })
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 383,
                  columnNumber: 21
                }, void 0)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 368,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 360,
              columnNumber: 15
            }, void 0), parsedInvitees?.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "people",
                color: "verySoftBloobirds",
                size: 16
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 397,
                columnNumber: 19
              }, void 0), /* @__PURE__ */ _jsxDEV("div", {
                className: styles.invitees,
                children: [/* @__PURE__ */ _jsxDEV(Text, {
                  size: "xs",
                  color: "peanut",
                  weight: "bold",
                  children: t("extension.card.invitees", {
                    count: parsedInvitees?.length || 0
                  })
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 399,
                  columnNumber: 21
                }, void 0), Object.keys(inviteesPerStatus)?.map((status) => {
                  const numberOfInvitees = inviteesPerStatus[status];
                  if (numberOfInvitees > 0) {
                    return /* @__PURE__ */ _jsxDEV(Text, {
                      size: "xs",
                      color: getColor(status),
                      children: [numberOfInvitees, " ", inviteeStatus[status]]
                    }, void 0, true, {
                      fileName: _jsxFileName,
                      lineNumber: 406,
                      columnNumber: 27
                    }, void 0);
                  } else {
                    return /* @__PURE__ */ _jsxDEV(_Fragment, {}, void 0, false);
                  }
                })]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 398,
                columnNumber: 19
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 396,
              columnNumber: 17
            }, void 0), noteToShow && note !== "null" && /* @__PURE__ */ _jsxDEV("div", {
              className: styles.card_content,
              children: /* @__PURE__ */ _jsxDEV(Text, {
                className: clsx(styles._callCard_body__text, styles.meeting_card_note),
                size: "xxs",
                children: [/* @__PURE__ */ _jsxDEV("b", {
                  children: [t("common.note"), ":"]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 423,
                  columnNumber: 21
                }, void 0), " ", noteToShow]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 419,
                columnNumber: 19
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 418,
              columnNumber: 17
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 308,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ _jsxDEV("div", {
            className: clsx(styles.meetingCard_buttons, {
              [styles.visible_buttons]: false
            }),
            children: [/* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              variant: "secondary",
              iconLeft: "edit",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                openMeetingModal();
              },
              className: styles._meeting_button,
              uppercase: false,
              children: t("common.edit")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 433,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ _jsxDEV(CardButton, {
              size: "small",
              variant: "primary",
              iconLeft: "thumbsUp",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isReported) {
                  openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                    onSaveCallback: refreshExtendedScreenBobject,
                    referenceBobject: referencedBobject
                  });
                } else {
                  if (isCancelled) {
                    reportResult();
                  } else {
                    openWizard(WIZARD_MODALS.MEETING_RESULT, activity, {
                      onSaveCallback: refreshExtendedScreenBobject,
                      referenceBobject: referencedBobject
                    });
                  }
                }
              },
              color: isReported || loading ? "verySoftMelon" : "bloobirds",
              className: clsx(styles._meeting_button, {
                [styles._meeting_button_reported]: isReported
              }),
              uppercase: false,
              children: /* @__PURE__ */ _jsxDEV(Text, {
                size: "xs",
                color: isReported ? "melon" : "white",
                children: getText()
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 476,
                columnNumber: 17
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 447,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 428,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 307,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 306,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 274,
    columnNumber: 5
  }, void 0);
};
_s(MeetingCard, "qeyMLgSr7MHGvwpf+0E0QU4gWAw=", false, function() {
  return [useExtensionContext, useWizardContext, useTranslation, useMinimizableModals, useIsB2CAccount, useGetI18nSpacetime, useUserSearch, useUserSettings, useCopilotEnabled];
});
_c = MeetingCard;
var _c;
$RefreshReg$(_c, "MeetingCard");
if (import.meta.hot) {
  let isReactRefreshBoundary = function(mod) {
    if (mod == null || typeof mod !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const exportName in mod) {
      hasExports = true;
      if (exportName === "__esModule") {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(mod, exportName);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = mod[exportName];
      if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  };
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept((mod) => {
    if (isReactRefreshBoundary(mod)) {
      if (!window.__vite_plugin_react_timeout) {
        window.__vite_plugin_react_timeout = setTimeout(() => {
          window.__vite_plugin_react_timeout = 0;
          RefreshRuntime.performReactRefresh();
        }, 30);
      }
    } else {
      import.meta.hot.invalidate();
    }
  });
}
