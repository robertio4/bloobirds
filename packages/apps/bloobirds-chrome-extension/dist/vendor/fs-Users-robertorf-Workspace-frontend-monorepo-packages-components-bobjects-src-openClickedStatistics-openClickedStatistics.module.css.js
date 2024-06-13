import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-bobjects-src-openClickedStatistics-openClickedStatistics.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/bobjects/src/openClickedStatistics/openClickedStatistics.module.css"
const __vite__css = ".__container_qujr6_1 {\n  flex-grow: 1;\n}\n\n.__statistic_container_qujr6_5 {\n  display: flex;\n}\n\n.__statistic_container_qujr6_5 > * + * {\n  margin-left: 8px;\n}\n\n.__statistic_qujr6_5 {\n  display: flex;\n  align-items: center;\n}\n\n.__statistic_qujr6_5 > *:first-child {\n  margin-right: 8px;\n}\n\n.__history_list_qujr6_22 {\n  margin: 0;\n  padding: 0 0 24px;\n}\n\n.__history_item_qujr6_27 {\n  padding: 0;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n\n.__history_item_qujr6_27::before {\n  content: '';\n  margin-right: 8px;\n  width: 9px;\n  height: 9px;\n  border-radius: 100%;\n  background-color: var(--verySoftPeanut);\n}\n\n.__history_item_qujr6_27::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  border-left: 1px dashed #c5d1dd;\n  height: 24px;\n  transform: translateY(calc(100% + 2px));\n  left: 4px;\n}\n\n.__history_item_qujr6_27 > *:last-child {\n  margin-left: 8px;\n}\n\n.__history_item_qujr6_27:last-child:after {\n  display: none;\n}\n\n.__history_link_qujr6_61 {\n  margin-left: 4px;\n  text-decoration: none;\n}\n\n.__showDetails_qujr6_66 {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  margin-left: 32px;\n}\n\n.__showDetails_qujr6_66 > *:first-child {\n  margin-right: 8px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _container = "__container_qujr6_1";
export const _statistic_container = "__statistic_container_qujr6_5";
export const _statistic = "__statistic_qujr6_5";
export const _history_list = "__history_list_qujr6_22";
export const _history_item = "__history_item_qujr6_27";
export const _history_link = "__history_link_qujr6_61";
export const _showDetails = "__showDetails_qujr6_66";
export default {
	_container: _container,
	_statistic_container: _statistic_container,
	_statistic: _statistic,
	_history_list: _history_list,
	_history_item: _history_item,
	_history_link: _history_link,
	_showDetails: _showDetails
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))