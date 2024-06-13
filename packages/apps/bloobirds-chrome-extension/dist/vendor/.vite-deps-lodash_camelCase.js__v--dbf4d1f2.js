import {
  require_createCompounder
} from "/vendor/.vite-deps-chunk-2GNLZWVG.js__v--dbf4d1f2.js";
import {
  require_capitalize
} from "/vendor/.vite-deps-chunk-F5S3WW3Y.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-QEX2JFTX.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-UUB6AIPZ.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-LIZGL5JR.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-37XXYSBT.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-3GOPGCA4.js__v--dbf4d1f2.js";
import "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--dbf4d1f2.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--dbf4d1f2.js";

// ../../../node_modules/lodash/camelCase.js
var require_camelCase = __commonJS({
  "../../../node_modules/lodash/camelCase.js"(exports, module) {
    var capitalize = require_capitalize();
    var createCompounder = require_createCompounder();
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });
    module.exports = camelCase;
  }
});
export default require_camelCase();
//# sourceMappingURL=lodash_camelCase.js.map
