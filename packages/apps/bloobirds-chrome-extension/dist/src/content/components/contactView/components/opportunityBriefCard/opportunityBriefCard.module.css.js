import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/opportunityBriefCard/opportunityBriefCard.module.css"
const __vite__css = "._container_118p6_1 {\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  border-radius: 4px;\n  border: 1px solid var(--veryLightBloobirds);\n  background-color: var(--white);\n  width: 100%;\n  margin-bottom: 8px;\n  padding: 8px 16px;\n}\n\n._container_118p6_1:hover {\n  transition: 0.3s background-color;\n  background-color: var(--veryLightBloobirds);\n}\n\n._headerText_118p6_19 {\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  margin-left: -5px;\n}\n\n._headerText_118p6_19 > div:first-child {\n  flex-shrink: 0;\n}\n\n._mainInfo_118p6_30 {\n  display: flex;\n  justify-content: space-between;\n  align-content: center;\n  gap: 8px;\n  width: 100%;\n}\n\n._infoFields_118p6_38 {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n}\n\n._infoFields_118p6_38 > div:first-child {\n  margin-left: -2px;\n}\n\n._infoFields_118p6_38 > div:last-child {\n  margin-left: auto;\n}\n\n._opportunityName_118p6_53 {\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n  align-content: center;\n  margin-left: 8px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  flex-shrink: 1;\n  flex-grow: 1;\n}\n\n._status_118p6_66 {\n  display: flex;\n  align-items: flex-start;\n  margin-left: auto;\n  flex-shrink: 0;\n  max-width: 100%;\n}\n\n._status_118p6_66 > * {\n  margin-left: 4px;\n}\n\n._text_118p6_78 {\n  flex-shrink: 1;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n._amountWrapper_118p6_85 {\n  gap: 6px;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n}\n\n._amount_118p6_85 {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._amountCurrency_118p6_98 {\n  flex-shrink: 0;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_118p6_1";
export const headerText = "_headerText_118p6_19";
export const mainInfo = "_mainInfo_118p6_30";
export const infoFields = "_infoFields_118p6_38";
export const opportunityName = "_opportunityName_118p6_53";
export const status = "_status_118p6_66";
export const text = "_text_118p6_78";
export const amountWrapper = "_amountWrapper_118p6_85";
export const amount = "_amount_118p6_85";
export const amountCurrency = "_amountCurrency_118p6_98";
export default {
	container: container,
	headerText: headerText,
	mainInfo: mainInfo,
	infoFields: infoFields,
	opportunityName: opportunityName,
	status: status,
	text: text,
	amountWrapper: amountWrapper,
	amount: amount,
	amountCurrency: amountCurrency
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))