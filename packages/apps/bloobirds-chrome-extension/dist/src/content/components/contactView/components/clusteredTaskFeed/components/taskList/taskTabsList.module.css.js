import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabsList.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/clusteredTaskFeed/components/taskList/taskTabsList.module.css"
const __vite__css = "._header_1o871_1 {\n  display: flex;\n  height: 28px;\n  padding: 0 4px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  align-self: stretch;\n  margin-bottom: 8px;\n\n}\n\n._title_1o871_13 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-grow: 1;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n\n._title_1o871_13 > ._titleText_1o871_22 {\n  color: var(--peanut);\n  font-family: Inter, sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n\n._counter_1o871_31 {\n  height: 24px;\n  min-width: 24px;\n  padding: 0 6px;\n  border-radius: 12px;\n  background: var(--white);\n  color: var(--peanut);\n  font-size: 13px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n._list_1o871_45 {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n}\n\n._taskGroup_1o871_52 {\n  position: relative;\n  padding: 2px 2px 38px;\n  box-sizing: border-box;\n}\n\n._taskGroup_1o871_52:not(:last-child) {\n  margin-bottom: 4px;\n}\n\n._hoverStyle_1o871_62:hover {\n  border-radius: 4px;\n  background: var(--Main-bloobirds-lightest, #EDF1F5);\n  padding-bottom: 2px;\n}\n\n._footer_1o871_68 {\n  display: none;\n  margin-bottom: 4px;\n  margin-top: 8px;\n}\n\n._taskGroup_1o871_52:hover > ._footer_1o871_68 {\n  display: flex;\n  justify-content: center;\n}\n\n._taskCard_1o871_79 {\n  border-radius: 4px;\n  border-top: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  min-height: 80px;\n\n    position: relative;\n    display: flex;\n    padding: 12px 8px;\n    flex-direction: column;\n    justify-content: start;\n    align-items: flex-start;\n    align-self: stretch;\n    gap: 10px;\n    cursor: pointer;\n  transition: margin-bottom 0.2s ease-in-out;\n\n  margin-bottom: 0;\n}\n\n._isExpanded_1o871_104 {\n    margin-bottom:  4px;\n}\n\n._hiddenTaskCard_1o871_108 {\n  border-radius: 0 0 4px 4px;\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  height: 8px;\n  position: relative;\n  margin-top: -2px;\n  gap: 4px;\n}\n\n._taskCard_1o871_79._overdue_1o871_122 {\n  border-top: 1px solid var(--verySoftTomato);\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n._hiddenTaskCard_1o871_108._overdue_1o871_122 {\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n\n._taskCard_1o871_79._completed_1o871_136 {\n  cursor: default;\n  border-color: var(--extraCall);\n  border-width: 1px 1px 1px 4px;\n  border-style: solid;\n}\n\n._hiddenTaskCard_1o871_108._completed_1o871_136 {\n  border-color: var(--extraCall);\n  border-width: 0 1px 1px 4px;\n  border-style: solid;\n}\n\n._taskCardHeader_1o871_149 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  justify-content: space-between;\n}\n\n._taskCardSubtitle_1o871_157 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n}\n\n._taskCardTitle_1o871_164 {\n    color: var(--peanut);\n    font-family: Inter, sans-serif;\n    font-size: 11px;\n    font-style: normal;\n    font-weight: 400;\n    line-height: 16px;\n    align-self: stretch;\n    flex-grow: 1;\n}\n\n._customTaskIcon_1o871_175{\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n._taskCardHeader_1o871_149 > ._taskCardScheduledDate_1o871_182 {\n  color: var(--darkBloobirds, #0077B5);\n  text-align: right;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 16px;\n}\n\n._taskCardBodyText_1o871_191 {\n  color: var(--peanut, #464F57);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 300;\n  line-height: 16px;\n  max-height: 48px;\n  text-overflow: ellipsis;\n  overflow-y: hidden;\n  white-space: normal;\n}\n\n._taskCardBodyText_1o871_191 > * {\n  font-size: 12px;\n}\n\n._bobjectName_1o871_207 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._bobjectName_1o871_207 > svg {\n  flex-shrink: 0;\n}\n\n._bobjectNameText_1o871_220 {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._taskCardContent_1o871_226 {\n  width: 90%;\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  padding-left: 16px;\n}\n\n._taskCardRow_1o871_234 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n._taskCardRow_1o871_234 > span {\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n._taskCardRowTimezone_1o871_245 {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  color: var(--darkBloobirds);\n  line-height: 16px;\n}\n\n._taskCardIcons_1o871_256 {\n  display: flex;\n}\n\n._bobjectNamesSeparator_1o871_260 {\n  height: 8px;\n  border-right: 1px solid var(--softPeanut);\n}\n\n._bobjectNames_1o871_260 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  max-width: 75%;\n}\n\n._taskCardFooter_1o871_273 {\n  height: 20px;\n  overflow: hidden;\n  width: 98%;\n  margin-top: auto;\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n}\n\n._taskCardFooterRight_1o871_283 {\n  display: flex;\n  gap: 4px;\n  align-self: stretch;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n._extraFields_1o871_291 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  align-items: center;\n}\n\n._extraField_1o871_291 {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  color: var(--peanut);\n  max-width: 100%;\n}\n\n._extraField_1o871_291 svg {\n  flex-shrink: 0;\n}\n\n._extraField_1o871_291 > div {\n  overflow: hidden;\n}\n\n._extraField_1o871_291 p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n._startButton_1o871_320 {\n  padding: 2px 8px;\n  font-size: 11px;\n  margin-right: 6px;\n}\n\n.__time_marker_1o871_326 {\n  display: flex;\n  align-items: center;\n  margin: 8px 0;\n}\n\n.__time_marker_line_1o871_332 {\n  background-color: var(--tomato);\n  height: 1px;\n  width: 100%;\n}\n\n.__time_marker_bullet_1o871_338 {\n  background-color: var(--tomato);\n  width: 9px;\n  height: 9px;\n  border-radius: 9px;\n  display: block;\n}\n\n.__mark_as_done_1o871_346{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-right: 8px;\n}\n\n\n.__mark_as_done_text_1o871_357{\n    font-size: 12px;\n    line-height: 16px;\n}\n\n.__mark_as_done_text_1o871_357:hover {\n  color: #2AA0E0;\n}\n\n._emptyState_1o871_366 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 24px;\n}\n\n._emptyState_1o871_366 > h1 {\n  font-size: 13px;\n  font-style: normal;\n  color: var(--peanut, #464F57);\n  font-weight: 500;\n  line-height: 16px; /* 123.077% */\n  letter-spacing: 0.5px;\n}\n\n._emptyState_1o871_366 > h2 {\n  font-size: 13px;\n  font-style: normal;\n  line-height: 16px;\n  color: var(--softPeanut, #94A5BA);\n  text-align: center;\n  margin-top: 2px;\n}\n\n._taskCardHeaderLeft_1o871_391{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n._taskCardHeaderRight_1o871_398{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n.__load_tasks_button_1o871_405{\n  display: flex;\n  font-size: 12px;\n  line-height: 16px;\n  letter-spacing: 0;\n}\n\n"
__vite__updateStyle(__vite__id, __vite__css)
export const header = "_header_1o871_1";
export const title = "_title_1o871_13";
export const titleText = "_titleText_1o871_22";
export const counter = "_counter_1o871_31";
export const list = "_list_1o871_45";
export const taskGroup = "_taskGroup_1o871_52";
export const hoverStyle = "_hoverStyle_1o871_62";
export const footer = "_footer_1o871_68";
export const taskCard = "_taskCard_1o871_79";
export const isExpanded = "_isExpanded_1o871_104";
export const hiddenTaskCard = "_hiddenTaskCard_1o871_108";
export const overdue = "_overdue_1o871_122";
export const completed = "_completed_1o871_136";
export const taskCardHeader = "_taskCardHeader_1o871_149";
export const taskCardSubtitle = "_taskCardSubtitle_1o871_157";
export const taskCardTitle = "_taskCardTitle_1o871_164";
export const customTaskIcon = "_customTaskIcon_1o871_175";
export const taskCardScheduledDate = "_taskCardScheduledDate_1o871_182";
export const taskCardBodyText = "_taskCardBodyText_1o871_191";
export const bobjectName = "_bobjectName_1o871_207";
export const bobjectNameText = "_bobjectNameText_1o871_220";
export const taskCardContent = "_taskCardContent_1o871_226";
export const taskCardRow = "_taskCardRow_1o871_234";
export const taskCardRowTimezone = "_taskCardRowTimezone_1o871_245";
export const taskCardIcons = "_taskCardIcons_1o871_256";
export const bobjectNamesSeparator = "_bobjectNamesSeparator_1o871_260";
export const bobjectNames = "_bobjectNames_1o871_260";
export const taskCardFooter = "_taskCardFooter_1o871_273";
export const taskCardFooterRight = "_taskCardFooterRight_1o871_283";
export const extraFields = "_extraFields_1o871_291";
export const extraField = "_extraField_1o871_291";
export const startButton = "_startButton_1o871_320";
export const _time_marker = "__time_marker_1o871_326";
export const _time_marker_line = "__time_marker_line_1o871_332";
export const _time_marker_bullet = "__time_marker_bullet_1o871_338";
export const _mark_as_done = "__mark_as_done_1o871_346";
export const _mark_as_done_text = "__mark_as_done_text_1o871_357";
export const emptyState = "_emptyState_1o871_366";
export const taskCardHeaderLeft = "_taskCardHeaderLeft_1o871_391";
export const taskCardHeaderRight = "_taskCardHeaderRight_1o871_398";
export const _load_tasks_button = "__load_tasks_button_1o871_405";
export default {
	header: header,
	title: title,
	titleText: titleText,
	counter: counter,
	list: list,
	taskGroup: taskGroup,
	hoverStyle: hoverStyle,
	footer: footer,
	taskCard: taskCard,
	isExpanded: isExpanded,
	hiddenTaskCard: hiddenTaskCard,
	overdue: overdue,
	completed: completed,
	taskCardHeader: taskCardHeader,
	taskCardSubtitle: taskCardSubtitle,
	taskCardTitle: taskCardTitle,
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
	extraField: extraField,
	startButton: startButton,
	_time_marker: _time_marker,
	_time_marker_line: _time_marker_line,
	_time_marker_bullet: _time_marker_bullet,
	_mark_as_done: _mark_as_done,
	_mark_as_done_text: _mark_as_done_text,
	emptyState: emptyState,
	taskCardHeaderLeft: taskCardHeaderLeft,
	taskCardHeaderRight: taskCardHeaderRight,
	_load_tasks_button: _load_tasks_button
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))