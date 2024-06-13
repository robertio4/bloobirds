export const defaultSearchCompany = {
  attempts: 0,
  bobjectType: void 0,
  companyName: "",
  highlights: {},
  lastAttemptDate: "",
  lastTouchDate: "",
  numberOfLeads: 0,
  parentCompanyId: "",
  parentCompanyName: "",
  phoneNumbers: [],
  emails: [],
  rawBobject: { contents: {}, id: void 0 },
  stage: "",
  status: "",
  targetMarket: "",
  touches: 0,
  url: "",
  website: "",
  assignedTo: ""
};
export var SearchAction = /* @__PURE__ */ ((SearchAction2) => {
  SearchAction2["Call"] = "call";
  SearchAction2["Email"] = "email";
  SearchAction2["WhatsApp"] = "whatsapp";
  SearchAction2["LinkedIn"] = "linkedin";
  SearchAction2["Meeting"] = "meeting";
  return SearchAction2;
})(SearchAction || {});
export const typeFilterConstants = ["All", "Company", "Lead", "Opportunity"];
