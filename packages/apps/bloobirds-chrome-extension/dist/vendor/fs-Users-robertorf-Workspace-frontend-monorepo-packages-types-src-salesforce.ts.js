export var SalesforceTabs = /* @__PURE__ */ ((SalesforceTabs2) => {
  SalesforceTabs2["HOME"] = "home";
  SalesforceTabs2["INBOX"] = "inbox";
  SalesforceTabs2["OUTBOX"] = "outbox";
  SalesforceTabs2["PIPELINE"] = "pipeline";
  SalesforceTabs2["TASKS"] = "tasks";
  SalesforceTabs2["MEETINGS"] = "meetings";
  SalesforceTabs2["INACTIVE"] = "inactive";
  SalesforceTabs2["NURTURING"] = "nurturing";
  SalesforceTabs2["TOOLTIP"] = "tooltip";
  return SalesforceTabs2;
})(SalesforceTabs || {});
export var SalesforceTabsIcon = /* @__PURE__ */ ((SalesforceTabsIcon2) => {
  SalesforceTabsIcon2["HOME"] = "home";
  SalesforceTabsIcon2["INBOX"] = "inbox";
  SalesforceTabsIcon2["OUTBOX"] = "outbox";
  SalesforceTabsIcon2["TASKS"] = "checkDouble";
  SalesforceTabsIcon2["PIPELINE"] = "relatedCompanyLead";
  SalesforceTabsIcon2["MEETINGS"] = "calendar";
  SalesforceTabsIcon2["INACTIVE"] = "alertTriangle";
  SalesforceTabsIcon2["NURTURING"] = "refresh";
  SalesforceTabsIcon2["TOOLTIP"] = "suggestions";
  return SalesforceTabsIcon2;
})(SalesforceTabsIcon || {});
export const crmObjects = [
  {
    label: "Lead",
    crmObject: "Lead",
    icon: "personBody"
  },
  {
    label: "Contact",
    crmObject: "Contact",
    icon: "sfdcContacts"
  },
  {
    label: "Account",
    crmObject: "Account",
    icon: "company"
  },
  {
    label: "Person account",
    crmObject: "Account",
    icon: "person"
  },
  {
    label: "Opportunity",
    crmObject: "Opportunity",
    icon: "sfdcOpp"
  }
];
export const StatusBBCategories = [
  {
    value: "Active",
    logicRole: "SFDC_STATUS_TYPE_ACTIVE"
  },
  {
    value: "Nurturing",
    logicRole: "SFDC_STATUS_TYPE_NURTURING"
  },
  {
    value: "Inactive",
    logicRole: "SFDC_STATUS_TYPE_INACTIVE"
  },
  {
    value: "Lost",
    logicRole: "SFDC_STATUS_TYPE_FINAL_LOST"
  },
  {
    value: "Won",
    logicRole: "SFDC_STATUS_TYPE_FINAL_WON"
  }
];
export const SALESFORCE = Object.freeze({
  LEAD_ID_FIELD: "SALESFORCE_LEAD_ID",
  CONTACT_ID_FIELD: "SALESFORCE_CONTACT_ID",
  ACCOUNT_ID_FIELD: "SALESFORCE_ACCOUNT_ID",
  OPPORTUNITY_ID_FIELD: "SALESFORCE_OPPORTUNITY_ID"
});
