import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  CALL_RESULTS_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-activity.ts.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-bobjects.ts.js";
export const magicFilterORs = (bobjectType) => {
  return [
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: [
        ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
        ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND
      ]
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES]: "__MATCH_FULL_ROWS__",
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: "ACTIVITY__TYPE__STATUS",
      ...bobjectType !== BobjectTypes.Opportunity ? { [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: "__MATCH_FULL_ROWS__" } : {}
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: DIRECTION_VALUES_LOGIC_ROLE.INCOMING,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: DIRECTION_VALUES_LOGIC_ROLE.OUTGOING,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RESULT]: CALL_RESULTS_LOGIC_ROLE.CORRECT_CONTACT
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: DIRECTION_VALUES_LOGIC_ROLE.OUTGOING,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION]: {
        query: {
          gte: 60
        },
        searchMode: "RANGE__SEARCH"
      }
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION]: DIRECTION_VALUES_LOGIC_ROLE.INCOMING,
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL,
      [ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION]: {
        query: {
          gte: 60
        },
        searchMode: "RANGE__SEARCH"
      }
    },
    {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE
    }
  ].filter(Boolean);
};
export var BulkActions = /* @__PURE__ */ ((BulkActions2) => {
  BulkActions2["CREATE"] = "CREATE";
  BulkActions2["UPDATE"] = "UPDATE";
  BulkActions2["DELETE"] = "DELETE";
  BulkActions2["RESYNC"] = "RESYNC";
  BulkActions2["START_CADENCE"] = "START_CADENCE";
  BulkActions2["STOP_CADENCE"] = "STOP_CADENCE";
  return BulkActions2;
})(BulkActions || {});
export var TypeSearch = /* @__PURE__ */ ((TypeSearch2) => {
  TypeSearch2["SEARCH"] = "search";
  TypeSearch2["AGGREGATION"] = "aggregation";
  return TypeSearch2;
})(TypeSearch || {});
