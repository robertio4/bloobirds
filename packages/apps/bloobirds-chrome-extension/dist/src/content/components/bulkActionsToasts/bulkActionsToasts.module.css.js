import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bulkActionsToasts/bulkActionsToasts.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bulkActionsToasts/bulkActionsToasts.module.css"
const __vite__css = "._floatingNotifications_w33o1_1 {\n  position: fixed;\n  top: 96px;\n  left: 0;\n  right: calc(-100% + 425px);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  pointer-events: none;\n  gap: 8px;\n}\n\n._floatingNotification_w33o1_1 {\n  position: relative;\n  width: 401px;\n  height: 96px;\n\n  background: #FFFFFF;\n  border: 1px solid #9ACFFF;\n  box-shadow: 0px 0px 8px rgba(123, 191, 254, 0.25);\n  border-radius: 4px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  box-sizing: border-box;\n  padding: 16px 24px;\n  z-index: 1000;\n  pointer-events: all;\n\n  font-size: 13px;\n}\n\n._floatingNotificationProgressBar_w33o1_35 {\n  height: 24px;\n  width: 100%;\n  background: #8fc6fa;\n  mix-blend-mode: normal;\n  border-radius: 4px;\n  position: relative;\n}\n\n._floatingNotificationTitleText_w33o1_44 {\n  font-weight: bold;\n  margin-bottom: 5px;\n  display: block;\n  color: var(--peanut);\n}\n\n._floatingNotificationProgress_w33o1_35 {\n  position: relative;\n}\n\n._floatingNotificationProgressBarFill_w33o1_55 {\n  position: absolute;\n  left: 0;\n  height: 100%;\n  background: #1991FF;\n  border-radius: 4px;\n}\n\n._floatingNotificationProgressText_w33o1_63 {\n  position: absolute;\n  top: 2px;\n  left: 50%;\n  transform: translateX(-50%);\n  color: white;\n}\n\n._floatingNotificationProgressStopBox_w33o1_71 {\n  cursor: pointer;\n  color: white;\n  position: absolute;\n  top: 2px;\n  right: 8px;\n}\n\n._floatingNotificationClose_w33o1_79 {\n  position: absolute;\n  right: 8px;\n  top: 6px;\n}\n\n._hideProgress_w33o1_85 {\n  display: none;\n}\n\n._completed_w33o1_89 {\n  background: #63BA00;\n}\n\n._stopped_w33o1_93 {\n  background: var(--tangerine);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const floatingNotifications = "_floatingNotifications_w33o1_1";
export const floatingNotification = "_floatingNotification_w33o1_1";
export const floatingNotificationProgressBar = "_floatingNotificationProgressBar_w33o1_35";
export const floatingNotificationTitleText = "_floatingNotificationTitleText_w33o1_44";
export const floatingNotificationProgress = "_floatingNotificationProgress_w33o1_35";
export const floatingNotificationProgressBarFill = "_floatingNotificationProgressBarFill_w33o1_55";
export const floatingNotificationProgressText = "_floatingNotificationProgressText_w33o1_63";
export const floatingNotificationProgressStopBox = "_floatingNotificationProgressStopBox_w33o1_71";
export const floatingNotificationClose = "_floatingNotificationClose_w33o1_79";
export const hideProgress = "_hideProgress_w33o1_85";
export const completed = "_completed_w33o1_89";
export const stopped = "_stopped_w33o1_93";
export default {
	floatingNotifications: floatingNotifications,
	floatingNotification: floatingNotification,
	floatingNotificationProgressBar: floatingNotificationProgressBar,
	floatingNotificationTitleText: floatingNotificationTitleText,
	floatingNotificationProgress: floatingNotificationProgress,
	floatingNotificationProgressBarFill: floatingNotificationProgressBarFill,
	floatingNotificationProgressText: floatingNotificationProgressText,
	floatingNotificationProgressStopBox: floatingNotificationProgressStopBox,
	floatingNotificationClose: floatingNotificationClose,
	hideProgress: hideProgress,
	completed: completed,
	stopped: stopped
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))