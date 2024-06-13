import { getSobjectTypeFromId, isSyncableSobject } from '@bloobirds-it/utils';
import chillout from 'chillout';

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

export const HREF_REGEX = /\/r\/([a-zA-Z0-9]{18})\/view/;
export const HREF_REGEX_WITH_TYPE = /\/r\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]{18})\/view/;
const isDynamics = !!document.location.href.match('^.*://.*.crm4.dynamics.com.*');

export const DYNAMICS_ID_FOCUS_REGEXP = /Slot([0-9]{1,4})-([a-fA-F0-9]{8})-([a-fA-F0-9]{4})-([a-fA-F0-9]{4})-([a-fA-F0-9]{4})-([a-fA-F0-9]{12})/;

function isRecordIdElement(element) {
  return !!element.dataset.recordId;
}

function isRecordHrefElement(element) {
  return !!element.dataset.href && element.dataset.href.includes('/lightning/r/');
}

function isRecordIdDynamicsElement(element) {
  return !!element.dataset.rowId;
}

function isRecordIdDynamicsFocusElement(element) {
  return element.id?.match(DYNAMICS_ID_FOCUS_REGEXP);
}

function shouldRenderAccountLink(recordId, shouldShowAccounts) {
  const sobjectType = getSobjectTypeFromId(recordId);
  return shouldShowAccounts || sobjectType !== 'Account';
}

export function salesforce15o18IdConverter(id: string) {
  if (!id) throw new TypeError('No id given.');
  if (typeof id !== 'string') throw new TypeError("The given id isn't a string");
  if (id.length === 18) return id;
  if (id.length !== 15) throw new RangeError("The given id isn't 15 characters long.");

  // Generate three last digits of the id
  for (let i = 0; i < 3; i++) {
    let f = 0;

    // For every 5-digit block of the given id
    for (let j = 0; j < 5; j++) {
      // Assign the j-th chracter of the i-th 5-digit block to c
      const c = id.charAt(i * 5 + j);

      // Check if c is an uppercase letter
      if (c >= 'A' && c <= 'Z') {
        // Set a 1 at the character's position in the reversed segment
        f += 1 << j;
      }
    }

    // Add the calculated character for the current block to the id
    id += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345'.charAt(f);
  }

  return id;
}

export const isActivityId = element => {
  return (
    element.tagName === 'SPAN' &&
    ((element as HTMLSpanElement)?.innerText.startsWith('00T') ||
      (element as HTMLSpanElement)?.innerText.startsWith('00U')) &&
    (element as HTMLSpanElement)?.innerText.length === 15
  );
};

