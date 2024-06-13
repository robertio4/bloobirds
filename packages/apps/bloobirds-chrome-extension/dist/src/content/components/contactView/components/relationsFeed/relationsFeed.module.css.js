import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/relationsFeed/relationsFeed.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/relationsFeed/relationsFeed.module.css"
const __vite__css = "/* Header */\n.__header_1xa12_2 {\n  margin-bottom: 8px;\n  margin-top: 8px;\n  padding-left: 8px;\n}\n\n.__header_1xa12_2 > p {\n  margin-top: 0;\n  margin-right: 8px;\n}\n\n.__header_icon_1xa12_13 {\n  margin-right: 5px;\n}\n\n._container_1xa12_17 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 16px;\n}\n\n._container_1xa12_17 > * {\n  padding-bottom: 8px;\n}\n\n._loading_1xa12_28 {\n  display: flex;\n  justify-content: center;\n}\n\n._relationTitle_1xa12_33 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n._relationContainer_1xa12_39 {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n\n._relationTitle_1xa12_33 > p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n}\n\n._rightSide_1xa12_53 {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n._rightSide_1xa12_53 > button {\n  padding: 3px 6px;\n}\n\n._relationBody_1xa12_64 {\n  padding-top: 8px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n\n._relationCard_1xa12_71 {\n  padding: 8px 16px;\n  border: 1px solid var(--verySoftPeanut);\n  border-radius: 4px;\n  background-color: var(--white);\n  display: flex;\n  flex-direction: column;\n  max-height: 430px;\n  overflow-y: auto;\n  cursor: pointer;\n}\n\n._noDataContainer_1xa12_83 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  margin: 24px auto;\n  padding: 15px;\n}\n\n._referenceField_1xa12_92 > p {\n  cursor: pointer;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _header = "__header_1xa12_2";
export const _header_icon = "__header_icon_1xa12_13";
export const container = "_container_1xa12_17";
export const loading = "_loading_1xa12_28";
export const relationTitle = "_relationTitle_1xa12_33";
export const relationContainer = "_relationContainer_1xa12_39";
export const rightSide = "_rightSide_1xa12_53";
export const relationBody = "_relationBody_1xa12_64";
export const relationCard = "_relationCard_1xa12_71";
export const noDataContainer = "_noDataContainer_1xa12_83";
export const referenceField = "_referenceField_1xa12_92";
export default {
	_header: _header,
	_header_icon: _header_icon,
	container: container,
	loading: loading,
	relationTitle: relationTitle,
	relationContainer: relationContainer,
	rightSide: rightSide,
	relationBody: relationBody,
	relationCard: relationCard,
	noDataContainer: noDataContainer,
	referenceField: referenceField
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))