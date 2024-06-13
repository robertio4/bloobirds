import {
  require_castSlice,
  require_hasUnicode,
  require_stringToArray
} from "/vendor/.vite-deps-chunk-UUB6AIPZ.js__v--8ef4a71c.js";
import {
  require_toString
} from "/vendor/.vite-deps-chunk-D7AFKAO7.js__v--8ef4a71c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--8ef4a71c.js";

// ../../../node_modules/lodash/_createCaseFirst.js
var require_createCaseFirst = __commonJS({
  "../../../node_modules/lodash/_createCaseFirst.js"(exports, module) {
    var castSlice = require_castSlice();
    var hasUnicode = require_hasUnicode();
    var stringToArray = require_stringToArray();
    var toString = require_toString();
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);
        var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
        var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
        return chr[methodName]() + trailing;
      };
    }
    module.exports = createCaseFirst;
  }
});

// ../../../node_modules/lodash/upperFirst.js
var require_upperFirst = __commonJS({
  "../../../node_modules/lodash/upperFirst.js"(exports, module) {
    var createCaseFirst = require_createCaseFirst();
    var upperFirst = createCaseFirst("toUpperCase");
    module.exports = upperFirst;
  }
});

export {
  require_upperFirst
};
//# sourceMappingURL=chunk-PFKFV6VM.js.map