export function extractRecordIdElements(
  element,
  insertElement,
  shouldShowAccounts = true,
  insertActivityElement,
) {
  element = element || document.body;

  // Check if element is of type element or it's a body inside an iframe
  if (element.nodeType !== 1) {
    return;
  }
  // Check if the element is hidden, or does not have visibility
  const style = window.getComputedStyle(element);
  if (
    style.display === 'none' ||
    (style.visibility === 'hidden' && !isDynamics) ||
    style.opacity === '0'
  ) {
    return;
  }

  // Check if the element is a non parseable element
  if (NON_PARSABLE_ELEMENTS.includes(element.tagName)) {
    return;
  }

  // Check if the element has children
  if (element.childNodes.length > 0) {
    chillout.forEach(element.childNodes, child => {
      extractRecordIdElements(child, insertElement, shouldShowAccounts, insertActivityElement);
    });
  }

  // Check if the element is a record id, it should have [data-recordId] attribute or a href with a record id (.lightning.force.com/lightning/r/{RecordType}/{RecordId}/view)
  const isDynamicsElement =
    element.hasAttribute('href') &&
    !!element.getAttribute('href').match('^.*://.*.crm4.dynamics.com.*');
  if (isDynamicsElement) {
    const url = new URLSearchParams(element.getAttribute('href'));
    const recordId = url.get('id');
    const entity = url.get('etn');
    if (
      entity === 'opportunity' ||
      entity === 'lead' ||
      entity === 'contact' ||
      entity === 'account'
    ) {
      insertElement(recordId, element);
    }
  }
  const isDynamicsElementFocusView =
    isDynamics &&
    element.tagName === 'SPAN' &&
    element.className?.startsWith('TextCellStyle') &&
    element.id.match(DYNAMICS_ID_FOCUS_REGEXP);
  if (isDynamicsElementFocusView) {
    const idArray = element.id?.split('-');
    idArray?.shift();
    const id = idArray.join('-');
    insertElement(id, element);
  }

  const isHrefElement =
    element.hasAttribute('href') &&
    (element.getAttribute('href').match(HREF_REGEX) ||
      element.getAttribute('href').match(HREF_REGEX_WITH_TYPE));
  const isRecordIdDocument = element.hasAttribute('data-recordid');
  if (isRecordIdDocument || isHrefElement || isActivityId(element)) {
    if ((element as HTMLAnchorElement)?.innerText === '-') {
      return;
    }
    if (isRecordIdDocument) {
      const recordId = element.getAttribute('data-recordid');
      if (isSyncableSobject(recordId) && shouldRenderAccountLink(recordId, shouldShowAccounts)) {
        insertElement(recordId, element);
      }
    }
    if (isActivityId(element)) {
      insertActivityElement(salesforce15o18IdConverter(element.innerText), element);
    }
    if (isHrefElement) {
      // Extract the record id from the href, 18 characters after the /r/ and before the /view
      const href = element.getAttribute('href');
      // Regex to extract the record id from the href /lightning/r/{RecordId - 18 chars}/view
      let recordId = null;
      if (href.match(HREF_REGEX)) {
        recordId = href.match(HREF_REGEX)[1];
      }
      if (href.match(HREF_REGEX_WITH_TYPE)) {
        recordId = href.match(HREF_REGEX_WITH_TYPE)[2];
      }
      // Check the type of the record id
      if (
        !recordId ||
        !isSyncableSobject(recordId) ||
        !shouldRenderAccountLink(recordId, shouldShowAccounts)
      ) {
        return;
      }
      insertElement(recordId, element);
    }
  }
}
export function generateCurrentPage(recordId: string, recordType: string) {
  return `https://internal.lightning.force.com/lightning/r/${recordType}/${recordId}/view`;
}

export async function getShouldProcessMutations(mutationsList: MutationRecord[]) {
  return mutationsList.some(mutation => {
    const addedNodes = Array.from(mutation.addedNodes);
    return [...addedNodes, mutation.target].some(node => {
      if (node instanceof Element) {
        // Combine the queries into a single call
        const element = node.querySelector('[data-recordid], [href*="/lightning/r/"], [row-id]');
        if (element) {
          return true;
        }

        // Check if the node is a record id, href or dynamics element
        const isRecordElement =
          isRecordIdElement(node) || isRecordHrefElement(node) || isRecordIdDynamicsElement(node);
        return isRecordElement;
      }
      return false;
    });
  });
}

export const generateBBLink = (recordId: string, element: Element) => {
  // Check if the parent of the button have a child with the same id
  const parent = element.parentNode;

  // If the parent has a class slds-breadcrumb__item it means that the button is inside a breadcrumb and we should not add the link
  if (
    parent instanceof Element &&
    (parent.classList.contains('slds-breadcrumb__item') ||
      parent.classList.contains('slds-dropdown__item') ||
      parent.classList.contains('oneConsoleTabItem'))
  ) {
    return;
  }

  const child = parent.querySelector(`[id^=bb-link]`);
  if (child && child.id !== `bb-link-${recordId}`) {
    child.remove();
  }

  let bbLink;
  if (element.hasAttribute('data-bloobirds-link') && child) {
    if (child.childNodes.length > 0) {
      return;
    }
    bbLink = child;
  } else {
    bbLink = document.createElement('div');
    bbLink.setAttribute('id', `bb-link-${recordId}`);
  }

  //Append the placeholder div to the button
  element.parentNode.insertBefore(bbLink, element);
  const parentElement = element.parentNode as HTMLElement;
  parentElement.style.justifyContent = 'unset';
  parentElement.style.gap = '4px';
  parentElement.style.display = 'flex';
  parentElement.style.alignItems = 'center';

  //Add the data-bloobirds-link true attribute to the button
  element.setAttribute('data-bloobirds-link', 'true');

  return bbLink;
};
