import { convertTo24HourFormat } from '@bloobirds-it/utils';
import * as Sentry from '@sentry/react';

import { WhatsappLead } from '../../context';

export type PortalType = 'leadName' | 'message' | 'conversation';

export const NON_PARSABLE_ELEMENTS = [
  'SCRIPT',
  'NOSCRIPT',
  'STYLE',
  'svg',
  'path',
  'PRE',
  'VIDEO',
  'IMG',
  'IFRAME',
];

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  ENABLED = 'enabled',
  LOADING = 'loading',
  DISABLED = 'disabled',
}

export type StatusType = Status;

export interface MessageProps {
  id: string;
  message: string;
  isoDateTime: string;
  direction: 'incoming' | 'outgoing';
  leadId: string;
  phoneNumber: string;
  div?: HTMLDivElement;
  status: StatusType;
}

export function getContactNumber(el = document.body) {
  const element: HTMLElement = el.querySelector('[data-id]');
  if (!element) {
    return null;
  }

  const id = element?.dataset.id;

  if (!id || id.endsWith('@c.us')) {
    return null;
  }

  return id?.split('_')[1]?.split('@')[0];
}

export function getUTCDateFormMessageInputs(date, dateTime, seconds) {
  // Parse inputs
  const [day, month, year] = date.split('/').map(str => parseInt(str, 10));
  const [hour, minute] = dateTime.split(':').map(str => parseInt(str, 10));

  // Create a Date object in the user's local timezone
  const localDate = new Date(year, month - 1, day, hour, minute, seconds);

  // Extract UTC values from this Date object
  const utcYear = localDate.getUTCFullYear();
  const utcMonth = localDate.getUTCMonth() + 1; // Months are 0-based in JavaScript, so adding 1 to make it 1-based.
  const utcDay = localDate.getUTCDate();
  const utcHour = localDate.getUTCHours();
  const utcMinute = localDate.getUTCMinutes();
  const utcSeconds = localDate.getUTCSeconds();

  // Construct the ISO formatted string
  const utcDateStr = `${utcYear}-${String(utcMonth).padStart(2, '0')}-${String(utcDay).padStart(
    2,
    '0',
  )}T${String(utcHour).padStart(2, '0')}:${String(utcMinute).padStart(2, '0')}:${String(
    utcSeconds,
  ).padStart(2, '0')}Z`;

  return utcDateStr;
}

export function extractWhatsappMessageElements(element: HTMLElement, processMessage) {
  element = element || document.body;
  // Ceck if element is of type element
  if (element.nodeType !== 1 || !(element instanceof Element)) {
    return;
  }

  // Check if the element is hidden, or does not have visibility
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return;
  }

  // Check if the element is a non parsable element
  if (NON_PARSABLE_ELEMENTS.includes(element.tagName)) {
    return;
  }

  // Check if the element has children
  if (element.children.length > 0) {
    Array.from(element.children).forEach((child: HTMLElement) => {
      extractWhatsappMessageElements(child, processMessage);
    });
  }

  // Check if the element is a group message
  if (element.dataset.id?.endsWith('@c.us')) {
    return; // We don't want to process group messages
  }

  // Check if the element is a whatsapp message, it should have a data-id attribute and be a div
  if (
    element.tagName === 'DIV' &&
    element.getAttribute('data-id') &&
    !element.getAttribute('data-bb-processed')
  ) {
    processMessage(element);
    element.setAttribute('data-bb-processed', 'true');
  }
}

export const extractContactName = () => {
  const contactNameElement: HTMLElement = document.querySelector('#main header span[dir=auto]');
  if (contactNameElement) {
    return contactNameElement.innerText;
  }
  return '';
};

export const processMessage = (
  element: HTMLElement,
  whatsappLead: WhatsappLead,
  messageElements,
  messagesRef,
) => {
  // The message is a child with dir ltr or rtl and selectable-text
  const messageElement = element.querySelector('.selectable-text.copyable-text') as HTMLElement;
  const message = messageElement?.innerText;
  if (!message) {
    return;
  }

  // The hour is inside an attribute called data-pre-plain-text
  const messageMetaElement = element.querySelector('[data-pre-plain-text]');
  const messageMeta = messageMetaElement?.getAttribute('data-pre-plain-text');
  // For PDFs with title, the messageMetaElement is null
  if (!messageMetaElement || !messageMeta) {
    return;
  }
  // The meta have this format: [10:03, 23/10/2023] Alexis Aire Libre Fusteria i Decoracii:
  // We need to extract the hour and the date
  const wsDate = messageMeta?.split(']')[0].split('[')[1];
  // Check if date is in am/pm format
  const isAmPm = wsDate?.includes('m') || wsDate?.includes('p') || wsDate?.includes('a');
  // now, hour and minutes have something like: 10:03, 23/10/2023 or 10:16 p. m., 26/3/2024
  const dateTime = isAmPm
    ? convertTo24HourFormat(wsDate?.split(' ')[0], wsDate?.includes('p') ? 'pm' : 'am')
    : wsDate.split(',')[0];
  const date = wsDate?.split(' ')[isAmPm ? 2 : 1];

  // If there are more than one messages in the same minute, we need to retrieve all of them and set as seconds the index
  const otherMessagesInSameMinute = messageElements.current.filter(
    messageElement =>
      messageElement
        .querySelector('[data-pre-plain-text]')
        ?.getAttribute('data-pre-plain-text')
        ?.split(']')[0]
        .split('[')[1] === wsDate,
  );
  const seconds = otherMessagesInSameMinute.indexOf(element);

  const isoDateTime = getUTCDateFormMessageInputs(date, dateTime, seconds);

  const direction = element.dataset.id.split('_')[0] === 'true' ? 'outgoing' : 'incoming';
  //const phoneNumber = getContactNumber(element);

  const isFirstMessage = !!element?.children[0]?.children[1]?.querySelector(':scope > span');

  const insertionPoint: HTMLElement = element?.children[0]?.children[1]?.querySelector(
    `:scope > div:nth-child(${isFirstMessage ? 3 : 2})`,
  ); // This selects the 2th direct child div of the parent.

  //We'll only create the div if it does not exist
  if (insertionPoint?.querySelector('[data-bloobirds-button]')) {
    return;
  }
  // Create the new div and set its properties
  const newDiv = document.createElement('div');
  newDiv.setAttribute('data-bloobirds-button', 'true');

  // Insert the new div before the insertion point
  if (insertionPoint && newDiv) {
    try {
      if (direction === 'incoming') {
        insertionPoint?.insertBefore(newDiv, insertionPoint.firstElementChild);
      } else {
        insertionPoint?.appendChild(newDiv);
      }
    } catch (e) {
      Sentry.captureException(e, {
        extra: {
          message: 'Error inserting the new div',
          element,
          insertionPoint,
          direction,
        },
      });
    }
  }

  if (direction === 'outgoing' && insertionPoint.querySelector('[data-icon="forward-chat"]')) {
    insertionPoint.style.width = '120px';
    insertionPoint.style.left = '-130px';
  }

  const whatsappMessage: MessageProps = {
    id: element.dataset.id,
    message,
    isoDateTime,
    direction,
    leadId: whatsappLead?.id,
    phoneNumber: whatsappLead?.number,
    div: newDiv,
    status: Status.ENABLED,
  };

  // Save the message
  messagesRef.current.push(whatsappMessage);
};
