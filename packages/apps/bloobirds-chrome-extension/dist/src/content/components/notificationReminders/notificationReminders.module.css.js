import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/notificationReminders/notificationReminders.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/notificationReminders/notificationReminders.module.css"
const __vite__css = "._remindersContainer_13qmj_1 {\n    position: fixed;\n    /* centered at the middle of the x axis screen */\n    left: 50%;\n    transform: translateX(-50%);\n    top: 80px;\n    z-index: 99999;\n    width: 320px;\n}\n\n.__callCard_body__wrap_13qmj_11 {\n    align-content: center;\n    display: flex;\n    flex-wrap: wrap;\n    margin-left: 2px;\n    gap: 2px;\n}\n\n._content_13qmj_19 {\n    display: flex;\n    margin-top: 8px;\n}\n\n._buttons_13qmj_24 {\n    display: flex;\n    align-items: center;\n    margin-top: 16px;\n}\n\n._closeCard_13qmj_30 {\n    position: absolute;\n    right: 4px;\n    top: 4px;\n}\n\n._reminderButton_13qmj_36 {\n    font-size: 11px;\n    white-space: nowrap;\n    justify-content: center;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const remindersContainer = "_remindersContainer_13qmj_1";
export const _callCard_body__wrap = "__callCard_body__wrap_13qmj_11";
export const content = "_content_13qmj_19";
export const buttons = "_buttons_13qmj_24";
export const closeCard = "_closeCard_13qmj_30";
export const reminderButton = "_reminderButton_13qmj_36";
export default {
	remindersContainer: remindersContainer,
	_callCard_body__wrap: _callCard_body__wrap,
	content: content,
	buttons: buttons,
	closeCard: closeCard,
	reminderButton: reminderButton
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))