import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/name/name.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/name/name.module.css"
const __vite__css = ".__container_15f5b_1 {\n  text-decoration: none;\n  color: var(--bloobirds);\n  margin-right: 8px;\n  text-align: justify;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n  white-space: nowrap;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n.__container_15f5b_1:hover {\n  cursor: pointer;\n  color: var(--darkBloobirds);\n}\n\n.__container_15f5b_1 > p {\n  text-overflow: ellipsis;\n  overflow-x: hidden;\n}\n\n.__is_complete_15f5b_24,\n.__is_complete_15f5b_24 > * {\n  text-decoration: line-through;\n  text-align: left;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _container = "__container_15f5b_1";
export const _is_complete = "__is_complete_15f5b_24";
export default {
	_container: _container,
	_is_complete: _is_complete
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))