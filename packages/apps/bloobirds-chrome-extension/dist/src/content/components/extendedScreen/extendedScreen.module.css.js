import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extendedScreen/extendedScreen.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extendedScreen/extendedScreen.module.css"
const __vite__css = "@keyframes _bounce_has39_1 {\n  from {\n    width: 0;\n    opacity: 0;\n  }\n\n  to {\n    width: 320px;\n    opacity: 1;\n  }\n}\n\n._extended_has39_13 {\n  position: absolute;\n  height: 100%;\n  width: 337px;\n  background-color: var(--white);\n  top: 0;\n  left: -336px;\n  z-index: -1;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 20px rgba(25, 145, 255, 0.15);\n  border: 1px solid #9acfff;\n  border-right: 0;\n  box-sizing: border-box;\n}\n\n._extended_has39_13::after {\n  width: 6px;\n  border-top: 1px solid #9acfff;\n  border-bottom: 1px solid #9acfff;\n  background-color: var(--white);\n  z-index: -1;\n  content: '';\n  right: -6px;\n  position: absolute;\n  height: calc(100% + 1px);\n  top: -0.5px;\n}\n\n._extended_sidePeek_has39_44 {\n  position: absolute;\n  height: 100%;\n  width: 390px !important;\n  background-color: var(--white);\n  top: 0;\n  left: -390px;\n  z-index: -1;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 20px rgba(25, 145, 255, 0.15);\n  border: 1px solid #9acfff;\n  border-right: 0;\n  box-sizing: border-box;\n}\n\n._extended_sidePeek_has39_44::after {\n  width: 6px;\n  border-top: 1px solid #9acfff;\n  border-bottom: 1px solid #9acfff;\n  background-color: var(--white);\n  z-index: -1;\n  content: '';\n  right: -6px;\n  position: absolute;\n  height: calc(100% + 1px);\n  top: -0.5px;\n}\n\n._extended_sidePeek_hidden_has39_75 {\n  display: none;\n}\n\n._extendedRight_has39_79 {\n  position: absolute;\n  height: 100%;\n  width: 337px;\n  background-color: var(--white);\n  top: 0;\n  left: -336px;\n  z-index: -1;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 20px rgba(25, 145, 255, 0.15);\n  border: 1px solid #9acfff;\n  border-left: 0;\n  box-sizing: border-box;\n}\n._extendedRight_has39_79::before {\n  width: 6px;\n  border-top: 1px solid #9acfff;\n  border-bottom: 1px solid #9acfff;\n  background-color: var(--white);\n  z-index: -1;\n  content: '';\n  left: -6px;\n  position: absolute;\n  height: calc(100% + 1px);\n  top: -0.5px;\n}\n\n._header_has39_109 {\n  height: 25px;\n  display: flex;\n  justify-content: space-between;\n  padding: 9px;\n  box-sizing: content-box;\n  align-items: center;\n}\n\n._headerRight_has39_118,\n._headerRight_has39_118 * {\n  display: flex;\n  flex-direction: row-reverse;\n}\n\n._headerButtons_has39_124 {\n  display: flex;\n  align-items: center;\n  margin-right: 12px;\n  margin-left: 8px;\n  gap: 8px;\n}\n\n._aiButton_has39_132 {\n  margin: auto;\n  background-color: radial-gradient(125.86% 100% at 50% 100%, #DCFFF1 0%, #9ACFFF 9.46%, #5519FF 56.75%);\n}\n\n._headerButtons_has39_124 > button {\n  font-size: 12px;\n  font-weight: 400;\n}\n\n._rotate180_has39_142 {\n  transform: rotate(180deg);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const extended = "_extended_has39_13";
export const extended_sidePeek = "_extended_sidePeek_has39_44";
export const extended_sidePeek_hidden = "_extended_sidePeek_hidden_has39_75";
export const extendedRight = "_extendedRight_has39_79";
export const header = "_header_has39_109";
export const headerRight = "_headerRight_has39_118";
export const headerButtons = "_headerButtons_has39_124";
export const aiButton = "_aiButton_has39_132";
export const rotate180 = "_rotate180_has39_142";
export const bounce = "_bounce_has39_1";
export default {
	extended: extended,
	extended_sidePeek: extended_sidePeek,
	extended_sidePeek_hidden: extended_sidePeek_hidden,
	extendedRight: extendedRight,
	header: header,
	headerRight: headerRight,
	headerButtons: headerButtons,
	aiButton: aiButton,
	rotate180: rotate180,
	bounce: bounce
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))