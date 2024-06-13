import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/floatingMenu/components/errorBoundary.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/floatingMenu/components/errorBoundary.module.css"
const __vite__css = "._container_1hn7s_1 {\n  width: 440px;\n  position: absolute;\n  right: 24px;\n  bottom: 32px;\n  background-color: var(--white);\n  z-index: 1000;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgb(148 165 180 / 20%);\n}\n\n._container_1hn7s_1 * {\n  box-sizing: border-box;\n}\n\n._header_1hn7s_16 {\n  height: 56px;\n  width: 100%;\n  background-color: var(--bloobirds);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 8px 8px 0 0;\n}\n\n._contentWrapper_1hn7s_27 {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 24px;\n}\n\n._formHeader_1hn7s_34 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n._footer_1hn7s_41 {\n  display: flex;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n._footer_1hn7s_41 button {\n  display: flex;\n  justify-content: center;\n}\n\n._formWrapper_1hn7s_52 {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-top: 8px;\n}\n\n._formInput_1hn7s_59 textarea {\n  height: 100%;\n}\n\n#_sentry-feedback_1hn7s_1 {\n  --submit-background: var(--bloobirds);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_1hn7s_1";
export const header = "_header_1hn7s_16";
export const contentWrapper = "_contentWrapper_1hn7s_27";
export const formHeader = "_formHeader_1hn7s_34";
export const footer = "_footer_1hn7s_41";
export const formWrapper = "_formWrapper_1hn7s_52";
export const formInput = "_formInput_1hn7s_59";
export default {
	container: container,
	header: header,
	contentWrapper: contentWrapper,
	formHeader: formHeader,
	footer: footer,
	formWrapper: formWrapper,
	formInput: formInput,
	"sentry-feedback": "_sentry-feedback_1hn7s_1"
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))