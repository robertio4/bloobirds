import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/list/taskTabsList.module.css"
const __vite__css = "._header_3mn68_1 {\n  display: flex;\n  height: 28px;\n  padding: 0 4px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  align-self: stretch;\n  margin-bottom: 8px;\n\n}\n\n._title_3mn68_13 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-grow: 1;\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n\n._title_3mn68_13 > ._titleText_3mn68_22 {\n  color: var(--peanut);\n  font-family: Inter, sans-serif;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n\n._counter_3mn68_31 {\n  height: 24px;\n  min-width: 24px;\n  padding: 0 6px;\n  border-radius: 12px;\n  background: var(--white);\n  color: var(--peanut);\n  font-size: 13px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n._list_3mn68_45 {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  align-self: stretch;\n}\n\n._taskGroup_3mn68_52 {\n  position: relative;\n  padding: 2px 2px 38px;\n  box-sizing: border-box;\n}\n\n._taskGroup_3mn68_52:not(:last-child) {\n  margin-bottom: 4px;\n}\n\n._hoverStyle_3mn68_62:hover {\n  border-radius: 4px;\n  background: var(--Main-bloobirds-lightest, #EDF1F5);\n  padding-bottom: 2px;\n}\n\n._footer_3mn68_68 {\n  display: none;\n  margin-bottom: 4px;\n  margin-top: 8px;\n}\n\n._taskGroup_3mn68_52:hover > ._footer_3mn68_68 {\n  display: flex;\n  justify-content: center;\n}\n\n._taskCard_3mn68_79 {\n  border-radius: 4px;\n  border-top: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  min-height: 80px;\n\n    position: relative;\n    display: flex;\n    padding: 12px 8px;\n    flex-direction: column;\n    justify-content: start;\n    align-items: flex-start;\n    align-self: stretch;\n    gap: 10px;\n    cursor: pointer;\n  transition: margin-bottom 0.2s ease-in-out;\n\n  margin-bottom: 0;\n}\n\n._isExpanded_3mn68_104 {\n    margin-bottom:  4px;\n}\n\n._hiddenTaskCard_3mn68_108 {\n  border-radius: 0 0 4px 4px;\n  border-right: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-bottom: 1px solid var(--Main-peanut-very-light, #E5ECF5);\n  border-left: 4px solid var(--Main-peanut-very-light, #E5ECF5);\n  background: #FFF;\n  box-shadow: 0 2px 4px 0 rgba(25, 145, 255, 0.08);\n  width: 100%;\n  height: 8px;\n  position: relative;\n  margin-top: -2px;\n  gap: 4px;\n}\n\n._taskCard_3mn68_79._overdue_3mn68_122 {\n  border-top: 1px solid var(--verySoftTomato);\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n._hiddenTaskCard_3mn68_108._overdue_3mn68_122 {\n  border-right: 1px solid var(--verySoftTomato);\n  border-bottom: 1px solid var(--verySoftTomato);\n  border-left: 4px solid var(--softTomato);\n}\n\n._taskCardHeader_3mn68_135 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n  justify-content: space-between;\n}\n\n._taskCardSubtitle_3mn68_143 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  align-self: stretch;\n}\n\n._taskCardTitle_3mn68_150 {\n    color: var(--peanut);\n    font-family: Inter, sans-serif;\n    font-size: 11px;\n    font-style: normal;\n    font-weight: 400;\n    line-height: 16px;\n    align-self: stretch;\n    flex-grow: 1;\n}\n\n._customTaskIcon_3mn68_161{\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n._taskCardHeader_3mn68_135 > ._taskCardScheduledDate_3mn68_168 {\n  color: var(--darkBloobirds, #0077B5);\n  text-align: right;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 16px;\n}\n\n._taskCardBodyText_3mn68_177 {\n  color: var(--peanut, #464F57);\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 300;\n  line-height: 16px;\n  max-height: 48px;\n  text-overflow: ellipsis;\n  overflow-y: hidden;\n  white-space: normal;\n}\n\n._taskCardBodyText_3mn68_177 > * {\n  font-size: 12px;\n}\n\n._bobjectName_3mn68_193 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._bobjectName_3mn68_193 > svg {\n  flex-shrink: 0;\n}\n\n._bobjectNameText_3mn68_206 {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n._taskCardContent_3mn68_212 {\n  width: 90%;\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  padding-left: 16px;\n}\n\n._taskCardRow_3mn68_220 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n._taskCardRow_3mn68_220 > span {\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n._taskCardRowTimezone_3mn68_231 {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  font-size: 11px;\n  font-style: normal;\n  font-weight: 400;\n  color: var(--darkBloobirds);\n  line-height: 16px;\n}\n\n._taskCardIcons_3mn68_242 {\n  display: flex;\n}\n\n._bobjectNamesSeparator_3mn68_246 {\n  height: 8px;\n  border-right: 1px solid var(--softPeanut);\n}\n\n._bobjectNames_3mn68_246 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  width: 100%;\n  max-width: 75%;\n}\n\n._taskCardFooter_3mn68_259 {\n  height: 20px;\n  overflow: hidden;\n  width: 98%;\n  margin-top: auto;\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n}\n\n._taskCardFooterRight_3mn68_269 {\n  display: flex;\n  gap: 4px;\n  align-self: stretch;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n._extraFields_3mn68_277 {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  align-items: center;\n}\n\n._extraField_3mn68_277 {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  color: var(--peanut);\n  max-width: 100%;\n}\n\n._extraField_3mn68_277 svg {\n  flex-shrink: 0;\n}\n\n._extraField_3mn68_277 > div {\n  overflow: hidden;\n}\n\n._extraField_3mn68_277 p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n._startButton_3mn68_306 {\n  padding: 2px 8px;\n  font-size: 11px;\n  margin-right: 6px;\n}\n\n.__time_marker_3mn68_312 {\n  display: flex;\n  align-items: center;\n  margin: 8px 0;\n}\n\n.__time_marker_line_3mn68_318 {\n  background-color: var(--tomato);\n  height: 1px;\n  width: 100%;\n}\n\n.__time_marker_bullet_3mn68_324 {\n  background-color: var(--tomato);\n  width: 9px;\n  height: 9px;\n  border-radius: 9px;\n  display: block;\n}\n\n.__mark_as_done_3mn68_332{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-right: 8px;\n}\n\n\n.__mark_as_done_text_3mn68_343{\n    font-size: 12px;\n    line-height: 16px;\n}\n\n.__mark_as_done_text_3mn68_343:hover {\n  color: #2AA0E0;\n}\n\n._emptyState_3mn68_352 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 24px;\n}\n\n._emptyState_3mn68_352 > h1 {\n  font-size: 13px;\n  font-style: normal;\n  color: var(--peanut, #464F57);\n  font-weight: 500;\n  line-height: 16px; /* 123.077% */\n  letter-spacing: 0.5px;\n}\n\n._emptyState_3mn68_352 > h2 {\n  font-size: 13px;\n  font-style: normal;\n  line-height: 16px;\n  color: var(--softPeanut, #94A5BA);\n  text-align: center;\n  margin-top: 2px;\n}\n\n._taskCardHeaderLeft_3mn68_377{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n._taskCardHeaderRight_3mn68_384{\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n.__load_tasks_button_3mn68_391{\n  display: flex;\n  font-size: 12px;\n  line-height: 16px;\n  letter-spacing: 0;\n}\n\n"
__vite__updateStyle(__vite__id, __vite__css)
export const header = "_header_3mn68_1";
export const title = "_title_3mn68_13";
export const titleText = "_titleText_3mn68_22";
export const counter = "_counter_3mn68_31";
export const list = "_list_3mn68_45";
export const taskGroup = "_taskGroup_3mn68_52";
export const hoverStyle = "_hoverStyle_3mn68_62";
export const footer = "_footer_3mn68_68";
export const taskCard = "_taskCard_3mn68_79";
export const isExpanded = "_isExpanded_3mn68_104";
export const hiddenTaskCard = "_hiddenTaskCard_3mn68_108";
export const overdue = "_overdue_3mn68_122";
export const taskCardHeader = "_taskCardHeader_3mn68_135";
export const taskCardSubtitle = "_taskCardSubtitle_3mn68_143";
export const taskCardTitle = "_taskCardTitle_3mn68_150";
export const customTaskIcon = "_customTaskIcon_3mn68_161";
export const taskCardScheduledDate = "_taskCardScheduledDate_3mn68_168";
export const taskCardBodyText = "_taskCardBodyText_3mn68_177";
export const bobjectName = "_bobjectName_3mn68_193";
export const bobjectNameText = "_bobjectNameText_3mn68_206";
export const taskCardContent = "_taskCardContent_3mn68_212";
export const taskCardRow = "_taskCardRow_3mn68_220";
export const taskCardRowTimezone = "_taskCardRowTimezone_3mn68_231";
export const taskCardIcons = "_taskCardIcons_3mn68_242";
export const bobjectNamesSeparator = "_bobjectNamesSeparator_3mn68_246";
export const bobjectNames = "_bobjectNames_3mn68_246";
export const taskCardFooter = "_taskCardFooter_3mn68_259";
export const taskCardFooterRight = "_taskCardFooterRight_3mn68_269";
export const extraFields = "_extraFields_3mn68_277";
export const extraField = "_extraField_3mn68_277";
export const startButton = "_startButton_3mn68_306";
export const _time_marker = "__time_marker_3mn68_312";
export const _time_marker_line = "__time_marker_line_3mn68_318";
export const _time_marker_bullet = "__time_marker_bullet_3mn68_324";
export const _mark_as_done = "__mark_as_done_3mn68_332";
export const _mark_as_done_text = "__mark_as_done_text_3mn68_343";
export const emptyState = "_emptyState_3mn68_352";
export const taskCardHeaderLeft = "_taskCardHeaderLeft_3mn68_377";
export const taskCardHeaderRight = "_taskCardHeaderRight_3mn68_384";
export const _load_tasks_button = "__load_tasks_button_3mn68_391";
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