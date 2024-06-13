import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/transition/transition.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/transition/transition.module.css"
const __vite__css = ".__fade_enter_kjt8u_1 {\n  opacity: 0;\n}\n.__fade_enter_active_kjt8u_4 {\n  opacity: 1;\n  transition: opacity 300ms;\n}\n\n.__fade_exit_kjt8u_9 {\n  opacity: 1;\n}\n.__fade_exit_active_kjt8u_12 {\n  opacity: 0;\n  transition: opacity 300ms;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _fade_enter = "__fade_enter_kjt8u_1";
export const _fade_enter_active = "__fade_enter_active_kjt8u_4";
export const _fade_exit = "__fade_exit_kjt8u_9";
export const _fade_exit_active = "__fade_exit_active_kjt8u_12";
export default {
	_fade_enter: _fade_enter,
	_fade_enter_active: _fade_enter_active,
	_fade_exit: _fade_exit,
	_fade_exit_active: _fade_exit_active
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))