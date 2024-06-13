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

export const isStringifiedJSON = str => {
  const jsonStringRegex = /^(\{|\[)(.*?)(\}|\])$/;
  return jsonStringRegex.test(str);
};

export const commaAndFormatArray = array => {
  const last = array.pop();
  return array.join(', ') + ' and ' + last;
};

export const indefiniteArticle = word => {
  const pattern = /^([aeiou])/i;
  const startsWithVowel = pattern.test(word);
  return startsWithVowel ? 'an' : 'a';
};

export const toCamelCase = camelCase;

export const toCamelCaseUpperFirst = str => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return toCamelCase(str).replace(/^[a-z]/g, s => s.toUpperCase());
};

export const toSentenceCase = str => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

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

export const stringToHTML = str => {
  const dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
};

export const HTMLToString = html => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const numberWithDots = number =>
  number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');

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

export const numberToOrdinalString = number => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = number % 100;
  return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const generateShortName = text => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  let initials = [...text.matchAll(rgx)] || [];

  initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

  return String(initials?.slice(0, 2));
};

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const specialChar = ['ñ', 'ü'];
export const isEmail = email =>
  email !== undefined &&
  email !== null &&
  email !== '' &&
  emailRe.test(String(email).toLowerCase()) &&
  !specialChar.some(char => email.toLowerCase().includes(char));

// https://mathiasbynens.be/demo/url-regex
// https://gist.github.com/dperini/729294
const reWeburl = new RegExp(
  '^' +
    // protocol identifier (optional)
    // short syntax // still required
    '(?:(?:(?:https?|ftp):)?\\/\\/)?' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD identifier name, may end with dot
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
  'i',
);
export const isUrl = string =>
  string !== undefined && string !== null && typeof string === 'string' && !!string.match(reWeburl);

export function linkify(text, options = {}) {
  //Check that text is a string and has length
  if (!text || typeof text !== 'string' || text.length === 0) {
    return text;
  }
  let replacePattern1, replacePattern2, replacePattern3, replacedText;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>',
  );

  return replacedText;
}


