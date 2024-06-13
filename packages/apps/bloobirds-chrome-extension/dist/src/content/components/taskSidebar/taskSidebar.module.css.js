import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskSidebar/taskSidebar.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskSidebar/taskSidebar.module.css"
const __vite__css = "._container_1bp0g_1 {\n  background-color: var(--bloobirds);\n  width: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-top: 8px;\n}\n\n._taskContainer_1bp0g_12 {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  width: 40px;\n  height: 40px;\n  border-radius: 4px;\n  background-color: var(--verySoftBloobirds);\n  margin: 4px 0;\n  cursor: pointer;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n._taskCounter_1bp0g_28 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  height: 16px;\n  width: 16px;\n  background-color: var(--veryLightBloobirds);\n  border-radius: 50%;\n  color: var(--peanut);\n  font-size: 8px;\n  top: -5px;\n  right: -5px;\n}\n\n._taskLabel_1bp0g_43 {\n  font-size: 7px;\n  user-select: none;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_1bp0g_1";
export const taskContainer = "_taskContainer_1bp0g_12";
export const taskCounter = "_taskCounter_1bp0g_28";
export const taskLabel = "_taskLabel_1bp0g_43";
export default {
	container: container,
	taskContainer: taskContainer,
	taskCounter: taskCounter,
	taskLabel: taskLabel
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))