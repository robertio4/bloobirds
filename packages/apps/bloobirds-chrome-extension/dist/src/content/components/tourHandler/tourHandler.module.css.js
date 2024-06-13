import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/tourHandler/tourHandler.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/tourHandler/tourHandler.module.css"
const __vite__css = "._tourWrapper_1ys7r_1{\n  background-color: white;\n}\n\n._tourStep_1ys7r_5{\n  height: 136px;\n  width: 200px;\n  background-color: white;\n}\n\n._sliderControls_1ys7r_11{\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap:6px;\n  margin-bottom: 12px;\n}\n\n._sliderControls_1ys7r_11 > ul{\n  display: flex;\n  list-style-type: none;\n  justify-content: space-between;\n  align-items: center;\n}\n\n._modal_1ys7r_26 {\n  background: white;\n  display: flex;\n  flex-direction: column;\n  margin: 20px 0;\n  color: var(--peanut);\n  box-shadow: 0 2px 6px rgba(70, 79, 87, 0.4);\n  overflow: hidden;\n  border-radius: 4px;\n  opacity: 1;\n  animation: _bounce_1ys7r_1 150ms forwards ease-in-out;\n  max-height: calc(100vh - 30px);\n}\n\n._overlayTest_1ys7r_40 {\n  position: relative;\n}\n\n._contentTest_1ys7r_44 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n\n._gapTest_1ys7r_54 {\n  position: absolute;\n  top: 50%; /* Adjust the position as needed */\n  left: 50%; /* Adjust the position as needed */\n  transform: translate(-50%, -50%);\n  width: 200px; /* Adjust the width as needed */\n  height: 20px; /* Adjust the height as needed */\n  background-color: transparent;\n  z-index: 2;\n}\n\n._overlay_1ys7r_40 {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(54, 93, 128, 0.2);\n  animation: _bounce_1ys7r_1 150ms forwards ease-in-out;\n  z-index: 103;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const tourWrapper = "_tourWrapper_1ys7r_1";
export const tourStep = "_tourStep_1ys7r_5";
export const sliderControls = "_sliderControls_1ys7r_11";
export const modal = "_modal_1ys7r_26";
export const bounce = "_bounce_1ys7r_1";
export const overlayTest = "_overlayTest_1ys7r_40";
export const contentTest = "_contentTest_1ys7r_44";
export const gapTest = "_gapTest_1ys7r_54";
export const overlay = "_overlay_1ys7r_40";
export default {
	tourWrapper: tourWrapper,
	tourStep: tourStep,
	sliderControls: sliderControls,
	modal: modal,
	bounce: bounce,
	overlayTest: overlayTest,
	contentTest: contentTest,
	gapTest: gapTest,
	overlay: overlay
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))