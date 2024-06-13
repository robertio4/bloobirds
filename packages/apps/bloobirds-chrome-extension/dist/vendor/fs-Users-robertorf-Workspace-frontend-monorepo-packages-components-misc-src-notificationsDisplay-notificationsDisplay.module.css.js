import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-misc-src-notificationsDisplay-notificationsDisplay.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/misc/src/notificationsDisplay/notificationsDisplay.module.css"
const __vite__css = "._bell_1xsyf_1 {\n  display: flex;\n  align-items: center;\n  height: 16px;\n  transform-origin: top center;\n  margin-right: 8px;\n  z-index: 2;\n}\n\n._pending_1xsyf_10 {\n  animation: _bellshake_1xsyf_1 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n}\n\n._count_1xsyf_14 {\n  cursor: pointer;\n  position: absolute;\n  top: -10px;\n  left: 12px;\n  font-size: 8px;\n  line-height: 16px;\n  background: var(--extraMeeting);\n  color: var(--white);\n  padding: 0 4px;\n  border-radius: 16px;\n  min-width: 8px;\n  border: 1px solid var(--white);\n  text-align: center;\n}\n\n@keyframes _bellshake_1xsyf_1 {\n  0% {\n    transform: rotate(0);\n  }\n  15% {\n    transform: rotate(5deg);\n  }\n  30% {\n    transform: rotate(-5deg);\n  }\n  45% {\n    transform: rotate(4deg);\n  }\n  60% {\n    transform: rotate(-4deg);\n  }\n  75% {\n    transform: rotate(2deg);\n  }\n  85% {\n    transform: rotate(-2deg);\n  }\n  92% {\n    transform: rotate(1deg);\n  }\n  100% {\n    transform: rotate(0);\n  }\n}\n\n.__card_1xsyf_60 {\n  box-sizing: border-box;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  padding: 14px 8px 14px 16px;\n  background-color: var(--white);\n  border-bottom: 1px solid var(--lightBloobirds);\n}\n\n.__card_1xsyf_60 > *:first-child {\n  flex-shrink: 0;\n}\n\n.__card__body_1xsyf_74 {\n  margin: 0 12px;\n  display: flex;\n  flex-direction: column;\n  white-space: pre-line;\n  min-width: 0;\n}\n\n.__card__info_1xsyf_82 {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-left: auto;\n}\n\n.__card_1xsyf_60 > .__card__info_1xsyf_82 > button {\n  visibility: hidden;\n}\n\n.__card_1xsyf_60:hover > .__card__info_1xsyf_82 > button {\n  visibility: visible;\n}\n\n.__card_1xsyf_60:hover {\n  cursor: pointer;\n}\n\n.__unread_1xsyf_101 {\n  background-color: var(--lighterGray);\n  animation: _popup_1xsyf_1 150ms ease-in-out forwards;\n  animation-delay: 250ms;\n  transform: scale(0);\n  opacity: 0;\n}\n\n._title_1xsyf_109 {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n\n._subtitle_1xsyf_117 {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n._titleAlone_1xsyf_123 {\n  margin-bottom: 8px;\n}\n\n@keyframes _popup_1xsyf_1 {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n.__card_date_1xsyf_139 {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.__wrap_1xsyf_145 {\n  width: 400px;\n  padding: 8px 0 0 0;\n  min-height: 350px;\n  max-height: calc(100vh - 197px);\n  overflow: auto;\n}\n\n.__header_wrapper_1xsyf_153 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  padding: 0 16px;\n}\n\n.__link_1xsyf_161 {\n  cursor: pointer;\n}\n\n.__tabs_container_1xsyf_165 > div:first-child > div:first-child > div:first-child {\n  margin-left: 20px;\n}\n\n.__tabs_container_1xsyf_165 > div:first-child > div:first-child > div {\n  min-height: 36px;\n}\n\n.__tabs_container_1xsyf_165 > div:first-child > div:last-child {\n  max-height: 421px;\n  overflow-y: scroll;\n}\n\n.__show_more_1xsyf_178 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  margin-top: 7px;\n}\n\n.__loading_container_1xsyf_186,\n.__empty_container_1xsyf_187 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  margin-top: 96px;\n}\n\n.__loading_container_1xsyf_186 {\n  margin-top: 128px;\n}\n\n.__empty_container_1xsyf_187 > *:first-child {\n  margin-bottom: 12px;\n}\n\n._linkedinNotificationBell_1xsyf_205 {\n  margin-top: -10px;\n  margin-right: 16px;\n}\n\n._salesforceNotificationBell_1xsyf_210 {\n  margin-right: -5px;\n}\n\n._poweredByContainer_1xsyf_214 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 12px;\n  padding-bottom: 4px;\n}\n\n._poweredByBox_1xsyf_222 {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n@media (max-width: 853px) {\n  ._linkedinNotificationBell_1xsyf_205 {\n    margin-top: 0;\n    margin-left: 16px;\n    margin-right: 0;\n  }\n}\n\n@media (max-width: 747px) {\n  ._linkedinNotificationBell_1xsyf_205 {\n    margin: 0 8px;\n  }\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const bell = "_bell_1xsyf_1";
export const pending = "_pending_1xsyf_10";
export const bellshake = "_bellshake_1xsyf_1";
export const count = "_count_1xsyf_14";
export const _card = "__card_1xsyf_60";
export const _card__body = "__card__body_1xsyf_74";
export const _card__info = "__card__info_1xsyf_82";
export const _unread = "__unread_1xsyf_101";
export const popup = "_popup_1xsyf_1";
export const title = "_title_1xsyf_109";
export const subtitle = "_subtitle_1xsyf_117";
export const titleAlone = "_titleAlone_1xsyf_123";
export const _card_date = "__card_date_1xsyf_139";
export const _wrap = "__wrap_1xsyf_145";
export const _header_wrapper = "__header_wrapper_1xsyf_153";
export const _link = "__link_1xsyf_161";
export const _tabs_container = "__tabs_container_1xsyf_165";
export const _show_more = "__show_more_1xsyf_178";
export const _loading_container = "__loading_container_1xsyf_186";
export const _empty_container = "__empty_container_1xsyf_187";
export const linkedinNotificationBell = "_linkedinNotificationBell_1xsyf_205";
export const salesforceNotificationBell = "_salesforceNotificationBell_1xsyf_210";
export const poweredByContainer = "_poweredByContainer_1xsyf_214";
export const poweredByBox = "_poweredByBox_1xsyf_222";
export default {
	bell: bell,
	pending: pending,
	bellshake: bellshake,
	count: count,
	_card: _card,
	_card__body: _card__body,
	_card__info: _card__info,
	_unread: _unread,
	popup: popup,
	title: title,
	subtitle: subtitle,
	titleAlone: titleAlone,
	_card_date: _card_date,
	_wrap: _wrap,
	_header_wrapper: _header_wrapper,
	_link: _link,
	_tabs_container: _tabs_container,
	_show_more: _show_more,
	_loading_container: _loading_container,
	_empty_container: _empty_container,
	linkedinNotificationBell: linkedinNotificationBell,
	salesforceNotificationBell: salesforceNotificationBell,
	poweredByContainer: poweredByContainer,
	poweredByBox: poweredByBox
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))