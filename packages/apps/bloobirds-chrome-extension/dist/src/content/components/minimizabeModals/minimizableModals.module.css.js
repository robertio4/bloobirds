import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/minimizabeModals/minimizableModals.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/minimizabeModals/minimizableModals.module.css"
const __vite__css = ".__container_1twfv_1 {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  display: flex;\n  align-items: baseline;\n  justify-content: flex-end;\n  z-index: 102;\n}\n\n.__minimizedModal__container_1twfv_11 {\n  height: 40px;\n  border-radius: 8px 8px 0 0;\n  padding: 0 8px;\n  margin-left: 8px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.__minimizedModal__container_1twfv_11:last-child {\n  margin-right: 12px;\n}\n\n.__minimizedModal__container_1twfv_11 button:first-of-type {\n  margin-right: 4px;\n  margin-left: 2px;\n}\n\n.__minimizedModal__container_1twfv_11 p {\n  margin-right: 4px;\n}\n\n._email_1twfv_34 {\n  background-color: var(--tangerine);\n}\n\n._meeting_1twfv_38,\n._calendarMeeting_1twfv_39 {\n  background-color: var(--softTomato);\n}\n\n._note_1twfv_43 {\n  background-color: var(--banana);\n}\n\n._task_1twfv_47 {\n  background-color: var(--softBloobirds);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _container = "__container_1twfv_1";
export const _minimizedModal__container = "__minimizedModal__container_1twfv_11";
export const email = "_email_1twfv_34";
export const meeting = "_meeting_1twfv_38";
export const calendarMeeting = "_calendarMeeting_1twfv_39";
export const note = "_note_1twfv_43";
export const task = "_task_1twfv_47";
export default {
	_container: _container,
	_minimizedModal__container: _minimizedModal__container,
	email: email,
	meeting: meeting,
	calendarMeeting: calendarMeeting,
	note: note,
	task: task
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))