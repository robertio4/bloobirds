import { ACTIVITY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-activity.ts.js";
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  COMPANY_STATUS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-companies.ts.js";
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-leads.ts.js";
import { OPPORTUNITY_FIELDS_LOGIC_ROLE, OPPORTUNITY_STATUS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-opportunities.ts.js";
import { OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-opportunityProducts.ts.js";
import { PRODUCT_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-products.ts.js";
import { TASK_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-tasks.ts.js";
export var BobjectTypes = /* @__PURE__ */ ((BobjectTypes2) => {
  BobjectTypes2["Company"] = "Company";
  BobjectTypes2["Lead"] = "Lead";
  BobjectTypes2["Opportunity"] = "Opportunity";
  BobjectTypes2["Task"] = "Task";
  BobjectTypes2["Activity"] = "Activity";
  return BobjectTypes2;
})(BobjectTypes || {});
export var BOBJECT_TYPES = /* @__PURE__ */ ((BOBJECT_TYPES2) => {
  BOBJECT_TYPES2["ACTIVITY"] = "Activity";
  BOBJECT_TYPES2["COMPANY"] = "Company";
  BOBJECT_TYPES2["LEAD"] = "Lead";
  BOBJECT_TYPES2["OPPORTUNITY"] = "Opportunity";
  BOBJECT_TYPES2["TASK"] = "Task";
  BOBJECT_TYPES2["OPPORTUNITY_PRODUCT"] = "OpportunityProduct";
  BOBJECT_TYPES2["PRODUCT"] = "Product";
  return BOBJECT_TYPES2;
})(BOBJECT_TYPES || {});
export var PluralBobjectTypes = /* @__PURE__ */ ((PluralBobjectTypes2) => {
  PluralBobjectTypes2["Company"] = "Companies";
  PluralBobjectTypes2["Lead"] = "Leads";
  PluralBobjectTypes2["Activity"] = "Activities";
  PluralBobjectTypes2["Task"] = "Tasks";
  PluralBobjectTypes2["Opportunity"] = "Opportunities";
  PluralBobjectTypes2["Product"] = "Products";
  PluralBobjectTypes2["OpportunityProduct"] = "Opportunity products";
  return PluralBobjectTypes2;
})(PluralBobjectTypes || {});
export var SingularFromPluralBobjectTypes = /* @__PURE__ */ ((SingularFromPluralBobjectTypes2) => {
  SingularFromPluralBobjectTypes2["Companies"] = "Company";
  SingularFromPluralBobjectTypes2["Leads"] = "Lead";
  SingularFromPluralBobjectTypes2["Activities"] = "Activity";
  SingularFromPluralBobjectTypes2["Tasks"] = "Task";
  SingularFromPluralBobjectTypes2["Opportunities"] = "Opportunity";
  return SingularFromPluralBobjectTypes2;
})(SingularFromPluralBobjectTypes || {});
export function isBobject(bobject) {
  return bobject && bobject.id && bobject.fields;
}
export const STAGE_VALUES_LOGIC_ROLES = {
  ["Company" /* Company */]: COMPANY_STAGE_LOGIC_ROLE,
  ["Lead" /* Lead */]: LEAD_STAGE_LOGIC_ROLE,
  ["Opportunity" /* Opportunity */]: OPPORTUNITY_STATUS_LOGIC_ROLE
};
export const STATUS_VALUES_LOGIC_ROLES = Object.freeze({
  ["Company" /* Company */]: COMPANY_STATUS_LOGIC_ROLE,
  ["Lead" /* Lead */]: LEAD_STATUS_LOGIC_ROLE,
  ["Opportunity" /* Opportunity */]: OPPORTUNITY_STATUS_LOGIC_ROLE
});
export const FIELDS_LOGIC_ROLE = {
  ["Company" /* COMPANY */]: COMPANY_FIELDS_LOGIC_ROLE,
  ["Lead" /* LEAD */]: LEAD_FIELDS_LOGIC_ROLE,
  ["Opportunity" /* OPPORTUNITY */]: OPPORTUNITY_FIELDS_LOGIC_ROLE,
  ["Task" /* TASK */]: TASK_FIELDS_LOGIC_ROLE,
  ["Activity" /* ACTIVITY */]: ACTIVITY_FIELDS_LOGIC_ROLE,
  ["OpportunityProduct" /* OPPORTUNITY_PRODUCT */]: OPPORTUNITY_PRODUCT_FIELDS_LOGIC_ROLE,
  ["Product" /* PRODUCT */]: PRODUCT_FIELDS_LOGIC_ROLE
};
export const SALES_STATUS_VALUES_LOGIC_ROLES = Object.freeze({
  ["Company" /* Company */]: COMPANY_SALES_STATUS_VALUES_LOGIC_ROLE,
  ["Lead" /* Lead */]: LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  ["Opportunity" /* Opportunity */]: OPPORTUNITY_STATUS_LOGIC_ROLE
});
export const HUBSPOT = Object.freeze({
  ["Lead" /* Lead */]: "HUBSPOT__CONTACT_ID",
  ["Company" /* Company */]: "HUBSPOT__COMPANY_ID",
  ["Opportunity" /* Opportunity */]: "HUBSPOT__DEAL_ID"
});
export var SALESFORCE_LOGIC_ROLES = /* @__PURE__ */ ((SALESFORCE_LOGIC_ROLES2) => {
  SALESFORCE_LOGIC_ROLES2["LEAD_ID_FIELD"] = "SALESFORCE_LEAD_ID";
  SALESFORCE_LOGIC_ROLES2["CONTACT_ID_FIELD"] = "SALESFORCE_CONTACT_ID";
  SALESFORCE_LOGIC_ROLES2["ACCOUNT_ID_FIELD"] = "SALESFORCE_ACCOUNT_ID";
  SALESFORCE_LOGIC_ROLES2["OPPORTUNITY_ID_FIELD"] = "SALESFORCE_OPPORTUNITY_ID";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_LEAD_STATUS"] = "SALESFORCE_LEAD_STATUS";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_LEAD_STATUS_API_NAME"] = "SALESFORCE_LEAD_STATUS_API_NAME";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_COMPANY_STATUS"] = "SALESFORCE_COMPANY_STATUS";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_COMPANY_STATUS_API_NAME"] = "SALESFORCE_COMPANY_STATUS_API_NAME";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_OPPORTUNITY_STAGE"] = "SALESFORCE_OPPORTUNITY_STAGE";
  SALESFORCE_LOGIC_ROLES2["SALESFORCE_OPPORTUNITY_STAGE_API_NAME"] = "SALESFORCE_OPPORTUNITY_STAGE_API_NAME";
  return SALESFORCE_LOGIC_ROLES2;
})(SALESFORCE_LOGIC_ROLES || {});
export function isBobjectType(type) {
  return Object.values(BobjectTypes).includes(type);
}
