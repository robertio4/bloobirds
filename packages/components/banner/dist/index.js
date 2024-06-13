import { useState } from 'react';
import { Text, Icon } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".banner-module_banner__q6vkE {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 0;\n}\n\n.banner-module_warning__ZY-eD {\n  background-color: var(--verySoftBanana);\n}\n\n.banner-module_softWarning__MDWW- {\n  background-color: #fef5df;\n}\n\n.banner-module_warningOrange__xS-WE {\n  background-color: #fdede1;\n}\n\n.banner-module_success__m9OC0 {\n  background-color: #d9f0c080;\n  opacity: 0.8;\n}\n\n.banner-module_error__rC5RV {\n  background-color: var(--verySoftTomato);\n}\n\n.banner-module_info__Q24vh {\n  background-color: var(--lightestBloobirds);\n  border: 1px solid var(--lightBloobirds);\n  border-radius: 0 0 4px 4px;\n}\n\n.banner-module_close__GIO9B {\n  cursor: pointer;\n  margin-bottom: 2px;\n}\n";
var styles = {"banner":"banner-module_banner__q6vkE","warning":"banner-module_warning__ZY-eD","softWarning":"banner-module_softWarning__MDWW-","warningOrange":"banner-module_warningOrange__xS-WE","success":"banner-module_success__m9OC0","error":"banner-module_error__rC5RV","info":"banner-module_info__Q24vh","close":"banner-module_close__GIO9B"};
styleInject(css_248z);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getIconColor(type) {
  switch (type) {
    case 'warning':
    case 'softWarning':
      return 'banana';
    case 'warningOrange':
      return 'tangerine';
    case 'error':
      return 'tomato';
    case 'success':
      return 'softMelon';
    case 'info':
      return 'bloobirds';
  }
}
function BannerLink(_ref) {
  var children = _ref.children,
    onClick = _ref.onClick;
  return /*#__PURE__*/jsx("span", {
    tabIndex: 0,
    role: "link",
    style: {
      cursor: 'pointer'
    },
    onClick: onClick,
    children: /*#__PURE__*/jsx(Text, {
      htmlTag: "span",
      size: "s",
      color: "bloobirds",
      children: children
    })
  });
}
function Banner(_ref2) {
  var type = _ref2.type,
    children = _ref2.children,
    icon = _ref2.icon,
    _ref2$enableClose = _ref2.enableClose,
    enableClose = _ref2$enableClose === void 0 ? false : _ref2$enableClose;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var handleClose = function handleClose() {
    setShow(false);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: show && /*#__PURE__*/jsxs("div", {
      className: classNames(styles.banner, styles[type]),
      children: [icon && typeof icon === 'string' ? /*#__PURE__*/jsx(Icon, {
        name: icon,
        color: getIconColor(type)
      }) : icon, /*#__PURE__*/jsx(Text, {
        size: "s",
        color: "peanut",
        children: children
      }), enableClose && /*#__PURE__*/jsx("div", {
        className: styles.close,
        onClick: handleClose,
        children: /*#__PURE__*/jsx(Icon, {
          name: "cross",
          color: "peanut",
          size: 20
        })
      })]
    })
  });
}

export { Banner, BannerLink };
//# sourceMappingURL=index.js.map
