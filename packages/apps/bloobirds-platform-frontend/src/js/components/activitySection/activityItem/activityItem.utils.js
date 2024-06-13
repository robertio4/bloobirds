import { serialize } from '@bloobirds-it/rich-text-editor';
import { removeHtmlTags } from '@bloobirds-it/utils';

import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { getFieldByLogicRole, getTextFromLogicRole } from '../../../utils/bobjects.utils';

const PIXEL_REGEX = [
  /<[^>]+src\s*=\s*['"]*.*(mailtrack.io)([^'"]+)['"][^>]*>/g, // mailtrack
  /<[^>]+src="https:(\/\/nyl\.as|.*.nylas.com).*[^>]*>/g, // nylas
  /<[^>]+href\s*=\s*['"]*.*(cirrusinsight.com)([^'"]+)['"][^>]*>/g, // cirrus
  /<img[^>]+width="1"[^>]+height="1"[^>]*>/g, // 1x1 pixel
  /<img[^>]+height="1"[^>]+width="1"[^>]*>/g, // 1x1 pixel
];

export const getCompanyName = bobject => {
  const companyField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  if (companyField && companyField.referencedBobject) {
    return getTextFromLogicRole(companyField.referencedBobject, COMPANY_FIELDS_LOGIC_ROLE.NAME);
  }
  return '';
};

export const getLeadName = bobject => {
  const leadField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  if (leadField && leadField.referencedBobject) {
    const lead = leadField.referencedBobject;
    const fullName = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME);
    const name = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.NAME);
    const email = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
    return fullName || name || email || 'Untitled lead';
  }
  return '';
};

export const getActivityUserName = bobject => {
  const userField = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  if (userField) {
    return userField?.text;
  }
  return '';
};

export const parseEmailPixels = value => {
  let html = value;
  if (value) {
    html = PIXEL_REGEX.reduce((prev, regex) => prev.replace(regex, ''), value);
  }
  return html;
};

export const createCallTitle = ({ direction, phone }) => {
  let title = `${direction} call`;
  if (phone) {
    if (direction === 'Outgoing') {
      title += ` to ${phone}`;
    }
    if (direction === 'Incoming') {
      title += ` from ${phone}`;
    }
  }
  return title;
};

export const createEmailTitle = ({ direction, user, leadEmail, subjectEmail }) => {
  let title = ' Email';
  if (direction === 'Outgoing') {
    title += ' sent';
    if (user) {
      title += ` from ${user}`;
    }
  }
  if (direction === 'Incoming') {
    title += ' received';
    if (leadEmail) {
      title += ` from ${leadEmail}`;
    }
  }
  if (subjectEmail) {
    let message = subjectEmail;
    if (
      message?.includes('"type":"p"') &&
      typeof message === 'string' &&
      typeof JSON.parse(message) === 'object'
    ) {
      message = removeHtmlTags(serialize(message));
    }
    title += ` - ${message}`;
  }
  return title;
};
