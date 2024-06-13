import 'react';
import clsx from 'clsx';
import { Icon, Tooltip, Text, IconButton } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import { jsx, jsxs } from 'react/jsx-runtime';

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

var css_248z = ".lightAttachmentList-module_list__jHYOS {\n  display: flex;\n  padding: 7px 0 7px 0;\n  gap: 12px;\n  border-top: 1px solid var(--lightestBloobirds);\n  border-bottom: 1px solid var(--lightestBloobirds);\n  min-width: 0;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  overflow: auto;\n}\n\n.lightAttachmentList-module_wrappedList__PWJ5T {\n  flex-wrap: wrap;\n}\n\n.lightAttachmentList-module_item__NmLNI {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--lightestBloobirds);\n  border-radius: 4px;\n  padding: 8px 14px 8px 14px;\n  max-height: 36px;\n  min-width: 90px;\n  max-width: 200px;\n  flex-shrink: 1;\n}\n\n.lightAttachmentList-module_content__HtKNk {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  white-space: nowrap;\n  min-width: 0;\n  flex-shrink: 1;\n}\n\n.lightAttachmentList-module_content__HtKNk > *:first-child {\n  flex-shrink: 0;\n}\n\n.lightAttachmentList-module_content__HtKNk > div {\n  white-space: nowrap;\n  min-width: 0;\n  max-width: 85%;\n  position: relative;\n  flex-shrink: 1;\n}\n\n.lightAttachmentList-module_content__HtKNk > div > p {\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.lightAttachmentList-module_content__HtKNk button {\n  display: none;\n  height: 16px;\n}\n\n.lightAttachmentList-module_item__NmLNI:hover .lightAttachmentList-module_content__HtKNk button {\n  display: block;\n}\n";
var styles = {"list":"lightAttachmentList-module_list__jHYOS","wrappedList":"lightAttachmentList-module_wrappedList__PWJ5T","item":"lightAttachmentList-module_item__NmLNI","content":"lightAttachmentList-module_content__HtKNk"};
styleInject(css_248z);

function LightAttachmentItem(_ref) {
  var name = _ref.name,
    url = _ref.url,
    id = _ref.id;
  return /*#__PURE__*/jsx("div", {
    className: styles.item,
    role: "listitem",
    children: /*#__PURE__*/jsxs("div", {
      className: styles.content,
      children: [/*#__PURE__*/jsx(Icon, {
        name: "file",
        size: 16,
        color: "softPeanut"
      }), /*#__PURE__*/jsx(Tooltip, {
        title: name,
        position: "top",
        children: /*#__PURE__*/jsx(Text, {
          size: "xs",
          color: "softPeanut",
          children: name
        })
      }), url && /*#__PURE__*/jsx(IconButton, {
        name: "download",
        size: 16,
        color: "bloobirds",
        onClick: function onClick(event) {
          event.stopPropagation();
          api.get('/messaging/mediaFiles/download', {
            params: {
              file_id: id
            },
            responseType: 'blob'
          }).then(function (res) {
            var blobUrl = URL.createObjectURL(res.data);
            var link = document.createElement('a');
            link.download = name;
            link.href = blobUrl;
            link.click();
            link.remove();
          });
        }
      })]
    })
  });
}

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function LightAttachmentList(_ref) {
  var files = _ref.files,
    betterAttachments = _ref.betterAttachments;
  var listClasses = clsx(styles.list, _defineProperty({}, styles.wrappedList, files.length > 5));
  return /*#__PURE__*/jsx("div", {
    className: listClasses,
    role: "list",
    children: betterAttachments ? betterAttachments.map(function (file) {
      return !!file && /*#__PURE__*/jsx(LightAttachmentItem, {
        name: file.name,
        url: file.url,
        id: file.id
      }, file.id);
    }) : files.map(function (file) {
      return !!file && /*#__PURE__*/jsx(LightAttachmentItem, {
        name: file
      }, file);
    })
  });
}

export { LightAttachmentItem, LightAttachmentList };
//# sourceMappingURL=index.js.map
