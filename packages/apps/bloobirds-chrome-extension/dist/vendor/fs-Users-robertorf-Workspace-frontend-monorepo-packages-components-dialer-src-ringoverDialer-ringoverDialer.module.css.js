import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-dialer-src-ringoverDialer-ringoverDialer.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/dialer/src/ringoverDialer/ringoverDialer.module.css"
const __vite__css = "._airCall_dialer_container_4ab88_1 {\n  width: 374px;\n  border-radius: 0 0 8px 8px;\n  flex-grow: 1;\n}\n\n._airCall_dialer_4ab88_1 {\n  height: 600px;\n}\n\n._airCall_dialer_4ab88_1 > iframe {\n  border-radius: 8px;\n  border: 0;\n}\n\n._airCall_dialer_contact_4ab88_16 {\n  display: flex;\n  height: 44px;\n  box-sizing: content-box;\n  padding: var(--Spacing-02, 8px) var(--Spacing-03, 16px) var(--Spacing-03, 8px) var(--Spacing-03, 16px);\n  justify-content: space-between;\n  align-items: center;\n  align-self: stretch;\n}\n\n._airCall_dialer_contact_names_4ab88_26 {\n  display: flex;\n  flex-direction: column;\n}\n\n/*If .airCall_dialer_contact_names has siblings we should change the width to 94%*/\n._airCall_dialer_contact_names_4ab88_26:not(:only-child) {\n  width: 94%;\n}\n\n._airCall_dialer_contact_name_4ab88_26 {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  min-width: 0;\n}\n\n/* If not first child of type .airCall_dialer_contact_name we should add a margin left of 2px */\n._airCall_dialer_contact_name_4ab88_26:not(:first-of-type) {\n  margin-left: 2px;\n}\n\n._airCall_dialer_contact_name_4ab88_26:hover {\n  cursor: pointer;\n}\n\n._airCall_dialer_contact_name_4ab88_26 > svg {\n  flex-shrink: 0;\n}\n\n._airCall_dialer_contact_name_4ab88_26:hover ._airCall_dialer_contact_name_text_4ab88_56 {\n  color: var(--darkBloobirds) !important;\n}\n\n\n._airCall_dialer_contact_name_text_4ab88_56 {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n\n\n"
__vite__updateStyle(__vite__id, __vite__css)
export const airCall_dialer_container = "_airCall_dialer_container_4ab88_1";
export const airCall_dialer = "_airCall_dialer_4ab88_1";
export const airCall_dialer_contact = "_airCall_dialer_contact_4ab88_16";
export const airCall_dialer_contact_names = "_airCall_dialer_contact_names_4ab88_26";
export const airCall_dialer_contact_name = "_airCall_dialer_contact_name_4ab88_26";
export const airCall_dialer_contact_name_text = "_airCall_dialer_contact_name_text_4ab88_56";
export default {
	airCall_dialer_container: airCall_dialer_container,
	airCall_dialer: airCall_dialer,
	airCall_dialer_contact: airCall_dialer_contact,
	airCall_dialer_contact_names: airCall_dialer_contact_names,
	airCall_dialer_contact_name: airCall_dialer_contact_name,
	airCall_dialer_contact_name_text: airCall_dialer_contact_name_text
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))