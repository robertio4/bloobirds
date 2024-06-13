import { EMAIL_TYPE } from '../constants/email';
import { HTMLToString, isHtml } from './strings.utils';

const REGEX_REMOVE = /(<([^>]+)>)/gi;

const REGEX_ENTER = /(<\/?p>)|(<\/li>)/gi;

const REGEX_LIST = /(<li>)/gi;

export const removeHtmlTags = text => {
  const regexRemove = /(<([^>]+)>)/gi;
  return text?.replace(regexRemove, '');
};

export const convertHtmlToString = (body, withNewLines = true) => {
  const bodyWithVariables = isHtml(body) ? HTMLToString(body) : body;
  const bodyParsed = withNewLines
    ? bodyWithVariables?.replace(REGEX_ENTER, '\n')
    : bodyWithVariables;
  return bodyParsed?.replace(REGEX_LIST, '- ')?.replace(REGEX_REMOVE, '');
};

const parseHtmlToEncodedString = (body, withNewLines = true) => {
  const plainText = convertHtmlToString(body, withNewLines);
  return encodeURIComponent(plainText.trim());
};

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
