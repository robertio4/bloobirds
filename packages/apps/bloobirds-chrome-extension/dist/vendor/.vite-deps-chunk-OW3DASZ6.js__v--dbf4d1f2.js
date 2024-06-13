import {
  require_assignValue
} from "/vendor/.vite-deps-chunk-DGXDUUC4.js__v--dbf4d1f2.js";
import {
  require_baseAssignValue
} from "/vendor/.vite-deps-chunk-YRQCACY6.js__v--dbf4d1f2.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--dbf4d1f2.js";

// ../../../node_modules/lodash/_copyObject.js
var require_copyObject = __commonJS({
  "../../../node_modules/lodash/_copyObject.js"(exports, module) {
    var assignValue = require_assignValue();
    var baseAssignValue = require_baseAssignValue();
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    module.exports = copyObject;
  }
});

export {
  require_copyObject
};
//# sourceMappingURL=chunk-OW3DASZ6.js.map
