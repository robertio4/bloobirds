import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/extensionLeftBar.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/extensionLeftBar.module.css"
const __vite__css = "/* -------- ExtensionLeftBar ----------- */\n\n._root_159vr_3,\n._root_159vr_3 p,\n._root_159vr_3 span,\n._root_159vr_3 a,\n._root_159vr_3 div {\n  font-family: 'Inter', sans-serif !important;\n}\n\n._leftBar_159vr_11 {\n  position: fixed;\n  left: 0;\n  background-color: var(--bloobirds);\n  z-index: 2;\n  width: 56px;\n  height: 100%;\n  transition: all 0.25s ease-in-out;\n}\n\n._leftBarCollapsed_159vr_21 {\n  width: 16px;\n  transition: all 0.25s ease-in-out;\n  cursor: pointer;\n}\n\n._leftBar_wrapper_159vr_27 {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n\n\n/* -------------- VIEWS ------------------ */\n._button-position-wrapper_159vr_37{\n  position: relative;\n  width: 100%;\n}\n\n._buttonContainer_159vr_42 {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  width: 16px;\n  height: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  background-color: var(--white);\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);\n  border-radius: 50%;\n  transition: width 0.25s;\n  z-index: 3;\n}\n\n._buttonContainer_159vr_42:hover {\n  background-color: var(--bloobirds);\n}\n\n._buttonWithoutHeader_159vr_63 {\n  top: 32px;\n}\n\n._buttonContainerCollapsed_159vr_67 {\n  margin-left: 9px;\n  transition: all 0.25s ease-in-out;\n}\n\n._buttonContainerInContent_159vr_72 {\n  z-index: 2;\n}\n._animated-div_159vr_75{\n\n  position: fixed;\n  height: 100%;\n  left: 56px;\n  z-index: 1;\n  box-shadow: 4px 0px 4px rgba(0, 119, 181, 0.16);\n  width: 384px;\n\n  background-color: var(--lightestGray);\n}\n\n._content_159vr_87 {\n  /* if padding is changed, please review the collapse\n  chevron absolute positioning\n  in class buttonContainer\n  */\n  padding: 20px 10px 20px 16px;\n  overflow: auto;\n  overscroll-behavior-y: contain;\n  box-sizing: border-box;\n  overflow-y: scroll;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n._button_159vr_37 {\n  display: flex;\n  padding: 3px;\n}\n\n._button_159vr_37:hover > svg > path {\n  fill: var(--white);\n}\n\n\n/* ------------------ TasksTabFilters ------------------- */\n\n._quickFilter_159vr_114 div {\n  font-size: 10px;\n}\n\n._totalMatching_159vr_118 {\n  display: flex;\n  justify-content: right;\n  margin-bottom: 5px;\n}\n\n._totalCounter_159vr_124 {\n  box-sizing: border-box;\n  padding: 5px 16px;\n  border-radius: 4px;\n  background-color: var(--lightestBloobirds);\n}\n\n._filtersWrapper_159vr_131 {\n  display: flex;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const root = "_root_159vr_3";
export const leftBar = "_leftBar_159vr_11";
export const leftBarCollapsed = "_leftBarCollapsed_159vr_21";
export const leftBar_wrapper = "_leftBar_wrapper_159vr_27";
export const buttonContainer = "_buttonContainer_159vr_42";
export const buttonWithoutHeader = "_buttonWithoutHeader_159vr_63";
export const buttonContainerCollapsed = "_buttonContainerCollapsed_159vr_67";
export const buttonContainerInContent = "_buttonContainerInContent_159vr_72";
export const content = "_content_159vr_87";
export const button = "_button_159vr_37";
export const quickFilter = "_quickFilter_159vr_114";
export const totalMatching = "_totalMatching_159vr_118";
export const totalCounter = "_totalCounter_159vr_124";
export const filtersWrapper = "_filtersWrapper_159vr_131";
export default {
	root: root,
	leftBar: leftBar,
	leftBarCollapsed: leftBarCollapsed,
	leftBar_wrapper: leftBar_wrapper,
	"button-position-wrapper": "_button-position-wrapper_159vr_37",
	buttonContainer: buttonContainer,
	buttonWithoutHeader: buttonWithoutHeader,
	buttonContainerCollapsed: buttonContainerCollapsed,
	buttonContainerInContent: buttonContainerInContent,
	"animated-div": "_animated-div_159vr_75",
	content: content,
	button: button,
	quickFilter: quickFilter,
	totalMatching: totalMatching,
	totalCounter: totalCounter,
	filtersWrapper: filtersWrapper
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))