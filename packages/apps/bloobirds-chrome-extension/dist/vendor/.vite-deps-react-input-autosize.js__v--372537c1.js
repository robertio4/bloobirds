import {
  require_prop_types
} from "/vendor/.vite-deps-chunk-NFJMNAKM.js__v--372537c1.js";
import "/vendor/.vite-deps-chunk-3G5TFVA6.js__v--372537c1.js";
import {
  require_react
} from "/vendor/.vite-deps-chunk-C7VZVCY4.js__v--372537c1.js";
import {
  __commonJS
} from "/vendor/.vite-deps-chunk-S5KM4IGW.js__v--372537c1.js";

// ../../../node_modules/react-input-autosize/lib/AutosizeInput.js
var require_AutosizeInput = __commonJS({
  "../../../node_modules/react-input-autosize/lib/AutosizeInput.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var sizerStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      visibility: "hidden",
      height: 0,
      overflow: "scroll",
      whiteSpace: "pre"
    };
    var INPUT_PROPS_BLACKLIST = ["extraWidth", "injectStyles", "inputClassName", "inputRef", "inputStyle", "minWidth", "onAutosize", "placeholderIsMinWidth"];
    var cleanInputProps = function cleanInputProps2(inputProps) {
      INPUT_PROPS_BLACKLIST.forEach(function(field) {
        return delete inputProps[field];
      });
      return inputProps;
    };
    var copyStyles = function copyStyles2(styles, node) {
      node.style.fontSize = styles.fontSize;
      node.style.fontFamily = styles.fontFamily;
      node.style.fontWeight = styles.fontWeight;
      node.style.fontStyle = styles.fontStyle;
      node.style.letterSpacing = styles.letterSpacing;
      node.style.textTransform = styles.textTransform;
    };
    var isIE = typeof window !== "undefined" && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;
    var generateId = function generateId2() {
      return isIE ? "_" + Math.random().toString(36).substr(2, 12) : void 0;
    };
    var AutosizeInput = function(_Component) {
      _inherits(AutosizeInput2, _Component);
      _createClass(AutosizeInput2, null, [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props, state) {
          var id = props.id;
          return id !== state.prevId ? { inputId: id || generateId(), prevId: id } : null;
        }
      }]);
      function AutosizeInput2(props) {
        _classCallCheck(this, AutosizeInput2);
        var _this = _possibleConstructorReturn(this, (AutosizeInput2.__proto__ || Object.getPrototypeOf(AutosizeInput2)).call(this, props));
        _this.inputRef = function(el) {
          _this.input = el;
          if (typeof _this.props.inputRef === "function") {
            _this.props.inputRef(el);
          }
        };
        _this.placeHolderSizerRef = function(el) {
          _this.placeHolderSizer = el;
        };
        _this.sizerRef = function(el) {
          _this.sizer = el;
        };
        _this.state = {
          inputWidth: props.minWidth,
          inputId: props.id || generateId(),
          prevId: props.id
        };
        return _this;
      }
      _createClass(AutosizeInput2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;
          this.copyInputStyles();
          this.updateInputWidth();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          if (prevState.inputWidth !== this.state.inputWidth) {
            if (typeof this.props.onAutosize === "function") {
              this.props.onAutosize(this.state.inputWidth);
            }
          }
          this.updateInputWidth();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: "copyInputStyles",
        value: function copyInputStyles() {
          if (!this.mounted || !window.getComputedStyle) {
            return;
          }
          var inputStyles = this.input && window.getComputedStyle(this.input);
          if (!inputStyles) {
            return;
          }
          copyStyles(inputStyles, this.sizer);
          if (this.placeHolderSizer) {
            copyStyles(inputStyles, this.placeHolderSizer);
          }
        }
      }, {
        key: "updateInputWidth",
        value: function updateInputWidth() {
          if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === "undefined") {
            return;
          }
          var newInputWidth = void 0;
          if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
            newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
          } else {
            newInputWidth = this.sizer.scrollWidth + 2;
          }
          var extraWidth = this.props.type === "number" && this.props.extraWidth === void 0 ? 16 : parseInt(this.props.extraWidth) || 0;
          newInputWidth += extraWidth;
          if (newInputWidth < this.props.minWidth) {
            newInputWidth = this.props.minWidth;
          }
          if (newInputWidth !== this.state.inputWidth) {
            this.setState({
              inputWidth: newInputWidth
            });
          }
        }
      }, {
        key: "getInput",
        value: function getInput() {
          return this.input;
        }
      }, {
        key: "focus",
        value: function focus() {
          this.input.focus();
        }
      }, {
        key: "blur",
        value: function blur() {
          this.input.blur();
        }
      }, {
        key: "select",
        value: function select() {
          this.input.select();
        }
      }, {
        key: "renderStyles",
        value: function renderStyles() {
          var injectStyles = this.props.injectStyles;
          return isIE && injectStyles ? _react2.default.createElement("style", { dangerouslySetInnerHTML: {
            __html: "input#" + this.state.inputId + "::-ms-clear {display: none;}"
          } }) : null;
        }
      }, {
        key: "render",
        value: function render() {
          var sizerValue = [this.props.defaultValue, this.props.value, ""].reduce(function(previousValue, currentValue) {
            if (previousValue !== null && previousValue !== void 0) {
              return previousValue;
            }
            return currentValue;
          });
          var wrapperStyle = _extends({}, this.props.style);
          if (!wrapperStyle.display)
            wrapperStyle.display = "inline-block";
          var inputStyle = _extends({
            boxSizing: "content-box",
            width: this.state.inputWidth + "px"
          }, this.props.inputStyle);
          var inputProps = _objectWithoutProperties(this.props, []);
          cleanInputProps(inputProps);
          inputProps.className = this.props.inputClassName;
          inputProps.id = this.state.inputId;
          inputProps.style = inputStyle;
          return _react2.default.createElement(
            "div",
            { className: this.props.className, style: wrapperStyle },
            this.renderStyles(),
            _react2.default.createElement("input", _extends({}, inputProps, { ref: this.inputRef })),
            _react2.default.createElement(
              "div",
              { ref: this.sizerRef, style: sizerStyle },
              sizerValue
            ),
            this.props.placeholder ? _react2.default.createElement(
              "div",
              { ref: this.placeHolderSizerRef, style: sizerStyle },
              this.props.placeholder
            ) : null
          );
        }
      }]);
      return AutosizeInput2;
    }(_react.Component);
    AutosizeInput.propTypes = {
      className: _propTypes2.default.string,
      defaultValue: _propTypes2.default.any,
      extraWidth: _propTypes2.default.oneOfType([
        _propTypes2.default.number,
        _propTypes2.default.string
      ]),
      id: _propTypes2.default.string,
      injectStyles: _propTypes2.default.bool,
      inputClassName: _propTypes2.default.string,
      inputRef: _propTypes2.default.func,
      inputStyle: _propTypes2.default.object,
      minWidth: _propTypes2.default.oneOfType([
        _propTypes2.default.number,
        _propTypes2.default.string
      ]),
      onAutosize: _propTypes2.default.func,
      onChange: _propTypes2.default.func,
      placeholder: _propTypes2.default.string,
      placeholderIsMinWidth: _propTypes2.default.bool,
      style: _propTypes2.default.object,
      value: _propTypes2.default.any
    };
    AutosizeInput.defaultProps = {
      minWidth: 1,
      injectStyles: true
    };
    exports.default = AutosizeInput;
  }
});
export default require_AutosizeInput();
//# sourceMappingURL=react-input-autosize.js.map
