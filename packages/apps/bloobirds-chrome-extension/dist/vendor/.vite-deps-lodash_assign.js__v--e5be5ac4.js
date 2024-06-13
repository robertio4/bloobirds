import {
  require_baseRest
} from "/vendor/.vite-deps-chunk-OUBC5V6W.js__v--e5be5ac4.js";
import {
  require_isIterateeCall
} from "/vendor/.vite-deps-chunk-3UUW5KKS.js__v--e5be5ac4.js";
import {
  require_copyObject
} from "/vendor/.vite-deps-chunk-5DLNZR32.js__v--e5be5ac4.js";
import {
  require_assignValue
} from "/vendor/.vite-deps-chunk-V73PJKEZ.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-WV3AAPMF.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-2EWDDLHB.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-J65WLLZX.js__v--e5be5ac4.js";
import {
  require_keys
} from "/vendor/.vite-deps-chunk-CZJ4Y4Z6.js__v--e5be5ac4.js";
import {
  require_isPrototype
} from "/vendor/.vite-deps-chunk-XJ7II3X3.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-2A4A6R34.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-3TPQYVTW.js__v--e5be5ac4.js";
import {
  require_isArrayLike
} from "/vendor/.vite-deps-chunk-7OTBT3EY.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-IIJ2NMC4.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-37XXYSBT.js__v--e5be5ac4.js";
import "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--e5be5ac4.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--e5be5ac4.js";

// ../../../node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  "../../../node_modules/lodash/_createAssigner.js"(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  }
});

// ../../../node_modules/lodash/assign.js
var require_assign = __commonJS({
  "../../../node_modules/lodash/assign.js"(exports, module) {
    var assignValue = require_assignValue();
    var copyObject = require_copyObject();
    var createAssigner = require_createAssigner();
    var isArrayLike = require_isArrayLike();
    var isPrototype = require_isPrototype();
    var keys = require_keys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });
    module.exports = assign;
  }
});
export default require_assign();
//# sourceMappingURL=lodash_assign.js.map
