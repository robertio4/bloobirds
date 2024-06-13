import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/taskCard.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskCard/taskCard.module.css"
const __vite__css = "._taskGroup_keoc8_1:hover > ._footer_keoc8_1 {\n  display: flex;\n  justify-content: center;\n}\n\n._taskCard_keoc8_6 {\n  border-radius: 4px;\n  border-top: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  min-height: 80px;\n\n  position: relative;\n  display: flex;\n  padding: 12px 8px;\n  flex-direction: column;\n  justify-content: start;\n  align-items: flex-start;\n  align-self: stretch;\n  gap: 10px;\n  cursor: pointer;\n  transition: margin-bottom 0.2s ease-in-out;\n\n  margin-bottom: 0;\n}\n\n._isExpanded_keoc8_31 {\n  margin-bottom:  4px;\n}\n\n._hiddenTaskCard_keoc8_35 {\n  border-radius: 0 0 4px 4px;\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  height: 8px;\n  position: relative;\n  margin-top: -2px;\n  gap: 4px;\n}\n\n._taskCard_keoc8_6._overdue_keoc8_49 {\n  border-top: 1px solid var(--verySoftTomato);\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n._hiddenTaskCard_keoc8_35._overdue_keoc8_49 {\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n._taskCardHeader_keoc8_62 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  justify-content: space-between;\n}\n\n._taskCardSubtitle_keoc8_70 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n}\n\n._taskCardTitle_keoc8_77 {\n  color: var(--peanut);\n  font-family: Inter, sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n  align-self: stretch;\n  flex-grow: 1;\n}\n\n._skippedText_keoc8_88  {\n  text-decoration: line-through;\n}\n\n._skippedBackground_keoc8_92{\n  background-color: var(--verySoftPeanut);\n}\n\n._customTaskIcon_keoc8_96{\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n._taskCardHeader_keoc8_62 > ._taskCardScheduledDate_keoc8_103 {\n  color: var(--darkBloobirds, #0077B5);\n  text-align: right;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 16px;\n}\n\n._taskCardBodyText_keoc8_112 {\n  color: var(--peanut, #464F57);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 300;\n  line-height: 16px;\n  max-height: 48px;\n  text-overflow: ellipsis;\n  overflow-y: hidden;\n  white-space: normal;\n}\n\n._taskCardBodyText_keoc8_112 > * {\n  font-size: 12px;\n}\n\n._bobjectName_keoc8_128 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._bobjectName_keoc8_128 > svg {\n  flex-shrink: 0;\n}\n\n._bobjectNameText_keoc8_141 {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._taskCardContent_keoc8_147 {\n  width: 90%;\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  padding-left: 16px;\n}\n\n._taskCardRow_keoc8_155 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n._taskCardRow_keoc8_155 > span {\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n._taskCardRowTimezone_keoc8_166 {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  color: var(--darkBloobirds);\n  line-height: 16px;\n}\n\n._taskCardIcons_keoc8_177 {\n  display: flex;\n}\n\n._bobjectNamesSeparator_keoc8_181 {\n  height: 8px;\n  border-right: 1px solid var(--softPeanut);\n}\n\n._bobjectNames_keoc8_181 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  max-width: 75%;\n}\n\n._taskCardFooter_keoc8_194 {\n  height: 20px;\n  overflow: hidden;\n  width: 98%;\n  margin-top: auto;\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n}\n\n._taskCardFooterRight_keoc8_204 {\n  display: flex;\n  gap: 4px;\n  align-self: stretch;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n._extraFields_keoc8_212 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  align-items: center;\n}\n\n._assign_badge_keoc8_219:hover {\n  opacity: 0.8;\n}\n\n._extraField_keoc8_212 {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  color: var(--peanut);\n  max-width: 100%;\n}\n\n._extraField_keoc8_212 svg {\n  flex-shrink: 0;\n}\n\n._extraField_keoc8_212 > div {\n  overflow: hidden;\n}\n\n._extraField_keoc8_212 p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n._startButton_keoc8_245 {\n  padding: 2px 8px;\n  font-size: 11px;\n  margin-right: 6px;\n}\n\n.__time_marker_keoc8_251 {\n  display: flex;\n  align-items: center;\n  margin: 8px 0;\n}\n\n.__time_marker_line_keoc8_257 {\n  background-color: var(--tomato);\n  height: 1px;\n  width: 100%;\n}\n\n.__time_marker_bullet_keoc8_263 {\n  background-color: var(--tomato);\n  width: 9px;\n  height: 9px;\n  border-radius: 9px;\n  display: block;\n}\n\n.__mark_as_done_keoc8_271{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-right: 8px;\n}\n\n\n.__mark_as_done_text_keoc8_282{\n  font-size: 12px;\n  line-height: 16px;\n}\n\n.__mark_as_done_text_keoc8_282:hover {\n  color: #2AA0E0;\n}\n\n._emptyState_keoc8_291 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 24px;\n}\n\n._emptyState_keoc8_291 > h1 {\n  font-size: 13px;\n  font-style: normal;\n  color: var(--peanut, #464F57);\n  font-weight: 500;\n  line-height: 16px; /* 123.077% */\n  letter-spacing: 0.5px;\n}\n\n._emptyState_keoc8_291 > h2 {\n  font-size: 13px;\n  font-style: normal;\n  line-height: 16px;\n  color: var(--softPeanut, #94A5BA);\n  text-align: center;\n  margin-top: 2px;\n}\n\n._taskCardHeaderLeft_keoc8_316{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n._taskCardHeaderRight_keoc8_323{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const taskGroup = "_taskGroup_keoc8_1";
export const footer = "_footer_keoc8_1";
export const taskCard = "_taskCard_keoc8_6";
export const isExpanded = "_isExpanded_keoc8_31";
export const hiddenTaskCard = "_hiddenTaskCard_keoc8_35";
export const overdue = "_overdue_keoc8_49";
export const taskCardHeader = "_taskCardHeader_keoc8_62";
export const taskCardSubtitle = "_taskCardSubtitle_keoc8_70";
export const taskCardTitle = "_taskCardTitle_keoc8_77";
export const skippedText = "_skippedText_keoc8_88";
export const skippedBackground = "_skippedBackground_keoc8_92";
export const customTaskIcon = "_customTaskIcon_keoc8_96";
export const taskCardScheduledDate = "_taskCardScheduledDate_keoc8_103";
export const taskCardBodyText = "_taskCardBodyText_keoc8_112";
export const bobjectName = "_bobjectName_keoc8_128";
export const bobjectNameText = "_bobjectNameText_keoc8_141";
export const taskCardContent = "_taskCardContent_keoc8_147";
export const taskCardRow = "_taskCardRow_keoc8_155";
export const taskCardRowTimezone = "_taskCardRowTimezone_keoc8_166";
export const taskCardIcons = "_taskCardIcons_keoc8_177";
export const bobjectNamesSeparator = "_bobjectNamesSeparator_keoc8_181";
export const bobjectNames = "_bobjectNames_keoc8_181";
export const taskCardFooter = "_taskCardFooter_keoc8_194";
export const taskCardFooterRight = "_taskCardFooterRight_keoc8_204";
export const extraFields = "_extraFields_keoc8_212";
export const assign_badge = "_assign_badge_keoc8_219";
export const extraField = "_extraField_keoc8_212";
export const startButton = "_startButton_keoc8_245";
export const _time_marker = "__time_marker_keoc8_251";
export const _time_marker_line = "__time_marker_line_keoc8_257";
export const _time_marker_bullet = "__time_marker_bullet_keoc8_263";
export const _mark_as_done = "__mark_as_done_keoc8_271";
export const _mark_as_done_text = "__mark_as_done_text_keoc8_282";
export const emptyState = "_emptyState_keoc8_291";
export const taskCardHeaderLeft = "_taskCardHeaderLeft_keoc8_316";
export const taskCardHeaderRight = "_taskCardHeaderRight_keoc8_323";
export default {
	taskGroup: taskGroup,
	footer: footer,
	taskCard: taskCard,
	isExpanded: isExpanded,
	hiddenTaskCard: hiddenTaskCard,
	overdue: overdue,
	taskCardHeader: taskCardHeader,
	taskCardSubtitle: taskCardSubtitle,
	taskCardTitle: taskCardTitle,
	skippedText: skippedText,
	skippedBackground: skippedBackground,
	customTaskIcon: customTaskIcon,
	taskCardScheduledDate: taskCardScheduledDate,
	taskCardBodyText: taskCardBodyText,
	bobjectName: bobjectName,
	bobjectNameText: bobjectNameText,
	taskCardContent: taskCardContent,
	taskCardRow: taskCardRow,
	taskCardRowTimezone: taskCardRowTimezone,
	taskCardIcons: taskCardIcons,
	bobjectNamesSeparator: bobjectNamesSeparator,
	bobjectNames: bobjectNames,
	taskCardFooter: taskCardFooter,
	taskCardFooterRight: taskCardFooterRight,
	extraFields: extraFields,
	assign_badge: assign_badge,
	extraField: extraField,
	startButton: startButton,
	_time_marker: _time_marker,
	_time_marker_line: _time_marker_line,
	_time_marker_bullet: _time_marker_bullet,
	_mark_as_done: _mark_as_done,
	_mark_as_done_text: _mark_as_done_text,
	emptyState: emptyState,
	taskCardHeaderLeft: taskCardHeaderLeft,
	taskCardHeaderRight: taskCardHeaderRight
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))