import __vite__cjsImport0_lodash_camelCase from "/vendor/.vite-deps-lodash_camelCase.js__v--7ba47bc4.js"; const camelCase = __vite__cjsImport0_lodash_camelCase.__esModule ? __vite__cjsImport0_lodash_camelCase.default : __vite__cjsImport0_lodash_camelCase;
import __vite__cjsImport1_lodash_lowerCase from "/vendor/.vite-deps-lodash_lowerCase.js__v--2048e47c.js"; const lowerCase = __vite__cjsImport1_lodash_lowerCase.__esModule ? __vite__cjsImport1_lodash_lowerCase.default : __vite__cjsImport1_lodash_lowerCase;
import __vite__cjsImport2_lodash_startCase from "/vendor/.vite-deps-lodash_startCase.js__v--9bd8a96d.js"; const startCase = __vite__cjsImport2_lodash_startCase.__esModule ? __vite__cjsImport2_lodash_startCase.default : __vite__cjsImport2_lodash_startCase;
export const ellipsis = (str, maxLength, { side = "end", prefix = "..." } = {}) => {
  if (str && str.length > maxLength) {
    const length = maxLength - prefix.length;
    switch (side) {
      case "start":
        return prefix + str.slice(-length);
      case "end":
      default:
        return str.slice(0, length) + prefix;
    }
  }
  return str;
};
export const toCamelCase = camelCase;
export const toTitleCase = (str) => {
  if (!str || typeof str !== "string") {
    return "";
  }
  return startCase(lowerCase(str));
};
export const isHtml = (str) => {
  const regex = RegExp(/(<([^>]+)>)/gi);
  return regex.test(str);
};
export const HTMLToString = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
export const replaceVariables = (text, values) => {
  const regex = new RegExp(/##(.*?)##/);
  if (!text) {
    return null;
  }
  if (!values) {
    return text;
  }
  return text.split(regex).reduce((prev, current, i) => {
    if (!i) {
      return [current];
    }
    return prev.concat(values[current] || current);
  }, []);
};
