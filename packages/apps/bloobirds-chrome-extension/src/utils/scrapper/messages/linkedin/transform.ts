import { normalizeUrl } from '../../../url';
import { OldLinkedInMessage } from '../types';
import { backfillTimes } from '../utils';

const textContainerSelector = (element: HTMLElement) =>
  element.querySelector('div.msg-s-event-listitem__message-bubble');
const refSelector = (element: HTMLElement) => element.querySelector('a');
const dateSelector = (element: HTMLElement) =>
  element.querySelector('time.msg-s-message-list__time-heading');
const nameSelector = (element: HTMLElement) =>
  element.querySelector('span.msg-s-message-group__name');
const timeSelector = (element: HTMLElement) =>
  element.querySelector('time.msg-s-message-group__timestamp');

const getHeaderTextIfExist = (element: HTMLElement) => {
  const container = textContainerSelector(element);
  if (container != null) {
    const header = container.querySelector('.t-bold');
    return header != null ? header.textContent : '';
  }

  return '';
};

const extractText = (message: any) => {
  const textHeader = getHeaderTextIfExist(message);
  const container = textContainerSelector(message);
  const paragraph = container && container.querySelector('p');

  let textParagraph;

  if (paragraph) {
    textParagraph = paragraph.textContent;
  } else {
    textParagraph = 'Info: Message could not be parsed into Bloobirds';
  }

  return `${textHeader} ${textParagraph}`;
};

const extractDataFactory = (extract: string) => (element: HTMLElement) => (selector: any) =>
  selector(element) != null ? selector(element)[extract].trim() : null;

const extractDataRefFactory = extractDataFactory('href');
const extractDataTextFactory = extractDataFactory('innerText');

const elementToMessageObject = (message: any) => {
  const extractDataText = extractDataTextFactory(message);
  const extractDataRef = extractDataRefFactory(message);

  const date = extractDataText(dateSelector);
  const name = extractDataText(nameSelector);
  const time = extractDataText(timeSelector);
  const profile = extractDataRef(refSelector);

  const anchorElement = document.querySelector('div.msg-thread a') as HTMLAnchorElement;

  const messageTo = anchorElement !== null ? normalizeUrl(anchorElement.href) : null;

  return {
    body: extractText(message),
    profile: profile ? normalizeUrl(profile) : null,
    lead: messageTo,
    time,
    name,
    date,
  };
};

export const transform = (messages: any): Array<OldLinkedInMessage> =>
  backfillTimes(Array.from(messages).map(elementToMessageObject));
