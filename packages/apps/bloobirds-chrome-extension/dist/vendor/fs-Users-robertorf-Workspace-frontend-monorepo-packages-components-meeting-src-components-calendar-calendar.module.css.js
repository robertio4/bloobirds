import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-calendar-calendar.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/calendar/calendar.module.css"
const __vite__css = "._calendar_1tjng_1 {\n  flex-grow: 1;\n  max-height: 75vh;\n}\n\n._calendar_container_1tjng_6 {\n  position: relative;\n  display: flex;\n  overflow-y: scroll;\n  align-items: stretch;\n  max-height: calc(100% - 80px);\n}\n\n._calendar_timestrings_container_1tjng_14 {\n  height: auto;\n  flex: none;\n  display: flex;\n  align-items: flex-start;\n  min-width: 40px;\n}\n\n._calendar_timestring_container_1tjng_22 {\n  height: 40px;\n  position: relative;\n  padding-inline-end: 8px;\n  text-align: right;\n}\n\n._calendar_timestring_container_1tjng_22:first-child ._calendar_timestring_1tjng_14 {\n  display: none;\n}\n\n._calendar_timestring_1tjng_14 {\n  display: block;\n  color: #70757a;\n  font-size: 10px;\n  position: relative;\n  top: -6px;\n}\n\n._calendar_timestring_1tjng_14 > div {\n  display: flex;\n  justify-content: flex-end;\n}\n\n._calendar_timestrings_1tjng_14 {\n  position: relative;\n  background-color: #fff;\n  box-sizing: border-box;\n  margin-left: auto;\n}\n\n._calendar_column_headers_1tjng_53 {\n  display: flex;\n  margin-left: 40px;\n  margin-bottom: 4px;\n  margin-right: 12px;\n}\n\n._calendar_column_header_1tjng_53 {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n._calendar_column_header_name_1tjng_67 {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 12px;\n  line-height: 16px;\n  color: var(--peanut);\n  margin-bottom: 2px;\n}\n\n._calendar_column_header_name_today_1tjng_76 {\n  font-weight: 500;\n  color: var(--bloobirds);\n}\n\n._calendar_column_header_date_1tjng_81 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n}\n\n._calendar_column_header_date_today_1tjng_90 {\n  background-color: var(--bloobirds);\n  color: white;\n}\n\n._calendar_grid_container_1tjng_95 {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n}\n\n._calendar_grid_1tjng_95 {\n  border-bottom: #dadce0 1px solid;\n  position: relative;\n  min-width: 100%;\n  flex: none;\n  display: inline-flex;\n  vertical-align: top;\n  overflow-x: hidden;\n}\n\n._calendar_grid_tiles_1tjng_111 {\n  z-index: 1;\n  border-top: #dadce0 1px solid;\n}\n\n._calendar_grid_tile_1tjng_111 {\n  height: 40px;\n}\n\n._calendar_grid_tile_1tjng_111:after {\n  content: '';\n  border-bottom: #dadce0 1px solid;\n  position: absolute;\n  width: 100%;\n  margin-top: -1px;\n  z-index: 3;\n  pointer-events: none;\n}\n\n._calendar_grid_marker_start_1tjng_130,\n._calendar_grid_marker_end_1tjng_131 {\n  width: 8px;\n  border-inline-end: #dadce0 1px solid;\n}\n\n._calendar_gridcell_container_1tjng_136 {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  border-right: white 1px solid;\n  overflow: visible;\n  display: flex;\n}\n\n._calendar_gridcell_1tjng_136 {\n  grid-column-gap: 3px;\n  z-index: 1;\n  position: relative;\n  height: 100%;\n  border-right: 1px solid var(--verySoftPeanut);\n  box-sizing: border-box;\n  flex-grow: 1;\n  min-width: 0;\n}\n\n._calendar_gridcell_weekend_1tjng_156 {\n  background-color: #dbdbdb2e;\n}\n\n._calendar_cell_1tjng_160 {\n  z-index: 4;\n  padding: 0 3px;\n  box-sizing: border-box;\n  overflow: hidden;\n  border-bottom-right-radius: 2px;\n  border-top-right-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: absolute;\n  color: white;\n  font-size: 11px;\n  line-height: 12px;\n  cursor: pointer;\n}\n\n._calendar_cell_small_1tjng_177 {\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: row;\n  line-height: 10px;\n  font-size: 10px;\n}\n\n._calendar_cell_placeholder_1tjng_186 {\n  border: 1px solid var(--bloobirds);\n  border-radius: 2px;\n  color: var(--bloobirds);\n  cursor: default;\n}\n\n._calendar_cell_small_1tjng_177 > * {\n  flex-shrink: 0;\n}\n\n._calendar_cell_45_1tjng_197 > * {\n  white-space: nowrap !important;\n  overflow: hidden !important;\n}\n\n._calendar_now_marker_1tjng_202 {\n  position: absolute;\n  z-index: 504;\n  border-top: #ea4335 solid 2px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n._calendar_now_marker_1tjng_202:after {\n  background: #ea4335;\n  border-radius: 50%;\n  content: '';\n  position: absolute;\n  height: 12px;\n  margin-inline-start: -6.5px;\n  margin-top: -7px;\n  width: 12px;\n}\n\n._calendar_cell_1tjng_160:not(._calendar_cell_extended_1tjng_222) ._calendar_cell_title_1tjng_222:after {\n  content: ' ';\n  margin-inline-end: 4px;\n}\n\n._calendar_cell_extended_1tjng_222 {\n  display: block;\n}\n\n._calendar_cell_desc_1tjng_231 {\n  display: none;\n}\n\n._calendar_cell_title_1tjng_222,\n._calendar_cell_desc_1tjng_231 {\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  color: var(--black);\n  font-weight: bold;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n._calendar_cell_time_1tjng_252 {\n  color: var(--black);\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Old versions of Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n\n._event_details_container_1tjng_263 {\n  display: flex;\n  flex-direction: column;\n}\n\n._event_details_header_1tjng_268 {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin: 16px 16px 0 16px;\n}\n\n._event_details_body_1tjng_275 {\n  display: flex;\n  flex-direction: column;\n  margin: 16px;\n}\n\n._event_details_datetime_1tjng_281 {\n  display: flex;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n\n._event_details_title_1tjng_287 {\n  display: flex;\n  justify-content: space-between;\n  margin: 2px 16px 0 16px;\n}\n\n._event_details_title_name_1tjng_293 {\n  display: flex;\n  align-items: flex-start;\n}\n\n._event_details_icon_1tjng_298 {\n  flex-shrink: 0;\n}\n\n._event_details_title_text_1tjng_302 {\n  margin: 4px 8px 0 8px !important;\n}\n\n._attendees_details_1tjng_306 {\n  display: flex;\n  align-items: center;\n}\n\n._attendees_title_1tjng_311 {\n  margin-left: 8px !important;\n}\n\n._attendees_list_container_1tjng_315 {\n  display: flex;\n  flex-direction: column;\n  max-height: 260px;\n  overflow-y: auto;\n  margin-left: 28px;\n  padding-right: 8px;\n}\n\n._attendee_container_1tjng_324 {\n  display: flex;\n  align-items: center;\n  margin-top: 8px;\n}\n\n._attendee_container_1tjng_324 > * {\n  margin-right: 8px;\n}\n\n.__invitee_card_1tjng_334 {\n  display: flex;\n  align-items: center;\n  margin: 12px 0;\n}\n\n.__invitee_info_1tjng_340 {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  margin-left: 8px;\n  overflow: hidden;\n}\n\n.__invitee_info_1tjng_340 > p {\n  max-width: 220px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-right: 8px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const calendar = "_calendar_1tjng_1";
export const calendar_container = "_calendar_container_1tjng_6";
export const calendar_timestrings_container = "_calendar_timestrings_container_1tjng_14";
export const calendar_timestring_container = "_calendar_timestring_container_1tjng_22";
export const calendar_timestring = "_calendar_timestring_1tjng_14";
export const calendar_timestrings = "_calendar_timestrings_1tjng_14";
export const calendar_column_headers = "_calendar_column_headers_1tjng_53";
export const calendar_column_header = "_calendar_column_header_1tjng_53";
export const calendar_column_header_name = "_calendar_column_header_name_1tjng_67";
export const calendar_column_header_name_today = "_calendar_column_header_name_today_1tjng_76";
export const calendar_column_header_date = "_calendar_column_header_date_1tjng_81";
export const calendar_column_header_date_today = "_calendar_column_header_date_today_1tjng_90";
export const calendar_grid_container = "_calendar_grid_container_1tjng_95";
export const calendar_grid = "_calendar_grid_1tjng_95";
export const calendar_grid_tiles = "_calendar_grid_tiles_1tjng_111";
export const calendar_grid_tile = "_calendar_grid_tile_1tjng_111";
export const calendar_grid_marker_start = "_calendar_grid_marker_start_1tjng_130";
export const calendar_grid_marker_end = "_calendar_grid_marker_end_1tjng_131";
export const calendar_gridcell_container = "_calendar_gridcell_container_1tjng_136";
export const calendar_gridcell = "_calendar_gridcell_1tjng_136";
export const calendar_gridcell_weekend = "_calendar_gridcell_weekend_1tjng_156";
export const calendar_cell = "_calendar_cell_1tjng_160";
export const calendar_cell_small = "_calendar_cell_small_1tjng_177";
export const calendar_cell_placeholder = "_calendar_cell_placeholder_1tjng_186";
export const calendar_cell_45 = "_calendar_cell_45_1tjng_197";
export const calendar_now_marker = "_calendar_now_marker_1tjng_202";
export const calendar_cell_extended = "_calendar_cell_extended_1tjng_222";
export const calendar_cell_title = "_calendar_cell_title_1tjng_222";
export const calendar_cell_desc = "_calendar_cell_desc_1tjng_231";
export const calendar_cell_time = "_calendar_cell_time_1tjng_252";
export const event_details_container = "_event_details_container_1tjng_263";
export const event_details_header = "_event_details_header_1tjng_268";
export const event_details_body = "_event_details_body_1tjng_275";
export const event_details_datetime = "_event_details_datetime_1tjng_281";
export const event_details_title = "_event_details_title_1tjng_287";
export const event_details_title_name = "_event_details_title_name_1tjng_293";
export const event_details_icon = "_event_details_icon_1tjng_298";
export const event_details_title_text = "_event_details_title_text_1tjng_302";
export const attendees_details = "_attendees_details_1tjng_306";
export const attendees_title = "_attendees_title_1tjng_311";
export const attendees_list_container = "_attendees_list_container_1tjng_315";
export const attendee_container = "_attendee_container_1tjng_324";
export const _invitee_card = "__invitee_card_1tjng_334";
export const _invitee_info = "__invitee_info_1tjng_340";
export default {
	calendar: calendar,
	calendar_container: calendar_container,
	calendar_timestrings_container: calendar_timestrings_container,
	calendar_timestring_container: calendar_timestring_container,
	calendar_timestring: calendar_timestring,
	calendar_timestrings: calendar_timestrings,
	calendar_column_headers: calendar_column_headers,
	calendar_column_header: calendar_column_header,
	calendar_column_header_name: calendar_column_header_name,
	calendar_column_header_name_today: calendar_column_header_name_today,
	calendar_column_header_date: calendar_column_header_date,
	calendar_column_header_date_today: calendar_column_header_date_today,
	calendar_grid_container: calendar_grid_container,
	calendar_grid: calendar_grid,
	calendar_grid_tiles: calendar_grid_tiles,
	calendar_grid_tile: calendar_grid_tile,
	calendar_grid_marker_start: calendar_grid_marker_start,
	calendar_grid_marker_end: calendar_grid_marker_end,
	calendar_gridcell_container: calendar_gridcell_container,
	calendar_gridcell: calendar_gridcell,
	calendar_gridcell_weekend: calendar_gridcell_weekend,
	calendar_cell: calendar_cell,
	calendar_cell_small: calendar_cell_small,
	calendar_cell_placeholder: calendar_cell_placeholder,
	calendar_cell_45: calendar_cell_45,
	calendar_now_marker: calendar_now_marker,
	calendar_cell_extended: calendar_cell_extended,
	calendar_cell_title: calendar_cell_title,
	calendar_cell_desc: calendar_cell_desc,
	calendar_cell_time: calendar_cell_time,
	event_details_container: event_details_container,
	event_details_header: event_details_header,
	event_details_body: event_details_body,
	event_details_datetime: event_details_datetime,
	event_details_title: event_details_title,
	event_details_title_name: event_details_title_name,
	event_details_icon: event_details_icon,
	event_details_title_text: event_details_title_text,
	attendees_details: attendees_details,
	attendees_title: attendees_title,
	attendees_list_container: attendees_list_container,
	attendee_container: attendee_container,
	_invitee_card: _invitee_card,
	_invitee_info: _invitee_info
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))