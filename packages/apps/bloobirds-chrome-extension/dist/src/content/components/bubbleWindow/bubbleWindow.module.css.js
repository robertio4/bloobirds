import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/bubbleWindow/bubbleWindow.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/bubbleWindow/bubbleWindow.module.css"
const __vite__css = "._window_723m4_1 {\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n}\n\n._content_723m4_7 {\n    flex-grow: 1;\n    padding: 20px 24px;\n    overflow-y: scroll;\n    overscroll-behavior-y: contain;\n}\n\n._content_723m4_7::-webkit-scrollbar-thumb {\n    outline: 1px solid var(--verySoftPeanut);\n    border-radius: 3px;\n    background-color: var(--verySoftPeanut);\n}\n\n._content_723m4_7::-webkit-scrollbar {\n    width: 6px;\n    height: 6px;\n    cursor: pointer !important;\n}\n\n._footer_723m4_26 {\n    padding: 20px;\n    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.09);\n}\n\n._footerGradient_723m4_31 {\n  padding: 16px;\n  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.09);\n  background: linear-gradient(270deg, #43ccf2 0%, #1991ff 100%);\n  border-radius: 0 0 4px 4px\n}\n\n._header_723m4_38 {\n    padding-bottom: 8px;\n}\n\n._horizontalLine_723m4_42 {\n    border-top: 1px solid currentColor;\n    margin: 40px auto -24px;\n    width: 90%;\n}\n\n@media (max-height: 660px) {\n    ._horizontalLine_723m4_42 {\n        margin-top: 30px;\n    }\n}\n\n._circularBadge_723m4_54 {\n    width: 48px;\n    height: 48px;\n    border: 1px solid currentColor;\n    border-radius: 48px;\n    box-sizing: border-box;\n    padding: 6px 7px;\n    margin: 0 auto;\n    box-shadow: 0 0 6px rgba(25, 145, 255, 0.33);\n}\n\n"
__vite__updateStyle(__vite__id, __vite__css)
export const window = "_window_723m4_1";
export const content = "_content_723m4_7";
export const footer = "_footer_723m4_26";
export const footerGradient = "_footerGradient_723m4_31";
export const header = "_header_723m4_38";
export const horizontalLine = "_horizontalLine_723m4_42";
export const circularBadge = "_circularBadge_723m4_54";
export default {
	window: window,
	content: content,
	footer: footer,
	footerGradient: footerGradient,
	header: header,
	horizontalLine: horizontalLine,
	circularBadge: circularBadge
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))