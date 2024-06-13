import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/navegationBar/navegationBar.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/navegationBar/navegationBar.module.css"
const __vite__css = "._container_14lj7_1 {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-start;\n  padding: 8px;\n  gap: 24px;\n  border-radius: 8px 8px 0px 0px;\n}\n\n._containerSidePeek_14lj7_11 {\n  border-radius: 0px;\n}\n\n._containerGradient_14lj7_15 {\n  background: linear-gradient(270deg, #43ccf2 0%, #1991ff 100%);\n}\n\n._containerGradientCompleted_14lj7_19 {\n  background: linear-gradient(270deg, #42da9c 0%, #1991ff 100%);\n}\n\n._leftContainer_14lj7_23 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0px;\n  gap: 4px;\n  order: 0;\n  flex-grow: 0;\n}\n\n._rightContainer_14lj7_33 {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 0px;\n  order: 1;\n  flex-grow: 1;\n  min-width: 0;\n}\n\n._rightContainer_14lj7_33 > button {\n  padding: 3px 0;\n  margin: 0px;\n}\n\n._textPaginator_14lj7_49 {\n  text-align: center;\n  width: 55px;\n}\n\n._textPaginator_14lj7_49 > p {\n  font-size: 11px;\n  line-height: 24px;\n}\n\n._text_14lj7_49 > p {\n  font-size: 11px;\n  line-height: 24px;\n}\n\n._taskTitle_14lj7_64 {\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: pointer;\n}\n\n._taskTitle_14lj7_64 > p {\n  font-size: 12px;\n  line-height: 24px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n._taskTitle_sidePeek_14lj7_81 > p {\n  font-size: 13px;\n}\n\n._navigatorButton_14lj7_85 {\n  background: #65d0f6;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n}\n\n._navigatorButton_14lj7_85:hover {\n  background-color: #94e3fe;\n}\n\n._chevrons_14lj7_96 {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: 0px;\n  gap: 4px;\n}\n\n._spinnerContainer_14lj7_104 {\n  padding: 2px;\n}\n\n._handle_14lj7_108 {\n  position: absolute;\n  top: 4px;\n  left: 48%;\n  transform: rotate(90deg);\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 100ms ease-in;\n}\n\n._container_14lj7_1:hover ._handle_14lj7_108 {\n  opacity: 1;\n  visibility: visible;\n}\n\n._taskInfo_14lj7_123{\n  display: flex;\n}\n\n._referenceBobjectInfo_14lj7_127{\n  display: flex;\n}\n\n._dashSeparator_14lj7_131{\n  white-space: pre;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_14lj7_1";
export const containerSidePeek = "_containerSidePeek_14lj7_11";
export const containerGradient = "_containerGradient_14lj7_15";
export const containerGradientCompleted = "_containerGradientCompleted_14lj7_19";
export const leftContainer = "_leftContainer_14lj7_23";
export const rightContainer = "_rightContainer_14lj7_33";
export const textPaginator = "_textPaginator_14lj7_49";
export const text = "_text_14lj7_49";
export const taskTitle = "_taskTitle_14lj7_64";
export const taskTitle_sidePeek = "_taskTitle_sidePeek_14lj7_81";
export const navigatorButton = "_navigatorButton_14lj7_85";
export const chevrons = "_chevrons_14lj7_96";
export const spinnerContainer = "_spinnerContainer_14lj7_104";
export const handle = "_handle_14lj7_108";
export const taskInfo = "_taskInfo_14lj7_123";
export const referenceBobjectInfo = "_referenceBobjectInfo_14lj7_127";
export const dashSeparator = "_dashSeparator_14lj7_131";
export default {
	container: container,
	containerSidePeek: containerSidePeek,
	containerGradient: containerGradient,
	containerGradientCompleted: containerGradientCompleted,
	leftContainer: leftContainer,
	rightContainer: rightContainer,
	textPaginator: textPaginator,
	text: text,
	taskTitle: taskTitle,
	taskTitle_sidePeek: taskTitle_sidePeek,
	navigatorButton: navigatorButton,
	chevrons: chevrons,
	spinnerContainer: spinnerContainer,
	handle: handle,
	taskInfo: taskInfo,
	referenceBobjectInfo: referenceBobjectInfo,
	dashSeparator: dashSeparator
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))