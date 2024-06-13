import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewContent/contactViewContent.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewContent/contactViewContent.module.css"
const __vite__css = "._content_container_l3uj2_1 {\n  display: flex;\n  background-color: var(--lighterGray);\n  height: 100%;\n  padding: 15px;\n  overflow: overlay;\n  overscroll-behavior-y: contain;\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n\n._content_container_full_l3uj2_12 {\n  padding: 0;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const content_container = "_content_container_l3uj2_1";
export const content_container_full = "_content_container_full_l3uj2_12";
export default {
	content_container: content_container,
	content_container_full: content_container_full
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))