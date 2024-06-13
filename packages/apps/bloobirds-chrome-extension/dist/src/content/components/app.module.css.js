import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/app.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/app.module.css"
const __vite__css = "._container_1lnfa_1 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 102;\n  pointer-events: none;\n}\n\n._dragging_1lnfa_11 {\n  pointer-events: unset;\n}\n\n._content_1lnfa_15 {\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n}\n\n._container_1lnfa_1 *,\n._container_1lnfa_1 :after,\n._container_1lnfa_1 :before {\n  box-sizing: inherit;\n}\n\n._container_1lnfa_1 legend {\n  display: block;\n}\n\n:root {\n  --fontFamily: 'Inter', sans-serif !important;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_1lnfa_1";
export const dragging = "_dragging_1lnfa_11";
export const content = "_content_1lnfa_15";
export default {
	container: container,
	dragging: dragging,
	content: content
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))