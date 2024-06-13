import {
  require_baseAssignValue
} from "/vendor/.vite-deps-chunk-YRQCACY6.js__v--e47c2917.js";
import {
  require_eq
} from "/vendor/.vite-deps-chunk-C6LJGEPB.js__v--e47c2917.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--e47c2917.js";

// ../../../node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "../../../node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

export {
  require_assignValue
};
//# sourceMappingURL=chunk-DGXDUUC4.js.map
