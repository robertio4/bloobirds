import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/components/contactView/contactView.module.css.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/robertorf/Workspace/frontend-monorepo/packages/apps/bloobirds-chrome-extension/src/content/components/contactView/contactView.module.css"
const __vite__css = "._header__container_1m1xc_1 {\n  display: flex;\n  height: 44px;\n  justify-content: space-between;\n}\n\n._tab__container_1m1xc_7 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  border-top: 1px solid var(--lightPeanut);\n  box-shadow: 2px -7px 12px -7px var(--verySoftPeanut) inset;\n  cursor: pointer;\n  gap: 6px;\n}\n\n._tab__container_1m1xc_7:not(:first-child) {\n  border-left: 1px solid rgb(0, 119, 181, 0.1);\n}\n\n._tab__container_1m1xc_7:last-child {\n  border-right: none;\n}\n\n._tab__container__selected_1m1xc_26 {\n  box-shadow: none;\n}\n\n._noteDropdown_1m1xc_30 {\n  display: flex;\n  flex-direction: column;\n  padding: 8px;\n  width: 200px;\n}\n\n._noteDropdown_1m1xc_30 > *:first-child {\n  margin-bottom: 8px;\n}\n\n._openAircallDialer_1m1xc_41,\n._openAircallDialer_1m1xc_41:hover {\n  padding: 8px 16px;\n  text-decoration: none;\n}\n\n._noteOptions_1m1xc_47 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n._leadsTitle_1m1xc_53 {\n  margin-bottom: 12px;\n}\n\n._leadsTitleSidePeek_1m1xc_57 {\n  font-size: 13px;\n}\n\n._leadsList_1m1xc_61 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-bottom: 12px;\n}\n\n._overviewContainer_1m1xc_68 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: 12px;\n  padding: 12px;\n}\n\n._overviewContainerSidePeek_1m1xc_76 {\n  gap: 16px;\n  padding: 16px;\n}\n\n._tab__container__noSync_1m1xc_81,\n._tab__container__sync_1m1xc_82 {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: var(--banana);\n}\n\n._tab__container__sync_1m1xc_82 {\n  background-color: var(--extraCall);\n}\n\n._dropdown_contact_action_item_1m1xc_93 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 8px;\n  cursor: pointer;\n}\n\n._dropdown_contact_action_item_1m1xc_93:hover {\n  background-color: var(--lighterGray);\n}\n"
__vite__updateStyle(__vite__id, __vite__css)
export const header__container = "_header__container_1m1xc_1";
export const tab__container = "_tab__container_1m1xc_7";
export const tab__container__selected = "_tab__container__selected_1m1xc_26";
export const noteDropdown = "_noteDropdown_1m1xc_30";
export const openAircallDialer = "_openAircallDialer_1m1xc_41";
export const noteOptions = "_noteOptions_1m1xc_47";
export const leadsTitle = "_leadsTitle_1m1xc_53";
export const leadsTitleSidePeek = "_leadsTitleSidePeek_1m1xc_57";
export const leadsList = "_leadsList_1m1xc_61";
export const overviewContainer = "_overviewContainer_1m1xc_68";
export const overviewContainerSidePeek = "_overviewContainerSidePeek_1m1xc_76";
export const tab__container__noSync = "_tab__container__noSync_1m1xc_81";
export const tab__container__sync = "_tab__container__sync_1m1xc_82";
export const dropdown_contact_action_item = "_dropdown_contact_action_item_1m1xc_93";
export default {
	header__container: header__container,
	tab__container: tab__container,
	tab__container__selected: tab__container__selected,
	noteDropdown: noteDropdown,
	openAircallDialer: openAircallDialer,
	noteOptions: noteOptions,
	leadsTitle: leadsTitle,
	leadsTitleSidePeek: leadsTitleSidePeek,
	leadsList: leadsList,
	overviewContainer: overviewContainer,
	overviewContainerSidePeek: overviewContainerSidePeek,
	tab__container__noSync: tab__container__noSync,
	tab__container__sync: tab__container__sync,
	dropdown_contact_action_item: dropdown_contact_action_item
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))