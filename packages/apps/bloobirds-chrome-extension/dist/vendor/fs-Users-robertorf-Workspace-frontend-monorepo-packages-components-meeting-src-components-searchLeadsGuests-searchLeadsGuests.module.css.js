import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-components-searchLeadsGuests-searchLeadsGuests.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/meeting/src/components/searchLeadsGuests/searchLeadsGuests.module.css"
const __vite__css = ".__item_wrapper_43oek_1 {\n    width: 295px;\n  max-height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.__lead_icon_43oek_8 {\n    border-radius: 50%;\n    background-color: var(--softPeanut);\n    color: var(--white);\n    border-color: var(--white);\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n}\n\n.__lead__info_43oek_21 {\n  margin-left: 8px;\n}\n\n.__lead__company_43oek_25 {\n    display: block;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: 224px;\n}\n\n.__lead__company_43oek_25 > * {\n  margin-right: 4px;\n}\n\n.__company__icon_43oek_37 {\n  flex-shrink: 0;\n}\n\n._noResults_43oek_41 {\n  padding: 8px;\n}\n\n._invite_title_43oek_45 {\n  margin-right: 4px;\n}\n\n._item_43oek_49 {\n  width: 100%;\n}\n\n._invite_other_43oek_53 {\n  display: flex;\n  width: 100%;\n}\n\n._chipGroupDiv_43oek_58 {\n    padding: 8px 6px;\n    display: flex;\n    justify-content: space-evenly;\n    cursor: default;\n    gap: 6px;\n}\n\n._chipSelected_43oek_66 div {\n  cursor: default;\n}\n\n._inputContainer_43oek_70 {\n    position: relative;\n}\n\n._dropdown_43oek_74 {\n    animation: _popup_43oek_1 125ms ease-in-out forwards;\n    position: absolute;\n    bottom: -4px;\n    border-radius: 4px;\n    box-sizing: border-box;\n    color: var(--peanut);\n    display: flex;\n    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));\n    flex-direction: column;\n    font-family: var(--fontFamily);\n    background-color: var(--white);\n    min-height: 150px;\n    max-height: 220px;\n    min-width: 295px;\n    z-index: 2;\n}\n\n._dropdown_43oek_74 > *::-webkit-scrollbar-track {\n    background-color: transparent;\n}\n\n._dropdown_43oek_74 > *::-webkit-scrollbar {\n    width: 4px;\n}\n\n._dropdown_43oek_74 > *::-webkit-scrollbar-thumb {\n    border: 2px solid var(--gray);\n}\n\n._spinnerContainer_43oek_104 {\n  height: 200px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n\n@keyframes _popup_43oek_1 {\n    from {\n        opacity: 0;\n        transform: translateY(85%) scale(0.85);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(100%) scale(1);\n    }\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _item_wrapper = "__item_wrapper_43oek_1";
export const _lead_icon = "__lead_icon_43oek_8";
export const _lead__info = "__lead__info_43oek_21";
export const _lead__company = "__lead__company_43oek_25";
export const _company__icon = "__company__icon_43oek_37";
export const noResults = "_noResults_43oek_41";
export const invite_title = "_invite_title_43oek_45";
export const item = "_item_43oek_49";
export const invite_other = "_invite_other_43oek_53";
export const chipGroupDiv = "_chipGroupDiv_43oek_58";
export const chipSelected = "_chipSelected_43oek_66";
export const inputContainer = "_inputContainer_43oek_70";
export const dropdown = "_dropdown_43oek_74";
export const popup = "_popup_43oek_1";
export const spinnerContainer = "_spinnerContainer_43oek_104";
export default {
	_item_wrapper: _item_wrapper,
	_lead_icon: _lead_icon,
	_lead__info: _lead__info,
	_lead__company: _lead__company,
	_company__icon: _company__icon,
	noResults: noResults,
	invite_title: invite_title,
	item: item,
	invite_other: invite_other,
	chipGroupDiv: chipGroupDiv,
	chipSelected: chipSelected,
	inputContainer: inputContainer,
	dropdown: dropdown,
	popup: popup,
	spinnerContainer: spinnerContainer
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))