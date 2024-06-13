import { camelCase, lowerCase, startCase } from 'lodash';

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
  return regex.test(str) && str?.slice(0, 1) === '<';
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

// https://jsfiddle.net/abernh/twgj8bev/
// Andreas Bernhard https://github.com/abernh
export function validateHtml(htmlStr, strictBoolean) {
  if (typeof htmlStr !== 'string') return false;

  const validateHtmlTag = new RegExp('<[a-z]+(s+|"[^"]*"s?|\'[^\']*\'s?|[^\'">])*>', 'igm');
  const sdom = document.createElement('div');

  let noSrcNoAmpHtmlStr = htmlStr
    .replace(/ src=/, ' svhs___src=')
    .replace(/&amp;/gim, '#svhs#amp##');
  const noSrcNoAmpIgnoreScriptContentHtmlStr = noSrcNoAmpHtmlStr
    .replace(/\n\r?/gim, '#svhs#nl##') // temporarily remove line breaks
    .replace(/(<script[^>]*>)(.*?)(<\/script>)/gim, '$1$3')
    .replace(/#svhs#nl##/gim, '\n\r');
  const htmlTags = noSrcNoAmpIgnoreScriptContentHtmlStr.match(/<[a-z]+[^>]*>/gim);
  const htmlTagsCount = htmlTags ? htmlTags.length : 0;
  let tagsAreValid;
  let resHtmlStr;

  if (!strictBoolean) {
    // ignore <br/> conversions
    noSrcNoAmpHtmlStr = noSrcNoAmpHtmlStr.replace(/<br\s*\/>/, '<br>');
  }

  if (htmlTagsCount) {
    tagsAreValid = htmlTags.reduce(function (isValid, tagStr) {
      return isValid && tagStr.match(validateHtmlTag);
    }, true);

    if (!tagsAreValid) {
      return false;
    }
  }

  try {
    sdom.innerHTML = noSrcNoAmpHtmlStr;
  } catch (err) {
    return false;
  }

  if (sdom.querySelectorAll('*').length !== htmlTagsCount) {
    return false;
  }

  resHtmlStr = sdom.innerHTML.replace(/&amp;/gim, '&'); // undo '&' encoding

  if (!strictBoolean) {
    // ignore empty attribute normalizations
    resHtmlStr = resHtmlStr.replace(/=""/, '');
  }

  return resHtmlStr.replace(/ svhs___src=/gim, ' src=').replace(/#svhs#amp##/, '&amp;');
}
