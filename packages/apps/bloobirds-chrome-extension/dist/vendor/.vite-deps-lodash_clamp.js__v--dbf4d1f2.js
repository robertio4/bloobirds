import {
  require_toNumber
} from "/vendor/.vite-deps-chunk-D4ZK6Y3E.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-3GOPGCA4.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-IIJ2NMC4.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--dbf4d1f2.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--dbf4d1f2.js";

// ../../../node_modules/lodash/_baseClamp.js
var require_baseClamp = __commonJS({
  "../../../node_modules/lodash/_baseClamp.js"(exports, module) {
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== void 0) {
          number = number <= upper ? number : upper;
        }
        if (lower !== void 0) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }
    module.exports = baseClamp;
  }
});

// ../../../node_modules/lodash/clamp.js
var require_clamp = __commonJS({
  "../../../node_modules/lodash/clamp.js"(exports, module) {
    var baseClamp = require_baseClamp();
    var toNumber = require_toNumber();
    function clamp(number, lower, upper) {
      if (upper === void 0) {
        upper = lower;
        lower = void 0;
      }
      if (upper !== void 0) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== void 0) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }
    module.exports = clamp;
  }
});
export default require_clamp();
//# sourceMappingURL=lodash_clamp.js.map
