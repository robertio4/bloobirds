import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/companyBriefCard/companyBriefCard.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/companyBriefCard/companyBriefCard.module.css"
const __vite__css = "._container_1lxa1_1 {\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  /* height: 36px; */\n  border-radius: 4px;\n  border-top: 1px solid var(--veryLightBloobirds);\n  background-color: var(--white);\n  width: 100%;\n  padding: 0 16px;\n}\n\n._containerSidePeek_1lxa1_13 {\n  border: 1px solid #edf1f5;\n  box-shadow: 0px 2px 4px rgb(148 165 180 / 20%);\n  border-radius: 4px;\n  padding-top: 8px;\n}\n\n._containerSidePeek_1lxa1_13 * {\n  font-size: 13px;\n}\n\n._container_1lxa1_1:hover {\n  transition: background-color 0.3s;\n  background-color: var(--veryLightBloobirds);\n}\n\n._details_1lxa1_29 {\n  display: flex;\n  min-height: 35px;\n  justify-content: space-between;\n  align-items: center;\n}\n\n._left_info_1lxa1_36 {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 4px;\n}\n\n._detailsButton_1lxa1_43 {\n  display: flex;\n  justify-content: flex-end;\n  margin-right: 8px;\n}\n\n._status_1lxa1_49 {\n  display: flex;\n  align-items: flex-start;\n}\n\n._status_1lxa1_49 > * {\n  margin-left: 4px;\n}\n\n._text_1lxa1_58 {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n._textSidePeek_1lxa1_64 {\n  font-size: 16px;\n}\n\n._statusBadge_1lxa1_68 > div {\n  padding: 0 4px;\n}\n\n._detailsInfo_1lxa1_72 {\n  padding: 0 24px;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  margin-bottom: 8px;\n}\n\n._countsColumn_1lxa1_79 {\n  display: flex;\n  flex-direction: column;\n  width: 40%;\n  margin-right: 2px;\n}\n\n._datesColumn_1lxa1_86 {\n  display: flex;\n  flex-direction: column;\n  width: 60%;\n  margin-right: 2px;\n}\n\n._countBobjects_1lxa1_93 {\n  display: flex;\n  align-items: center;\n  margin: 12px;\n  gap: 4px;\n}\n\n._countBobjects_1lxa1_93 > * {\n  margin-right: 4px;\n}\n\n._badgesContainer_1lxa1_104 {\n  display: flex;\n}\n\n._badgesContainer_1lxa1_104 > * {\n  margin-left: -8px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_1lxa1_1";
export const containerSidePeek = "_containerSidePeek_1lxa1_13";
export const details = "_details_1lxa1_29";
export const left_info = "_left_info_1lxa1_36";
export const detailsButton = "_detailsButton_1lxa1_43";
export const status = "_status_1lxa1_49";
export const text = "_text_1lxa1_58";
export const textSidePeek = "_textSidePeek_1lxa1_64";
export const statusBadge = "_statusBadge_1lxa1_68";
export const detailsInfo = "_detailsInfo_1lxa1_72";
export const countsColumn = "_countsColumn_1lxa1_79";
export const datesColumn = "_datesColumn_1lxa1_86";
export const countBobjects = "_countBobjects_1lxa1_93";
export const badgesContainer = "_badgesContainer_1lxa1_104";
export default {
	container: container,
	containerSidePeek: containerSidePeek,
	details: details,
	left_info: left_info,
	detailsButton: detailsButton,
	status: status,
	text: text,
	textSidePeek: textSidePeek,
	statusBadge: statusBadge,
	detailsInfo: detailsInfo,
	countsColumn: countsColumn,
	datesColumn: datesColumn,
	countBobjects: countBobjects,
	badgesContainer: badgesContainer
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))