import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/components/taskButtons/taskButtons.module.css"
const __vite__css = "._cardButtons_st2iy_1 {\n  max-height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  flex-shrink: 0;\n  gap: 4px;\n  margin-left: auto;\n  padding-bottom: 3px;\n  background-color: white;\n}\n\n._cardButtons_st2iy_1 > div button[data-test='Button-Subhome-NextStep'] {\n  transform: rotate(180deg);\n}\n\n._cardButtons_st2iy_1 div[class^='CardHoverButtons-module_container'] {\n  padding: 8px 0 8px 8px !important;\n}\n\n\n._cardButtons_st2iy_1 > div > button {\n  display: flex;\n  justify-content: center;\n  height: 22px;\n  width: 32px;\n  padding: 1px 6px !important;\n}\n\n/*For dropdown cases (linkedIn button)*/\n._cardButtons_st2iy_1 > div > div > div > button {\n  display: flex;\n  justify-content: center;\n  height: 22px;\n  width: 32px;\n  padding: 1px 6px !important;\n}\n\n.__mark_as_done_st2iy_39{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-right: 8px;\n}\n\n\n.__mark_as_done_text_st2iy_50{\n  font-size: 12px;\n  line-height: 16px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const cardButtons = "_cardButtons_st2iy_1";
export const _mark_as_done = "__mark_as_done_st2iy_39";
export const _mark_as_done_text = "__mark_as_done_text_st2iy_50";
export default {
	cardButtons: cardButtons,
	_mark_as_done: _mark_as_done,
	_mark_as_done_text: _mark_as_done_text
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))