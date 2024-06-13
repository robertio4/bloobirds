import { HTMLToString, isHtml } from './strings.utils';

const REGEX_REMOVE = /(<([^>]+)>)/gi;

const REGEX_ENTER = /(<\/?p>)|(<\/li>)|(<br>)/gi;

const REGEX_LIST = /(<li>)/gi;

const REGEX_MULTIPLE_SPACES = /  +/g;

export const EMAIL_TYPE = {
  GMAIL: 'GMAIL',
  OUTLOOK: 'OUTLOOK',
  BLOOBIRDS: 'BLOOBIRDS',
};

/**
 * Removes HTML tags and special characters from a given text string.
 * @param text - The text string from which HTML tags need to be removed.
 * @returns A new text string with all HTML tags and special characters removed.
 */
export const removeHtmlTags = (text: string): string => {
  const htmlTagRegex = /<[^>]*>/gi;
  const specialCharactersRegex = /&[^;]+;/g;

  const foundTags = text.match(htmlTagRegex);

  const savedTags: string[] = [];
  foundTags?.forEach(tag => {
    if (tag === '<>') {
      savedTags.push(tag);
    } else if (tag === '</>' && savedTags.length > 0) {
      savedTags.pop();
    }
  });

  foundTags?.forEach(tag => {
    if (!savedTags.includes(tag)) {
      text = text.replace(tag, '');
    }
  });

  return text.replace(specialCharactersRegex, '');
};

export const convertHtmlToString = (body, withNewLines = true) => {
  const bodyWithVariables = isHtml(body) ? HTMLToString(body) : body;
  const bodyParsed = withNewLines
    ? bodyWithVariables?.replace(REGEX_ENTER, '\n')
    : bodyWithVariables;
  return bodyParsed
    ?.replace(REGEX_LIST, '- ')
    ?.replace(REGEX_REMOVE, '')
    ?.replace(REGEX_MULTIPLE_SPACES, ' ')
    .replace(/\s+/g, ' ');
};

const parseHtmlToEncodedString = (body, withNewLines = true) => {
  const plainText = convertHtmlToString(body, withNewLines);
  return encodeURIComponent(plainText.trim());
};

const PIXEL_REGEX = [
  /<[^>]+src\s*=\s*['"]*.*(mailtrack.io)([^'"]+)['"][^>]*>/g, // mailtrack
  /<[^>]+src="https:(\/\/nyl\.as|[^>]*.nylas.com).*[^>]*>/g, // nylas
  /<[^>]+href\s*=\s*['"]*.*(cirrusinsight.com)([^'"]+)['"][^>]*>/g, // cirrus
  /<img(?=\s)(?=[^>]*\bwidth\s*=\s*["']?1["']?)(?=[^>]*\bheight\s*=\s*["']?1["']?)(?![^>]*\bwidth\s*=\s*["']?[2-9]\d*["']?)(?![^>]*\bheight\s*=\s*["']?[2-9]\d*["']?)[^>]*>/g,
];

export function parseEmailPixels(value: string) {
  let html = value;
  if (value) {
    html = PIXEL_REGEX.reduce((prev, regex) => prev.replace(regex, ''), value);
  }
  return html;
}

export const createEmailLink = ({ type, toEmail, subject, body }) => {
  const parsedBody = parseHtmlToEncodedString(body || '', true);
  const parsedSubject = parseHtmlToEncodedString(subject || '', false);

  if (type === EMAIL_TYPE.GMAIL) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${
      encodeURIComponent(toEmail) || ''
    }&su=${parsedSubject}&body=${parsedBody}`;
  }
  if (type === EMAIL_TYPE.OUTLOOK) {
    return `https://outlook.office.com/?path=/mail/action/compose&to=${
      toEmail || ''
    }&subject=${parsedSubject}&body=${parsedBody}`;
  }
  return `mailto:${encodeURIComponent(toEmail) || ''}?subject=${parsedSubject}&body=${parsedBody}`;
};

export const EMAIL_MODE = Object.freeze({
  REPLY: 'REPLY',
  SEND: 'SEND',
});

export enum EmailModalType {
  SEND = 'SEND_NOW',
  RETRY = 'RETRY',
  RESEND = 'RESEND',
}

export const createParagraph = (text: string) => [
  {
    type: 'p',
    children: [{ text }],
  },
];

export const createH2 = (text: string) => [
  {
    type: 'h2',
    children: [{ text }],
  },
];
