import {
  require_baseGetTag,
  require_isObjectLike
} from "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--7196bd5c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--7196bd5c.js";

// ../../../node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../../node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

export {
  require_isSymbol
};
//# sourceMappingURL=chunk-3GOPGCA4.js.map
