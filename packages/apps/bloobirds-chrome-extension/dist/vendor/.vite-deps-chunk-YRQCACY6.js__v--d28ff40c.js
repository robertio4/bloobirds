import {
  require_defineProperty
} from "/vendor/.vite-deps-chunk-LIKMOIEL.js__v--d28ff40c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--d28ff40c.js";

// ../../../node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../../node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

export {
  require_baseAssignValue
};
//# sourceMappingURL=chunk-YRQCACY6.js.map
