import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingMenu/components/errorBoundary.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/components/errorBoundary.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/components/errorBoundary.tsx", _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"];
import { Controller, useForm } from "/vendor/.vite-deps-react-hook-form.js__v--457cf28b.js";
import { Trans } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { Button, Icon, Input, Text, TextArea, useToasts } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { useActiveUserSettings, useSentryUserFeedbackEnabled } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import * as Sentry from "/vendor/.vite-deps-@sentry_react.js__v--dfb3495e.js";
import { t } from "/vendor/.vite-deps-i18next.js__v--391007e5.js";
import { useExtensionContext } from "/src/content/components/context.tsx.js";
import styles from "/src/content/components/floatingMenu/components/errorBoundary.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const ErrorHandler = ({
  children
}) => {
  _s();
  const {
    resetExtensionContext
  } = useExtensionContext();
  const {
    control,
    handleSubmit,
    watch
  } = useForm();
  const {
    createToast
  } = useToasts();
  const {
    settings
  } = useActiveUserSettings();
  const hasSentryUserFeedbackEnabled = useSentryUserFeedbackEnabled(settings?.account?.id);
  const handleResetView = () => {
    resetExtensionContext();
    window.location.reload();
  };
  function onSubmit(data, eventId, error) {
    const filledData = {
      ...data,
      message: "User message: " + data?.message + "\nEvent ID:" + eventId + "\nError reported:" + error
    };
    Sentry.sendFeedback(filledData, {
      includeReplay: true
    }).then((res) => {
      if (res?.statusCode === 200) {
        createToast({
          type: "success",
          message: t("extension.errorHandling.toasts.success")
        });
      } else {
        createToast({
          type: "error",
          message: t("extension.errorHandling.toasts.error")
        });
      }
    }).finally(handleResetView);
  }
  useEffect(() => {
    Sentry.captureException(new Error("Bloobirds extension crash"), {
      tags: {
        module: "extensionCrash"
      }
    });
  }, []);
  return /* @__PURE__ */ _jsxDEV(Sentry.ErrorBoundary, {
    fallback: hasSentryUserFeedbackEnabled ? ({
      error,
      resetError,
      eventId
    }) => {
      const message = watch("message");
      const commentsNumberOfWords = message?.split(" ")?.length ?? 0;
      return /* @__PURE__ */ _jsxDEV("div", {
        className: styles.container,
        children: [/* @__PURE__ */ _jsxDEV("header", {
          className: styles.header,
          children: [/* @__PURE__ */ _jsxDEV(Icon, {
            name: "zap",
            size: 18,
            color: "white"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 21
          }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
            size: "m",
            weight: "bold",
            color: "white",
            children: /* @__PURE__ */ _jsxDEV(Trans, {
              i18nKey: "extension.errorHandling.title"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 74,
              columnNumber: 23
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 21
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 19
        }, void 0), /* @__PURE__ */ _jsxDEV("form", {
          children: /* @__PURE__ */ _jsxDEV("div", {
            className: styles.contentWrapper,
            children: [/* @__PURE__ */ _jsxDEV(Text, {
              size: "s",
              children: /* @__PURE__ */ _jsxDEV(Trans, {
                i18nKey: "extension.errorHandling.subtitle"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 80,
                columnNumber: 25
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 79,
              columnNumber: 23
            }, void 0), /* @__PURE__ */ _jsxDEV("div", {
              className: styles.formHeader,
              children: [/* @__PURE__ */ _jsxDEV(Icon, {
                name: "chatSupport",
                size: 18,
                color: "peanut"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 83,
                columnNumber: 25
              }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
                size: "m",
                weight: "bold",
                color: "peanut",
                children: /* @__PURE__ */ _jsxDEV(Trans, {
                  i18nKey: "extension.errorHandling.form.title"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 85,
                  columnNumber: 27
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 84,
                columnNumber: 25
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 82,
              columnNumber: 23
            }, void 0), /* @__PURE__ */ _jsxDEV(FeedbackForm, {
              control
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 88,
              columnNumber: 23
            }, void 0), /* @__PURE__ */ _jsxDEV(Text, {
              size: "xxs",
              color: commentsNumberOfWords > 200 ? "tomato" : "softPeanut",
              align: "center",
              children: /* @__PURE__ */ _jsxDEV(Trans, {
                i18nKey: "extension.errorHandling.form.maxWords",
                values: {
                  count: commentsNumberOfWords
                }
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 94,
                columnNumber: 25
              }, void 0)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 89,
              columnNumber: 23
            }, void 0), /* @__PURE__ */ _jsxDEV("footer", {
              className: styles.footer,
              children: [/* @__PURE__ */ _jsxDEV(Button, {
                expand: true,
                iconLeft: "arrowLeft",
                variant: "secondary",
                onClick: (e) => {
                  handleResetView(e);
                  resetError();
                },
                children: /* @__PURE__ */ _jsxDEV(Trans, {
                  i18nKey: "extension.errorHandling.backToSafety"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 109,
                  columnNumber: 27
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 100,
                columnNumber: 25
              }, void 0), /* @__PURE__ */ _jsxDEV(Button, {
                expand: true,
                iconLeft: "send",
                onClick: () => {
                  handleSubmit((data) => onSubmit(data, eventId, error))();
                },
                children: /* @__PURE__ */ _jsxDEV(Trans, {
                  i18nKey: "extension.errorHandling.submit"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 118,
                  columnNumber: 27
                }, void 0)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 111,
                columnNumber: 25
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 99,
              columnNumber: 23
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 21
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 19
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 17
      }, void 0);
    } : null,
    children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
_s(ErrorHandler, "tdduza6p7BedXDODOuPr6GOOrKw=", false, function() {
  return [useExtensionContext, useForm, useToasts, useActiveUserSettings, useSentryUserFeedbackEnabled];
});
_c = ErrorHandler;
const FormInput = ({
  fieldName,
  control,
  placeholder,
  height
}) => {
  _s2();
  const {
    settings
  } = useActiveUserSettings();
  const defaultValue = settings?.user?.[fieldName];
  return /* @__PURE__ */ _jsxDEV(Controller, {
    name: fieldName,
    control,
    defaultValue,
    rules: {
      required: t("extension.errorHandling.form.validation.required")
    },
    render: ({
      field: {
        ref,
        ...field
      },
      fieldState: {
        error
      }
    }) => /* @__PURE__ */ _jsxDEV(Input, {
      ...field,
      ...height ? {
        height
      } : {},
      placeholder,
      error: error?.message,
      color: "bloobirds",
      width: "100%"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 9
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 145,
    columnNumber: 5
  }, void 0);
};
_s2(FormInput, "U93rNv35m26jUb3z/SuM10ieZXI=", false, function() {
  return [useActiveUserSettings];
});
_c2 = FormInput;
export const FeedbackForm = ({
  control
}) => {
  return /* @__PURE__ */ _jsxDEV("div", {
    className: styles.formWrapper,
    children: [/* @__PURE__ */ _jsxDEV(FormInput, {
      fieldName: "name",
      placeholder: t("extension.errorHandling.form.namePlaceholder"),
      control
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(FormInput, {
      fieldName: "email",
      placeholder: t("extension.errorHandling.form.emailPlaceholder"),
      control
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 7
    }, void 0), /* @__PURE__ */ _jsxDEV(Controller, {
      name: "message",
      control,
      rules: {
        required: t("extension.errorHandling.form.validation.required"),
        validate: (v) => v?.split(" ")?.length <= 250 || t("extension.errorHandling.form.validation.commentLength")
      },
      render: ({
        field: {
          ref,
          ...field
        },
        fieldState: {
          error
        }
      }) => {
        return /* @__PURE__ */ _jsxDEV(TextArea, {
          ...field,
          className: styles.formInput,
          placeholder: t("extension.errorHandling.form.commentsPlaceholder"),
          height: "200px",
          width: "100%",
          error: error?.message,
          maxRows: 10,
          minRows: 10
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 13
        }, void 0);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 166,
    columnNumber: 5
  }, void 0);
};
_c3 = FeedbackForm;
var _c, _c2, _c3;
$RefreshReg$(_c, "ErrorHandler");
$RefreshReg$(_c2, "FormInput");
$RefreshReg$(_c3, "FeedbackForm");
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
