import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/whatsappRenderer/whatsapp.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/whatsappRenderer/whatsapp.module.css"
const __vite__css = "._button_1x4k0_1 {\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n\n  border: 1px solid;\n  border-radius: 12px;\n\n  font-family: var(--fontFamily);\n  font-weight: var(--fontHeavy);\n  font-size: 8px;\n  line-height: 16px;\n  cursor: pointer;\n  width: 100%;\n\n  padding: 4px 6px;\n}\n\n._button_1x4k0_1 :nth-child(2) {\n  flex: 1;\n  text-align: center;\n}\n\n._button_1x4k0_1:visited {\n  outline: 0;\n  outline: none;\n}\n\n._button_1x4k0_1:hover,\n._button_1x4k0_1:active,\n._button_1x4k0_1:focus {\n  outline: 0;\n  outline: none;\n}\n\n._button_1x4k0_1::-moz-focus-inner {\n  border: 0;\n}\n\n._conversation_1x4k0_40 {\n  min-width: 152px;\n  font-size: 13px;\n}\n\n._enabled_1x4k0_45 {\n  color: var(--bloobirds);\n  background-color: var(--softGray);\n  border-color: var(--softGray);\n}\n\n._enabled_1x4k0_45:hover {\n  background-color: var(--lightestGray);\n}\n\n._success_1x4k0_55 {\n  color: var(--white);\n  background-color: var(--softMelon);\n  border-color: var(--softMelon);\n  cursor: default;\n}\n\n._success_1x4k0_55:hover {\n  background-color: var(--verySoftMelon);\n}\n\n._disabled_1x4k0_66 {\n  color: var(--softPeanut);\n  background-color: var(--softGray);\n  border-color: var(--softGray);\n  cursor: default;\n}\n\n._disabled_1x4k0_66:hover {\n  background-color: var(--lighterGray);\n}\n\n._error_1x4k0_77 {\n  color: var(--tomato);\n  background-color: var(--verySoftTomato);\n  border-color: var(--verySoftTomato);\n}\n\n._error_1x4k0_77:hover {\n  background-color: var(--lightTomato);\n}\n\n._loading_1x4k0_87 {\n  color: var(--bloobirds);\n  background-color: var(--veryLightBloobirds);\n  border-color: var(--veryLightBloobirds);\n  cursor: default;\n  pointer-events: none;\n}\n\n._loading_1x4k0_87:hover {\n  background-color: var(--lightestBloobirds);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const button = "_button_1x4k0_1";
export const conversation = "_conversation_1x4k0_40";
export const enabled = "_enabled_1x4k0_45";
export const success = "_success_1x4k0_55";
export const disabled = "_disabled_1x4k0_66";
export const error = "_error_1x4k0_77";
export const loading = "_loading_1x4k0_87";
export default {
	button: button,
	conversation: conversation,
	enabled: enabled,
	success: success,
	disabled: disabled,
	error: error,
	loading: loading
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))