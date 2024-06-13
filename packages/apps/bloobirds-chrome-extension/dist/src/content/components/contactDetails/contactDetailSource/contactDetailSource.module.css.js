import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactDetails/contactDetailSource/contactDetailSource.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactDetails/contactDetailSource/contactDetailSource.module.css"
const __vite__css = "._detail_header_row_1x53d_1 {\n  display: flex;\n  flex-direction: row;\n  vertical-align: middle;\n  gap: 2px;\n}\n._detail_header_row_1x53d_1:hover {\n  cursor: pointer;\n}\n\n._detail_header_row_1x53d_1 > Text {\n  height: content-box;\n}\n\n._detail_header_col_1x53d_15 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  gap: 2px;\n}\n\n\n._detail_dropdown_row_1x53d_24 {\n  vertical-align: middle;\n  gap: 6px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const detail_header_row = "_detail_header_row_1x53d_1";
export const detail_header_col = "_detail_header_col_1x53d_15";
export const detail_dropdown_row = "_detail_dropdown_row_1x53d_24";
export default {
	detail_header_row: detail_header_row,
	detail_header_col: detail_header_col,
	detail_dropdown_row: detail_dropdown_row
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))