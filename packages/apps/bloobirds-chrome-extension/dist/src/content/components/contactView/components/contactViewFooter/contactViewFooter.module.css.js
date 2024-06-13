import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/components/contactViewFooter/contactViewFooter.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/components/contactViewFooter/contactViewFooter.module.css"
const __vite__css = "._footer_container_cop82_1 {\n  display: flex;\n  margin-top: auto;\n  height: 56px;\n  /*Added because in tasks section cards where were in front of the shadow*/\n  z-index: 1000;\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n  position: relative;\n}\n\n._footer_wrapper_cop82_12 {\n  display: flex;\n  justify-content: space-around;\n  position: relative;\n  background-color: white;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  padding-left: 9%;\n  padding-right: 9%;\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px;\n}\n\n._footer_shadow_cop82_26 {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  height: 50%;\n  box-shadow: 0 -1px 8px 0 #94a5b4;\n}\n\n._tab_container_cop82_34 {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 8px;\n  cursor: pointer;\n  border-top: 2px solid transparent;\n  width: 65px;\n  box-sizing: border-box;\n}\n\n._tab_container_selected_cop82_45 {\n  border-top: 2px solid var(--softBloobirds);\n}\n\n._tab_container_playbook_selected_cop82_49 {\n  border-top: 2px solid var(--purple);\n}\n\n._footer_icon_cop82_53 {\n  margin-bottom: 8px;\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const footer_container = "_footer_container_cop82_1";
export const footer_wrapper = "_footer_wrapper_cop82_12";
export const footer_shadow = "_footer_shadow_cop82_26";
export const tab_container = "_tab_container_cop82_34";
export const tab_container_selected = "_tab_container_selected_cop82_45";
export const tab_container_playbook_selected = "_tab_container_playbook_selected_cop82_49";
export const footer_icon = "_footer_icon_cop82_53";
export default {
	footer_container: footer_container,
	footer_wrapper: footer_wrapper,
	footer_shadow: footer_shadow,
	tab_container: tab_container,
	tab_container_selected: tab_container_selected,
	tab_container_playbook_selected: tab_container_playbook_selected,
	footer_icon: footer_icon
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))