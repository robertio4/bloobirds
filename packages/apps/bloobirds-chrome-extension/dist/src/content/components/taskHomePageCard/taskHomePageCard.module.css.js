import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/taskHomePageCard/taskHomePageCard.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/taskHomePageCard/taskHomePageCard.module.css"
const __vite__css = "._cardWrapper_1pm6h_1 > div {\n  margin-top: 8px;\n  border-left: var(--seagreen) solid 4px;\n  border-radius: 4px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n._cardWrapper_1pm6h_1 > div div[class*=\"CardContent-module_content\"] {\n  display: flex;\n  gap: 4px;\n  margin-top: 8px;\n}\n\n._cardWrapper_1pm6h_1 div[class*=\"CircularBadge-module_container\"] {\n  font-size: 9px !important;\n}\n\n._verticalEllipsis_1pm6h_20 {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n._rightSide_1pm6h_27 {\n  margin-left: auto;\n  margin-right: 4px;\n}\n\n._cardButton_1pm6h_32 {\n  font-size: 11px;\n  justify-content: center;\n}\n\n._buttonsWrapper_1pm6h_37 {\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n  gap: 10px;\n}\n\n._buttonsWrapper_1pm6h_37 > button {\n  padding: 3px 10px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const cardWrapper = "_cardWrapper_1pm6h_1";
export const verticalEllipsis = "_verticalEllipsis_1pm6h_20";
export const rightSide = "_rightSide_1pm6h_27";
export const cardButton = "_cardButton_1pm6h_32";
export const buttonsWrapper = "_buttonsWrapper_1pm6h_37";
export default {
	cardWrapper: cardWrapper,
	verticalEllipsis: verticalEllipsis,
	rightSide: rightSide,
	cardButton: cardButton,
	buttonsWrapper: buttonsWrapper
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))