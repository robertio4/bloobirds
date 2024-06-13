import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/statusLabel/statusLabel.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/statusLabel/statusLabel.module.css"
const __vite__css = ".__status__container_nlgc9_1 {\n  display: flex;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.__status__container_nlgc9_1 > div {\n  max-width: 160px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.__status__container__clickable_nlgc9_14 {\n  cursor: pointer;\n}\n\n.__status__container__clickable_nlgc9_14:hover {\n  opacity: 65%;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _status__container = "__status__container_nlgc9_1";
export const _status__container__clickable = "__status__container__clickable_nlgc9_14";
export default {
	_status__container: _status__container,
	_status__container__clickable: _status__container__clickable
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))