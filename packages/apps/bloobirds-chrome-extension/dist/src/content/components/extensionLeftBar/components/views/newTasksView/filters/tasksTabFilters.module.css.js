import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/tasksTabFilters.module.css"
const __vite__css = "._filterRow_1gupq_1 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n}\n\n._filterGroup_1gupq_9 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n._filterGroup_1gupq_9 > div {\n  width: calc((100% - 16px)/3);\n}\n\n._rightButtons_1gupq_21 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: flex-start;\n  padding: 0;\n  gap: 4px;\n  margin-top: -40px;\n}\n\n._rightButtons_1gupq_21 button {\n  padding: 3px 8px;\n  font-size: 12px;\n}\n\n._filters_1gupq_36{\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  gap: 8px;\n  width: 100%;\n}\n\n"
__vite__updateStyle(__vite__id, __vite__css)
export const filterRow = "_filterRow_1gupq_1";
export const filterGroup = "_filterGroup_1gupq_9";
export const rightButtons = "_rightButtons_1gupq_21";
export const filters = "_filters_1gupq_36";
export default {
	filterRow: filterRow,
	filterGroup: filterGroup,
	rightButtons: rightButtons,
	filters: filters
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))