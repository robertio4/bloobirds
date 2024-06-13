import {
  require_toFinite
} from "/vendor/.vite-deps-chunk-FI4Q3JFM.js__v--6e4818eb.js";
import "/vendor/.vite-deps-chunk-D4ZK6Y3E.js__v--6e4818eb.js";
import {
  require_castSlice,
  require_hasUnicode,
  require_stringToArray
} from "/vendor/.vite-deps-chunk-UUB6AIPZ.js__v--6e4818eb.js";
import {
  require_baseProperty
} from "/vendor/.vite-deps-chunk-65IA7QHZ.js__v--6e4818eb.js";
import {
  require_baseToString,
  require_toString
} from "/vendor/.vite-deps-chunk-D7AFKAO7.js__v--6e4818eb.js";
import "/vendor/.vite-deps-chunk-3GOPGCA4.js__v--6e4818eb.js";
import {
  require_baseUnary,
  require_nodeUtil
} from "/vendor/.vite-deps-chunk-2A4A6R34.js__v--6e4818eb.js";
import {
  require_isObject
} from "/vendor/.vite-deps-chunk-IIJ2NMC4.js__v--6e4818eb.js";
import "/vendor/.vite-deps-chunk-37XXYSBT.js__v--6e4818eb.js";
import {
  require_baseGetTag,
  require_isObjectLike
} from "/vendor/.vite-deps-chunk-HTCYYZLA.js__v--6e4818eb.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--6e4818eb.js";

// ../../../node_modules/lodash/_baseIsRegExp.js
var require_baseIsRegExp = __commonJS({
  "../../../node_modules/lodash/_baseIsRegExp.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var regexpTag = "[object RegExp]";
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }
    module.exports = baseIsRegExp;
  }
});

// ../../../node_modules/lodash/isRegExp.js
var require_isRegExp = __commonJS({
  "../../../node_modules/lodash/isRegExp.js"(exports, module) {
    var baseIsRegExp = require_baseIsRegExp();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
    module.exports = isRegExp;
  }
});

// ../../../node_modules/lodash/_asciiSize.js
var require_asciiSize = __commonJS({
  "../../../node_modules/lodash/_asciiSize.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var asciiSize = baseProperty("length");
    module.exports = asciiSize;
  }
});

// ../../../node_modules/lodash/_unicodeSize.js
var require_unicodeSize = __commonJS({
  "../../../node_modules/lodash/_unicodeSize.js"(exports, module) {
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    module.exports = unicodeSize;
  }
});

// ../../../node_modules/lodash/_stringSize.js
var require_stringSize = __commonJS({
  "../../../node_modules/lodash/_stringSize.js"(exports, module) {
    var asciiSize = require_asciiSize();
    var hasUnicode = require_hasUnicode();
    var unicodeSize = require_unicodeSize();
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    module.exports = stringSize;
  }
});

// ../../../node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "../../../node_modules/lodash/toInteger.js"(exports, module) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module.exports = toInteger;
  }
});

// ../../../node_modules/lodash/truncate.js
var require_truncate = __commonJS({
  "../../../node_modules/lodash/truncate.js"(exports, module) {
    var baseToString = require_baseToString();
    var castSlice = require_castSlice();
    var hasUnicode = require_hasUnicode();
    var isObject = require_isObject();
    var isRegExp = require_isRegExp();
    var stringSize = require_stringSize();
    var stringToArray = require_stringToArray();
    var toInteger = require_toInteger();
    var toString = require_toString();
    var DEFAULT_TRUNC_LENGTH = 30;
    var DEFAULT_TRUNC_OMISSION = "...";
    var reFlags = /\w*$/;
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
      if (isObject(options)) {
        var separator = "separator" in options ? options.separator : separator;
        length = "length" in options ? toInteger(options.length) : length;
        omission = "omission" in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);
      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
      if (separator === void 0) {
        return result + omission;
      }
      if (strSymbols) {
        end += result.length - end;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match, substring = result;
          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g");
          }
          separator.lastIndex = 0;
          while (match = separator.exec(substring)) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === void 0 ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }
    module.exports = truncate;
  }
});
export default require_truncate();
//# sourceMappingURL=lodash_truncate.js.map
