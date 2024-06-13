import {
  require_freeGlobal
} from "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--3e3c5e33.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--3e3c5e33.js";

// ../../../node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "../../../node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// ../../../node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "../../../node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

export {
  require_baseUnary,
  require_nodeUtil
};
//# sourceMappingURL=chunk-2A4A6R34.js.map
