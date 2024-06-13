import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/recipientSearchInput.module.css"
const __vite__css = "._container_jox64_1 {\n  max-width: 85%;\n  position: relative;\n  align-items: center;\n  display: flex;\n  flex: 1 1 0;\n  flex-wrap: wrap;\n  gap: 8px;\n  cursor: text;\n}\n\n._input_jox64_12,\n._container_jox64_1 > div > input {\n  font-family: var(--fontFamily);\n  font-size: 16px;\n  padding: 0;\n  margin: 0;\n  color: var(--peanut);\n  background-color: transparent;\n  border: none;\n  outline: none;\n}\n\n._input_jox64_12::placeholder,\n._container_jox64_1 > div > input::placeholder {\n  color: transparent;\n}\n\n._input_jox64_12:focus,\n._container_jox64_1 > div > input:focus {\n  outline: none;\n  box-shadow: none;\n  background-color: transparent;\n}\n\n._sizer_jox64_36 {\n  min-width: 4px;\n  position: absolute;\n  left: -9999px;\n  display: inline-block;\n}\n\n._dropdown_jox64_43 {\n  animation: _popup_jox64_1 125ms ease-in-out forwards;\n  position: absolute;\n  bottom: -8px;\n  left: 0;\n  border-radius: 4px;\n  box-sizing: border-box;\n  color: var(--peanut);\n  display: flex;\n  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));\n  flex-direction: column;\n  font-family: var(--fontFamily);\n  background-color: var(--white);\n  min-height: 28px;\n  min-width: 350px;\n  padding: 8px 0;\n  z-index: 2;\n}\n\n._dropdown_jox64_43 > *::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n\n._dropdown_jox64_43 > *::-webkit-scrollbar {\n  width: 4px;\n}\n\n._dropdown_jox64_43 > *::-webkit-scrollbar-thumb {\n  border: 2px solid var(--gray);\n}\n\n._chipGroupDiv_jox64_74 {\n  padding: 6px 20px 12px 20px;\n  display: flex;\n  justify-content: space-evenly;\n  cursor: default;\n  gap: 6px;\n}\n\n._chipSelected_jox64_82 div {\n  cursor: default;\n}\n\n._dropdownContent_jox64_86 {\n  max-height: 400px;\n  overflow-y: auto;\n}\n\n._spinnerContainer_jox64_91 {\n  height: 200px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n._item_jox64_99 {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  cursor: pointer;\n  font-family: var(--fontFamily);\n  color: var(--darkGray);\n  font-size: 14px;\n  font-weight: var(--fontMedium);\n  line-height: 16px;\n  padding: 8px 16px;\n  background-color: white;\n}\n\n._item_jox64_99[aria-selected=\"true\"] {\n  background-color: var(--lightestBloobirds);\n}\n\n._warningIcon_jox64_117 {\n  margin-right: 2px;\n  margin-left: -4px;\n}\n\n._noContacts_jox64_122 {\n  width: 100%;\n  margin: 8px auto;\n  height: 256px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 0 24px;\n}\n\n@keyframes _popup_jox64_1 {\n  from {\n    opacity: 0;\n    transform: translateY(85%) scale(0.85);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(100%) scale(1);\n  }\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const container = "_container_jox64_1";
export const input = "_input_jox64_12";
export const sizer = "_sizer_jox64_36";
export const dropdown = "_dropdown_jox64_43";
export const popup = "_popup_jox64_1";
export const chipGroupDiv = "_chipGroupDiv_jox64_74";
export const chipSelected = "_chipSelected_jox64_82";
export const dropdownContent = "_dropdownContent_jox64_86";
export const spinnerContainer = "_spinnerContainer_jox64_91";
export const item = "_item_jox64_99";
export const warningIcon = "_warningIcon_jox64_117";
export const noContacts = "_noContacts_jox64_122";
export default {
	container: container,
	input: input,
	sizer: sizer,
	dropdown: dropdown,
	popup: popup,
	chipGroupDiv: chipGroupDiv,
	chipSelected: chipSelected,
	dropdownContent: dropdownContent,
	spinnerContainer: spinnerContainer,
	item: item,
	warningIcon: warningIcon,
	noContacts: noContacts
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))