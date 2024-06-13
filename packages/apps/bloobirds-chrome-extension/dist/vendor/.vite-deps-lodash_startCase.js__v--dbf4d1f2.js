import {
  require_createCompounder
} from "/vendor/.vite-deps-chunk-2GNLZWVG.js__v--dbf4d1f2.js";
import {
  require_upperFirst
} from "/vendor/.vite-deps-chunk-QEX2JFTX.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-UUB6AIPZ.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-LIZGL5JR.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-37XXYSBT.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-3GOPGCA4.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--dbf4d1f2.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--dbf4d1f2.js";

// ../../../node_modules/lodash/startCase.js
var require_startCase = __commonJS({
  "../../../node_modules/lodash/startCase.js"(exports, module) {
    var createCompounder = require_createCompounder();
    var upperFirst = require_upperFirst();
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? " " : "") + upperFirst(word);
    });
    module.exports = startCase;
  }
});
export default require_startCase();
//# sourceMappingURL=lodash_startCase.js.map
