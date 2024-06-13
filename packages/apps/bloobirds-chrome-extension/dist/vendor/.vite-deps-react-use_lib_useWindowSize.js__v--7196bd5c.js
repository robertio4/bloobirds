import {
  require_tslib
} from "/vendor/.vite-deps-chunk-XYENBKCZ.js__v--7196bd5c.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--7196bd5c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--7196bd5c.js";

// ../../../node_modules/react-use/lib/useEffectOnce.js
var require_useEffectOnce = __commonJS({
  "../../../node_modules/react-use/lib/useEffectOnce.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var useEffectOnce = function(effect) {
      react_1.useEffect(effect, []);
    };
    exports.default = useEffectOnce;
  }
});

// ../../../node_modules/react-use/lib/useUnmount.js
var require_useUnmount = __commonJS({
  "../../../node_modules/react-use/lib/useUnmount.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var react_1 = require_react();
    var useEffectOnce_1 = tslib_1.__importDefault(require_useEffectOnce());
    var useUnmount = function(fn) {
      var fnRef = react_1.useRef(fn);
      fnRef.current = fn;
      useEffectOnce_1.default(function() {
        return function() {
          return fnRef.current();
        };
      });
    };
    exports.default = useUnmount;
  }
});

// ../../../node_modules/react-use/lib/useRafState.js
var require_useRafState = __commonJS({
  "../../../node_modules/react-use/lib/useRafState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var react_1 = require_react();
    var useUnmount_1 = tslib_1.__importDefault(require_useUnmount());
    var useRafState = function(initialState) {
      var frame = react_1.useRef(0);
      var _a = react_1.useState(initialState), state = _a[0], setState = _a[1];
      var setRafState = react_1.useCallback(function(value) {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(function() {
          setState(value);
        });
      }, []);
      useUnmount_1.default(function() {
        cancelAnimationFrame(frame.current);
      });
      return [state, setRafState];
    };
    exports.default = useRafState;
  }
});

// ../../../node_modules/react-use/lib/misc/util.js
var require_util = __commonJS({
  "../../../node_modules/react-use/lib/misc/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNavigator = exports.isBrowser = exports.off = exports.on = exports.noop = void 0;
    var noop = function() {
    };
    exports.noop = noop;
    function on(obj) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (obj && obj.addEventListener) {
        obj.addEventListener.apply(obj, args);
      }
    }
    exports.on = on;
    function off(obj) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (obj && obj.removeEventListener) {
        obj.removeEventListener.apply(obj, args);
      }
    }
    exports.off = off;
    exports.isBrowser = typeof window !== "undefined";
    exports.isNavigator = typeof navigator !== "undefined";
  }
});

// ../../../node_modules/react-use/lib/useWindowSize.js
var require_useWindowSize = __commonJS({
  "../../../node_modules/react-use/lib/useWindowSize.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var react_1 = require_react();
    var useRafState_1 = tslib_1.__importDefault(require_useRafState());
    var util_1 = require_util();
    var useWindowSize = function(initialWidth, initialHeight) {
      if (initialWidth === void 0) {
        initialWidth = Infinity;
      }
      if (initialHeight === void 0) {
        initialHeight = Infinity;
      }
      var _a = useRafState_1.default({
        width: util_1.isBrowser ? window.innerWidth : initialWidth,
        height: util_1.isBrowser ? window.innerHeight : initialHeight
      }), state = _a[0], setState = _a[1];
      react_1.useEffect(function() {
        if (util_1.isBrowser) {
          var handler_1 = function() {
            setState({
              width: window.innerWidth,
              height: window.innerHeight
            });
          };
          util_1.on(window, "resize", handler_1);
          return function() {
            util_1.off(window, "resize", handler_1);
          };
        }
      }, []);
      return state;
    };
    exports.default = useWindowSize;
  }
});
export default require_useWindowSize();
//# sourceMappingURL=react-use_lib_useWindowSize.js.map
