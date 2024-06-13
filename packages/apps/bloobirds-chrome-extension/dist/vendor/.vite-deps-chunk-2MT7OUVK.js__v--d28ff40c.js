import {
  require_eq,
  require_isIndex
} from "/vendor/.vite-deps-chunk-C6LJGEPB.js__v--d28ff40c.js";
import {
  require_isArrayLike
} from "/vendor/.vite-deps-chunk-7OTBT3EY.js__v--d28ff40c.js";
import {
  require_isObject
} from "/vendor/.vite-deps-chunk-IIJ2NMC4.js__v--d28ff40c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--d28ff40c.js";

// ../../../node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "../../../node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

export {
  require_isIterateeCall
};
//# sourceMappingURL=chunk-2MT7OUVK.js.map
