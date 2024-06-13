import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--6e4818eb.js";

// ../../../node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../../node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../../node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../../node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

export {
  require_isIndex,
  require_eq
};
//# sourceMappingURL=chunk-3TPQYVTW.js.map
