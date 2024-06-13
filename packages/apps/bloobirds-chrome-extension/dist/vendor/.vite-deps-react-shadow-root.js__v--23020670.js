import {
  require_prop_types
} from "/vendor/.vite-deps-chunk-NFJMNAKM.js__v--8ef4a71c.js";
import "/vendor/.vite-deps-chunk-3G5TFVA6.js__v--8ef4a71c.js";
import {
  require_react_dom
} from "/vendor/.vite-deps-chunk-3UKJDGBQ.js__v--8ef4a71c.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--8ef4a71c.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--8ef4a71c.js";

// ../../../node_modules/react-shadow-root/lib/ReactShadowRoot.js
var require_ReactShadowRoot = __commonJS({
  "../../../node_modules/react-shadow-root/lib/ReactShadowRoot.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireDefault(require_react());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var constructableStylesheetsSupported = typeof window !== "undefined" && window.ShadowRoot && window.ShadowRoot.prototype.hasOwnProperty("adoptedStyleSheets") && window.CSSStyleSheet && window.CSSStyleSheet.prototype.hasOwnProperty("replace");
    var shadowRootSupported = typeof window !== "undefined" && window.Element && window.Element.prototype.hasOwnProperty("attachShadow");
    var _default = function(_React$PureComponent) {
      _inherits(_default2, _React$PureComponent);
      var _super = _createSuper(_default2);
      function _default2(props) {
        var _this;
        _classCallCheck(this, _default2);
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "state", {
          initialized: false
        });
        _this.placeholder = _react["default"].createRef();
        return _this;
      }
      _createClass(_default2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this$props = this.props, delegatesFocus = _this$props.delegatesFocus, mode = _this$props.mode, stylesheets = _this$props.stylesheets;
          this.shadowRoot = this.placeholder.current.parentNode.attachShadow({
            delegatesFocus,
            mode
          });
          if (stylesheets) {
            this.shadowRoot.adoptedStyleSheets = stylesheets;
          }
          this.setState({
            initialized: true
          });
        }
      }, {
        key: "render",
        value: function render() {
          if (!this.state.initialized) {
            if (this.props.declarative) {
              return _react["default"].createElement("template", {
                ref: this.placeholder,
                shadowroot: this.props.mode
              }, this.props.children);
            }
            return _react["default"].createElement("span", {
              ref: this.placeholder
            });
          }
          return _reactDom["default"].createPortal(this.props.children, this.shadowRoot);
        }
      }]);
      return _default2;
    }(_react["default"].PureComponent);
    exports["default"] = _default;
    _defineProperty(_default, "constructableStylesheetsSupported", constructableStylesheetsSupported);
    _defineProperty(_default, "constructibleStylesheetsSupported", constructableStylesheetsSupported);
    _defineProperty(_default, "defaultProps", {
      declarative: false,
      delegatesFocus: false,
      mode: "open"
    });
    _defineProperty(_default, "displayName", "ReactShadowRoot");
    _defineProperty(_default, "propTypes", {
      declarative: _propTypes["default"].bool,
      delegatesFocus: _propTypes["default"].bool,
      mode: _propTypes["default"].oneOf(["open", "closed"]),
      stylesheets: _propTypes["default"].arrayOf(typeof window !== "undefined" ? _propTypes["default"].instanceOf(window.CSSStyleSheet) : _propTypes["default"].any)
    });
    _defineProperty(_default, "shadowRootSupported", shadowRootSupported);
  }
});

// ../../../node_modules/react-shadow-root/lib/index.js
var require_lib = __commonJS({
  "../../../node_modules/react-shadow-root/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _ReactShadowRoot = _interopRequireDefault(require_ReactShadowRoot());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _default = _ReactShadowRoot["default"];
    exports["default"] = _default;
  }
});
export default require_lib();
//# sourceMappingURL=react-shadow-root.js.map
