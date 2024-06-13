import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/extensionLeftBar/components/views/newTasksView/filters/components/customChipGroup.module.css"
const __vite__css = ".__chipGroup_1wgvt_1 {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 2px;\n    margin-bottom: 8px;\n}\n\n.__chip_1wgvt_1 {\n    display: flex;\n    padding: 4px 5px;\n    align-items: center;\n    gap: 4px;\n\n    cursor: pointer;\n\n    border-radius: 15px;\n    background: var(--lightestBloobirds, #EDF1F5);\n\n    color: var(--peanut, #464F57);\n\n    text-align: center;\n    font-feature-settings: 'clig' off, 'liga' off;\n    font-family: Inter;\n    font-size: 10px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 13.5px; /* 135% */\n\n}\n\n.__selected_1wgvt_32 {\n    background: var(--softPeanut, #94A5BA);\n\n    color: var(--white, #FFF);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _chipGroup = "__chipGroup_1wgvt_1";
export const _chip = "__chip_1wgvt_1";
export const _selected = "__selected_1wgvt_32";
export default {
	_chipGroup: _chipGroup,
	_chip: _chip,
	_selected: _selected
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))