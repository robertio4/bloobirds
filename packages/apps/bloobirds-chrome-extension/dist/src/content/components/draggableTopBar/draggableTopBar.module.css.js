import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/draggableTopBar/draggableTopBar.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/draggableTopBar/draggableTopBar.module.css"
const __vite__css = "._container_1mlaa_1 {\n    position: relative;\n    box-sizing: border-box;\n    cursor: grab;\n    padding: 8px;\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n}\n\n._dragging_1mlaa_11 {\n    cursor: grabbing;\n}\n\n._actions_1mlaa_15 {\n    display: grid;\n    grid-auto-flow: column;\n    grid-column-gap: 8px;\n}\n\n._handle_1mlaa_21 {\n    position: absolute;\n    top: 4px;\n    left: 48%;\n    transform: rotate(90deg);\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity 100ms ease-in;\n}\n\n._container_1mlaa_1:hover ._handle_1mlaa_21 {\n    opacity: 1;\n    visibility: visible;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_1mlaa_1";
export const dragging = "_dragging_1mlaa_11";
export const actions = "_actions_1mlaa_15";
export const handle = "_handle_1mlaa_21";
export default {
	container: container,
	dragging: dragging,
	actions: actions,
	handle: handle
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))