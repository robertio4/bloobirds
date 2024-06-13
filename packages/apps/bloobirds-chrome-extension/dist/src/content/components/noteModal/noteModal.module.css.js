import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/noteModal/noteModal.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/noteModal/noteModal.module.css"
const __vite__css = "._container_dyetf_1 {\n  border: 1px solid #9acfff;\n  box-sizing: border-box;\n  box-shadow: 0 2px 20px rgb(25 145 255 / 15%);\n  border-radius: 8px;\n  background-color: white;\n  width: 320px;\n  animation: _floatingMenu-module_popup__v8iVF_dyetf_1 150ms ease-in-out;\n  display: inline-block;\n  position: relative;\n  pointer-events: all;\n}\n\n@media (min-height: 660px) {\n  ._container_dyetf_1 > div:nth-child(2) {\n    height: 550px !important;\n    max-height: 554px;\n  }\n}\n\n@media (max-height: 660px) {\n  ._container_dyetf_1 {\n    height: calc(100% - 60px);\n    display: flex;\n    flex-direction: column;\n  }\n\n  ._container_dyetf_1 > div:nth-child(2) {\n    height: 100%;\n    max-height: 554px;\n  }\n\n  ._editor_dyetf_33 {\n    flex: 1;\n    overflow-y: auto;\n  }\n}\n\n._content_container_dyetf_39 {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n._body_wrapper_dyetf_46 {\n  overflow-y: auto;\n  width: 100%;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  max-height: 416px;\n}\n\n._body_wrapper_dyetf_46 > div > div ul {\n  padding-left: 24px !important;\n}\n\n._body_wrapper_dyetf_46 > div > div ol {\n  padding-left: 24px !important;\n}\n\n._bottom_bar_dyetf_62 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}\n\n._text_dyetf_69 {\n  margin-left: 4px;\n}\n\n._editor_dyetf_33 {\n  display: flex;\n  flex-direction: column;\n}\n\n._wrapper_dyetf_78 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 2;\n  pointer-events: none;\n}\n\n._dragging_dyetf_88 {\n  pointer-events: unset;\n}\n\n._divider_dyetf_92 {\n  width: 90%;\n  text-align: center;\n  border-top: 1px solid var(--verySoftPeanut);\n  align-self: center;\n}\n\n._record_related_dyetf_99 {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  margin-left: 8px;\n  overflow: hidden;\n}\n\n._record_related_dyetf_99 > * {\n  width: 100%;\n}\n\n._toolbar_dyetf_111 {\n  border-top: 1px solid var(--verySoftPeanut);\n  border-bottom: 1px solid var(--verySoftPeanut);\n}\n\n._mainNote_dyetf_116 {\n  margin-right: 4px;\n}\n\n._bottom_bar_right_dyetf_120 {\n  display: flex;\n  align-items: center;\n}\n\nh2 {\n  margin: 0px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_dyetf_1";
export const editor = "_editor_dyetf_33";
export const content_container = "_content_container_dyetf_39";
export const body_wrapper = "_body_wrapper_dyetf_46";
export const bottom_bar = "_bottom_bar_dyetf_62";
export const text = "_text_dyetf_69";
export const wrapper = "_wrapper_dyetf_78";
export const dragging = "_dragging_dyetf_88";
export const divider = "_divider_dyetf_92";
export const record_related = "_record_related_dyetf_99";
export const toolbar = "_toolbar_dyetf_111";
export const mainNote = "_mainNote_dyetf_116";
export const bottom_bar_right = "_bottom_bar_right_dyetf_120";
export default {
	container: container,
	"floatingMenu-module_popup__v8iVF": "_floatingMenu-module_popup__v8iVF_dyetf_1",
	editor: editor,
	content_container: content_container,
	body_wrapper: body_wrapper,
	bottom_bar: bottom_bar,
	text: text,
	wrapper: wrapper,
	dragging: dragging,
	divider: divider,
	record_related: record_related,
	toolbar: toolbar,
	mainNote: mainNote,
	bottom_bar_right: bottom_bar_right
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))