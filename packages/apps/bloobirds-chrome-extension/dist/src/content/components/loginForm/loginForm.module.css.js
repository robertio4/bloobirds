import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/loginForm/loginForm.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/loginForm/loginForm.module.css"
const __vite__css = ".__logoWrapper_15w8m_1 {\n  padding: 40px 20px;\n  border-bottom: 1px solid var(--lightBloobirds);\n  margin: 0 20px;\n  z-index: 100;\n}\n\n.__birdsMask_15w8m_8 {\n  z-index: 0;\n  position: absolute;\n}\n\n@media (max-height: 610px) {\n  .__birdsMask_15w8m_8 {\n    display: none;\n  }\n}\n\n.__form_15w8m_19 {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  padding: 40px;\n  justify-content: space-between;\n  flex: 1;\n  z-index: 100;\n}\n\n/* @media (max-height: 610px) {\n  ._form {\n    overflow: scroll;\n    display: block;\n  }\n} */\n\n/* Linkedin overrides */\n.__form_15w8m_19 input {\n  margin: 0 !important;\n  box-shadow: none !important;\n  height: auto !important;\n  border: none !important;\n  width: 100%;\n}\n\n.__form_15w8m_19 input::placeholder {\n  color: transparent !important;\n}\n\n.__form_15w8m_19 input:focus {\n  outline: none !important;\n  background-color: transparent;\n}\n\n/* Linkedin overrides */\n.__form_15w8m_19 label {\n  margin: 0 !important;\n}\n\n.__formTop_15w8m_59 {\n  width: 100%;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n.__logoWrapperSidePeek_15w8m_65 {\n  margin-top: 15%;\n}\n\n.__formBottom_15w8m_69 {\n  width: 100%;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n.__formBottomSidePeek_15w8m_75 {\n  margin-bottom: 50%;\n}\n\n.__formTop_15w8m_59 > div {\n  width: 100%;\n  margin-bottom: 20px;\n  align-self: flex-start;\n}\n\n.__formBottom_15w8m_69 button {\n  margin-bottom: 10px;\n}\n\n.__errorWrapper_15w8m_89 {\n  display: flex;\n}\n\n.__errorWrapper_15w8m_89 svg {\n  width: 38px;\n}\n\n.__errorWrapper_15w8m_89 p {\n  margin-left: 10px;\n}\n\n._external_login_15w8m_101 {\n  display: flex;\n  width: 80%;\n  min-height: 202px;\n  margin: 16px auto;\n  flex-direction: column;\n  justify-content: center;\n}\n\n._external_login_15w8m_101 > button {\n  justify-content: center;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const _logoWrapper = "__logoWrapper_15w8m_1";
export const _birdsMask = "__birdsMask_15w8m_8";
export const _form = "__form_15w8m_19";
export const _formTop = "__formTop_15w8m_59";
export const _logoWrapperSidePeek = "__logoWrapperSidePeek_15w8m_65";
export const _formBottom = "__formBottom_15w8m_69";
export const _formBottomSidePeek = "__formBottomSidePeek_15w8m_75";
export const _errorWrapper = "__errorWrapper_15w8m_89";
export const external_login = "_external_login_15w8m_101";
export default {
	_logoWrapper: _logoWrapper,
	_birdsMask: _birdsMask,
	_form: _form,
	_formTop: _formTop,
	_logoWrapperSidePeek: _logoWrapperSidePeek,
	_formBottom: _formBottom,
	_formBottomSidePeek: _formBottomSidePeek,
	_errorWrapper: _errorWrapper,
	external_login: external_login
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))