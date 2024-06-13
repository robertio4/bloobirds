import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingIcon/floatingIcon.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingIcon/floatingIcon.module.css"
const __vite__css = "._container_ijy74_1 {\n  pointer-events: auto;\n  display: flex;\n  justify-content: flex-end;\n  width: 56px;\n  opacity: 0;\n  height: 0;\n  transition: opacity 200ms ease-in;\n}\n\n._visible_ijy74_11 {\n  opacity: 1;\n  height: 40px;\n}\n\n._logo_ijy74_16 {\n  width: 40px;\n  height: 40px;\n  display: none;\n  background: #1991ff;\n  box-shadow: -2px 0px 4px rgba(0, 119, 181, 0.4);\n  border-radius: 8px 0px 0px 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n\n._dragging_ijy74_29 {\n  margin-left: -4px;\n}\n\n._hoverSide_ijy74_33 {\n  background: #9acfff;\n  border-radius: 0px;\n  width: 0px;\n  opacity: 0;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: width 200ms ease-in, opacity 200ms ease-in;\n  cursor: grab;\n}\n\n._container_ijy74_1:hover ._hoverSide_ijy74_33 {\n  width: 16px;\n  opacity: 1;\n}\n\n._visibleHoverSide_ijy74_51 {\n  cursor: grabbing;\n  width: 16px;\n  opacity: 1;\n}\n\n._movableArea_ijy74_57 {\n  position: absolute;\n  width: 4px;\n  background-color: #1991ff;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_ijy74_1";
export const visible = "_visible_ijy74_11";
export const logo = "_logo_ijy74_16";
export const dragging = "_dragging_ijy74_29";
export const hoverSide = "_hoverSide_ijy74_33";
export const visibleHoverSide = "_visibleHoverSide_ijy74_51";
export const movableArea = "_movableArea_ijy74_57";
export default {
	container: container,
	visible: visible,
	logo: logo,
	dragging: dragging,
	hoverSide: hoverSide,
	visibleHoverSide: visibleHoverSide,
	movableArea: movableArea
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))