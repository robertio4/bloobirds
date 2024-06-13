import {
  require_toNumber
} from "/vendor/.vite-deps-chunk-D4ZK6Y3E.js__v--7196bd5c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--7196bd5c.js";

// ../../../node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "../../../node_modules/lodash/toFinite.js"(exports, module) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module.exports = toFinite;
  }
});

export {
  require_toFinite
};
//# sourceMappingURL=chunk-FI4Q3JFM.js.map
