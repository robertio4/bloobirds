import {
  require_getTag
} from "/vendor/.vite-deps-chunk-KMZ3FT3X.js__v--6e765712.js";
import {
  require_baseKeys,
  require_isArguments,
  require_isBuffer,
  require_isPrototype,
  require_isTypedArray
} from "/vendor/.vite-deps-chunk-XJ7II3X3.js__v--6e765712.js";
import "/vendor/.vite-deps-chunk-2A4A6R34.js__v--6e765712.js";
import {
  require_isArrayLike
} from "/vendor/.vite-deps-chunk-7OTBT3EY.js__v--6e765712.js";
import "/vendor/.vite-deps-chunk-IIJ2NMC4.js__v--6e765712.js";
import {
  require_isArray
} from "/vendor/.vite-deps-chunk-37XXYSBT.js__v--6e765712.js";
import "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--6e765712.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--6e765712.js";

// ../../../node_modules/lodash/isEmpty.js
var require_isEmpty = __commonJS({
  "../../../node_modules/lodash/isEmpty.js"(exports, module) {
    var baseKeys = require_baseKeys();
    var getTag = require_getTag();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLike = require_isArrayLike();
    var isBuffer = require_isBuffer();
    var isPrototype = require_isPrototype();
    var isTypedArray = require_isTypedArray();
    var mapTag = "[object Map]";
    var setTag = "[object Set]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }
    module.exports = isEmpty;
  }
});
export default require_isEmpty();
//# sourceMappingURL=lodash_isEmpty.js.map
