import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/copyText/copyText.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/copyText/copyText.module.css"
const __vite__css = "\n._copy_component_pv6yb_2 {\n  display: flex;\n  align-self: flex-start;\n}\n\n._copy_component_pv6yb_2 > * > button {\n  align-self: flex-start;\n}\n\n._link_copy_component_pv6yb_11 {\n  height: 20px;\n}\n\n._link_copy_component_pv6yb_11 > * > button {\n  align-self: center;\n}\n\n._copy_icon_pv6yb_19 {\n  margin-left: 6px;\n  opacity: 0;\n}\n\n._show_icon_pv6yb_24 {\n  opacity: 100;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const copy_component = "_copy_component_pv6yb_2";
export const link_copy_component = "_link_copy_component_pv6yb_11";
export const copy_icon = "_copy_icon_pv6yb_19";
export const show_icon = "_show_icon_pv6yb_24";
export default {
	copy_component: copy_component,
	link_copy_component: link_copy_component,
	copy_icon: copy_icon,
	show_icon: show_icon
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))