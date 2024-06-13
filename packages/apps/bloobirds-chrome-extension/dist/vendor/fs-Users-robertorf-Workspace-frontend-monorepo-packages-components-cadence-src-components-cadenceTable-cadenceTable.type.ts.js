export var TIME_WINDOW = /* @__PURE__ */ ((TIME_WINDOW2) => {
  TIME_WINDOW2["DAILY"] = "DAILY";
  TIME_WINDOW2["WEEKLY"] = "WEEKLY";
  TIME_WINDOW2["MONTHLY"] = "MONTHLY";
  return TIME_WINDOW2;
})(TIME_WINDOW || {});
export var CadenceType = /* @__PURE__ */ ((CadenceType2) => {
  CadenceType2["call"] = "call";
  CadenceType2["email"] = "email";
  CadenceType2["autoEmail"] = "autoEmail";
  CadenceType2["linkedIn"] = "linkedIn";
  CadenceType2["customTask"] = "customTask";
  CadenceType2["meeting"] = "meeting";
  CadenceType2["inbound"] = "inbound";
  CadenceType2["statusChange"] = "statusChange";
  return CadenceType2;
})(CadenceType || {});
export const cadenceTypesList = Object.values(CadenceType);
export const cadenceResponseDefault = {
  tasks: {},
  timeWindow: "DAILY" /* DAILY */,
  firstTaskDate: "",
  firstActivityDate: "",
  lastTaskDate: "",
  lastActivityDate: ""
};
