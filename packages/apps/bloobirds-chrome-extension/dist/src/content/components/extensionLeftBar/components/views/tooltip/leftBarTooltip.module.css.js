import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/tooltip/leftBarTooltip.module.css"
const __vite__css = "._left_bar_tooltip_gwp2r_1 {\n  height: fit-content;\n  background-color: var(--verySoftPurple);\n}\n\n._tooltipContentBlock_gwp2r_6 {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 4px 16px 4px;\n  width: 100%;\n  height: 48px;\n}\n\n._tooltipContentBlock_gwp2r_6 > svg {\n  min-width: 24px;\n}\n\n._title_gwp2r_19 {\n  margin: 14px 8px 10px;\n}\n\n._footerButton_gwp2r_23 {\n  font-size: 12px;\n  padding: 2px 8px;\n}\n\n._mainButton_gwp2r_28 {\n  float: right;\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n._secondaryButton_gwp2r_35 {\n  background-color: transparent;\n}\n\n._image_gwp2r_39 {\n  min-height: 16px;\n}\n\n._image_gwp2r_39 > img {\n  max-width: 332px;\n}\n\n._image_small_gwp2r_47 > img {\n  margin: -16px 0;\n  max-width: 300px;\n}\n\n._mainButton_gwp2r_28:hover {\n  background-color: white !important;\n  opacity: 0.9;\n}\n\n._footer_gwp2r_23 {\n  margin: 16px 0;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const left_bar_tooltip = "_left_bar_tooltip_gwp2r_1";
export const tooltipContentBlock = "_tooltipContentBlock_gwp2r_6";
export const title = "_title_gwp2r_19";
export const footerButton = "_footerButton_gwp2r_23";
export const mainButton = "_mainButton_gwp2r_28";
export const secondaryButton = "_secondaryButton_gwp2r_35";
export const image = "_image_gwp2r_39";
export const image_small = "_image_small_gwp2r_47";
export const footer = "_footer_gwp2r_23";
export default {
	left_bar_tooltip: left_bar_tooltip,
	tooltipContentBlock: tooltipContentBlock,
	title: title,
	footerButton: footerButton,
	mainButton: mainButton,
	secondaryButton: secondaryButton,
	image: image,
	image_small: image_small,
	footer: footer
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))