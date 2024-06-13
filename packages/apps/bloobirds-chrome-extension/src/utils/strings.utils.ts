import camelCase from 'lodash/camelCase';
import lowerCase from 'lodash/lowerCase';
import startCase from 'lodash/startCase';

export const ellipsis = (str, maxLength, { side = 'end', prefix = '...' } = {}) => {
  if (str && str.length > maxLength) {
    const length = maxLength - prefix.length;
    switch (side) {
      case 'start':
        return prefix + str.slice(-length);
      case 'end':
      default:
        return str.slice(0, length) + prefix;
    }
  }
  return str;
};

export const toCamelCase = camelCase;

export const toTitleCase = str => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return startCase(lowerCase(str));
};

export const isHtml = str => {
  const regex = RegExp(/(<([^>]+)>)/gi);
  return regex.test(str);
};

export const HTMLToString = html => {
  const txt = document.createElement('textarea');
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
