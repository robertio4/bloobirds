import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTabs.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/layouts/subhomeLayout/subhomeContent/subhomeHeader/subhomeTabs/subhomeTabs.module.css"
const __vite__css = ".__tabs_wrapper_d9req_1 {\n  display: flex;\n  gap: 10px;\n  margin-left: auto;\n}\n\n.__tab_d9req_1 {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n\n.__tab_title_d9req_13 {\n  padding: 4px;\n}\n\n.__tab_active_d9req_17 {\n  border-bottom: 1px;\n  border-bottom-style: solid;\n  border-image-slice: 1;\n  border-image-source: linear-gradient(270deg, #43ccf2 0%, #1991ff 100%);\n}\n\n.__counter_d9req_24 {\n  margin-left: auto;\n  background-color: var(--lightPeanut);\n  border-radius: 14px;\n  padding: 0 4px;\n  min-width: 8px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _tabs_wrapper = "__tabs_wrapper_d9req_1";
export const _tab = "__tab_d9req_1";
export const _tab_title = "__tab_title_d9req_13";
export const _tab_active = "__tab_active_d9req_17";
export const _counter = "__counter_d9req_24";
export default {
	_tabs_wrapper: _tabs_wrapper,
	_tab: _tab,
	_tab_title: _tab_title,
	_tab_active: _tab_active,
	_counter: _counter
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))